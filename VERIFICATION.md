# Verification scope / 验证范围

## 0.7.6 — 2026-10-17

### Runtime matrix

| Runtime | Actual environment | Evidence |
| --- | --- | --- |
| Official npm DSH `0.2.1-alpha.5` | Cordis `4.0.5`, Schemastery `3.18.5`, Loader `1.0.6`; fresh Web profile on Linux | Actual profile resolver and Loader activation; authenticated guidance with `401` for unauthenticated calls and `403` for a bad Origin; read-only diagnosis and declared levels; client graph/served bytes; route and Loader cleanup. Actual Chrome UI uses synthetic models. |
| Missher community DSH `0.2.0-rc.2` | Cordis `4.0.4`, Schemastery `3.18.4`, Loader `1.0.5`; fresh Web profile | Actual Host activation, request fence, diagnosis and unloading with unchanged Host runtime bytes; client graph/served-byte smoke preceded the final positioning fix. No final UI claim on this Host. This is a community extension, not a pristine official runtime. |
| Missher community DSH `0.2.1-alpha.2` | Cordis `4.0.5-alpha.1`; fresh Web profile | Same Host checks and final-client limitation as rc.2. This is an older community extension; alpha.5 is the official baseline for this delivery. |

The guidance endpoint returns the same `405` as an unregistered POST after unloading. The official alpha.5 check also verifies removal from the WebServer prefix map and Loader entries; an error response alone is not treated as proof of cleanup. Model inference and external network attempts are blocked in the isolated acceptance profiles. No real model inference is part of these checks.

### Capability and lifecycle checks

- Nineteen controlled service-contract checks use actual official Cordis 4.0.5. Missing required services stay pending; missing required members produce precise diagnostics. Missing or unreadable settings namespaces fall back to the plugin's own configuration. Late optional channel services register correctly; missing request validation or route registration leaves no insecure channel. These are controlled fixtures, separate from the full Host runs above.
- Eight client slot-lifecycle checks use actual official alpha.5 browser seeds, module system, SlotRegistry and SlotCore with the built plugin factory. They cover an absent Models extension, late declaration, removal, redeclaration, consumer cleanup and a pending consumer unloaded before declaration. Non-slot services are controlled fixtures; bootstrap instrumentation only exposes existing runtime objects to the private verifier.
- Public client factory/export smoke and independent private apply-contract checks pass. Runtime `remote` and `remote.session` injections are retained because model directory methods use them indirectly on the caller's Cordis context.
- TypeScript, Host/client builds, client declarations and bilingual text checks pass. All five sequential logic suites pass: levels, palettes, selection, pixel field and model capabilities. Later positioning-only changes receive targeted client rebuild/type checks and actual browser regression; unrelated logic suites are not repeated.

### UI and artifacts

Actual alpha.5 Chrome acceptance uses a synthetic provider with `low`, `high`, `max` and a second model without declared levels. An expanded menu stays open while resizing from 1280 × 900 to 390 × 700, 390 × 300 and 220 × 240. Both viewport bounds and Host ancestor clipping are checked: the heading and copy action pass five-point hit tests, equal-size actions remain reachable, and screenshots are inspected. At 390 × 700 the expanded menu occupies x=68, y=52, width=303, height=360, inside the Host content area. Forty-one real pointer samples have zero vertical thumb/menu movement; the top step submits `max`. Clipboard output contains the synthetic provider and model. It verifies selection, top-level `max` submission, clipboard content, palette persistence, enable/disable and responsive guidance. The normal slider retains the selected particle design. Actual UI screenshots and capture details are in [docs/images](docs/images/README.md).

The final tarball is checked for package entrypoints, Bundle patch, licenses, screenshot inclusion and absence of Host module copies or private verification/task data. Runtime files are frozen before documentation-only packaging and bound to the acceptance records by SHA256. Source, package, Git publication, Release availability and daily installation remain separate evidence layers.

### Limits

