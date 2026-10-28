/**
 * Per-model reasoning-level logic shared by both entry points.
 *
 * The inline Models row (Missher builds declare `settings.models.model-fields`)
 * edits a host-owned draft and lets the host save it. A host without that slot
 * has no per-model row at all, so the plugin's own settings section writes the
 * same Host `reasoningEfforts` leaf through `configForms`.
 *
 * Two rules shape this module:
 *
 * 1. **Nothing about a Host build is assumed.** Services arrive through
 *    optional injects and are accepted only when the members this module calls
 *    are actually callable; a missing member disables the capability that needs
 *    it and reports why.
 * 2. **A write is proven before it is sent.** `settingsSchema` rehydrates the
 *    published schema, resolves the exact leaf, and validates the value. A path
 *    that the schema does not resolve stays read-only, and nothing here parses
 *    the serialized envelope itself.
 *
 * @module dsh-reasoning-effort/model-reasoning
 */
import {
  capabilityLevels,
  capabilityMap,
  validCapability,
  type CapabilityDeclaration,
} from './model-capabilities.js'
import type { SlotDeclaration } from './compat.js'

/* ------------------------------------------------------------- service shapes */

/** Client-side sync state of one settings namespace. */
export interface ConfigFormSnapshotLike {
  readonly status: 'loading' | 'ready' | 'unavailable'
  readonly value: unknown
  readonly base: unknown
  readonly user: unknown
  readonly revision: number | undefined
  readonly writable: boolean
}

export interface ConfigFormLike {
  getSnapshot(): ConfigFormSnapshotLike
  subscribe(listener: () => void): () => void
  mutate(ops: readonly ReasoningOp[], expectedRevision?: number): Promise<boolean>
}

/** One namespace view the shared describe mirror serves. */
export interface SettingsNamespaceLike {
  readonly ns: string
  readonly schema: unknown
}

export interface DescribeSnapshotLike {
  readonly status: string
  readonly view: {
    readonly namespaces: readonly SettingsNamespaceLike[]
    readonly writable: boolean
  } | undefined
  readonly error: string | null
}

export interface DescribeFaceLike {
  getSnapshot(): DescribeSnapshotLike
  subscribe(listener: () => void): () => void
  ensure(): Promise<void>
}

export interface ConfigFormsLike {
  /** `undefined` when the provider's describe face is missing members this page calls. */
  describe(): DescribeFaceLike | undefined
  /** `undefined` when the namespace form is missing members this page calls. */
  get(namespace: string): ConfigFormLike | undefined
}

/**
 * The settings-owned schema service.
 *
 * `rehydrate` turns the published `toJSON()` envelope into a live node (its
 * uid/ref encoding is the Host's business), `nodeAtPath` resolves one exact
 * path, and `validate` answers the schema's own verdict for a value. This
 * module never reconstructs that envelope by hand.
 */
export interface SettingsSchemaLike {
  rehydrate(serialized: unknown): unknown
  nodeAtPath(root: unknown, path: readonly string[]): unknown
  validate(node: unknown, draft: unknown): string | undefined
}

/** The `llm` remote namespace, reduced to the one method this module calls. */
export interface LlmDirectoryLike {
  listConfigurableProviders(): Promise<unknown>
}

/** The `session` remote namespace, reduced to the one method this module calls. */
export interface ModelCatalogLike {
  modelCatalog(): Promise<unknown>
}

/* --------------------------------------------------------------- service binders */

function memberOf(value: unknown, member: string): unknown {
  if (typeof value !== 'object' || value === null) return undefined
  return (value as Record<string, unknown>)[member]
}

/**
 * Accept a service only when every member this module calls is callable.
 *
 * The returned object closes over the original receiver, so a namespace getter
 * cannot be re-entered from an unrelated context and a member method keeps its
 * `this`. Members themselves are validated per call: an older Host can provide
 * the service without the shape this page expects, and that must read as a
 * missing capability rather than throw inside a render.
 */
