# Verification scope / 验证范围

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

## Limits / 限制

No new native GUI or real model/provider call was performed for this packaging-only version. Windows/Linux native acceptance and arbitrary newer DSH releases are not claimed. The plugin does not ship a compatibility Bundle or copy Host modules. Test suites run sequentially; no multi-worker GUI validation is required for this metadata revision.
