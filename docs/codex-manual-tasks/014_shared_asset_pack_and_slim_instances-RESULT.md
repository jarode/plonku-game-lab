# 014 — Shared asset pack and slim instances — RESULT

## Status

PASS

## Architecture

Shared placeholder binaries live in **`templates/runner-v1/assets/`** (repo-local, no CDN, no symlinks). Client GDevelop `file` paths are relative to the project, e.g. `../../templates/runner-v1/assets/Dino/Dino_Idle_1.png`. HTML5 export still copies files **into** `build/` (runtime does not load from the repo).

`node tools/instantiate-runner.mjs` no longer copies `assets/` (or unused `preview.png`). `node tools/relink-runner-pack.mjs --game <dir>` rewrites existing clients. Game-specific files may still sit in `<game>/assets/`.

## Before / after

| Instance | Placeholder binaries in the game folder |
| --- | --- |
| Task 011 Traffic Dash | **90** under `assets/` |
| Fresh instantiate after 014 (`slim-probe`) | **1** (`preview.png` before skip) then **0** assets dir |
| Zombie / Traffic after migration | `assets/` **removed**; pack is shared |

Instantiate `slim-probe`: ~78 ms, `WEB_EXPORT: PASS`, then deleted (not kept as a product).

## Validations

| Check | Outcome |
| --- | --- |
| Zombie export after relink + delete local assets | **WEB_EXPORT: PASS** |
| Traffic Dash same | **WEB_EXPORT: PASS** |
| `apply-skin traffic-v1` after slim | APPLY_SKIN: PASS |
| slim-probe export | **WEB_EXPORT: PASS** |

## Files changed

- `tools/runner-pack.mjs`, `tools/relink-runner-pack.mjs`
- `tools/instantiate-runner.mjs`, `tools/apply-skin.mjs`
- `templates/runner-v1/README.md`
- Zombie + Traffic JSON/snapshots; removed duplicated `assets/` trees
- `docs/codex-manual-tasks/014_shared_asset_pack_and_slim_instances-RESULT.md`

## Known limitations

- GDevelop still copies every used resource into each game's `build/` (expected for portable HTML5).
- Opening a slim project in GDevelop requires the template pack path to exist on disk.
- Custom art still belongs in the client `assets/` folder when added.

## Commit SHA

Implementation: `b02875291f8cc12cb84236f0521269a13a51ff9b`

## Operator actions required

None.

## Safety

```text
production_deploy_executed: false
external_paid_services_used: false
secrets_committed: false
store_publication_executed: false
```
