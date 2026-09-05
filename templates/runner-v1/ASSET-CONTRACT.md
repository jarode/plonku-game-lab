# Asset / reskin contract v2

Skin manifests target **slot ids**, not GDevelop resource names.

Canonical map: `templates/runner-v1/skins/slot-map.v2.json`

## Required slots

`player_idle`, `player_run`, `player_jump`, `player_dead`, `hazard_01`, `hazard_02`, `hazard_03`, `background_far`, `ground`, `jump_button`

## Optional

`background_near`, `powerup_optional`, `logo_optional`

## Manifest

```json
{
  "contract": "runner-skin-v2",
  "slots": {
    "hazard_01": "assets/Scenery/Tree.png",
    "player_idle": "$baseline"
  }
}
```

- One file path applies to every resource in that slot.
- An array must match the slot's resource count (animation frames).
- `$baseline` keeps the snapshot files for that slot.
- Empty `slots` restores the whole baseline (`skins/default/resource-files.json` or `skins/wroclaw-v1/resource-files.json`).
- v1 `resources` maps still work with a compat warning.

Missing required slots, unknown ids, or missing files → `APPLY_SKIN: FAIL` (exit 1).

```text
node tools/apply-skin.mjs traffic-v1 --game games/traffic-dash
node tools/apply-skin.mjs wroclaw-v1 --game games/zombie-runner
```
