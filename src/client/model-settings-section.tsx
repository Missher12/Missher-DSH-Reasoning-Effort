/**
 * The plugin-owned per-model reasoning page.
 *
 * Missher builds declare `settings.models.model-fields`, so the inline Models
 * row is the natural entry point there. The upstream Host does not declare that
 * slot, and a slot the Host never declares cannot be contributed to — so this
 * page renders the same per-model declarations through the public
 * `settings.section` slot and the shared `configForms` write queue.
 *
 * Every capability this page needs arrives through its own optional inject:
 * `configForms` (the write queue), `settingsSchema` (the only authority on what
 * a leaf accepts), `remote.llm` (the provider directory) and `remote.session`
 * (the routable model catalog). None of them is assumed by object presence, and
 * a missing one disables exactly the part that needs it.
 *
 * The page and the inline row never coexist, and both edit the same Host
 * `reasoningEfforts` leaf — there is no plugin-private copy of the configuration.
 *
 * @module dsh-reasoning-effort/model-settings-section
 */
import { useCallback, useEffect, useMemo, useReducer, useRef, useState, useSyncExternalStore } from 'react'
import type { Context } from '@deepseek-ai/cordis'
import type {} from '@deepseek-ai/dsh-client-ui-settings/client'
import type { SettingsSectionOwnerProps } from '@deepseek-ai/dsh-client-ui-settings/client'
import type { ReasoningEffortTranslate } from './locales.js'
import { en, NS, zh } from './locales.js'
import { LOG_PREFIX, slotDeclaration, type ClientSlotsLike } from './compat.js'
import { validCapability } from './model-capabilities.js'
import { ReasoningControls } from './model-settings.js'
import {
  catalogGroupsOf,
  checkLeaf,
  configurableProvidersOf,
  createDraftState,
  createFallbackLifecycle,
  declarationKey,
  draftDirty,
  draftReducer,
  draftSaveable,
  draftStale,
  modelsAt,
  offeredLevels,
  planModelRow,
  reasoningOp,
  settleWrite,
  SAMPLE_DECLARATION,
  type CatalogGroup,
  type ConfigFormLike,
  type ConfigFormSnapshotLike,
  type ConfigFormsLike,
  type ConfigurableProvider,
  type DescribeFaceLike,
  type DescribeSnapshotLike,
  type LlmDirectoryLike,
  type ModelCatalogLike,
  type RowReason,
  type SettingsSchemaLike,
} from './model-reasoning.js'

/** The optional inline row this page replaces while it is undeclared. */
const MODEL_FIELDS_SLOT = 'settings.models.model-fields'
/** This page's own seat in the settings navigation. */
const SETTINGS_SECTION = 'settings.section'
/** Stable registration id, so a re-registration replaces rather than duplicates. */
const SECTION_ID = 'reasoning-effort-models'

/* --------------------------------------------------------- optional service */

export interface ServiceStore<T> {
  getSnapshot(): T | undefined
  subscribe(listener: () => void): () => void
  set(value: T | undefined): void
}

/** A one-value store for a service that may never arrive on this Host. */
export function createServiceStore<T>(): ServiceStore<T> {
  let value: T | undefined
  const listeners = new Set<() => void>()
  return {
    getSnapshot: () => value,
    subscribe: (listener) => {
      listeners.add(listener)
      return () => { listeners.delete(listener) }
    },
    set: (next) => {
      if (value === next) return
      value = next
      for (const listener of [...listeners]) listener()
    },
  }
}

export interface ModelsSectionLocaleLike {
  getLocale(): { active: string }
}

/** Everything the page needs, captured once at registration. */
export interface ModelsSectionServices {
  readonly configForms: ServiceStore<ConfigFormsLike>
  readonly settingsSchema: ServiceStore<SettingsSchemaLike>
  readonly llmDirectory: ServiceStore<LlmDirectoryLike>
  readonly modelCatalog: ServiceStore<ModelCatalogLike>
  readonly locale: ModelsSectionLocaleLike | undefined
}

/* ---------------------------------------------------------------- wiring */

