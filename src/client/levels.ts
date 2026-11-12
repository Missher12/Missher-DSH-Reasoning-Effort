/** Display names for the exact reasoning-effort IDs exposed by DSH. */
import type { ReasoningEffortLocaleKey, ReasoningEffortTranslate } from './locales.js'

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
