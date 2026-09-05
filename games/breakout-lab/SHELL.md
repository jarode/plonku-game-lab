# Breakout Lab — neutral Plonku shell (044)

Player-facing chrome is system/lab, not a public-data topic.

## Palette

Navy playfield (`8,16,36`). Accents: acid lime, hot pink, cyan.

## Copy

| State | Treatment |
| --- | --- |
| Start | `LAUNCH` + move/launch hint; overlay `MOVE · TAP / SPACE TO LAUNCH` |
| Play HUD | framed `BREAKOUT LAB` / `DATA PROFILE` / `SCORE · LIVES` |
| Fail | `SIGNAL LOST` + overlay retry hint |
| Win | `BOARD CLEAR` |

`DATA PROFILE` means the board came from a structured profile. Fixture ids stay on `?fixture=` only.

Upstream GDevelop logo / Home stay off-canvas. Provenance remains in `PROVENANCE.md`.