/**
 * Register the fallback page and follow the inline slot's lifecycle.
 *
 * `slots.inject` is the registry's declaration hook: its callback runs when the
 * slot is declared (also when it already was), and the disposer it returns runs
 * when the declaration collapses. That is the whole absent → present → absent
 * handling — no polling and no start-up snapshot.
 */
export function registerModelsSection(ctx: Context, services: ModelsSectionServices): void {
  const slots = ctx.get('slots') as ClientSlotsLike | undefined
  let stopped = false
  let disposeSection: (() => void) | null = null

  const label = () => (services.locale?.getLocale().active === 'zh' ? zh : en)['section.models.title']

  const show = () => {
    if (stopped || disposeSection !== null) return
    try {
      disposeSection = ctx.slots.inject(SETTINGS_SECTION, () => ctx.slots.register({
        name: SETTINGS_SECTION,
        id: SECTION_ID,
        order: 16,
        locale: NS,
        // A thunk follows the active language without re-registering.
        label,
      }, ModelsSectionView(services)))
    } catch (error) {
      /* The caller's fiber is already unloading, so `ctx.effect` refuses new
         work. Remember that, so a late collapse cannot try again. Any other
         failure is reported instead of silently disabling the page. */
      const message = error instanceof Error ? error.message : String(error)
      if (message.includes('INACTIVE_EFFECT') || message.includes('inactive context')) stopped = true
      else console.error(`${LOG_PREFIX} per-model reasoning page failed to register: ${message}`)
    }
  }
  const hide = () => {
    disposeSection?.()
    disposeSection = null
  }

  const lifecycle = createFallbackLifecycle(show, hide)

  ctx.slots.inject(MODEL_FIELDS_SLOT, () => {
    lifecycle.sync('declared')
    return () => lifecycle.sync(slotDeclaration(ctx.get('slots'), MODEL_FIELDS_SLOT))
  })
  lifecycle.sync(slotDeclaration(slots, MODEL_FIELDS_SLOT))

  ctx.effect(() => () => {
    stopped = true
    lifecycle.stop()
  }, 'reasoning-effort: models section teardown')
}

/* ------------------------------------------------------------- data access */

function resultOf(value: unknown): { ok: true; value: unknown } | { ok: false; message: string } {
  if (typeof value !== 'object' || value === null) return { ok: false, message: 'malformed host answer' }
  const result = value as { ok?: unknown; value?: unknown; error?: { message?: unknown } }
  if (result.ok === true) return { ok: true, value: result.value }
  return {
    ok: false,
    message: typeof result.error?.message === 'string' ? result.error.message : 'the host refused the request',
  }
}

type DirectoryState =
  | { readonly status: 'loading' }
  | { readonly status: 'ready'; readonly providers: readonly ConfigurableProvider[]; readonly groups: readonly CatalogGroup[]; readonly catalogError: string | null }
  | { readonly status: 'failed'; readonly code: 'no-remote' | 'host'; readonly message?: string }

/** Read the provider directory and the routable model catalog once per mount. */
function useDirectory(llm: LlmDirectoryLike | undefined, catalog: ModelCatalogLike | undefined): DirectoryState {
  const [state, setState] = useState<DirectoryState>({ status: 'loading' })
  useEffect(() => {
    let cancelled = false
    if (llm === undefined) {
      setState({ status: 'failed', code: 'no-remote' })
      return
    }
    setState({ status: 'loading' })
    const catalogAnswer = catalog === undefined ? Promise.resolve(undefined) : catalog.modelCatalog()
    Promise.all([llm.listConfigurableProviders(), catalogAnswer])
      .then(([providersAnswer, catalogResult]) => {
        if (cancelled) return
        const providers = resultOf(providersAnswer)
        if (!providers.ok) {
          setState({ status: 'failed', code: 'host', message: providers.message })
          return
        }
        const directory = catalogResult === undefined ? undefined : resultOf(catalogResult)
        setState({
          status: 'ready',
          providers: configurableProvidersOf(providers.value),
          groups: directory === undefined || !directory.ok ? [] : catalogGroupsOf(directory.value),
          catalogError: directory !== undefined && !directory.ok ? directory.message : null,
        })
      }, (error: unknown) => {
        if (cancelled) return
        setState({ status: 'failed', code: 'host', message: error instanceof Error ? error.message : String(error) })
      })
    return () => { cancelled = true }
  }, [llm, catalog])
  return state
}

