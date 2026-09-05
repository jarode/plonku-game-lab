# 036 — Choose city flow

## Gate

Requires task 035 PASS.

## Goal

Ship a readable choose-city flow ready for more cities later. Wrocław can remain the only playable city.

## Scope

Wire the secondary CTA from start/game-over to a city picker (or overlay). Placeholder rows for future cities are OK if they do not break play. Do not implement full extra city art packs unless already present.

## Acceptance criteria

PASS only if change-city is understandable and returns to play without a nested JSON scavenger hunt.

## Result

`036_choose_city_flow-RESULT.md`

## Chain behavior

Exact `PASS` → 037. Else STOP GOAL 006.
