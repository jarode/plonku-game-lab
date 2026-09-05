# 029 — In-game HUD redesign

## Gate

Requires task 028 PASS.

## Goal

Restyle the playing HUD as Plonku UI: boxes, city tag, score, optional SCORE/FAKTY badge — still light enough to run.

## Scope

Replace bare `ScoreText` prototype with layered HUD: score box, city tag, readable numerals, consistent 026 colors/frames. Do not bury the runner or jump button.

## Constraints

- Mobile portrait. No settings screen.
- Keep score semantics (time-based integer) unless a later GOAL 006 task changes framing.
- Regression PASS.

## Acceptance criteria

PASS only if HUD matches Plonku branding and remains playable on a 360-wide viewport.

## Result

`029_in_game_hud_redesign-RESULT.md`

## Chain behavior

Exact `PASS` → continue to 030. Else STOP GOAL 005.
