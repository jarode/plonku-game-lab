# 013 — Slot-based skin contract v2 — RESULT

## Status

PASS

## Contract

`templates/runner-v1/skins/slot-map.v2.json` maps slot ids → GDevelop resource names.

`tools/apply-skin.mjs` applies `manifest.slots`. `$baseline` keeps snapshot files. Empty slots restore the baseline. v1 `resources` maps remain as a compat path.

Migrated: `wroclaw-v1`, `alt-blocky`, `traffic-v1`, template/traffic `default`.

## Validations

| Check | Outcome |
| --- | --- |
| `apply-skin traffic-v1 --game games/traffic-dash` | APPLY_SKIN: PASS (41 resources) |
| `apply-skin alt-blocky` then `wroclaw-v1` | PASS (4 then 4) |
| Invalid skin missing required slots | APPLY_SKIN: FAIL, exit 1 |
| Zombie `WEB_EXPORT` | PASS |
| Traffic Dash `WEB_EXPORT` | PASS |
| Jump/collision/chunk/state events | Not edited |

## Files changed

- `templates/runner-v1/skins/slot-map.v2.json`
- `templates/runner-v1/ASSET-CONTRACT.md`
- `tools/apply-skin.mjs`, `tools/README.md`
- Skin manifests under zombie, traffic-dash, template
- Client `ASSET-CONTRACT.md` pointers
- `docs/codex-manual-tasks/013_slot_based_skin_contract_v2-RESULT.md`

## Known limitations

- `background_near` has no dedicated GDevelop resource in v1 projects (optional, empty list).
- Slot values are still files inside the game directory (shared pack is task 014).
- Animation slots need either one file-for-all or an array matching frame count.

## Commit SHA

Implementation: `7de53a2fc2456331e6b1ac92a649e20279f3273e`

## Operator actions required

None.

## Safety

```text
production_deploy_executed: false
external_paid_services_used: false
secrets_committed: false
store_publication_executed: false
```
