import { strict as assert } from 'node:assert'
import { displayLevelName, levelsText } from '../src/client/levels.js'
import { en, zh, type ReasoningEffortTranslate } from '../src/client/locales.js'

for (const dictionary of [zh, en]) {
  const t: ReasoningEffortTranslate = key => dictionary[key]
  assert.equal(levelsText(['low', 'high'], t), 'Low / High')
  assert.equal(levelsText(['medium', 'high', 'xhigh'], t), 'Medium / High / XHigh')
  assert.equal(levelsText(['off', 'low', 'high', 'max'], t), 'Off / Low / High / Ultra')
  assert.equal(levelsText(['off', 'minimal', 'low', 'medium', 'high', 'xhigh', 'max'], t),
    'Off / Minimal / Low / Medium / High / XHigh / Ultra')
  assert.equal(levelsText(['low'], t), 'Low')
  assert.equal(levelsText([], t), dictionary['level.none'])
  assert.equal(displayLevelName('custom-effort', t), 'custom-effort')
}
console.log('✓ Effort labels match declared IDs for sparse and full models in both locales')
