# Breakout Lab — game state and objects

Neutral lab (GOAL 007 / 040). No public-data topic.

## State contract

Scene string `GameState` (Game layout):

| Value | Lab alias | Meaning |
| --- | --- | --- |
| `NotStarted` | Preparing | Ball parked; Space launches |
| `GamePlay` | Playing | Ball in motion |
| `Lost` | Dead | Lives = 0 |
| `Won` | — | No bricks left |

Restart: Replay button or **R** → `replaceScene("Game")` (no page reload). Home/Menu is bypassed (`firstLayout` is Game; Home parked off-canvas).

## Important objects

`Paddle`, `Ball`, `Block_1`, `Block_2`, `Block_3`, `Barrier`, `ScoreLabel`, `Life_Counter`, `Replay_Button`, `PaddleLine`

## Tuneables (as imported)

| Param | Where | Typical |
| --- | --- | --- |
| Launch | Space released while NotStarted | force ~400 toward paddle |
| Lives | scene `Lifes` | 3 |
| Brick rows | instances of Block_1/2/3 | 15 each on Game |
| Window | properties | 1920×1080 landscape |

Bricks load from external layouts `BrickLayout1`–`5` at random (`RandomInRange(1,5)`), so instance counts vary per restart (often ~45–90). Restart must still be one board, score 0, one ball, 3 lives.
