/** Model declarations edited through the host's revision-fenced settings form. */
import type { SettingsPathOpView } from '@deepseek-ai/dsh-api-remotes/client';
export declare const capabilityLevels: readonly ["off", "minimal", "low", "medium", "high", "xhigh", "max"];
export type CapabilityDeclaration = false | Record<string, string | null> | undefined;
type JsonValue = Extract<SettingsPathOpView, {
    op: 'set';
}>['value'];
export type SettingsObject = Record<string, JsonValue>;
/** Read a JSON object without coercing scalar configuration values. */
export declare function settingsObject(value: unknown): SettingsObject | undefined;
/** Return the configured provider at its host-declared settings address. */
export declare function providerAt(value: unknown, path: readonly string[]): SettingsObject | undefined;
/** Preserve explicit wire mappings; an unknown mapping is never guessed. */
export declare function capabilityMap(value: unknown): Record<string, string | null>;
/** Reject empty declarations, unknown levels, and blank endpoint values. */
export declare function validCapability(value: unknown): value is CapabilityDeclaration;
/** Update only reasoning in the owning model draft. */
export declare function withCapability(model: Readonly<Record<string, unknown>>, value: CapabilityDeclaration): Record<string, unknown>;
export {};