export function configFormsOf(service: unknown): ConfigFormsLike | undefined {
  const describe = memberOf(service, 'describe')
  const get = memberOf(service, 'get')
  if (typeof describe !== 'function' || typeof get !== 'function') return undefined
  return {
    describe: () => describeFaceOf((describe as () => unknown).call(service)),
    get: (namespace: string) => configFormOf((get as (ns: string) => unknown).call(service, namespace)),
  }
}

/** Accept one describe face only with the three members the page runs. */
export function describeFaceOf(candidate: unknown): DescribeFaceLike | undefined {
  const getSnapshot = memberOf(candidate, 'getSnapshot')
  const subscribe = memberOf(candidate, 'subscribe')
  const ensure = memberOf(candidate, 'ensure')
  if (typeof getSnapshot !== 'function' || typeof subscribe !== 'function' || typeof ensure !== 'function') return undefined
  return {
    getSnapshot: () => (getSnapshot as () => DescribeSnapshotLike).call(candidate),
    subscribe: (listener: () => void) => (subscribe as (fn: () => void) => () => void).call(candidate, listener),
    ensure: () => (ensure as () => Promise<void>).call(candidate),
  }
}

/** Accept one namespace form only with the three members the page runs. */
export function configFormOf(candidate: unknown): ConfigFormLike | undefined {
  const getSnapshot = memberOf(candidate, 'getSnapshot')
  const subscribe = memberOf(candidate, 'subscribe')
  const mutate = memberOf(candidate, 'mutate')
  if (typeof getSnapshot !== 'function' || typeof subscribe !== 'function' || typeof mutate !== 'function') return undefined
  return {
    getSnapshot: () => (getSnapshot as () => ConfigFormSnapshotLike).call(candidate),
    subscribe: (listener: () => void) => (subscribe as (fn: () => void) => () => void).call(candidate, listener),
    mutate: (ops: readonly ReasoningOp[], expectedRevision?: number) =>
      (mutate as (ops: readonly ReasoningOp[], revision?: number) => Promise<boolean>).call(candidate, ops, expectedRevision),
  }
}

export function settingsSchemaOf(service: unknown): SettingsSchemaLike | undefined {
  const rehydrate = memberOf(service, 'rehydrate')
  const nodeAtPath = memberOf(service, 'nodeAtPath')
  const validate = memberOf(service, 'validate')
  if (typeof rehydrate !== 'function' || typeof nodeAtPath !== 'function' || typeof validate !== 'function') return undefined
  return {
    rehydrate: (serialized: unknown) => (rehydrate as (value: unknown) => unknown).call(service, serialized),
    nodeAtPath: (root: unknown, path: readonly string[]) =>
      (nodeAtPath as (root: unknown, path: readonly string[]) => unknown).call(service, root, path),
    validate: (node: unknown, draft: unknown) =>
      (validate as (node: unknown, draft: unknown) => string | undefined).call(service, node, draft),
  }
}

export function llmDirectoryOf(service: unknown): LlmDirectoryLike | undefined {
  const list = memberOf(service, 'listConfigurableProviders')
  if (typeof list !== 'function') return undefined
  return { listConfigurableProviders: () => (list as () => Promise<unknown>).call(service) }
}

export function modelCatalogOf(service: unknown): ModelCatalogLike | undefined {
  const catalog = memberOf(service, 'modelCatalog')
  if (typeof catalog !== 'function') return undefined
  return { modelCatalog: () => (catalog as () => Promise<unknown>).call(service) }
}

/* ------------------------------------------------------------------- layers */

/** One provider the Host lets this client configure, with its settings seat. */
export interface ConfigurableProvider {
  readonly provider: string
  readonly displayName: string
  readonly settingsNs: string
  /** Path from the namespace section root to this provider's profile object. */
  readonly settingsPath: readonly string[]
}

/** One model a provider can route, with the levels its adapter advertises. */
export interface CatalogModel {
  readonly id: string
  readonly name: string
  readonly efforts: readonly string[]
}

export interface CatalogGroup {
  readonly provider: string
  readonly name: string
  readonly models: readonly CatalogModel[]
}

/** One model declared in a settings layer, with its real array index. */
export interface LayerModel {
  readonly id: string
  readonly index: number
  readonly name: string | undefined
  readonly reasoningEfforts: unknown
}

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

