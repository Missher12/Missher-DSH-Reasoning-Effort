/**
 * Per-model reasoning settings: the two entry points' shared behaviour.
 *
 * These assertions cover the decisions that are easy to get quietly wrong and
 * that the React rows actually call into:
 *
 * - a service is accepted only when the members this plugin calls are callable,
 *   and the accepted object keeps the original receiver;
 * - a model's leaf is proven by the Host schema before it is offered, and an
 *   override is legal only beside an empty models list and an installed-catalog
 *   id — never inferred from a name match elsewhere in the tree;
 * - an override's inherit/explicit state comes from the user layer's presence,
 *   while its inherited value comes from the base layer (not the resolved one);
 * - an incomplete mapping replaces the draft, so an older valid value cannot be
 *   saved in its place, and stored spellings are never trimmed;
 * - a clean row captures the current revision when it first becomes dirty, a
 *   dirty row keeps its draft when the Host changes the target, and only an
 *   accepted write moves the baseline.
 */
import Schema from '@deepseek-ai/schemastery'
import {
  catalogGroupsOf,
  checkLeaf,
  configFormsOf,
  configurableProvidersOf,
  createDraftState,
  createFallbackLifecycle,
  declarationOf,
  declarationState,
  draftDirty,
  draftReducer,
  draftSaveable,
  draftStale,
  hasPath,
  initialMappingRows,
  llmDirectoryOf,
  mappingValidity,
  modelCatalogOf,
  modelsAt,
  offeredLevels,
  planModelRow,
  reasoningOp,
  rowsDeclaration,
  SAMPLE_DECLARATION,
  settleWrite,
  settingsSchemaOf,
  valueAt,
} from '../src/client/model-reasoning.js'

let pass = 0
let fail = 0
function check(label: string, got: unknown, want: unknown): void {
  const ok = JSON.stringify(got) === JSON.stringify(want)
  if (ok) pass += 1
  else fail += 1
  console.log(`${ok ? '✓' : '✗'} ${label}${ok ? '' : ` —— got ${JSON.stringify(got)}, want ${JSON.stringify(want)}`}`)
}

/* ------------------------------------------------ service member contracts */

const formDouble = {
  tag: 'form',
  getSnapshot() { return this.tag },
  subscribe() { return () => {} },
  mutate() { return Promise.resolve(true) },
}
const faceDouble = {
  tag: 'face',
  getSnapshot() { return this.tag },
  subscribe() { return () => {} },
  ensure() { return Promise.resolve() },
}
const formsService = {
  tag: 'forms',
  describe() { return { ...faceDouble, tag: `${this.tag}:face` } },
  get(namespace: string) { return { ...formDouble, tag: `${this.tag}:${namespace}` } },
}
type FormsProbe = { describe(): { getSnapshot(): unknown } | undefined; get(ns: string): { getSnapshot(): unknown } | undefined }
check('configForms: 缺 get 时拒绝', configFormsOf({ describe() { return {} } }), undefined)
check('configForms: 非对象拒绝', configFormsOf('configForms'), undefined)
check('configForms: 描述面校验成员后再绑定',
  (configFormsOf(formsService) as unknown as FormsProbe).describe()?.getSnapshot(), 'forms:face')
check('configForms: get 透传命名空间并校验表单',
  (configFormsOf(formsService) as unknown as FormsProbe).get('llm-pi-ai')?.getSnapshot(), 'forms:llm-pi-ai')
check('configForms: 描述面缺 ensure 时返回 undefined',
  (configFormsOf({
    describe() { return { getSnapshot() {}, subscribe() {} } },
    get() { return formDouble },
  }) as unknown as FormsProbe).describe(), undefined)
check('configForms: 表单缺 mutate 时返回 undefined',
  (configFormsOf({
    describe() { return faceDouble },
    get() { return { getSnapshot() {}, subscribe() {} } },
  }) as unknown as FormsProbe).get('llm-pi-ai'), undefined)

check('settingsSchema: 缺 validate 时拒绝', settingsSchemaOf({ rehydrate() {}, nodeAtPath() {} }), undefined)
const schemaServiceLike = { rehydrate() {}, nodeAtPath() {}, validate() { return undefined } }
check('settingsSchema: 三个成员齐备才接受', typeof settingsSchemaOf(schemaServiceLike)?.validate, 'function')