/* ------------------------------------------------------------- components */

/** Bound store readers, so `useSyncExternalStore` keeps one subscription. */
function useFaceSnapshot(face: DescribeFaceLike): DescribeSnapshotLike {
  const subscribe = useCallback((listener: () => void) => face.subscribe(listener), [face])
  const getSnapshot = useCallback(() => face.getSnapshot(), [face])
  return useSyncExternalStore(subscribe, getSnapshot)
}

function useFormSnapshot(form: ConfigFormLike): ConfigFormSnapshotLike {
  const subscribe = useCallback((listener: () => void) => form.subscribe(listener), [form])
  const getSnapshot = useCallback(() => form.getSnapshot(), [form])
  return useSyncExternalStore(subscribe, getSnapshot)
}

/** The component factory that closes over the registered services. */
function ModelsSectionView(services: ModelsSectionServices) {
  /* The slot spreads its owner props (`close`) into this component and the
     locale seat adds `t`; the page itself needs neither the close affordance
     (the shell owns modal visibility) nor any other owner state. */
  return (props: SettingsSectionOwnerProps & { t: ReasoningEffortTranslate }) =>
    <ModelsSection services={services} t={props.t} />
}

function useOptionalService<T>(store: ServiceStore<T>): T | undefined {
  return useSyncExternalStore(store.subscribe, store.getSnapshot)
}

export function ModelsSection({ services, t }: {
  readonly services: ModelsSectionServices
  readonly t: ReasoningEffortTranslate
}) {
  const configForms = useOptionalService(services.configForms)
  const settingsSchema = useOptionalService(services.settingsSchema)
  const llmDirectory = useOptionalService(services.llmDirectory)
  const modelCatalog = useOptionalService(services.modelCatalog)
  const directory = useDirectory(llmDirectory, modelCatalog)

  if (configForms === undefined) {
    return <section className="re-models" aria-label={t('section.models.title')}>
      <h3 className="re-models-title">{t('section.models.title')}</h3>
      <p className="re-models-note" role="alert">{t('section.models.noForms')}</p>
    </section>
  }
  return <ModelsSectionBody
    configForms={configForms}
    settingsSchema={settingsSchema}
    directory={directory}
    t={t}
  />
}

/** One provider row: configurable through settings, or catalog-only. */
interface SectionProvider {
  readonly provider: string
  readonly displayName: string
  readonly settingsNs: string | null
  readonly settingsPath: readonly string[]
  readonly group: CatalogGroup | undefined
}

function sectionProviders(providers: readonly ConfigurableProvider[], groups: readonly CatalogGroup[]): SectionProvider[] {
  const byProvider = new Map<string, SectionProvider>()
  for (const provider of providers) {
    byProvider.set(provider.provider, {
      provider: provider.provider,
      displayName: provider.displayName,
      settingsNs: provider.settingsNs,
      settingsPath: provider.settingsPath,
      group: groups.find(group => group.provider === provider.provider),
    })
  }
  for (const group of groups) {
    if (byProvider.has(group.provider)) continue
    byProvider.set(group.provider, {
      provider: group.provider,
      displayName: group.name,
      settingsNs: null,
      settingsPath: [],
      group,
    })
  }
  return [...byProvider.values()]
}

function ModelsSectionBody({ configForms, settingsSchema, directory, t }: {
  readonly configForms: ConfigFormsLike
  readonly settingsSchema: SettingsSchemaLike | undefined
  readonly directory: DirectoryState
  readonly t: ReasoningEffortTranslate
}) {
  const face = useMemo(() => configForms.describe(), [configForms])
  if (face === undefined) {
    return <section className="re-models" aria-label={t('section.models.title')}>
      <h3 className="re-models-title">{t('section.models.title')}</h3>
      <p className="re-models-note" role="alert">{t('section.models.readOnly.incompleteForm')}</p>
    </section>
  }
  return <ModelsMirrorBody face={face} configForms={configForms} settingsSchema={settingsSchema} directory={directory} t={t} />
}

