# 0.7.6 交付说明

当前源码与冻结安装包对应 0.7.6：保留已选定的滑块设计，修复模型目录的间接会话依赖、缩放后弹窗定位及宿主滚动容器裁切，并按能力启用可选设置扩展。

已核验官方 npm DSH 0.2.1-alpha.5 的隔离 Host 与真实浏览器，以及社区扩展 rc.2、alpha.2 的 Host 行为；安装范围放宽不代表所有版本均已实测。完整范围和原生/真实模型限制见 [VERIFICATION.md](VERIFICATION.md)。

[0.7.6 Release](https://github.com/Missher12/Missher-DSH-Reasoning-Effort/releases/tag/v0.7.6) 用于分发对应冻结包。Git、Release 和设备安装是独立步骤；各设备应核对所装版本。本机此前安装的 0.7.5-local.16 不会因 Git 推送自动更新。

冻结包 SHA-256：`0bca7e6ed169fc2b69107af9e27c54b18614993f9dc7dd4da48e3ada3642c9c2`。包与运行件摘要见 [GIT_DELIVERY.json](GIT_DELIVERY.json)。

## 历史交付记录

### 0.7.5-local.16 交付说明

本次同步包含该版本源码与匹配冻结包的运行文件，供其他设备安装。原开发工作保持不变。

类型、构建、深浅主题及中英文布局、13项选模用例、新版Host加载与组合通过；受控浏览器结果不替代平台原生验收。

[正式 Release](https://github.com/Missher12/Missher-DSH-Reasoning-Effort/releases/tag/v0.7.5-local.16) 已公开且未标记预发布。本机 Ubuntu 的 Missher Desktop `0.2.1-alpha.2.20261014.1` 已安装此包，文件匹配且插件 active；其他设备请各自更新。完整滑块原生交互与真实模型参数仍需按目标设备和端点验证。

维护目标是合理宿主范围与持续适配最新版；依据模型、设置和 Slots 等真实能力判断。已测版本不是维护上限，当前包的历史精确 Cordis / Schemastery peer 声明仍需如实核对。运行文件和冻结资产未改变；归档内文档是构建时快照，当前交付状态以本页与 Release 为准。

冻结包 SHA-256：`d30788cc92b951bb937c1b2d182193851a97f0185ab1edd0961215b674726e73`。运行件摘要见 [GIT_DELIVERY.json](./GIT_DELIVERY.json)。
