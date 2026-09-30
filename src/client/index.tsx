/**
 * Session-scoped model and reasoning-effort control for the DSH composer model seat.
 *
 * The control deliberately follows DSH's own session model-selection contract:
 * `sessions.models()` supplies the exact current route and its adapter-owned
 * effort metadata; `sessions.selectModel()` submits the complete selection for
 * the next assembled turn. The slider adapts to whatever effort levels the
 * current model exposes — their count and order are the adapter's, never
 * assumed here.
 *
 * @module dsh-reasoning-effort/client
 */
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react'
import type { CSSProperties, KeyboardEvent as ReactKeyboardEvent } from 'react'
import type { Context as ClientContext } from '@deepseek-ai/cordis'
import type {} from '@deepseek-ai/dsh-client-locale/client'
import type {} from '@deepseek-ai/dsh-client-ui-renderer/client'
import type {} from '@deepseek-ai/dsh-client-ui-conversation/client'
import type {} from '@deepseek-ai/dsh-client-ui-settings/client'
import type { PropsLocale } from '@deepseek-ai/dsh-client-ui-slots'
import type { ModelSelection, SessionId } from '@deepseek-ai/dsh-api-remotes/client'
import type {
  ModelDirectory,
  ModelDirectoryResolver,
  ModelDirectoryState,
} from '@deepseek-ai/dsh-client-ui-model-selection/client'
import {
  en,
  NS,
  zh,
  type ReasoningEffortTranslate,
} from './locales.js'
import { CSS } from './styles.js'
import { PIXEL_CSS } from './pixel-styles.js'
import { registerModelSettings, MODEL_SETTINGS_CSS } from './model-settings.js'
import { PixelField } from './pixel-field.js'
import { displayLevelName, effortStops, levelIds, levelsText, stopIndex, acceptedStopIndex, type EffortStop } from './levels.js'
import { positionModelMenu } from './menu-position.js'
import { requireAcceptedSelection, unsupportedEffort } from './selection.js'
import {
  DEFAULT_PALETTE_ID,
  PALETTES,
  paletteOrDefault,
} from './palettes.js'
// Agent briefs inlined as text at build time; the copied document picks one by
// the active locale.
import agentTutorialEn from './agent-tutorial.en.md'
import agentTutorialZh from './agent-tutorial.zh.md'

/** One selectable effort exactly as the owning adapter advertised it. */
/** Host RPC result envelope (matches `@deepseek-ai/dsh-host-apiproxy`). */
type ReRpcResult<T> =
  | { ok: true; value: T }
  | { ok: false; error: { code: string; message: string } }

interface HostRpc {
  call(channel: string, endpoint: string, payload?: unknown): Promise<unknown>
}

/** Channel the Host half registers its guidance endpoints on. */
const ADAPT_CHANNEL = '/dsh-reasoning-effort'

/** One guidance result from the Host half. */
interface AdaptGuidance {
  readonly provider: string
  readonly model: string
  readonly userDeclared: boolean
  readonly needsGuide: boolean
  readonly reason: 'missing' | 'mismatch' | 'none'
  readonly current: string[]
  readonly expected: string[]
  readonly matched: boolean
  readonly mode: 'replace' | 'insert'
  readonly noteKey: 'glm52' | 'kimiK3' | null
  readonly note: string | null
  readonly warning: 'developerRole' | null
  readonly entryHead: string | null
  readonly fieldBlock: string | null
  readonly entryLine: string
  readonly entryPath: string
  readonly modelIndent: number
  readonly settingsPath: string | null
}

/** The client-facing guidance service (Client→Host over the Connection RPC). */
interface AdaptationService {
  diagnose(provider: string, model: string): Promise<AdaptGuidance | null>
}

/**
 * Localized field-block template for a model the knowledge base does not know.
 *
 * `compat` stays a commented example rather than a written block: a guessed
 * `thinkingFormat` is worse than none, because the endpoint then receives a
 * switch it does not read, while an absent `compat` lets the adapter apply its
 * own base-URL detection (which is what an unrecognized OpenAI-compatible
 * endpoint wants anyway, and the correct vendor format for a recognized one).
 */
function templateSnippet(t: ReasoningEffortTranslate, modelIndent: number): string {
  const fieldPrefix = ' '.repeat(modelIndent + 2)
  const valuePrefix = ' '.repeat(modelIndent + 4)
  return [
    `${fieldPrefix}reasoningEfforts:`,
    `${valuePrefix}low: "low"        # ${t('yaml.keyComment')}`,
    `${valuePrefix}high: "high"      # ${t('yaml.valueComment')}`,
    `${fieldPrefix}# ${t('yaml.compatComment')}`,
    `${fieldPrefix}# compat:`,
    `${fieldPrefix}#   thinkingFormat: "qwen"`,
    `${fieldPrefix}#   supportsReasoningEffort: false`,
    `${fieldPrefix}#   supportsDeveloperRole: false`,
  ].join('\n')
}

function configDocumentName(path: string | null): string {
  return path?.split(/[\\/]/u).at(-1) || 'settings.yaml'
}

function guidanceNote(guidance: AdaptGuidance, t: ReasoningEffortTranslate): string {
  if (guidance.note !== null) return guidance.note
  if (guidance.noteKey === 'glm52') return t('knowledge.glm52')
  if (guidance.noteKey === 'kimiK3') return t('knowledge.kimiK3')
  return t('knowledge.unknown')
}

function guidanceWarning(guidance: AdaptGuidance, t: ReasoningEffortTranslate): string | null {
  return guidance.warning === 'developerRole' ? t('warning.developerRole') : null
}

function guidanceSnippet(guidance: AdaptGuidance, t: ReasoningEffortTranslate): string {
  const block = guidance.fieldBlock ?? templateSnippet(t, guidance.modelIndent)
  return guidance.entryHead === null ? block : `${guidance.entryHead}\n${block}`
}