function ModelsMirrorBody({ face, configForms, settingsSchema, directory, t }: {
  readonly face: DescribeFaceLike
  readonly configForms: ConfigFormsLike
  readonly settingsSchema: SettingsSchemaLike | undefined
  readonly directory: DirectoryState
  readonly t: ReasoningEffortTranslate
}) {
  const mirror = useFaceSnapshot(face)

  useEffect(() => {
    // One read is enough: later changes arrive through the shared mirror.
    void face.ensure().catch(() => undefined)
  }, [face])

  const providers = directory.status === 'ready' ? sectionProviders(directory.providers, directory.groups) : []

  return <section className="re-models" aria-label={t('section.models.title')}>
    <h3 className="re-models-title">{t('section.models.title')}</h3>
    <p className="re-models-note">{t('section.models.moved')}</p>
    {settingsSchema === undefined
      ? <p className="re-models-note" role="alert">{t('section.models.readOnly.noSchema')}</p>
      : null}
    {mirror.view !== undefined && !mirror.view.writable
      ? <p className="re-models-note" role="alert">{t('section.models.documentReadOnly')}</p>
      : null}
    {directory.status === 'loading' ? <p className="re-models-note">{t('section.models.loading')}</p> : null}
    {directory.status === 'failed'
      ? <p className="re-models-note" role="alert">{directory.code === 'no-remote'
        ? t('section.models.noRemote')
        : t('section.models.directoryFailed', { message: directory.message ?? '' })}</p>
      : null}
    {directory.status === 'ready' && directory.catalogError !== null
      ? <p className="re-models-note" role="alert">{t('section.models.catalogFailed', { message: directory.catalogError })}</p>
      : null}
    {directory.status === 'ready' && providers.length === 0
      ? <p className="re-models-note">{t('section.models.empty')}</p>
      : null}
    {providers.map(provider => provider.settingsNs === null
      ? <CatalogOnlyProvider key={provider.provider} provider={provider} t={t} />
      : <ProviderGroup
        key={`${provider.settingsNs}\u0000${provider.settingsPath.join('.')}\u0000${provider.provider}`}
        provider={provider}
        group={provider.group}
        configForms={configForms}
        settingsSchema={settingsSchema}
        mirror={mirror}
        t={t}
      />)}
  </section>
}

/** A routable route the settings directory does not expose; never silently dropped. */
function CatalogOnlyProvider({ provider, t }: {
  readonly provider: SectionProvider
  readonly t: ReasoningEffortTranslate
}) {
  return <div className="re-models-provider">
    <h4 className="re-models-provider-title">{provider.displayName}</h4>
    <p className="re-models-note">{t('section.models.readOnly.notConfigurable')}</p>
    {provider.group !== undefined && provider.group.models.length > 0
      ? <p className="re-models-note">{provider.group.models.map(model => model.id).join(' · ')}</p>
      : null}
  </div>
}

function reasonText(
  reason: RowReason,
  context: { namespace: string; schemaAvailable: boolean },
  t: ReasoningEffortTranslate,
): string {
  switch (reason) {
    case 'namespace-unavailable': return t('section.models.namespaceUnavailable', { namespace: context.namespace })
    case 'document-readonly': return t('section.models.readOnly.document')
    case 'bad-path': return t('section.models.readOnly.badPath')
    case 'duplicate-id': return t('section.models.readOnly.ambiguous')
    case 'models-list': return t('section.models.readOnly.modelsList')
    case 'not-in-catalog': return t('section.models.readOnly.notInCatalog')
    case 'unconfirmed-leaf':
      return context.schemaAvailable
        ? t('section.models.readOnly.unconfirmedLeaf')
        : t('section.models.readOnly.noSchema')
  }
}

