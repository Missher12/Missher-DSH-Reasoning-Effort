import type { Context } from '@deepseek-ai/cordis';
import type { ModelFieldsOwnerProps } from './model-fields-slot.js';
import type { ReasoningEffortTranslate } from './locales.js';
import type { CapabilityDeclaration } from './model-capabilities.js';
/** Register when the Models module declares the row extension; disposal follows that module. */
export declare function registerModelSettings(ctx: Context): void;
/**
 * The reasoning declaration control both entry points share.
 *
 * It edits a declaration value and reports the next one **with its validity**:
 * the fallback page lets the user type a spelling, and an incomplete spelling
 * must block the save instead of leaving an older valid value in place. Who
 * persists the declaration — the host-owned Models draft inline, or the
 * plugin's settings page through `configForms` — is the caller's business.
 *
 * `advanced` adds the explicit wire-mapping editor and is off for the inline
 * row, so that interaction stays exactly what it was. `allowEmptyCustom` lets a
 * model with nothing declared enter a blank custom draft, which is the case the
 * page exists for.
 */
export interface ReasoningControlsProps {
    readonly value: unknown;
    readonly inheritedValue: unknown;
    readonly position: number;
    readonly disabled: boolean;
    readonly t: ReasoningEffortTranslate;
    readonly onChange: (next: CapabilityDeclaration, valid: boolean) => void;
    /** Levels the model's adapter advertises; only the advanced editor uses them. */
    readonly offered?: readonly string[];
    /** Show the explicit endpoint-mapping editor. */
    readonly advanced?: boolean;
    /** Allow a custom declaration to start empty when nothing is inherited. */
    readonly allowEmptyCustom?: boolean;
}
export declare function ReasoningControls({ value, inheritedValue, position, disabled, t, onChange, offered, advanced, allowEmptyCustom, }: ReasoningControlsProps): import("react").JSX.Element;
/** Edit one model; only its owner writes settings and enforces the revision. */
export declare function ModelReasoningSettings({ model, inherited, position, disabled, onChange, t }: ModelFieldsOwnerProps & {
    t: ReasoningEffortTranslate;
}): import("react").JSX.Element;
export declare const MODEL_SETTINGS_CSS = "\n.re-model-reasoning { min-width: 0; margin: 0; padding: 0; border: 0; color: var(--dsw-alias-label-primary, inherit); }\n.re-model-controls { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; align-items: start; }\n.re-model-controls > label { display: grid; gap: 4px; min-width: 0; margin: 0; }\n.re-model-controls > label > span { color: var(--dsw-alias-label-tertiary, #858a95); font-size: 12px; line-height: 18px; }\n.re-model-reasoning select { box-sizing: border-box; min-width: 0; width: 100%; height: 32px; padding: 0 28px 0 10px; border: .5px solid var(--dsw-alias-border-l4, #d4d4d8); border-radius: var(--dsw-radius-md, 8px); color: inherit; background-color: var(--dsw-alias-bg-layer-1, transparent); font: inherit; font-size: 14px; line-height: 22px; appearance: none; background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12' fill='none'%3E%3Cpath d='M3 4.5L6 7.5L9 4.5' stroke='%2381858C' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\"); background-repeat: no-repeat; background-position: right 10px center; }\n.re-model-reasoning [role=alert] { color: var(--dsw-alias-state-danger-primary, #be4343); margin: 8px 0 0; font-size: 12px; line-height: 18px; }\n.re-model-reasoning :disabled { opacity: .6; cursor: default; }\n.re-model-advanced { margin-top: 10px; padding-top: 10px; border-top: .5px solid var(--dsw-alias-border-l4, #d4d4d8); }\n.re-model-advanced-title { color: var(--dsw-alias-label-secondary, #52525b); font-size: 12px; line-height: 18px; font-weight: 500; }\n.re-model-advanced-hint { margin: 4px 0 8px; color: var(--dsw-alias-label-tertiary, #858a95); font-size: 12px; line-height: 18px; }\n.re-model-wire { display: grid; grid-template-columns: 96px minmax(0, 1fr); gap: 8px; align-items: center; margin: 0 0 6px; }\n.re-model-wire-enable { display: flex; align-items: center; gap: 6px; min-width: 0; margin: 0; font-size: 13px; }\n.re-model-wire-value { box-sizing: border-box; min-width: 0; width: 100%; height: 30px; padding: 0 8px; border: .5px solid var(--dsw-alias-border-l4, #d4d4d8); border-radius: var(--dsw-radius-md, 8px); color: inherit; background-color: var(--dsw-alias-bg-layer-1, transparent); font: inherit; font-size: 13px; }\n";
