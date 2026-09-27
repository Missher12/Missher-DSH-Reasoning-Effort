/**
 * End-to-end check of the particle-palette chain, in a real browser.
 *
 * The unit suites cover `palettes.ts` in isolation, but nothing there renders a
 * React component or computes a style — so "click a swatch and the slider
 * changes colour" was, until this existed, an untested claim. This mounts the
 * components the plugin actually registers (captured from its own `apply()`),
 * clicks a swatch, and asserts the rendered result:
 *
 *   click → palette store → data-palette → track background → persisted →
 *   aria-checked → composer level text colour
 *
 * React comes from a sibling plugin project's node_modules (the plugin itself
 * declares React as a peer and never installs it), and Chrome is discovered at
 * its usual macOS path. Both are optional: when either is missing the check
 * reports that it was skipped instead of failing, so it never blocks a build on
 * a machine that cannot run it.
 *
 * Usage: node scripts/check-palette-click.mjs
 */
import { existsSync } from 'node:fs'
import { mkdir, copyFile, readFile, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawnSync } from 'node:child_process'
import { build } from 'esbuild'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const out = resolve(root, '.test-build', 'harness')
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const REACT_FROM = '/Users/missher/Documents/Projects/04-Harness-Plugins/dsh-usage-statistics/node_modules'

function skip(reason) {
  console.log(`• 调色板点击链路：跳过（${reason}）`)
  process.exit(0)
}

if (!existsSync(CHROME)) skip('找不到 Chrome')
if (!existsSync(resolve(REACT_FROM, 'react-dom/client.js'))) skip('找不到 React（同级插件项目的 node_modules）')

await mkdir(out, { recursive: true })

/* React, exposed as globals so the plugin's `require` can be answered with the
   very same instance the harness renders with. */
const entry = resolve(out, 'react-entry.ts')
await writeFile(entry, [
  "import * as React from 'react'",
  "import * as jsxRuntime from 'react/jsx-runtime'",
  "import { createRoot } from 'react-dom/client'",
  ";(window as any).React = React",
  ";(window as any).jsxRuntime = jsxRuntime",
  ";(window as any).createRoot = createRoot",
  '',
].join('\n'))
await build({
  entryPoints: [entry],
  outfile: resolve(out, 'react-globals.js'),
  bundle: true,
  platform: 'browser',
  format: 'iife',
  logLevel: 'warning',
  define: { 'process.env.NODE_ENV': '"production"' },
  nodePaths: [REACT_FROM],
})

await copyFile(resolve(root, 'lib', 'client', 'index.js'), resolve(out, 'plugin.js'))
await copyFile(resolve(root, 'tests', 'harness', 'palette-click.html'), resolve(out, 'palette-click.html'))

const run = spawnSync(CHROME, [
  '--headless=new', '--disable-gpu', '--no-sandbox',
  '--virtual-time-budget=8000', '--dump-dom',
  `file://${resolve(out, 'palette-click.html')}`,
], {
  encoding: 'utf8',
  /* The dump carries the whole DOM plus the inlined sprite, ~1.8 MB — well past
     node's 1 MiB default, which silently truncates it and loses the result. */
  maxBuffer: 64 * 1024 * 1024,
})

const dom = run.stdout ?? ''
const match = dom.match(/<pre id="out">([\s\S]*?)<\/pre>/)
if (match === null) {
  console.error('✗ 拿不到 harness 输出')
  process.exit(1)
}
const text = match[1]
  .replace(/&lt;/gu, '<').replace(/&gt;/gu, '>').replace(/&amp;/gu, '&').replace(/&quot;/gu, '"')
const summary = text.split('\n')[0]
console.log(text.split('\n').filter((line) => line.includes('✗') || line.startsWith('调色板点击链路')).join('\n'))
const failed = /(\d+) 项不通过/u.exec(summary)
if (failed !== null) {
  console.error(`\n✗ 调色板点击链路有 ${failed[1]} 项不通过`)
  process.exit(1)
}
if (!/全部通过/u.test(summary)) {
  console.error('✗ harness 没有跑完')
  process.exit(1)
}