check('llmDirectory: 缺方法时拒绝', llmDirectoryOf({}), undefined)
const llmService = { tag: 'llm', listConfigurableProviders() { return this.tag } }
check('llmDirectory: 保留原接收者',
  (llmDirectoryOf(llmService) as unknown as { listConfigurableProviders(): string }).listConfigurableProviders(), 'llm')

check('modelCatalog: 缺方法时拒绝', modelCatalogOf({}), undefined)
const catalogService = { tag: 'catalog', modelCatalog() { return this.tag } }
check('modelCatalog: 保留原接收者',
  (modelCatalogOf(catalogService) as unknown as { modelCatalog(): string }).modelCatalog(), 'catalog')

/* ------------------------------------------------------------- layer reads */

const layerValue = {
  providers: {
    acme: { models: [{ id: 'alpha', reasoningEfforts: { high: 'a' } }, { id: 'beta' }] },
    gateway: { apiKeyEnv: 'GW_KEY' },
  },
}
check('valueAt 走对象路径', valueAt(layerValue, ['providers', 'gateway', 'apiKeyEnv']), 'GW_KEY')
check('hasPath 区分“键存在”和“值为空”',
  [hasPath(layerValue, ['providers', 'acme', 'models', '1']), hasPath(layerValue, ['providers', 'acme', 'nope'])],
  [true, false])

/* JSON arrays are a legal path axis: an own, in-range element resolves; an
   out-of-range index, a sparse hole, `length`, or an inherited member does not. */
check('valueAt 穿过数组索引读到实际元素',
  valueAt(layerValue, ['providers', 'acme', 'models', '0', 'id']), 'alpha')
check('数组越界既不存在也读不到',
  [hasPath(layerValue, ['providers', 'acme', 'models', '2']), valueAt(layerValue, ['providers', 'acme', 'models', '2'])],
  [false, undefined])
const sparseList: unknown[] = ['a']
sparseList[2] = 'c'
check('稀疏数组的空洞不是存在，真实元素是',
  [hasPath({ list: sparseList }, ['list', '1']), hasPath({ list: sparseList }, ['list', '2'])],
  [false, true])
check('数组 length 不是数据路径',
  hasPath({ list: ['a'] }, ['list', 'length']), false)
check('非规范索引（前导零、负数）不是数组元素',
  [hasPath({ list: ['a'] }, ['list', '00']), hasPath({ list: ['a'] }, ['list', '-1'])],
  [false, false])
check('null 叶存在但值不是对象',
  [hasPath({ a: { b: null } }, ['a', 'b']), valueAt({ a: { b: null } }, ['a', 'b'])],
  [true, null])
const inherited = Object.create({ ghost: 'x' }) as Record<string, unknown>
inherited.real = 1
check('原型链成员不是 JSON 字段，自有属性仍是',
  [hasPath(inherited, ['ghost']), valueAt(inherited, ['ghost']), hasPath(inherited, ['real'])],
  [false, undefined, true])
check('modelsAt 保留真实下标，跳过无 id 的条目',
  modelsAt(layerValue, ['providers', 'acme']).map(model => [model.id, model.index]),
  [['alpha', 0], ['beta', 1]])

/* -------------------------------------------------------------- row plans */

const userLayer = {
  providers: {
    acme: {
      models: [
        { id: 'alpha', reasoningEfforts: { high: 'u-high' } },
        { id: 'dup', reasoningEfforts: { low: 'a' } },
        { id: 'dup', reasoningEfforts: { low: 'b' } },
      ],
    },
    gateway: { modelOverrides: { 'catalog-1': { reasoningEfforts: { max: 'u-max' } } } },
  },
}
const baseLayer = {
  providers: {
    acme: { models: [{ id: 'alpha', reasoningEfforts: { high: 'b-high' } }] },
    gateway: {
      modelOverrides: {
        'catalog-1': { reasoningEfforts: { max: 'b-max' } },
        'catalog-2': { reasoningEfforts: { low: 'b-low' } },
      },
    },
  },
}
const valueLayer = {
  providers: {
    acme: { models: [{ id: 'alpha', reasoningEfforts: { high: 'u-high' } }] },
    gateway: {},
  },
}
const allWritable = () => true

