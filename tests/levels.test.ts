/**
 * Level labelling: what the slider and the trigger show for each adapter level.
 *
 * The interesting assertions are the ones that pin the *local* behaviour that
 * differs from upstream dsh-reasoning-effort 0.7.3 — capitalised English level
 * labels, and the rightmost offered level always reads "Ultra".
 */
import {
  CANONICAL_LEVELS,
  displayLevelName,
  effortStops,
  levelIds,
  levelName,
  levelsText,
  stopIndex,
} from '../src/client/levels.js'
import { zh } from '../src/client/locales.js'

type Key = keyof typeof zh
const t = ((key: Key, params?: Record<string, string>) => {
  let out: string = zh[key]
  for (const [name, value] of Object.entries(params ?? {})) out = out.replace(`{${name}}`, value)
  return out
}) as never

let pass = 0
let fail = 0
function check(label: string, got: unknown, want: unknown): void {
  const ok = JSON.stringify(got) === JSON.stringify(want)
  if (ok) {
    pass += 1
    console.log(`  ✓ ${label}`)
  } else {
    fail += 1
    console.log(`  ✗ ${label}  → 实际 ${JSON.stringify(got)}，期望 ${JSON.stringify(want)}`)
  }
}

const label = (levels: string[], index: number): string => displayLevelName(levels[index], levels, t as never)
const all = (levels: string[]): string => levels.map((_, index) => label(levels, index)).join(',')

/* 内置 DeepSeek 的真实 4 档 */
const deepseek = ['off', 'low', 'high', 'max']
check('DeepSeek 4 档 → Off / Low / High / Ultra', all(deepseek), 'Off,Low,High,Ultra')
check('末位显示 Ultra，发送值仍是 max（显示与发送刻意解耦）', deepseek[3], 'max')

/* 最右端永远 Ultra —— 就算模型的最高档只是 high / xhigh */
check('最高档是 high 时，最右端也显示 Ultra', all(['off', 'low', 'high']), 'Off,Low,Ultra')
check('最高档是 xhigh 时同理', all(['low', 'medium', 'high', 'xhigh']), 'Low,Medium,High,Ultra')

/* DSH 的 7 元全集 */
check(
  '7 档全集 → Off / Minimal / Low / Medium / High / XHigh / Ultra',
  all(['off', 'minimal', 'low', 'medium', 'high', 'xhigh', 'max']),
  'Off,Minimal,Low,Medium,High,XHigh,Ultra',
)

/* 没有 off 的模型，底档就是它自己的最低档 */
check('没有 off 的模型：底档显示真名', label(['low', 'medium', 'high', 'xhigh'], 0), 'Low')

/* 模型自己就叫 ultra / Ultra 时，归一成我们的写法 */
check('模型自己把末档叫 ultra 时，统一显示成 Ultra', label(['off', 'ultra'], 1), 'Ultra')
check('……叫 Ultra 时同样是 Ultra', label(['off', 'Ultra'], 1), 'Ultra')

/* 边界 */
check('只有 1 档时不叫 Ultra（没有阶梯顶）', label(['off'], 0), 'Off')
check('只有 1 档且是 low 时显示 Low', label(['low'], 0), 'Low')
check('未知档位 id 原样透出', levelName('weird', t as never), 'weird')
check('未知 id 落在末位时仍然显示 Ultra', label(['off', 'weird'], 1), 'Ultra')
check('空列表 → None', levelsText([], t as never), 'None')
check(
  'levelsText 用同一套标签并用 / 连接',
  levelsText(['off', 'low', 'high', 'max'], t as never),
  'Off / Low / High / Ultra',
)
check('标签永远非空', deepseek.every((_, index) => label(deepseek, index).length > 0), true)
check('levelIds 取 id', levelIds([{ id: 'a' }, { id: 'b' }]), ['a', 'b'])
/* 以前这条靠「名字不等于 id」来判断字典有没有覆盖到；现在名字就是 id，
   所以直接查字典本身，测的仍是同一件事。 */
check(
  '字典覆盖 DSH 全部 7 个合法档位 + 顶档的 ultra',
  ['off', 'minimal', 'low', 'medium', 'high', 'xhigh', 'max', 'ultra']
    .every((id) => `level.${id}` in zh),
  true,
)
check('off 叫 Off', levelName('off', t as never), 'Off')
check('中文界面下档位名也不出现中文', ['off', 'minimal', 'low', 'medium', 'high', 'xhigh', 'max', 'ultra']
  .every((id) => !/[\u4e00-\u9fff]/u.test(levelName(id, t as never))), true)
