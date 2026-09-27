/**
 * Load the built client bundle under a stub module loader and fail on a throw.
 *
 * esbuild only *transpiles* — it does not evaluate. A backtick inside a CSS
 * comment (the stylesheet is one big template literal) silently closes the
 * string, and the module then dies at evaluation time with something like
 * `ReferenceError: effort is not defined`. DSH responds by dropping every one
 * of the plugin's registrations, so the model selector silently reverts to the
 * shipped one. That is far too quiet for a change nobody would notice.
 *
 * This runs the real artifact the way DSH does — through
 * `window.__ModuleLoader__.load` — with `react` stubbed, and asserts the factory
 * returns `inject` and `apply`.
 *
 * Usage: node scripts/check-client-load.mjs
 */
import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createContext, runInContext } from 'node:vm'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const bundle = resolve(root, 'lib', 'client', 'index.js')

/* Module scope only reads localStorage behind try/catch and never touches the
   DOM, so a bare stub surface is enough to reach the failure we care about. */
const sandbox = {
  console,
  setTimeout,
  clearTimeout,
  requestAnimationFrame: () => 0,
  cancelAnimationFrame: () => undefined,
  localStorage: { getItem: () => null, setItem: () => undefined, removeItem: () => undefined },
  document: {
    createElement: () => ({ style: {}, dataset: {}, appendChild: () => undefined, remove: () => undefined }),
    querySelector: () => null,
    head: { appendChild: () => undefined },
    body: { hasAttribute: () => false, setAttribute: () => undefined },
  },
  matchMedia: () => ({ matches: false, addEventListener: () => undefined, removeEventListener: () => undefined }),
}
sandbox.window = sandbox
sandbox.globalThis = sandbox

/** Enough of React that a factory-time reference would resolve; no rendering happens. */
const reactStub = {
  createElement: () => null,
  Fragment: Symbol('Fragment'),
  useState: (value) => [typeof value === 'function' ? value() : value, () => undefined],
  useEffect: () => undefined,
  useLayoutEffect: () => undefined,
  useInsertionEffect: () => undefined,
  useRef: (value) => ({ current: value }),
  useCallback: (fn) => fn,
  useMemo: (fn) => fn(),
  useSyncExternalStore: (_subscribe, getSnapshot) => getSnapshot(),
  memo: (fn) => fn,
}

let outcome = null
sandbox.__ModuleLoader__ = {
  load(module) {
    try {
      const exports = module.factory((name) => {
        if (name === 'react' || name === 'react/jsx-runtime') return reactStub
        throw new Error(`unexpected require at load time: ${name}`)
      })
      outcome = { ok: true, id: module.id, exports: Object.keys(exports ?? {}) }
    } catch (error) {
      outcome = { ok: false, id: module.id, error: String(error?.stack ?? error) }
    }
  },
}

runInContext(readFileSync(bundle, 'utf8'), createContext(sandbox), { filename: bundle })

if (outcome === null) {
  console.error('✗ 客户端产物没有调用 __ModuleLoader__.load —— 信封被改坏了')
  process.exit(1)
}
if (!outcome.ok) {
  console.error(`✗ 客户端产物在求值期抛错（DSH 会因此丢掉插件的全部注册）：\n\n${outcome.error}\n`)
  process.exit(1)
}
for (const name of ['inject', 'apply']) {
  if (!outcome.exports.includes(name)) {
    console.error(`✗ 产物缺少导出 ${name}（实际导出：${outcome.exports.join(', ')}）`)
    process.exit(1)
  }
}
console.log(`✓ 客户端产物可加载：id=${outcome.id} exports=${outcome.exports.join(', ')}`)