function plan(overrides: Partial<Parameters<typeof planModelRow>[0]> & { id: string }) {
  return planModelRow({
    id: overrides.id,
    name: overrides.id,
    efforts: [],
    settingsPath: ['providers', 'acme'],
    user: userLayer,
    base: baseLayer,
    value: valueLayer,
    catalogIds: new Set<string>(),
    documentWritable: true,
    namespaceReady: true,
    leafWritable: allWritable,
    ...overrides,
  })
}

const alpha = plan({ id: 'alpha' })
check('用户层模型写到自己的 models 叶',
  alpha.path, ['providers', 'acme', 'models', '0', 'reasoningEfforts'])
check('用户层模型按用户值展示', alpha.declaration, { high: 'u-high' })
check('用户层模型的继承值取自 base', alpha.inherited, { high: 'b-high' })
check('重复 id 不可写', plan({ id: 'dup' }).reason, 'duplicate-id')
check('有效层已有 models 列表时不得虚构 override', plan({ id: 'gamma', catalogIds: new Set(['gamma']) }).reason, 'models-list')
check('schema 未确认的叶不可写', plan({ id: 'alpha', leafWritable: () => false }).reason, 'unconfirmed-leaf')
check('命名空间未就绪时只读', plan({ id: 'alpha', namespaceReady: false }).reason, 'namespace-unavailable')
check('文档只读时只读', plan({ id: 'alpha', documentWritable: false }).reason, 'document-readonly')
check('地址不明确时只读', plan({ id: 'alpha', settingsPath: ['providers', 7 as unknown as string] }).reason, 'bad-path')

const overrideUnset = plan({
  id: 'catalog-2',
  settingsPath: ['providers', 'gateway'],
  catalogIds: new Set(['catalog-1', 'catalog-2']),
})
check('合法 override：写入 modelOverrides 叶', overrideUnset.path,
  ['providers', 'gateway', 'modelOverrides', 'catalog-2', 'reasoningEfforts'])
check('未在用户层出现的 override 视为继承（不是值复制）', overrideUnset.declaration, undefined)
check('override 的继承值取自 base 的对应 override', overrideUnset.inherited, { low: 'b-low' })

const overrideSet = plan({
  id: 'catalog-1',
  settingsPath: ['providers', 'gateway'],
  catalogIds: new Set(['catalog-1']),
})
check('用户层存在该 override 时按 presence 展示为显式', overrideSet.declaration, { max: 'u-max' })
check('显式 override 的继承值仍取自 base', overrideSet.inherited, { max: 'b-max' })

check('目录外模型不得使用 override',
  plan({ id: 'stranger', settingsPath: ['providers', 'gateway'] }).reason, 'not-in-catalog')
check('override 叶未确认时只读', plan({
  id: 'catalog-2',
  settingsPath: ['providers', 'gateway'],
  catalogIds: new Set(['catalog-2']),
  leafWritable: () => false,
}).reason, 'unconfirmed-leaf')

/* ------------------------------------------------- host schema leaf proof */

/* The real public serialization: numeric uids and numeric child references.
   The plugin never decodes this envelope; the schema service does. */
const effortsSchema = Schema.dict(Schema.union([Schema.string(), Schema.const(null)]))
const modelSchema = Schema.object({ id: Schema.string(), reasoningEfforts: effortsSchema })
const overrideSchema = Schema.object({ reasoningEfforts: effortsSchema })
const profileSchema = Schema.object({
  models: Schema.array(modelSchema),
  modelOverrides: Schema.dict(overrideSchema),
})
const rootSchema = Schema.object({ providers: Schema.dict(profileSchema) })
const serialized = rootSchema.toJSON() as { uid: unknown }
check('真实 Schema 序列化使用数字 uid（不是字符串引用）', typeof serialized.uid, 'number')

type AnyNode = {
  dict?: Record<string, AnyNode>
  inner?: AnyNode
  type?: string
  [key: string]: unknown
}

