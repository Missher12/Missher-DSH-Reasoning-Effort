# Missher DSH Reasoning Effort

模型选择、按模型已声明能力映射的思考深度滑块，以及自定义模型的档位配置指引。包名：`@missher/dsh-reasoning-effort`；当前正式发布版本为 [`0.7.7`](https://github.com/Missher12/Missher-DSH-Reasoning-Effort/releases/tag/v0.7.7)。

[English](README.en.md) · [桌面端与安装包](https://github.com/Missher12/Missher-DeepseekHarness-Desktop) · [源码](https://github.com/Missher12/Missher-DSH-Reasoning-Effort) · [反馈](https://github.com/Missher12/Missher-DSH-Reasoning-Effort/issues)

## 功能

- 在对话模型入口选择模型、调整思考深度；显示阶梯映射到模型实际声明的档位，选择失败会回退。至少两个可用档位才显示滑块。
- 单层卡片、白色滑块和最高档点阵；保持已选定的八行粒子设计、渐变配色、深浅主题与中英文。颜色仅在“设置 → 通用设置 → 思考滑块配色”调整。减少动态效果时显示稳定帧，页面隐藏时暂停粒子。
- 自定义模型缺失档位或声明与内置参考不符时，显示配置片段及“复制给 Agent”。标题保持完整，复制按钮同宽同高，正文独立滚动，操作区保持可见；极矮窗口将正文与操作一起滚动，标题不参与滚动。窗口缩放时跟随宿主布局重新定位，避免弹窗越出屏幕。
- **每模型推理档位有两个入口，同一份配置**：配套 Missher Desktop 的 Models 模块声明 `settings.models.model-fields` 时，思考模式和最高档位显示在模型卡片右侧，共用该卡片的保存操作。宿主不声明该 slot 时（官方 DSH `0.2.1-rc.4` 即如此），同一套控件改为出现在插件自己的设置页“每模型推理档位”，通过宿主公开的 `configForms` 写回同一份 `reasoningEfforts` 叶节点；slot 之后出现会自动移回行内，不会出现两个入口。高级模式可显式填写端点取值，插件不会按档位名猜取值。插件本身不增加文本/图片能力，也不另存模型目录。

## 宿主要求与验证范围

按实际接口判断兼容性：需要模型目录、会话选模、Slots、Locale 和设置服务。Host 必须提供 `settings.describe`、`settings.prepareDocument`、`llm.resolveModelInfo`；缺失时给出具体诊断。设置命名空间和指引通道按能力启用；通道必须同时具备路由注册和请求校验能力。

DSH peer 保持 `*`；Cordis 支持 `^4.0.4 || ^4.0.5-alpha.1`，Schemastery 支持 `^3.18.4 || ^3.18.5-alpha.1`，React 为 `^18.2.0`。开发 SDK 保持 `0.2.0-rc.2`。版本范围表示安装准入，实际验证范围如下。

| 宿主 | 0.7.6 验证范围 |
| --- | --- |
| 官方 npm DSH `0.2.1-alpha.5` / Cordis `4.0.5` | 隔离 Web profile、实际 Loader、请求校验、只读指引、客户端加载与卸载；真实浏览器检查滑块、复制、配色和宽窄窗口。使用合成模型数据。 |
| Missher 社区扩展 `0.2.0-rc.2` / `0.2.1-alpha.2` | 实际隔离 Host 启动、Loader、指引、请求校验、客户端字节与卸载检查；不等同于原版官方发行包认证。 |
| macOS、Windows 原生桌面及其他宿主版本 | 本次未新增原生验收。历史安装记录及详细边界见 [VERIFICATION.md](VERIFICATION.md)。 |

模型行扩展是可选能力，缺失时等待声明，声明到达或撤销时同步注册和清理，滑块仍可用。本包不包含宿主模块副本。上述验证未向真实模型端点发起推理请求。

`0.7.7` 在 `0.7.6` 之上只增加“宿主不声明 `settings.models.model-fields` 时的设置页入口”，写回的仍是宿主同一份 `reasoningEfforts` 配置：只写精确叶节点并保留其它字段；写入前由宿主公开的 `settingsSchema` 解析该叶并校验取值；用户层重复 id、路径不明确、文档只读或叶不可证时保持只读；内置模型只有在路由未自声明 models 列表、且 id 属于已安装目录时才使用 `modelOverrides`，继承值取自 base 层。

`0.7.7` 已通过类型检查、构建、103 项模型档位行为检查和 29 项配色浏览器检查。官方 npm DSH `0.2.1-rc.4` 的隔离 Web profile 已实际验证设置页、显式映射、无效值禁止保存、保存后重开与刷新、相邻模型保持不变，以及两次宿主修改时的草稿冲突保留；修正后的正常宽度和 390 像素窗口均已测量并查看真实截图。

这是分阶段合并覆盖：最终 CSS 调整后重验受影响的客户端类型、构建、加载与页面布局；103 项逻辑、29 项配色、保存与冲突处理，以及未变的后端、双语文案和前五组逻辑套件复用本候选此前通过的结果，不代表同一轮全量重跑。另有 50 项生命周期检查使用实际 rc.4 Cordis/模块系统/SlotRegistry 和候选插件工厂，但声明变化与非 slot 服务为受控夹具，不等于社区宿主行内保存的端到端验收。

**0.7.7 已正式发布。**上述使用合成模型的 Web 验证不等于原生 Electron、macOS、Windows 或真实模型端点验收；上表保留独立的 0.7.6 历史范围。失败记录、复用来源与限制见 [VERIFICATION.md](VERIFICATION.md)。

## 界面

`0.7.7` 每模型设置页：下图为官方 DSH `0.2.1-rc.4` 隔离 Web profile 的实际页面，使用合成模型和设置；不是原生 Electron 截图。

![每模型推理档位设置页（官方 rc.4 Web，合成模型）](docs/images/reasoning-model-settings-rc4.png)

下方两张 0.7.6 历史截图来自官方 DSH `0.2.1-alpha.5` 隔离 Web profile，同样使用合成模型和设置。三张图的来源与范围见 [截图说明](docs/images/README.md)。

![思考深度滑块](docs/images/reasoning-slider-alpha5.png)

![通用设置中的思考滑块配色](docs/images/reasoning-settings-alpha5.png)

## 固定版本安装

本插件通过 [GitHub Releases](https://github.com/Missher12/Missher-DSH-Reasoning-Effort/releases) 的构建后 tarball 分发，**未发布同名 npm 包**。选择目标版本的资产及同次发布的 SHA256 校验文件；以下示例固定为 `0.7.6`。

**桌面端：**在“插件 → 添加插件”填写以下固定地址，核对版本、启用状态和加载错误，然后按宿主提示重新加载或重启。Desktop 的配置由桌面插件管理器维护，不用独立 CLI 的 `web` profile 代替。

```text
https://github.com/Missher12/Missher-DSH-Reasoning-Effort/releases/download/v0.7.7/missher-dsh-reasoning-effort-0.7.7.tgz
```

**独立 Web/CLI profile：**已安装 DSH CLI 的用户可运行：

```sh
dsh plugin --profile web add https://github.com/Missher12/Missher-DSH-Reasoning-Effort/releases/download/v0.7.7/missher-dsh-reasoning-effort-0.7.7.tgz
dsh --profile web --dump-config
```

将 `web` 换成自己实际使用的 Web/CLI profile。配置应包含 `id: reasoning-effort`、`name: '@missher/dsh-reasoning-effort'`；仅出现在配置中不代表 Loader 已激活。然后启动或重启该 profile，打开对话模型入口检查。不要同时启用旧上游包与本定制包，它们使用相同的指引通道和设置键。

更新前保留旧 tarball 和当前 profile 配置。tarball 是固定快照，Git 拉取不会自动更新日常安装。

## 使用与模型能力

滑块读取模型目录的 `reasoning.efforts`。最高支持档位、默认档位与当前会话选中档位各有含义；显示为 Ultra 或最高点阵不会产生额外能力。降低再提高模型配置上限不会丢失草稿中已有映射，稀疏档位保留端点实际值，无法识别映射时保持自动模式。

自定义模型缺失声明时，打开“查看档位声明指引”，根据当前配置文件路径及端点文档，编辑 `llm-pi-ai` 的对应模型条目，例如：

```yaml
reasoningEfforts:
  low: "<端点接受的较低强度值>"
  high: "<端点接受的较高强度值>"
```

未列出的档位不声明为可选。`reasoningEfforts: false` 表示不提供可选强度档位，不能保证端点内部完全不思考。对既有目录模型的单项覆盖使用 `modelOverrides`；不要无意用非空 `models` 列表替换整个提供方目录。

仅在端点文档或具体错误支持时添加 `compat`，如 `thinkingFormat`、`supportsReasoningEffort`、`supportsDeveloperRole` 或 `requiresReasoningContentOnAssistantMessages`。内置知识条目仅供参考，不是供应商承诺。滑块出现只证明目录与界面识别成功；请求参数是否被服务端接受仍需验证。

“复制给 Agent”将当前模型标识、实际配置路径、诊断与建议片段放入剪贴板，不会自动调用其他 Agent 或提交修改。Host 指引只读；模型行编辑须使用宿主原有保存操作。可通过插件配置 `entries` 补充自己的知识条目，详见 [中文配置教程](src/client/agent-tutorial.zh.md)及 [Host 配置定义](src/index.ts)。

## 启停、卸载与数据保留

- 临时恢复原生模型选择器：关闭“设置 → 通用设置 → 推理强度滑块”。该开关只控制滑块入口；停用整个插件请在插件管理器禁用对应 Bundle。
- 桌面端通过同一插件管理器卸载 `@missher/dsh-reasoning-effort`；Web/CLI profile 使用下面的准确包名，再重启或刷新宿主。

```sh
dsh plugin --profile web remove @missher/dsh-reasoning-effort
```

插件没有聊天或学习数据库。卸载不主动删除宿主的会话、凭据、模型声明或其他插件数据；已保存的模型设置仍属于宿主。插件不主动清除浏览器偏好 `dsh-reasoning-effort.enabled`、`dsh-reasoning-effort.palette`（兼容读取旧 enabled 键），停用后重启可恢复原生入口。自定义 `entries` 和 profile 覆盖在卸载前自行备份；是否清理由宿主卸载流程决定，不要为重置外观删除整个 profile。

## 开发与许可

使用 Node.js `22.19+`、pnpm `11.7.0`；在隔离目录构建，顺序执行 `pnpm install --frozen-lockfile`、`pnpm run check`、`pnpm test`、`pnpm pack`。测试套件串行执行。具体见 [CONTRIBUTING.md](CONTRIBUTING.md)，验证分层见 [VERIFICATION.md](VERIFICATION.md)，安全反馈见 [SECURITY.md](SECURITY.md)。[设计预览](design/depth-slider/README.md)的控件仅用于演示，日常颜色入口仍在设置页。

基于 HanaAyane 的上游 `dsh-reasoning-effort`，保留 [MIT 许可证](LICENSE)与作者署名；点阵引擎改编自 MEMZ-鱼子酱的设计并保留其 [MIT 声明](THIRD-PARTY-LICENSE.txt)。来源和定制边界见 [FORK.md](FORK.md)。