/** A canonical non-negative array index string (`0`, `1`, …), or undefined. */
function arrayIndex(step: string): number | undefined {
  if (!/^(?:0|[1-9][0-9]*)$/u.test(step)) return undefined
  const index = Number(step)
  return Number.isSafeInteger(index) ? index : undefined
}

/**
 * Take one JSON path step over a plain object or an array.
 *
 * Arrays resolve an index only when that index is a legal in-range own element:
 * `"1"` on a two-element list resolves, `"5"` does not, a sparse hole does not
 * (`hasOwn` is false), and `"length"` or any other non-index key is absent.
 * Objects resolve own properties only, so an inherited member never counts as
 * JSON data. Scalars, `null` and missing steps report absent.
 *
 * `isRecord` deliberately stays object-shaped; this helper adds the array axis
 * instead of relaxing the shared predicate.
 */
function stepInto(current: unknown, step: string): { found: true; value: unknown } | { found: false } {
  if (Array.isArray(current)) {
    const index = arrayIndex(step)
    if (index === undefined || index >= current.length) return { found: false }
    if (!Object.hasOwn(current, index)) return { found: false }
    return { found: true, value: current[index] }
  }
  if (!isRecord(current)) return { found: false }
  if (!Object.hasOwn(current, step)) return { found: false }
  return { found: true, value: current[step] }
}

/** Resolve one path through a JSON layer (objects and array indices). */
export function valueAt(value: unknown, path: readonly string[]): unknown {
  let current = value
  for (const step of path) {
    const next = stepInto(current, step)
    if (!next.found) return undefined
    current = next.value
  }
  return current
}

/** Report whether a path exists, independently of its value. */
export function hasPath(value: unknown, path: readonly string[]): boolean {
  let current = value
  for (const step of path) {
    const next = stepInto(current, step)
    if (!next.found) return false
    current = next.value
  }
  return true
}

/** Models a layer declares for one provider, in declaration order. */
export function modelsAt(layer: unknown, settingsPath: readonly string[]): LayerModel[] {
  const models = valueAt(layer, [...settingsPath, 'models'])
  if (!Array.isArray(models)) return []
  const entries: LayerModel[] = []
  for (const [index, model] of models.entries()) {
    if (!isRecord(model) || typeof model.id !== 'string' || model.id.length === 0) continue
    entries.push({
      id: model.id,
      index,
      name: typeof model.name === 'string' ? model.name : undefined,
      reasoningEfforts: model.reasoningEfforts,
    })
  }
  return entries
}

/** Read the configurable-provider directory from a `RemoteResult` value. */
export function configurableProvidersOf(value: unknown): ConfigurableProvider[] {
  if (!Array.isArray(value)) return []
  const providers: ConfigurableProvider[] = []
  for (const entry of value) {
    if (!isRecord(entry)) continue
    const provider = entry.provider
    const settingsNs = entry.settingsNs
    const settingsPath = entry.settingsPath
    if (typeof provider !== 'string' || provider.length === 0) continue
    if (typeof settingsNs !== 'string' || settingsNs.length === 0) continue
    if (!Array.isArray(settingsPath) || !settingsPath.every(step => typeof step === 'string')) continue
    providers.push({
      provider,
      displayName: typeof entry.displayName === 'string' && entry.displayName.length > 0 ? entry.displayName : provider,
      settingsNs,
      settingsPath: settingsPath as string[],
    })
  }
  return providers
}

/** Read the routable model directory from a `RemoteResult` value. */
export function catalogGroupsOf(value: unknown): CatalogGroup[] {
  if (!isRecord(value) || !Array.isArray(value.groups)) return []
  const groups: CatalogGroup[] = []
  for (const group of value.groups) {
    if (!isRecord(group) || typeof group.id !== 'string') continue
    const models: CatalogModel[] = []
    for (const model of Array.isArray(group.models) ? group.models : []) {
      if (!isRecord(model) || typeof model.id !== 'string') continue
      const reasoning = isRecord(model.reasoning) ? model.reasoning : undefined
      const efforts = Array.isArray(reasoning?.efforts)
        ? reasoning.efforts
          .filter((effort): effort is Record<string, unknown> => isRecord(effort) && typeof effort.id === 'string')
          .map(effort => effort.id as string)
        : []
      models.push({
        id: model.id,
        name: typeof model.name === 'string' && model.name.length > 0 ? model.name : model.id,
        efforts,
      })
    }
    groups.push({ provider: group.id, name: typeof group.name === 'string' ? group.name : group.id, models })
  }
  return groups
}

