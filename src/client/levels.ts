/** Visible slider positions and the effort IDs submitted to DSH. */
import type { ReasoningEffortLocaleKey, ReasoningEffortTranslate } from './locales.js'

const RUNGS = ['off', 'minimal', 'low', 'medium', 'high', 'xhigh', 'max']

export interface EffortStop {
  readonly rung: string
  readonly send: string
}

export function effortStops(offered: readonly string[]): EffortStop[] {
  const ids = [...new Set(offered)]
  if (ids.length < 2) return []
  // Adapter-specific IDs have no place on the standard strength scale.
  if (ids.some(id => !RUNGS.includes(id))) return ids.map(id => ({ rung: id, send: id }))
  const supported = RUNGS.map((id, index) => ids.includes(id) ? index : -1).filter(index => index >= 0)
  return RUNGS.map((rung, index) => {
    // The stronger supported level wins a tie, as on the original seven-stop slider.
    const closest = supported.reduce((best, next) => Math.abs(next - index) <= Math.abs(best - index) ? next : best)
    return { rung, send: RUNGS[closest] }
  })
}

const LEVEL_NAME_KEYS = new Map<string, ReasoningEffortLocaleKey>([
  ['off', 'level.off'],
  ['minimal', 'level.minimal'],
  ['low', 'level.low'],
  ['medium', 'level.medium'],
  ['high', 'level.high'],
  ['xhigh', 'level.xhigh'],
  ['max', 'level.ultra'],
])

export function displayLevelName(id: string, t: ReasoningEffortTranslate): string {
  const key = LEVEL_NAME_KEYS.get(id)
  return key === undefined ? id : t(key)
}

export function levelsText(ids: readonly string[], t: ReasoningEffortTranslate): string {
  return ids.length ? ids.map(id => displayLevelName(id, t)).join(' / ') : t('level.none')
}
