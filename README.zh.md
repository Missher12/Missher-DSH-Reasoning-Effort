# 中文文档已迁移

[← 桌面端与安装包](https://github.com/Missher12/Missher-DeepseekHarness-Desktop) · [全部插件](https://github.com/Missher12/Missher-DeepseekHarness-Desktop/blob/main/plugins/README.zh.md) · [通用安装指南](https://github.com/Missher12/Missher-DeepseekHarness-Desktop/blob/main/docs/cookbook/install-cordis-plugins.zh.md)

## 新手上手：思考强度

在模型入口调整思考深度，并在同一张模型卡片中设置文本、图片与可用思考档位。

| 你需要知道的事 | 说明 |
| --- | --- |
| 插件包名 | `@missher/dsh-reasoning-effort` |
| 当前源码版本 | `0.7.5-local.14` |
| 装好后在哪里使用 | 对话中的模型入口；设置中的模型卡片与思考滑块配色 |
| 下载 / 源码 | [查看当前源码与包信息](https://github.com/Missher12/Missher-DSH-Reasoning-Effort)（当前源码版本没有对应的正式 Release，勿把旧 Release 当作最新版） |

### 安装、启用与第一次使用

1. 先从[桌面端主页](https://github.com/Missher12/Missher-DeepseekHarness-Desktop)下载适合电脑的应用，完成模型配置。这个仓库是可选插件，不是独立桌面应用。
2. 阅读[通用安装指南](https://github.com/Missher12/Missher-DeepseekHarness-Desktop/blob/main/docs/cookbook/install-cordis-plugins.zh.md)及本页原有安装说明，核对宿主与插件版本。桌面版使用“插件 → 添加插件”；Web/CLI 使用自己的目标配置组，不混用两种安装位置。
3. 安装后按宿主提示启用并重新加载，进入上表列出的入口。更新已有插件前保留配置和数据，不同时启用旧包名与新包名。
4. 先在模型设置声明支持的最高档位，再回到会话拖动滑块。模型档位不足或能力未声明时先检查模型设置。

### 使用前了解这些边界

滑块只提交模型真正支持的档位；不能让不支持图片的模型获得视觉能力。颜色在设置中调整。

如果页面或功能没出现，先检查当前应用版本、插件是否启用以及加载错误。反馈时附版本、复现步骤和已脱敏错误；不要上传 API Key、真实会话、账号 Cookie 或学习数据库。Git 中的代码更新不会自动替换电脑上已安装的插件。

### 继续阅读

下文保留本插件的详细行为、配置、开发和验证说明。跨平台是否实际通过，以对应版本的验证记录为准；桌面安装包能启动，不代表全部插件和外部服务都已验收。

---

中文首页现在位于 [README.md](README.md)。

English documentation: [README.en.md](README.en.md).
