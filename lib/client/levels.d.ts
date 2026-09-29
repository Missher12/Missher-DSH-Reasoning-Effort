/**
 * Level labelling and ladder construction for the effort slider.
 *
 * LOCAL CHANGE — not part of upstream dsh-reasoning-effort 0.7.3, which labels
 * a level with the adapter's own `name` field, offers exactly the levels the
 * model advertises, and leaves its dictionary to the guidance panel.
 *
 * Two things differ here:
 *
 *  1. Labels come from the plugin's dictionary: `Off / Minimal / Low / Medium /
 *     High / XHigh`, with the top rung always reading `Ultra` — whatever the
 *     adapter calls it (`max`, `high`, `xhigh`).
 *  2. The ladder always carries DSH's whole vocabulary rather than only the
 *     model's levels. A rung the model does not advertise submits the nearest
 *     level it does, so the slider looks complete while every submission stays
 *     a level the endpoint accepts. {@link EffortStop.native} records whether
 *     the two coincide.
 *
 * Sent values are otherwise untouched: labels are strings and nothing else.
 * Extracted from `index.tsx` so the rules can be tested without React.
 *
 * @module dsh-reasoning-effort/levels
 */
import type { ReasoningEffortTranslate } from './locales.js';
/** DSH's complete reasoning-level vocabulary, in escalation order. */
export declare const CANONICAL_LEVELS: readonly ["off", "minimal", "low", "medium", "high", "xhigh", "max"];
/** One rung of the ladder: what it shows, and what it actually submits. */
export interface EffortStop {
    /** Canonical level this rung stands for — the label is derived from it. */
    readonly id: string;
    /** The id actually submitted; equals {@link EffortStop.id} when the model offers it. */
    readonly send: string;
    /** Whether the model advertises this exact level. */
    readonly native: boolean;
}
/** Dictionary label for one level id, or the id itself when nothing is known. */
export declare function levelName(level: string, t: ReasoningEffortTranslate): string;
/** Offered level ids, in adapter order — what {@link displayLevelName} ranks against. */
export declare function levelIds(levels: readonly {
    readonly id: string;
}[]): string[];
/**
 * Build the ladder for a model.
 *
 * A rung the model does not offer submits the nearest level it does — ties
 * resolving upward, so a rung is never silently downgraded below what was asked
 * for.
 *
 * @param offered - Level ids the model advertises, in adapter order.
 * @returns The ladder, or an empty array when there is nothing to slide.
 */
export declare function effortStops(offered: readonly string[]): EffortStop[];
/**
 * Rung index for a submitted effort.
 *
 * The real maximum always resolves to the right edge. Other values prefer a
 * native rung; acceptedStopIndex retains an explicit mapped visual choice.
 *
 * @param stops - The ladder.
 * @param effort - Effort currently in effect, as submitted.
 * @returns The rung index, or -1 when nothing matches.
 */
export declare function stopIndex(stops: readonly EffortStop[], effort: string | undefined): number;
/**
 * Label the plugin shows for one level.
 *
 * @param level - Level id to label.
 * @param offered - The ladder's level ids, in order.
 * @param t - Translator for the plugin's namespace.
 * @returns The label, never empty.
 */
export declare function displayLevelName(level: string, offered: readonly string[], t: ReasoningEffortTranslate): string;
/** A level list rendered as one line, using the same labels as the slider. */
export declare function levelsText(levels: readonly string[], t: ReasoningEffortTranslate): string;
/** Keep an accepted visual rung when several rungs share the same wire value. */
export declare function acceptedStopIndex(stops: readonly EffortStop[], effort: string | undefined, preferred: number): number;