/* ------------------------------------------------------------- declarations */

/** Declaration shape shared with the inline row. */
export type ReasoningMode = 'inherit' | 'disabled' | 'custom'

export interface DeclarationState {
  readonly mode: ReasoningMode
  readonly mapping: Readonly<Record<string, string | null>>
  /** False when the stored value is not a declaration this plugin can round-trip. */
  readonly valid: boolean
}

/**
 * Classify one stored declaration exactly as the inline row does:
 * omitted = inherit, `false` = no reasoning support, object = explicit map.
 */
export function declarationState(value: unknown): DeclarationState {
  if (value === undefined) return { mode: 'inherit', mapping: {}, valid: true }
  if (value === false) return { mode: 'disabled', mapping: {}, valid: true }
  return { mode: 'custom', mapping: capabilityMap(value), valid: validCapability(value) }
}

/** The editable declaration for one stored value. */
export function declarationOf(value: unknown): CapabilityDeclaration {
  const state = declarationState(value)
  if (state.mode === 'inherit') return undefined
  if (state.mode === 'disabled') return false
  return { ...state.mapping }
}

/** Stable comparison key for one declaration. */
export function declarationKey(value: CapabilityDeclaration): string {
  return JSON.stringify(value ?? null)
}

/* ----------------------------------------------------------------- row plans */

/** Why one model row is read-only, or `null` when it is editable. */
export type RowReason =
  | 'namespace-unavailable'
  | 'document-readonly'
  | 'bad-path'
  | 'duplicate-id'
  | 'models-list'
  | 'not-in-catalog'
  | 'unconfirmed-leaf'

export interface RowPlanInput {
  readonly id: string
  readonly name: string
  readonly efforts: readonly string[]
  readonly settingsPath: readonly string[]
  readonly user: unknown
  readonly base: unknown
  readonly value: unknown
  readonly catalogIds: ReadonlySet<string>
  readonly documentWritable: boolean
  readonly namespaceReady: boolean
  /** Schema proof for one exact leaf; false disables the row. */
  readonly leafWritable: (path: readonly string[]) => boolean
}

export interface RowPlan {
  readonly id: string
  readonly name: string
  readonly efforts: readonly string[]
  readonly path: readonly string[] | null
  readonly declaration: CapabilityDeclaration
  readonly inherited: CapabilityDeclaration
  readonly reason: RowReason | null
}

/** A value the leaf schema accepts, used to prove a path is writable. */
export const SAMPLE_DECLARATION: CapabilityDeclaration = { low: 'sample' }

/**
 * Decide one model's editable leaf and its inherit/explicit state.
 *
 * A user-layer model entry owns `models[index].reasoningEfforts`, indexed by the
 * id the layer carries. Only when the user layer declares no `models` list may a
 * catalog model use `modelOverrides[id]`, which the Host accepts only beside an
 * empty models list and only for an installed-catalog id. In that case the
 * user's own *presence* at the override leaf is what marks an explicit
 * declaration; the inherited value is read from the base layer, never from the
 * resolved value (which already contains the inheritance).
 */
