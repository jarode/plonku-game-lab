# 017 — Third runner factory v2 proof — RESULT

## Status

PASS

## Product

**Pigeon Dash** (`games/pigeon-dash/`) — park-strut one-input runner. Created only with `node tools/instantiate-runner.mjs pigeon-dash --title "Pigeon Dash"`. Zombie/Traffic folders were not copied.

Theme via `skins/pigeon-v1` (walk-cycle remap, skeleton/sign/cactus hazards) + unique `chunks.json` ids (`park-easy-*` / `park-med-*` / `park-hard-*`) + `runner.json` (title, speed 480, spawn 1.1).

## Measurements

| Metric | Value |
| --- | --- |
| Instantiate | **74 ms** |
| Skin + chunk + config sync | **200 ms** |
| Time to first `WEB_EXPORT: PASS` | **~3.2 s** (instantiate + sync + 2894 ms export) |
| Time to `RUNNER_REGRESSION: PASS` | **~22 s** additional (harness includes a second export) |
| Client-specific source files | **14** (no `assets/` tree) |
| Duplicated placeholder binaries in the client | **0** |
| Core/template files modified for this client | **none** |

## Validation

| Check | Outcome |
| --- | --- |
| Factory instantiate (not copy) | PASS |
| `apply-skin pigeon-v1` | APPLY_SKIN: PASS (34 resources) |
| `WEB_EXPORT` | PASS |
| `RUNNER_REGRESSION` | PASS |
| Nested event-sheet edits for title/speed | None — `runner.json` only |

## Defects / generic fixes

None. No factory bug required a template patch.

## Files changed

- `games/pigeon-dash/**` (project, `runner.json`, `chunks.json`, `skins/pigeon-v1/manifest.json`, README)
- `docs/codex-manual-tasks/017_third_runner_factory_v2_proof-RESULT.md`

## Known limitations

Placeholder pack art still reads as “desert dino,” not a finished pigeon IP. Production art would replace slots only.

## Commit SHA

Implementation: `76664af62e80f5d51602c3517ef498bc7964c575`

## Operator actions required

None.

## Safety

```text
production_deploy_executed: false
external_paid_services_used: false
secrets_committed: false
store_publication_executed: false
```
