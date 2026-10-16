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
export const SETTINGS_MEMBERS = ['describe', 'prepareDocument'];
/** Members this half invokes on `ctx.llm`. */
export const LLM_MEMBERS = ['resolveModelInfo'];
/**
 * The one member `settings` must expose for a plugin-owned namespace store.
 *
 * `register` returns the scope this row reads (`store.get()`), so the store is
 * available exactly when `register` is callable. `settings.get` is *not* part
 * of this: the only reader of the global namespace (`endpointWarning`) already
 * falls back to `settings.describe()`, so a host without it still uses the
 * namespace store.
 */
export const NAMESPACE_MEMBERS = ['register'];
/** Members the loopback RPC channel needs, from two services. */
export const CHANNEL_MEMBERS = {
    connection: ['requestRejection'],
    webServer: ['register'],
};
function memberOf(value, member) {
    if (typeof value !== 'object' || value === null)
        return undefined;
    return value[member];
}
/** Whether `value` carries every named member as a callable. */
export function hasMembers(value, members) {
    return members.every((member) => typeof memberOf(value, member) === 'function');
}
/** `service.member` names absent from `value`, in declaration order. */
export function missingMembers(service, value, members) {
    return members.filter((member) => typeof memberOf(value, member) !== 'function').map((member) => `${service}.${member}`);
}
/**
 * The optional RPC-channel pair: `connection.requestRejection` keeps the route
 * exactly as unreachable as the shared `/api` transport, and
 * `webServer.register` owns the route itself. Mounting with only one of them
 * would expose an unfenced endpoint, so the pair is reported as one gap.
 */
export function channelGaps(surface) {
    return [
        ...missingMembers('connection', surface.connection, CHANNEL_MEMBERS.connection),
        ...missingMembers('webServer', surface.webServer, CHANNEL_MEMBERS.webServer),
    ];
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
export function hostCapabilities(surface) {
    const missing = [
        ...missingMembers('settings', surface.settings, SETTINGS_MEMBERS),
        ...missingMembers('llm', surface.llm, LLM_MEMBERS),
    ];
    return {
        supported: missing.length === 0,
        channel: channelGaps(surface).length === 0,
        namespaceStore: hasMembers(surface.settings, NAMESPACE_MEMBERS),
        missing,
        channelGaps: channelGaps(surface),
    };
}
/** Whether the scope `settings.register` returned can actually be read back. */
export function scopeReadable(scope) {
    return typeof memberOf(scope, 'get') === 'function';
}
/** The namespace-store degradation, or `null` when the store is available. */
export function namespaceMessage(report) {
    return report.namespaceStore
        ? null
        : 'settings.register is unavailable: user knowledge-base entries are read from this row\'s own config instead of a plugin-owned settings namespace';
}
/**
 * The channel degradation, or `null` when the pair is mountable.
 *
 * Only meaningful once both services are known to be active, so the caller
 * passes the surface it resolved inside `ctx.inject`.
 */
export function channelMessage(surface) {
    const gaps = channelGaps(surface);
    return gaps.length === 0
        ? null
        : `host provides no ${gaps.join(' and ')}: the browser half cannot diagnose custom-provider models over the loopback channel; the reasoning slider, model selection and guidance layout keep working`;
}
/**
 * The one-line diagnostic a user needs when the row cannot be mounted.
 *
 * Deliberately names the missing members and the consequence, so an incomplete
 * host never reads as "this model has no reasoning levels".
 */
export function unsupportedMessage(report) {
    return `dsh-reasoning-effort: host interface incomplete (${report.missing.join(', ')}). `
        + 'These are the minimum members this row calls; it stays inert rather than reporting an empty model directory.';
}
