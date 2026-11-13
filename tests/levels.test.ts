import { strict as assert } from 'node:assert'
import { displayLevelName, effortStops, levelsText } from '../src/client/levels.js'
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
assert.deepEqual(effortStops(['off', 'low', 'high', 'max']).map(stop => stop.send),
  ['off', 'low', 'low', 'high', 'high', 'max', 'max'])
assert.deepEqual(effortStops(['high', 'high']), [])
assert.deepEqual(effortStops(['fast', 'quality']), [{ rung: 'fast', send: 'fast' }, { rung: 'quality', send: 'quality' }])
console.log('✓ Display labels and model effort mappings match in both locales')
