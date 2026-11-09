<div align="center">

<h1>DSH Reasoning Effort · 思考深度</h1>

<p><img src="../docs/images/overview.svg" alt="Reasoning Effort 功能示意" width="100%"></p>

<p>根据模型真实支持的档位，直观调整思考深度。</p>

<p>
  <a href="https://github.com/Missher12/Missher-DSH-Reasoning-Effort/releases/tag/v1.0.3"><img src="https://img.shields.io/badge/%E7%89%88%E6%9C%AC-1.0.3-4D6BFE?style=flat-square" alt="版本: 1.0.3"></a>
  <a href="https://github.com/Missher12/Missher-DSH-Reasoning-Effort"><img src="https://img.shields.io/badge/%E6%96%87%E6%A1%A3-%E4%B8%AD%E6%96%87-4D6BFE?style=flat-square" alt="文档: 中文"></a>
  <a href="https://github.com/Missher12/Missher-DSH-Reasoning-Effort/blob/main/LICENSE"><img src="https://img.shields.io/badge/%E8%AE%B8%E5%8F%AF-MIT-6B7280?style=flat-square" alt="许可: MIT"></a>
</p>

<p><a href="#功能一览">功能一览</a> · <a href="#快速开始">快速开始</a> · <a href="#详细文档">详细文档</a> · <a href="../README.en.md">English</a></p>

</div>

---

<!-- current-source -->
当前开发源码：**1.0.3** · [分支 `main`](https://github.com/Missher12/Missher-DSH-Reasoning-Effort/tree/main)。安装包以实际 Release 为准。
<!-- /current-source -->

## 功能一览

| 能做什么 | 说明 |
| --- | --- |
| **思考滑块** | 把模型已声明的思考档位映射到直观的深度滑块。 |
| **模型选择** | 在对话入口切换模型，选择失败时保留可用状态。 |
| **自定义模型指引** | 查看缺失配置的说明与片段，复制给 Agent 继续配置。 |
| **原生主题** | 支持深浅主题、中英文与滑块配色，遵循减少动态效果设置。 |

<!-- existing-screenshots -->
## 界面示例

<table><tr><td><a href="../docs/images/reasoning-slider-alpha5.png"><img src="../docs/images/reasoning-slider-alpha5.png" alt="思考深度滑块" width="100%"></a></td><td><a href="../docs/images/reasoning-settings-alpha5.png"><img src="../docs/images/reasoning-settings-alpha5.png" alt="通用设置中的思考滑块配色" width="100%"></a></td></tr></table>

<sub>来自项目已有文档；截图版本与验证范围见<a href="../README.md">原始说明</a>，点击可放大。</sub>
<!-- /existing-screenshots -->

## 快速开始

1. 从 [Releases](https://github.com/Missher12/Missher-DSH-Reasoning-Effort/releases/tag/v1.0.3) 下载对应版本的 `.tgz` 安装包。
2. 在 DSH **插件 → 添加插件** 中选择下载的文件，安装并启用；按宿主提示重新加载或正常重启。
3. 打开对话的模型入口；模型声明至少两个可用档位时，可调整思考滑块。

## 使用前了解

- Ultra 等名称表示模型已声明的档位，滑块不会额外赋予模型能力。
- 每模型档位配置使用支持该扩展的宿主行内入口，插件不另设私有模型设置页。

## 详细文档

[项目原说明](../README.md) · [验证记录](../VERIFICATION.md) · [截图来源](../docs/images/README.md) · [许可证](../LICENSE)

原有功能细节、配置、截图与验证记录保留在上述文档中，历史结论按其注明的版本理解。