export function planModelRow(input: RowPlanInput): RowPlan {
  const head = { id: input.id, name: input.name, efforts: input.efforts }
  const readOnly = (reason: RowReason, declaration: CapabilityDeclaration = undefined, inherited: CapabilityDeclaration = undefined): RowPlan =>
    ({ ...head, path: null, declaration, inherited, reason })

  if (!input.namespaceReady) return readOnly('namespace-unavailable')
  if (!input.documentWritable) return readOnly('document-readonly')
  if (!input.settingsPath.every(step => typeof step === 'string')) return readOnly('bad-path')

  const userModels = modelsAt(input.user, input.settingsPath)
  const own = userModels.filter(model => model.id === input.id)
  if (own.length > 1) return readOnly('duplicate-id')
  const entry = own[0]
  if (entry !== undefined) {
    const path = [...input.settingsPath, 'models', String(entry.index), 'reasoningEfforts']
    if (!input.leafWritable(path)) return readOnly('unconfirmed-leaf', declarationOf(entry.reasoningEfforts))
    const baseEntry = modelsAt(input.base, input.settingsPath).find(model => model.id === input.id)
    return {
      ...head,
      path,
      declaration: declarationOf(entry.reasoningEfforts),
      inherited: declarationOf(baseEntry?.reasoningEfforts),
      reason: null,
    }
  }

  /* No user entry: the model is served by the installed catalog. A non-empty
     models list in the resolved layer replaces that catalog, so an override
     address would be rejected by the Host — and it may not be invented here. */
  if (modelsAt(input.value, input.settingsPath).length > 0) return readOnly('models-list')
  if (!input.catalogIds.has(input.id)) return readOnly('not-in-catalog')
  const overridePath = [...input.settingsPath, 'modelOverrides', input.id, 'reasoningEfforts']
  const inherited = declarationOf(valueAt(input.base, overridePath))
  if (!input.leafWritable(overridePath)) return readOnly('unconfirmed-leaf', undefined, inherited)
  return {
    ...head,
    path: overridePath,
    declaration: hasPath(input.user, overridePath) ? declarationOf(valueAt(input.user, overridePath)) : undefined,
    inherited,
    reason: null,
  }
}

/* ------------------------------------------------------------ schema proof */

export type LeafCheck = 'ok' | 'missing' | 'invalid' | 'unavailable'

/**
 * Ask the public schema service whether one exact leaf exists and accepts one
 * value. The serialized envelope is passed straight back to `rehydrate`: this
 * module never decodes it.
 */
export function checkLeaf(
  schema: SettingsSchemaLike | undefined,
  serialized: unknown,
  path: readonly string[],
  value: unknown,
): LeafCheck {
  if (schema === undefined) return 'unavailable'
  try {
    const root = schema.rehydrate(serialized)
    const node = schema.nodeAtPath(root, path)
    if (node === undefined || node === null) return 'missing'
    return schema.validate(node, value) === undefined ? 'ok' : 'invalid'
  } catch {
    return 'unavailable'
  }
}

/* -------------------------------------------------------- explicit mapping */

/** Levels the adapter advertises, deduplicated, limited to the DSH vocabulary. */
export function offeredLevels(efforts: readonly string[]): string[] {
  const known = new Set<string>(capabilityLevels)
  return [...new Set(efforts)].filter(level => known.has(level))
}

/** One editable row of an explicit mapping. */
export interface MappingRow {
  readonly level: string
  /** Endpoint spelling exactly as the user typed it. */
  readonly wire: string
  /** Whether this level is part of the declaration. */
  readonly enabled: boolean
  /** Whether the model's adapter advertises this level. */
  readonly offered: boolean
}

/**
 * Seed the explicit-mapping editor.
 *
 * The candidate set is the whole DSH level vocabulary plus any declared key
 * outside it, and it never shrinks with the current ticks: a declaration only
 * decides which rows start checked and what spelling each carries. Ticking
 * `low` must not remove `high` from the list, and clearing a level must leave it
 * available to tick again. Declared wirings are kept verbatim; nothing is
 * inferred from a level name.
 */
export function initialMappingRows(offered: readonly string[], declared: Readonly<Record<string, string | null>>): MappingRow[] {
  const order = new Map<string, number>(capabilityLevels.map((level, index) => [level, index] as const))
  const offeredSet = new Set(offered)
  const levels: string[] = [...capabilityLevels]
  for (const level of Object.keys(declared)) if (!levels.includes(level)) levels.push(level)
  levels.sort((left, right) => (order.get(left) ?? order.size) - (order.get(right) ?? order.size))
  return levels.map(level => ({
    level,
    wire: typeof declared[level] === 'string' ? declared[level] as string : '',
    enabled: Object.hasOwn(declared, level),
    offered: offeredSet.has(level),
  }))
}