/**
 * The whole document a user hands to an agent: what was observed, what to do,
 * the level-declaration rules, and the suggested block as a starting point.
 * The rules themselves live in the markdown briefs so they can be reviewed and
 * revised as documents rather than as dictionary strings.
 */
function agentBrief(
  guidance: AdaptGuidance,
  snippet: string,
  tutorial: string,
  warning: string | null,
  t: ReasoningEffortTranslate,
): string {
  const facts = [
    t('agent.facts', {
      provider: guidance.provider,
      model: guidance.model,
      path: guidance.settingsPath ?? '-',
      entryPath: guidance.entryPath,
      entryLine: guidance.entryLine,
      current: levelsText(guidance.current, t),
      expected: guidance.matched ? levelsText(guidance.expected, t) : t('level.none'),
    }),
    ...(warning === null ? [] : [t('agent.warningLine', { warning })]),
  ].join('\n')
  return [
    t('agent.intro'),
    '',
    t('agent.factsHeading'),
    facts,
    '',
    t('agent.task'),
    '',
    '---',
    '',
    tutorial.replace(/\r\n/gu, '\n')
      .replaceAll('{{CONFIG_FILE}}', configDocumentName(guidance.settingsPath))
      .replaceAll('{{ENTRY_PATH}}', guidance.entryPath)
      .trim(),
    '',
    `## ${t('agent.snippetHeading')}`,
    '',
    '```yaml',
    snippet,
    '```',
    '',
  ].join('\n')
}

/** Wrap the Host RPC channel in typed helpers; null while the Host half is absent. */
function makeAdaptationService(rpc: HostRpc | undefined): AdaptationService | null {
  if (rpc === undefined) return null
  const call = async <T,>(endpoint: string, payload?: unknown): Promise<T | null> => {
    try {
      const result = (await rpc.call(ADAPT_CHANNEL, endpoint, payload)) as ReRpcResult<T>
      return result.ok ? result.value : null
    } catch {
      return null
    }
  }
  return {
    diagnose: (provider, model) => call<AdaptGuidance>('diagnose', { provider, model }),
  }
}

/** Copy text to the clipboard, falling back to a transient textarea selection. */
async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    try {
      const textarea = document.createElement('textarea')
      textarea.value = text
      textarea.style.position = 'fixed'
      textarea.style.opacity = '0'
      document.body.appendChild(textarea)
      textarea.select()
      const ok = document.execCommand('copy')
      textarea.remove()
      return ok
    } catch {
      return false
    }
  }
}

/** The slice of the locale service this half reads: the active language id. */
interface LocaleRuntimeLike {
  getLocale(): { active: string }
}

interface ModelSeatInjectedProps {
  readonly locked: boolean
  readonly available: boolean
  readonly controller: ModelDirectory
  readonly directory: ModelDirectory['store']
  readonly load: () => void
  readonly select: (selection: ModelSelection) => Promise<boolean>
  readonly adapt: AdaptationService | null
  /** Rules document for the active locale, read at copy time. */
  readonly agentTutorial: () => string
}

type ModelSeatProps = ModelSeatInjectedProps & PropsLocale<typeof NS>

const SLOT = 'conversation.input.model'
const SETTINGS_SLOT = 'settings.general.item'
const ENABLED_STORAGE_KEY = 'dsh-reasoning-effort.enabled'
const LEGACY_ENABLED_STORAGE_KEY = '@dsh-external/dsh-reasoning-effort.enabled'
/** LOCAL ADDITION: particle palette id. */
const PALETTE_STORAGE_KEY = 'dsh-reasoning-effort.palette'
export const inject = ['slots', 'modelDirectories', 'connection', 'locale', 'remote', 'remote.session']

function readEnabledPreference(): boolean {
  try {
    const current = window.localStorage.getItem(ENABLED_STORAGE_KEY)
    const stored = current ?? window.localStorage.getItem(LEGACY_ENABLED_STORAGE_KEY)
    return stored !== 'false'
  } catch {
    return true
  }
}

let enabledPreference = readEnabledPreference()
const enabledListeners = new Set<() => void>()

const enabledStore = {
  getSnapshot: () => enabledPreference,
  subscribe: (listener: () => void) => {
    enabledListeners.add(listener)
    return () => enabledListeners.delete(listener)
  },
  set: (enabled: boolean, persist = true) => {
    if (enabledPreference === enabled) return
    enabledPreference = enabled
    if (persist) {
      try {
        window.localStorage.setItem(ENABLED_STORAGE_KEY, String(enabled))
      } catch {
        // The current page still follows the choice when storage is unavailable.
      }
    }
    enabledListeners.forEach((listener) => listener())
  },
}

/** Particle palette preference, synchronized across tabs. */
function validPalette(id: string): boolean {
  return /^#[0-9a-f]{6}$/i.test(id) || PALETTES.some(palette => palette.id === id)
}

function paletteColor(id: string): string {
  return /^#[0-9a-f]{6}$/i.test(id) ? id : paletteOrDefault(id).accent
}

function readPalettePreference(): string {
  try {
    const stored = window.localStorage.getItem(PALETTE_STORAGE_KEY)
    // Anything unrecognised (a palette removed in a later version, hand-edited
    // storage) falls back to the upstream default instead of breaking the slider.
    return stored !== null && validPalette(stored)
      ? stored
      : DEFAULT_PALETTE_ID
  } catch {
    return DEFAULT_PALETTE_ID
  }
}

let palettePreference = readPalettePreference()
const paletteListeners = new Set<() => void>()

const paletteStore = {
  getSnapshot: () => palettePreference,
  subscribe: (listener: () => void) => {
    paletteListeners.add(listener)
    return () => paletteListeners.delete(listener)
  },
  set: (id: string, persist = true) => {
    const next = validPalette(id) ? id : DEFAULT_PALETTE_ID
    if (palettePreference === next) return
    palettePreference = next
    if (persist) {
      try {
        window.localStorage.setItem(PALETTE_STORAGE_KEY, next)
      } catch {
        // The current page still follows the choice when storage is unavailable.
      }
    }
    paletteListeners.forEach((listener) => listener())
  },
}

