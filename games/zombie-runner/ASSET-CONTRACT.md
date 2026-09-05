# Asset / reskin contract v1

Gameplay talks to **object names** (`Dino`, `CactusObstacle`, `IslandObstacle`, `WreckObstacle`, `Platform`, `Background`, `JumpButton`, `BonusObject`). Skins only change resource **files**.

## Slots

| Slot | Purpose | Maps to (this project) | Size / aspect | Origin / collision | Animation | Fallback |
| --- | --- | --- | --- | --- | --- | --- |
| player | Runner sprite | Dino frames under `assets/Dino/` | ~80–120px tall | Feet near bottom of frame | Idle, Run, Jump, Dead | Keep current dino |
| hazard_01 | Ground jump barrier | `CactusObstacle` / `assets/Cactus3-1.png` | ~86×96 | Bottom-aligned | Single frame OK | Required |
| hazard_02 | Overhead / stay-low | `IslandObstacle` / Duck island | Wider than player | Bottom at platform-64 | Single frame | Required |
| hazard_03 | Wide ground wreck | `WreckObstacle` / `Skeleton.png` | Wider than hazard_01 | Bottom-aligned | Single frame | Required |
| background_far | Distant layer | `Desert Background.png` | Tiled/large | Top-left | None | Required |
| background_near | Near dunes (same tiled bg for v1) | same Background object | — | — | None | Optional; omit = far only |
| ground | Floor | `9patch_Desert Tile_north.png` | Tile 32–64 | Top is walk surface | None | Required |
| powerup_optional | Bonus pickup | `CarGirlWheel-1.png` | Small | Center | None | If files missing, leave bonus events; no crash if unused |
| button | Jump control | `JumpButton-1-0.png` | ≥128px | Top-left | None | Required |
| logo_optional | Branding | `preview.png` / thumbnail | 16:9 or square | — | None | Optional; unused in play |

## Swap a skin

```text
node tools/apply-skin.mjs wroclaw-v1
node tools/apply-skin.mjs alt-blocky
```

This rewrites resource `file` paths only. Do not edit jump, score, state, or `chunks.json`.

Then `node tools/sync-chunk-catalog.mjs` is **not** required. Export: `node tools/gdevelop-web-export.mjs`.
