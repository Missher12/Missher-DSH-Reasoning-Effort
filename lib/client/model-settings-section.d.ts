import type { Context } from '@deepseek-ai/cordis';
import type { ReasoningEffortTranslate } from './locales.js';
import { type ConfigFormsLike, type LlmDirectoryLike, type ModelCatalogLike, type SettingsSchemaLike } from './model-reasoning.js';
export interface ServiceStore<T> {
    getSnapshot(): T | undefined;
    subscribe(listener: () => void): () => void;
    set(value: T | undefined): void;
}
/** A one-value store for a service that may never arrive on this Host. */
export declare function createServiceStore<T>(): ServiceStore<T>;
export interface ModelsSectionLocaleLike {
    getLocale(): {
        active: string;
    };
}
/** Everything the page needs, captured once at registration. */
export interface ModelsSectionServices {
    readonly configForms: ServiceStore<ConfigFormsLike>;
    readonly settingsSchema: ServiceStore<SettingsSchemaLike>;
    readonly llmDirectory: ServiceStore<LlmDirectoryLike>;
    readonly modelCatalog: ServiceStore<ModelCatalogLike>;
    readonly locale: ModelsSectionLocaleLike | undefined;
}
/**
 * Register the fallback page and follow the inline slot's lifecycle.
 *
 * `slots.inject` is the registry's declaration hook: its callback runs when the
 * slot is declared (also when it already was), and the disposer it returns runs
 * when the declaration collapses. That is the whole absent → present → absent
 * handling — no polling and no start-up snapshot.
 */
export declare function registerModelsSection(ctx: Context, services: ModelsSectionServices): void;
export declare function ModelsSection({ services, t }: {
    readonly services: ModelsSectionServices;
    readonly t: ReasoningEffortTranslate;
}): import("react").JSX.Element;
export declare const MODELS_SECTION_CSS = "\n/* The fallback page is an inline-size container: its own content box decides\n   the layout, so a Host that shrinks the settings column (the official 390px\n   window leaves ~106px) reflows here without touching the window, the Host\n   shell, or the inline Models row. */\n.re-models { container: models / inline-size; display: grid; gap: 12px; min-width: 0; color: var(--dsw-alias-label-primary, inherit); }\n.re-models-title { margin: 0; font-size: 15px; line-height: 22px; font-weight: 600; }\n.re-models-note { margin: 0; color: var(--dsw-alias-label-tertiary, #858a95); font-size: 12px; line-height: 18px; overflow-wrap: anywhere; }\n.re-models-provider { display: grid; gap: 10px; min-width: 0; padding-top: 8px; border-top: .5px solid var(--dsw-alias-border-l4, #d4d4d8); }\n.re-models-provider-title { margin: 0; font-size: 13px; line-height: 20px; font-weight: 600; overflow-wrap: anywhere; }\n.re-models-row { display: grid; gap: 8px; min-width: 0; padding: 10px; border: .5px solid var(--dsw-alias-border-l4, #d4d4d8); border-radius: var(--dsw-radius-md, 8px); }\n.re-models-row-head { display: flex; flex-wrap: wrap; align-items: baseline; gap: 8px; min-width: 0; }\n.re-models-model-name { min-width: 0; overflow-wrap: anywhere; font-size: 13px; line-height: 20px; font-weight: 500; }\n.re-models-model-id { min-width: 0; overflow-wrap: anywhere; color: var(--dsw-alias-label-tertiary, #858a95); font-size: 12px; line-height: 18px; }\n.re-models-actions { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; }\n.re-models-actions button { box-sizing: border-box; height: 30px; padding: 0 12px; border: .5px solid var(--dsw-alias-border-l4, #d4d4d8); border-radius: var(--dsw-radius-md, 8px); color: inherit; background-color: var(--dsw-alias-bg-layer-1, transparent); font: inherit; font-size: 13px; }\n.re-models-actions button:disabled { opacity: .6; cursor: default; }\n.re-models-ok { color: var(--dsw-alias-state-success-primary, #2f7d4f); font-size: 12px; line-height: 18px; }\n.re-models-error { color: var(--dsw-alias-state-danger-primary, #be4343); font-size: 12px; line-height: 18px; overflow-wrap: anywhere; }\n\n/* Narrow fallback column: stack the shared control's two fields and the wire\n   row, keep every control full-width, and trim the card/select padding just\n   enough that a ~106px container still fits a usable 32px-tall select. The\n   normal-width layout above is untouched, and so is the inline Models row. */\n@container models (max-width: 360px) {\n  .re-models-row { padding: 6px; gap: 6px; }\n  .re-models .re-model-controls { grid-template-columns: minmax(0, 1fr); gap: 8px; }\n  .re-models .re-model-controls > label { width: 100%; min-width: 0; }\n  .re-models .re-model-controls select { width: 100%; min-width: 0; padding: 0 24px 0 8px; background-position: right 6px center; }\n  .re-models .re-model-wire { grid-template-columns: minmax(0, 1fr); gap: 4px; align-items: stretch; }\n  .re-models .re-model-wire-enable { width: 100%; min-width: 0; }\n  .re-models .re-model-wire-value { width: 100%; min-width: 0; }\n  .re-models-actions button { padding: 0 10px; }\n}\n\n/* Extreme-narrow fallback column: the same ~106px container leaves roughly\n   92px for the select, and the five-character Chinese option labels need about\n   70px at 14px. Drop the option text to 12px and the horizontal padding to\n   6/18 so the usable text width stays at or above 60px inside that control,\n   without changing the single-column layout. */\n@container models (max-width: 160px) {\n  .re-models .re-model-controls select { font-size: 12px; padding: 0 18px 0 6px; background-position: right 4px center; }\n}\n";