function nodeAtPath(root: AnyNode, path: readonly string[]): AnyNode | undefined {
  let current: AnyNode | undefined = root
  for (const step of path) {
    if (current === undefined || current === null) return undefined
    if (current.dict !== undefined && Object.hasOwn(current.dict, step)) {
      current = current.dict[step]
      continue
    }
    if (current.type === 'dict' || current.type === 'array') {
      current = current.inner
      continue
    }
    return undefined
  }
  return current
}

/* A service double that mirrors the documented callbacks over the live Schema;
   the serialized argument is passed through exactly as the Host would. */
const liveSchemaService = {
  rehydrate: (_serialized: unknown) => rootSchema as unknown as AnyNode,
  nodeAtPath: (root: unknown, path: readonly string[]) => nodeAtPath(root as AnyNode, path),
  validate: (node: unknown, draft: unknown) => {
    try {
      Schema.resolve(draft, node as never, {})
      return undefined
    } catch (error) {
      return error instanceof Error ? error.message : String(error)
    }
  },
}
const modelsLeaf = ['providers', 'acme', 'models', '0', 'reasoningEfforts']
check('schema 接受精确的 models 叶', checkLeaf(liveSchemaService, serialized, modelsLeaf, SAMPLE_DECLARATION), 'ok')
check('schema 解析 from 用户映射', checkLeaf(liveSchemaService, serialized, modelsLeaf, { high: 'vendor-high' }), 'ok')
check('不存在的叶判为 missing', checkLeaf(liveSchemaService, serialized, ['providers', 'acme', 'models', '0', 'nope'], SAMPLE_DECLARATION), 'missing')
check('类型不符判为 invalid', checkLeaf(liveSchemaService, serialized, modelsLeaf, { high: 5 }), 'invalid')
check('modelOverrides 叶同样可解析', checkLeaf(
  liveSchemaService, serialized, ['providers', 'gw', 'modelOverrides', 'm1', 'reasoningEfforts'], SAMPLE_DECLARATION,
), 'ok')
check('缺服务时返回 unavailable', checkLeaf(undefined, serialized, modelsLeaf, SAMPLE_DECLARATION), 'unavailable')

/* ------------------------------------------------------- explicit mapping */

/* The candidate set is what the advanced editor renders; it must not shrink
   when a level gets ticked, or the user could never add a second level. */
const levelsOf = (declared: Record<string, string | null>) => initialMappingRows([], declared).map(row => row.level)
const CANONICAL = ['off', 'minimal', 'low', 'medium', 'high', 'xhigh', 'max']
check('空白草稿保留完整候选集合', levelsOf({}), CANONICAL)
check('勾选 low（空 wire）后候选不收缩', levelsOf({ low: '' }), CANONICAL)
check('填写 low 后候选不收缩', levelsOf({ low: 'lo' }), CANONICAL)
check('再勾 high 后候选不收缩', levelsOf({ low: 'lo', high: 'hi' }), CANONICAL)
check('取消 low 后它仍可重新勾选', levelsOf({ high: 'hi' }), CANONICAL)
check('声明只决定勾选状态',
  ['low', 'high'].map(level => {
    const row = initialMappingRows([], { high: 'hi' }).find(candidate => candidate.level === level)
    return [level, row?.enabled, row?.wire]
  }),
  [['low', false, ''], ['high', true, 'hi']])
check('目录档位与既有声明保留原取值',
  initialMappingRows(['high'], { high: ' vendor ', low: 'x' })
    .filter(row => row.level === 'low' || row.level === 'high')
    .map(row => [row.level, row.wire, row.enabled]),
  [['low', 'x', true], ['high', ' vendor ', true]])
check('词汇表外的既有键仍可见，便于清理',
  initialMappingRows([], { turbo: 'x' }).some(row => row.level === 'turbo'), true)
check('只保留 DSH 档位词汇并去重', offeredLevels(['low', 'high', 'low', 'turbo']), ['low', 'high'])

const blankWire = [{ level: 'high', wire: '', enabled: true, offered: true }]
check('清空取值后父级收到的是不完整草稿（不是旧值）', rowsDeclaration(blankWire), { high: '' })
check('不完整草稿被判为无效', mappingValidity(blankWire), { ok: false, reason: 'blank-wire' })
check('只有空白的取值同样无效', mappingValidity([{ level: 'high', wire: '   ', enabled: true, offered: true }]),
  { ok: false, reason: 'blank-wire' })
