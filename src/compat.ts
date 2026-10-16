/**
 * Host-side interface compatibility: what this half *calls*, not which build it
 * was written against.
 *
 * DSH ships its own Cordis, Schemastery and `@deepseek-ai/dsh-*` packages, so a
 * version gate would refuse usable builds and accept broken ones. Every entry
 * below is one member this half actually invokes; the host half therefore
 * declares a minimum *interface* and reports a precise, per-member reason when
 * a build does not provide it.
 *
 * Two tiers, and nothing in between:
 *
 * - **required** — without it the row cannot answer at all
 *   (`settings.describe`, `settings.prepareDocument`, `llm.resolveModelInfo`).
 * - **optional** — the row still works, minus one named capability
 *   (`settings.register`/`get` for the plugin-owned namespace,
 *   `webServer.register` + `connection.requestRejection` for the RPC channel).
 *
 * There is deliberately no third tier of guessed fallbacks: a missing optional
 * member disables exactly the capability that needs it and is reported here.
 *
 * @module dsh-reasoning-effort/compat
 */

/** Members this half invokes on `ctx.settings`. */
export const SETTINGS_MEMBERS = ['describe', 'prepareDocument'] as const
/** Members this half invokes on `ctx.llm`. */
export const LLM_MEMBERS = ['resolveModelInfo'] as const
/**
 * The one member `settings` must expose for a plugin-owned namespace store.
 *
 * `register` returns the scope this row reads (`store.get()`), so the store is
 * available exactly when `register` is callable. `settings.get` is *not* part
 * of this: the only reader of the global namespace (`endpointWarning`) already
 * falls back to `settings.describe()`, so a host without it still uses the
 * namespace store.
 */
export const NAMESPACE_MEMBERS = ['register'] as const
/** Members the loopback RPC channel needs, from two services. */
export const CHANNEL_MEMBERS = {
  connection: ['requestRejection'],
  webServer: ['register'],
} as const

/** Members this half invokes on `ctx.settings`. */
export interface HostSettingsLike {
  readonly writable?: boolean
  describe?(): unknown
  prepareDocument?(): unknown
  /** Absent on profile-config hosts, which read the row's own `config` instead. */
  register?(namespace: string, schema: unknown, options?: unknown): unknown
  get?(namespace: string): unknown
}

/** Only the one LLM member this half calls; provider/model listing is not used. */
export interface HostLlmLike {
  resolveModelInfo?(provider: string, model: string): unknown
}

export interface HostConnectionLike {
  requestRejection?(request: unknown): unknown
}

export interface HostWebServerLike {
  register?(route: unknown): unknown
}

/** The service surface one running host actually exposes. */
export interface HostSurface {
  readonly settings?: HostSettingsLike
  readonly llm?: HostLlmLike
  readonly connection?: HostConnectionLike
  readonly webServer?: HostWebServerLike
}

/** What this half can do on the host it was loaded into. */
export interface HostCapabilityReport {
  /** The row can be mounted at all: both required services answer. */
  readonly supported: boolean
  /** The loopback RPC channel the browser half calls can be mounted. */
  readonly channel: boolean
  /** The plugin-owned namespace store is available (otherwise profile config). */
  readonly namespaceStore: boolean
  /** `service.member` for every required member that is absent or not callable. */
  readonly missing: string[]
  /** The same, for the optional channel pair; empty when the channel is mountable. */
  readonly channelGaps: string[]
}

function memberOf(value: unknown, member: string): unknown {
  if (typeof value !== 'object' || value === null) return undefined
  return (value as Record<string, unknown>)[member]
}

/** Whether `value` carries every named member as a callable. */
export function hasMembers(value: unknown, members: readonly string[]): boolean {
  return members.every((member) => typeof memberOf(value, member) === 'function')
}

/** `service.member` names absent from `value`, in declaration order. */
export function missingMembers(service: string, value: unknown, members: readonly string[]): string[] {
  return members.filter((member) => typeof memberOf(value, member) !== 'function').map((member) => `${service}.${member}`)
}

/**
 * The optional RPC-channel pair: `connection.requestRejection` keeps the route
 * exactly as unreachable as the shared `/api` transport, and
 * `webServer.register` owns the route itself. Mounting with only one of them
 * would expose an unfenced endpoint, so the pair is reported as one gap.
 */
export function channelGaps(surface: HostSurface): string[] {
  return [
    ...missingMembers('connection', surface.connection, CHANNEL_MEMBERS.connection),
    ...missingMembers('webServer', surface.webServer, CHANNEL_MEMBERS.webServer),
  ]
}

/**
 * Measure a live host surface against the interface above.
 *
 * Never throws and never inspects a version string: the report is derived from
 * the objects the Loader handed this row.
 *
 * Missing optional members are *not* folded into one message: `connection` and
 * `webServer` are provided after this row in the boot order, so only the caller
 * that already holds both can tell a real gap from an early read. See
 * {@link namespaceMessage} and {@link channelMessage}.
 */
export function hostCapabilities(surface: HostSurface): HostCapabilityReport {
  const missing = [
    ...missingMembers('settings', surface.settings, SETTINGS_MEMBERS),
    ...missingMembers('llm', surface.llm, LLM_MEMBERS),
  ]
  return {
    supported: missing.length === 0,
    channel: channelGaps(surface).length === 0,
    namespaceStore: hasMembers(surface.settings, NAMESPACE_MEMBERS),
    missing,
    channelGaps: channelGaps(surface),
  }
}

/** Whether the scope `settings.register` returned can actually be read back. */
export function scopeReadable(scope: unknown): boolean {
  return typeof memberOf(scope, 'get') === 'function'
}

/** The namespace-store degradation, or `null` when the store is available. */
export function namespaceMessage(report: HostCapabilityReport): string | null {
  return report.namespaceStore
    ? null
    : 'settings.register is unavailable: user knowledge-base entries are read from this row\'s own config instead of a plugin-owned settings namespace'
}

/**
 * The channel degradation, or `null` when the pair is mountable.
 *
 * Only meaningful once both services are known to be active, so the caller
 * passes the surface it resolved inside `ctx.inject`.
 */
export function channelMessage(surface: HostSurface): string | null {
  const gaps = channelGaps(surface)
  return gaps.length === 0
    ? null
    : `host provides no ${gaps.join(' and ')}: the browser half cannot diagnose custom-provider models over the loopback channel; the reasoning slider, model selection and guidance layout keep working`
}

/**
 * The one-line diagnostic a user needs when the row cannot be mounted.
 *
 * Deliberately names the missing members and the consequence, so an incomplete
 * host never reads as "this model has no reasoning levels".
 */
export function unsupportedMessage(report: HostCapabilityReport): string {
  return `dsh-reasoning-effort: host interface incomplete (${report.missing.join(', ')}). `
    + 'These are the minimum members this row calls; it stays inert rather than reporting an empty model directory.'
}