/**
 * Build the draft value the enabled rows currently describe, *without*
 * judging it. An enabled row with a blank spelling contributes an empty
 * string, so the parent sees the incomplete draft and can block the save
 * instead of holding an older valid value.
 */
export function rowsDeclaration(rows: readonly MappingRow[]): Record<string, string | null> {
  const value: Record<string, string | null> = {}
  for (const row of rows) {
    if (!row.enabled) continue
    value[row.level] = row.level === 'off' && row.wire.trim().length === 0 ? null : row.wire
  }
  return value
}

export type MappingFailure = 'empty' | 'unknown-level' | 'blank-wire'

export interface MappingResult {
  readonly ok: boolean
  readonly reason?: MappingFailure
}

/**
 * Judge the enabled rows.
 *
 * Refuses, rather than repairs: an unknown level, a blank endpoint spelling
 * (whitespace only), or no enabled level above `off`. Stored spellings are
 * preserved byte for byte — only a value that is empty after trimming is
 * rejected, never rewritten.
 */
export function mappingValidity(rows: readonly MappingRow[]): MappingResult {
  const selected = rows.filter(row => row.enabled)
  if (selected.length === 0) return { ok: false, reason: 'empty' }
  for (const row of selected) {
    if (!(capabilityLevels as readonly string[]).includes(row.level)) return { ok: false, reason: 'unknown-level' }
    if (row.wire.trim().length === 0 && row.level !== 'off') return { ok: false, reason: 'blank-wire' }
  }
  if (!selected.some(row => row.level !== 'off')) return { ok: false, reason: 'empty' }
  return { ok: true }
}

/* ------------------------------------------------------------------- writes */

/** One path-addressed settings edit (the Host's wire op shape). */
export type ReasoningOp =
  | { readonly op: 'set'; readonly path: readonly string[]; readonly value: unknown }
  | { readonly op: 'unset'; readonly path: readonly string[] }

/** The exact leaf write for one model: set the declaration, or clear it to inherit. */
export function reasoningOp(path: readonly string[], next: CapabilityDeclaration): ReasoningOp {
  return next === undefined
    ? { op: 'unset', path: [...path] }
    : { op: 'set', path: [...path], value: next }
}

/** Settlement of one Host write, without losing the draft on failure. */
export type WriteOutcome =
  | { readonly kind: 'accepted' }
  | { readonly kind: 'refused' }
  | { readonly kind: 'failed'; readonly message: string }

/** Fold `ConfigForm.mutate`'s boolean/rejection contract into one outcome. */
export async function settleWrite(run: () => Promise<boolean>): Promise<WriteOutcome> {
  try {
    return (await run()) ? { kind: 'accepted' } : { kind: 'refused' }
  } catch (error) {
    return { kind: 'failed', message: error instanceof Error ? error.message : String(error) }
  }
}

/* ------------------------------------------------------------ draft lifecycle */

export interface DraftState {
  /** What the editor shows. */
  readonly draft: CapabilityDeclaration
  /** The value `draft` is compared against to decide whether it is dirty. */
  readonly baselineKey: string
  /** Revision captured when the draft diverged from its baseline. */
  readonly baseRevision: number | undefined
  /** A value the Host has accepted and that has not been reported back yet. */
  readonly acknowledgedKey: string | null
  /** The Host changed this target while a draft was pending. */
  readonly conflict: boolean
}

export type DraftEvent =
  | { readonly type: 'host'; readonly declaration: CapabilityDeclaration; readonly revision: number | undefined }
  | { readonly type: 'edit'; readonly declaration: CapabilityDeclaration; readonly revision: number | undefined }
  | { readonly type: 'reset'; readonly declaration: CapabilityDeclaration; readonly revision: number | undefined }
  | { readonly type: 'write'; readonly outcome: WriteOutcome }

export function createDraftState(declaration: CapabilityDeclaration, revision: number | undefined): DraftState {
  return {
    draft: declaration,
    baselineKey: declarationKey(declaration),
    baseRevision: revision,
    acknowledgedKey: null,
    conflict: false,
  }
}

