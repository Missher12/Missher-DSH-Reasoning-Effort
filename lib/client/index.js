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
var import_react2 = require("react");

// src/client/locales.ts
var NS = "reasoning-effort";
var zh = {
  "level.off": "Off",
  "level.minimal": "Minimal",
  "level.low": "Low",
  "level.medium": "Medium",
  "level.high": "High",
  "level.xhigh": "XHigh",
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
  "effort.actual": "\u5B9E\u9645 {effort}",
  "effort.actualLevel": "\u5B9E\u9645\u6863\u4F4D",
  "effort.faster": "\u66F4\u5FEB",
  "effort.smarter": "\u66F4\u6DF1\u5165",
  "settings.palette.custom": "\u81EA\u5B9A\u4E49\u989C\u8272",
  "effort.choicesChanged": "\u6A21\u578B\u6216\u53EF\u7528\u6863\u4F4D\u5DF2\u53D8\u5316\uFF0C\u8BF7\u91CD\u65B0\u9009\u62E9\u3002",
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
  "guidance.copyFailed": "\u590D\u5236\u5931\u8D25\uFF0C\u91CD\u8BD5",
  "guidance.copy": "\u590D\u5236\u5B57\u6BB5\u5757",
  "guidance.collapse": "\u6536\u8D77",
  "guidance.checking": "\u68C0\u6D4B\u4E2D\u2026",
  "guidance.open": "\u67E5\u770B\u6307\u5F15",
  "guidance.unavailable": "\u6863\u4F4D\u6307\u5F15\u4E0D\u53EF\u7528\uFF1A\u4E0E Host \u7684 RPC \u901A\u9053\u6CA1\u6709\u5EFA\u7ACB\uFF0C\u65E0\u6CD5\u8BCA\u65AD\u5F53\u524D\u6A21\u578B\uFF08Host \u534A\u672A\u6CE8\u518C\u901A\u9053\u6216\u8FDE\u63A5\u5DF2\u65AD\u5F00\uFF09\u3002",
  "guidance.howto": "\u6309\u7AEF\u70B9\u7684\u5B9E\u9645\u60C5\u51B5\u586B\uFF1A\u952E\u662F DSH \u6863\u4F4D\uFF08off / minimal / low / medium / high / xhigh / max\uFF09\uFF0C\u503C\u662F\u7AEF\u70B9\u81EA\u5DF1\u63A5\u53D7\u7684\u5199\u6CD5\uFF1B\u6CA1\u5199\u7684\u6863\u4F4D\u89C6\u4E3A\u4E0D\u652F\u6301\u3002\u7AEF\u70B9\u6587\u6863\u6216\u5B83\u7684\u6A21\u578B\u5217\u8868\u901A\u5E38\u4F1A\u5217\u51FA\u63A5\u53D7\u7684\u53D6\u503C\u3002",
  "guidance.switch.intro": "\u53EA\u5728\u7AEF\u70B9\u9700\u8981\u65F6\u624D\u5199 compat\uFF08\u4E0E reasoningEfforts \u5E73\u7EA7\uFF09\uFF1A",
  "guidance.switch.thinkingFormat": '\u7AEF\u70B9\u8981\u5148\u5F00\u601D\u8003\u5F00\u5173\u624D\u8BA4\u5F3A\u5EA6 \u2192 thinkingFormat: "qwen"\uFF08\u53D1 enable_thinking\uFF09/ "zai" / "deepseek"',
  "guidance.switch.reasoningEffort": "\u7AEF\u70B9\u4E0D\u63A5\u53D7 reasoning_effort \u2192 supportsReasoningEffort: false",
  "guidance.switch.developerRole": "\u8BF7\u6C42\u8FD4\u56DE 400 invalid_parameter_error \u2192 supportsDeveloperRole: false",
  "guidance.switch.replay": "\u56DE\u653E\u5386\u53F2\u6D88\u606F\u62A5\u9519 \u2192 requiresReasoningContentOnAssistantMessages: true",
  "agent.copy": "\u590D\u5236\u7ED9 Agent",
  "agent.intro": "\u8BF7\u8865\u5168\u8FD9\u4E2A\u6A21\u578B\u7684\u63A8\u7406\u6863\u4F4D\u58F0\u660E\u3002",
  "agent.factsHeading": "## \u76EE\u6807",
  "agent.facts": "- \u6A21\u578B\uFF1A{provider} / {model}\n- \u914D\u7F6E\uFF1A{path}\n- \u4F4D\u7F6E\uFF1A{entryPath}\uFF08{entryLine}\uFF09\n- \u5F53\u524D\u6863\u4F4D\uFF1A{current}\n- \u53C2\u8003\u6863\u4F4D\uFF1A{expected}",
  "agent.warningLine": "- \u7AEF\u70B9\u63D0\u793A\uFF1A{warning}",
  "agent.snippetHeading": "\u5EFA\u8BAE\u7247\u6BB5\uFF08\u53D6\u503C\u9700\u6838\u5B9E\uFF09",
  "knowledge.glm52": "GLM-5.2 \u539F\u751F\u6863\u4F4D minimal / low / medium / high\uFF08\u667A\u8C31 z.ai \u6DF1\u5EA6\u601D\u8003\u6587\u6863\uFF09\uFF1B\u963F\u91CC\u4E91\u767E\u70BC OpenAI \u517C\u5BB9\u7AEF\u70B9\u5B9E\u6D4B\u63A5\u53D7\u8FD9\u4E9B\u53D6\u503C\u3002",
  "knowledge.kimiK3": "Kimi K3 \u5B98\u65B9\u6863\u4F4D low / high / max\uFF08Moonshot \u601D\u8003\u529B\u5EA6\u6587\u6863\uFF09\uFF0C\u4E0E pi-ai \u76EE\u5F55 moonshotai \u6761\u76EE\u4E00\u81F4\u3002",
  "knowledge.unknown": "\u77E5\u8BC6\u5E93\u6CA1\u6709\u6536\u5F55\u8FD9\u4E2A\u6A21\u578B\uFF0C\u4E0B\u9762\u662F\u53EF\u76F4\u63A5\u4FEE\u6539\u7684\u901A\u7528\u6A21\u677F\u3002",
  "warning.developerRole": "\u8FD9\u4E2A\u8DEF\u7531\u7684\u7AEF\u70B9\u662F OpenAI \u517C\u5BB9\u7F51\u5173\uFF1Api-ai \u4F1A\u628A\u5B83\u5F53\u6210\u6807\u51C6 OpenAI\uFF0C\u5BF9\u542F\u7528\u4E86\u63A8\u7406\u7684\u6A21\u578B\u7528 developer \u89D2\u8272\u53D1\u9001\u7CFB\u7EDF\u63D0\u793A\uFF0C\u90E8\u5206\u7F51\u5173\u4F1A\u4EE5 400\uFF08invalid_parameter_error\uFF09\u62D2\u7EDD\u3002\u7ED9\u8BE5\u8DEF\u7531\u52A0 compat.supportsDeveloperRole: false \u5373\u53EF\u6539\u53D1 system\u3002",
  "yaml.keyComment": "\u952E = DSH \u6863\u4F4D\u4F53\u7CFB\uFF08off/minimal/low/medium/high/xhigh/max\uFF09",
  "yaml.valueComment": "\u503C = \u7AEF\u70B9\u81EA\u5DF1\u7684\u5199\u6CD5\uFF1B\u6CA1\u5199\u7684\u6863\u4F4D\u89C6\u4E3A\u4E0D\u652F\u6301",
  "models.automatic": "\u81EA\u52A8\u8BC6\u522B",
  "models.title": "\u601D\u8003\u8BBE\u7F6E",
  "models.mode": "\u601D\u8003\u7B49\u7EA7",
  "models.inherit": "\u81EA\u52A8",
  "models.disabled": "\u4E0D\u652F\u6301\u601D\u8003",
  "models.custom": "\u81EA\u5B9A\u4E49\u4E0A\u9650",
  "models.maximum": "\u6700\u9AD8\u6863\u4F4D",
  "models.invalid": "\u6A21\u578B\u6863\u4F4D\u6682\u4E0D\u53EF\u7528\uFF0C\u8BF7\u91CD\u65B0\u83B7\u53D6\u6A21\u578B\u76EE\u5F55\u3002",
  "settings.effort.title": "\u63A8\u7406\u5F3A\u5EA6\u6ED1\u5757",
  "settings.effort.description": "\u5728\u6A21\u578B\u83DC\u5355\u4E2D\u663E\u793A\u601D\u8003\u6DF1\u5EA6\u6ED1\u5757\u548C\u52A8\u6001\u70B9\u9635\uFF0C\u6863\u4F4D\u968F\u5F53\u524D\u6A21\u578B\u81EA\u52A8\u9002\u914D",
  "settings.effort.aria": "\u542F\u7528\u63A8\u7406\u5F3A\u5EA6\u6ED1\u5757",
  "settings.palette.title": "\u63A8\u7406\u5F3A\u5EA6\u6ED1\u5757\u914D\u8272",
  "settings.palette.description": "\u7528\u4E8E\u6ED1\u8F68\u3001\u70B9\u9635\u548C\u6863\u4F4D\u6587\u5B57\u3002",
  "settings.palette.aria": "\u9009\u62E9\u63A8\u7406\u5F3A\u5EA6\u6ED1\u5757\u914D\u8272",
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
  "effort.actual": "Actual {effort}",
  "effort.actualLevel": "Model effort",
  "effort.faster": "Faster",
  "effort.smarter": "Deeper",
  "settings.palette.custom": "Custom colour",
  "effort.choicesChanged": "The model or its available levels changed. Choose a level again.",
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
  "guidance.copyFailed": "Failed. Retry",
  "guidance.copy": "Copy fields",
  "guidance.collapse": "Collapse",
  "guidance.checking": "Checking\u2026",
  "guidance.open": "View guide",
  "guidance.unavailable": "Level guidance is unavailable: no RPC channel to the Host, so this model cannot be diagnosed (the Host half registered no channel, or the connection dropped).",
  "guidance.howto": "Fill this in from what the endpoint actually accepts: each key is a DSH level (off / minimal / low / medium / high / xhigh / max) and each value is the spelling that endpoint uses; a level you leave out counts as unsupported. The endpoint documentation or its model listing usually names the values it takes.",
  "guidance.switch.intro": "Write compat (beside reasoningEfforts) only when the endpoint needs it:",
  "guidance.switch.thinkingFormat": 'the endpoint needs its thinking switch turned on before it accepts an effort \u2192 thinkingFormat: "qwen" (sends enable_thinking) / "zai" / "deepseek"',
  "guidance.switch.reasoningEffort": "the endpoint does not accept reasoning_effort \u2192 supportsReasoningEffort: false",
  "guidance.switch.developerRole": "a request fails with 400 invalid_parameter_error \u2192 supportsDeveloperRole: false",
  "guidance.switch.replay": "replaying history fails \u2192 requiresReasoningContentOnAssistantMessages: true",
  "agent.copy": "Copy for Agent",
  "agent.intro": "Complete the reasoning-effort declaration for this model.",
  "agent.factsHeading": "## Target",
  "agent.facts": "- Model: {provider} / {model}\n- Config: {path}\n- Location: {entryPath} ({entryLine})\n- Current levels: {current}\n- Reference levels: {expected}",
  "agent.warningLine": "- endpoint caveat: {warning}",
  "agent.snippetHeading": "Suggested snippet (verify values)",
  "knowledge.glm52": "GLM-5.2 native levels minimal / low / medium / high (Zhipu z.ai deep-thinking docs); the Aliyun Bailian OpenAI-compatible endpoint accepts these values in practice.",
  "knowledge.kimiK3": "Kimi K3 official levels low / high / max (Moonshot thinking-effort docs), consistent with the pi-ai catalog moonshotai entry.",
  "knowledge.unknown": "The knowledge base does not list this model; the template below is ready to edit.",
  "warning.developerRole": "This route is an OpenAI-compatible gateway: pi-ai treats it as standard OpenAI and sends the system prompt with the developer role for models with reasoning enabled, which some gateways reject with a 400 (invalid_parameter_error). Add compat.supportsDeveloperRole: false to the route to send system instead.",
  "yaml.keyComment": "key = DSH level system (off/minimal/low/medium/high/xhigh/max)",
  "yaml.valueComment": "value = the spelling that endpoint uses; a level you leave out counts as unsupported",
  "models.automatic": "Automatic",
  "models.title": "Reasoning settings",
  "models.mode": "Reasoning",
  "models.inherit": "Automatic",
  "models.disabled": "No reasoning support",
  "models.custom": "Custom maximum",
  "models.maximum": "Maximum level",
  "models.invalid": "Model reasoning levels are unavailable. Refresh the model catalog.",
  "settings.effort.title": "Reasoning effort slider",
  "settings.effort.description": "Show the thinking-depth slider and animated pixel field in the model menu; levels adapt to the current model automatically",
  "settings.effort.aria": "Enable reasoning effort slider",
  "settings.palette.title": "Reasoning effort slider colour",
  "settings.palette.description": "Applies to the track, pixel field and effort label.",
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
.re-model-menu { position: absolute; right: 0; bottom: calc(100% + 8px); z-index: 1200; box-sizing: border-box; width: min(216px, var(--re-menu-width, calc(100vw - 24px))); max-height: var(--re-menu-height, calc(100dvh - 24px)); overflow-x: hidden; overflow-y: auto; overscroll-behavior: contain; translate: var(--re-menu-x, 0px) var(--re-menu-y, 0px); border: .5px solid var(--dsw-alias-border-l2); border-radius: 9px; color: var(--dsw-alias-label-primary, #15171b); background: var(--dsw-alias-bg-layer-2); box-shadow: 0 4px 16px color-mix(in srgb, var(--dsw-alias-label-primary) 12%, transparent); animation: re-menu-in 150ms cubic-bezier(.22,1,.36,1); }
.re-model-content,
.re-model-body { display: contents; }
.re-model-menu[data-guidance-card] {
  height: min(128px, var(--re-menu-height, calc(100dvh - 24px)));
  white-space: normal;
  overflow-wrap: anywhere;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.re-model-menu[data-guidance-expanded] {
  height: min(280px, var(--re-menu-height, calc(100dvh - 24px)));
}
.re-model-menu[data-guidance-card] > .re-adapt-heading,
.re-model-menu[data-guidance-card] .re-model-content > :not(.re-model-body) { flex-shrink: 0; }
.re-model-menu[data-guidance-card] .re-model-content {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
}
.re-adapt-heading {
  min-width: 0;
  padding: 6px 8px 2px;
  background: inherit;
}
.re-model-menu[data-guidance-card] .re-model-body {
  display: block;
  flex: 1;
  min-height: 0;
  margin: 0 0 4px;
  overflow-x: hidden;
  overflow-y: auto;
  overscroll-behavior: contain;
  scrollbar-width: thin;
}
.re-model-menu[data-guidance-card] .re-model-content > .re-adapt-open-row,
.re-model-menu[data-guidance-card] .re-model-content > .re-adapt-actions {
  margin: 0;
  padding: 0 8px 4px;
}
.re-model-menu[data-guidance-card][data-short-menu] .re-model-content {
  display: block;
  overflow-y: auto;
  overscroll-behavior: contain;
}
.re-model-menu[data-guidance-card][data-short-menu] .re-model-body {
  overflow: visible;
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
  gap: 6px;
  min-height: 34px;
  padding: 0 8px;
  text-align: left;
}
.re-model-row:hover,
.re-model-option:hover,
.re-model-back:hover { background: var(--dsw-alias-fill-tertiary, rgba(120,125,140,.09)); }
.re-model-row-name { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 13px; }
.re-model-row-effort { color: var(--dsw-static-deepseek-500, #4d70ff); font-size: 12px; }
.re-row-chevron { font-size: 20px; line-height: 1; opacity: .42; }
.re-model-pane { display: flex; flex-direction: column; box-sizing: border-box; max-height: calc(var(--re-menu-height, calc(100dvh - 24px)) - 2px); overflow: hidden; padding: 4px; }
.re-model-list { position: relative; min-height: 0; overflow-x: hidden; overflow-y: auto; overscroll-behavior: contain; scrollbar-width: thin; }
.re-model-back {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 6px;
  height: 28px;
  padding: 0 4px;
  border-radius: 6px;
  text-align: left;
  color: var(--dsw-alias-label-secondary, #686c75);
  font-size: 12px;
  background: var(--dsw-alias-bg-layer-2);
}
.re-model-group-title { padding: 8px 4px 3px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: var(--dsw-alias-label-tertiary, #9296a0); font-size: 11px; line-height: 16px; }
.re-model-option {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 16px;
  align-items: center;
  gap: 6px;
  min-height: 32px;
  padding: 5px 4px;
  border-radius: 6px;
  text-align: left;
}
.re-model-option-copy { min-width: 0; }
.re-model-option-name { display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 12px; line-height: 18px; }
.re-model-check { color: var(--re-accent, var(--dsw-static-deepseek-500, #4d70ff)); font-size: 14px; text-align: center; }
.re-model-status { white-space: normal; overflow-wrap: anywhere; line-height: 1.5; padding: 14px; color: var(--dsw-alias-label-tertiary, #9296a0); font-size: 12px; text-align: center; }
.re-model-error { margin: 8px; padding: 8px 10px; border-radius: 8px; color: var(--dsw-alias-state-error-primary, #c83e4d); background: var(--dsw-alias-state-error-tertiary, rgba(220,55,70,.08)); font-size: 11px; }
.re-setting-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) fit-content(58%);
  align-items: center;
  gap: 16px;
  padding: 12px 0;
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
.re-setting-control { display: inline-flex; align-items: center; gap: 10px; min-width: 0; justify-content: flex-end; }
.re-setting-state { color: var(--dsw-alias-label-secondary, #686c75); font-size: 13px; }
.re-setting-switch {
  position: relative;
  width: 36px;
  height: 20px;
  padding: 0;
  border: 0;
  border-radius: 999px;
  corner-shape: round;
  background: var(--dsw-alias-border-l3, #c7cbd3);
  cursor: pointer;
  transition: background 150ms ease;
}
.re-setting-switch:hover { filter: brightness(.97); }
.re-setting-switch:disabled { cursor: not-allowed; opacity: .45; }
.re-setting-switch:focus-visible {
  outline: 2px solid var(--dsw-static-blue-400, #5d83ff);
  outline-offset: 2px;
}
.re-setting-switch.is-on { background: var(--dsw-alias-brand-primary, var(--dsw-alias-label-primary, #15171b)); }
.re-setting-switch-knob {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  corner-shape: round;
  background: var(--dsw-alias-label-primary-foreground, white);
  transition: transform 170ms cubic-bezier(.22,1,.36,1);
}
.re-setting-switch.is-on .re-setting-switch-knob { transform: translateX(16px); }
/* LOCAL ADDITION: particle colour swatches in the settings row. */
.re-palette-picker {
  min-width: 0;
  justify-content: flex-end;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
.re-palette-swatch {
  width: 22px;
  height: 22px;
  padding: 0;
  border: 0;
  border-radius: 50%;
  corner-shape: round;
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
  min-width: 0;
  padding: 0 8px;
  white-space: normal;
}
.re-adapt-copy { min-width: 0; overflow-wrap: anywhere; }
.re-adapt-title {
  color: var(--dsw-alias-label-primary, #15171b);
  font-size: 12px;
  font-weight: 500;
  line-height: 1.4;
}
.re-adapt-desc {
  margin-top: 0;
  color: var(--dsw-alias-label-tertiary, #9296a0);
  font-size: 11px;
  line-height: 1.55;
}
.re-adapt-open-row,
.re-adapt-actions {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  align-items: stretch;
  gap: 4px;
  margin-top: 10px;
}
.re-model-menu .re-adapt-actions > button,
.re-model-menu .re-adapt-open-row > button {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-width: 0;
  height: 26px;
  min-height: 26px;
  padding: 4px 5px;
  font-size: 11px;
  line-height: 16px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.re-adapt-actions > button > span,
.re-adapt-open-row > button > span {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.re-adapt-cancel { grid-column: 1 / -1; }
.re-model-menu [data-re-variant] {
  padding: 4px 8px;
  min-height: 32px;
  border: 0;
  border-radius: var(--dsw-radius-md, 8px);
  background: var(--dsw-alias-fill-tertiary, rgba(120,125,140,.12));
  color: var(--dsw-alias-label-primary, #15171b);
  font: inherit;
  cursor: pointer;
}
.re-model-menu [data-re-variant="primary"] {
  background: var(--dsw-alias-button-primary-fill, #18181b);
  color: var(--dsw-alias-label-primary-foreground, white);
}
.re-model-menu [data-re-variant="outline"] {
  background: transparent;
  box-shadow: inset 0 0 0 1px var(--dsw-alias-border-l3, #d4d4d8);
}
.re-model-menu button:focus-visible {
  outline: 2px solid var(--dsw-alias-brand-primary, currentColor);
  outline-offset: -2px;
}
.re-adapt-panel {
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
  max-width: 100%;
  margin-top: 10px;
  padding: 10px 0;
  border: 0;
  border-top: 1px solid var(--dsw-alias-stroke-secondary, rgba(121,126,145,.2));
  border-radius: 0;
  background: transparent;
}
body[data-ds-dark-theme] .re-adapt-panel {
  background: rgba(20, 22, 30, .5);
}
.re-adapt-scroll {
  min-width: 0;
  overflow-wrap: anywhere;
}
.re-adapt-panel-line {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
  align-items: center;
  gap: 10px;
  text-align: center;
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
.re-adapt-open:disabled,
.re-adapt-agent:disabled,
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
  height: auto;
  margin: 0 auto;
  padding: 6px 8px 5px;
  border: 0;
  border-radius: 0;
  background: transparent;
  color: var(--dsw-alias-label-secondary);
}
.re-depth-header { display: grid; grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr); column-gap: 6px; align-items: end; }
.re-depth-choice, .re-depth-actual { display: grid; grid-template-rows: 12px 17px; min-width: 0; }
.re-depth-choice:only-child { grid-column: 1 / -1; }
.re-depth-actual { text-align: end; }
.re-depth-label, .re-depth-value, .re-depth-mapping { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.re-depth-label { color: var(--dsw-alias-label-secondary); font-size: 10px; line-height: 12px; }
.re-depth-value { color: color-mix(in srgb, var(--re-accent) 75%, var(--dsw-alias-label-primary)); font-size: 14px; font-weight: 600; line-height: 17px; }
.re-depth-mapping, .re-depth-arrow { color: var(--dsw-alias-label-secondary); font-size: 10px; font-weight: 400; line-height: 17px; }
.re-depth-speed { display: flex; justify-content: space-between; margin-top: 3px; color: var(--dsw-alias-label-tertiary); font-size: 10.5px; line-height: 13px; }
.re-depth-slider { position: relative; height: 20px; margin-top: 5px; border-radius: 7px; isolation: isolate; }
.re-depth-track { position: absolute; inset: 0; border-radius: inherit; background: linear-gradient(90deg, color-mix(in srgb, var(--re-accent) 30%, white), color-mix(in srgb, var(--re-accent) 85%, black)); }
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
.re-custom-palette input { appearance: none; width: 22px; height: 22px; padding: 0; border: 0; border-radius: 50%; corner-shape: round; background: transparent; cursor: pointer; }
.re-custom-palette input::-webkit-color-swatch-wrapper { padding: 0; }
.re-custom-palette input::-webkit-color-swatch { border: 1px solid var(--dsw-alias-border-l3); border-radius: 50%; corner-shape: round; }
.re-custom-palette input::-moz-color-swatch { border: 1px solid var(--dsw-alias-border-l3); border-radius: 50%; }
@keyframes re-depth-flow { to { background-position: 250% center; } }
@keyframes re-depth-enter { from { opacity: .3; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
@media (prefers-reduced-motion: reduce) {
  .re-depth .re-depth-value, .re-depth[data-top] .re-depth-value { animation: none; }
  .re-depth .re-depth-thumb { transition: none; }
}
`;

// src/client/model-settings.tsx
var import_react = require("react");

// src/client/model-capabilities.ts
var capabilityLevels = ["off", "minimal", "low", "medium", "high", "xhigh", "max"];
function settingsObject(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value) ? value : void 0;
}
function capabilityMap(value) {
  return Object.fromEntries(Object.entries(settingsObject(value) ?? {}).filter(
    (entry) => typeof entry[1] === "string" || entry[1] === null
  ));
}
function validCapability(value) {
  if (value === void 0 || value === false) return true;
  const object = settingsObject(value);
  if (object === void 0) return false;
  const entries = Object.entries(object);
  return entries.some(([level]) => level !== "off") && entries.every(([level, wire]) => capabilityLevels.some((item) => item === level) && (typeof wire === "string" ? wire.trim().length > 0 : level === "off" && wire === null));
}
function withCapability(model, value) {
  const next = { ...model };
  if (value === void 0) delete next.reasoningEfforts;
  else next.reasoningEfforts = value;
  return next;
}

// src/client/model-settings.tsx
var import_jsx_runtime = require("react/jsx-runtime");
function registerModelSettings(ctx) {
  ctx.slots.inject("settings.models.model-fields", () => ctx.slots.register({
    name: "settings.models.model-fields",
    key: "llm-pi-ai",
    locale: NS
  }, ModelReasoningSettings));
}
function ModelReasoningSettings({ model, inherited, position, disabled, onChange, t }) {
  const value = model.reasoningEfforts;
  const mode = value === void 0 ? "inherit" : value === false ? "disabled" : "custom";
  const map = capabilityMap(value);
  const [confirmed, setConfirmed] = (0, import_react.useState)(() => capabilityMap(value));
  const lastCustom = (0, import_react.useRef)(void 0);
  const supported = { ...capabilityMap(inherited.reasoningEfforts), ...confirmed, ...map };
  const canCustomize = validCapability(supported);
  const maximum = capabilityLevels.filter((level) => level !== "off" && Object.hasOwn(map, level)).at(-1) ?? "";
  const change = (next) => onChange(withCapability(model, next));
  const changeSupported = (next, cap = maximum) => {
    setConfirmed(next);
    const index = cap === "" ? capabilityLevels.length : capabilityLevels.indexOf(cap);
    change(Object.fromEntries(Object.entries(next).filter(([level]) => capabilityLevels.indexOf(level) <= index)));
  };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { className: "re-model-reasoning", disabled, "aria-label": `${t("models.mode")} ${position}`, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", { className: "re-model-heading", children: t("models.title") }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "re-model-controls", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("models.mode") }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", { "aria-label": `${t("models.mode")} ${position}`, value: mode, onChange: (event) => {
          if (mode === "custom") lastCustom.current = map;
          const next = event.target.value;
          if (next === "custom") {
            const restored = capabilityMap(lastCustom.current ?? inherited.reasoningEfforts);
            if (!validCapability(restored)) return;
            setConfirmed(restored);
            change(restored);
          } else change(next === "inherit" ? void 0 : false);
        }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "inherit", children: t("models.inherit") }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "disabled", children: t("models.disabled") }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "custom", disabled: !canCustomize, children: t("models.custom") })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("models.maximum") }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", { "aria-label": `${t("models.maximum")} ${position}`, value: mode === "custom" ? maximum : "", disabled: mode !== "custom", onChange: (event) => changeSupported(supported, event.target.value), children: [
          mode !== "custom" || maximum === "" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "", children: mode === "disabled" ? "\u2014" : t("models.automatic") }) : null,
          capabilityLevels.filter((level) => level !== "off" && Object.hasOwn(supported, level)).map((level) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: level, children: level }, level))
        ] })
      ] })
    ] }),
    !validCapability(value) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { role: "alert", children: t("models.invalid") }) : null
  ] });
}
var MODEL_SETTINGS_CSS = `
.re-model-reasoning { min-width: 0; margin: 0; padding: 0; border: 0; color: var(--dsw-alias-label-primary, inherit); }
.re-model-heading { margin: 24px 0 8px; padding: 0; font-size: 16px; line-height: 24px; font-weight: 600; }
.re-model-controls { display: grid; grid-template-columns: minmax(0,1fr); gap: 0; align-items: center; }
.re-model-controls > label { display: grid; grid-template-columns: minmax(0,1fr) minmax(100px,42%); align-items: center; gap: 12px; min-width: 0; margin: 0; padding: 10px 0; }
.re-model-controls > label > span { color: var(--dsw-alias-label-tertiary, #858a95); font-size: 12px; line-height: 18px; }
.re-model-reasoning select { box-sizing: border-box; min-width: 0; width: 100%; height: 32px; padding: 0 28px; text-align: center; text-align-last: center; border: .5px solid var(--dsw-alias-border-l4, #d4d4d8); border-radius: var(--dsw-radius-md, 8px); color: inherit; background-color: var(--dsw-alias-bg-layer-1, transparent); font: inherit; font-size: 14px; line-height: 22px; appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12' fill='none'%3E%3Cpath d='M3 4.5L6 7.5L9 4.5' stroke='%2381858C' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 10px center; }
.re-model-reasoning [role=alert] { color: var(--dsw-alias-state-danger-primary, #be4343); margin: 8px 0 0; font-size: 12px; line-height: 18px; }
.re-model-reasoning :disabled { opacity: .6; cursor: default; }
`;

// src/client/pixel-theme.js
var DEFAULT_COLOR = "#9864db";
var parseHex = (hex) => [1, 3, 5].map((offset) => parseInt(hex.slice(offset, offset + 2), 16));
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
  const [hue, saturation, lightness] = rgbToHsl(parseHex(hex));
  const chroma = Math.min(0.9, saturation * 1.08);
  const deep = Math.max(0.3, Math.min(0.48, lightness * 0.86));
  const tone = (light, strength = 1) => hslToRgb([hue, chroma * strength, light]);
  return {
    leftColor: tone(0.83, 0.84),
    deepViolet: tone(deep),
    deepMid: tone(deep + 0.055),
    midPurple: tone(deep + 0.11),
    softMid: tone(deep + 0.16),
    softLilac: tone(0.71, 0.9),
    paleCool: tone(0.77, 0.86),
    highlightColor: tone(0.82, 0.8),
    peakColor: tone(0.91, 0.76)
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
    this._seed = Math.random() * 1e4;
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
    const gap = 0.18;
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
          base: Math.abs(Math.sin(column * 12.9898 + row * 78.233 + this._seed) * 43758.5453) % 1,
          tempo: Math.abs(Math.sin(column * 7.13 + row * 19.41 + this._seed) * 19341.731) % 1,
          phase: Math.abs(Math.sin(column * 31.17 + row * 11.93 + this._seed) * 28437.123) % 1,
          chroma: Math.abs(Math.sin(column * 9.47 + row * 67.13 + this._seed) * 15823.917) % 1,
          purple: 0.28 + smoothstep(0, 1, nX) * 0.72,
          intensity: 0.65 + smoothstep(0, 1, nX) * 0.35,
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
    const gap = this._pixelGap ?? 0.18;
    const elapsed = this._reducedMotion.matches ? 1600 : Math.max(0, time - this._maxStartedAt);
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
      context.roundRect(0, 0, width, height, 7);
    } else {
      context.rect(0, 0, width, height);
    }
    context.clip();
    const backdrop = context.createLinearGradient(0, 0, width, 0);
    backdrop.addColorStop(0, mixColor(leftColor, leftColor, 0));
    backdrop.addColorStop(1, mixColor(deepViolet, deepViolet, 0));
    context.fillStyle = backdrop;
    context.fillRect(0, 0, width, height);
    for (const c of cells) {
      const { x, y, row, nX, base, tempo, phase, chroma, purple, intensity, depth } = c;
      const revealAlpha = smoothstep(frontier - 0.1, frontier + 0.07, nX);
      if (revealAlpha <= 2e-3) continue;
      const period = 650 + tempo * 1150;
      const localTime = elapsed + phase * period;
      const cycle = Math.floor(localTime / period);
      const cycleProgress = localTime % period / period;
      const cycleHash = Math.abs(
        Math.sin(c.column * 17.17 + row * 41.73 + cycle * 13.11 + this._seed) * 24634.6345
      ) % 1;
      const widthHash = Math.abs(
        Math.sin(c.column * 5.37 + row * 29.11 + cycle * 7.43 + this._seed) * 17391.443
      ) % 1;
      const pulseCenter = 0.2 + cycleHash * 0.55;
      const pulseWidth = 0.12 + widthHash * 0.11;
      const pulseDistance = (cycleProgress - pulseCenter) / pulseWidth;
      const pulseEnvelope = Math.exp(-pulseDistance * pulseDistance * 1.45);
      const activeCycle = cycleHash > 0.04 ? 1 : 0.5;
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
        irregularFlicker * (0.72 + directionalFlow * 0.38),
        directionalFlow * (0.38 + base * 0.28)
      );
      let lightAmount = flowingFlicker;
      const revealGlow = reveal < 0.995 ? Math.exp(-((nX - frontier) ** 2) / 0.012) * (1 - smoothstep(0.7, 1, reveal)) : 0;
      lightAmount = Math.max(lightAmount, revealGlow * (0.4 + base * 0.4));
      const peakHighlight = lightAmount > 0.32 && irregularFlicker > 0.12 && cycleHash > 0.26;
      const hottestHighlight = lightAmount > 0.68 && irregularFlicker > 0.3 && cycleHash > 0.48;
      const highlightAmount = peakHighlight ? 0.74 : clamp(lightAmount * (0.44 + cycleHash * 0.3), 0, 0.64);
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
      const variedPurple = cellTone.map((channel, index) => mix(deepViolet[index], channel, 0.18 + (1 - depth) * 0.42));
      const colourWeight = clamp(purple + (base - 0.5) * 0.14, 0.14, 1);
      const baseColor = [
        mix(leftColor[0], variedPurple[0], colourWeight),
        mix(leftColor[1], variedPurple[1], colourWeight),
        mix(leftColor[2], variedPurple[2], colourWeight)
      ];
      const localHighlight = leftColor.map((channel, index) => mix(channel, highlightColor[index], nX));
      const color = hottestHighlight ? mixColor(baseColor, peakColor, 0.8) : mixColor(baseColor, localHighlight, highlightAmount);
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
var RUNGS = ["off", "minimal", "low", "medium", "high", "xhigh", "max"];
function effortStops(offered) {
  const ids = [...new Set(offered)];
  if (ids.length < 2) return [];
  if (ids.some((id) => !RUNGS.includes(id))) return ids.map((id) => ({ rung: id, send: id }));
  const supported = RUNGS.map((id, index) => ids.includes(id) ? index : -1).filter((index) => index >= 0);
  return RUNGS.map((rung, index) => {
    const closest = supported.reduce((best, next) => Math.abs(next - index) <= Math.abs(best - index) ? next : best);
    return { rung, send: RUNGS[closest] };
  });
}
var LEVEL_NAME_KEYS = /* @__PURE__ */ new Map([
  ["off", "level.off"],
  ["minimal", "level.minimal"],
  ["low", "level.low"],
  ["medium", "level.medium"],
  ["high", "level.high"],
  ["xhigh", "level.xhigh"],
  ["max", "level.ultra"]
]);
function displayLevelName(id, t) {
  const key = LEVEL_NAME_KEYS.get(id);
  return key === void 0 ? id : t(key);
}
function levelsText(ids, t) {
  return ids.length ? ids.map((id) => displayLevelName(id, t)).join(" / ") : t("level.none");
}

// src/client/menu-position.ts
var SETTLE_FRAMES = 20;
var MAX_CHASE_FRAMES = 600;
var CLIPPING_OVERFLOW = /* @__PURE__ */ new Set(["hidden", "auto", "scroll", "clip"]);
function clientBox(el) {
  const rect = el.getBoundingClientRect();
  const left = rect.left + el.clientLeft;
  const top = rect.top + el.clientTop;
  return { left, top, right: left + el.clientWidth, bottom: top + el.clientHeight };
}
function collectClipAncestors(menu) {
  const ancestors = [];
  for (let el = menu.parentElement; el !== null; el = el.parentElement) {
    const style = getComputedStyle(el);
    if (style.display === "contents") continue;
    const x = CLIPPING_OVERFLOW.has(style.overflowX);
    const y = CLIPPING_OVERFLOW.has(style.overflowY);
    if (x || y) ancestors.push({ el, x, y });
  }
  return ancestors;
}
function modelWindow(list) {
  const options = [...list.querySelectorAll(".re-model-option")];
  if (!options.length) return;
  const selected = Math.max(0, options.findIndex((option) => option.getAttribute("aria-checked") === "true"));
  const start = Math.min(Math.max(0, selected - 2), Math.max(0, options.length - 5));
  const first = options[start];
  const last = options[Math.min(start + 4, options.length - 1)];
  const group = first.closest("section");
  const top = group?.querySelector(".re-model-option") === first ? group.offsetTop : first.offsetTop;
  return { top, height: last.offsetTop + last.offsetHeight - top };
}
function positionModelMenu(root, menu) {
  const viewport = window.visualViewport;
  let frame = 0;
  let chaseFrames = 0;
  let stableFrames = 0;
  let modelScrollInitialized = false;
  let appliedKey = "";
  let clips = [];
  const viewportBox = () => {
    const left = viewport?.offsetLeft ?? 0;
    const top = viewport?.offsetTop ?? 0;
    const width = viewport?.width ?? document.documentElement.clientWidth;
    const height = viewport?.height ?? window.innerHeight;
    return { left, top, right: left + width, bottom: top + height };
  };
  const visibleBox = () => {
    const box = viewportBox();
    for (const { el, x, y } of clips) {
      const client = clientBox(el);
      if (x && client.right > client.left) {
        box.left = Math.max(box.left, client.left);
        box.right = Math.min(box.right, client.right);
      }
      if (y && client.bottom > client.top) {
        box.top = Math.max(box.top, client.top);
        box.bottom = Math.min(box.bottom, client.bottom);
      }
    }
    return box;
  };
  const geometry = () => {
    const anchor = root.getBoundingClientRect();
    const box = visibleBox();
    const key = `${Math.round(anchor.left)},${Math.round(anchor.top)},${Math.round(anchor.right)},${Math.round(anchor.bottom)},${Math.round(box.left)},${Math.round(box.top)},${Math.round(box.right)},${Math.round(box.bottom)}`;
    return { anchor, box, key };
  };
  const apply2 = ({ anchor, box, key }) => {
    const margin = 12;
    const left = box.left + margin;
    const top = box.top + margin;
    const usableWidth = Math.max(0, box.right - box.left - margin * 2);
    const usableHeight = Math.max(0, box.bottom - box.top - margin * 2);
    const bottom = anchor.top - 8;
    const above = bottom - top;
    menu.style.setProperty("--re-menu-width", `${usableWidth}px`);
    const list = menu.querySelector(".re-model-list");
    const modelSlice = list && modelWindow(list);
    let placeBelow = false;
    let maxHeight = Math.min(480, above >= 120 ? Math.min(above, usableHeight) : usableHeight);
    if (list && modelSlice) {
      const preferredHeight = modelSlice.height + menu.offsetHeight - list.offsetHeight;
      const below = Math.max(0, top + usableHeight - anchor.bottom - 8);
      placeBelow = preferredHeight > above && (below >= preferredHeight || below > above);
      maxHeight = Math.min(480, usableHeight, Math.max(0, placeBelow ? below : above));
      list.style.height = `${modelSlice.height}px`;
    }
    menu.style.setProperty("--re-menu-height", `${maxHeight}px`);
    menu.toggleAttribute("data-short-menu", maxHeight < 240);
    const baseLeft = anchor.right - menu.offsetWidth;
    const baseTop = bottom - menu.offsetHeight;
    const x = Math.max(left, Math.min(baseLeft, left + usableWidth - menu.offsetWidth));
    const desiredTop = placeBelow ? anchor.bottom + 8 : baseTop;
    const y = Math.max(top, Math.min(desiredTop, top + usableHeight - menu.offsetHeight));
    menu.style.setProperty("--re-menu-x", `${x - baseLeft}px`);
    menu.style.setProperty("--re-menu-y", `${y - baseTop}px`);
    if (list && modelSlice && !modelScrollInitialized) {
      list.scrollTop = modelSlice.top;
      modelScrollInitialized = true;
    }
    appliedKey = key;
  };
  const update = () => {
    apply2(geometry());
  };
  const chase = () => {
    frame = 0;
    const current = geometry();
    if (current.key !== appliedKey) {
      apply2(current);
      stableFrames = 0;
    } else {
      stableFrames += 1;
    }
    chaseFrames += 1;
    if (stableFrames >= SETTLE_FRAMES || chaseFrames >= MAX_CHASE_FRAMES) return;
    frame = requestAnimationFrame(chase);
  };
  const startChase = () => {
    stableFrames = 0;
    if (frame !== 0) return;
    chaseFrames = 0;
    frame = requestAnimationFrame(chase);
  };
  const observed = /* @__PURE__ */ new Set();
  const observeOnce = (el) => {
    if (observed.has(el)) return;
    observed.add(el);
    observer.observe(el);
  };
  function onLayoutChange() {
    clips = collectClipAncestors(menu);
    observeOnce(root);
    observeOnce(menu);
    for (const { el } of clips) observeOnce(el);
    update();
    startChase();
  }
  const observer = new ResizeObserver(onLayoutChange);
  onLayoutChange();
  window.addEventListener("resize", onLayoutChange);
  window.addEventListener("scroll", update, true);
  viewport?.addEventListener("resize", onLayoutChange);
  viewport?.addEventListener("scroll", update);
  return () => {
    if (frame !== 0) cancelAnimationFrame(frame);
    frame = 0;
    observer.disconnect();
    observed.clear();
    window.removeEventListener("resize", onLayoutChange);
    window.removeEventListener("scroll", update, true);
    viewport?.removeEventListener("resize", onLayoutChange);
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

// src/client/compat.ts
var MODEL_FIELDS_SLOT = "settings.models.model-fields";
var SLOTS_MEMBERS = ["inject", "register"];
var DIRECTORY_MEMBERS = ["directoryFor"];
var LOCALE_MEMBERS = ["register", "getLocale"];
function memberOf(value, member) {
  if (typeof value !== "object" || value === null) return void 0;
  return value[member];
}
function missingMembers(service, value, members) {
  return members.filter((member) => typeof memberOf(value, member) !== "function").map((member) => `${service}.${member}`);
}
function slotDeclaration(slots, name) {
  const spec = memberOf(slots, "spec");
  const dynamic = memberOf(slots, "specDynamic");
  const lookup = typeof spec === "function" ? spec : dynamic;
  if (typeof lookup !== "function") return "unknown";
  try {
    return lookup.call(slots, name) === void 0 ? "undeclared" : "declared";
  } catch {
    return "unknown";
  }
}
function guidanceAvailable(connection) {
  const rpc = memberOf(connection, "rpc");
  return typeof memberOf(rpc, "call") === "function";
}
function modelRowMessage(state) {
  if (state === "declared") return null;
  if (state === "undeclared") {
    return `${MODEL_FIELDS_SLOT} is not declared, so the inline per-model row cannot be contributed to. The slider, model selection and guidance panels are unaffected`;
  }
  return `this host exposes no slot-declaration lookup, so ${MODEL_FIELDS_SLOT} cannot be confirmed: the inline row registers only if the slot is declared. The slider, model selection and guidance panels are unaffected`;
}
function guidanceMessage(available) {
  return available ? null : "connection.rpc.call is unavailable: the guidance panel cannot fetch a diagnosis from the host half and reports the failure itself. The slider and model selection are unaffected";
}
function clientCapabilities(surface) {
  const missing = [
    ...missingMembers("slots", surface.slots, SLOTS_MEMBERS),
    ...missingMembers("modelDirectories", surface.modelDirectories, DIRECTORY_MEMBERS),
    ...missingMembers("locale", surface.locale, LOCALE_MEMBERS)
  ];
  const modelRow = slotDeclaration(surface.slots, MODEL_FIELDS_SLOT);
  const guidance = guidanceAvailable(surface.connection);
  const degraded = [modelRowMessage(modelRow), guidanceMessage(guidance)].filter((message) => message !== null);
  return { seat: missing.length === 0, guidance, modelRow, missing, degraded };
}
function unsupportedMessage(report) {
  return `dsh-reasoning-effort: client interface incomplete (${report.missing.join(", ")}). These are the members the model seat calls; the row is not registered, and the composer keeps the shipped model selector.`;
}
var LOG_PREFIX = "[dsh-reasoning-effort]";

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
var agent_tutorial_en_default = "# Edit rules\n\n- Read the target model and its route's `api` and `baseURL`. Confirm supported levels and values in the endpoint documentation. Reference levels and snippets are suggestions, not endpoint guarantees; do not guess.\n- Edit only that model's `reasoningEfforts`. Preserve other fields, routes and settings; do not duplicate the provider.\n- Keys: `off`, `minimal`, `low`, `medium`, `high`, `xhigh`, `max`. Values must match the endpoint; omitted levels are unavailable. `off: null` omits the parameter when off. `false` declares no selectable levels, not necessarily no internal reasoning. Never use an empty object.\n- Add `compat` only for `api: openai-completions` with endpoint documentation or a specific error as evidence. A generic 400 error does not justify guessing switches.\n- Save and refresh the model directory; the slider needs at least two levels. Report changes and actual verification. A visible slider proves the declaration was read, not that a real request succeeded.\n";

// src/client/agent-tutorial.zh.md
var agent_tutorial_zh_default = "# \u4FEE\u6539\u8981\u6C42\n\n- \u5148\u8BFB\u76EE\u6807\u6A21\u578B\u53CA\u8DEF\u7531\u7684 `api`\u3001`baseURL`\uFF0C\u6309\u7AEF\u70B9\u6587\u6863\u786E\u8BA4\u5B9E\u9645\u652F\u6301\u7684\u6863\u4F4D\u548C\u503C\u3002\u53C2\u8003\u6863\u4F4D\u4E0E\u5EFA\u8BAE\u7247\u6BB5\u4E0D\u662F\u7AEF\u70B9\u627F\u8BFA\uFF0C\u4E0D\u786E\u5B9A\u65F6\u4E0D\u8981\u731C\u3002\n- \u53EA\u4FEE\u6539\u76EE\u6807\u6A21\u578B\u7684 `reasoningEfforts`\uFF0C\u4FDD\u7559\u5176\u5B83\u5B57\u6BB5\u3001\u8DEF\u7531\u548C\u914D\u7F6E\uFF1B\u4E0D\u8981\u91CD\u590D\u6DFB\u52A0 provider\u3002\n- \u952E\u9650 `off`\u3001`minimal`\u3001`low`\u3001`medium`\u3001`high`\u3001`xhigh`\u3001`max`\uFF0C\u503C\u987B\u4E3A\u7AEF\u70B9\u5B9E\u9645\u53D6\u503C\uFF0C\u672A\u58F0\u660E\u7684\u6863\u4F4D\u4E0D\u53EF\u9009\u3002`off: null` \u8868\u793A\u5173\u95ED\u65F6\u7701\u7565\u53C2\u6570\uFF1B`false` \u8868\u793A\u6CA1\u6709\u53EF\u9009\u6863\u4F4D\uFF0C\u4E0D\u4FDD\u8BC1\u7AEF\u70B9\u5185\u90E8\u5B8C\u5168\u4E0D\u601D\u8003\u3002\u4E0D\u8981\u5199\u7A7A\u5BF9\u8C61\u3002\n- \u4EC5\u5728 `api: openai-completions` \u4E14\u6709\u7AEF\u70B9\u6587\u6863\u6216\u5177\u4F53\u9519\u8BEF\u4F9D\u636E\u65F6\u6DFB\u52A0 `compat`\uFF0C\u4E0D\u8981\u51ED\u901A\u7528 400 \u9519\u8BEF\u731C\u517C\u5BB9\u5F00\u5173\u3002\n- \u4FDD\u5B58\u540E\u5237\u65B0\u6A21\u578B\u76EE\u5F55\uFF0C\u81F3\u5C11\u4E24\u6863\u624D\u663E\u793A\u6ED1\u5757\u3002\u8BF4\u660E\u5B9E\u9645\u6539\u52A8\u4E0E\u9A8C\u8BC1\u7ED3\u679C\uFF1B\u6ED1\u5757\u51FA\u73B0\u53EA\u8BC1\u660E\u76EE\u5F55\u8BFB\u5230\u58F0\u660E\uFF0C\u4E0D\u80FD\u5192\u5145\u771F\u5B9E\u8BF7\u6C42\u9A8C\u6536\u3002\n";

// src/client/index.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
function loadHostControls() {
  try {
    return require("@deepseek-ai/dsh-client-ui-primitives") ?? {};
  } catch {
    return {};
  }
}
var { Button: HostButton, Switch: HostSwitch } = loadHostControls();
function GuidanceButton({ variant, ...props }) {
  return HostButton ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(HostButton, { type: "button", variant, ...props }) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { type: "button", "data-re-variant": variant, ...props });
}
var ADAPT_CHANNEL = "/dsh-reasoning-effort";
function templateSnippet(t, modelIndent) {
  const fieldPrefix = " ".repeat(modelIndent + 2);
  const valuePrefix = " ".repeat(modelIndent + 4);
  return [
    `${fieldPrefix}reasoningEfforts:`,
    `${valuePrefix}low: "low"        # ${t("yaml.keyComment")}`,
    `${valuePrefix}high: "high"      # ${t("yaml.valueComment")}`
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
    tutorial.trim(),
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
    const previous = document.activeElement;
    const textarea = document.createElement("textarea");
    try {
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      return document.execCommand("copy");
    } catch {
      return false;
    } finally {
      const restore = document.activeElement === textarea;
      textarea.remove();
      if (restore && previous instanceof HTMLElement && previous.isConnected) previous.focus({ preventScroll: true });
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
function clampIndex(value, count) {
  return Math.max(0, Math.min(count - 1, Math.round(value)));
}
function EffortSlider({ levels, selectedPosition, selectedName, mappedEffort, invalidEffort, busy, error, onSelect, t }) {
  const [dragPreview, setPreview] = (0, import_react2.useState)(selectedPosition);
  const [dragging, setDragging] = (0, import_react2.useState)(false);
  const palette = (0, import_react2.useSyncExternalStore)(paletteStore.subscribe, paletteStore.getSnapshot);
  const canvasRef = (0, import_react2.useRef)(null);
  const inputRef = (0, import_react2.useRef)(null);
  const previewFrameRef = (0, import_react2.useRef)(null);
  const previewRef = (0, import_react2.useRef)(selectedPosition);
  const lastPointerXRef = (0, import_react2.useRef)(0);
  const pointerActiveRef = (0, import_react2.useRef)(false);
  const activePointerIdRef = (0, import_react2.useRef)(null);
  const globalPointerMoveRef = (0, import_react2.useRef)(null);
  const globalPointerEndRef = (0, import_react2.useRef)(null);
  const globalPointerCancelRef = (0, import_react2.useRef)(null);
  const pixelsRef = (0, import_react2.useRef)(null);
  const preview = dragging ? dragPreview : selectedPosition;
  const count = levels.length;
  const isTop = invalidEffort === void 0 && clampIndex(preview, count) === count - 1;
  (0, import_react2.useEffect)(() => {
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
  }, []);
  (0, import_react2.useEffect)(() => {
    pixelsRef.current?.setColor(paletteColor(palette));
  }, [palette]);
  (0, import_react2.useEffect)(() => {
    pixelsRef.current?.setActive(isTop);
  }, [isTop]);
  const commit = (raw) => {
    const stop = levels[clampIndex(raw, count)];
    if (!busy && stop !== void 0) onSelect(stop, raw);
  };
  const rawFromPointer = (input, clientX) => {
    const bounds = input.getBoundingClientRect();
    if (bounds.width <= 0 || levels.length < 2) return previewRef.current;
    return Math.max(
      0,
      Math.min(levels.length - 1, (clientX - bounds.left) / bounds.width * (levels.length - 1))
    );
  };
  const queuePointerPreview = (raw) => {
    previewRef.current = raw;
    if (previewFrameRef.current !== null) return;
    previewFrameRef.current = requestAnimationFrame(() => {
      previewFrameRef.current = null;
      setPreview(previewRef.current);
    });
  };
  const beginDragging = (input, pointerId, clientX) => {
    pointerActiveRef.current = true;
    activePointerIdRef.current = pointerId;
    setDragging(true);
    lastPointerXRef.current = clientX;
    previewRef.current = rawFromPointer(input, clientX);
    setPreview(previewRef.current);
    try {
      if (!input.hasPointerCapture(pointerId)) input.setPointerCapture(pointerId);
    } catch {
    }
  };
  const moveDragging = (input, pointerId, clientX) => {
    if (!pointerActiveRef.current || activePointerIdRef.current !== pointerId) return;
    lastPointerXRef.current = clientX;
    queuePointerPreview(rawFromPointer(input, clientX));
  };
  const endDrag = (input, pointerId) => {
    if (pointerId !== void 0 && activePointerIdRef.current !== pointerId) return;
    if (previewFrameRef.current !== null) cancelAnimationFrame(previewFrameRef.current);
    previewFrameRef.current = null;
    pointerActiveRef.current = false;
    activePointerIdRef.current = null;
    setDragging(false);
    if (input !== null && pointerId !== void 0 && input.hasPointerCapture(pointerId)) {
      input.releasePointerCapture(pointerId);
    }
  };
  const stopDragging = (input, pointerId, clientX) => {
    if (!pointerActiveRef.current) return;
    if (pointerId !== void 0 && activePointerIdRef.current !== pointerId) return;
    const raw = clientX === void 0 || clientX === lastPointerXRef.current ? previewRef.current : rawFromPointer(input, clientX);
    endDrag(input, pointerId);
    commit(raw);
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
    endDrag(inputRef.current, event.pointerId);
  };
  (0, import_react2.useEffect)(() => {
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
    commit(target);
  };
  const progress = preview / (count - 1) * 100;
  const style = { "--re-progress": `${progress}%`, "--re-strength": `${25 + progress * 0.75}%` };
  const previewStop = levels[clampIndex(preview, count)];
  const previewName = dragging ? displayLevelName(previewStop.rung, t) : selectedName;
  const mapped = dragging ? previewStop.send : mappedEffort;
  const actualLabel = mapped === void 0 ? void 0 : t("effort.actual", { effort: mapped });
  const valueText = actualLabel === void 0 ? previewName : `${previewName} \xB7 ${actualLabel}`;
  const title = error !== null ? t("effort.failed", { error }) : invalidEffort !== void 0 && !dragging ? t("effort.reselect", { effort: invalidEffort }) : t("effort.title", { effort: valueText });
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
    "div",
    {
      className: `re-effort re-depth has-readout${dragging ? " is-dragging" : ""}${busy ? " is-busy" : ""}${error === null ? "" : " is-error"}`,
      "data-palette": palette,
      "data-top": isTop ? "true" : void 0,
      style: { "--re-accent": paletteColor(palette) },
      title,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "re-depth-header", "aria-hidden": "true", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "re-depth-choice", children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "re-depth-label", children: t("effort.label") }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "re-depth-value", title: previewName, children: previewName })
          ] }),
          mapped !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "re-depth-arrow", children: "\u2192" }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "re-depth-actual", title: actualLabel, children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "re-depth-label", children: t("effort.actualLevel") }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "re-depth-mapping", children: mapped })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
          "div",
          {
            className: "re-depth-slider",
            "data-top": isTop ? "true" : void 0,
            style,
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "re-depth-track", "aria-hidden": "true" }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("canvas", { ref: canvasRef, className: "re-depth-canvas", hidden: !isTop, "aria-hidden": "true" }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
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
                  "aria-valuetext": valueText,
                  onChange: (event) => {
                    if (!pointerActiveRef.current) commit(Number(event.currentTarget.value));
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
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "re-depth-thumb", "aria-hidden": "true" })
            ]
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "re-depth-speed", "aria-hidden": "true", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { children: t("effort.faster") }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { children: t("effort.smarter") })
        ] }),
        error === null ? null : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "re-effort-sr", role: "status", children: error })
      ]
    }
  );
}
function readVisualChoice(key) {
  let raw = null;
  try {
    raw = window.localStorage.getItem(key);
    if (raw?.startsWith("{")) {
      const value = JSON.parse(raw);
      if (typeof value?.rung === "string") {
        return { rung: value.rung, position: Number.isFinite(value.position) ? value.position : void 0 };
      }
    }
  } catch {
  }
  return raw === null ? null : { rung: raw };
}
function AdvancedModelSelect({
  sessionId,
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
  const state = (0, import_react2.useSyncExternalStore)(
    (notify) => directory.subscribe(notify),
    () => directory.getSnapshot()
  );
  const palette = (0, import_react2.useSyncExternalStore)(paletteStore.subscribe, paletteStore.getSnapshot);
  const [open, setOpen] = (0, import_react2.useState)(false);
  const [modelsOpen, setModelsOpen] = (0, import_react2.useState)(false);
  const [guidanceResult, setGuidanceResult] = (0, import_react2.useState)(null);
  const [guidanceBusy, setGuidanceBusy] = (0, import_react2.useState)(false);
  const [guidanceFailed, setGuidanceFailed] = (0, import_react2.useState)(false);
  const [panelOpen, setPanelOpen] = (0, import_react2.useState)(false);
  const [effortRequest, setEffortRequest] = (0, import_react2.useState)(null);
  const activeRequest = effortRequest?.directory === controller && effortRequest.provider === state.current?.provider && effortRequest.model === state.current.model ? effortRequest : null;
  const busy = activeRequest?.saving === true || state.status === "loading" || state.status === "selecting";
  const listWasOpen = (0, import_react2.useRef)(false);
  const rootRef = (0, import_react2.useRef)(null);
  const triggerRef = (0, import_react2.useRef)(null);
  const menuRef = (0, import_react2.useRef)(null);
  (0, import_react2.useLayoutEffect)(() => {
    if (!open || rootRef.current === null || menuRef.current === null) return;
    return positionModelMenu(rootRef.current, menuRef.current);
  }, [open, modelsOpen]);
  (0, import_react2.useLayoutEffect)(() => {
    const menu = menuRef.current;
    if (open && menu) {
      const active = document.activeElement;
      const lostFocus = active === document.body || menu.contains(active) && active?.matches(":disabled");
      if (modelsOpen && (!listWasOpen.current || lostFocus)) {
        const selected = menu.querySelector('[role="menuitemradio"][aria-checked="true"]:enabled');
        const first = menu.querySelector('[role="menuitemradio"]:enabled');
        const target = selected ?? first ?? menu.querySelector(".re-model-back");
        target?.focus();
      } else if (!modelsOpen && listWasOpen.current) {
        const row = menu.querySelector(".re-model-row:enabled");
        const target = row ?? triggerRef.current;
        target?.focus();
      }
    }
    listWasOpen.current = open && modelsOpen;
  }, [open, modelsOpen, busy]);
  const choice = currentModel(state);
  const offered = choice?.reasoning?.efforts.map((level) => level.id) ?? [];
  const levels = effortStops(offered);
  const preferenceKey = "dsh-reasoning-effort.rung." + JSON.stringify([sessionId, state.current?.provider, state.current?.model]);
  const visualPreference = (0, import_react2.useRef)(null);
  if (visualPreference.current?.key !== preferenceKey) {
    visualPreference.current = { key: preferenceKey, choice: readVisualChoice(preferenceKey) };
  }
  const projected = state.current?.reasoningEffort ?? choice?.reasoning?.defaultEffort;
  const awaitingProjection = activeRequest !== null && activeRequest.error === void 0 && state.status !== "error" && projected === activeRequest.previous && projected !== activeRequest.send && offered.includes(activeRequest.send);
  const selectedEffort = awaitingProjection ? activeRequest.send : state.current?.reasoningEffort;
  (0, import_react2.useEffect)(() => {
    if (effortRequest && (!activeRequest || !effortRequest.saving && !awaitingProjection && (effortRequest.error === void 0 || projected !== effortRequest.previous))) {
      setEffortRequest(null);
    }
  }, [effortRequest, activeRequest, awaitingProjection, projected]);
  const invalidEffort = choice === void 0 ? void 0 : unsupportedEffort(selectedEffort, choice.reasoning?.efforts);
  const effective = selectedEffort ?? choice?.reasoning?.defaultEffort;
  const preferredChoice = activeRequest && activeRequest.error === void 0 ? activeRequest.choice : visualPreference.current.choice;
  const preferred = levels.findIndex((stop) => stop.rung === preferredChoice?.rung && stop.send === effective);
  const selectedIndex = preferred >= 0 ? preferred : Math.max(0, levels.findIndex((stop) => stop.rung === effective));
  const position = preferredChoice?.position;
  const selectedPosition = position !== void 0 && position >= 0 && position <= levels.length - 1 && Math.round(position) === preferred ? position : selectedIndex;
  const visualId = preferred >= 0 ? preferredChoice?.rung : effective;
  const effortName = invalidEffort !== void 0 ? t("effort.invalid", { effort: invalidEffort }) : visualId == null ? t("model.defaultEffort") : displayLevelName(visualId, t);
  const modelLabel = choice?.name ?? state.current?.model ?? t("model.select");
  const provider = state.current?.provider;
  const modelId = state.current?.model;
  const guidance = guidanceResult?.provider === provider && guidanceResult?.model === modelId ? guidanceResult : null;
  const localizedNote = guidance === null ? "" : guidanceNote(guidance, t);
  const localizedWarning = guidance === null ? null : guidanceWarning(guidance, t);
  const localizedSnippet = guidance === null ? "" : guidanceSnippet(guidance, t);
  (0, import_react2.useEffect)(() => {
    if (!available) return;
    load();
  }, [available, load]);
  (0, import_react2.useEffect)(() => {
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
  (0, import_react2.useEffect)(() => {
    setGuidanceResult(null);
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
    event.stopPropagation();
    if (modelsOpen) setModelsOpen(false);
    else close(true);
  };
  const chooseEffort = async (stop, position2) => {
    const current = state.current;
    if (!current || busy || awaitingProjection) return;
    const request = {
      directory: controller,
      provider: current.provider,
      model: current.model,
      choice: { rung: stop.rung, position: position2 },
      send: stop.send,
      previous: projected,
      saving: true
    };
    setEffortRequest(request);
    try {
      const fresh = await controller.load();
      const freshStops = effortStops(currentModel(fresh)?.reasoning?.efforts.map((level) => level.id) ?? []);
      if (fresh.current?.provider !== request.provider || fresh.current.model !== request.model || !freshStops.some((candidate) => candidate.rung === stop.rung && candidate.send === stop.send)) {
        throw new Error(t("effort.choicesChanged"));
      }
      requireAcceptedSelection(await controller.select({
        provider: request.provider,
        model: request.model,
        reasoningEffort: stop.send
      }));
      if (visualPreference.current?.key === preferenceKey) visualPreference.current.choice = request.choice;
      try {
        window.localStorage.setItem(preferenceKey, JSON.stringify(request.choice));
      } catch {
      }
      setEffortRequest((latest) => latest === request ? { ...request, saving: false } : latest);
    } catch (cause) {
      const error = cause instanceof Error ? cause.message : String(cause);
      setEffortRequest((latest) => latest === request ? { ...request, saving: false, error } : latest);
    }
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
  const invalidEffortNotice = invalidEffort === void 0 ? null : /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "re-model-error", role: "alert", children: [
    t("effort.reselect", { effort: invalidEffort }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { type: "button", disabled: busy, onClick: () => {
      if (state.current === null) return;
      void select({
        provider: state.current.provider,
        model: state.current.model,
        ...recoveryEffort === void 0 ? {} : { reasoningEffort: recoveryEffort }
      });
    }, children: t("effort.use", { effort: recoveryEffort ?? t("model.defaultEffort") }) })
  ] });
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { ref: rootRef, className: "re-model-root", style: { "--re-accent": paletteColor(palette) }, onKeyDown, children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
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
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "re-model-name", children: modelLabel }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "re-model-effort", children: effortName }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "re-model-chevron", "aria-hidden": "true" })
        ]
      }
    ),
    open ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { ref: menuRef, className: "re-model-menu", "data-guidance-card": !modelsOpen && guidance?.needsGuide ? "true" : void 0, "data-guidance-expanded": !modelsOpen && guidance?.needsGuide && panelOpen ? "true" : void 0, "data-depth-card": !modelsOpen && levels.length >= 2 && !guidance?.needsGuide ? "true" : void 0, role: "menu", "aria-label": t("model.menuAria"), "aria-busy": busy, children: modelsOpen ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "re-model-pane", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("button", { type: "button", className: "re-model-back", onClick: () => setModelsOpen(false), children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { "aria-hidden": "true", children: "\u2039" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { children: t("model.select") })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "re-model-list", children: [
        state.status === "loading" && state.groups.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "re-model-status", children: t("model.loading") }) : null,
        state.groups.map((group) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("section", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "re-model-group-title", children: group.name }),
          group.models.map((model) => {
            const selected = state.current?.provider === group.id && state.current.model === model.id;
            return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
              "button",
              {
                type: "button",
                role: "menuitemradio",
                "aria-checked": selected,
                className: "re-model-option",
                title: model.description ? `${model.name}
${model.description}` : model.name,
                disabled: busy,
                onClick: () => void chooseModel(group.id, model.id, model.reasoning?.defaultEffort),
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "re-model-option-copy", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "re-model-option-name", children: model.name }) }),
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "re-model-check", "aria-hidden": "true", children: selected ? "\u2713" : "" })
                ]
              },
              model.id
            );
          })
        ] }, group.id)),
        state.status === "ready" && state.groups.every((group) => group.models.length === 0) ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "re-model-status", children: t("model.none") }) : null,
        invalidEffortNotice,
        state.error === null ? null : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "re-model-error", children: state.error })
      ] })
    ] }) : /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
      guidance?.needsGuide ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "re-adapt-heading", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "re-adapt-title", children: guidance.reason === "missing" ? t("effort.unavailable") : t("guidance.mismatch") }) }) : null,
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "re-model-content", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "re-model-body", tabIndex: guidance?.needsGuide ? 0 : void 0, children: [
          levels.length >= 2 ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
            EffortSlider,
            {
              levels,
              selectedPosition,
              selectedName: effortName,
              mappedEffort: effective !== void 0 && offered.includes(effective) ? effective : void 0,
              invalidEffort,
              busy: busy || awaitingProjection,
              error: activeRequest?.error ?? state.error,
              onSelect: chooseEffort,
              t
            },
            JSON.stringify([provider, modelId, ...offered])
          ) : !guidance?.needsGuide ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "re-model-status", children: t("effort.unavailable") }) : null,
          guidance !== null && guidance.needsGuide ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "re-adapt", children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "re-adapt-copy", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "re-adapt-desc", children: guidance.matched ? t("guidance.matched", {
              expected: levelsText(guidance.expected, t),
              current: levelsText(guidance.current, t),
              note: localizedNote
            }) : t("guidance.unmatched", {
              current: levelsText(guidance.current, t),
              note: localizedNote
            }) }) }),
            panelOpen ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "re-adapt-panel", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "re-adapt-scroll", children: [
              guidance.matched ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "re-adapt-panel-line", children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "re-adapt-arrow", children: levelsText(guidance.current, t) }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { "aria-hidden": "true", children: "\u2192" }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "re-adapt-arrow", children: levelsText(guidance.expected, t) })
              ] }) : null,
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "re-adapt-howto", children: t("guidance.howto") }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "re-adapt-switch-intro", children: t("guidance.switch.intro") }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("ul", { className: "re-adapt-switches", children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("li", { children: t("guidance.switch.thinkingFormat") }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("li", { children: t("guidance.switch.reasoningEffort") }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("li", { children: t("guidance.switch.developerRole") }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("li", { children: t("guidance.switch.replay") })
              ] }),
              localizedWarning === null ? null : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "re-adapt-warning", children: localizedWarning }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "re-adapt-label", children: t("guidance.paste") }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("pre", { className: "re-adapt-yaml", children: localizedSnippet }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "re-adapt-steps", children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { children: [
                  t("guidance.step1.open"),
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("code", { children: configDocumentName(guidance.settingsPath) }),
                  guidance.settingsPath === null ? "" : t("guidance.step1.path", { path: guidance.settingsPath }),
                  t("guidance.step1.find"),
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("code", { children: guidance.entryPath }),
                  t("guidance.step1.list"),
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("code", { children: guidance.entryLine }),
                  t("guidance.step1.end")
                ] }),
                guidance.mode === "replace" ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { children: [
                  t("guidance.step2.replacePrefix"),
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("code", { children: guidance.entryLine }),
                  t("guidance.step2.replaceSuffix")
                ] }) : /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { children: [
                  t("guidance.step2.insertPrefix"),
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("code", { children: "id" }),
                  t("guidance.step2.insertSuffix")
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { children: t("guidance.step3") })
              ] })
            ] }) }) : null
          ] }) : null,
          guidanceFailed ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "re-model-status", role: "status", children: t("guidance.unavailable") }) : null,
          guidance?.needsGuide ? invalidEffortNotice : null,
          guidance?.needsGuide && state.error !== null ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "re-model-error", children: state.error }) : null
        ] }),
        guidance?.needsGuide ? panelOpen ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "re-adapt-actions", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
            CopyButton,
            {
              className: "re-adapt-apply",
              variant: "primary",
              label: t("guidance.copy"),
              disabled: busy || guidanceBusy,
              text: () => localizedSnippet,
              t
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
            CopyButton,
            {
              className: "re-adapt-agent",
              variant: "outline",
              label: t("agent.copy"),
              disabled: busy || guidanceBusy,
              text: () => agentBrief(guidance, localizedSnippet, agentTutorial(), localizedWarning, t),
              t
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(GuidanceButton, { variant: "ghost", className: "re-adapt-cancel", onClick: () => setPanelOpen(false), children: t("guidance.collapse") })
        ] }) : /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "re-adapt-open-row", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(GuidanceButton, { variant: "primary", className: "re-adapt-open", onClick: () => setPanelOpen(true), children: guidanceBusy ? t("guidance.checking") : t("guidance.open") }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
            CopyButton,
            {
              className: "re-adapt-agent",
              variant: "outline",
              label: t("agent.copy"),
              disabled: busy || guidanceBusy,
              text: () => agentBrief(guidance, localizedSnippet, agentTutorial(), localizedWarning, t),
              t
            }
          )
        ] }) : null,
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "re-menu-separator" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
          "button",
          {
            type: "button",
            role: "menuitem",
            className: "re-model-row",
            disabled: busy,
            onClick: () => setModelsOpen(true),
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "re-model-row-name", children: modelLabel }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "re-model-row-effort", children: effortName }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "re-row-chevron", "aria-hidden": "true", children: "\u203A" })
            ]
          }
        ),
        guidance?.needsGuide ? null : invalidEffortNotice,
        !guidance?.needsGuide && state.error !== null ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "re-model-error", children: state.error }) : null
      ] })
    ] }) }) : null
  ] });
}
function CopyButton({ text, label, t, ...button }) {
  const [feedback, setFeedback] = (0, import_react2.useState)(null);
  const attempt = (0, import_react2.useRef)(0);
  (0, import_react2.useEffect)(() => {
    if (!feedback) return;
    const timer = window.setTimeout(() => setFeedback(null), 2400);
    return () => window.clearTimeout(timer);
  }, [feedback]);
  const copy = async () => {
    const current = ++attempt.current;
    const ok = await copyText(text());
    if (current === attempt.current) setFeedback({ ok });
  };
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(GuidanceButton, { ...button, "aria-label": label, onClick: () => void copy(), children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { "aria-live": "polite", "aria-atomic": "true", children: feedback === null ? label : t(feedback.ok ? "guidance.copied" : "guidance.copyFailed") }) });
}
function ReasoningEffortSetting({ t }) {
  const enabled = (0, import_react2.useSyncExternalStore)(enabledStore.subscribe, enabledStore.getSnapshot);
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "re-setting-row", children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "re-setting-copy", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "re-setting-title", children: t("settings.effort.title") }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "re-setting-description", children: t("settings.effort.description") })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "re-setting-control", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "re-setting-state", children: enabled ? t("settings.enabled") : t("settings.disabled") }),
      HostSwitch ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(HostSwitch, { checked: enabled, label: t("settings.effort.aria"), onChange: (value) => enabledStore.set(value) }) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        "button",
        {
          type: "button",
          role: "switch",
          "aria-label": t("settings.effort.aria"),
          "aria-checked": enabled,
          className: `re-setting-switch${enabled ? " is-on" : ""}`,
          onClick: () => enabledStore.set(!enabled),
          children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "re-setting-switch-knob", "aria-hidden": "true" })
        }
      )
    ] })
  ] });
}
function PaletteSetting({ t }) {
  const sliderEnabled = (0, import_react2.useSyncExternalStore)(enabledStore.subscribe, enabledStore.getSnapshot);
  const selected = (0, import_react2.useSyncExternalStore)(paletteStore.subscribe, paletteStore.getSnapshot);
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "re-setting-row", children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "re-setting-copy", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "re-setting-title", children: t("settings.palette.title") }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "re-setting-description", children: t("settings.palette.description") })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "re-setting-control", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "re-palette-picker", role: "radiogroup", "aria-label": t("settings.palette.aria"), children: [
      PALETTES.map((palette) => {
        const active = palette.id === selected;
        return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
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
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("label", { className: "re-custom-palette", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { children: t("settings.palette.custom") }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
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
var reportedCapabilities = /* @__PURE__ */ new Set();
function reportOnce(message, method) {
  if (reportedCapabilities.has(message)) return;
  reportedCapabilities.add(message);
  console[method](`${LOG_PREFIX} ${message}`);
}
function apply(ctx) {
  const slots = ctx.get("slots");
  const modelDirectories = ctx.get("modelDirectories");
  const connection = ctx.get("connection");
  const locale = ctx.get("locale");
  const capabilities = clientCapabilities({ slots, modelDirectories, locale, connection });
  if (!capabilities.seat || modelDirectories === void 0) {
    reportOnce(unsupportedMessage(capabilities), "error");
    return;
  }
  for (const note of capabilities.degraded) reportOnce(note, "info");
  const adapt = makeAdaptationService(connection?.rpc);
  ctx.effect(() => ctx.locale.register(NS, { zh, en }), "reasoning-effort: dictionaries");
  ctx.effect(() => {
    const style = document.createElement("style");
    style.dataset.plugin = "@missher/dsh-reasoning-effort";
    style.textContent = CSS + PIXEL_CSS + MODEL_SETTINGS_CSS;
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
  registerModelSettings(ctx);
  ctx.slots.inject(
    SETTINGS_SLOT,
    () => ctx.slots.register(
      { name: SETTINGS_SLOT, id: "reasoning-effort-enabled", order: 15, locale: NS },
      (props) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ReasoningEffortSetting, { ...props }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(PaletteSetting, { ...props })
      ] })
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
              sessionId,
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
