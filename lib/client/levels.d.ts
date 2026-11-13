/** Visible slider positions and the effort IDs submitted to DSH. */
import type { ReasoningEffortTranslate } from './locales.js';
export interface EffortStop {
    readonly rung: string;
    readonly send: string;
}
export declare function effortStops(offered: readonly string[]): EffortStop[];
export declare function displayLevelName(id: string, t: ReasoningEffortTranslate): string;
export declare function levelsText(ids: readonly string[], t: ReasoningEffortTranslate): string;