check('档位名首字母大写（其余小写）', ['off', 'minimal', 'low', 'medium', 'high', 'max']
  .every((id) => {
    const shown = levelName(id, t as never)
    return shown === shown.charAt(0).toUpperCase() + shown.slice(1).toLowerCase()
  }), true)
check('xhigh 显示成 XHigh', levelName('xhigh', t as never), 'XHigh')
check('max 自己叫 Max（顶档由 displayLevelName 改成 Ultra）', levelName('max', t as never), 'Max')


/* ---------------------------------------------------------------- 梯子铺满 */

const ids = (stops: ReturnType<typeof effortStops>) => stops.map((stop) => stop.id).join(',')
const sends = (stops: ReturnType<typeof effortStops>) => stops.map((stop) => stop.send).join(',')

/* DeepSeek 的真实能力：off/low/high/max */
const deep = effortStops(['off', 'low', 'high', 'max'])
check('4 档模型也铺满 7 格', ids(deep), 'off,minimal,low,medium,high,xhigh,max')
check('原生档位原样发送', sends(deep), 'off,low,low,high,high,max,max')
check('原生/非原生标记正确',
  deep.map((stop) => (stop.native ? '1' : '0')).join(''), '1010101')
check('minimal 落到 low（不会掉到 off —— 那会关掉思考）',
  deep[1].send, 'low')
check('medium 平手时向上取（high，不是 low）', deep[3].send, 'high')
check('xhigh 平手时向上取（max，不是 high）', deep[5].send, 'max')
check('最右一档是 max，标签才是 Ultra',
  deep[6].id === 'max' && label(['off', 'minimal', 'low', 'medium', 'high', 'xhigh', 'max'], 6), 'Ultra')
check('整条梯子的发送值都落在模型真实能力里',
  deep.every((stop) => ['off', 'low', 'high', 'max'].includes(stop.send)), true)

/* 没有 off 的模型：仍然铺满，off 那格也没有被伪装 */
const noOff = effortStops(['low', 'medium', 'high', 'xhigh'])
check('没有 off 的模型也铺满 7 格', ids(noOff), 'off,minimal,low,medium,high,xhigh,max')
check('off 那格发的是最低的真实档位（low）', noOff[0].send, 'low')
check('……并且被标成非原生', noOff[0].native, false)
check('模型真有的那 4 档是原生（low/medium/high/xhigh）',
  noOff.filter((stop) => stop.native).map((stop) => stop.id).join(','), 'low,medium,high,xhigh')

/* 7 档全量：一个都不折叠 */
const full = effortStops([...CANONICAL_LEVELS])
check('7 档全量时全部原生', full.every((stop) => stop.native), true)
check('7 档全量时 send 与 id 逐个相同', sends(full), ids(full))

/* 自定义网关：只有 high 一档真支持（qwen-token-plan 那种） */
const onlyHigh = effortStops(['high', 'max'])
check('2 档模型铺满 7 格', ids(onlyHigh), 'off,minimal,low,medium,high,xhigh,max')
check('低于 high 的都发 high', onlyHigh.slice(0, 4).every((stop) => stop.send === 'high'), true)
check('xhigh 发 max', onlyHigh[5].send, 'max')

/* 闸门：不足 2 个真实档位就不给滑块（照上游） */
check('只有 1 个真实档位 → 没有梯子', effortStops(['off']).length, 0)
check('只有 1 个非 off 档位 → 没有梯子', effortStops(['low']).length, 0)
check('一个都没有 → 没有梯子', effortStops([]).length, 0)

/* 反向解析：当前档位落在哪一格 */
check('当前 max 落在最右一格（Ultra）', stopIndex(deep, 'max'), 6)
check('当前 low 落在 native 的 Low，而不是 Minimal', stopIndex(deep, 'low'), 2)
check('当前 high 落在 native 的 High，而不是 Medium', stopIndex(deep, 'high'), 4)
check('认不出的档位返回 -1', stopIndex(deep, 'nope'), -1)
check('undefined 返回 -1', stopIndex(deep, undefined), -1)

console.log(`\nlevels: ${pass} / ${pass + fail}${fail ? `  —— ${fail} 项不通过` : '  —— 全部通过'}`)
if (fail > 0) process.exit(1)
