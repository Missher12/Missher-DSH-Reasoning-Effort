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
import type { ReasoningEffortLocaleKey, ReasoningEffortTranslate } from './locales.js'

/** DSH's level vocabulary → dictionary keys. Ids outside this set pass through. */
const LEVEL_NAME_KEYS: Record<string, ReasoningEffortLocaleKey> = {
  off: 'level.off',
  minimal: 'level.minimal',
  low: 'level.low',
  medium: 'level.medium',
  high: 'level.high',
  xhigh: 'level.xhigh',
  max: 'level.max',
}

/** DSH's complete reasoning-level vocabulary, in escalation order. */
export const CANONICAL_LEVELS = ['off', 'minimal', 'low', 'medium', 'high', 'xhigh', 'max'] as const

/** One rung of the ladder: what it shows, and what it actually submits. */
export interface EffortStop {
  /** Canonical level this rung stands for — the label is derived from it. */
  readonly id: string
  /** The id actually submitted; equals {@link EffortStop.id} when the model offers it. */
  readonly send: string
  /** Whether the model advertises this exact level. */
  readonly native: boolean
}

/** Dictionary label for one level id, or the id itself when nothing is known. */
export function levelName(level: string, t: ReasoningEffortTranslate): string {
  const key = LEVEL_NAME_KEYS[level]
  return key === undefined ? level : t(key)
}

/** Offered level ids, in adapter order — what {@link displayLevelName} ranks against. */
export function levelIds(levels: readonly { readonly id: string }[]): string[] {
  return levels.map((level) => level.id)
}

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
export function effortStops(offered: readonly string[]): EffortStop[] {
  const present = CANONICAL_LEVELS.filter((level) => offered.includes(level))
  /* Same threshold as upstream: one choice is a label, not a slider. */
  if (present.length < 2) return []
  return CANONICAL_LEVELS.map((level) => {
    if (present.includes(level)) return { id: level, send: level, native: true }
    const at = CANONICAL_LEVELS.indexOf(level)
    let send: string = present[0]
    let best = Number.POSITIVE_INFINITY
    for (const candidate of present) {
      const distance = Math.abs(CANONICAL_LEVELS.indexOf(candidate) - at)
      /* `<=` lets the later (stronger) candidate win a tie. */
      if (distance <= best) {
        send = candidate
        best = distance
      }
    }
    return { id: level, send, native: false }
  })
}

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
export function stopIndex(stops: readonly EffortStop[], effort: string | undefined): number {
  // The right edge is the model's real maximum, even when its wire id is high/xhigh.
  if (effort !== undefined && stops.at(-1)?.send === effort) return stops.length - 1
  const native = stops.findIndex((stop) => stop.native && stop.send === effort)
  if (native >= 0) return native
  return stops.findIndex((stop) => stop.send === effort)
}

/**
 * Label the plugin shows for one level.
 *
 * @param level - Level id to label.
 * @param offered - The ladder's level ids, in order.
 * @param t - Translator for the plugin's namespace.
 * @returns The label, never empty.
 */
export function displayLevelName(
  level: string,
  offered: readonly string[],
  t: ReasoningEffortTranslate,
): string {
  /* Fewer than two levels means no slider, so there is no "ladder top" to
     name; a lone level keeps its own name. */
  if (offered.length >= 2 && offered[offered.length - 1] === level) return t('level.ultra')
  return levelName(level, t)
}

/** A level list rendered as one line, using the same labels as the slider. */
export function levelsText(levels: readonly string[], t: ReasoningEffortTranslate): string {
  return levels.length === 0
    ? t('level.none')
    : levels.map((level) => displayLevelName(level, levels, t)).join(' / ')
}

/** Keep an accepted visual rung when several rungs share the same wire value. */
export function acceptedStopIndex(stops: readonly EffortStop[], effort: string | undefined, preferred: number): number {
  if (effort !== undefined && Number.isInteger(preferred) && stops[preferred]?.send === effort) return preferred
  return stopIndex(stops, effort)
}