function ProviderGroup({ provider, group, configForms, settingsSchema, mirror, t }: {
  readonly provider: SectionProvider
  readonly group: CatalogGroup | undefined
  readonly configForms: ConfigFormsLike
  readonly settingsSchema: SettingsSchemaLike | undefined
  readonly mirror: DescribeSnapshotLike
  readonly t: ReasoningEffortTranslate
}) {
  /* `settingsNs` is non-null here: the caller routes configurable providers only. */
  const namespace = provider.settingsNs ?? ''
  const form = useMemo(() => configForms.get(namespace), [configForms, namespace])
  if (form === undefined) {
    return <div className="re-models-provider">
      <h4 className="re-models-provider-title">{provider.displayName}</h4>
      <p className="re-models-note" role="alert">{t('section.models.readOnly.incompleteForm')}</p>
    </div>
  }
  return <ProviderForm
    provider={provider}
    group={group}
    namespace={namespace}
    form={form}
    settingsSchema={settingsSchema}
    mirror={mirror}
    t={t}
  />
}

function ProviderForm({ provider, group, namespace, form, settingsSchema, mirror, t }: {
  readonly provider: SectionProvider
  readonly group: CatalogGroup | undefined
  readonly namespace: string
  readonly form: ConfigFormLike
  readonly settingsSchema: SettingsSchemaLike | undefined
  readonly mirror: DescribeSnapshotLike
  readonly t: ReasoningEffortTranslate
}) {
  const snapshot = useFormSnapshot(form)
  const view = mirror.view?.namespaces.find(candidate => candidate.ns === namespace)
  const serializedSchema = view?.schema

  const rows = useMemo(() => {
    const byId = new Map<string, { id: string; name: string; efforts: readonly string[] }>()
    for (const model of group?.models ?? []) byId.set(model.id, { id: model.id, name: model.name, efforts: model.efforts })
    for (const model of modelsAt(snapshot.value, provider.settingsPath)) {
      if (!byId.has(model.id)) byId.set(model.id, { id: model.id, name: model.name ?? model.id, efforts: [] })
    }
    for (const model of modelsAt(snapshot.user, provider.settingsPath)) {
      if (!byId.has(model.id)) byId.set(model.id, { id: model.id, name: model.name ?? model.id, efforts: [] })
    }
    return [...byId.values()]
  }, [group, snapshot.value, snapshot.user, provider.settingsPath])

  const catalogIds = useMemo(
    () => new Set((group?.models ?? []).map(model => model.id)),
    [group],
  )
  const documentWritable = (mirror.view?.writable ?? false) && snapshot.writable
  const namespaceReady = snapshot.status === 'ready'

  return <div className="re-models-provider">
    <h4 className="re-models-provider-title">{provider.displayName}</h4>
    {snapshot.status === 'loading' ? <p className="re-models-note">{t('section.models.loading')}</p> : null}
    {snapshot.status === 'unavailable' ? <p className="re-models-note" role="alert">{t('section.models.namespaceUnavailable', { namespace })}</p> : null}
    {namespaceReady && rows.length === 0 ? <p className="re-models-note">{t('section.models.providerEmpty')}</p> : null}
    {namespaceReady ? rows.map((model, index) => <ModelRow
      key={model.id}
      provider={provider}
      namespace={namespace}
      model={model}
      position={index + 1}
      form={form}
      snapshot={snapshot}
      settingsSchema={settingsSchema}
      serializedSchema={serializedSchema}
      catalogIds={catalogIds}
      documentWritable={documentWritable}
      namespaceReady={namespaceReady}
      t={t}
    />) : null}
  </div>
}

