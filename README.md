# dsh-reasoning-effort

[English](README.en.md) · [源码](https://github.com/Missher12/dsh-reasoning-effort) · [反馈](https://github.com/Missher12/dsh-reasoning-effort/issues) · [设计预览源码](design/depth-slider/README.md)

为 DeepSeek Harness 提供模型选择和思考深度滑块。当前公开定制版为 **0.7.5-local.4**，适配 **DSH 0.2.0-rc.1**；其他宿主版本尚未验收。上游来源与 MIT 许可见 [FORK.md](FORK.md)。

- 单层卡片、白色滑块和最高档点阵；配色预设与自定义颜色只在“设置 → 通用设置 → 思考滑块配色”调整。
- 七个显示档位映射到模型实际声明的取值；模型支持的最高值始终在最右侧，选择失败会回退。
- 拖动按帧更新、松手只提交一次。档位及映射提示共用固定高度，切换文字时轨道保持原位。
- 深浅主题、中文与英文、减少动态效果，以及自定义模型档位声明指引。

## 安装与更新

本仓库提交了 Host 和 Client 构建件，可在 DSH 插件管理页添加本仓库的 GitHub 地址并启用。选择你实际使用的 profile；安装完成后按宿主提示重启并刷新界面。源码或安装成功不能代替实际 Loader 与模型验证。

插件包声明 `dsh.bundle.patch`，不需要额外搭配兼容插件。开发构建与打包见 [CONTRIBUTING.md](CONTRIBUTING.md)，界面设计可直接打开 [design/depth-slider/index.html](design/depth-slider/index.html)。设计预览的调色控件仅用于演示，DSH 中的调色入口仍在设置页。

## 档位从哪里来

滑块读取当前模型在 DSH 模型目录中公开的 `reasoning.efforts`。档数、名称和顺序由模型与路由决定，并非固定三档，也不保证不同端点提供相同档位。

模型公开至少两档时显示滑块；不足两档时显示提示。插件提交目录中的档位值，由 DSH 校验和发送，不会绕过模型或部署的能力限制。

## 给任意自定义模型声明档位

这一节与厂商无关，适用于你在 `llm-pi-ai` 里自己声明的任何模型。

**为什么读不到档位**：DSH 的模型目录只报告适配器声明的能力。你自己声明的模型没有目录条目，除非写出 `reasoningEfforts`，否则目录里永远没有档位，滑块也不会出现。

**怎么填**：打开指引面板显示的配置文件（旧版使用 `settings.yaml`，DSH `0.2.0-rc.1` 使用 Profile 的 `cordis.patch.yml`），在 `llm-pi-ai` 的对应模型条目下加 `reasoningEfforts`，并保持原有缩进。键是 DSH 档位，值是端点接受的写法；没写的档位视为不支持：

```yaml
models:
  - id: <你的模型 id>
    reasoningEfforts:
      low: "<端点接受的取值>"
      high: "<端点接受的取值>"
```

**什么时候还要加 `compat`**（与 `reasoningEfforts` 平级，只在端点需要时写）：

| 端点情况 | 加什么 |
| --- | --- |
| 直接用 `reasoning_effort` 表达强度 | 不用写 compat |
| 要先打开思考开关才认强度 | `compat.thinkingFormat`: `"qwen"`（发 `enable_thinking`）/ `"zai"` / `"deepseek"` |
| 不接受 `reasoning_effort` | `compat.supportsReasoningEffort: false` |
| 请求返回 400 `invalid_parameter_error` | `compat.supportsDeveloperRole: false` |
| 回放历史消息报错 | `compat.requiresReasoningContentOnAssistantMessages: true` |
| 模型完全不推理 | `reasoningEfforts: false` |

不写 `compat` 时由适配器按端点地址自行判断：它不认识的地址按标准 OpenAI 处理，认识的厂商端点会自动套用该厂商的格式，所以**猜错格式比不写更糟**。

**怎么验证**：保存后打开模型菜单，滑块出现即成功；滑块出现但请求报错，就按上表逐项排查。插件内置的知识条目只是**快捷方式**，不是必要条件。

## 档位指引（自定义 provider）

DSH 内置路由的档位来自 pi-ai 目录，插件**完全只读、绝不修改**。只有你在 `llm-pi-ai` 配置里自己声明的模型，插件才会给指引：

1. 打开模型菜单。若当前模型是你自定义声明、且目录读不到档位（或声明与知识库不符），菜单里会出现 **查看档位声明指引**；
2. 面板展示建议档位（知识库命中时给出该模型记录的档位，未收录时给出通用模板）、按当前配置文件缩进生成的 YAML、文件路径与条目位置；
3. 按面板提示替换对应的 `- id:` 条目，或把字段块插入该条目；保留其他配置，保存后让 DSH 重新加载。若未生效，重启 Web Host 并刷新页面。

知识库未收录的模型会得到通用的、可直接修改的模板。遇到"端点因 developer 角色拒绝请求"之类的情况，面板会给出警告和对应的 `compat` 开关（例如提示 `supportsDeveloperRole: false`）。

不想自己填、或者填完仍然报错，就点面板旁的 **复制给 Agent**：它会把当前模型的现象与位置（路由、模型 id、实际配置文件路径、条目行、目录读到的档位、知识库建议、端点提示）、你的任务、完整的档位声明规则和一份起始片段合成一篇简报放进剪贴板。直接粘给任意 coding agent，它就能读取目标文件、查端点文档、补全配置并告诉你原因。

<details>
<summary>高级配置：扩展插件知识库</summary>

内置条目只覆盖少数模型，作用仅是省去手填。要补充其他模型，DSH `0.2.0-rc.1` 在 Profile 中已有 `id: reasoning-effort` 条目的 `config` 下添加 `entries`；旧版 RC 则在 `settings.yaml` 的 `dsh-reasoning-effort` 命名空间下添加。下面只展示相对内容，粘贴时保持所在条目的缩进；用户条目优先于内置：

```yaml
entries:
  - id: my-model
    provider: "*"          # provider 路由名，* 通配
    model: "my-model-id"   # 模型 id，* 通配
    note: 说明文字
    efforts:               # 档位名 → 端点实际接受的取值
      low: "low"
      high: "high"
      max: "max"
    # compat:              # 只在端点需要固定格式时才写
    #   thinkingFormat: "qwen"
    #   supportsReasoningEffort: false
```

条目里的 `compat` 会**原样**写进生成的片段，所以只在端点确实需要固定格式时才填：不填时适配器按端点地址自行判断（未识别地址按标准 OpenAI，已识别厂商自动套用该厂商格式），写错格式会覆盖掉这个正确判断；而在不接受该字段的协议上（例如 `anthropic-messages`），粘贴后那条路由会直接解析失败。

注意：插件只提供片段，**不会替你修改任何配置**；内置目录里的档位集合（即使只有一档）也不会被标记——那是上游的刻意数据。

</details>

## 本地思考深度样式

`0.7.5-local.4` 接入用户提供的「思考深度滑块」卡片和八行点阵，最高显示档播放点阵；页面不可见时停止，系统减少动态效果时静止显示。轨道、档位文字和点阵共用设置颜色，选择档位不会变回蓝色。外观只保留单层外框；拖动按帧合并并在松手时提交，最高只支持 high 或 xhigh 的模型拉满后也保留在最右端。配色预设和自定义颜色均位于 **设置 → 通用设置 → 思考滑块配色**，对话中的模型菜单只调整深度。保留原来的真实档位映射和失败回退，不将样例的六档写死到模型能力中。第三方点阵代码许可见 `THIRD-PARTY-LICENSE.txt`。

## 大肥鱼滑块

本地版本默认使用桌面设计的白色滑块；原先明确开启的大肥鱼偏好仍保留。可在此调整：

1. 打开 **设置 → 通用设置**。
2. 找到“外观”下方的 **大肥鱼滑块**。
3. 关闭开关，再回到模型入口。

<img src="assets/readme/settings.webp" alt="DeepSeek Harness 通用设置中的推理强度滑块和大肥鱼滑块开关" width="100%">

大肥鱼只替换按钮外观，不改变档位吸附、键盘控制、点阵特效或模型选择。系统启用“减少动态效果”后会停留在稳定帧。

同一页面中的 **推理强度滑块** 总开关可以临时关闭整个增强控件。关闭后无需卸载，DSH 原生模型选择器会立即恢复。两个开关都只保存在当前浏览器。

## 常见问题

### 安装后看不到滑块

请依次确认：

1. 用 `dsh --version` 确认实际运行版本；插件 `v0.7.3` 面向 DSH `0.2.0-rc.1`。
2. 安装后已经重启 DSH Web Host。
3. **设置 → 通用设置 → 推理强度滑块** 处于启用状态。
4. 当前模型在 DSH 模型目录中公开了至少两档推理强度（未声明的模型见下一条），且部署没有关闭 thinking。

### 模型没有声明档位怎么办

先查看模型菜单中的 **查看档位声明指引**。若需要手动配置，请根据面板给出的实际文件路径和当前模型、端点文档填写对应条目的 `reasoningEfforts` 与 `compat`，不要直接套用其他模型的档位或上下文参数。

知识库只提供参考；实际支持的取值以端点能力为准。保存后若未生效，重启 Web Host 并刷新页面。

### RC 版本仍有问题，如何反馈

请在 [Issue](https://github.com/HanaAyane/dsh-reasoning-effort/issues) 中附上 DSH 版本、插件版本、客户端类型（Web 或桌面封装）、复现步骤，以及相关控制台报错。报告前请隐去令牌和凭据。

### 如何确认插件已经载入

运行：

```powershell
dsh --profile web --dump-config
```

配置中应当出现 `name: dsh-reasoning-effort`。

### 如何卸载

```powershell
dsh plugin --profile web remove dsh-reasoning-effort
```

卸载后重启 DSH Web Host，原生模型选择器会自动恢复。

## 开发与构建

```powershell
pnpm install
pnpm run check
pnpm pack
```

开发环境使用 Node.js `22.19+`（同时满足目标 DSH 的要求）和 `pnpm@11.7.0`。`pnpm run check` 会进行 TypeScript 与国际化校验，并重建 Host 入口、浏览器模块及类型声明。完整交互与颜色约定见 [design/visual-spec.md](design/visual-spec.md)，安全问题请按照 [SECURITY.md](SECURITY.md) 报告。

## 许可证

[MIT](LICENSE) © HanaAyane
