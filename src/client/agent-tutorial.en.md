# Edit rules

- Read the target model and its route's `api` and `baseURL`. Confirm supported levels and values in the endpoint documentation. Reference levels and snippets are suggestions, not endpoint guarantees; do not guess.
- Edit only that model's `reasoningEfforts`. Preserve other fields, routes and settings; do not duplicate the provider.
- Keys: `off`, `minimal`, `low`, `medium`, `high`, `xhigh`, `max`. Values must match the endpoint; omitted levels are unavailable. `off: null` omits the parameter when off. `false` declares no selectable levels, not necessarily no internal reasoning. Never use an empty object.
- Add `compat` only for `api: openai-completions` with endpoint documentation or a specific error as evidence. A generic 400 error does not justify guessing switches.
- Save and refresh the model directory; the slider needs at least two levels. Report changes and actual verification. A visible slider proves the declaration was read, not that a real request succeeded.
