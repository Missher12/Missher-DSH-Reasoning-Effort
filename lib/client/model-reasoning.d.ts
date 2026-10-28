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
import { type CapabilityDeclaration } from './model-capabilities.js';
import type { SlotDeclaration } from './compat.js';
/** Client-side sync state of one settings namespace. */
export interface ConfigFormSnapshotLike {
    readonly status: 'loading' | 'ready' | 'unavailable';
    readonly value: unknown;
    readonly base: unknown;
    readonly user: unknown;
    readonly revision: number | undefined;
    readonly writable: boolean;
}
export interface ConfigFormLike {
    getSnapshot(): ConfigFormSnapshotLike;
    subscribe(listener: () => void): () => void;
    mutate(ops: readonly ReasoningOp[], expectedRevision?: number): Promise<boolean>;
}
/** One namespace view the shared describe mirror serves. */
export interface SettingsNamespaceLike {
    readonly ns: string;
    readonly schema: unknown;
}
export interface DescribeSnapshotLike {
    readonly status: string;
    readonly view: {
        readonly namespaces: readonly SettingsNamespaceLike[];
        readonly writable: boolean;
    } | undefined;
    readonly error: string | null;
}
export interface DescribeFaceLike {
    getSnapshot(): DescribeSnapshotLike;
    subscribe(listener: () => void): () => void;
    ensure(): Promise<void>;
}
export interface ConfigFormsLike {
    /** `undefined` when the provider's describe face is missing members this page calls. */
    describe(): DescribeFaceLike | undefined;
    /** `undefined` when the namespace form is missing members this page calls. */
    get(namespace: string): ConfigFormLike | undefined;
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
    rehydrate(serialized: unknown): unknown;
    nodeAtPath(root: unknown, path: readonly string[]): unknown;
    validate(node: unknown, draft: unknown): string | undefined;
}
/** The `llm` remote namespace, reduced to the one method this module calls. */
export interface LlmDirectoryLike {
    listConfigurableProviders(): Promise<unknown>;
}
/** The `session` remote namespace, reduced to the one method this module calls. */
export interface ModelCatalogLike {
    modelCatalog(): Promise<unknown>;
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
export declare function configFormsOf(service: unknown): ConfigFormsLike | undefined;
/** Accept one describe face only with the three members the page runs. */
export declare function describeFaceOf(candidate: unknown): DescribeFaceLike | undefined;
/** Accept one namespace form only with the three members the page runs. */
export declare function configFormOf(candidate: unknown): ConfigFormLike | undefined;
export declare function settingsSchemaOf(service: unknown): SettingsSchemaLike | undefined;
export declare function llmDirectoryOf(service: unknown): LlmDirectoryLike | undefined;
export declare function modelCatalogOf(service: unknown): ModelCatalogLike | undefined;
/** One provider the Host lets this client configure, with its settings seat. */
export interface ConfigurableProvider {
    readonly provider: string;
    readonly displayName: string;
    readonly settingsNs: string;
    /** Path from the namespace section root to this provider's profile object. */
    readonly settingsPath: readonly string[];
}
/** One model a provider can route, with the levels its adapter advertises. */
export interface CatalogModel {
    readonly id: string;
    readonly name: string;
    readonly efforts: readonly string[];
}
export interface CatalogGroup {
    readonly provider: string;
    readonly name: string;
    readonly models: readonly CatalogModel[];
}
/** One model declared in a settings layer, with its real array index. */
export interface LayerModel {
    readonly id: string;
    readonly index: number;
    readonly name: string | undefined;
    readonly reasoningEfforts: unknown;
}
export declare function isRecord(value: unknown): value is Record<string, unknown>;
/** Resolve one path through a JSON layer (objects and array indices). */
export declare function valueAt(value: unknown, path: readonly string[]): unknown;
/** Report whether a path exists, independently of its value. */
export declare function hasPath(value: unknown, path: readonly string[]): boolean;
/** Models a layer declares for one provider, in declaration order. */
export declare function modelsAt(layer: unknown, settingsPath: readonly string[]): LayerModel[];
/** Read the configurable-provider directory from a `RemoteResult` value. */
export declare function configurableProvidersOf(value: unknown): ConfigurableProvider[];
/** Read the routable model directory from a `RemoteResult` value. */
export declare function catalogGroupsOf(value: unknown): CatalogGroup[];
/** Declaration shape shared with the inline row. */
export type ReasoningMode = 'inherit' | 'disabled' | 'custom';
export interface DeclarationState {
    readonly mode: ReasoningMode;
    readonly mapping: Readonly<Record<string, string | null>>;
    /** False when the stored value is not a declaration this plugin can round-trip. */
    readonly valid: boolean;
}
/**
 * Classify one stored declaration exactly as the inline row does:
 * omitted = inherit, `false` = no reasoning support, object = explicit map.
 */
export declare function declarationState(value: unknown): DeclarationState;
/** The editable declaration for one stored value. */
export declare function declarationOf(value: unknown): CapabilityDeclaration;
/** Stable comparison key for one declaration. */
export declare function declarationKey(value: CapabilityDeclaration): string;
/** Why one model row is read-only, or `null` when it is editable. */
export type RowReason = 'namespace-unavailable' | 'document-readonly' | 'bad-path' | 'duplicate-id' | 'models-list' | 'not-in-catalog' | 'unconfirmed-leaf';
export interface RowPlanInput {
    readonly id: string;
    readonly name: string;
    readonly efforts: readonly string[];
    readonly settingsPath: readonly string[];
    readonly user: unknown;
    readonly base: unknown;
    readonly value: unknown;
    readonly catalogIds: ReadonlySet<string>;
    readonly documentWritable: boolean;
    readonly namespaceReady: boolean;
    /** Schema proof for one exact leaf; false disables the row. */
    readonly leafWritable: (path: readonly string[]) => boolean;
}
export interface RowPlan {
    readonly id: string;
    readonly name: string;
    readonly efforts: readonly string[];
    readonly path: readonly string[] | null;
    readonly declaration: CapabilityDeclaration;
    readonly inherited: CapabilityDeclaration;
    readonly reason: RowReason | null;
}
/** A value the leaf schema accepts, used to prove a path is writable. */
export declare const SAMPLE_DECLARATION: CapabilityDeclaration;
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
export declare function planModelRow(input: RowPlanInput): RowPlan;
export type LeafCheck = 'ok' | 'missing' | 'invalid' | 'unavailable';
/**
 * Ask the public schema service whether one exact leaf exists and accepts one
 * value. The serialized envelope is passed straight back to `rehydrate`: this
 * module never decodes it.
 */
export declare function checkLeaf(schema: SettingsSchemaLike | undefined, serialized: unknown, path: readonly string[], value: unknown): LeafCheck;
/** Levels the adapter advertises, deduplicated, limited to the DSH vocabulary. */
export declare function offeredLevels(efforts: readonly string[]): string[];
/** One editable row of an explicit mapping. */
export interface MappingRow {
    readonly level: string;
    /** Endpoint spelling exactly as the user typed it. */
    readonly wire: string;
    /** Whether this level is part of the declaration. */
    readonly enabled: boolean;
    /** Whether the model's adapter advertises this level. */
    readonly offered: boolean;
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
export declare function initialMappingRows(offered: readonly string[], declared: Readonly<Record<string, string | null>>): MappingRow[];
/**
 * Build the draft value the enabled rows currently describe, *without*
 * judging it. An enabled row with a blank spelling contributes an empty
 * string, so the parent sees the incomplete draft and can block the save
 * instead of holding an older valid value.
 */
export declare function rowsDeclaration(rows: readonly MappingRow[]): Record<string, string | null>;
export type MappingFailure = 'empty' | 'unknown-level' | 'blank-wire';
export interface MappingResult {
    readonly ok: boolean;
    readonly reason?: MappingFailure;
}
/**
 * Judge the enabled rows.
 *
 * Refuses, rather than repairs: an unknown level, a blank endpoint spelling
 * (whitespace only), or no enabled level above `off`. Stored spellings are
 * preserved byte for byte — only a value that is empty after trimming is
 * rejected, never rewritten.
 */
export declare function mappingValidity(rows: readonly MappingRow[]): MappingResult;
/** One path-addressed settings edit (the Host's wire op shape). */
export type ReasoningOp = {
    readonly op: 'set';
    readonly path: readonly string[];
    readonly value: unknown;
} | {
    readonly op: 'unset';
    readonly path: readonly string[];
};
/** The exact leaf write for one model: set the declaration, or clear it to inherit. */
export declare function reasoningOp(path: readonly string[], next: CapabilityDeclaration): ReasoningOp;
/** Settlement of one Host write, without losing the draft on failure. */
export type WriteOutcome = {
    readonly kind: 'accepted';
} | {
    readonly kind: 'refused';
} | {
    readonly kind: 'failed';
    readonly message: string;
};
/** Fold `ConfigForm.mutate`'s boolean/rejection contract into one outcome. */
export declare function settleWrite(run: () => Promise<boolean>): Promise<WriteOutcome>;
export interface DraftState {
    /** What the editor shows. */
    readonly draft: CapabilityDeclaration;
    /** The value `draft` is compared against to decide whether it is dirty. */
    readonly baselineKey: string;
    /** Revision captured when the draft diverged from its baseline. */
    readonly baseRevision: number | undefined;
    /** A value the Host has accepted and that has not been reported back yet. */
    readonly acknowledgedKey: string | null;
    /** The Host changed this target while a draft was pending. */
    readonly conflict: boolean;
}
export type DraftEvent = {
    readonly type: 'host';
    readonly declaration: CapabilityDeclaration;
    readonly revision: number | undefined;
} | {
    readonly type: 'edit';
    readonly declaration: CapabilityDeclaration;
    readonly revision: number | undefined;
} | {
    readonly type: 'reset';
    readonly declaration: CapabilityDeclaration;
    readonly revision: number | undefined;
} | {
    readonly type: 'write';
    readonly outcome: WriteOutcome;
};
export declare function createDraftState(declaration: CapabilityDeclaration, revision: number | undefined): DraftState;
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
export declare function draftReducer(state: DraftState, event: DraftEvent): DraftState;
/** Whether the draft differs from what it is compared against. */
export declare function draftDirty(state: DraftState): boolean;
/** Whether the revision the draft captured is no longer the Host's revision. */
export declare function draftStale(state: DraftState, revision: number | undefined): boolean;
/**
 * The save gate the row and the tests share: an editable, changed, valid draft
 * that the Host has not contradicted. A conflict keeps it closed until reset.
 */
export declare function draftSaveable(state: DraftState, revision: number | undefined, valid: boolean): boolean;
/** Whether the optional page replaces the inline row, and its teardown rule. */
export interface FallbackLifecycle {
    /** Follow the live slot declaration; `show` runs at most once per absence. */
    sync(state: SlotDeclaration): void;
    /** Mark teardown first, so a collapse during unload cannot re-show the page. */
    stop(): void;
    readonly stopped: boolean;
    readonly shown: boolean;
}
/**
 * The absent → present → absent lifecycle of the inline Models row.
 *
 * `show` never runs twice for one absence, and nothing is shown again after
 * `stop`, so an unload cannot resurrect a page that is being torn down.
 */
export declare function createFallbackLifecycle(show: () => void, hide: () => void): FallbackLifecycle;