function ModelRow({
  provider, namespace, model, position, form, snapshot, settingsSchema, serializedSchema,
  catalogIds, documentWritable, namespaceReady, t,
}: {
  readonly provider: SectionProvider
  readonly namespace: string
  readonly model: { readonly id: string; readonly name: string; readonly efforts: readonly string[] }
  readonly position: number
  readonly form: ConfigFormLike
  readonly snapshot: ConfigFormSnapshotLike
  readonly settingsSchema: SettingsSchemaLike | undefined
  readonly serializedSchema: unknown
  readonly catalogIds: ReadonlySet<string>
  readonly documentWritable: boolean
  readonly namespaceReady: boolean
  readonly t: ReasoningEffortTranslate
}) {
  const leafWritable = useCallback(
    (path: readonly string[]) => checkLeaf(settingsSchema, serializedSchema, path, SAMPLE_DECLARATION) === 'ok',
    [settingsSchema, serializedSchema],
  )
  const plan = useMemo(() => planModelRow({
    id: model.id,
    name: model.name,
    efforts: model.efforts,
    settingsPath: provider.settingsPath,
    user: snapshot.user,
    base: snapshot.base,
    value: snapshot.value,
    catalogIds,
    documentWritable,
    namespaceReady,
    leafWritable,
  }), [model, provider.settingsPath, snapshot.user, snapshot.base, snapshot.value, catalogIds, documentWritable, namespaceReady, leafWritable])

  const editable = plan.reason === null && plan.path !== null
  const [state, dispatch] = useReducer(
    draftReducer,
    undefined,
    () => createDraftState(plan.declaration, snapshot.revision),
  )
  const [busy, setBusy] = useState(false)
  const [status, setStatus] = useState<
    { kind: 'idle' } | { kind: 'accepted' } | { kind: 'refused' } | { kind: 'failed'; message: string } | { kind: 'schema' }
  >({ kind: 'idle' })

  /* The Host is the fact source: when this row's stored declaration changes,
     the reducer decides whether to follow it or to keep a pending draft. */
  const seenHostKey = useRef(declarationKey(plan.declaration))
  const hostKey = declarationKey(plan.declaration)
  if (seenHostKey.current !== hostKey) {
    seenHostKey.current = hostKey
    dispatch({ type: 'host', declaration: plan.declaration, revision: snapshot.revision })
  }

  const dirty = draftDirty(state)
  const stale = draftStale(state, snapshot.revision)
  const validDraft = validCapability(state.draft)
  const canSave = editable && !busy && draftSaveable(state, snapshot.revision, validDraft)

  const save = () => {
    if (plan.path === null) return
    /* Freeze the exact target, revision and value the user is saving, and prove
       the Host schema accepts that leaf before sending anything. */
    const path = plan.path
    const revision = state.baseRevision
    const declaration = state.draft
    if (declaration !== undefined && checkLeaf(settingsSchema, serializedSchema, path, declaration) !== 'ok') {
      setStatus({ kind: 'schema' })
      return
    }
    setBusy(true)
    void settleWrite(() => form.mutate([reasoningOp(path, declaration)], revision)).then(outcome => {
      setBusy(false)
      dispatch({ type: 'write', outcome })
      setStatus(outcome.kind === 'accepted' ? { kind: 'accepted' } : outcome)
    })
  }
  const reset = () => {
    dispatch({ type: 'reset', declaration: plan.declaration, revision: snapshot.revision })
    setStatus({ kind: 'idle' })
  }

  return <div className="re-models-row" data-readonly={!editable}>
    <div className="re-models-row-head">
      <span className="re-models-model-name">{model.name}</span>
      <span className="re-models-model-id">{model.id}</span>
    </div>
    <ReasoningControls
      value={editable ? state.draft : plan.declaration}
      inheritedValue={plan.inherited}
      position={position}
      disabled={!editable || busy}
      t={t}
      advanced={editable}
      allowEmptyCustom={editable}
      offered={offeredLevels(model.efforts)}
      onChange={(next) => {
        dispatch({ type: 'edit', declaration: next, revision: snapshot.revision })
        setStatus({ kind: 'idle' })
      }}
    />
    {plan.reason !== null
      ? <p className="re-models-note">{reasonText(plan.reason, { namespace, schemaAvailable: settingsSchema !== undefined }, t)}</p>
      : null}
    {editable ? <div className="re-models-actions">
      <button type="button" className="re-models-save" disabled={!canSave} onClick={save}>
        {busy ? t('section.models.saving') : t('section.models.save')}
      </button>
      <button type="button" className="re-models-reset" disabled={(!dirty && !state.conflict) || busy} onClick={reset}>
        {t('section.models.reset')}
      </button>
      {state.conflict ? <span className="re-models-error" role="alert">{t('section.models.conflict')}</span> : null}
      {!state.conflict && stale ? <span className="re-models-note" role="status">{t('section.models.stale')}</span> : null}
      {dirty && !validDraft ? <span className="re-models-note" role="status">{t('section.models.invalidDraft')}</span> : null}
      {status.kind === 'accepted' ? <span className="re-models-ok" role="status">{t('section.models.saved')}</span> : null}
      {status.kind === 'refused' ? <span className="re-models-error" role="alert">{t('section.models.refused')}</span> : null}
      {status.kind === 'schema' ? <span className="re-models-error" role="alert">{t('section.models.schemaRejected')}</span> : null}
      {status.kind === 'failed' ? <span className="re-models-error" role="alert">{t('section.models.failed', { message: status.message })}</span> : null}
    </div> : null}
  </div>
}

