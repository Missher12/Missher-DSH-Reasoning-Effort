/** Sparse declarations must preserve endpoint values and other model fields. */
import assert from 'node:assert/strict'
import { capabilityMap, validCapability, withCapability } from '../src/client/model-capabilities.js'
const model = { id: 'vision', input: ['text', 'image'], contextWindow: 64000, reasoningEfforts: { low: 'small', high: 'large' } }
assert.deepEqual(capabilityMap(model.reasoningEfforts), { low: 'small', high: 'large' })
assert.deepEqual(withCapability(model, { high: 'large' }), { ...model, reasoningEfforts: { high: 'large' } })
assert.deepEqual(withCapability(model, false), { ...model, reasoningEfforts: false })
assert.deepEqual(withCapability(model, undefined), { id: 'vision', input: ['text', 'image'], contextWindow: 64000 })
assert.deepEqual(model.reasoningEfforts, { low: 'small', high: 'large' })
for (const value of [{}, { off: null }, { high: '' }, { high: '  ' }, { high: null }, { imaginary: 'high' }]) assert.equal(validCapability(value), false)
for (const value of [undefined, false, { high: 'vendor-high' }, { off: null, max: 'vendor-max' }]) assert.equal(validCapability(value), true)
console.log('✓ model capabilities: sparse mappings, field preservation, inheritance and validation')