check('合法取值原样保留，不被裁剪', rowsDeclaration([{ level: 'high', wire: ' x ', enabled: true, offered: true }]),
  { high: ' x ' })
check('合法映射通过', mappingValidity([{ level: 'high', wire: ' x ', enabled: true, offered: true }]), { ok: true })
check('没有 off 以外的档位时无效', mappingValidity([{ level: 'off', wire: '', enabled: true, offered: true }]),
  { ok: false, reason: 'empty' })
check('未勾选任何档位时无效', mappingValidity([]), { ok: false, reason: 'empty' })
check('未知档位无效', mappingValidity([{ level: 'turbo', wire: 'x', enabled: true, offered: true }]),
  { ok: false, reason: 'unknown-level' })

/* ------------------------------------------------------- declaration view */

check('省略 = 继承', declarationState(undefined), { mode: 'inherit', mapping: {}, valid: true })
check('false = 不支持', declarationState(false), { mode: 'disabled', mapping: {}, valid: true })
check('对象 = 显式映射', declarationState({ high: 'vendor-high' }), { mode: 'custom', mapping: { high: 'vendor-high' }, valid: true })
check('declarationOf 保留三种形态', [declarationOf(undefined), declarationOf(false)], [undefined, false])

/* ---------------------------------------------------------- write ops */

check('set 写到精确叶子', reasoningOp(['p', 'models', '1', 'reasoningEfforts'], { high: 'h' }),
  { op: 'set', path: ['p', 'models', '1', 'reasoningEfforts'], value: { high: 'h' } })
check('inherit 用 unset 清回组合层', reasoningOp(['p', 'models', '1', 'reasoningEfforts'], undefined),
  { op: 'unset', path: ['p', 'models', '1', 'reasoningEfforts'] })
check('false 作为值写入', reasoningOp(['p'], false), { op: 'set', path: ['p'], value: false })

/* ------------------------------------------------------ draft lifecycle */

{
  /* Row A: clean → edit captures the revision that is current at that moment. */
  let a = createDraftState(undefined, 4)
  a = draftReducer(a, { type: 'edit', declaration: { high: 'h' }, revision: 4 })
  check('首次编辑捕获当前 revision', a.baseRevision, 4)
  check('编辑后为 dirty 且未过期', [draftDirty(a), draftStale(a, 4)], [true, false])

  const accepted = draftReducer(a, { type: 'write', outcome: { kind: 'accepted' } })
  check('宿主接受后以接受值作为新基线', [draftDirty(accepted), accepted.acknowledgedKey], [false, JSON.stringify({ high: 'h' })])
  const pushed = draftReducer(accepted, { type: 'host', declaration: { high: 'h' }, revision: 5 })
  check('接受后跟随宿主推送并清掉待确认标记',
    [pushed.baseRevision, pushed.acknowledgedKey, pushed.conflict], [5, null, false])

  /* Row B was mounted at revision 4 and never edited; the revision advanced to
     5 because A saved. Editing B must capture 5, not inherit a stale revision. */
  let b = createDraftState(undefined, 4)
  b = draftReducer(b, { type: 'edit', declaration: { low: 'l' }, revision: 5 })
  check('别处保存推进 revision 后，未编辑行首次编辑仍可保存',
    [b.baseRevision, draftStale(b, 5)], [5, false])

  /* A dirty row keeps its text when the Host changes the same target. */
  let c = createDraftState({ high: 'old' }, 4)
  c = draftReducer(c, { type: 'edit', declaration: { high: 'mine' }, revision: 4 })
  c = draftReducer(c, { type: 'host', declaration: { high: 'theirs' }, revision: 5 })
  check('dirty 行遇到同目标推送：保留草稿并标记冲突',
    [c.draft, c.conflict, draftDirty(c)], [{ high: 'mine' }, true, true])

  /* Host normalizes an accepted value: follow it rather than fighting. */
  let d = createDraftState(undefined, 4)
  d = draftReducer(d, { type: 'edit', declaration: { high: 'mine' }, revision: 4 })
  d = draftReducer(d, { type: 'write', outcome: { kind: 'accepted' } })
  d = draftReducer(d, { type: 'host', declaration: { high: 'normalized' }, revision: 5 })
  check('接受后宿主给出归一化值：跟随宿主而非残留草稿',
    [d.draft, d.conflict, d.acknowledgedKey], [{ high: 'normalized' }, false, null])

  /* Refusal and transport failure keep everything the user typed. */
  let e = createDraftState(undefined, 4)
  e = draftReducer(e, { type: 'edit', declaration: { high: 'mine' }, revision: 4 })
  const refused = draftReducer(e, { type: 'write', outcome: { kind: 'refused' } })
  const failed = draftReducer(e, { type: 'write', outcome: { kind: 'failed', message: 'socket closed' } })
  check('宿主拒绝：草稿与 revision 原样保留',
    [refused.draft, refused.baseRevision, draftDirty(refused)], [{ high: 'mine' }, 4, true])
  check('传输失败：草稿与 revision 原样保留',
    [failed.draft, failed.baseRevision, draftDirty(failed)], [{ high: 'mine' }, 4, true])

  /* Reset re-bases on the Host value. */
  const reset = draftReducer(c, { type: 'reset', declaration: { high: 'theirs' }, revision: 5 })
  check('还原后跟随宿主并清掉冲突',
    [reset.draft, reset.conflict, draftDirty(reset), reset.baseRevision], [{ high: 'theirs' }, false, false, 5])
}