export const MODELS_SECTION_CSS = `
/* The fallback page is an inline-size container: its own content box decides
   the layout, so a Host that shrinks the settings column (the official 390px
   window leaves ~106px) reflows here without touching the window, the Host
   shell, or the inline Models row. */
.re-models { container: models / inline-size; display: grid; gap: 12px; min-width: 0; color: var(--dsw-alias-label-primary, inherit); }
.re-models-title { margin: 0; font-size: 15px; line-height: 22px; font-weight: 600; }
.re-models-note { margin: 0; color: var(--dsw-alias-label-tertiary, #858a95); font-size: 12px; line-height: 18px; overflow-wrap: anywhere; }
.re-models-provider { display: grid; gap: 10px; min-width: 0; padding-top: 8px; border-top: .5px solid var(--dsw-alias-border-l4, #d4d4d8); }
.re-models-provider-title { margin: 0; font-size: 13px; line-height: 20px; font-weight: 600; overflow-wrap: anywhere; }
.re-models-row { display: grid; gap: 8px; min-width: 0; padding: 10px; border: .5px solid var(--dsw-alias-border-l4, #d4d4d8); border-radius: var(--dsw-radius-md, 8px); }
.re-models-row-head { display: flex; flex-wrap: wrap; align-items: baseline; gap: 8px; min-width: 0; }
.re-models-model-name { min-width: 0; overflow-wrap: anywhere; font-size: 13px; line-height: 20px; font-weight: 500; }
.re-models-model-id { min-width: 0; overflow-wrap: anywhere; color: var(--dsw-alias-label-tertiary, #858a95); font-size: 12px; line-height: 18px; }
.re-models-actions { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; }
.re-models-actions button { box-sizing: border-box; height: 30px; padding: 0 12px; border: .5px solid var(--dsw-alias-border-l4, #d4d4d8); border-radius: var(--dsw-radius-md, 8px); color: inherit; background-color: var(--dsw-alias-bg-layer-1, transparent); font: inherit; font-size: 13px; }
.re-models-actions button:disabled { opacity: .6; cursor: default; }
.re-models-ok { color: var(--dsw-alias-state-success-primary, #2f7d4f); font-size: 12px; line-height: 18px; }
.re-models-error { color: var(--dsw-alias-state-danger-primary, #be4343); font-size: 12px; line-height: 18px; overflow-wrap: anywhere; }

/* Narrow fallback column: stack the shared control's two fields and the wire
   row, keep every control full-width, and trim the card/select padding just
   enough that a ~106px container still fits a usable 32px-tall select. The
   normal-width layout above is untouched, and so is the inline Models row. */
@container models (max-width: 360px) {
  .re-models-row { padding: 6px; gap: 6px; }
  .re-models .re-model-controls { grid-template-columns: minmax(0, 1fr); gap: 8px; }
  .re-models .re-model-controls > label { width: 100%; min-width: 0; }
  .re-models .re-model-controls select { width: 100%; min-width: 0; padding: 0 24px 0 8px; background-position: right 6px center; }
  .re-models .re-model-wire { grid-template-columns: minmax(0, 1fr); gap: 4px; align-items: stretch; }
  .re-models .re-model-wire-enable { width: 100%; min-width: 0; }
  .re-models .re-model-wire-value { width: 100%; min-width: 0; }
  .re-models-actions button { padding: 0 10px; }
}

/* Extreme-narrow fallback column: the same ~106px container leaves roughly
   92px for the select, and the five-character Chinese option labels need about
   70px at 14px. Drop the option text to 12px and the horizontal padding to
   6/18 so the usable text width stays at or above 60px inside that control,
   without changing the single-column layout. */
@container models (max-width: 160px) {
  .re-models .re-model-controls select { font-size: 12px; padding: 0 18px 0 6px; background-position: right 4px center; }
}
`
