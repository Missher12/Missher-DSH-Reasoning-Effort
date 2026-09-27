# Missher 私有定制版

此仓库保存 DSH 会话 `session-f52a5d33-b791-43ed-bbee-896c7cfdcd0a` 最后开发的 `dsh-reasoning-effort` 插件源码。

基于 [HanaAyane/dsh-reasoning-effort](https://github.com/HanaAyane/dsh-reasoning-effort) 0.7.3，保留上游 MIT 许可证、作者归属、README 和发布历史文档。它是独立私有仓库，不能把这里的定制变更当作上游正式版本。包名与版本沿用现有本地插件，未另行发布 npm 包。

定制内容包括粒子主题调色板、真正的紫色主题、独立的原版蓝紫色选项，以及档位和调色板回归测试。Git 仓库仅保存项目文件，不包含 DSH 会话原文、个人配置、登录态、学习状态或依赖目录。

本地检查入口：`node scripts/test.mjs`、`node scripts/check-client-load.mjs`、`node scripts/check-palette-click.mjs`。最后一项需要本机 Chrome 与脚本指定的 React 依赖，缺少时会跳过；其他机器不能将跳过当作浏览器验收通过。