function currentModel(state: ModelDirectoryState) {
  if (state.current === null) return undefined
  const group = state.groups.find((candidate) => candidate.id === state.current?.provider)
  return group?.models.find((candidate) => candidate.id === state.current?.model)
}

/**
 * Effort levels the current model advertises, in adapter order. A model needs
 * at least two before a slider says anything a plain label would not, so
 * fewer-than-two collapses to none.
 */
function sliderLevels(state: ModelDirectoryState): readonly EffortStop[] {
  const efforts = currentModel(state)?.reasoning?.efforts
  if (efforts === undefined) return []
  /* LOCAL CHANGE: the ladder always carries DSH's whole vocabulary; a rung the
     model does not advertise submits the nearest level it does. Upstream passed
     the offered levels straight through, so a four-level model got four rungs. */
  return effortStops(efforts.map((effort) => effort.id))
}

function effortIndex(levels: readonly EffortStop[], id: string | undefined): number {
  return stopIndex(levels, id)
}

function clampIndex(value: number, count: number): number {
  return Math.max(0, Math.min(count - 1, Math.round(value)))
}

/**
 * Level index the slider should rest at: the session's current effort when the
 * model still offers it, else the adapter default, else the middle level.
 */
function effectiveEffortIndex(levels: readonly EffortStop[], state: ModelDirectoryState): number {
  const reasoning = currentModel(state)?.reasoning
  const current = effortIndex(levels, state.current?.reasoningEffort)
  if (current >= 0) return current
  const fallback = effortIndex(levels, reasoning?.defaultEffort)
  if (fallback >= 0) return fallback
  return Math.floor((levels.length - 1) / 2)
}

