# 030 — Game over screen redesign

## Gate

Requires task 029 PASS.

## Goal

Replace raw GAME OVER text with a layered Plonku result panel matching the moodboard.

## Scope

Include: strong `KONIEC GRY` / `TWÓJ WYNIK`, large score, primary retry CTA, secondary change-city CTA, Plonku microcopy, framed panel. Optional mini-stats (time, hazards, chunks) if they stay readable.

Retry must remain in-place (no full reload). Change-city may be placeholder until 036.

## Constraints

- Same factory retry path (`zrSoftReset` or equivalent).
- Regression: 10 retries, no `?dev=1` HUD.
- Export PASS.

## Acceptance criteria

PASS only if game over is branded, readable, and clearly better than the 025 text overlay.

## Result

`030_game_over_screen_redesign-RESULT.md`

## Chain behavior

Exact `PASS` → continue to 031. Else STOP GOAL 005.
