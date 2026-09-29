/** Prepare a local browser fixture against this package's built client. */
import { mkdir, copyFile, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { build } from 'esbuild'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const out = resolve(root, '.test-build', 'selection-browser')
const reactFrom = resolve(process.argv[2] ?? resolve(root, 'node_modules'))
await mkdir(out, { recursive: true })
const entry = resolve(out, 'globals.ts')
await writeFile(entry, [
  "import * as React from 'react'",
  "import * as jsxRuntime from 'react/jsx-runtime'",
  "import { createRoot } from 'react-dom/client'",
  "import { zh } from '../../src/client/locales.js'",
  'Object.assign(window, { React, jsxRuntime, createRoot, labels: zh })',
].join('\n'))
await build({ entryPoints: [entry], outfile: resolve(out, 'react-globals.js'), bundle: true,
  platform: 'browser', format: 'iife', nodePaths: [reactFrom],
  alias: { react: resolve(reactFrom, 'react'), 'react-dom': resolve(reactFrom, 'react-dom') },
  define: { 'process.env.NODE_ENV': '"production"' } })
for (const name of ['selection.html', 'palette-click.html', 'drag.html']) {
  await copyFile(resolve(root, 'tests', 'harness', name), resolve(out, name))
}
await copyFile(resolve(root, 'lib', 'client', 'index.js'), resolve(out, 'plugin.js'))
console.log(`Prepared browser fixtures: ${out}`)
