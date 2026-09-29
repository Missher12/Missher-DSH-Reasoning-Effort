/** Install this candidate into a temporary Web profile and exercise its real authenticated route. */
import assert from 'node:assert/strict'
import { spawn, execFileSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { mkdir, mkdtemp, readFile, writeFile } from 'node:fs/promises'
import { resolve, join } from 'node:path'

const source = process.env.DSH_SOURCE_DIR
const artifact = process.env.DSH_INSTALL_SPEC
if (!source || !artifact) throw new Error('Set DSH_SOURCE_DIR and DSH_INSTALL_SPEC to the isolated built Host and candidate tarball')
assert(existsSync(artifact), 'Build the candidate tarball before starting profile verification')
const output = resolve('.verification')
await mkdir(output, { recursive: true })
const work = await mkdtemp(join(output, 'profile-'))
const cli = join(source, 'apps/cli/lib/bin.js')
const env = Object.fromEntries(['PATH', 'HOME', 'TMPDIR', 'LANG', 'TZ'].filter(key => process.env[key]).map(key => [key, process.env[key]]))
Object.assign(env, { DSH_HOME: join(work, 'home'), DSH_TELEMETRY_DISABLED: '1' })
const profile = 'reasoning-acceptance'
const cleanLog = value => String(value).replace(/([?&][^=\s]+)=([^\s]+)/g, '$1=[REDACTED_SECRET]')
const run = args => execFileSync(process.execPath, [cli, ...args], { cwd: work, env, encoding: 'utf8', timeout: 60_000 })
await writeFile(join(work, 'package.json'), JSON.stringify({ name: 'reasoning-acceptance', private: true, type: 'module' }))
await writeFile(join(work, 'base.yml'), run(['--profile', profile, '--from-default-profile', 'web', '--dump-config']))
await writeFile(join(work, 'install.log'), cleanLog(run(['plugin', '--profile', profile, 'add', artifact, '--offline'])))
const composed = run(['--profile', profile, '--dump-config'])
assert(composed.includes('dsh-reasoning-effort'))
await writeFile(join(work, 'composed.yml'), composed)
const receipt = join(work, 'receipt.json')
const reporter = join(work, 'reporter.mjs')
await writeFile(reporter, `import { writeFile } from 'node:fs/promises';
export const inject = ['connection', 'webServer', 'settings', 'llm'];
export function apply(ctx) {
  const timer = setTimeout(async () => {
    try {
      const base = 'http://127.0.0.1:' + ctx.webServer.port;
      const exchange = await fetch(ctx.connection.authenticatedUrl(base + '/'), { redirect: 'manual' });
      const cookie = (exchange.headers.get('set-cookie') ?? '').split(';')[0];
      const body = JSON.stringify({ type: 'client-request', rpcId: 'acceptance', method: 'store' });
      const refused = await fetch(base + '/dsh-reasoning-effort/store', { method: 'POST', headers: { 'content-type': 'application/json' }, body });
      const response = await fetch(base + '/dsh-reasoning-effort/store', { method: 'POST', headers: { 'content-type': 'application/json', cookie, origin: base }, body });
      const value = await response.json();
      await writeFile(${JSON.stringify(receipt)}, JSON.stringify({ authExchange: exchange.status, unauthenticated: refused.status, status: response.status, value }));
    } catch (error) { await writeFile(${JSON.stringify(receipt)}, JSON.stringify({ error: String(error) })); }
  }, 1500);
  ctx.effect(() => () => clearTimeout(timer));
}`)
await writeFile(join(env.DSH_HOME, 'profiles', profile, 'cordis.patch.yml'), '- insert:\n    - id: reasoning-acceptance-reporter\n      name: ' + JSON.stringify(reporter) + '\n')
const child = spawn(process.execPath, [cli, '--profile', profile, '--no-open', '--host', '127.0.0.1', '--port', '0'], { cwd: work, env, stdio: ['ignore', 'pipe', 'pipe'] })
let log = ''
child.stdout.on('data', data => { log += data })
child.stderr.on('data', data => { log += data })
const closed = new Promise(resolve => child.once('exit', resolve))
try {
  const deadline = Date.now() + 40_000
  while (!existsSync(receipt)) {
    if (Date.now() > deadline || child.exitCode !== null) throw new Error(`Isolated profile failed: ${work}/boot.log`)
    await new Promise(resolve => setTimeout(resolve, 100))
  }
  const result = JSON.parse(await readFile(receipt, 'utf8'))
  assert.equal(result.error, undefined)
  assert.equal(result.authExchange, 303)
  assert.equal(result.unauthenticated, 401)
  assert.equal(result.status, 200)
  assert.deepEqual(result.value, { type: 'server-response', rpcId: 'acceptance', result: { ok: true, value: { entries: [] } } })
  await writeFile(join(output, 'host-profile.json'), JSON.stringify({ install: true, loader: true, authenticatedPrivateRoute: true, unauthenticatedRejected: true, realModel: false, profileDirectory: work }, null, 2) + '\n')
  console.log('PASS: temporary profile installation, real Loader, browser authentication, private route, and unauthorized refusal. No model call.')
} finally {
  child.kill('SIGTERM')
  const timer = setTimeout(() => child.kill('SIGKILL'), 8000)
  await closed
  clearTimeout(timer)
  await writeFile(join(work, 'boot.log'), cleanLog(log))
}
