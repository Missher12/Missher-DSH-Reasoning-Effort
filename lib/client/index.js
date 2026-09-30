window.__ModuleLoader__.load({
  id: "@missher/dsh-reasoning-effort",
  factory: (require) => {
    var module = { exports: {} };
    var exports = module.exports;
"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/client/index.tsx
var index_exports = {};
__export(index_exports, {
  apply: () => apply,
  inject: () => inject
});
module.exports = __toCommonJS(index_exports);
var import_react = require("react");

// src/client/locales.ts
var NS = "reasoning-effort";
var zh = {
  /* 本地改动（相对上游 0.7.3）：档位名照参考图（Codex 的档位表）的写法，首字母大写 ——
     Off / Minimal / Low / Medium / High / XHigh / Max。
     顶档一律显示 level.ultra（= Ultra），而它**实际发出去的是该模型公开的最高档 id**
     （DeepSeek 上就是 max）—— 显示名与实际发送值刻意解耦，改显示不影响行为。
     界面其余文案仍是中文，只有档位名一律英文。
     这些名字同时供诊断面板和 displayLevelName() 使用。 */
  "level.off": "Off",
  "level.minimal": "Minimal",
  "level.low": "Low",
  "level.medium": "Medium",
  "level.high": "High",
  "level.xhigh": "XHigh",
  "level.max": "Max",
  "level.ultra": "Ultra",
  "level.none": "None",
  "palette.upstream": "\u4E0A\u6E38\u539F\u6837\uFF08\u84DD\u7D2B\uFF09",
  "palette.violet": "\u7D2B",
  "palette.ice": "\u51B0\u84DD",
  "palette.cyan": "\u9752\u78A7",
  "palette.green": "\u7FE0\u7EFF",
  "palette.amber": "\u6A59\u91D1",
  "palette.rose": "\u54C1\u7EA2",
  "effort.invalid": "{effort}\uFF08\u5DF2\u5931\u6548\uFF09",
  "effort.reselect": "\u5F53\u524D\u6863\u4F4D {effort} \u5DF2\u4E0D\u53D7\u652F\u6301\uFF0C\u8BF7\u91CD\u65B0\u9009\u62E9\uFF1B\u539F\u9009\u62E9\u5C1A\u672A\u66F4\u6539\u3002",
  "effort.use": "\u9009\u62E9 {effort}",
  "effort.label": "\u601D\u8003\u6DF1\u5EA6",
  "effort.faster": "Faster",
  "effort.smarter": "Smarter",
  "settings.palette.custom": "\u81EA\u5B9A\u4E49\u989C\u8272",
  "effort.title": "\u63A8\u7406\u5F3A\u5EA6 \xB7 {effort}",
  "effort.failed": "\u63A8\u7406\u5F3A\u5EA6\u8BBE\u7F6E\u5931\u8D25\uFF1A{error}",
  "effort.unavailable": "\u5F53\u524D\u6A21\u578B\u672A\u63D0\u4F9B\u63A8\u7406\u5F3A\u5EA6\u6863\u4F4D",
  "model.defaultEffort": "\u9ED8\u8BA4",
  "model.select": "\u9009\u62E9\u6A21\u578B",
  "model.aria": "\u6A21\u578B {model}\uFF0C\u63A8\u7406\u5F3A\u5EA6 {effort}",
  "model.menuAria": "\u6A21\u578B\u4E0E\u63A8\u7406\u5F3A\u5EA6",
  "model.loading": "\u6B63\u5728\u52A0\u8F7D\u6A21\u578B\u2026",
  "model.none": "\u6CA1\u6709\u53EF\u7528\u6A21\u578B",
  "guidance.mismatch": "\u6863\u4F4D\u58F0\u660E\u4E0E\u77E5\u8BC6\u5E93\u4E0D\u4E00\u81F4",
  "guidance.matched": "\u77E5\u8BC6\u5E93\u8BB0\u5F55\u8BE5\u6A21\u578B\u652F\u6301 {expected}\uFF0C\u76EE\u5F55\u5F53\u524D\u4E3A {current}\u3002{note}",
  "guidance.unmatched": "\u76EE\u5F55\u5F53\u524D\u4E3A {current}\u3002{note}",
  "guidance.paste": "\u8981\u7C98\u8D34\u7684\u5185\u5BB9",
  "guidance.step1.open": "1. \u6253\u5F00 ",
  "guidance.step1.path": "\uFF08{path}\uFF09",
  "guidance.step1.find": "\uFF0C\u5728 ",
  "guidance.step1.list": " \u5217\u8868\u91CC\u627E\u5230 ",
  "guidance.step1.end": "\uFF1B",
  "guidance.step2.replacePrefix": "2. \u628A\u539F\u6709 ",
  "guidance.step2.replaceSuffix": " \u6761\u76EE\u6574\u4F53\u66FF\u6362\u4E3A\u590D\u5236\u7684\u5185\u5BB9\uFF0C\u4FDD\u7559\u5176\u4ED6\u914D\u7F6E\uFF1B",
  "guidance.step2.insertPrefix": "2. \u8BE5\u884C\u672B\u5C3E\u56DE\u8F66\uFF0C\u7C98\u8D34\u4E0A\u9762\u590D\u5236\u7684\u5185\u5BB9\uFF08\u7F29\u8FDB\u4E0E ",
  "guidance.step2.insertSuffix": " \u5DEE 2 \u4E2A\u7A7A\u683C\uFF09\uFF1B",
  "guidance.step3": "3. \u4FDD\u5B58\u540E\u81EA\u52A8\u751F\u6548\uFF1B\u6ED1\u5757\u672A\u51FA\u73B0\u5219\u91CD\u542F Web Host \u5E76\u5237\u65B0\u9875\u9762\u3002",
  "guidance.copied": "\u5DF2\u590D\u5236 \u2713",
  "guidance.copy": "\u590D\u5236\u5B57\u6BB5\u5757",
  "guidance.collapse": "\u6536\u8D77",
  "guidance.checking": "\u68C0\u6D4B\u4E2D\u2026",
  "guidance.open": "\u67E5\u770B\u6863\u4F4D\u58F0\u660E\u6307\u5F15",
  "guidance.unavailable": "\u6863\u4F4D\u6307\u5F15\u4E0D\u53EF\u7528\uFF1A\u4E0E Host \u7684 RPC \u901A\u9053\u6CA1\u6709\u5EFA\u7ACB\uFF0C\u65E0\u6CD5\u8BCA\u65AD\u5F53\u524D\u6A21\u578B\uFF08Host \u534A\u672A\u6CE8\u518C\u901A\u9053\u6216\u8FDE\u63A5\u5DF2\u65AD\u5F00\uFF09\u3002",
  "guidance.howto": "\u6309\u7AEF\u70B9\u7684\u5B9E\u9645\u60C5\u51B5\u586B\uFF1A\u952E\u662F DSH \u6863\u4F4D\uFF08off / minimal / low / medium / high / xhigh / max\uFF09\uFF0C\u503C\u662F\u7AEF\u70B9\u81EA\u5DF1\u63A5\u53D7\u7684\u5199\u6CD5\uFF1B\u6CA1\u5199\u7684\u6863\u4F4D\u89C6\u4E3A\u4E0D\u652F\u6301\u3002\u7AEF\u70B9\u6587\u6863\u6216\u5B83\u7684\u6A21\u578B\u5217\u8868\u901A\u5E38\u4F1A\u5217\u51FA\u63A5\u53D7\u7684\u53D6\u503C\u3002",
  "guidance.switch.intro": "\u53EA\u5728\u7AEF\u70B9\u9700\u8981\u65F6\u624D\u5199 compat\uFF08\u4E0E reasoningEfforts \u5E73\u7EA7\uFF09\uFF1A",
  "guidance.switch.thinkingFormat": '\u7AEF\u70B9\u8981\u5148\u5F00\u601D\u8003\u5F00\u5173\u624D\u8BA4\u5F3A\u5EA6 \u2192 thinkingFormat: "qwen"\uFF08\u53D1 enable_thinking\uFF09/ "zai" / "deepseek"',
  "guidance.switch.reasoningEffort": "\u7AEF\u70B9\u4E0D\u63A5\u53D7 reasoning_effort \u2192 supportsReasoningEffort: false",
  "guidance.switch.developerRole": "\u8BF7\u6C42\u8FD4\u56DE 400 invalid_parameter_error \u2192 supportsDeveloperRole: false",
  "guidance.switch.replay": "\u56DE\u653E\u5386\u53F2\u6D88\u606F\u62A5\u9519 \u2192 requiresReasoningContentOnAssistantMessages: true",
  "agent.copy": "\u590D\u5236\u7ED9 Agent",
  "agent.intro": "\u8BF7\u5E2E\u6211\u6392\u67E5\u5E76\u8865\u5168\u8FD9\u4E2A\u6A21\u578B\u7684\u63A8\u7406\u5F3A\u5EA6\u6863\u4F4D\u58F0\u660E\u3002\u4E0B\u9762\u7684\u73B0\u8C61\u3001\u89C4\u5219\u548C\u7247\u6BB5\u90FD\u6765\u81EA\u5F53\u524D DSH \u4F1A\u8BDD\uFF0C\u8BF7\u6309\u89C4\u5219\u4FEE\u6539\u6240\u5217\u7684\u914D\u7F6E\u6587\u4EF6\u3002",
  "agent.factsHeading": "## \u73B0\u8C61\u4E0E\u4F4D\u7F6E",
  "agent.facts": "- \u8DEF\u7531\uFF08provider\uFF09\uFF1A{provider}\n- \u6A21\u578B id\uFF1A{model}\n- \u914D\u7F6E\u6587\u4EF6\uFF1A{path}\n- \u6761\u76EE\u4F4D\u7F6E\uFF1A{entryPath}\n- \u6761\u76EE\u884C\uFF1A{entryLine}\n- \u76EE\u5F55\u5F53\u524D\u8BFB\u5230\u7684\u6863\u4F4D\uFF1A{current}\n- \u77E5\u8BC6\u5E93\u5EFA\u8BAE\u6863\u4F4D\uFF1A{expected}",
  "agent.warningLine": "- \u7AEF\u70B9\u63D0\u793A\uFF1A{warning}",
  "agent.task": "## \u4F60\u8981\u505A\u7684\n1. \u8BFB\u8BE5 models \u6761\u76EE\uFF0C\u4EE5\u53CA\u5B83\u6240\u5728\u8DEF\u7531\u7684 api \u4E0E baseURL\u3002\n2. \u5F04\u6E05\u7AEF\u70B9\u771F\u6B63\u63A5\u53D7\u54EA\u4E9B\u6863\u4F4D\u53D6\u503C\u3001\u7528\u4EC0\u4E48\u65B9\u5F0F\u5F00\u5173\u601D\u8003\uFF08\u67E5\u7AEF\u70B9\u6587\u6863\u6216\u95EE\u7528\u6237\uFF0C\u4E0D\u8981\u731C\uFF09\u3002\n3. \u628A reasoningEfforts\uFF08\u5FC5\u8981\u65F6\u52A0 compat\uFF09\u5199\u8FDB\u90A3\u6761 model \u6761\u76EE\uFF0C\u5176\u5B83\u5B57\u6BB5\u4FDD\u6301\u4E0D\u52A8\u3002\n4. \u8BA9\u7528\u6237\u5237\u65B0\u9875\u9762\u786E\u8BA4\u6ED1\u5757\u51FA\u73B0\uFF1B\u82E5\u8BF7\u6C42\u62A5\u9519\uFF0C\u6309\u4E0B\u9762\u7684\u89C4\u5219\u6392\u67E5\uFF0C\u5E76\u628A\u539F\u56E0\u544A\u8BC9\u7528\u6237\u3002",
  "agent.snippetHeading": "\u5EFA\u8BAE\u7247\u6BB5\uFF08\u8D77\u70B9\uFF0C\u4E0D\u5BF9\u5C31\u6309\u89C4\u5219\u4FEE\u6B63\uFF09",
  "knowledge.glm52": "GLM-5.2 \u539F\u751F\u6863\u4F4D minimal / low / medium / high\uFF08\u667A\u8C31 z.ai \u6DF1\u5EA6\u601D\u8003\u6587\u6863\uFF09\uFF1B\u963F\u91CC\u4E91\u767E\u70BC OpenAI \u517C\u5BB9\u7AEF\u70B9\u5B9E\u6D4B\u63A5\u53D7\u8FD9\u4E9B\u53D6\u503C\u3002",
  "knowledge.kimiK3": "Kimi K3 \u5B98\u65B9\u6863\u4F4D low / high / max\uFF08Moonshot \u601D\u8003\u529B\u5EA6\u6587\u6863\uFF09\uFF0C\u4E0E pi-ai \u76EE\u5F55 moonshotai \u6761\u76EE\u4E00\u81F4\u3002",
  "knowledge.unknown": "\u77E5\u8BC6\u5E93\u6CA1\u6709\u6536\u5F55\u8FD9\u4E2A\u6A21\u578B\uFF0C\u4E0B\u9762\u662F\u53EF\u76F4\u63A5\u4FEE\u6539\u7684\u901A\u7528\u6A21\u677F\u3002",
  "warning.developerRole": "\u8FD9\u4E2A\u8DEF\u7531\u7684\u7AEF\u70B9\u662F OpenAI \u517C\u5BB9\u7F51\u5173\uFF1Api-ai \u4F1A\u628A\u5B83\u5F53\u6210\u6807\u51C6 OpenAI\uFF0C\u5BF9\u542F\u7528\u4E86\u63A8\u7406\u7684\u6A21\u578B\u7528 developer \u89D2\u8272\u53D1\u9001\u7CFB\u7EDF\u63D0\u793A\uFF0C\u90E8\u5206\u7F51\u5173\u4F1A\u4EE5 400\uFF08invalid_parameter_error\uFF09\u62D2\u7EDD\u3002\u7ED9\u8BE5\u8DEF\u7531\u52A0 compat.supportsDeveloperRole: false \u5373\u53EF\u6539\u53D1 system\u3002",
  "yaml.keyComment": "\u952E = DSH \u6863\u4F4D\u4F53\u7CFB\uFF08off/minimal/low/medium/high/xhigh/max\uFF09",
  "yaml.valueComment": "\u503C = \u7AEF\u70B9\u81EA\u5DF1\u7684\u5199\u6CD5\uFF1B\u6CA1\u5199\u7684\u6863\u4F4D\u89C6\u4E3A\u4E0D\u652F\u6301",
  "yaml.compatComment": "\u7AEF\u70B9\u9700\u8981\u65F6\u624D\u52A0 compat\uFF08\u89C1\u4E0A\u9762\u7684\u5F00\u5173\u8BF4\u660E\uFF09\uFF0C\u4F8B\u5982\uFF1A",
  "settings.effort.title": "\u63A8\u7406\u5F3A\u5EA6\u6ED1\u5757",
  "settings.effort.description": "\u5728\u6A21\u578B\u83DC\u5355\u4E2D\u663E\u793A\u601D\u8003\u6DF1\u5EA6\u6ED1\u5757\u548C\u52A8\u6001\u70B9\u9635\uFF0C\u6863\u4F4D\u968F\u5F53\u524D\u6A21\u578B\u81EA\u52A8\u9002\u914D",
  "settings.effort.aria": "\u542F\u7528\u63A8\u7406\u5F3A\u5EA6\u6ED1\u5757",
  "settings.palette.title": "\u601D\u8003\u6ED1\u5757\u914D\u8272",
  "settings.palette.description": "\u5728\u8BBE\u7F6E\u4E2D\u7EDF\u4E00\u8C03\u6574\u6ED1\u8F68\u3001\u70B9\u9635\u548C\u6863\u4F4D\u6587\u5B57\u7684\u989C\u8272\u3002",
  "settings.palette.aria": "\u9009\u62E9\u601D\u8003\u6ED1\u5757\u914D\u8272",
  "settings.enabled": "\u542F\u7528",
  "settings.disabled": "\u505C\u7528"
};
var en = {
  "effort.invalid": "{effort} (unavailable)",
  "effort.reselect": "Effort {effort} is no longer supported. Choose again; the saved selection has not changed.",
  "effort.use": "Select {effort}",
  /* English uses the same labels; only the surrounding copy differs. */
  "level.off": "Off",
  "level.minimal": "Minimal",
  "level.low": "Low",
  "level.medium": "Medium",
  "level.high": "High",
  "level.xhigh": "XHigh",
  "level.max": "Max",
  "level.ultra": "Ultra",
  "level.none": "None",
  "palette.upstream": "Upstream (blue-violet)",
  "palette.violet": "Violet",
  "palette.ice": "Ice blue",
  "palette.cyan": "Teal",
  "palette.green": "Green",
  "palette.amber": "Amber",
  "palette.rose": "Rose",
  "effort.label": "Thinking depth",
  "effort.faster": "Faster",
  "effort.smarter": "Smarter",
  "settings.palette.custom": "Custom colour",
  "effort.title": "Reasoning effort \xB7 {effort}",
  "effort.failed": "Failed to set reasoning effort: {error}",
  "effort.unavailable": "The current model does not provide reasoning-effort levels",
  "model.defaultEffort": "Default",
  "model.select": "Select model",
  "model.aria": "Model {model}, reasoning effort {effort}",
  "model.menuAria": "Model and reasoning effort",
  "model.loading": "Loading models\u2026",
  "model.none": "No models available",
  "guidance.mismatch": "Level declaration does not match the knowledge base",
  "guidance.matched": "The knowledge base records this model as supporting {expected}, but the directory currently shows {current}. {note}",
  "guidance.unmatched": "The directory currently shows {current}. {note}",
  "guidance.paste": "Content to paste",
  "guidance.step1.open": "1. Open ",
  "guidance.step1.path": " ({path})",
  "guidance.step1.find": "; in ",
  "guidance.step1.list": ", find ",
  "guidance.step1.end": ".",
  "guidance.step2.replacePrefix": "2. Replace the existing ",
  "guidance.step2.replaceSuffix": " entry with the copied content; preserve other configuration.",
  "guidance.step2.insertPrefix": "2. Press Enter at the end of that line and paste the copied content (indent the pasted block 2 spaces beyond ",
  "guidance.step2.insertSuffix": ").",
  "guidance.step3": "3. Takes effect automatically after saving; if the slider does not appear, restart the Web Host and refresh the page.",
  "guidance.copied": "Copied \u2713",
  "guidance.copy": "Copy field block",
  "guidance.collapse": "Collapse",
  "guidance.checking": "Checking\u2026",
  "guidance.open": "View level declaration guidance",
  "guidance.unavailable": "Level guidance is unavailable: no RPC channel to the Host, so this model cannot be diagnosed (the Host half registered no channel, or the connection dropped).",
  "guidance.howto": "Fill this in from what the endpoint actually accepts: each key is a DSH level (off / minimal / low / medium / high / xhigh / max) and each value is the spelling that endpoint uses; a level you leave out counts as unsupported. The endpoint documentation or its model listing usually names the values it takes.",
  "guidance.switch.intro": "Write compat (beside reasoningEfforts) only when the endpoint needs it:",
  "guidance.switch.thinkingFormat": 'the endpoint needs its thinking switch turned on before it accepts an effort \u2192 thinkingFormat: "qwen" (sends enable_thinking) / "zai" / "deepseek"',
  "guidance.switch.reasoningEffort": "the endpoint does not accept reasoning_effort \u2192 supportsReasoningEffort: false",
  "guidance.switch.developerRole": "a request fails with 400 invalid_parameter_error \u2192 supportsDeveloperRole: false",
  "guidance.switch.replay": "replaying history fails \u2192 requiresReasoningContentOnAssistantMessages: true",
  "agent.copy": "Copy for your agent",
  "agent.intro": "Help me diagnose and complete the reasoning-effort declaration for this model. The facts, rules, and snippet below all come from the current DSH session; apply the rules to the configuration file listed below.",
  "agent.factsHeading": "## What I see",
  "agent.facts": "- route (provider): {provider}\n- model id: {model}\n- configuration file: {path}\n- entry location: {entryPath}\n- entry line: {entryLine}\n- levels the directory reads now: {current}\n- levels the knowledge base suggests: {expected}",
  "agent.warningLine": "- endpoint caveat: {warning}",
  "agent.task": "## What to do\n1. Read that models entry, together with the api and baseURL of the route it lives on.\n2. Establish which effort values the endpoint really accepts and how it toggles thinking (endpoint documentation, or ask me \u2014 do not guess).\n3. Write reasoningEfforts (plus compat when needed) into that model entry and leave every other field alone.\n4. Ask me to refresh the page and confirm the slider appears; if a request fails, work through the rules below and tell me what was wrong.",
  "agent.snippetHeading": "Suggested snippet (a starting point \u2014 correct it with the rules)",
  "knowledge.glm52": "GLM-5.2 native levels minimal / low / medium / high (Zhipu z.ai deep-thinking docs); the Aliyun Bailian OpenAI-compatible endpoint accepts these values in practice.",
  "knowledge.kimiK3": "Kimi K3 official levels low / high / max (Moonshot thinking-effort docs), consistent with the pi-ai catalog moonshotai entry.",
  "knowledge.unknown": "The knowledge base does not list this model; the template below is ready to edit.",
  "warning.developerRole": "This route is an OpenAI-compatible gateway: pi-ai treats it as standard OpenAI and sends the system prompt with the developer role for models with reasoning enabled, which some gateways reject with a 400 (invalid_parameter_error). Add compat.supportsDeveloperRole: false to the route to send system instead.",
  "yaml.keyComment": "key = DSH level system (off/minimal/low/medium/high/xhigh/max)",
  "yaml.valueComment": "value = the spelling that endpoint uses; a level you leave out counts as unsupported",
  "yaml.compatComment": "Add compat only when the endpoint needs it (see the switches above), for example:",
  "settings.effort.title": "Reasoning effort slider",
  "settings.effort.description": "Show the thinking-depth slider and animated pixel field in the model menu; levels adapt to the current model automatically",
  "settings.effort.aria": "Enable reasoning effort slider",
  "settings.palette.title": "Thinking slider colour",
  "settings.palette.description": "Change the track, pixel field, and effort label together from settings.",
  "settings.palette.aria": "Choose the thinking slider colour",
  "settings.enabled": "Enabled",
  "settings.disabled": "Disabled"
};

// src/client/styles.ts
var CSS = `
.re-effort {
  display: flex;
  align-items: center;
  width: 100%;
  min-width: 0;
  height: 32px;
  color: var(--dsw-alias-label-secondary);
  user-select: none;
  box-sizing: border-box;
}
.re-effort-slider {
  --re-progress: 50%;
  position: relative;
  width: 100%;
  height: 30px;
  flex: 1 1 auto;
  border-radius: 999px;
  isolation: isolate;
  transition: filter 180ms ease;
}
.re-effort-track {
  position: absolute;
  inset: 0;
  overflow: hidden;
  border-radius: inherit;
  background: linear-gradient(100deg, #03040a 0%, #071126 22%, #101d4c 45%, #302262 70%, #5d35a0 100%);
  box-shadow:
    inset 0 1px 0 rgba(189, 199, 255, .15),
    inset 0 -1px 0 rgba(0, 0, 0, .55),
    0 3px 10px rgba(12, 17, 55, .34);
}
.re-effort-track::after {
  content: "";
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 18% 45%, rgba(82, 130, 255, .12), transparent 24%),
    linear-gradient(90deg, rgba(0, 0, 0, .28), transparent 42%, rgba(168, 113, 255, .12));
  pointer-events: none;
}
.re-effort-fx {
  position: absolute;
  z-index: 1;
  inset: 0;
  overflow: hidden;
  border-radius: inherit;
  pointer-events: none;
}
.re-effort-canvas {
  position: absolute;
  z-index: 2;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 1;
  image-rendering: pixelated;
  mix-blend-mode: screen;
  transition: filter 140ms ease;
}
.re-effort-flare {
  position: absolute;
  z-index: 3;
  top: 50%;
  left: var(--re-progress);
  width: 78px;
  height: 46px;
  border-radius: 50%;
  background: radial-gradient(ellipse at 100% 50%, rgba(255,255,255,.96) 0 4%, rgba(188,189,255,.8) 11%, rgba(106,87,255,.5) 28%, rgba(105,31,255,.2) 49%, transparent 74%);
  filter: blur(2px) saturate(1.25);
  mix-blend-mode: screen;
  transform: translate(-100%, -50%);
  transition: left 70ms linear, filter 140ms ease;
  pointer-events: none;
}
.re-effort-flare::before,
.re-effort-flare::after {
  content: "";
  position: absolute;
  inset: 50% auto auto 100%;
  border-radius: 999px;
  transform: translate(-50%, -50%);
}
.re-effort-flare::before {
  width: 52px;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(100,160,255,.42), #f1ecff, rgba(193,82,255,.65), transparent);
  box-shadow: 0 0 7px #9b7cff, 0 0 13px rgba(72,132,255,.64);
}
.re-effort-flare::after {
  width: 1px;
  height: 20px;
  background: linear-gradient(180deg, transparent, rgba(196,190,255,.84), transparent);
  box-shadow: 0 0 7px #9c7cff;
}
.re-effort-knob {
  position: absolute;
  z-index: 4;
  top: 50%;
  left: clamp(14px, var(--re-progress), calc(100% - 14px));
  width: 28px;
  height: 28px;
  border: 1px solid rgba(255,255,255,.94);
  border-radius: 50%;
  background: #fff;
  box-shadow:
    0 0 0 2px rgba(92,105,255,.12),
    0 0 14px rgba(121,82,255,.48),
    0 2px 7px rgba(0,0,0,.3);
  transform: translate(-50%, -50%);
  transition: left 190ms cubic-bezier(.22,1,.36,1), transform 160ms ease, box-shadow 180ms ease;
  pointer-events: none;
}
.re-effort-input {
  position: absolute;
  z-index: 5;
  inset: -5px 0;
  width: 100%;
  height: calc(100% + 10px);
  margin: 0;
  opacity: 0;
  cursor: grab;
  touch-action: none;
}
.re-effort-input:active { cursor: grabbing; }
.re-effort-input:focus-visible + .re-effort-knob {
  outline: 2px solid var(--dsw-static-blue-400);
  outline-offset: 2px;
}
.re-effort.is-dragging .re-effort-canvas {
  filter: saturate(1.45) brightness(1.28) contrast(1.06);
}
.re-effort.is-dragging .re-effort-flare {
  filter: blur(1.5px) saturate(1.6) brightness(1.42);
  transition: none;
}
.re-effort.is-dragging .re-effort-knob {
  transform: translate(-50%, -50%) scale(1.07);
  transition: none;
  box-shadow:
    0 0 0 3px rgba(113,115,255,.25),
    0 0 20px rgba(74,145,255,.86),
    0 0 31px rgba(171,53,255,.66),
    0 3px 8px rgba(0,0,0,.32);
}
.re-effort-slider[data-top] .re-effort-track {
  animation: re-effort-dark-breathe 1.9s ease-in-out infinite;
}
.re-effort-slider[data-top] .re-effort-knob {
  box-shadow:
    0 0 0 3px rgba(119,99,255,.18),
    0 0 22px rgba(135,78,255,.76),
    0 0 34px rgba(53,121,255,.34),
    0 3px 8px rgba(0,0,0,.3);
}
.re-effort.is-error .re-effort-slider {
  outline: 1px solid var(--dsw-alias-state-error-secondary);
  outline-offset: 2px;
}
.re-effort.is-busy { opacity: .72; }
.re-effort-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
.re-model-root {
  position: relative;
  display: inline-flex;
  min-width: 0;
}
.re-model-trigger {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  min-width: 0;
  max-width: 230px;
  height: 28px;
  padding: 0 8px 0 10px;
  border: 0;
  border-radius: 9px;
  color: var(--dsw-alias-label-primary, #15171b);
  background: transparent;
  font: inherit;
  cursor: pointer;
  transition: background 140ms ease;
}
.re-model-trigger:hover,
.re-model-trigger[aria-expanded="true"] {
  background: var(--dsw-alias-fill-tertiary, rgba(120,125,140,.1));
}
.re-model-trigger:disabled { cursor: not-allowed; opacity: .5; }
.re-model-name {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 12px;
  line-height: 1;
}
.re-model-effort {
  flex: 0 0 auto;
  color: var(--dsw-static-deepseek-500, #4d70ff);
  font-size: 12px;
  line-height: 1;
}
.re-model-chevron {
  flex: 0 0 auto;
  width: 7px;
  height: 7px;
  margin: -3px 1px 0 3px;
  border-right: 1.5px solid currentColor;
  border-bottom: 1.5px solid currentColor;
  opacity: .55;
  transform: rotate(45deg);
  transition: transform 150ms ease, margin 150ms ease;
}
.re-model-trigger[aria-expanded="true"] .re-model-chevron {
  margin-top: 3px;
  transform: rotate(225deg);
}
.re-model-menu {
  position: absolute;
  right: 0;
  bottom: calc(100% + 8px);
  z-index: 1200;
  box-sizing: border-box;
  width: min(312px, var(--re-menu-width, calc(100vw - 24px)));
  max-height: var(--re-menu-height, calc(100dvh - 24px));
  overflow-x: hidden;
  overflow-y: auto;
  overscroll-behavior: contain;
  translate: var(--re-menu-x, 0px) var(--re-menu-y, 0px);
  border: 1px solid var(--dsw-alias-stroke-secondary, rgba(121,126,145,.2));
  border-radius: 16px;
  color: var(--dsw-alias-label-primary, #15171b);
  background: var(--dsw-alias-bg-elevated, #fff);
  box-shadow: 0 14px 42px rgba(18, 24, 42, .18), 0 3px 10px rgba(18, 24, 42, .08);
  animation: re-menu-in 150ms cubic-bezier(.22,1,.36,1);
}
.re-advanced {
  padding: 14px;
}
.re-menu-separator {
  height: 1px;
  background: var(--dsw-alias-stroke-secondary, rgba(121,126,145,.16));
}
.re-model-row,
.re-model-option,
.re-model-back {
  width: 100%;
  border: 0;
  color: inherit;
  background: transparent;
  font: inherit;
  cursor: pointer;
}
.re-model-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto auto;
  align-items: center;
  gap: 8px;
  min-height: 45px;
  padding: 0 14px;
  text-align: left;
}
.re-model-row:hover,
.re-model-option:hover,
.re-model-back:hover { background: var(--dsw-alias-fill-tertiary, rgba(120,125,140,.09)); }
.re-model-row-name { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 13px; }
.re-model-row-effort { color: var(--dsw-static-deepseek-500, #4d70ff); font-size: 12px; }
.re-row-chevron { font-size: 20px; line-height: 1; opacity: .42; }
.re-model-pane { max-height: min(390px, 60vh); overflow-y: auto; padding: 7px; }
.re-model-back {
  display: flex;
  align-items: center;
  gap: 8px;
  height: 34px;
  padding: 0 8px;
  border-radius: 8px;
  text-align: left;
  color: var(--dsw-alias-label-secondary, #686c75);
  font-size: 12px;
}
.re-model-group-title { padding: 10px 9px 5px; color: var(--dsw-alias-label-tertiary, #9296a0); font-size: 11px; }
.re-model-option {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 20px;
  align-items: center;
  gap: 8px;
  min-height: 38px;
  padding: 7px 9px;
  border-radius: 9px;
  text-align: left;
}
.re-model-option-copy { min-width: 0; }
.re-model-option-name { display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 12px; }
.re-model-option-desc { display: block; margin-top: 3px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: var(--dsw-alias-label-tertiary, #9296a0); font-size: 10px; }
.re-model-check { color: var(--dsw-static-deepseek-500, #4d70ff); font-size: 15px; text-align: center; }
.re-model-status { padding: 14px; color: var(--dsw-alias-label-tertiary, #9296a0); font-size: 12px; text-align: center; }
.re-model-error { margin: 8px; padding: 8px 10px; border-radius: 8px; color: var(--dsw-alias-state-error-primary, #c83e4d); background: var(--dsw-alias-state-error-tertiary, rgba(220,55,70,.08)); font-size: 11px; }
.re-setting-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 16px 0;
  border-bottom: 1px solid var(--dsw-alias-border-l2, rgba(121,126,145,.18));
}
.re-setting-copy { min-width: 0; }
.re-setting-title {
  color: var(--dsw-alias-label-primary, #15171b);
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
}
.re-setting-description {
  margin-top: 3px;
  color: var(--dsw-alias-label-tertiary, #9296a0);
  font-size: 12px;
  line-height: 18px;
}
.re-setting-control { display: inline-flex; align-items: center; gap: 10px; flex: none; }
.re-setting-state { color: var(--dsw-alias-label-secondary, #686c75); font-size: 13px; }
.re-setting-switch {
  position: relative;
  width: 38px;
  height: 22px;
  padding: 0;
  border: 0;
  border-radius: 999px;
  background: var(--dsw-alias-fill-quaternary, #c7cbd3);
  cursor: pointer;
  transition: background 150ms ease;
}
.re-setting-switch:hover { filter: brightness(.97); }
.re-setting-switch:disabled { cursor: not-allowed; opacity: .45; }
.re-setting-switch:focus-visible {
  outline: 2px solid var(--dsw-static-blue-400, #5d83ff);
  outline-offset: 2px;
}
.re-setting-switch.is-on { background: var(--dsw-alias-state-business-primary, #4f73ff); }
.re-setting-switch-knob {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,0,0,.2);
  transition: transform 170ms cubic-bezier(.22,1,.36,1);
}
.re-setting-switch.is-on .re-setting-switch-knob { transform: translateX(16px); }
/* LOCAL ADDITION: particle colour swatches in the settings row. */
.re-palette-picker {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
.re-palette-swatch {
  width: 22px;
  height: 22px;
  padding: 0;
  border: 0;
  border-radius: 7px;
  cursor: pointer;
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, .18);
  transition: transform 130ms cubic-bezier(.22,1,.36,1), box-shadow 130ms ease;
}
.re-palette-swatch:hover { transform: scale(1.08); }
.re-palette-swatch:disabled { cursor: not-allowed; opacity: .45; }
.re-palette-swatch.is-on {
  box-shadow:
    inset 0 0 0 1px rgba(0, 0, 0, .18),
    0 0 0 2px var(--dsw-alias-bg-elevated, #fff),
    0 0 0 3.5px var(--re-swatch-ring, var(--dsw-static-deepseek-500, #4d70ff));
}
.re-palette-swatch:focus-visible {
  outline: 2px solid var(--dsw-static-blue-400, #4d70ff);
  outline-offset: 2px;
}
/* LOCAL ADDITION: live level readout above the slider.
   .re-effort is a fixed-height flex row upstream; carrying a readout turns it
   into a column that sizes to its content. Specificity, not source order, wins
   these over the upstream rules \u2014 while keeping the readout above the track.
   NB: this whole sheet is a JS template literal, so no backticks in comments. */
.re-effort.has-readout {
  flex-direction: column;
  align-items: stretch;
  height: auto;
  gap: 6px;
}
.re-effort-readout {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 8px;
  font-size: 11px;
  line-height: 1.2;
}
.re-effort-readout-label { color: var(--dsw-alias-label-tertiary, #9296a0); }
.re-effort-readout-value {
  color: var(--dsw-alias-label-primary, #15171b);
  font-weight: 600;
  transition: color 140ms ease;
}
.re-effort-readout-send {
  color: var(--dsw-alias-label-tertiary, #9296a0);
  font-weight: 400;
}
.re-effort.is-dragging .re-effort-readout-value { color: var(--dsw-static-deepseek-500, #4d70ff); }
.re-effort.is-busy .re-effort-readout-value { opacity: .6; }
body[data-ds-dark-theme] .re-model-menu {
  border-color: rgba(136, 145, 180, .2);
  color: var(--dsw-alias-label-primary, #f2f4f8);
  background: var(--dsw-alias-bg-elevated, #202126);
  box-shadow: 0 18px 46px rgba(0,0,0,.48), 0 3px 12px rgba(0,0,0,.32);
}
body[data-ds-dark-theme] .re-model-trigger { color: var(--dsw-alias-label-primary, #f2f4f8); }
@keyframes re-menu-in {
  from { opacity: 0; transform: translateY(5px) scale(.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
body:not([data-ds-dark-theme]) .re-effort-slider {
  filter: none;
}
body:not([data-ds-dark-theme]) .re-effort-track {
  background: var(--dsw-static-blue-75, #e5f0ff);
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,.9),
    inset 0 0 0 1px rgba(80,133,194,.14),
    0 3px 10px rgba(48,101,165,.13);
}
body:not([data-ds-dark-theme]) .re-effort-track::before {
  content: "";
  position: absolute;
  z-index: 0;
  inset: 0 auto 0 0;
  width: var(--re-progress);
  border-radius: inherit;
  background: linear-gradient(90deg, #fff 0%, #e2f0ff 20%, #a8d0fb 57%, #438fdf 100%);
  transition: width 190ms cubic-bezier(.22,1,.36,1);
}
body:not([data-ds-dark-theme]) .re-effort-slider[data-top] .re-effort-track::before {
  background: linear-gradient(90deg, #fff 0%, #d7eaff 18%, #75afea 54%, #0751ad 100%);
}
body:not([data-ds-dark-theme]) .re-effort.is-dragging .re-effort-track::before {
  transition: none;
}
body:not([data-ds-dark-theme]) .re-effort-track::after {
  z-index: 1;
  background: linear-gradient(90deg, rgba(255,255,255,.48), transparent 34%, rgba(23,101,201,.07));
}
body:not([data-ds-dark-theme]) .re-effort-canvas {
  opacity: .78;
  mix-blend-mode: multiply;
}
body:not([data-ds-dark-theme]) .re-effort-flare {
  background: radial-gradient(ellipse at 100% 50%, rgba(255,255,255,.98) 0 5%, rgba(204,231,255,.88) 13%, rgba(91,162,241,.48) 31%, rgba(37,111,207,.16) 53%, transparent 75%);
  filter: blur(2px) saturate(1.12);
}
body:not([data-ds-dark-theme]) .re-effort-flare::before {
  background: linear-gradient(90deg, transparent, rgba(116,177,244,.34), #fff, rgba(66,139,225,.58), transparent);
  box-shadow: 0 0 7px rgba(58,133,222,.5), 0 0 13px rgba(104,176,255,.38);
}
body:not([data-ds-dark-theme]) .re-effort-flare::after {
  background: linear-gradient(180deg, transparent, rgba(255,255,255,.94), transparent);
  box-shadow: 0 0 7px rgba(64,137,224,.44);
}
body:not([data-ds-dark-theme]) .re-effort-knob {
  border-color: rgba(126,160,197,.32);
  box-shadow:
    0 0 0 2px rgba(58,124,207,.09),
    0 0 13px rgba(48,118,207,.3),
    0 3px 8px rgba(39,77,119,.18);
}
body:not([data-ds-dark-theme]) .re-effort-slider[data-top] .re-effort-track {
  animation-name: re-effort-light-breathe;
}
body:not([data-ds-dark-theme]) .re-effort-slider[data-top] .re-effort-knob,
body:not([data-ds-dark-theme]) .re-effort.is-dragging .re-effort-knob {
  box-shadow:
    0 0 0 3px rgba(36,105,192,.15),
    0 0 20px rgba(25,100,201,.45),
    0 3px 8px rgba(39,77,119,.18);
}
@keyframes re-effort-dark-breathe {
  0%, 100% { box-shadow: inset 0 1px 0 rgba(196,204,255,.16), 0 3px 10px rgba(18,25,72,.4); }
  50% { box-shadow: inset 0 1px 0 rgba(220,214,255,.24), 0 0 21px rgba(111,66,255,.5); }
}
@keyframes re-effort-light-breathe {
  0%, 100% { box-shadow: inset 0 1px 0 rgba(255,255,255,.9), inset 0 0 0 1px rgba(67,124,193,.16), 0 3px 10px rgba(48,101,165,.13); }
  50% { box-shadow: inset 0 1px 0 rgba(255,255,255,.96), inset 0 0 0 1px rgba(31,102,190,.22), 0 0 19px rgba(31,105,201,.24); }
}
.re-adapt {
  padding: 10px 14px 12px;
}
.re-adapt-copy { min-width: 0; }
.re-adapt-title {
  color: var(--dsw-alias-label-primary, #15171b);
  font-size: 12px;
  font-weight: 500;
  line-height: 1.4;
}
.re-adapt-desc {
  margin-top: 3px;
  color: var(--dsw-alias-label-tertiary, #9296a0);
  font-size: 11px;
  line-height: 1.55;
}
.re-adapt-open-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.re-adapt-open {
  margin-top: 8px;
  padding: 5px 10px;
  border: 0;
  border-radius: 8px;
  color: #fff;
  background: var(--dsw-static-deepseek-500, #4d70ff);
  font-size: 12px;
  cursor: pointer;
}
.re-adapt-agent {
  margin-top: 8px;
  padding: 5px 10px;
  border: 1px solid var(--dsw-alias-border-secondary, rgba(120,125,140,.28));
  border-radius: 8px;
  color: var(--dsw-alias-label-secondary, #686c75);
  background: transparent;
  font-size: 12px;
  cursor: pointer;
}
.re-adapt-agent:hover { filter: brightness(1.06); }
.re-adapt-open:hover { filter: brightness(1.06); }
.re-adapt-panel {
  box-sizing: border-box;
  max-width: 100%;
  margin-top: 10px;
  padding: 10px;
  border: 1px solid var(--dsw-alias-stroke-secondary, rgba(121,126,145,.2));
  border-radius: 10px;
  background: var(--dsw-alias-bg-page, #f7f8fa);
}
body[data-ds-dark-theme] .re-adapt-panel {
  background: rgba(20, 22, 30, .5);
}
.re-adapt-scroll {
  max-height: min(260px, 40vh);
  overflow-y: auto;
  overscroll-behavior: contain;
  padding-right: 4px;
  scrollbar-width: thin;
}
.re-adapt-panel-line {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 12px;
  color: var(--dsw-alias-label-secondary, #686c75);
}
.re-adapt-arrow { color: var(--dsw-static-deepseek-500, #4d70ff); font-weight: 500; }
.re-adapt-yaml {
  box-sizing: border-box;
  max-width: 100%;
  margin: 9px 0 0;
  padding: 8px 10px;
  overflow: auto;
  border-radius: 8px;
  color: var(--dsw-alias-label-secondary, #686c75);
  background: rgba(120, 125, 140, .08);
  font: 11px/1.6 ui-monospace, SFMono-Regular, Consolas, monospace;
}
.re-adapt-steps {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 8px;
  color: var(--dsw-alias-label-tertiary, #9296a0);
  font-size: 11px;
  line-height: 1.55;
}
.re-adapt-steps code {
  padding: 1px 4px;
  border-radius: 4px;
  background: var(--dsw-alias-fill-tertiary, rgba(120,125,140,.12));
}
.re-adapt-warning {
  margin-top: 10px;
  padding: 8px 10px;
  border-radius: 8px;
  color: var(--dsw-alias-state-warning-primary, #b7791f);
  background: var(--dsw-alias-state-warning-tertiary, rgba(213, 148, 44, .1));
  font-size: 11px;
  line-height: 1.6;
}
.re-adapt-howto {
  margin-top: 10px;
  color: var(--dsw-alias-label-secondary, #686c75);
  font-size: 11px;
  line-height: 1.6;
}
.re-adapt-switch-intro {
  margin-top: 8px;
  color: var(--dsw-alias-label-secondary, #686c75);
  font-size: 11px;
  font-weight: 500;
}
.re-adapt-switches {
  margin: 4px 0 0;
  padding-left: 16px;
  color: var(--dsw-alias-label-tertiary, #9296a0);
  font-size: 11px;
  line-height: 1.6;
}
.re-adapt-label {
  margin-top: 10px;
  color: var(--dsw-alias-label-secondary, #686c75);
  font-size: 11px;
  font-weight: 500;
}
.re-adapt-step-title {
  font-weight: 500;
  color: var(--dsw-alias-label-secondary, #686c75);
}
.re-adapt-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;
}
.re-adapt-apply,
.re-adapt-cancel {
  padding: 5px 12px;
  border: 0;
  border-radius: 8px;
  font-size: 12px;
  cursor: pointer;
}
.re-adapt-apply {
  color: #fff;
  background: var(--dsw-static-deepseek-500, #4d70ff);
}
.re-adapt-cancel {
  color: var(--dsw-alias-label-secondary, #686c75);
  background: var(--dsw-alias-fill-tertiary, rgba(120,125,140,.12));
}
.re-adapt-apply:disabled,
.re-adapt-cancel:disabled { cursor: wait; opacity: .6; }
@media (max-width: 600px) {
  .re-model-trigger { max-width: 180px; }
}
@media (prefers-reduced-motion: reduce) {
  .re-effort-slider[data-top] .re-effort-track { animation: none; }
  .re-effort-knob,
  .re-effort-flare,
  body:not([data-ds-dark-theme]) .re-effort-track::before { transition: none; }
  .re-model-menu { animation: none; }
}
`;

// src/client/pixel-styles.ts
var PIXEL_CSS = `
.re-effort.re-depth.has-readout {
  display: block;
  box-sizing: border-box;
  width: 216px;
  max-width: 100%;
  min-height: 92px;
  height: auto;
  margin: 0 auto;
  padding: 10px 8px 7px 6px;
  border: 0;
  border-radius: 0;
  background: transparent;
  color: var(--dsw-alias-label-secondary);
}
.re-model-menu[data-depth-card] {
  width: min(216px, var(--re-menu-width, calc(100vw - 24px)));
  border: .5px solid var(--dsw-alias-border-l2);
  border-radius: 9px;
  background: var(--dsw-alias-bg-layer-2);
  box-shadow: 0 4px 16px color-mix(in srgb, var(--dsw-alias-label-primary) 12%, transparent);
}
.re-model-menu[data-depth-card] .re-model-row { min-height: 34px; padding: 0 8px; gap: 6px; }
.re-depth-header { display: flex; align-items: center; gap: 6px; height: 20px; font-size: 13px; line-height: 20px; }
.re-depth-label { flex: none; color: var(--dsw-alias-label-tertiary); }
.re-depth-value { min-width: 0; height: 20px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-weight: 400; color: var(--re-accent); }
.re-depth-send { font-size: 11px; line-height: 1; color: var(--dsw-alias-label-secondary); }
.re-depth-speed { display: flex; justify-content: space-between; margin-top: 10px; font-size: 12px; line-height: 15px; color: var(--dsw-alias-label-tertiary); }
.re-depth-slider { position: relative; height: 20px; margin-top: 8px; border-radius: 7px; isolation: isolate; }
.re-depth-track { position: absolute; inset: 0; border-radius: inherit; background: linear-gradient(90deg, color-mix(in srgb, var(--dsw-alias-bg-skeleton) 78%, var(--re-accent)) 0%, color-mix(in srgb, var(--dsw-alias-bg-skeleton) 60%, var(--re-accent)) 18%, color-mix(in srgb, var(--re-accent) var(--re-strength), var(--dsw-alias-bg-skeleton)) 100%); }
.re-depth-canvas { position: absolute; inset: 0; width: 100%; height: 100%; border-radius: inherit; pointer-events: none; }
.re-depth-canvas[hidden] { display: none; }
.re-depth-thumb { position: absolute; z-index: 2; top: 0; left: var(--re-progress); width: 17px; height: 20px; transform: translateX(calc(-1 * var(--re-progress))); border: .5px solid var(--dsw-alias-border-l2); border-radius: 6px; background: var(--dsw-alias-label-on-primary, white); box-shadow: 0 1px 2px color-mix(in srgb, var(--re-accent) 12%, transparent); pointer-events: none; transition: left 260ms cubic-bezier(.2,.8,.2,1), transform 260ms cubic-bezier(.2,.8,.2,1); }
.re-depth.is-dragging .re-depth-thumb { transition: none; }
.re-depth-input { appearance: none; position: absolute; z-index: 3; inset: -6px 0; width: 100%; height: 32px; padding: 0; margin: 0; opacity: 0; cursor: grab; touch-action: pan-y; }
.re-depth-input:active { cursor: grabbing; }
.re-depth-input:disabled { cursor: wait; }
.re-depth-input::-webkit-slider-thumb { appearance: none; width: 17px; height: 20px; border: 0; }
.re-depth-input::-moz-range-thumb { width: 17px; height: 20px; border: 0; }
.re-depth-slider:has(.re-depth-input:focus-visible) { outline: 2px solid var(--re-accent); outline-offset: 3px; }
.re-depth[data-top] .re-depth-value { background: linear-gradient(100deg, var(--re-accent), color-mix(in srgb, var(--re-accent) 55%, var(--dsw-alias-label-primary)), var(--re-accent)); background-size: 250% 100%; background-clip: text; -webkit-background-clip: text; color: transparent; animation: re-depth-flow 2.8s linear infinite; }
.re-model-root .re-model-effort, .re-model-root .re-model-row-effort { color: var(--re-accent); }
.re-palette-picker { flex-wrap: wrap; }
.re-custom-palette { display: inline-flex; align-items: center; gap: 6px; color: var(--dsw-alias-label-secondary); font-size: 12px; }
.re-custom-palette input { width: 26px; height: 24px; padding: 0; border: 0; background: transparent; cursor: pointer; }
@keyframes re-depth-flow { to { background-position: 250% center; } }
@keyframes re-depth-enter { from { opacity: .3; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
@media (prefers-reduced-motion: reduce) {
  .re-depth .re-depth-value, .re-depth[data-top] .re-depth-value { animation: none; }
  .re-depth .re-depth-thumb { transition: none; }
}
`;

// src/client/pixel-theme.js
var DEFAULT_COLOR = "#9864db";
var parseHex = (hex) => [1, 3, 5].map((offset) => parseInt(hex.slice(offset, offset + 2), 16));
var blendRgb = (a, b, weight) => a.map((value, index) => Math.round(value + (b[index] - value) * weight));
function rgbToHsl(rgb) {
  const [r, g, b] = rgb.map((value) => value / 255);
  const high = Math.max(r, g, b), low = Math.min(r, g, b);
  const delta = high - low, lightness = (high + low) / 2;
  if (!delta) return [0, 0, lightness];
  const saturation = delta / (1 - Math.abs(2 * lightness - 1));
  const hue = high === r ? ((g - b) / delta + 6) % 6 : high === g ? (b - r) / delta + 2 : (r - g) / delta + 4;
  return [hue * 60, saturation, lightness];
}
function hslToRgb([h, s, l]) {
  const hue = (h % 360 + 360) % 360 / 60;
  const chroma = (1 - Math.abs(2 * l - 1)) * s;
  const x = chroma * (1 - Math.abs(hue % 2 - 1));
  const m = l - chroma / 2;
  const components = hue < 1 ? [chroma, x, 0] : hue < 2 ? [x, chroma, 0] : hue < 3 ? [0, chroma, x] : hue < 4 ? [0, x, chroma] : hue < 5 ? [x, 0, chroma] : [chroma, 0, x];
  return components.map((value) => Math.round((value + m) * 255));
}
function makePixelPalette(hex) {
  const base = parseHex(hex);
  const selected = rgbToHsl(base), original = rgbToHsl(parseHex(DEFAULT_COLOR));
  const tint = (rgb) => {
    const [h, s, l] = rgbToHsl(rgb);
    return hslToRgb([
      h + selected[0] - original[0],
      Math.min(1, s * selected[1] / original[1]),
      Math.max(0.06, Math.min(0.97, l + (selected[2] - original[2]) * 0.65))
    ]);
  };
  return {
    leftColor: blendRgb([216, 213, 220], base, 0.22),
    deepViolet: tint([139, 77, 207]),
    deepMid: tint([146, 94, 205]),
    midPurple: tint([155, 115, 216]),
    softMid: tint([167, 136, 218]),
    softLilac: tint([179, 151, 222]),
    paleCool: tint([191, 174, 225]),
    highlightColor: tint([205, 184, 235]),
    peakColor: tint([238, 223, 255])
  };
}

// src/client/pixel-field.js
var clamp = (value, min, max) => Math.min(max, Math.max(min, value));
var smoothstep = (edge0, edge1, value) => {
  const x = clamp((value - edge0) / (edge1 - edge0), 0, 1);
  return x * x * (3 - 2 * x);
};
var mix = (from, to, amount) => from + (to - from) * amount;
var mixColor = (from, to, amount) => `rgb(${Math.round(mix(from[0], to[0], amount))} ${Math.round(mix(from[1], to[1], amount))} ${Math.round(mix(from[2], to[2], amount))})`;
var PixelField = class {
  constructor(canvas, reducedMotion) {
    this._canvas = canvas;
    this._reducedMotion = reducedMotion;
    this._palette = makePixelPalette(DEFAULT_COLOR);
    this._isMax = false;
    this._frame = null;
    this._reveal = 0;
    this._maxStartedAt = 0;
    this._lastFrame = 0;
    this._tick = (time) => {
      this._frame = null;
      if (!this._isMax || document.hidden || this._reducedMotion.matches) return;
      this._lastFrame = time;
      this._reveal = smoothstep(0, 1, (Date.now() - this._maxStartedAt) / 1e3);
      this._drawPixelField(Date.now());
      this._frame = requestAnimationFrame(this._tick);
    };
    this.resize();
  }
  resize() {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    this._canvas.width = Math.round((this._canvas.parentElement?.clientWidth || 0) * ratio);
    this._canvas.height = Math.round((this._canvas.parentElement?.clientHeight || 0) * ratio);
    this._buildPixelGrid();
    this._drawPixelField(Date.now());
  }
  setColor(hex) {
    this._palette = makePixelPalette(hex);
    this._drawPixelField(Date.now());
  }
  setActive(active) {
    if (active === this._isMax) return;
    this._isMax = active;
    this._maxStartedAt = Date.now();
    this._reveal = this._reducedMotion.matches ? 1 : 0;
    this.sync();
  }
  sync() {
    if (this._frame !== null) cancelAnimationFrame(this._frame);
    this._frame = null;
    this._canvas.hidden = !this._isMax;
    this._canvas.dataset.animation = "stopped";
    this._drawPixelField(Date.now());
    if (!this._isMax || document.hidden) return;
    if (this._reducedMotion.matches) {
      this._reveal = 1;
      this._drawPixelField(Date.now());
      this._canvas.dataset.animation = "reduced-motion";
      return;
    }
    this._canvas.dataset.animation = "running";
    this._frame = requestAnimationFrame(this._tick);
  }
  _buildPixelGrid() {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    const width = this._canvas.width / ratio;
    const height = this._canvas.height / ratio;
    if (width <= 0 || height <= 0) {
      this._pixelGrid = [];
      return;
    }
    const rows = 8;
    const cell = height / rows;
    const gap = 0.65;
    const columns = Math.ceil(width / cell);
    const cells = [];
    for (let row = 0; row < rows; row += 1) {
      for (let column = 0; column < columns; column += 1) {
        const x = column * cell;
        const y = row * cell;
        const nX = (x + cell * 0.5) / width;
        cells.push({
          x,
          y,
          row,
          column,
          nX,
          base: Math.abs(Math.sin(column * 12.9898 + row * 78.233) * 43758.5453) % 1,
          tempo: Math.abs(Math.sin(column * 7.13 + row * 19.41) * 19341.731) % 1,
          phase: Math.abs(Math.sin(column * 31.17 + row * 11.93) * 28437.123) % 1,
          chroma: Math.abs(Math.sin(column * 9.47 + row * 67.13) * 15823.917) % 1,
          purple: 0.35 + smoothstep(0.24, 0.8, nX) * 0.65,
          intensity: 0.25 + smoothstep(0, 0.29, nX) * 0.75,
          depth: smoothstep(0.25, 0.88, nX)
        });
      }
    }
    this._pixelGrid = cells;
    this._pixelCell = cell;
    this._pixelGap = gap;
    this._pixelRows = rows;
  }
  _drawPixelField(time) {
    const context = this._canvas.getContext("2d");
    if (!context || !this._canvas.width || !this._canvas.height) return;
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    const width = this._canvas.width / ratio;
    const height = this._canvas.height / ratio;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    context.clearRect(0, 0, width, height);
    if (!this._isMax) return;
    const reveal = this._reducedMotion.matches ? 1 : this._reveal;
    const frontier = 1 - reveal;
    const cells = this._pixelGrid || [];
    const cell = this._pixelCell || height / 8;
    const gap = this._pixelGap ?? 0.65;
    const elapsed = Math.max(0, time - this._maxStartedAt) * 0.8;
    const leftColor = this._palette.leftColor;
    const deepViolet = this._palette.deepViolet;
    const deepMid = this._palette.deepMid;
    const midPurple = this._palette.midPurple;
    const softMid = this._palette.softMid;
    const softLilac = this._palette.softLilac;
    const paleCool = this._palette.paleCool;
    const highlightColor = this._palette.highlightColor;
    const peakColor = this._palette.peakColor;
    const tones = [
      deepViolet,
      deepViolet,
      deepMid,
      deepMid,
      midPurple,
      midPurple,
      midPurple,
      softMid,
      softMid,
      softLilac,
      paleCool
    ];
    const flowDuration = 4e3;
    const rawFlow = elapsed / flowDuration;
    const flowCycle = Math.floor(rawFlow);
    const easedFlow = flowCycle + smoothstep(0, 1, rawFlow - flowCycle);
    context.save();
    context.beginPath();
    if (typeof context.roundRect === "function") {
      context.roundRect(0, 0, width, height, 10);
    } else {
      context.rect(0, 0, width, height);
    }
    context.clip();
    for (const c of cells) {
      const { x, y, row, nX, base, tempo, phase, chroma, purple, intensity, depth } = c;
      const revealAlpha = smoothstep(frontier - 0.1, frontier + 0.07, nX);
      if (revealAlpha <= 2e-3) continue;
      const period = 500 + tempo * 1500;
      const localTime = elapsed + phase * period;
      const cycle = Math.floor(localTime / period);
      const cycleProgress = localTime % period / period;
      const cycleHash = Math.abs(
        Math.sin(c.column * 17.17 + row * 41.73 + cycle * 13.11) * 24634.6345
      ) % 1;
      const widthHash = Math.abs(
        Math.sin(c.column * 5.37 + row * 29.11 + cycle * 7.43) * 17391.443
      ) % 1;
      const pulseCenter = 0.2 + cycleHash * 0.55;
      const pulseWidth = 0.09 + widthHash * 0.08;
      const pulseDistance = (cycleProgress - pulseCenter) / pulseWidth;
      const pulseEnvelope = Math.exp(-pulseDistance * pulseDistance * 1.45);
      const activeCycle = cycleHash > 0.12 ? 1 : 0.26;
      const irregularFlicker = pulseEnvelope * activeCycle;
      const flowCoordinate = (nX + easedFlow) * 9;
      const flowIndex = Math.floor(flowCoordinate);
      const flowProgress = smoothstep(0, 1, flowCoordinate - flowIndex);
      const flowHashA = Math.abs(
        Math.sin(flowIndex * 18.31 + row * 37.17) * 19283.173
      ) % 1;
      const flowHashB = Math.abs(
        Math.sin((flowIndex + 1) * 18.31 + row * 37.17) * 19283.173
      ) % 1;
      const clusterGate = smoothstep(0.46, 0.84, mix(flowHashA, flowHashB, flowProgress));
      const wavePhase = (nX + easedFlow + row * 0.06 + base * 0.02) * Math.PI * 2;
      const directionalWave = Math.pow(0.5 + 0.5 * Math.cos(wavePhase), 5);
      const directionalFlow = Math.max(clusterGate, directionalWave * 0.62);
      const flowingFlicker = Math.max(
        irregularFlicker * (0.48 + directionalFlow * 0.58),
        directionalFlow * (0.38 + base * 0.28)
      );
      let lightAmount = flowingFlicker;
      const revealGlow = reveal < 0.995 ? Math.exp(-((nX - frontier) ** 2) / 0.012) * (1 - smoothstep(0.7, 1, reveal)) : 0;
      lightAmount = Math.max(lightAmount, revealGlow * (0.4 + base * 0.4));
      const peakHighlight = lightAmount > 0.4 && irregularFlicker > 0.16 && cycleHash > 0.26 && clusterGate > 0.04;
      const hottestHighlight = lightAmount > 0.68 && irregularFlicker > 0.3 && cycleHash > 0.48 && clusterGate > 0.12;
      const highlightAmount = peakHighlight ? 0.97 : clamp(lightAmount * (0.44 + cycleHash * 0.3), 0, 0.64);
      const toneDrift = base * 0.28 + depth * 0.28 + cycleProgress * 0.38 + easedFlow * 0.18 + cycleHash * 0.2 + Math.sin(elapsed * 135e-5 + phase * Math.PI * 2) * 0.14;
      const tonePosition = (toneDrift % 1 + 1) % 1 * tones.length;
      const toneIndex = Math.floor(tonePosition);
      const toneMix = tonePosition - toneIndex;
      const toneA = tones[toneIndex];
      const toneB = tones[(toneIndex + 1) % tones.length];
      const cellTone = [
        mix(toneA[0], toneB[0], toneMix),
        mix(toneA[1], toneB[1], toneMix),
        mix(toneA[2], toneB[2], toneMix)
      ];
      const chromaNudge = (chroma - 0.5) * 10 + depth * 12;
      const variedPurple = [
        clamp(cellTone[0] + chromaNudge * 0.35 - depth * 8, 0, 255),
        clamp(cellTone[1] - depth * 16 + (base - 0.5) * 8, 0, 255),
        clamp(cellTone[2] + depth * 6 + (cycleHash - 0.5) * 6, 0, 255)
      ];
      const baseColor = [
        mix(leftColor[0], variedPurple[0], purple),
        mix(leftColor[1], variedPurple[1], purple),
        mix(leftColor[2], variedPurple[2], purple)
      ];
      const color = hottestHighlight ? mixColor(baseColor, peakColor, 0.95) : mixColor(baseColor, highlightColor, highlightAmount);
      const baseOpacity = 0.86 + base * 0.12;
      context.globalAlpha = peakHighlight || hottestHighlight ? revealAlpha * intensity : revealAlpha * intensity * clamp(baseOpacity + flowingFlicker * 0.12, 0, 1);
      context.fillStyle = color;
      context.fillRect(x + gap * 0.5, y + gap * 0.5, cell - gap, cell - gap);
    }
    context.restore();
    context.globalAlpha = 1;
  }
};

// src/client/levels.ts
var LEVEL_NAME_KEYS = {
  off: "level.off",
  minimal: "level.minimal",
  low: "level.low",
  medium: "level.medium",
  high: "level.high",
  xhigh: "level.xhigh",
  max: "level.max"
};
var CANONICAL_LEVELS = ["off", "minimal", "low", "medium", "high", "xhigh", "max"];
function levelName(level, t) {
  const key = LEVEL_NAME_KEYS[level];
  return key === void 0 ? level : t(key);
}
function levelIds(levels) {
  return levels.map((level) => level.id);
}
function effortStops(offered) {
  const present = CANONICAL_LEVELS.filter((level) => offered.includes(level));
  if (present.length < 2) return [];
  return CANONICAL_LEVELS.map((level) => {
    if (present.includes(level)) return { id: level, send: level, native: true };
    const at = CANONICAL_LEVELS.indexOf(level);
    let send = present[0];
    let best = Number.POSITIVE_INFINITY;
    for (const candidate of present) {
      const distance = Math.abs(CANONICAL_LEVELS.indexOf(candidate) - at);
      if (distance <= best) {
        send = candidate;
        best = distance;
      }
    }
    return { id: level, send, native: false };
  });
}
function stopIndex(stops, effort) {
  if (effort !== void 0 && stops.at(-1)?.send === effort) return stops.length - 1;
  const native = stops.findIndex((stop) => stop.native && stop.send === effort);
  if (native >= 0) return native;
  return stops.findIndex((stop) => stop.send === effort);
}
function displayLevelName(level, offered, t) {
  if (offered.length >= 2 && offered[offered.length - 1] === level) return t("level.ultra");
  return levelName(level, t);
}
function levelsText(levels, t) {
  return levels.length === 0 ? t("level.none") : levels.map((level) => displayLevelName(level, levels, t)).join(" / ");
}
function acceptedStopIndex(stops, effort, preferred) {
  if (effort !== void 0 && Number.isInteger(preferred) && stops[preferred]?.send === effort) return preferred;
  return stopIndex(stops, effort);
}

// src/client/menu-position.ts
function positionModelMenu(root, menu) {
  const viewport = window.visualViewport;
  const update = () => {
    const margin = 12;
    const left = (viewport?.offsetLeft ?? 0) + margin;
    const top = (viewport?.offsetTop ?? 0) + margin;
    const width = Math.max(0, (viewport?.width ?? document.documentElement.clientWidth) - margin * 2);
    const height = Math.max(0, (viewport?.height ?? window.innerHeight) - margin * 2);
    const anchor = root.getBoundingClientRect();
    const bottom = anchor.top - 8;
    const above = bottom - top;
    menu.style.setProperty("--re-menu-width", `${width}px`);
    menu.style.setProperty("--re-menu-height", `${Math.min(480, above >= 120 ? Math.min(above, height) : height)}px`);
    const baseLeft = anchor.right - menu.offsetWidth;
    const baseTop = bottom - menu.offsetHeight;
    const x = Math.max(left, Math.min(baseLeft, left + width - menu.offsetWidth));
    const y = Math.max(top, Math.min(baseTop, top + height - menu.offsetHeight));
    menu.style.setProperty("--re-menu-x", `${x - baseLeft}px`);
    menu.style.setProperty("--re-menu-y", `${y - baseTop}px`);
  };
  update();
  const observer = new ResizeObserver(update);
  observer.observe(root);
  observer.observe(menu);
  window.addEventListener("resize", update);
  window.addEventListener("scroll", update, true);
  viewport?.addEventListener("resize", update);
  viewport?.addEventListener("scroll", update);
  return () => {
    observer.disconnect();
    window.removeEventListener("resize", update);
    window.removeEventListener("scroll", update, true);
    viewport?.removeEventListener("resize", update);
    viewport?.removeEventListener("scroll", update);
  };
}

// src/client/selection.ts
function requireAcceptedSelection(result) {
  if (result !== void 0 && !result.ok) throw new Error(result.error?.message ?? "Model selection was rejected");
}
function unsupportedEffort(current, offered) {
  return current !== void 0 && !offered?.some((level) => level.id === current) ? current : void 0;
}

// src/client/palettes.ts
var DEFAULT_PALETTE_ID = "upstream";
var PALETTES = [
  {
    id: "upstream",
    labelKey: "palette.upstream",
    /* Shows what it actually renders in dark theme: upstream's own track. */
    swatch: "linear-gradient(100deg, #071126, #302262 70%, #5d35a0)",
    hue: null,
    dark: [],
    lightBg: "",
    lightFill: [],
    topFill: [],
    rot: 0,
    glow: "",
    accent: "#4d70ff"
  },
  {
    id: "violet",
    labelKey: "palette.violet",
    swatch: "linear-gradient(100deg, #160a2b, #4a1c86 70%, #7a2ec4)",
    hue: "hsl(275 100% 55%)",
    dark: ["#0a0514", "#160a2b", "#2c1152", "#4a1c86", "#7a2ec4"],
    lightBg: "#f3e8ff",
    lightFill: ["#ffffff", "#f0e4ff", "#c9a3f5", "#8b46d9"],
    topFill: ["#ffffff", "#e6d4ff", "#a877e8", "#5c1fa8"],
    rot: 40,
    glow: "122, 46, 196",
    accent: "#7a2ec4"
  },
  {
    id: "ice",
    labelKey: "palette.ice",
    swatch: "linear-gradient(100deg, #06182b, #155a91 70%, #1f8fc7)",
    hue: "hsl(202 100% 50%)",
    dark: ["#02080f", "#06182b", "#0b2f56", "#155a91", "#1f8fc7"],
    lightBg: "#e5f2ff",
    lightFill: ["#ffffff", "#e4f4ff", "#a9d8f7", "#3f97d6"],
    topFill: ["#ffffff", "#d9efff", "#79c0ea", "#0760ad"],
    rot: -33,
    glow: "31, 143, 199",
    accent: "#1f8fc7"
  },
  {
    id: "cyan",
    labelKey: "palette.cyan",
    swatch: "linear-gradient(100deg, #06201f, #137066 70%, #1aa392)",
    hue: "hsl(172 100% 45%)",
    dark: ["#020c0b", "#06201f", "#0b3d3a", "#137066", "#1aa392"],
    lightBg: "#e2fbf7",
    lightFill: ["#ffffff", "#e2fbf7", "#a4ecdf", "#38b8a6"],
    topFill: ["#ffffff", "#d6f7f1", "#6fd3c4", "#057a6b"],
    rot: -63,
    glow: "26, 163, 146",
    accent: "#1aa392"
  },
  {
    id: "green",
    labelKey: "palette.green",
    swatch: "linear-gradient(100deg, #071a0e, #146b3a 70%, #1fa055)",
    hue: "hsl(140 100% 45%)",
    dark: ["#030a05", "#071a0e", "#0c3a20", "#146b3a", "#1fa055"],
    lightBg: "#e4fbea",
    lightFill: ["#ffffff", "#e4fbea", "#a8f0c1", "#3fbe76"],
    topFill: ["#ffffff", "#d8f7e2", "#77d69c", "#087a41"],
    rot: -95,
    glow: "31, 160, 85",
    accent: "#1fa055"
  },
  {
    id: "amber",
    labelKey: "palette.amber",
    swatch: "linear-gradient(100deg, #241405, #8f5212 70%, #cc8420)",
    hue: "hsl(38 100% 52%)",
    dark: ["#0d0702", "#241405", "#4d2a0a", "#8f5212", "#cc8420"],
    lightBg: "#fff4e2",
    lightFill: ["#ffffff", "#fff4e2", "#f7dba9", "#d69a3f"],
    topFill: ["#ffffff", "#fff0d4", "#eac179", "#ad6a07"],
    rot: 163,
    glow: "204, 132, 32",
    accent: "#cc8420"
  },
  {
    id: "rose",
    labelKey: "palette.rose",
    swatch: "linear-gradient(100deg, #240618, #911456 70%, #cc1f78)",
    hue: "hsl(325 100% 50%)",
    dark: ["#0d0209", "#240618", "#4d0b30", "#911456", "#cc1f78"],
    lightBg: "#ffe4f1",
    lightFill: ["#ffffff", "#ffe4f1", "#f7a9d0", "#d63f8f"],
    topFill: ["#ffffff", "#ffd9ea", "#ea79b3", "#ad0763"],
    rot: 90,
    glow: "204, 31, 120",
    accent: "#cc1f78"
  }
];
var BY_ID = new Map(PALETTES.map((palette) => [palette.id, palette]));
function paletteOrDefault(id) {
  return BY_ID.get(id) ?? BY_ID.get(DEFAULT_PALETTE_ID);
}

// src/client/agent-tutorial.en.md
var agent_tutorial_en_default = '# Background: why the levels are missing\n\nDSH\'s model directory only reports **what the adapter declared**. When a model carries no reasoning metadata, the pi-ai adapter omits the `reasoning` field entirely, so the browser catalog has no `reasoning.efforts` and the model menu shows no slider.\n\nA custom route (a provider the user declared under `llm-pi-ai`) carries no such metadata by default:\n\n- its provider key is not one of pi-ai\'s built-in catalog providers (e.g. `deepseek`, `zai`, `moonshotai-cn`, `qwen-token-plan-cn`), so there is no catalog entry to read;\n- with no catalog entry, `reasoning` defaults to `false` unless `reasoningEfforts` is written on that model entry.\n\nConclusion: **a custom model must declare its own levels.** The plugin cannot invent them \u2014 submitting an undeclared level is refused by DSH with `UNSUPPORTED_REASONING_EFFORT`.\n\n# What to write\n\nIn `{{CONFIG_FILE}}`, find that model\'s entry under `{{ENTRY_PATH}}` and add `reasoningEfforts`. The current DSH Host supplies this location; older builds may use `settings.yaml`, while newer ones may use the profile\'s `cordis.patch.yml`:\n\n```yaml\n- id: <model id>\n  reasoningEfforts:      # key = DSH level; value = the spelling the endpoint accepts\n    low: "low"\n    high: "high"\n```\n\nRules:\n\n1. **A key must be a DSH level**: `off`, `minimal`, `low`, `medium`, `high`, `xhigh`, `max`.\n2. **A value is the endpoint\'s own spelling**: if the endpoint takes `"high"` / `"max"` for `reasoning_effort`, write `high: "high"` and `max: "max"`.\n3. **A level left out counts as unsupported** (resolution pins it), so declare only the levels the endpoint really offers.\n4. For a model that does not reason at all, write `reasoningEfforts: false`; **never an empty `reasoningEfforts:` or `{}`** \u2014 that fails the configuration outright.\n5. `off` is special: writing `off:` with an empty value means "supported, and send nothing when off"; leaving `off` out means "off is unsupported".\n6. The slider needs at least two levels.\n\n# compat: only when the endpoint needs it\n\n`compat` sits beside `reasoningEfforts`. With none, the adapter decides from the endpoint address: an address it does not recognize is treated as standard OpenAI, and a recognized vendor endpoint gets that vendor\'s format \u2014 **so a guessed format is worse than none**.\n\n| Endpoint behaviour | What to write |\n| --- | --- |\n| expresses effort directly through `reasoning_effort` | nothing |\n| needs its thinking switch sent first | `compat: { thinkingFormat: "qwen" }` sends `enable_thinking` + `reasoning_effort`; `"zai"` sends `thinking: {type: enabled}` + `reasoning_effort`; `"deepseek"` sends `thinking: {type: enabled}` |\n| does not accept `reasoning_effort` | `compat: { supportsReasoningEffort: false }` |\n| fails with 400 `invalid_parameter_error` | `compat: { supportsDeveloperRole: false }`, sending the system prompt as `system` |\n| fails while replaying history | `compat: { requiresReasoningContentOnAssistantMessages: true }` |\n| only understands `<thinking>` text | `compat: { requiresThinkingAsText: true }` |\n\n**Mind the protocol**: these `compat` fields are meaningful only on a route whose `api` is `openai-completions`. On another protocol (e.g. `anthropic-messages`) DSH does not ignore them \u2014 it **fails resolution**, the provider route disappears from the model menu.\n\n# How to confirm the fix\n\n1. Save `{{CONFIG_FILE}}`. DSH reloads automatically; if it does not, restart the Web Host and refresh the page.\n2. Open the model menu: the reasoning-effort slider appearing means the directory now reads the levels.\n3. Slider present but requests failing: almost always a wrong `compat` or a level value the endpoint rejects \u2014 work through the table above.\n4. The whole route missing from the menu: a `compat` field the protocol does not take was written; remove it first.\n\n# What not to do\n\n- Do not invent level values. Check the endpoint documentation, or ask the user.\n- Do not change anything outside that model entry; keep `name`, `contextWindow`, `maxTokens` and other existing fields as they are.\n- Do not add a second copy of the `llm-pi-ai` configuration.\n- Do not switch providers to work around the problem unless the user asks.\n';

// src/client/agent-tutorial.zh.md
var agent_tutorial_zh_default = '# \u80CC\u666F\uFF1A\u4E3A\u4EC0\u4E48\u8BFB\u4E0D\u5230\u63A8\u7406\u5F3A\u5EA6\u6863\u4F4D\n\nDSH \u7684\u6A21\u578B\u76EE\u5F55\u53EA\u62A5\u544A**\u9002\u914D\u5668\u58F0\u660E\u8FC7\u7684\u80FD\u529B**\u3002pi-ai \u9002\u914D\u5668\u5728\u6A21\u578B\u6CA1\u6709\u63A8\u7406\u5143\u6570\u636E\u65F6\u5B8C\u5168\u4E0D\u8F93\u51FA `reasoning` \u5B57\u6BB5\uFF0C\u4E8E\u662F\u6D4F\u89C8\u5668\u62FF\u5230\u7684\u76EE\u5F55\u91CC\u6CA1\u6709 `reasoning.efforts`\uFF0C\u6A21\u578B\u83DC\u5355\u91CC\u4E5F\u4E0D\u4F1A\u51FA\u73B0\u6ED1\u5757\u3002\n\n\u81EA\u5B9A\u4E49\u8DEF\u7531\uFF08\u7528\u6237\u5728 `llm-pi-ai` \u91CC\u81EA\u5DF1\u58F0\u660E\u7684 provider\uFF09\u9ED8\u8BA4\u6CA1\u6709\u8FD9\u5C42\u5143\u6570\u636E\uFF1A\n\n- \u5B83\u7684 provider key \u4E0D\u662F pi-ai \u5185\u7F6E\u76EE\u5F55\u91CC\u7684 provider\uFF08\u5185\u7F6E\u5982 `deepseek`\u3001`zai`\u3001`moonshotai-cn`\u3001`qwen-token-plan-cn`\uFF09\uFF0C\u6240\u4EE5\u67E5\u4E0D\u5230\u76EE\u5F55\u6761\u76EE\uFF1B\n- \u67E5\u4E0D\u5230\u76EE\u5F55\u6761\u76EE\u65F6 `reasoning` \u9ED8\u8BA4\u53D6 `false`\uFF0C\u9664\u975E\u5728\u8BE5\u6A21\u578B\u6761\u76EE\u91CC\u663E\u5F0F\u5199 `reasoningEfforts`\u3002\n\n\u7ED3\u8BBA\uFF1A**\u81EA\u5B9A\u4E49\u6A21\u578B\u5FC5\u987B\u81EA\u5DF1\u58F0\u660E\u6863\u4F4D\u3002** \u63D2\u4EF6\u4E0D\u4F1A\u4E5F\u4E0D\u80FD\u66FF\u7528\u6237\u53D1\u660E\u6863\u4F4D\u2014\u2014\u63D0\u4EA4\u672A\u58F0\u660E\u7684\u6863\u4F4D\u4F1A\u88AB DSH \u4EE5 `UNSUPPORTED_REASONING_EFFORT` \u62D2\u7EDD\u3002\n\n# \u8981\u5199\u4EC0\u4E48\n\n\u5728 `{{CONFIG_FILE}}` \u7684 `{{ENTRY_PATH}}` \u5217\u8868\u91CC\u627E\u5230\u8BE5\u6A21\u578B\u7684\u6761\u76EE\uFF0C\u52A0\u4E00\u4E2A `reasoningEfforts`\u3002\u8BE5\u8DEF\u5F84\u7531\u5F53\u524D DSH Host \u8FD4\u56DE\uFF0C\u65E7\u7248\u53EF\u80FD\u4F7F\u7528 `settings.yaml`\uFF0C\u65B0\u7248\u53EF\u80FD\u4F7F\u7528 Profile \u7684 `cordis.patch.yml`\uFF1A\n\n```yaml\n- id: <\u6A21\u578B id>\n  reasoningEfforts:      # \u952E = DSH \u6863\u4F4D\uFF1B\u503C = \u7AEF\u70B9\u5B9E\u9645\u63A5\u53D7\u7684\u5199\u6CD5\n    low: "low"\n    high: "high"\n```\n\n\u89C4\u5219\uFF1A\n\n1. **\u952E\u53EA\u80FD\u662F DSH \u6863\u4F4D**\uFF1A`off`\u3001`minimal`\u3001`low`\u3001`medium`\u3001`high`\u3001`xhigh`\u3001`max`\u3002\n2. **\u503C\u662F\u7AEF\u70B9\u81EA\u5DF1\u7684\u5199\u6CD5**\uFF1A\u7AEF\u70B9\u6587\u6863\u8BF4\u5B83\u7684 `reasoning_effort` \u63A5\u53D7 `"high"` / `"max"`\uFF0C\u5C31\u5199 `high: "high"`\u3001`max: "max"`\u3002\n3. **\u6CA1\u5199\u7684\u6863\u4F4D\u4E00\u5F8B\u89C6\u4E3A\u4E0D\u652F\u6301**\uFF08\u89E3\u6790\u65F6\u88AB\u56FA\u5B9A\u4E3A\u4E0D\u652F\u6301\uFF09\uFF0C\u6240\u4EE5\u53EA\u5199\u7AEF\u70B9\u786E\u5B9E\u63D0\u4F9B\u7684\u6863\u4F4D\u3002\n4. \u6A21\u578B\u5B8C\u5168\u4E0D\u63A8\u7406\u65F6\u5199 `reasoningEfforts: false`\uFF1B**\u4E0D\u8981\u5199\u7A7A\u7684 `reasoningEfforts:` \u6216 `{}`**\uFF0C\u90A3\u4F1A\u76F4\u63A5\u62A5\u9519\u3002\n5. `off` \u662F\u7279\u4F8B\uFF1A\u5199 `off:`\uFF08\u503C\u7559\u7A7A\uFF09\u8868\u793A"\u652F\u6301\u5173\u95ED\uFF0C\u4E14\u5173\u95ED\u65F6\u4E0D\u53D1\u4EFB\u4F55\u53C2\u6570"\uFF1B\u5B8C\u5168\u4E0D\u5199 `off` \u8868\u793A"\u4E0D\u652F\u6301\u5173\u95ED"\u3002\n6. \u81F3\u5C11\u8981\u4E24\u6863\uFF0C\u63D2\u4EF6\u624D\u663E\u793A\u6ED1\u5757\u3002\n\n# compat\uFF1A\u53EA\u5728\u7AEF\u70B9\u9700\u8981\u65F6\u624D\u5199\n\n`compat` \u4E0E `reasoningEfforts` \u5E73\u7EA7\u3002\u4E0D\u5199\u65F6\u9002\u914D\u5668\u6309\u7AEF\u70B9\u5730\u5740\u81EA\u884C\u5224\u65AD\uFF1A\u5B83\u4E0D\u8BA4\u8BC6\u7684\u5730\u5740\u6309\u6807\u51C6 OpenAI \u5904\u7406\uFF0C\u8BA4\u8BC6\u7684\u5382\u5546\u7AEF\u70B9\u81EA\u52A8\u5957\u7528\u8BE5\u5382\u5546\u7684\u683C\u5F0F\u2014\u2014**\u6240\u4EE5\u5199\u9519\u683C\u5F0F\u6BD4\u4E0D\u5199\u66F4\u7CDF**\u3002\n\n| \u7AEF\u70B9\u884C\u4E3A | \u5199\u4EC0\u4E48 |\n| --- | --- |\n| \u76F4\u63A5\u7528 `reasoning_effort` \u8868\u8FBE\u5F3A\u5EA6 | \u4EC0\u4E48\u90FD\u4E0D\u7528\u5199 |\n| \u8981\u5148\u53D1\u601D\u8003\u5F00\u5173\u624D\u8BA4\u5F3A\u5EA6 | `compat: { thinkingFormat: "qwen" }` \u53D1 `enable_thinking` + `reasoning_effort`\uFF1B`"zai"` \u53D1 `thinking: {type: enabled}` + `reasoning_effort`\uFF1B`"deepseek"` \u53D1 `thinking: {type: enabled}` |\n| \u4E0D\u63A5\u53D7 `reasoning_effort` | `compat: { supportsReasoningEffort: false }` |\n| \u8BF7\u6C42\u8FD4\u56DE 400 `invalid_parameter_error` | `compat: { supportsDeveloperRole: false }`\uFF0C\u7CFB\u7EDF\u63D0\u793A\u6539\u53D1 `system` \u89D2\u8272 |\n| \u56DE\u653E\u5386\u53F2\u6D88\u606F\u62A5\u9519 | `compat: { requiresReasoningContentOnAssistantMessages: true }` |\n| \u7AEF\u70B9\u53EA\u8BA4 `<thinking>` \u6587\u672C | `compat: { requiresThinkingAsText: true }` |\n\n**\u6CE8\u610F\u534F\u8BAE**\uFF1A\u8FD9\u4E9B `compat` \u5B57\u6BB5\u53EA\u5728 `api: openai-completions` \u7684\u8DEF\u7531\u4E0A\u6709\u6548\u3002\u5982\u679C\u8BE5\u6A21\u578B\u6240\u5728\u8DEF\u7531\u662F\u522B\u7684\u534F\u8BAE\uFF08\u4F8B\u5982 `anthropic-messages`\uFF09\u800C\u5199\u4E86\u5B83\u4EEC\uFF0CDSH \u4E0D\u662F\u5FFD\u7565\u800C\u662F**\u76F4\u63A5\u62A5\u9519**\uFF0C\u6574\u6761 provider \u8DEF\u7531\u4F1A\u89E3\u6790\u5931\u8D25\u5E76\u4ECE\u6A21\u578B\u83DC\u5355\u91CC\u6D88\u5931\u3002\n\n# \u600E\u4E48\u786E\u8BA4\u6539\u5BF9\u4E86\n\n1. \u4FDD\u5B58 `{{CONFIG_FILE}}`\u3002DSH \u4F1A\u81EA\u52A8\u91CD\u8F7D\uFF1B\u82E5\u6CA1\u751F\u6548\uFF0C\u91CD\u542F Web Host \u5E76\u5237\u65B0\u9875\u9762\u3002\n2. \u6253\u5F00\u6A21\u578B\u83DC\u5355\uFF1A\u51FA\u73B0\u63A8\u7406\u5F3A\u5EA6\u6ED1\u5757 = \u76EE\u5F55\u5DF2\u7ECF\u8BFB\u5230\u6863\u4F4D\u3002\n3. \u6ED1\u5757\u51FA\u73B0\u4F46\u8BF7\u6C42\u5931\u8D25\uFF1A\u51E0\u4E4E\u603B\u662F `compat` \u5199\u9519\uFF0C\u6216\u6863\u4F4D\u53D6\u503C\u7AEF\u70B9\u4E0D\u8BA4\uFF0C\u6309\u4E0A\u8868\u9010\u9879\u6392\u67E5\u3002\n4. \u8BE5\u8DEF\u7531\u6574\u6761\u4ECE\u83DC\u5355\u91CC\u6D88\u5931\uFF1A\u8BF4\u660E\u5199\u4E86\u5F53\u524D\u534F\u8BAE\u4E0D\u63A5\u53D7\u7684 `compat` \u5B57\u6BB5\uFF0C\u5148\u5220\u6389\u5B83\u3002\n\n# \u4E0D\u8981\u505A\u7684\u4E8B\n\n- \u4E0D\u8981\u53D1\u660E\u6863\u4F4D\u53D6\u503C\u3002\u4E0D\u786E\u5B9A\u5C31\u67E5\u7AEF\u70B9\u6587\u6863\uFF0C\u6216\u76F4\u63A5\u95EE\u7528\u6237\u3002\n- \u4E0D\u8981\u6539\u52A8\u8BE5\u6A21\u578B\u6761\u76EE\u4EE5\u5916\u7684\u4EFB\u4F55\u914D\u7F6E\uFF1B`name`\u3001`contextWindow`\u3001`maxTokens` \u7B49\u5DF2\u6709\u5B57\u6BB5\u4FDD\u6301\u539F\u6837\u3002\n- \u4E0D\u8981\u91CD\u590D\u6DFB\u52A0\u4E00\u4EFD `llm-pi-ai` \u914D\u7F6E\u3002\n- \u4E0D\u8981\u4E3A\u4E86\u7ED5\u8FC7\u95EE\u9898\u66F4\u6362 provider\uFF08\u9664\u975E\u7528\u6237\u660E\u786E\u8981\u6C42\uFF09\u3002\n';

// src/client/index.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var ADAPT_CHANNEL = "/dsh-reasoning-effort";
function templateSnippet(t, modelIndent) {
  const fieldPrefix = " ".repeat(modelIndent + 2);
  const valuePrefix = " ".repeat(modelIndent + 4);
  return [
    `${fieldPrefix}reasoningEfforts:`,
    `${valuePrefix}low: "low"        # ${t("yaml.keyComment")}`,
    `${valuePrefix}high: "high"      # ${t("yaml.valueComment")}`,
    `${fieldPrefix}# ${t("yaml.compatComment")}`,
    `${fieldPrefix}# compat:`,
    `${fieldPrefix}#   thinkingFormat: "qwen"`,
    `${fieldPrefix}#   supportsReasoningEffort: false`,
    `${fieldPrefix}#   supportsDeveloperRole: false`
  ].join("\n");
}
function configDocumentName(path) {
  return path?.split(/[\\/]/u).at(-1) || "settings.yaml";
}
function guidanceNote(guidance, t) {
  if (guidance.note !== null) return guidance.note;
  if (guidance.noteKey === "glm52") return t("knowledge.glm52");
  if (guidance.noteKey === "kimiK3") return t("knowledge.kimiK3");
  return t("knowledge.unknown");
}
function guidanceWarning(guidance, t) {
  return guidance.warning === "developerRole" ? t("warning.developerRole") : null;
}
function guidanceSnippet(guidance, t) {
  const block = guidance.fieldBlock ?? templateSnippet(t, guidance.modelIndent);
  return guidance.entryHead === null ? block : `${guidance.entryHead}
${block}`;
}
function agentBrief(guidance, snippet, tutorial, warning, t) {
  const facts = [
    t("agent.facts", {
      provider: guidance.provider,
      model: guidance.model,
      path: guidance.settingsPath ?? "-",
      entryPath: guidance.entryPath,
      entryLine: guidance.entryLine,
      current: levelsText(guidance.current, t),
      expected: guidance.matched ? levelsText(guidance.expected, t) : t("level.none")
    }),
    ...warning === null ? [] : [t("agent.warningLine", { warning })]
  ].join("\n");
  return [
    t("agent.intro"),
    "",
    t("agent.factsHeading"),
    facts,
    "",
    t("agent.task"),
    "",
    "---",
    "",
    tutorial.replace(/\r\n/gu, "\n").replaceAll("{{CONFIG_FILE}}", configDocumentName(guidance.settingsPath)).replaceAll("{{ENTRY_PATH}}", guidance.entryPath).trim(),
    "",
    `## ${t("agent.snippetHeading")}`,
    "",
    "```yaml",
    snippet,
    "```",
    ""
  ].join("\n");
}
function makeAdaptationService(rpc) {
  if (rpc === void 0) return null;
  const call = async (endpoint, payload) => {
    try {
      const result = await rpc.call(ADAPT_CHANNEL, endpoint, payload);
      return result.ok ? result.value : null;
    } catch {
      return null;
    }
  };
  return {
    diagnose: (provider, model) => call("diagnose", { provider, model })
  };
}
async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      const ok = document.execCommand("copy");
      textarea.remove();
      return ok;
    } catch {
      return false;
    }
  }
}
var SLOT = "conversation.input.model";
var SETTINGS_SLOT = "settings.general.item";
var ENABLED_STORAGE_KEY = "dsh-reasoning-effort.enabled";
var LEGACY_ENABLED_STORAGE_KEY = "@dsh-external/dsh-reasoning-effort.enabled";
var PALETTE_STORAGE_KEY = "dsh-reasoning-effort.palette";
var inject = ["slots", "modelDirectories", "connection", "locale", "remote", "remote.session"];
function readEnabledPreference() {
  try {
    const current = window.localStorage.getItem(ENABLED_STORAGE_KEY);
    const stored = current ?? window.localStorage.getItem(LEGACY_ENABLED_STORAGE_KEY);
    return stored !== "false";
  } catch {
    return true;
  }
}
var enabledPreference = readEnabledPreference();
var enabledListeners = /* @__PURE__ */ new Set();
var enabledStore = {
  getSnapshot: () => enabledPreference,
  subscribe: (listener) => {
    enabledListeners.add(listener);
    return () => enabledListeners.delete(listener);
  },
  set: (enabled, persist = true) => {
    if (enabledPreference === enabled) return;
    enabledPreference = enabled;
    if (persist) {
      try {
        window.localStorage.setItem(ENABLED_STORAGE_KEY, String(enabled));
      } catch {
      }
    }
    enabledListeners.forEach((listener) => listener());
  }
};
function validPalette(id) {
  return /^#[0-9a-f]{6}$/i.test(id) || PALETTES.some((palette) => palette.id === id);
}
function paletteColor(id) {
  return /^#[0-9a-f]{6}$/i.test(id) ? id : paletteOrDefault(id).accent;
}
function readPalettePreference() {
  try {
    const stored = window.localStorage.getItem(PALETTE_STORAGE_KEY);
    return stored !== null && validPalette(stored) ? stored : DEFAULT_PALETTE_ID;
  } catch {
    return DEFAULT_PALETTE_ID;
  }
}
var palettePreference = readPalettePreference();
var paletteListeners = /* @__PURE__ */ new Set();
var paletteStore = {
  getSnapshot: () => palettePreference,
  subscribe: (listener) => {
    paletteListeners.add(listener);
    return () => paletteListeners.delete(listener);
  },
  set: (id, persist = true) => {
    const next = validPalette(id) ? id : DEFAULT_PALETTE_ID;
    if (palettePreference === next) return;
    palettePreference = next;
    if (persist) {
      try {
        window.localStorage.setItem(PALETTE_STORAGE_KEY, next);
      } catch {
      }
    }
    paletteListeners.forEach((listener) => listener());
  }
};
function currentModel(state) {
  if (state.current === null) return void 0;
  const group = state.groups.find((candidate) => candidate.id === state.current?.provider);
  return group?.models.find((candidate) => candidate.id === state.current?.model);
}
function sliderLevels(state) {
  const efforts = currentModel(state)?.reasoning?.efforts;
  if (efforts === void 0) return [];
  return effortStops(efforts.map((effort) => effort.id));
}
function effortIndex(levels, id) {
  return stopIndex(levels, id);
}
function clampIndex(value, count) {
  return Math.max(0, Math.min(count - 1, Math.round(value)));
}
function effectiveEffortIndex(levels, state) {
  const reasoning = currentModel(state)?.reasoning;
  const current = effortIndex(levels, state.current?.reasoningEffort);
  if (current >= 0) return current;
  const fallback = effortIndex(levels, reasoning?.defaultEffort);
  if (fallback >= 0) return fallback;
  return Math.floor((levels.length - 1) / 2);
}
function EffortSlider({ directory, t }) {
  const directoryState = (0, import_react.useSyncExternalStore)(
    (notify) => directory.store.subscribe(notify),
    () => directory.store.getSnapshot()
  );
  const levels = (0, import_react.useMemo)(() => sliderLevels(directoryState), [directoryState]);
  const [effort, setEffort] = (0, import_react.useState)("");
  const [preview, setPreview] = (0, import_react.useState)(0);
  const [committing, setCommitting] = (0, import_react.useState)(false);
  const [dragging, setDragging] = (0, import_react.useState)(false);
  const [localError, setLocalError] = (0, import_react.useState)(null);
  const palette = (0, import_react.useSyncExternalStore)(paletteStore.subscribe, paletteStore.getSnapshot);
  const canvasRef = (0, import_react.useRef)(null);
  const inputRef = (0, import_react.useRef)(null);
  const committedRef = (0, import_react.useRef)("");
  const committedIndexRef = (0, import_react.useRef)(-1);
  const syncedModelRef = (0, import_react.useRef)("");
  const previewFrameRef = (0, import_react.useRef)(null);
  const pendingPreviewRef = (0, import_react.useRef)(0);
  const committingRef = (0, import_react.useRef)(false);
  const previewRef = (0, import_react.useRef)(0);
  const draggingRef = (0, import_react.useRef)(false);
  const pointerActiveRef = (0, import_react.useRef)(false);
  const activePointerIdRef = (0, import_react.useRef)(null);
  const globalPointerMoveRef = (0, import_react.useRef)(null);
  const globalPointerEndRef = (0, import_react.useRef)(null);
  const globalPointerCancelRef = (0, import_react.useRef)(null);
  const pixelsRef = (0, import_react.useRef)(null);
  const invalidEffort = unsupportedEffort(directoryState.current?.reasoningEffort, currentModel(directoryState)?.reasoning?.efforts);
  const available = directoryState.current !== null && levels.length >= 2;
  const busy = committing || directoryState.status === "selecting";
  const error = localError ?? directoryState.error;
  (0, import_react.useEffect)(() => {
    if (!available || committingRef.current || draggingRef.current) return;
    const modelKey = JSON.stringify([directoryState.current?.provider, directoryState.current?.model]);
    const accepted = syncedModelRef.current === modelKey ? acceptedStopIndex(levels, directoryState.current?.reasoningEffort, committedIndexRef.current) : -1;
    const index = accepted >= 0 ? accepted : effectiveEffortIndex(levels, directoryState);
    const next = levels[index]?.send ?? "";
    syncedModelRef.current = modelKey;
    committedIndexRef.current = index;
    committedRef.current = next;
    previewRef.current = index;
    setEffort(next);
    setPreview(index);
    setLocalError(null);
  }, [available, levels, directoryState]);
  (0, import_react.useEffect)(() => {
    directory.load().catch(() => void 0);
  }, [directory]);
  (0, import_react.useEffect)(() => {
    const canvas = canvasRef.current;
    if (canvas === null) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pixels = new PixelField(canvas, reduced);
    pixelsRef.current = pixels;
    pixels.setColor(paletteColor(paletteStore.getSnapshot()));
    const resize = new ResizeObserver(() => pixels.resize());
    if (canvas.parentElement) resize.observe(canvas.parentElement);
    const sync = () => pixels.sync();
    document.addEventListener("visibilitychange", sync);
    reduced.addEventListener("change", sync);
    return () => {
      pixels.setActive(false);
      pixels.sync();
      resize.disconnect();
      document.removeEventListener("visibilitychange", sync);
      reduced.removeEventListener("change", sync);
      pixelsRef.current = null;
    };
  }, [available]);
  (0, import_react.useEffect)(() => {
    pixelsRef.current?.setColor(paletteColor(palette));
  }, [available, palette]);
  const topPreview = invalidEffort === void 0 && clampIndex(preview, levels.length) === levels.length - 1;
  (0, import_react.useEffect)(() => {
    pixelsRef.current?.setActive(topPreview);
  }, [available, topPreview]);
  const commit = (0, import_react.useCallback)(async (raw) => {
    if (committingRef.current) return;
    committingRef.current = true;
    const previous = committedRef.current;
    const previousIndex = committedIndexRef.current;
    setDragging(false);
    setCommitting(true);
    setLocalError(null);
    const optimisticIndex = clampIndex(raw, levels.length);
    const optimistic = levels[optimisticIndex]?.id;
    if (optimistic !== void 0) {
      previewRef.current = optimisticIndex;
      setPreview(optimisticIndex);
      setEffort(optimistic);
    }
    try {
      const models = await directory.load();
      if (models.current === null) throw new Error(t("effort.unavailable"));
      const fresh = {
        ...directory.store.getSnapshot(),
        current: models.current,
        routable: models.routable,
        groups: models.groups,
        failures: models.failures,
        status: "ready",
        error: null
      };
      const freshLevels = sliderLevels(fresh);
      const index = clampIndex(raw, freshLevels.length);
      const next = freshLevels[index]?.send;
      if (next === void 0) throw new Error(t("effort.unavailable"));
      previewRef.current = index;
      setPreview(index);
      setEffort(next);
      const result = await directory.select({
        provider: models.current.provider,
        model: models.current.model,
        reasoningEffort: next
      });
      requireAcceptedSelection(result);
      const snapshot = directory.store.getSnapshot();
      const accepted = acceptedStopIndex(freshLevels, snapshot.current?.reasoningEffort, index);
      const settled = accepted >= 0 ? accepted : index;
      const settledId = freshLevels[settled]?.send ?? next;
      committedIndexRef.current = settled;
      syncedModelRef.current = JSON.stringify([models.current.provider, models.current.model]);
      committedRef.current = settledId;
      previewRef.current = settled;
      setEffort(settledId);
      setPreview(settled);
    } catch (cause) {
      const restore = Math.max(0, acceptedStopIndex(levels, previous, previousIndex));
      committedIndexRef.current = restore;
      committedRef.current = previous;
      previewRef.current = restore;
      setEffort(previous);
      setPreview(restore);
      setLocalError(cause instanceof Error ? cause.message : String(cause));
    } finally {
      committingRef.current = false;
      setCommitting(false);
    }
  }, [directory, levels]);
  const rawFromPointer = (input, clientX) => {
    const bounds = input.getBoundingClientRect();
    if (bounds.width <= 0 || levels.length < 2) return previewRef.current;
    return Math.max(
      0,
      Math.min(levels.length - 1, (clientX - bounds.left) / bounds.width * (levels.length - 1))
    );
  };
  const showPointerPreview = (raw) => {
    previewRef.current = raw;
    setPreview(raw);
    setEffort(levels[clampIndex(raw, levels.length)]?.send ?? "");
  };
  const queuePointerPreview = (raw) => {
    pendingPreviewRef.current = raw;
    if (previewFrameRef.current !== null) return;
    previewFrameRef.current = requestAnimationFrame(() => {
      previewFrameRef.current = null;
      showPointerPreview(pendingPreviewRef.current);
    });
  };
  const beginDragging = (input, pointerId, clientX) => {
    pointerActiveRef.current = true;
    activePointerIdRef.current = pointerId;
    draggingRef.current = true;
    setDragging(true);
    showPointerPreview(rawFromPointer(input, clientX));
    try {
      if (!input.hasPointerCapture(pointerId)) input.setPointerCapture(pointerId);
    } catch {
    }
  };
  const moveDragging = (input, pointerId, clientX) => {
    if (!pointerActiveRef.current || activePointerIdRef.current !== pointerId) return;
    queuePointerPreview(rawFromPointer(input, clientX));
  };
  const endDrag = (input, pointerId) => {
    if (pointerId !== void 0 && activePointerIdRef.current !== pointerId) return false;
    if (previewFrameRef.current !== null) cancelAnimationFrame(previewFrameRef.current);
    previewFrameRef.current = null;
    pointerActiveRef.current = false;
    activePointerIdRef.current = null;
    draggingRef.current = false;
    setDragging(false);
    if (input !== null && pointerId !== void 0 && input.hasPointerCapture(pointerId)) {
      input.releasePointerCapture(pointerId);
    }
    return true;
  };
  const stopDragging = (input, pointerId, clientX) => {
    if (!pointerActiveRef.current) return;
    if (pointerId !== void 0 && activePointerIdRef.current !== pointerId) return;
    const raw = clientX === void 0 ? previewRef.current : rawFromPointer(input, clientX);
    endDrag(input, pointerId);
    showPointerPreview(raw);
    void commit(raw);
  };
  const cancelDragging = (input, pointerId) => {
    if (!endDrag(input, pointerId)) return;
    showPointerPreview(Math.max(0, acceptedStopIndex(levels, committedRef.current, committedIndexRef.current)));
  };
  globalPointerMoveRef.current = (event) => {
    const input = inputRef.current;
    if (input !== null) moveDragging(input, event.pointerId, event.clientX);
  };
  globalPointerEndRef.current = (event) => {
    const input = inputRef.current;
    if (input !== null) stopDragging(input, event.pointerId, event.clientX);
  };
  globalPointerCancelRef.current = (event) => {
    if (activePointerIdRef.current !== event.pointerId) return;
    cancelDragging(inputRef.current, event.pointerId);
  };
  (0, import_react.useEffect)(() => {
    const move = (event) => globalPointerMoveRef.current?.(event);
    const end = (event) => globalPointerEndRef.current?.(event);
    const cancel = (event) => globalPointerCancelRef.current?.(event);
    window.addEventListener("pointermove", move, true);
    window.addEventListener("pointerup", end, true);
    window.addEventListener("pointercancel", cancel, true);
    return () => {
      if (previewFrameRef.current !== null) cancelAnimationFrame(previewFrameRef.current);
      window.removeEventListener("pointermove", move, true);
      window.removeEventListener("pointerup", end, true);
      window.removeEventListener("pointercancel", cancel, true);
    };
  }, []);
  const onKeyDown = (event) => {
    const current = clampIndex(Number(event.currentTarget.value), levels.length);
    let target;
    if (event.key === "ArrowLeft" || event.key === "ArrowDown" || event.key === "PageDown") {
      target = Math.max(0, current - 1);
    } else if (event.key === "ArrowRight" || event.key === "ArrowUp" || event.key === "PageUp") {
      target = Math.min(levels.length - 1, current + 1);
    } else if (event.key === "Home") {
      target = 0;
    } else if (event.key === "End") {
      target = levels.length - 1;
    }
    if (target === void 0) return;
    event.preventDefault();
    void commit(target);
  };
  if (!available) return null;
  const count = levels.length;
  const effortIndexValue = effortIndex(levels, effort);
  const effortName = effortIndexValue < 0 ? effort : displayLevelName(effort, levelIds(levels), t);
  const isTop = invalidEffort === void 0 && clampIndex(preview, count) === count - 1;
  const progress = preview / (count - 1) * 100;
  const style = { "--re-progress": `${progress}%`, "--re-strength": `${25 + progress * 0.75}%` };
  const previewStop = levels[clampIndex(preview, count)];
  const showInvalid = invalidEffort !== void 0 && !dragging && !committing;
  const previewName = showInvalid ? t("effort.invalid", { effort: invalidEffort }) : previewStop === void 0 ? effortName : displayLevelName(previewStop.id, levelIds(levels), t);
  const previewSends = !showInvalid && previewStop !== void 0 && !previewStop.native ? previewStop.send : null;
  const title = showInvalid ? t("effort.reselect", { effort: invalidEffort }) : error === null ? t("effort.title", { effort: previewSends === null ? previewName : `${previewName} \u2192 ${previewSends}` }) : t("effort.failed", { error });
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "div",
    {
      className: `re-effort re-depth has-readout${dragging ? " is-dragging" : ""}${busy ? " is-busy" : ""}${error === null ? "" : " is-error"}`,
      "data-palette": palette,
      "data-top": isTop ? "true" : void 0,
      style: { "--re-accent": paletteColor(palette) },
      title,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "re-depth-header", "aria-hidden": "true", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "re-depth-label", children: t("effort.label") }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "re-depth-value", children: [
            previewName,
            previewSends === null ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "re-depth-send", children: ` \u2192 ${previewSends}` })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "re-depth-speed", "aria-hidden": "true", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("effort.faster") }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("effort.smarter") })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
          "div",
          {
            className: "re-depth-slider",
            "data-top": isTop ? "true" : void 0,
            style,
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "re-depth-track", "aria-hidden": "true" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", { ref: canvasRef, className: "re-depth-canvas", hidden: !isTop, "aria-hidden": "true" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                "input",
                {
                  ref: inputRef,
                  className: "re-depth-input",
                  type: "range",
                  min: "0",
                  max: count - 1,
                  step: "0.01",
                  value: preview,
                  disabled: busy,
                  "aria-label": t("effort.label"),
                  "aria-valuetext": previewName,
                  onChange: (event) => {
                    if (pointerActiveRef.current || committingRef.current) return;
                    const raw = Number(event.currentTarget.value);
                    showPointerPreview(raw);
                  },
                  onPointerDown: (event) => {
                    event.preventDefault();
                    event.currentTarget.focus();
                    beginDragging(event.currentTarget, event.pointerId, event.clientX);
                  },
                  onBlur: (event) => {
                    stopDragging(event.currentTarget);
                  },
                  onKeyDown
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "re-depth-thumb", "aria-hidden": "true" })
            ]
          }
        ),
        error === null ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "re-effort-sr", role: "status", children: error })
      ]
    }
  );
}
function AdvancedModelSelect({
  locked,
  available,
  controller,
  directory,
  load,
  select,
  adapt,
  agentTutorial,
  t
}) {
  const state = (0, import_react.useSyncExternalStore)(
    (notify) => directory.subscribe(notify),
    () => directory.getSnapshot()
  );
  const palette = (0, import_react.useSyncExternalStore)(paletteStore.subscribe, paletteStore.getSnapshot);
  const [open, setOpen] = (0, import_react.useState)(false);
  const [modelsOpen, setModelsOpen] = (0, import_react.useState)(false);
  const [guidanceResult, setGuidanceResult] = (0, import_react.useState)(null);
  const [guidanceBusy, setGuidanceBusy] = (0, import_react.useState)(false);
  const [guidanceFailed, setGuidanceFailed] = (0, import_react.useState)(false);
  const [panelOpen, setPanelOpen] = (0, import_react.useState)(false);
  const [copied, setCopied] = (0, import_react.useState)(false);
  const [agentCopied, setAgentCopied] = (0, import_react.useState)(false);
  const rootRef = (0, import_react.useRef)(null);
  const triggerRef = (0, import_react.useRef)(null);
  const menuRef = (0, import_react.useRef)(null);
  (0, import_react.useLayoutEffect)(() => {
    if (!open || rootRef.current === null || menuRef.current === null) return;
    return positionModelMenu(rootRef.current, menuRef.current);
  }, [open]);
  const choice = currentModel(state);
  const levels = sliderLevels(state);
  const currentLevel = levels[effectiveEffortIndex(levels, state)];
  const invalidEffort = choice === void 0 ? void 0 : unsupportedEffort(state.current?.reasoningEffort, choice.reasoning?.efforts);
  const effortName = invalidEffort !== void 0 ? t("effort.invalid", { effort: invalidEffort }) : currentLevel === void 0 ? t("model.defaultEffort") : displayLevelName(currentLevel.id, levelIds(levels), t);
  const modelLabel = choice?.name ?? state.current?.model ?? t("model.select");
  const busy = state.status === "loading" || state.status === "selecting";
  const provider = state.current?.provider;
  const modelId = state.current?.model;
  const guidance = guidanceResult?.provider === provider && guidanceResult?.model === modelId ? guidanceResult : null;
  const localizedNote = guidance === null ? "" : guidanceNote(guidance, t);
  const localizedWarning = guidance === null ? null : guidanceWarning(guidance, t);
  const localizedSnippet = guidance === null ? "" : guidanceSnippet(guidance, t);
  (0, import_react.useEffect)(() => {
    if (!available) return;
    load();
  }, [available, load]);
  (0, import_react.useEffect)(() => {
    if (!open) return;
    const closeOutside = (event) => {
      if (!rootRef.current?.contains(event.target)) {
        setOpen(false);
        setModelsOpen(false);
      }
    };
    document.addEventListener("mousedown", closeOutside);
    return () => document.removeEventListener("mousedown", closeOutside);
  }, [open]);
  (0, import_react.useEffect)(() => {
    setGuidanceResult(null);
    setCopied(false);
    setAgentCopied(false);
    setPanelOpen(false);
    if (provider === void 0 || modelId === void 0) {
      setGuidanceBusy(false);
      setGuidanceFailed(false);
      return;
    }
    if (adapt === null) {
      setGuidanceBusy(false);
      setGuidanceFailed(true);
      return;
    }
    let cancelled = false;
    setGuidanceBusy(true);
    setGuidanceFailed(false);
    adapt.diagnose(provider, modelId).then((result) => {
      if (cancelled) return;
      setGuidanceResult(result);
      setGuidanceFailed(result === null);
      setGuidanceBusy(false);
      if (result === null || !result.needsGuide) setPanelOpen(false);
    }, () => {
      if (cancelled) return;
      setGuidanceResult(null);
      setGuidanceFailed(true);
      setGuidanceBusy(false);
    });
    return () => {
      cancelled = true;
    };
  }, [adapt, provider, modelId]);
  if (!available) return null;
  const close = (restoreFocus = false) => {
    setOpen(false);
    setModelsOpen(false);
    if (restoreFocus) queueMicrotask(() => triggerRef.current?.focus());
  };
  const onKeyDown = (event) => {
    if (event.key !== "Escape" || !open) return;
    event.preventDefault();
    if (modelsOpen) setModelsOpen(false);
    else close(true);
  };
  const chooseModel = async (provider2, model, defaultEffort) => {
    if (state.current?.provider === provider2 && state.current.model === model) {
      setModelsOpen(false);
      return;
    }
    const accepted = await select({
      provider: provider2,
      model,
      ...defaultEffort === void 0 ? {} : { reasoningEffort: defaultEffort }
    });
    if (accepted) setModelsOpen(false);
  };
  const recoveryEffort = choice?.reasoning?.defaultEffort ?? choice?.reasoning?.efforts[0]?.id;
  const invalidEffortNotice = invalidEffort === void 0 ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "re-model-error", role: "alert", children: [
    t("effort.reselect", { effort: invalidEffort }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "button", disabled: busy, onClick: () => {
      if (state.current === null) return;
      void select({
        provider: state.current.provider,
        model: state.current.model,
        ...recoveryEffort === void 0 ? {} : { reasoningEffort: recoveryEffort }
      });
    }, children: t("effort.use", { effort: recoveryEffort ?? t("model.defaultEffort") }) })
  ] });
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { ref: rootRef, className: "re-model-root", style: { "--re-accent": paletteColor(palette) }, onKeyDown, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      "button",
      {
        ref: triggerRef,
        type: "button",
        className: "re-model-trigger",
        "aria-label": t("model.aria", { model: modelLabel, effort: effortName }),
        "aria-haspopup": "menu",
        "aria-expanded": open,
        title: `${modelLabel} \xB7 ${effortName}`,
        disabled: locked,
        onClick: () => {
          if (open) close();
          else {
            setOpen(true);
            setModelsOpen(false);
            load();
          }
        },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "re-model-name", children: modelLabel }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "re-model-effort", children: effortName }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "re-model-chevron", "aria-hidden": "true" })
        ]
      }
    ),
    open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { ref: menuRef, className: "re-model-menu", "data-depth-card": !modelsOpen && levels.length >= 2 && !guidance?.needsGuide ? "true" : void 0, role: "menu", "aria-label": t("model.menuAria"), "aria-busy": busy, children: modelsOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "re-model-pane", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", { type: "button", className: "re-model-back", onClick: () => setModelsOpen(false), children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { "aria-hidden": "true", children: "\u2039" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("model.select") })
      ] }),
      state.status === "loading" && state.groups.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "re-model-status", children: t("model.loading") }) : null,
      state.groups.map((group) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "re-model-group-title", children: group.name }),
        group.models.map((model) => {
          const selected = state.current?.provider === group.id && state.current.model === model.id;
          return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
            "button",
            {
              type: "button",
              role: "menuitemradio",
              "aria-checked": selected,
              className: "re-model-option",
              disabled: busy,
              onClick: () => void chooseModel(group.id, model.id, model.reasoning?.defaultEffort),
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "re-model-option-copy", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "re-model-option-name", children: model.name }),
                  model.description === void 0 ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "re-model-option-desc", children: model.description })
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "re-model-check", "aria-hidden": "true", children: selected ? "\u2713" : "" })
              ]
            },
            model.id
          );
        })
      ] }, group.id)),
      state.status === "ready" && state.groups.every((group) => group.models.length === 0) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "re-model-status", children: t("model.none") }) : null,
      invalidEffortNotice,
      state.error === null ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "re-model-error", children: state.error })
    ] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
      levels.length >= 2 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EffortSlider, { directory: controller, t }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "re-model-status", children: t("effort.unavailable") }),
      guidance !== null && guidance.needsGuide ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "re-adapt", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "re-adapt-copy", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "re-adapt-title", children: guidance.reason === "missing" ? t("effort.unavailable") : t("guidance.mismatch") }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "re-adapt-desc", children: guidance.matched ? t("guidance.matched", {
            expected: levelsText(guidance.expected, t),
            current: levelsText(guidance.current, t),
            note: localizedNote
          }) : t("guidance.unmatched", {
            current: levelsText(guidance.current, t),
            note: localizedNote
          }) })
        ] }),
        panelOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "re-adapt-panel", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "re-adapt-scroll", children: [
            guidance.matched ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "re-adapt-panel-line", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "re-adapt-arrow", children: levelsText(guidance.current, t) }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { "aria-hidden": "true", children: "\u2192" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "re-adapt-arrow", children: levelsText(guidance.expected, t) })
            ] }) : null,
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "re-adapt-howto", children: t("guidance.howto") }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "re-adapt-switch-intro", children: t("guidance.switch.intro") }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", { className: "re-adapt-switches", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: t("guidance.switch.thinkingFormat") }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: t("guidance.switch.reasoningEffort") }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: t("guidance.switch.developerRole") }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: t("guidance.switch.replay") })
            ] }),
            localizedWarning === null ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "re-adapt-warning", children: localizedWarning }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "re-adapt-label", children: t("guidance.paste") }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", { className: "re-adapt-yaml", children: localizedSnippet }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "re-adapt-steps", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
                t("guidance.step1.open"),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: configDocumentName(guidance.settingsPath) }),
                guidance.settingsPath === null ? "" : t("guidance.step1.path", { path: guidance.settingsPath }),
                t("guidance.step1.find"),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: guidance.entryPath }),
                t("guidance.step1.list"),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: guidance.entryLine }),
                t("guidance.step1.end")
              ] }),
              guidance.mode === "replace" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
                t("guidance.step2.replacePrefix"),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: guidance.entryLine }),
                t("guidance.step2.replaceSuffix")
              ] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
                t("guidance.step2.insertPrefix"),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: "id" }),
                t("guidance.step2.insertSuffix")
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("guidance.step3") })
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "re-adapt-actions", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              "button",
              {
                type: "button",
                className: "re-adapt-apply",
                disabled: busy || guidanceBusy,
                onClick: () => {
                  void copyText(localizedSnippet).then((ok) => setCopied(ok));
                },
                children: copied ? t("guidance.copied") : t("guidance.copy")
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              "button",
              {
                type: "button",
                className: "re-adapt-agent",
                disabled: busy || guidanceBusy,
                onClick: () => {
                  void copyText(agentBrief(guidance, localizedSnippet, agentTutorial(), localizedWarning, t)).then((ok) => setAgentCopied(ok));
                },
                children: agentCopied ? t("guidance.copied") : t("agent.copy")
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "button", className: "re-adapt-cancel", onClick: () => setPanelOpen(false), children: t("guidance.collapse") })
          ] })
        ] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "re-adapt-open-row", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "button", className: "re-adapt-open", onClick: () => {
            setCopied(false);
            setPanelOpen(true);
          }, children: guidanceBusy ? t("guidance.checking") : t("guidance.open") }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "button",
            {
              type: "button",
              className: "re-adapt-agent",
              disabled: busy || guidanceBusy,
              onClick: () => {
                void copyText(agentBrief(guidance, localizedSnippet, agentTutorial(), localizedWarning, t)).then((ok) => setAgentCopied(ok));
              },
              children: agentCopied ? t("guidance.copied") : t("agent.copy")
            }
          )
        ] })
      ] }) : null,
      guidanceFailed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "re-model-status", role: "status", children: t("guidance.unavailable") }) : null,
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "re-menu-separator" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
        "button",
        {
          type: "button",
          role: "menuitem",
          className: "re-model-row",
          disabled: busy,
          onClick: () => setModelsOpen(true),
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "re-model-row-name", children: modelLabel }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "re-model-row-effort", children: effortName }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "re-row-chevron", "aria-hidden": "true", children: "\u203A" })
          ]
        }
      ),
      invalidEffortNotice,
      state.error === null ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "re-model-error", children: state.error })
    ] }) }) : null
  ] });
}
function ReasoningEffortSetting({ t }) {
  const enabled = (0, import_react.useSyncExternalStore)(enabledStore.subscribe, enabledStore.getSnapshot);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "re-setting-row", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "re-setting-copy", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "re-setting-title", children: t("settings.effort.title") }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "re-setting-description", children: t("settings.effort.description") })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "re-setting-control", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "re-setting-state", children: enabled ? t("settings.enabled") : t("settings.disabled") }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "button",
        {
          type: "button",
          role: "switch",
          "aria-label": t("settings.effort.aria"),
          "aria-checked": enabled,
          className: `re-setting-switch${enabled ? " is-on" : ""}`,
          onClick: () => enabledStore.set(!enabled),
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "re-setting-switch-knob", "aria-hidden": "true" })
        }
      )
    ] })
  ] });
}
function PaletteSetting({ t }) {
  const sliderEnabled = (0, import_react.useSyncExternalStore)(enabledStore.subscribe, enabledStore.getSnapshot);
  const selected = (0, import_react.useSyncExternalStore)(paletteStore.subscribe, paletteStore.getSnapshot);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "re-setting-row", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "re-setting-copy", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "re-setting-title", children: t("settings.palette.title") }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "re-setting-description", children: t("settings.palette.description") })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "re-setting-control", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "re-palette-picker", role: "radiogroup", "aria-label": t("settings.palette.aria"), children: [
      PALETTES.map((palette) => {
        const active = palette.id === selected;
        return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "button",
          {
            type: "button",
            role: "radio",
            "aria-checked": active,
            "aria-label": t(palette.labelKey),
            title: t(palette.labelKey),
            disabled: !sliderEnabled,
            className: `re-palette-swatch${active ? " is-on" : ""}`,
            style: { background: palette.swatch, "--re-swatch-ring": palette.accent },
            onClick: () => paletteStore.set(palette.id)
          },
          palette.id
        );
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { className: "re-custom-palette", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("settings.palette.custom") }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "input",
          {
            type: "color",
            value: paletteColor(selected),
            disabled: !sliderEnabled,
            "aria-label": t("settings.palette.custom"),
            onChange: (event) => paletteStore.set(event.currentTarget.value.toLowerCase())
          }
        )
      ] })
    ] }) })
  ] });
}
function apply(ctx) {
  const modelDirectories = ctx.get("modelDirectories");
  if (modelDirectories === void 0) return;
  const connection = ctx.get("connection");
  const adapt = makeAdaptationService(connection?.rpc);
  const locale = ctx.get("locale");
  ctx.effect(() => ctx.locale.register(NS, { zh, en }), "reasoning-effort: dictionaries");
  ctx.effect(() => {
    const style = document.createElement("style");
    style.dataset.plugin = "@missher/dsh-reasoning-effort";
    style.textContent = CSS + PIXEL_CSS;
    document.head.appendChild(style);
    return () => style.remove();
  }, "reasoning-effort: styles");
  ctx.effect(() => {
    const syncStorage = (event) => {
      if (event.key === ENABLED_STORAGE_KEY) {
        enabledStore.set(event.newValue !== "false", false);
      } else if (event.key === PALETTE_STORAGE_KEY) {
        paletteStore.set(event.newValue ?? DEFAULT_PALETTE_ID, false);
      }
    };
    window.addEventListener("storage", syncStorage);
    return () => window.removeEventListener("storage", syncStorage);
  }, "reasoning-effort: preference sync");
  ctx.slots.inject(
    SETTINGS_SLOT,
    () => ctx.slots.register(
      { name: SETTINGS_SLOT, id: "reasoning-effort-enabled", order: 15, locale: NS },
      ReasoningEffortSetting
    )
  );
  ctx.slots.inject(
    SETTINGS_SLOT,
    () => ctx.slots.register(
      { name: SETTINGS_SLOT, id: "reasoning-effort-palette", order: 17, locale: NS },
      PaletteSetting
    )
  );
  ctx.slots.inject(SLOT, () => {
    let disposeModelSeat;
    const syncModelSeat = () => {
      if (!enabledStore.getSnapshot()) {
        disposeModelSeat?.();
        disposeModelSeat = void 0;
        return;
      }
      if (disposeModelSeat !== void 0) return;
      disposeModelSeat = ctx.slots.register(
        {
          name: SLOT,
          priority: -100,
          locale: NS,
          inject: (sessionId) => {
            const controller = modelDirectories.directoryFor(sessionId);
            return {
              available: true,
              controller,
              directory: controller.store,
              load: () => controller.load().then(() => void 0, () => void 0),
              select: (selection) => controller.select(selection).then((result) => {
                requireAcceptedSelection(result);
                return true;
              }).catch(() => false),
              adapt,
              // Read at copy time: a language switch must change the next copy,
              // not require the seat to remount.
              agentTutorial: () => locale?.getLocale().active === "zh" ? agent_tutorial_zh_default : agent_tutorial_en_default
            };
          }
        },
        AdvancedModelSelect
      );
    };
    const unsubscribe = enabledStore.subscribe(syncModelSeat);
    syncModelSeat();
    return () => {
      unsubscribe();
      disposeModelSeat?.();
    };
  });
}

    return module.exports;
  },
});