function EffortSlider({ directory, t }: { directory: ModelDirectory; t: ReasoningEffortTranslate }) {
  const directoryState = useSyncExternalStore(
    (notify) => directory.store.subscribe(notify),
    () => directory.store.getSnapshot(),
  )
  const levels = useMemo(() => sliderLevels(directoryState), [directoryState])
  const [effort, setEffort] = useState('')
  const [preview, setPreview] = useState(0)
  const [committing, setCommitting] = useState(false)
  const [dragging, setDragging] = useState(false)
  const [localError, setLocalError] = useState<string | null>(null)
  /* LOCAL ADDITION: the palette both scopes the generated CSS and drives the canvas. */
  const palette = useSyncExternalStore(paletteStore.subscribe, paletteStore.getSnapshot)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const committedRef = useRef('')
  const committedIndexRef = useRef(-1)
  const syncedModelRef = useRef('')
  const previewFrameRef = useRef<number | null>(null)
  const pendingPreviewRef = useRef(0)
  const committingRef = useRef(false)
  const previewRef = useRef(0)
  const draggingRef = useRef(false)
  const pointerActiveRef = useRef(false)
  const activePointerIdRef = useRef<number | null>(null)
  const globalPointerMoveRef = useRef<((event: PointerEvent) => void) | null>(null)
  const globalPointerEndRef = useRef<((event: PointerEvent) => void) | null>(null)
  const globalPointerCancelRef = useRef<((event: PointerEvent) => void) | null>(null)
  const pixelsRef = useRef<PixelField | null>(null)
  const invalidEffort = unsupportedEffort(directoryState.current?.reasoningEffort, currentModel(directoryState)?.reasoning?.efforts)
  const available = directoryState.current !== null && levels.length >= 2
  const busy = committing || directoryState.status === 'selecting'
  const error = localError ?? directoryState.error

  useEffect(() => {
    if (!available || committingRef.current || draggingRef.current) return
    const modelKey = JSON.stringify([directoryState.current?.provider, directoryState.current?.model])
    const accepted = syncedModelRef.current === modelKey
      ? acceptedStopIndex(levels, directoryState.current?.reasoningEffort, committedIndexRef.current) : -1
    const index = accepted >= 0 ? accepted : effectiveEffortIndex(levels, directoryState)
    const next = levels[index]?.send ?? ''
    syncedModelRef.current = modelKey
    committedIndexRef.current = index
    committedRef.current = next
    previewRef.current = index
    setEffort(next)
    setPreview(index)
    setLocalError(null)
  }, [available, levels, directoryState])

  useEffect(() => {
    directory.load().catch(() => undefined)
  }, [directory])

  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas === null) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    const pixels = new PixelField(canvas, reduced)
    pixelsRef.current = pixels
    pixels.setColor(paletteColor(paletteStore.getSnapshot()))
    const resize = new ResizeObserver(() => pixels.resize())
    if (canvas.parentElement) resize.observe(canvas.parentElement)
    const sync = () => pixels.sync()
    document.addEventListener('visibilitychange', sync)
    reduced.addEventListener('change', sync)
    return () => {
      pixels.setActive(false)
      pixels.sync()
      resize.disconnect()
      document.removeEventListener('visibilitychange', sync)
      reduced.removeEventListener('change', sync)
      pixelsRef.current = null
    }
  }, [available])

  useEffect(() => {
    pixelsRef.current?.setColor(paletteColor(palette))
  }, [available, palette])
  const topPreview = invalidEffort === undefined && clampIndex(preview, levels.length) === levels.length - 1
  useEffect(() => { pixelsRef.current?.setActive(topPreview) }, [available, topPreview])

  const commit = useCallback(async (raw: number) => {
    if (committingRef.current) return
    committingRef.current = true
    const previous = committedRef.current
    const previousIndex = committedIndexRef.current

    setDragging(false)
    setCommitting(true)
    setLocalError(null)

    // Optimistic snap from the rendered levels keeps the thumb responsive
    // while the directory round-trip revalidates against fresh data below.
    const optimisticIndex = clampIndex(raw, levels.length)
    const optimistic = levels[optimisticIndex]?.id
    if (optimistic !== undefined) {
      previewRef.current = optimisticIndex
      setPreview(optimisticIndex)
      setEffort(optimistic)
    }

    try {
      const models = await directory.load()
      if (models.current === null) throw new Error(t('effort.unavailable'))
      const fresh: ModelDirectoryState = {
        ...directory.store.getSnapshot(),
        current: models.current,
        routable: models.routable,
        groups: models.groups,
        failures: models.failures,
        status: 'ready',
        error: null,
      }
      const freshLevels = sliderLevels(fresh)
      const index = clampIndex(raw, freshLevels.length)
      const next = freshLevels[index]?.send
      if (next === undefined) throw new Error(t('effort.unavailable'))

      previewRef.current = index
      setPreview(index)
      setEffort(next)

      const result = await directory.select({
        provider: models.current.provider,
        model: models.current.model,
        reasoningEffort: next,
      })
      requireAcceptedSelection(result)

      const snapshot = directory.store.getSnapshot()
      const accepted = acceptedStopIndex(freshLevels, snapshot.current?.reasoningEffort, index)
      const settled = accepted >= 0 ? accepted : index
      const settledId = freshLevels[settled]?.send ?? next
      committedIndexRef.current = settled
      syncedModelRef.current = JSON.stringify([models.current.provider, models.current.model])
      committedRef.current = settledId
      previewRef.current = settled
      setEffort(settledId)
      setPreview(settled)
    } catch (cause) {
      const restore = Math.max(0, acceptedStopIndex(levels, previous, previousIndex))
      committedIndexRef.current = restore
      committedRef.current = previous
      previewRef.current = restore
      setEffort(previous)
      setPreview(restore)
      setLocalError(cause instanceof Error ? cause.message : String(cause))
    } finally {
      committingRef.current = false
      setCommitting(false)
    }
  }, [directory, levels])

  const rawFromPointer = (input: HTMLInputElement, clientX: number) => {
    const bounds = input.getBoundingClientRect()
    if (bounds.width <= 0 || levels.length < 2) return previewRef.current
    return Math.max(
      0,
      Math.min(levels.length - 1, (clientX - bounds.left) / bounds.width * (levels.length - 1)),
    )
  }

  const showPointerPreview = (raw: number) => {
    previewRef.current = raw
    setPreview(raw)
    setEffort(levels[clampIndex(raw, levels.length)]?.send ?? '')
  }

  const queuePointerPreview = (raw: number) => {
    pendingPreviewRef.current = raw
    if (previewFrameRef.current !== null) return
    previewFrameRef.current = requestAnimationFrame(() => {
      previewFrameRef.current = null
      showPointerPreview(pendingPreviewRef.current)
    })
  }

  const beginDragging = (input: HTMLInputElement, pointerId: number, clientX: number) => {
    pointerActiveRef.current = true
    activePointerIdRef.current = pointerId
    draggingRef.current = true
    setDragging(true)
    showPointerPreview(rawFromPointer(input, clientX))
    try {
      if (!input.hasPointerCapture(pointerId)) input.setPointerCapture(pointerId)
    } catch {
      // The window-level pointer listeners below remain the reliable fallback.
    }
  }

  const moveDragging = (input: HTMLInputElement, pointerId: number, clientX: number) => {
    if (!pointerActiveRef.current || activePointerIdRef.current !== pointerId) return
    queuePointerPreview(rawFromPointer(input, clientX))
  }

  const endDrag = (input: HTMLInputElement | null, pointerId?: number): boolean => {
    if (pointerId !== undefined && activePointerIdRef.current !== pointerId) return false
    if (previewFrameRef.current !== null) cancelAnimationFrame(previewFrameRef.current)
    previewFrameRef.current = null
    pointerActiveRef.current = false
    activePointerIdRef.current = null
    draggingRef.current = false
    setDragging(false)
    if (input !== null && pointerId !== undefined && input.hasPointerCapture(pointerId)) {
      input.releasePointerCapture(pointerId)
    }
    return true
  }

  const stopDragging = (input: HTMLInputElement, pointerId?: number, clientX?: number) => {
    if (!pointerActiveRef.current) return
    if (pointerId !== undefined && activePointerIdRef.current !== pointerId) return
    const raw = clientX === undefined ? previewRef.current : rawFromPointer(input, clientX)
    endDrag(input, pointerId)
    showPointerPreview(raw)
    void commit(raw)
  }

  /* LOCAL ADDITION: cancelling must not commit.
     A pointercancel means the drag was taken away (a native right-click menu, a
     system gesture), not that the user chose the level under the cursor.
     Upstream routes cancel through stopDragging, which commits. */
  const cancelDragging = (input: HTMLInputElement | null, pointerId?: number) => {
    if (!endDrag(input, pointerId)) return
    showPointerPreview(Math.max(0, acceptedStopIndex(levels, committedRef.current, committedIndexRef.current)))
  }

  globalPointerMoveRef.current = (event) => {
    const input = inputRef.current
    if (input !== null) moveDragging(input, event.pointerId, event.clientX)
  }
  globalPointerEndRef.current = (event) => {
    const input = inputRef.current
    if (input !== null) stopDragging(input, event.pointerId, event.clientX)
  }
  globalPointerCancelRef.current = (event) => {
    if (activePointerIdRef.current !== event.pointerId) return
    cancelDragging(inputRef.current, event.pointerId)
  }

  useEffect(() => {
    const move = (event: PointerEvent) => globalPointerMoveRef.current?.(event)
    const end = (event: PointerEvent) => globalPointerEndRef.current?.(event)
    const cancel = (event: PointerEvent) => globalPointerCancelRef.current?.(event)
    window.addEventListener('pointermove', move, true)
    window.addEventListener('pointerup', end, true)
    window.addEventListener('pointercancel', cancel, true)
    return () => {
      if (previewFrameRef.current !== null) cancelAnimationFrame(previewFrameRef.current)
      window.removeEventListener('pointermove', move, true)
      window.removeEventListener('pointerup', end, true)
      window.removeEventListener('pointercancel', cancel, true)
    }
  }, [])

  const onKeyDown = (event: ReactKeyboardEvent<HTMLInputElement>) => {
    const current = clampIndex(Number(event.currentTarget.value), levels.length)
    let target: number | undefined
    if (event.key === 'ArrowLeft' || event.key === 'ArrowDown' || event.key === 'PageDown') {
      target = Math.max(0, current - 1)
    } else if (event.key === 'ArrowRight' || event.key === 'ArrowUp' || event.key === 'PageUp') {
      target = Math.min(levels.length - 1, current + 1)
    } else if (event.key === 'Home') {
      target = 0
    } else if (event.key === 'End') {
      target = levels.length - 1
    }
    if (target === undefined) return
    event.preventDefault()
    void commit(target)
  }

  if (!available) return null

  const count = levels.length
  /* LOCAL CHANGE: upstream reads `.name` straight off the adapter entry. */
  const effortIndexValue = effortIndex(levels, effort)
  const effortName = effortIndexValue < 0 ? effort : displayLevelName(effort, levelIds(levels), t)
  const isTop = invalidEffort === undefined && clampIndex(preview, count) === count - 1
  const progress = preview / (count - 1) * 100
  const style = { '--re-progress': `${progress}%`, '--re-strength': `${25 + progress * .75}%` } as CSSProperties

  /* LOCAL ADDITION: the readout follows the thumb, so the level you are about
     to commit is readable while you are still dragging. Upstream shows nothing
     on the slider at all, and only updates the trigger after the commit. */
  const previewStop = levels[clampIndex(preview, count)]
  const showInvalid = invalidEffort !== undefined && !dragging && !committing
  const previewName = showInvalid ? t('effort.invalid', { effort: invalidEffort }) : previewStop === undefined
    ? effortName
    : displayLevelName(previewStop.id, levelIds(levels), t)
  /* A rung the model does not offer submits a neighbour; say so rather than let
     two rungs look different when they send the same thing. */
  const previewSends = !showInvalid && previewStop !== undefined && !previewStop.native ? previewStop.send : null

  const title = showInvalid ? t('effort.reselect', { effort: invalidEffort }) : error === null
    ? t('effort.title', { effort: previewSends === null ? previewName : `${previewName} → ${previewSends}` })
    : t('effort.failed', { error })

  return (
    <div
      className={`re-effort re-depth has-readout${dragging ? ' is-dragging' : ''}${busy ? ' is-busy' : ''}${error === null ? '' : ' is-error'}`}
      data-palette={palette}
      data-top={isTop ? 'true' : undefined}
      style={{ '--re-accent': paletteColor(palette) } as CSSProperties}
      title={title}
    >
      {/* Visual duplicate of the range input's aria-valuetext, so it is hidden
          from assistive tech rather than announced twice. */}
      <div className="re-depth-header" aria-hidden="true">
        <span className="re-depth-label">{t('effort.label')}</span>
        <span className="re-depth-value">
          {previewName}
          {previewSends === null ? null : <span className="re-depth-send">{` → ${previewSends}`}</span>}
        </span>
      </div>
      <div className="re-depth-speed" aria-hidden="true"><span>{t('effort.faster')}</span><span>{t('effort.smarter')}</span></div>
      <div
        className="re-depth-slider"
        data-top={isTop ? 'true' : undefined}
        style={style}
      >
        <div className="re-depth-track" aria-hidden="true" />
        <canvas ref={canvasRef} className="re-depth-canvas" hidden={!isTop} aria-hidden="true" />
        <input
          ref={inputRef}
          className="re-depth-input"
          type="range"
          min="0"
          max={count - 1}
          step="0.01"
          value={preview}
          disabled={busy}
          aria-label={t('effort.label')}
          aria-valuetext={previewName}
          onChange={(event) => {
            if (pointerActiveRef.current || committingRef.current) return
            const raw = Number(event.currentTarget.value)
            showPointerPreview(raw)
          }}
          onPointerDown={(event) => {
            event.preventDefault()
            event.currentTarget.focus()
            beginDragging(event.currentTarget, event.pointerId, event.clientX)
          }}
          onBlur={(event) => {
            stopDragging(event.currentTarget)
          }}
          onKeyDown={onKeyDown}
        />
        <span className="re-depth-thumb" aria-hidden="true" />
      </div>
      {error === null ? null : <span className="re-effort-sr" role="status">{error}</span>}
    </div>
  )
}

