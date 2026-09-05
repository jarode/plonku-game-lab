# 001 — GDevelop toolchain preflight — RESULT

## Status

PASS

## Summary of changes

Set up the lab source layout and documented the single canonical GDevelop 5 project path. Recorded a truthful local toolchain snapshot: Node.js is present; the GDevelop desktop editor/CLI is not installed, so preview and export cannot be executed yet. Generated exports, autosaves, and `tools/local/` binaries are gitignored. No game template was imported.

## Files changed

- `.gitignore`
- `README.md` (repository layout)
- `docs/decisions/README.md`
- `docs/decisions/001-gdevelop-project-file-convention.md`
- `games/zombie-runner/README.md`
- `tools/README.md`
- `docs/codex-manual-tasks/001_gdevelop_toolchain_preflight-RESULT.md` (this file)

## Validations run and outcomes

| Check | Outcome |
| --- | --- |
| Directories `games/zombie-runner/`, `tools/`, `docs/decisions/` exist | PASS |
| Canonical project path documented as `games/zombie-runner/zombie-runner.json` | PASS |
| No second/competing GDevelop project JSON created | PASS |
| `.gitignore` matches `games/**/export/`, `*.autosave`, `tools/local/`, `node_modules/` | PASS (`git check-ignore -v`) |
| GDevelop editor/CLI on PATH, Start Menu, uninstall registry, npm globals | Not found (documented) |
| Node.js | `v24.15.0` (`F:\nodejs\node.exe`) |
| Deploy/publish | not attempted |
| Unrelated task files (`002`–`012`, `.ai/WORKFLOW.md`) | unchanged |

## Known limitations

- GDevelop 5 is not installed on this machine, so open/preview/HTML5 export were not run.
- Headless `--run-command EXPORT_HTML5_EXTERNAL` is therefore unverified.
- `zombie-runner.json` does not exist yet (task 002).

## Commit SHA

Implementation: `4aa76b4e0aa2814ab1c5ee5c79d2375f4300b690`

## Operator actions required

1. Install GDevelop 5 (free) from https://gdevelop.io on this Windows machine.
2. Confirm File → Open on `games/zombie-runner/zombie-runner.json` after task 002 creates it.

## Safety

```text
production_deploy_executed: false
external_paid_services_used: false
secrets_committed: false
store_publication_executed: false
```