/* The exact sequence from the review: a stale baseline must never look clean,
   and a later Host update must not silently adopt itself over a conflicted draft. */
{
  let s = createDraftState({ high: 'A' }, 1)
  s = draftReducer(s, { type: 'edit', declaration: { low: 'B' }, revision: 1 })
  s = draftReducer(s, { type: 'host', declaration: { low: 'C' }, revision: 2 })
  check('Host 推出 C 后进入冲突', s.conflict, true)

  const backToBaseline = draftReducer(s, { type: 'edit', declaration: { high: 'A' }, revision: 2 })
  check('回到旧 baseline 不解除冲突', backToBaseline.conflict, true)
  check('回到旧 baseline 后仍不可保存', draftSaveable(backToBaseline, 2, true), false)

  /* A draft that equals the OLD baseline must not pass the Host's clean gate. */
  const afterHostD = draftReducer(backToBaseline, { type: 'host', declaration: { xhigh: 'D' }, revision: 3 })
  check('第二次 Host 更新不会静默丢弃冲突中的草稿',
    [afterHostD.draft, afterHostD.conflict, afterHostD.baseRevision], [{ high: 'A' }, true, 1])
  check('第二次 Host 更新后仍不可保存', draftSaveable(afterHostD, 3, true), false)

  const editedAfterD = draftReducer(afterHostD, { type: 'edit', declaration: { max: 'E' }, revision: 3 })
  check('冲突下继续编辑仍不可保存', draftSaveable(editedAfterD, 3, true), false)

  const resetToD = draftReducer(editedAfterD, { type: 'reset', declaration: { xhigh: 'D' }, revision: 3 })
  check('明确 reset 到 D/r3 后干净、无冲突、无需保存',
    [draftSaveable(resetToD, 3, true), draftDirty(resetToD), resetToD.conflict, resetToD.baseRevision],
    [false, false, false, 3])

  const afterReset = draftReducer(resetToD, { type: 'edit', declaration: { max: 'E' }, revision: 3 })
  check('reset 到宿主最新值后新编辑可以保存', draftSaveable(afterReset, 3, true), true)

  /* A successful save's own read-back is the same value, not a foreign edit. */
  let own = createDraftState(undefined, 1)
  own = draftReducer(own, { type: 'edit', declaration: { high: 'X' }, revision: 1 })
  own = draftReducer(own, { type: 'write', outcome: { kind: 'accepted' } })
  const readBack = draftReducer(own, { type: 'host', declaration: { high: 'X' }, revision: 2 })
  check('自己保存的 Host 回读不判为外部冲突', [readBack.conflict, draftDirty(readBack)], [false, false])

  /* A live read-back that differs from what was accepted still follows the Host. */
  const normalized = draftReducer(own, { type: 'host', declaration: { high: 'X-normalized' }, revision: 2 })
  check('Host 归一化后的回读跟随宿主而不是残留草稿',
    [normalized.draft, normalized.conflict], [{ high: 'X-normalized' }, false])

  /* An equal-valued Host report can arrive before the write settles: the later
     acceptance must still clear the transient conflict it raised. */
  let sameValue = createDraftState({ high: 'old' }, 1)
  sameValue = draftReducer(sameValue, { type: 'edit', declaration: { high: 'X' }, revision: 1 })
  sameValue = draftReducer(sameValue, { type: 'host', declaration: { high: 'X' }, revision: 2 })
  check('同值 Host 先到：草稿保留并暂标冲突',
    [sameValue.draft, sameValue.conflict], [{ high: 'X' }, true])
  const sameValueAccepted = draftReducer(sameValue, { type: 'write', outcome: { kind: 'accepted' } })
  check('同值 Host → 自身保存成功：不留冲突且草稿成为基线',
    [sameValueAccepted.conflict, sameValueAccepted.acknowledgedKey !== null, draftDirty(sameValueAccepted)],
    [false, true, false])
}

