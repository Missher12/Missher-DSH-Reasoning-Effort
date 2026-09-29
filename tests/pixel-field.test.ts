import assert from 'node:assert/strict'
import { PixelField } from '../src/client/pixel-field.js'

const frames = new Map<number, FrameRequestCallback>()
let nextFrame = 0
const page = { hidden: false }
Object.assign(globalThis, {
  window: { devicePixelRatio: 1 }, document: page,
  requestAnimationFrame: (callback: FrameRequestCallback) => { const id = ++nextFrame; frames.set(id, callback); return id },
  cancelAnimationFrame: (id: number) => frames.delete(id),
})
const motion = { matches: false }
const canvas = {
  parentElement: { clientWidth: 200, clientHeight: 20 }, width: 0, height: 0,
  hidden: true, dataset: {} as Record<string, string>, getContext: () => null,
}
const field = new PixelField(canvas as unknown as HTMLCanvasElement, motion as MediaQueryList)
assert.equal(canvas.width, 200)
assert.equal(frames.size, 0)
field.setActive(true)
assert.equal(canvas.hidden, false)
assert.equal(frames.size, 1)
field.setColor('#7a2ec4')
field.sync()
assert.equal(frames.size, 1, 'resync must not leak a second animation loop')
page.hidden = true; field.sync()
assert.equal(frames.size, 0, 'background pages must stop scheduling frames')
page.hidden = false; motion.matches = true; field.sync()
assert.equal(frames.size, 0)
assert.equal(canvas.dataset.animation, 'reduced-motion')
motion.matches = false; field.sync()
assert.equal(frames.size, 1)
field.setActive(false); field.sync()
assert.equal(frames.size, 0, 'unmount cleanup must cancel animation')
assert.equal(canvas.hidden, true)
canvas.parentElement.clientWidth = 0; canvas.parentElement.clientHeight = 0
field.resize()
assert.equal(canvas.height, 0, 'a hidden zero-sized track must resize without hanging')
console.log('✓ pixel field: lifecycle, visibility, reduced motion and zero-size checks passed')