/**
 * The one place draft state is decided; the React row dispatches into it.
 *
 * - A clean row follows the Host, including a revision bump caused by another
 *   row's save, so an untouched row is never born stale.
 * - A clean row captures the current revision the moment it becomes dirty.
 * - A dirty row keeps its draft when the Host reports a change for the same
 *   target, and says so, instead of silently discarding what the user typed.
 * - An accepted write becomes the new baseline until the Host reports it, so the
 *   row is not immediately dirty again while the write is still in flight.
 */
export function draftReducer(state: DraftState, event: DraftEvent): DraftState {
  switch (event.type) {
    case 'host': {
      /* A draft that matches the OLD baseline is not "clean" while a conflict
         is pending: the Host has already reported a newer value, and adopting
         the next Host declaration here would silently drop the user's draft and
         the conflict notice. Only an explicit reset re-bases a conflicted row. */
      const clean = !state.conflict && declarationKey(state.draft) === state.baselineKey
      if (state.acknowledgedKey !== null || clean) return createDraftState(event.declaration, event.revision)
      return { ...state, conflict: true }
    }
    case 'edit': {
      const key = declarationKey(event.declaration)
      /* A conflict is only cleared by an explicit reset (or by the Host itself
         reporting the value, which arrives as a `host` event). Typing the old
         baseline back must not look "clean": the Host has already moved on, and
         treating the stale baseline as current is exactly how a later edit would
         overwrite the Host's newer value. */
      const wasClean = !state.conflict && declarationKey(state.draft) === state.baselineKey
      const becomesClean = !state.conflict && key === state.baselineKey
      return {
        draft: event.declaration,
        baselineKey: state.baselineKey,
        baseRevision: wasClean ? event.revision : state.baseRevision,
        acknowledgedKey: null,
        conflict: becomesClean ? false : state.conflict,
      }
    }
    case 'reset':
      return createDraftState(event.declaration, event.revision)
    case 'write': {
      /* Only a Host acceptance moves the baseline. A refusal and a transport
         failure both leave the draft, its revision and the conflict flag
         exactly as they were, so the user never loses typed values. */
      if (event.outcome.kind !== 'accepted') return state
      const key = declarationKey(state.draft)
      return { ...state, baselineKey: key, acknowledgedKey: key, conflict: false }
    }
  }
}

/** Whether the draft differs from what it is compared against. */
export function draftDirty(state: DraftState): boolean {
  return declarationKey(state.draft) !== state.baselineKey
}

/** Whether the revision the draft captured is no longer the Host's revision. */
export function draftStale(state: DraftState, revision: number | undefined): boolean {
  return draftDirty(state) && state.baseRevision !== revision
}

/**
 * The save gate the row and the tests share: an editable, changed, valid draft
 * that the Host has not contradicted. A conflict keeps it closed until reset.
 */
export function draftSaveable(state: DraftState, revision: number | undefined, valid: boolean): boolean {
  return valid && draftDirty(state) && !state.conflict && !draftStale(state, revision)
}

/* ---------------------------------------------------------------- lifecycle */

/** Whether the optional page replaces the inline row, and its teardown rule. */
export interface FallbackLifecycle {
  /** Follow the live slot declaration; `show` runs at most once per absence. */
  sync(state: SlotDeclaration): void
  /** Mark teardown first, so a collapse during unload cannot re-show the page. */
  stop(): void
  readonly stopped: boolean
  readonly shown: boolean
}

/**
 * The absent → present → absent lifecycle of the inline Models row.
 *
 * `show` never runs twice for one absence, and nothing is shown again after
 * `stop`, so an unload cannot resurrect a page that is being torn down.
 */
export function createFallbackLifecycle(show: () => void, hide: () => void): FallbackLifecycle {
  let shown = false
  let stopped = false
  const hideNow = () => {
    if (!shown) return
    shown = false
    hide()
  }
  return {
    sync(state) {
      if (stopped) return
      if (state === 'declared') {
        hideNow()
        return
      }
      if (shown) return
      shown = true
      show()
    },
    stop() {
      stopped = true
      hideNow()
    },
    get stopped() { return stopped },
    get shown() { return shown },
  }
}
