/**
 * Run the pure-logic test suites.
 *
 * The suites are TypeScript because they import the plugin's own modules, so
 * each one is bundled with esbuild into `.test-build/` and then executed by
 * node. Nothing here needs a DOM: the modules under test (`levels`,
 * `palettes`, `selection`) are deliberately free of React and of the canvas.
 *
 * Usage: node scripts/test.mjs
 */
import { mkdir } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawnSync } from 'node:child_process'
import { build } from 'esbuild'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const outdir = resolve(root, '.test-build')
const suites = ['levels.test.ts', 'palettes.test.ts', 'selection.test.ts', 'pixel-field.test.ts']

await mkdir(outdir, { recursive: true })

let failed = 0
for (const suite of suites) {
  const outfile = resolve(outdir, suite.replace(/\.ts$/u, '.cjs'))
  await build({
    entryPoints: [resolve(root, 'tests', suite)],
    outfile,
    bundle: true,
    platform: 'node',
    format: 'cjs',
    logLevel: 'warning',
  })
  const run = spawnSync(process.execPath, [outfile], { stdio: 'inherit' })
  if (run.status !== 0) failed += 1
}

if (failed > 0) {
  console.error(`\n✗ ${failed} 个测试套件未通过`)
  process.exit(1)
}
console.log('\n✓ 全部测试套件通过')
