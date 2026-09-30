/**
 * Particle palettes: the generated CSS and the id fallback.
 *
 * The load-bearing assertions are (a) the default palette emits nothing at all,
 * which is what keeps "upstream, untouched" true, and (b) every non-default
 * palette overrides each surface upstream hard-codes in blue — including the
 * two `@keyframes` sets, which cannot be recoloured by a filter.
 */
import { DEFAULT_PALETTE_ID, PALETTES, paletteById, paletteCss, paletteOrDefault } from '../src/client/palettes.js'

let pass = 0
let fail = 0
function check(label: string, ok: boolean, detail = ''): void {
  if (ok) {
    pass += 1
    console.log(`  ✓ ${label}`)
  } else {
    fail += 1
    console.log(`  ✗ ${label}${detail ? `  → ${detail}` : ''}`)
  }
}

const css = paletteCss()
const themed = PALETTES.filter((palette) => palette.hue !== null)

check('默认配色一条覆盖规则都不生成（= 上游逐字行为）', !css.includes(`data-palette="${DEFAULT_PALETTE_ID}"`))
check('默认配色的 hue 是 null', paletteById(DEFAULT_PALETTE_ID)?.hue === null)
check('hue 为 null 的只有默认那一套', PALETTES.filter((p) => p.hue === null).length === 1)
check('每套非默认配色都生成了规则', themed.every((p) => css.includes(`.re-effort[data-palette="${p.id}"]`)))

for (const palette of themed) {
  const scope = `.re-effort[data-palette="${palette.id}"]`
  const light = `body:not([data-ds-dark-theme]) ${scope}`
  check(
    `${palette.id}：轨道和辉光覆盖所有配色`,
    css.includes(`${scope} .re-effort-track`)
      && css.includes(`${scope} .re-effort-flare`),
  )
  check(`${palette.id}：浅色那几条带正确的 body 前缀`, css.includes(`${light} .re-effort-track `))
  check(
    `${palette.id}：顶档呼吸的两条 keyframes 都按配色重写了`,
    css.includes(`@keyframes re-effort-dark-breathe-${palette.id}`)
      && css.includes(`@keyframes re-effort-light-breathe-${palette.id}`)
      && css.includes(`animation-name: re-effort-dark-breathe-${palette.id}`)
      && css.includes(`animation-name: re-effort-light-breathe-${palette.id}`),
  )
  check(
    `${palette.id}：呼吸帧用的是自己的颜色，不是上游的蓝紫`,
    css.includes(`0 0 21px rgba(${palette.glow}, .5)`) && !css.includes('111, 66, 255'),
  )
}

check(
  'reduced-motion 的关闭被重新声明（否则会压过上游的 opt-out）',
  /@media \(prefers-reduced-motion: reduce\)[\s\S]*animation: none/.test(css),
)
check(
  'reduced-motion 那条的特异性高于 animation-name 那条',
  css.includes('body .re-effort[data-palette] .re-effort-slider[data-top] .re-effort-track { animation: none; }'),
)
check('未知 id 回落到默认（不会把滑块弄坏）', paletteOrDefault('nope').id === DEFAULT_PALETTE_ID)
check('未知 id 的 hue 是 null → 走逐字路径', paletteOrDefault('nope').hue === null)
check('每套非默认配色都有 5 个深色渐变停靠点', themed.every((p) => p.dark.length === 5))
check('每套非默认配色都有 4 个浅色进度停靠点', themed.every((p) => p.lightFill.length === 4 && p.topFill.length === 4))
check('每套的 hue 都是合法 CSS 颜色', themed.every((p) => /^hsl\(\d+ 100% \d+%\)$/u.test(p.hue as string)))
check('每套的 glow 都是 “r, g, b”', themed.every((p) => /^\d+, \d+, \d+$/u.test(p.glow)))
check('色块背景都写了', PALETTES.every((p) => p.swatch.length > 0))
check('调色板 id 不重复', new Set(PALETTES.map((p) => p.id)).size === PALETTES.length)

console.log(`\npalettes: ${pass} / ${pass + fail}${fail ? `  —— ${fail} 项不通过` : '  —— 全部通过'}`)
if (fail > 0) process.exit(1)
