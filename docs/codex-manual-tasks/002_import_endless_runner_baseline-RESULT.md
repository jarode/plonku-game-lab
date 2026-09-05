# 002 — Import Endless Runner baseline — RESULT

## Status

PASS

## Upstream source

- **Run, Dino run** — official GDevelop example, MIT.
- Repo: https://github.com/GDevelopApp/GDevelop-examples (`examples/run-dino-run/`)
- Commit: `3294639da3a7c8f079304381b4a08877ea42b9de`
- Listing: https://gdevelop.io/game-example/free/run-dino-run
- Canonical file: `games/zombie-runner/zombie-runner.json` (renamed from `run-dino-run.json` only).
- Details: `games/zombie-runner/PROVENANCE.md`

Chosen over `starting-3d-endless-runner` because this lab’s later Zombie Runner work is 2D; this example already has auto-run, jump/duck, hazards, score, keyboard, and touch.

## Summary of changes

Installed GDevelop 5.6.281 portable at `F:\gry\GDevelop-5` (not committed). Copied the official example into the canonical folder without gameplay or art edits. Documented how to open, preview, and export.

## Files changed

- `games/zombie-runner/zombie-runner.json`
- `games/zombie-runner/assets/**`
- `games/zombie-runner/preview.png`
- `games/zombie-runner/PROVENANCE.md`
- `games/zombie-runner/UPSTREAM-README.md`
- `games/zombie-runner/README.md`
- `docs/decisions/001-gdevelop-project-file-convention.md` (toolchain now installed)
- `docs/codex-manual-tasks/002_import_endless_runner_baseline-RESULT.md` (this file)

## Validations run and outcomes

| Check | Outcome |
| --- | --- |
| JSON parses; `folderProject: false`; one project file | PASS |
| 79/79 resource `file` paths exist on disk | PASS |
| Controls present in project/export: Up/Down keys, JumpButton/DuckButton, touch tutorial, `HasTouchScreen` | PASS (static + generated `code1.js`) |
| GDevelop CLI `EXPORT_HTML5_EXTERNAL` | PASS — `[CLI] Command "EXPORT_HTML5_EXTERNAL" finished successfully.`; `build/index.html` present (gitignored) |
| Browser smoke of export (`http://127.0.0.1:8765/`) | PASS — Intro (Start / See scores) then Game tutorial “Press any key to start running.” |
| No competing `.json` project | PASS |
| Paid assets | none |

## Known limitations

- Editor Preview was not used; validation used headless export + browser.
- DOM `ArrowUp` did not start the run (GDevelop reads native keyboard on the canvas). Keyboard wiring is still in the exported events.
- Example includes a Leaderboard scene (upstream); may contact GDevelop leaderboards if used.
- Project remains landscape 960×540 (upstream). Portrait 9:16 is task 004+.
- GDevelop portable is local-only at `F:\gry\GDevelop-5`.

## Commit SHA

Implementation: `b29dbe148b2f658377d2392317e290df30c8a029`

## Operator actions required

None required to accept this task. To preview in the editor: open `F:\gry\GDevelop-5\GDevelop.exe` then the canonical JSON.

## Safety

```text
production_deploy_executed: false
external_paid_services_used: false
secrets_committed: false
store_publication_executed: false
```
