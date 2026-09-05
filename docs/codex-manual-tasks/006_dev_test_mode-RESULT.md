# 006 — Dev/Test Mode — RESULT

## Status

PASS

## Controls implemented

Enabled only with `?dev=1` (or `#dev=1`) on the HTML5 URL. Absent that, `Invincible=0`, time scale 1, `DevHud` hidden.

| Control | Implementation |
| --- | --- |
| Invincibility | I toggles scene `Invincible`; death events require `Invincible = 0` |
| Time scale | 1 / 2 / 3 → 0.5x / 1x / 2x (`TimeManager.setTimeScale`) |
| Scroll/player world speed | PageUp / PageDown → `ObstacleSpeed` (same var chunks use) |
| Jump power | +/- → `PlatformerObject.setJumpSpeed` on Dino |
| Start EASY/MEDIUM/HARD | E / M / H then Game scene replace |
| Jump to a chunk | N cycles `DevForceChunk` then restart |
| Restart test | R replaces Game scene |
| HUD | `DevHud` text object, hidden in player mode |

Usage: `games/zombie-runner/DEV-MODE.md`

## Files changed

- `games/zombie-runner/zombie-runner.json`
- `games/zombie-runner/DEV-MODE.md`
- `tools/chunk-runtime.template.js` (synced into project via `sync-chunk-catalog.mjs`)
- `docs/codex-manual-tasks/006_dev_test_mode-RESULT.md` (this file)

## Validations

| Check | Outcome |
| --- | --- |
| Export smoke | PASS |
| Generated code includes `zrIsDev` and `DevHud` | PASS |
| Player mode default (no query) restores invincible 0 / timescale 1 | PASS (code path) |

## Known limitations

- Changing `ObstacleSpeed` mid-run does not rewrite forces on already spawned hazards; R after edit.
- Laptop keyboards without numpad should use `=` / `-`.
- Dev HUD may wrap on narrow portrait; acceptable for testers.

## Commit SHA

Implementation: `11df38131667cc32398c7e9b71fa1883df79b944`

## Operator actions required

None.

## Safety

```text
production_deploy_executed: false
external_paid_services_used: false
secrets_committed: false
store_publication_executed: false
```