function AdvancedModelSelect({
  locked,
  available,
  controller,
  directory,
  load,
  select,
  adapt,
  agentTutorial,
  t,
}: ModelSeatProps) {
  const state = useSyncExternalStore(
    (notify) => directory.subscribe(notify),
    () => directory.getSnapshot(),
  )
  const palette = useSyncExternalStore(paletteStore.subscribe, paletteStore.getSnapshot)
  const [open, setOpen] = useState(false)
  const [modelsOpen, setModelsOpen] = useState(false)
  const [guidanceResult, setGuidanceResult] = useState<AdaptGuidance | null>(null)
  const [guidanceBusy, setGuidanceBusy] = useState(false)
  const [guidanceFailed, setGuidanceFailed] = useState(false)
  const [panelOpen, setPanelOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [agentCopied, setAgentCopied] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  useLayoutEffect(() => {
    if (!open || rootRef.current === null || menuRef.current === null) return
    return positionModelMenu(rootRef.current, menuRef.current)
  }, [open])
  const choice = currentModel(state)
  const levels = sliderLevels(state)
  /* LOCAL CHANGE: upstream reads `.name` straight off the adapter entry. */
  const currentLevel = levels[effectiveEffortIndex(levels, state)]
  const invalidEffort = choice === undefined ? undefined : unsupportedEffort(state.current?.reasoningEffort, choice.reasoning?.efforts)
  const effortName = invalidEffort !== undefined ? t('effort.invalid', { effort: invalidEffort }) : currentLevel === undefined
    ? t('model.defaultEffort')
    : displayLevelName(currentLevel.id, levelIds(levels), t)
  const modelLabel = choice?.name ?? state.current?.model ?? t('model.select')
  const busy = state.status === 'loading' || state.status === 'selecting'
  const provider = state.current?.provider
  const modelId = state.current?.model
  // Hide a previous model's result during the render before the effect clears it.
  const guidance = guidanceResult?.provider === provider && guidanceResult?.model === modelId
    ? guidanceResult
    : null
  const localizedNote = guidance === null ? '' : guidanceNote(guidance, t)
  const localizedWarning = guidance === null ? null : guidanceWarning(guidance, t)
  const localizedSnippet = guidance === null ? '' : guidanceSnippet(guidance, t)

  useEffect(() => {
    if (!available) return
    load()
  }, [available, load])

  useEffect(() => {
    if (!open) return
    const closeOutside = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false)
        setModelsOpen(false)
      }
    }
    document.addEventListener('mousedown', closeOutside)
    return () => document.removeEventListener('mousedown', closeOutside)
  }, [open])

  useEffect(() => {
    // A brief belongs to the model it describes; never let a stale one be copied.
    setGuidanceResult(null)
    setCopied(false)
    setAgentCopied(false)
    setPanelOpen(false)
    if (provider === undefined || modelId === undefined) {
      setGuidanceBusy(false)
      setGuidanceFailed(false)
      return
    }
    // Without a channel the diagnosis cannot run at all; saying so beats
    // rendering nothing, which reads as "this model needs no guidance".
    if (adapt === null) {
      setGuidanceBusy(false)
      setGuidanceFailed(true)
      return
    }
    let cancelled = false
    setGuidanceBusy(true)
    setGuidanceFailed(false)
    adapt.diagnose(provider, modelId).then((result) => {
      if (cancelled) return
      setGuidanceResult(result)
      setGuidanceFailed(result === null)
      setGuidanceBusy(false)
      if (result === null || !result.needsGuide) setPanelOpen(false)
    }, () => {
      if (cancelled) return
      setGuidanceResult(null)
      setGuidanceFailed(true)
      setGuidanceBusy(false)
    })
    return () => {
      cancelled = true
    }
  }, [adapt, provider, modelId])

  if (!available) return null

  const close = (restoreFocus = false) => {
    setOpen(false)
    setModelsOpen(false)
    if (restoreFocus) queueMicrotask(() => triggerRef.current?.focus())
  }

  const onKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Escape' || !open) return
    event.preventDefault()
    if (modelsOpen) setModelsOpen(false)
    else close(true)
  }

  const chooseModel = async (provider: string, model: string, defaultEffort?: string) => {
    if (state.current?.provider === provider && state.current.model === model) {
      setModelsOpen(false)
      return
    }
    const accepted = await select({
      provider,
      model,
      ...(defaultEffort === undefined ? {} : { reasoningEffort: defaultEffort }),
    })
    if (accepted) setModelsOpen(false)
  }

  const recoveryEffort = choice?.reasoning?.defaultEffort ?? choice?.reasoning?.efforts[0]?.id
  const invalidEffortNotice = invalidEffort === undefined ? null : (
    <div className="re-model-error" role="alert">
      {t('effort.reselect', { effort: invalidEffort })}
      <button type="button" disabled={busy} onClick={() => {
        if (state.current === null) return
        void select({
          provider: state.current.provider,
          model: state.current.model,
          ...(recoveryEffort === undefined ? {} : { reasoningEffort: recoveryEffort }),
        })
      }}>{t('effort.use', { effort: recoveryEffort ?? t('model.defaultEffort') })}</button>
    </div>
  )

  return (
    <div ref={rootRef} className="re-model-root" style={{ '--re-accent': paletteColor(palette) } as CSSProperties} onKeyDown={onKeyDown}>
      <button
        ref={triggerRef}
        type="button"
        className="re-model-trigger"
        aria-label={t('model.aria', { model: modelLabel, effort: effortName })}
        aria-haspopup="menu"
        aria-expanded={open}
        title={`${modelLabel} · ${effortName}`}
        disabled={locked}
        onClick={() => {
          if (open) close()
          else {
            setOpen(true)
            setModelsOpen(false)
            load()
          }
        }}
      >
        <span className="re-model-name">{modelLabel}</span>
        <span className="re-model-effort">{effortName}</span>
        <span className="re-model-chevron" aria-hidden="true" />
      </button>

      {open ? (
        <div ref={menuRef} className="re-model-menu" data-depth-card={!modelsOpen && levels.length >= 2 && !guidance?.needsGuide ? 'true' : undefined} role="menu" aria-label={t('model.menuAria')} aria-busy={busy}>
          {modelsOpen ? (
            <div className="re-model-pane">
              <button type="button" className="re-model-back" onClick={() => setModelsOpen(false)}>
                <span aria-hidden="true">‹</span>
                <span>{t('model.select')}</span>
              </button>
              {state.status === 'loading' && state.groups.length === 0 ? (
                <div className="re-model-status">{t('model.loading')}</div>
              ) : null}
              {state.groups.map((group) => (
                <section key={group.id}>
                  <div className="re-model-group-title">{group.name}</div>
                  {group.models.map((model) => {
                    const selected = state.current?.provider === group.id && state.current.model === model.id
                    return (
                      <button
                        key={model.id}
                        type="button"
                        role="menuitemradio"
                        aria-checked={selected}
                        className="re-model-option"
                        disabled={busy}
                        onClick={() => void chooseModel(group.id, model.id, model.reasoning?.defaultEffort)}
                      >
                        <span className="re-model-option-copy">
                          <span className="re-model-option-name">{model.name}</span>
                          {model.description === undefined ? null : (
                            <span className="re-model-option-desc">{model.description}</span>
                          )}
                        </span>
                        <span className="re-model-check" aria-hidden="true">{selected ? '✓' : ''}</span>
                      </button>
                    )
                  })}
                </section>
              ))}
              {state.status === 'ready' && state.groups.every((group) => group.models.length === 0) ? (
                <div className="re-model-status">{t('model.none')}</div>
              ) : null}
              {invalidEffortNotice}
              {state.error === null ? null : <div className="re-model-error">{state.error}</div>}
            </div>
          ) : (
            <>
              {levels.length >= 2 ? (
                <EffortSlider directory={controller} t={t} />
              ) : (
                <div className="re-model-status">{t('effort.unavailable')}</div>
              )}
              {guidance !== null && guidance.needsGuide ? (
                <div className="re-adapt">
                  <div className="re-adapt-copy">
                    <div className="re-adapt-title">
                      {guidance.reason === 'missing' ? t('effort.unavailable') : t('guidance.mismatch')}
                    </div>
                    <div className="re-adapt-desc">
                      {guidance.matched
                        ? t('guidance.matched', {
                            expected: levelsText(guidance.expected, t),
                            current: levelsText(guidance.current, t),
                            note: localizedNote,
                          })
                        : t('guidance.unmatched', {
                            current: levelsText(guidance.current, t),
                            note: localizedNote,
                          })}
                    </div>
                  </div>
                  {panelOpen ? (
                    <div className="re-adapt-panel">
                      <div className="re-adapt-scroll">
                        {guidance.matched ? (
                          <div className="re-adapt-panel-line">
                            <span className="re-adapt-arrow">{levelsText(guidance.current, t)}</span>
                            <span aria-hidden="true">→</span>
                            <span className="re-adapt-arrow">{levelsText(guidance.expected, t)}</span>
                          </div>
                        ) : null}
                        <div className="re-adapt-howto">{t('guidance.howto')}</div>
                        <div className="re-adapt-switch-intro">{t('guidance.switch.intro')}</div>
                        <ul className="re-adapt-switches">
                          <li>{t('guidance.switch.thinkingFormat')}</li>
                          <li>{t('guidance.switch.reasoningEffort')}</li>
                          <li>{t('guidance.switch.developerRole')}</li>
                          <li>{t('guidance.switch.replay')}</li>
                        </ul>
                        {localizedWarning === null ? null : (
                          <div className="re-adapt-warning">{localizedWarning}</div>
                        )}
                        <div className="re-adapt-label">{t('guidance.paste')}</div>
                        <pre className="re-adapt-yaml">{localizedSnippet}</pre>
                        <div className="re-adapt-steps">
                          <span>
                            {t('guidance.step1.open')}<code>{configDocumentName(guidance.settingsPath)}</code>
                            {guidance.settingsPath === null ? '' : t('guidance.step1.path', { path: guidance.settingsPath })}
                            {t('guidance.step1.find')}<code>{guidance.entryPath}</code>
                            {t('guidance.step1.list')}<code>{guidance.entryLine}</code>{t('guidance.step1.end')}
                          </span>
                          {guidance.mode === 'replace' ? (
                            <span>
                              {t('guidance.step2.replacePrefix')}<code>{guidance.entryLine}</code>
                              {t('guidance.step2.replaceSuffix')}
                            </span>
                          ) : (
                            <span>
                              {t('guidance.step2.insertPrefix')}<code>id</code>
                              {t('guidance.step2.insertSuffix')}
                            </span>
                          )}
                          <span>{t('guidance.step3')}</span>
                        </div>
                      </div>
                      <div className="re-adapt-actions">
                        <button
                          type="button"
                          className="re-adapt-apply"
                          disabled={busy || guidanceBusy}
                          onClick={() => {
                            void copyText(localizedSnippet).then((ok) => setCopied(ok))
                          }}
                        >
                          {copied ? t('guidance.copied') : t('guidance.copy')}
                        </button>
                        <button
                          type="button"
                          className="re-adapt-agent"
                          disabled={busy || guidanceBusy}
                          onClick={() => {
                            void copyText(agentBrief(guidance, localizedSnippet, agentTutorial(), localizedWarning, t))
                              .then((ok) => setAgentCopied(ok))
                          }}
                        >
                          {agentCopied ? t('guidance.copied') : t('agent.copy')}
                        </button>
                        <button type="button" className="re-adapt-cancel" onClick={() => setPanelOpen(false)}>
                          {t('guidance.collapse')}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="re-adapt-open-row">
                      <button type="button" className="re-adapt-open" onClick={() => { setCopied(false); setPanelOpen(true) }}>
                        {guidanceBusy ? t('guidance.checking') : t('guidance.open')}
                      </button>
                      <button
                        type="button"
                        className="re-adapt-agent"
                        disabled={busy || guidanceBusy}
                        onClick={() => {
                          void copyText(agentBrief(guidance, localizedSnippet, agentTutorial(), localizedWarning, t))
                            .then((ok) => setAgentCopied(ok))
                        }}
                      >
                        {agentCopied ? t('guidance.copied') : t('agent.copy')}
                      </button>
                    </div>
                  )}
                </div>
              ) : null}
              {guidanceFailed ? <div className="re-model-status" role="status">{t('guidance.unavailable')}</div> : null}
              <div className="re-menu-separator" />
              <button
                type="button"
                role="menuitem"
                className="re-model-row"
                disabled={busy}
                onClick={() => setModelsOpen(true)}
              >
                <span className="re-model-row-name">{modelLabel}</span>
                <span className="re-model-row-effort">{effortName}</span>
                <span className="re-row-chevron" aria-hidden="true">›</span>
              </button>
              {invalidEffortNotice}
              {state.error === null ? null : <div className="re-model-error">{state.error}</div>}
            </>
          )}
        </div>
      ) : null}
    </div>
  )
}