No new native Electron/macOS/Windows acceptance, real-provider inference or user daily-profile installation is claimed for 0.7.6. The optional model-row extension is exercised with the actual slot registry; this is not a new end-to-end model-settings save transaction on every Host. Peer ranges describe installation admission, not certification of every release. The historical records below do not replace current-version acceptance.


## Historical 2026-10-12 layout candidate: 0.7.5-local.16

- Source recovered by a fresh clone of main at `5ac04cbc2845e330cb3a8445324391ded4331cd7`, with an initially clean worktree. No historical migration copy was overwritten.
- The previous built component reproduced the reported bug: after 9 px of body scrolling, the heading's top was at 83 px while the body clipped at 88 px. The fix moves the heading outside the scrolling content.
- Browser checks use the actual built client with a simulated model directory and guidance result. At 360 × 620, copy buttons remained 137 × 36 before/after feedback. At 260 × 620, the English heading wrapped to two lines and both actions were 99 × 52. At 320 × 360 the body retained 89 px of scrolling space. At 220 × 240, the heading remained separate while copy and collapse actions could be reached in the lower scroller. No horizontal menu overflow was measured.
- Light/dark theme fixtures, Chinese/English headings and copied feedback were visually checked. The existing browser selection fixture passed all 13 checks, including refusal rollback and explicit invalid-effort recovery.
- TypeScript, bilingual checks, Host/client builds and client-loader checks passed. After the final scroll-boundary adjustment, the client build/load, TypeScript, client declarations and diff whitespace checks passed again.
- This is a local candidate, with no new native DSH installation, alpha.2 Host acceptance or real provider request. Final Git/release/profile installation remains assigned to the Desktop owner. Earlier evidence below is historical, not a substitute for a fresh integration check.

## Previous metadata delivery: 0.7.5-local.15

`0.7.5-local.15` prepares marketplace metadata and documentation. Host/client source and generated runtime bytes are unchanged from `0.7.5-local.14`; particle geometry and model behaviour were not redesigned.

## 2026-10-05 delivery

- On Intel macOS, in an isolated source snapshot: TypeScript, Host and client builds, client module loading, bilingual copy checks, and all five sequential logic suites passed.
- Build dependencies use the existing rc.2 SDK, Cordis 4.0.4, Schemastery 3.18.4 and React 18.3.1. DSH runtime peers remain permissive; this does not certify new host versions.
- A fresh isolated Web profile using the packaged Missher Desktop rc.2 runtime passed the real profile package-manager add/remove path. The bundle selection and dependency were added/removed correctly, with the profile patch preserved.
- One isolated Host run listed 188 Loader entries; all 161 enabled entries were active, including this plugin. The served client matched `.14` exactly (`21f698782d0823429a5847a643b97583e20c4aa4680fa026d6b69c8659c7b7f7`). No sessions or model calls were created, and the Host was shut down normally.
- Package entrypoints, Bundle patch, dependency specs, retained licenses and absence of private absolute paths are checked on the final tarball.
- Release asset download, community catalog submission/merge, and marketplace searchability are separate publication steps. Repository availability alone does not prove any of these.

## Earlier runtime/UI evidence

- `.14`: Intel macOS customized Missher Desktop rc.2 installation, active Loader and matching client bytes were checked on 2026-10-03.
- Controlled UI coverage: narrow/short viewports, long model names/paths/errors, top-anchored menus, single warning, equal action buttons, PageDown, and unchanged copied Agent instructions. Normal particle card width remained 216px.
- Official rc.2 Web loading was checked in isolation in the preceding SDK baseline. Inline model-card settings require the companion `settings.models.model-fields` Host extension; official rc.2 does not provide it.

## Historical metadata-version limits / 历史包装版本限制

No new native GUI or real model/provider call was performed for that packaging-only version. Windows/Linux native acceptance and arbitrary newer DSH releases are not claimed. The plugin does not ship a compatibility Bundle or copy Host modules. Test suites run sequentially; no multi-worker GUI validation is required for this metadata revision.
