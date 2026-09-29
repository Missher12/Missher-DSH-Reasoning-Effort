/** Current and earlier Host selection carriers must agree on acceptance. */
import assert from 'node:assert/strict'
import { requireAcceptedSelection, unsupportedEffort } from '../src/client/selection.js'
assert.doesNotThrow(() => requireAcceptedSelection(undefined))
assert.doesNotThrow(() => requireAcceptedSelection({ ok: true }))
assert.throws(() => requireAcceptedSelection({ ok: false, error: { message: 'unavailable' } }), /unavailable/)
assert.throws(() => requireAcceptedSelection({ ok: false }), /rejected/)
assert.equal(unsupportedEffort('max', [{ id: 'high' }]), 'max')
assert.equal(unsupportedEffort('max', undefined), 'max')
assert.equal(unsupportedEffort('high', [{ id: 'high' }]), undefined)
assert.equal(unsupportedEffort(undefined, []), undefined)
console.log('✓ selection: 8 assertions passed')
