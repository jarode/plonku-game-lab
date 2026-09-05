# 003 — Reproducible web export — RESULT

## Status

PASS

## Commands

From the repository root, GDevelop editor **closed**:

```text
node tools/gdevelop-web-export.mjs
```

Smoke only (no GDevelop process):

```text
node tools/gdevelop-web-export.mjs --smoke-only
```

GDevelop path: `GDEVELOP_EXE` or `GDEVELOP_HOME` (default `F:\gry\GDevelop-5\GDevelop.exe`).

Underlying CLI (what the helper runs):

```text
GDevelop.exe --disable-update-check --run-command EXPORT_HTML5_EXTERNAL games/zombie-runner/zombie-runner.json
```

Output (gitignored): `games/zombie-runner/build/`

PASS/FAIL signal: last line `WEB_EXPORT: PASS` (exit 0) or `WEB_EXPORT: FAIL` (exit 1).

## Summary of changes

Added a repo-local Node helper that runs the already-verified local GDevelop 5.6.281 `EXPORT_HTML5_EXTERNAL` path, then checks `index.html`, script/href files, GDJS runtime files, generated `codeN.js`, and all 79 project resources. No cloud export. Canonical game JSON was not edited.

## Files changed

- `tools/gdevelop-web-export.mjs`
- `tools/README.md`
- `games/zombie-runner/README.md`
- `docs/decisions/001-gdevelop-project-file-convention.md` (export dir = `build/`)
- `docs/codex-manual-tasks/003_reproducible_web_export-RESULT.md` (this file)

## Validations run and outcomes

| Check | Outcome |
| --- | --- |
| `node tools/gdevelop-web-export.mjs` | PASS — CLI success marker; 114 `index.html` refs; `gd.js`/`data.js`/`runtimegame.js`/`runtimescene.js`; `code0.js`–`code2.js`; 79/79 resources |
| `node tools/gdevelop-web-export.mjs --smoke-only` | PASS |
| Missing `GDEVELOP_EXE` | FAIL (exit 1) as expected |
| Generated bundle committed | no (`build/` gitignored) |
| Public deploy | not attempted |
| `zombie-runner.json` | unchanged |

## Known limitations

- Requires local portable GDevelop at `GDEVELOP_HOME` (not in git). A fresh checkout still needs that install (or `GDEVELOP_EXE`).
- If GDevelop is already open on the same project, the CLI may not wait for a real result.
- Cleaning `games/zombie-runner/build/` can hit Windows `EPERM`; the helper then overwrites in place.
- Default output is GDevelop’s `build/` folder next to the project, not `export/web`.

## Commit SHA

Implementation: `ae8f67bda3b99ccf019a70c1a6b3111899d46fdf`

## Operator actions required

None if `F:\gry\GDevelop-5\GDevelop.exe` is still present. Otherwise set `GDEVELOP_HOME` / `GDEVELOP_EXE`.

## Safety

```text
production_deploy_executed: false
external_paid_services_used: false
secrets_committed: false
store_publication_executed: false
```
