/**
 * Browser-half interface compatibility.
 *
 * Same rule as the host half: describe what this half *calls*, then measure the
 * services the Loader actually handed it. A null check inside a React body is
 * not enough, because the Loader can stop the row earlier — so the declarations
 * that decide whether this row is reached at all are part of the interface:
 *
 * - `export const inject` names the services this half must hold before the
 *   seat can register. `connection` is one: `makeAdaptationService` reads
 *   `connection.rpc`, and a host that never provides the service never reaches
 *   `apply` at all. `remote` and `remote.session` are also required — not
 *   because a line here reads them, but because `modelDirectories.directoryFor`
 *   borrows the **caller's** ctx through the Cordis service proxy, and the
 *   model-selection service reads `this.ctx.remote.session` inside that call.
 *   Dropping them makes `directoryFor` throw
 *   `cannot get property "remote.session" without inject`, and the seat
 *   disappears. They are therefore core, never optional.
 * - `dsh.client.inject` (package.json) only orders module arrival. A row that
 *   is absent from the graph is skipped; a row that is present but fails to
 *   load takes its consumers down with it.
 * - `ctx.slots.inject(name, …)` is the correct gate for an optional slot: it
 *   runs the callback immediately when the slot is already declared and inside
 *   the declaring `register()` call otherwise, and disposes on collapse. An
 *   undeclared slot at `apply` time is therefore a normal boot state, never a
 *   statement about the build.
 *
 * @module dsh-reasoning-effort/client-compat
 */

/** The optional per-model reasoning row, declared by the Models settings module. */
export const MODEL_FIELDS_SLOT = 'settings.models.model-fields'
/** Members this half invokes on `ctx.slots`. */
export const SLOTS_MEMBERS = ['inject', 'register'] as const
/** Members this half invokes on `ctx.modelDirectories`. */
export const DIRECTORY_MEMBERS = ['directoryFor'] as const
/** Members this half invokes on `ctx.locale`. */
export const LOCALE_MEMBERS = ['register', 'getLocale'] as const

export interface ClientSlotsLike {
  inject?(name: string, callback: () => unknown): unknown
  register?(options: unknown, component: unknown): unknown
  /** Declared-spec lookup, narrowed by SlotMap key. Absent on pre-slot hosts. */
  spec?(name: string): unknown
  /** String-keyed form of {@link ClientSlotsLike.spec}. */
  specDynamic?(name: string): unknown
}

export interface ClientSurface {
  readonly slots?: ClientSlotsLike
  readonly modelDirectories?: unknown
  readonly locale?: unknown
  readonly connection?: unknown
}

/** Whether a slot is declared, or `undefined` when the host cannot be asked. */
export type SlotDeclaration = 'declared' | 'undeclared' | 'unknown'

/** What this half can render on the DSH build it was loaded into. */
export interface ClientCapabilityReport {
  /** The reasoning slider and model seat can be registered. */
  readonly seat: boolean
  /** Custom-provider guidance can be fetched over the loopback channel. */
  readonly guidance: boolean
  /** The optional per-model reasoning row, as observed at this moment. */
  readonly modelRow: SlotDeclaration
  /** `service.member` for every member the seat itself needs. */
  readonly missing: string[]
  /** One precise sentence per capability this build does not provide. */
  readonly degraded: string[]
}

function memberOf(value: unknown, member: string): unknown {
  if (typeof value !== 'object' || value === null) return undefined
  return (value as Record<string, unknown>)[member]
}

/** `service.member` names absent from `value`, in declaration order. */
export function missingMembers(service: string, value: unknown, members: readonly string[]): string[] {
  return members.filter((member) => typeof memberOf(value, member) !== 'function').map((member) => `${service}.${member}`)
}

/**
 * Ask the live slot registry whether a slot is declared *right now*.
 *
 * `SlotRegistry.spec`/`specDynamic` answer `undefined` while a key is
 * undeclared — the same surface DSH's own client runner uses. A build that
 * exposes neither cannot be asked, and that is reported as `unknown` rather
 * than guessed as undeclared.
 */
export function slotDeclaration(slots: unknown, name: string): SlotDeclaration {
  const spec = memberOf(slots, 'spec')
  const dynamic = memberOf(slots, 'specDynamic')
  const lookup = typeof spec === 'function' ? spec : dynamic
  if (typeof lookup !== 'function') return 'unknown'
  try {
    return (lookup as (key: string) => unknown).call(slots, name) === undefined ? 'undeclared' : 'declared'
  } catch {
    return 'unknown'
  }
}

/** The guidance channel needs a callable `connection.rpc.call`. */
export function guidanceAvailable(connection: unknown): boolean {
  const rpc = memberOf(connection, 'rpc')
  return typeof memberOf(rpc, 'call') === 'function'
}

/**
 * The optional-row diagnostic is retired, not reworded.
 *
 * The official Models settings module already edits every model's
 * `reasoningEfforts` — levels, effort ids and API parameter values — inside its
 * own model card. A host that does not declare `settings.models.model-fields`
 * is therefore not missing a capability this plugin contributes, and a missing
 * slot is not evidence that the Host has no native editor. Reporting anything
 * here would either claim a plugin-owned page that no longer exists or infer a
 * Host limitation the measurement cannot support, so every declaration state
 * stays silent. The export is kept so existing callers keep compiling.
 */
export function modelRowMessage(_state: SlotDeclaration): string | null {
  return null
}

/**
 * The guidance degradation, or `null` when the channel answers.
 *
 * `connection` is part of the declared `inject`, so its presence is guaranteed
 * by the time `apply` runs and only its members can be absent. The seat still
 * registers in that case and reports its own copy failure in the panel.
 */
export function guidanceMessage(available: boolean): string | null {
  return available
    ? null
    : 'connection.rpc.call is unavailable: the guidance panel cannot fetch a diagnosis from the host half and reports the failure itself. The slider and model selection are unaffected'
}

/**
 * Measure the services this half was actually given.
 *
 * Never throws: the report is derived from the objects handed to `apply`, so a
 * host that is missing a member produces a precise reason instead of a row that
 * silently looks like "no slider".
 */
export function clientCapabilities(surface: ClientSurface): ClientCapabilityReport {
  const missing = [
    ...missingMembers('slots', surface.slots, SLOTS_MEMBERS),
    ...missingMembers('modelDirectories', surface.modelDirectories, DIRECTORY_MEMBERS),
    ...missingMembers('locale', surface.locale, LOCALE_MEMBERS),
  ]
  const modelRow = slotDeclaration(surface.slots, MODEL_FIELDS_SLOT)
  const guidance = guidanceAvailable(surface.connection)
  /* The inline-row slot is still measured, but its absence is no longer a
     degraded capability: the Host's own model card owns per-model reasoning
     editing, so only the guidance channel can report a gap here. */
  const degraded = [guidanceMessage(guidance)]
    .filter((message): message is string => message !== null)

  return { seat: missing.length === 0, guidance, modelRow, missing, degraded }
}

/**
 * The one-line diagnostic for a host whose core client services are missing.
 *
 * Names the members and the consequence so this can never be mistaken for a
 * model that advertises no reasoning levels.
 */
export function unsupportedMessage(report: ClientCapabilityReport): string {
  return `dsh-reasoning-effort: client interface incomplete (${report.missing.join(', ')}). `
    + 'These are the members the model seat calls; the row is not registered, and the composer keeps the shipped model selector.'
}

/** Prefix on every diagnostic this half prints, so it is greppable in a console. */
export const LOG_PREFIX = '[dsh-reasoning-effort]'