/* ------------------------------------------------------ fallback lifecycle */

{
  const events: string[] = []
  const lifecycle = createFallbackLifecycle(() => events.push('show'), () => events.push('hide'))
  lifecycle.sync('undeclared')
  lifecycle.sync('undeclared')
  check('缺失时只出现一次，重复同步不叠加', events, ['show'])
  lifecycle.sync('declared')
  lifecycle.sync('declared')
  check('slot 出现后撤掉 fallback，且只撤一次', events, ['show', 'hide'])
  lifecycle.sync('undeclared')
  check('slot 再次移除后恢复 fallback', events, ['show', 'hide', 'show'])
  lifecycle.stop()
  lifecycle.sync('undeclared')
  lifecycle.sync('declared')
  check('卸载后既不再显示也不再隐藏（不重建）', events, ['show', 'hide', 'show', 'hide'])
  check('stop 后标记已停止', lifecycle.stopped, true)

  const unknownHost: string[] = []
  const unknownLifecycle = createFallbackLifecycle(() => unknownHost.push('show'), () => unknownHost.push('hide'))
  unknownLifecycle.sync('unknown')
  check('无法查询 slot 的宿主仍提供入口', unknownHost, ['show'])
}

/* ------------------------------------------------------- directory parsing */

check('可配置路由保留宿主给出的地址', configurableProvidersOf([
  { provider: 'acme', displayName: 'Acme', settingsNs: 'llm-pi-ai', settingsPath: ['providers', 'acme'] },
  { provider: 'broken', settingsNs: 'llm-pi-ai' },
  { displayName: 'no id', settingsNs: 'llm-pi-ai', settingsPath: [] },
]), [{ provider: 'acme', displayName: 'Acme', settingsNs: 'llm-pi-ai', settingsPath: ['providers', 'acme'] }])
check('目录读取适配器档位', catalogGroupsOf({
  groups: [{
    id: 'acme', name: 'Acme',
    models: [{ id: 'alpha', name: 'Alpha', reasoning: { efforts: [{ id: 'low' }, { id: 'max', name: 'Max' }] } }],
  }],
}), [{ provider: 'acme', name: 'Acme', models: [{ id: 'alpha', name: 'Alpha', efforts: ['low', 'max'] }] }])
check('坏目录答复印成空，而不是抛错', catalogGroupsOf({ groups: [{ id: 1 }] }), [])

/* --------------------------------------------------------- write result */

void (async () => {
  const accepted = await settleWrite(async () => true)
  const refused = await settleWrite(async () => false)
  const failed = await settleWrite(async () => { throw new Error('socket closed') })
  check('宿主接受', accepted, { kind: 'accepted' })
  check('宿主拒绝（版本冲突/校验失败）不当作成功', refused, { kind: 'refused' })
  check('传输失败带上原文', failed, { kind: 'failed', message: 'socket closed' })

  console.log(`\nmodel-reasoning: ${pass} / ${pass + fail}${fail ? `  —— ${fail} 项不通过` : '  —— 全部通过'}`)
  if (fail > 0) process.exit(1)
})()