function ReasoningEffortSetting({ t }: PropsLocale<typeof NS>) {
  const enabled = useSyncExternalStore(enabledStore.subscribe, enabledStore.getSnapshot)

  return (
    <div className="re-setting-row">
      <div className="re-setting-copy">
        <div className="re-setting-title">{t('settings.effort.title')}</div>
        <div className="re-setting-description">{t('settings.effort.description')}</div>
      </div>
      <div className="re-setting-control">
        <span className="re-setting-state">{enabled ? t('settings.enabled') : t('settings.disabled')}</span>
        <button
          type="button"
          role="switch"
          aria-label={t('settings.effort.aria')}
          aria-checked={enabled}
          className={`re-setting-switch${enabled ? ' is-on' : ''}`}
          onClick={() => enabledStore.set(!enabled)}
        >
          <span className="re-setting-switch-knob" aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}

/** Particle colours are configured in General Settings. */
function PaletteSetting({ t }: PropsLocale<typeof NS>) {
  const sliderEnabled = useSyncExternalStore(enabledStore.subscribe, enabledStore.getSnapshot)
  const selected = useSyncExternalStore(paletteStore.subscribe, paletteStore.getSnapshot)

  return (
    <div className="re-setting-row">
      <div className="re-setting-copy">
        <div className="re-setting-title">{t('settings.palette.title')}</div>
        <div className="re-setting-description">{t('settings.palette.description')}</div>
      </div>
      <div className="re-setting-control">
        <div className="re-palette-picker" role="radiogroup" aria-label={t('settings.palette.aria')}>
          {PALETTES.map((palette) => {
            const active = palette.id === selected
            return (
              <button
                key={palette.id}
                type="button"
                role="radio"
                aria-checked={active}
                aria-label={t(palette.labelKey)}
                title={t(palette.labelKey)}
                disabled={!sliderEnabled}
                className={`re-palette-swatch${active ? ' is-on' : ''}`}
                /* The ring follows the swatch's own colour instead of a fixed
                   blue, so the selected colour reads as the one you picked. */
                style={{ background: palette.swatch, '--re-swatch-ring': palette.accent } as CSSProperties}
                onClick={() => paletteStore.set(palette.id)}
              />
            )
          })}
          <label className="re-custom-palette">
            <span>{t('settings.palette.custom')}</span>
            <input type="color" value={paletteColor(selected)} disabled={!sliderEnabled}
              aria-label={t('settings.palette.custom')}
              onChange={event => paletteStore.set(event.currentTarget.value.toLowerCase())} />
          </label>
        </div>
      </div>
    </div>
  )
}

export function apply(ctx: ClientContext) {
  const modelDirectories = ctx.get('modelDirectories') as ModelDirectoryResolver | undefined
  if (modelDirectories === undefined) return

  const connection = ctx.get('connection') as { rpc?: HostRpc } | undefined
  const adapt = makeAdaptationService(connection?.rpc)
  const locale = ctx.get('locale') as LocaleRuntimeLike | undefined

  ctx.effect(() => ctx.locale.register(NS, { zh, en }), 'reasoning-effort: dictionaries')

  ctx.effect(() => {
    const style = document.createElement('style')
    style.dataset.plugin = '@missher/dsh-reasoning-effort'
    style.textContent = CSS + PIXEL_CSS + MODEL_SETTINGS_CSS
    document.head.appendChild(style)
    return () => style.remove()
  }, 'reasoning-effort: styles')

  ctx.effect(() => {
    const syncStorage = (event: StorageEvent) => {
      if (event.key === ENABLED_STORAGE_KEY) {
        enabledStore.set(event.newValue !== 'false', false)

      } else if (event.key === PALETTE_STORAGE_KEY) {
        paletteStore.set(event.newValue ?? DEFAULT_PALETTE_ID, false)
      }
    }
    window.addEventListener('storage', syncStorage)
    return () => window.removeEventListener('storage', syncStorage)
  }, 'reasoning-effort: preference sync')

  registerModelSettings(ctx)

  ctx.slots.inject(SETTINGS_SLOT, () =>
    ctx.slots.register(
      { name: SETTINGS_SLOT, id: 'reasoning-effort-enabled', order: 15, locale: NS },
      ReasoningEffortSetting,
    ),
  )

  ctx.slots.inject(SETTINGS_SLOT, () =>
    ctx.slots.register(
      { name: SETTINGS_SLOT, id: 'reasoning-effort-palette', order: 17, locale: NS },
      PaletteSetting,
    ),
  )

  ctx.slots.inject(SLOT, () => {
    let disposeModelSeat: (() => void) | undefined
    const syncModelSeat = () => {
      if (!enabledStore.getSnapshot()) {
        disposeModelSeat?.()
        disposeModelSeat = undefined
        return
      }
      if (disposeModelSeat !== undefined) return
      disposeModelSeat = ctx.slots.register(
        {
          name: SLOT,
          priority: -100,
          locale: NS,
          inject: (sessionId: SessionId) => {
            const controller = modelDirectories.directoryFor(sessionId)
            return {
              available: true,
              controller,
              directory: controller.store,
              load: () => controller.load().then(() => undefined, () => undefined),
              select: (selection: ModelSelection) => controller.select(selection).then(result => { requireAcceptedSelection(result); return true }).catch(() => false),
              adapt,
              // Read at copy time: a language switch must change the next copy,
              // not require the seat to remount.
              agentTutorial: () => (locale?.getLocale().active === 'zh' ? agentTutorialZh : agentTutorialEn),
            }
          },
        },
        AdvancedModelSelect,
      )
    }

    const unsubscribe = enabledStore.subscribe(syncModelSeat)
    syncModelSeat()
    return () => {
      unsubscribe()
      disposeModelSeat?.()
    }
  })
}
