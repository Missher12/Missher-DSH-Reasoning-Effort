import type { Context as ClientContext } from '@deepseek-ai/cordis';
/**
 * Services this half must hold before the seat can register.
 *
 * `slots`, `modelDirectories`, `connection` and `locale` are called directly.
 * `remote` and `remote.session` are required *indirectly* and cannot be dropped
 * just because no line here names them: `modelDirectories.directoryFor(sessionId)`
 * returns the model-selection service, whose own methods run through a Cordis
 * service proxy that borrows the **caller's** ctx. The official
 * `dsh-client-ui-model-selection/lib/client.js` reads `this.ctx.remote.session`
 * inside that call, so a row without these two inject entries fails at
 * `directoryFor` with `cannot get property "remote.session" without inject` —
 * the seat never registers and the composer silently falls back to the shipped
 * model selector.
 *
 * The `@deepseek-ai/dsh-api-remotes/client` import above stays type-only: it
 * contributes no runtime require, so these entries declare the caller's service
 * permission, not a value dependency of this bundle.
 */
export declare const inject: string[];
export declare function apply(ctx: ClientContext): void;
