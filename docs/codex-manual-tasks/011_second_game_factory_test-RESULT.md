# 011 — Second game factory test — RESULT

## Status

PASS

## Second game

**Traffic Dash** at `games/traffic-dash/`, instantiated with:

```text
node tools/instantiate-runner.mjs traffic-dash --title "Traffic Dash"
```

Theme: roadside/traffic using remapped MIT example sprites (duck runner, tree / road sign / cactus, thumbnail background, grass strip, restart-as-jump). No files copied from `games/zombie-runner/`.

## Client changes (required minimum)

| Required | What changed |
| --- | --- |
| Player skin | `skins/traffic-v1` remaps Dino idle/run/jump/dead → Duck frames |
| Three hazards | cactus→Tree, island→Sign-1, wreck→Cactus (2) |
| Background/ground | `Desert Background` → thumbnail; north tile → Grass (2) |
| Title/logo text | Project name + Preparing/Playing/Dead HUD = Traffic Dash |
| ≥3 chunks | easy-01 wreck@400 width 800; med-01 cactus+wreck; hard-01 wider 1100; plus other layout tweaks |
| Balance | `ObstacleSpeed` 550 → **420** |

## Template / core

| Area | Touched? |
| --- | --- |
| Jump / collision events | No |
| Zombie Runner JSON | No |
| Template runtime | Yes — `HudTitle` scene variable (retry HUD). Justified: sync was overwriting client titles. |
| Template `runner-v1.json` | Yes — empty `HudTitle` variable so new instantiations have the slot |

## Production evidence

| Metric | Measured |
| --- | --- |
| T0 instantiate | ~125 ms |
| T0 first export (unthemed instance) | **WEB_EXPORT: PASS**, ~3.0 s |
| Themed export | **WEB_EXPORT: PASS**, ~5 s including skin+sync |
| New raster/audio assets added | **0** |
| `apply-skin` remaps | 41 resources |
| Core gameplay functions edited | 1 (`zrSoftReset` HUD), not jump/collision |
| Files in `games/traffic-dash/` | instantiate copy of seed + `skins/traffic-v1/` + edited `chunks.json` / HUD / README |

### Friction

- HUD title lives in several event strings **plus** `HudTitle` after retry; easy to miss without the template fix.
- `apply-skin` keys are GDevelop resource **names**, not ASSET-CONTRACT slot ids.
- Instantiate duplicates the whole placeholder art tree (~90 files) into the new game.
- Chunk change is JSON + one sync; balance is one scene variable.

## Validations

- `node tools/gdevelop-web-export.mjs --game games/traffic-dash` → **WEB_EXPORT: PASS** (before and after theme).
- Catalog in the Game JsCode includes `easy-01` WreckObstacle and `ObstacleSpeed` 420.

## Files changed

- `games/traffic-dash/**` (new client)
- `templates/runner-v1/runtime/chunk-runtime.template.js`
- `templates/runner-v1/runner-v1.json`
- `templates/runner-v1/README.md`
- `docs/codex-manual-tasks/011_second_game_factory_test-RESULT.md` (this file)

## Known limitations

- Art is still the dino example pack; traffic is a remap, not unique illustration.
- Collision boxes do not auto-fit remapped sprites.
- Unused Intro/Leaderboard scenes remain in the instance.

## Commit SHA

Implementation: `ba3535fc7f1809bf15500cbaa3398b6110e0326f`

## Operator actions required

None.

## Safety

```text
production_deploy_executed: false
external_paid_services_used: false
secrets_committed: false
store_publication_executed: false
```
