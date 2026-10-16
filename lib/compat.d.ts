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
export declare const SETTINGS_MEMBERS: readonly ["describe", "prepareDocument"];
/** Members this half invokes on `ctx.llm`. */
export declare const LLM_MEMBERS: readonly ["resolveModelInfo"];
/**
 * The one member `settings` must expose for a plugin-owned namespace store.
 *
 * `register` returns the scope this row reads (`store.get()`), so the store is
 * available exactly when `register` is callable. `settings.get` is *not* part
 * of this: the only reader of the global namespace (`endpointWarning`) already
 * falls back to `settings.describe()`, so a host without it still uses the
 * namespace store.
 */
export declare const NAMESPACE_MEMBERS: readonly ["register"];
/** Members the loopback RPC channel needs, from two services. */
export declare const CHANNEL_MEMBERS: {
    readonly connection: readonly ["requestRejection"];
    readonly webServer: readonly ["register"];
};
/** Members this half invokes on `ctx.settings`. */
export interface HostSettingsLike {
    readonly writable?: boolean;
    describe?(): unknown;
    prepareDocument?(): unknown;
    /** Absent on profile-config hosts, which read the row's own `config` instead. */
    register?(namespace: string, schema: unknown, options?: unknown): unknown;
    get?(namespace: string): unknown;
}
/** Only the one LLM member this half calls; provider/model listing is not used. */
export interface HostLlmLike {
    resolveModelInfo?(provider: string, model: string): unknown;
}
export interface HostConnectionLike {
    requestRejection?(request: unknown): unknown;
}
export interface HostWebServerLike {
    register?(route: unknown): unknown;
}
/** The service surface one running host actually exposes. */
export interface HostSurface {
    readonly settings?: HostSettingsLike;
    readonly llm?: HostLlmLike;
    readonly connection?: HostConnectionLike;
    readonly webServer?: HostWebServerLike;
}
/** What this half can do on the host it was loaded into. */
export interface HostCapabilityReport {
    /** The row can be mounted at all: both required services answer. */
    readonly supported: boolean;
    /** The loopback RPC channel the browser half calls can be mounted. */
    readonly channel: boolean;
    /** The plugin-owned namespace store is available (otherwise profile config). */
    readonly namespaceStore: boolean;
    /** `service.member` for every required member that is absent or not callable. */
    readonly missing: string[];
    /** The same, for the optional channel pair; empty when the channel is mountable. */
    readonly channelGaps: string[];
}
/** Whether `value` carries every named member as a callable. */
export declare function hasMembers(value: unknown, members: readonly string[]): boolean;
/** `service.member` names absent from `value`, in declaration order. */
export declare function missingMembers(service: string, value: unknown, members: readonly string[]): string[];
/**
 * The optional RPC-channel pair: `connection.requestRejection` keeps the route
 * exactly as unreachable as the shared `/api` transport, and
 * `webServer.register` owns the route itself. Mounting with only one of them
 * would expose an unfenced endpoint, so the pair is reported as one gap.
 */
export declare function channelGaps(surface: HostSurface): string[];
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
export declare function hostCapabilities(surface: HostSurface): HostCapabilityReport;
/** Whether the scope `settings.register` returned can actually be read back. */
export declare function scopeReadable(scope: unknown): boolean;
/** The namespace-store degradation, or `null` when the store is available. */
export declare function namespaceMessage(report: HostCapabilityReport): string | null;
/**
 * The channel degradation, or `null` when the pair is mountable.
 *
 * Only meaningful once both services are known to be active, so the caller
 * passes the surface it resolved inside `ctx.inject`.
 */
export declare function channelMessage(surface: HostSurface): string | null;
/**
 * The one-line diagnostic a user needs when the row cannot be mounted.
 *
 * Deliberately names the missing members and the consequence, so an incomplete
 * host never reads as "this model has no reasoning levels".
 */
export declare function unsupportedMessage(report: HostCapabilityReport): string;
