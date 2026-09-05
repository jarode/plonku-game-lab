# Asset / reskin contract v1

Gameplay talks to **object names** (`Dino`, `CactusObstacle`, `IslandObstacle`, `WreckObstacle`, `Platform`, `Background`, `JumpButton`, `BonusObject`). Skins only change resource **files**.

## Slots

| Slot | Purpose | Maps to (logic object) |
| --- | --- | --- |
| player | Runner sprite | `Dino` |
| hazard_01 | Ground jump barrier | `CactusObstacle` |
| hazard_02 | Overhead / stay-low | `IslandObstacle` |
| hazard_03 | Wide ground wreck | `WreckObstacle` |
| background_far | Distant layer | `Background` |
| ground | Floor | `Platform` tiles |
| button | Jump control | `JumpButton` |
| powerup_optional | Bonus pickup | `BonusObject` |
| logo_optional | Store/thumbnail | unused in play |

## Swap a skin

```text
node tools/apply-skin.mjs default --game <game-dir>
node tools/apply-skin.mjs <other> --game <game-dir>
```

Empty `resources` in a manifest restores the baseline snapshot (`skins/default/resource-files.json`). Non-empty maps rewrite resource `file` paths only.
