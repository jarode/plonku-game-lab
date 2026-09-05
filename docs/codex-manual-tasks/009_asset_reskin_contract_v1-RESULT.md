# 009 — Asset/Reskin Contract v1 — RESULT

## Status

PASS

## Contract

`games/zombie-runner/ASSET-CONTRACT.md` — slots player, hazard_01/02/03, background_far/near, ground, powerup_optional, button, logo_optional.

Canonical object names stay `Dino` / `CactusObstacle` / `IslandObstacle` / `WreckObstacle`. Skins remap resource `file` only via `node tools/apply-skin.mjs <skin>`.

## Alternate reskin proof

Skin `alt-blocky` remaps cactus→Tree, wreck→Cactus (2), jump button→RestartButton (already in the MIT example set).

- `node tools/apply-skin.mjs alt-blocky` then export → **WEB_EXPORT: PASS**
- Restored `wroclaw-v1` (4 resources) then export → **WEB_EXPORT: PASS**

Committed project remains the Wrocław/dino placeholder set. Chunk JSON and jump/score/state JS were not edited for the swap.

## Files changed

- `games/zombie-runner/ASSET-CONTRACT.md`
- `games/zombie-runner/skins/wroclaw-v1/manifest.json`
- `games/zombie-runner/skins/wroclaw-v1/resource-files.json`
- `games/zombie-runner/skins/alt-blocky/manifest.json`
- `tools/apply-skin.mjs`
- `tools/README.md`
- `docs/codex-manual-tasks/009_asset_reskin_contract_v1-RESULT.md` (this file)

## Validations

Both skins exported with the task 003 helper PASS.

## Known limitations

- Alt skin is a remap of existing example sprites, not new Wrocław art.
- `background_near` shares the far background object in v1.
- Collision masks do not auto-fit remapped images; semantics preserved by keeping similar silhouettes.

## Commit SHA

Implementation: `53c4f43fb0a5138f37bcb49a12a38c5b0213ef35`

## Operator actions required

None.

## Safety

```text
production_deploy_executed: false
external_paid_services_used: false
secrets_committed: false
store_publication_executed: false
```
