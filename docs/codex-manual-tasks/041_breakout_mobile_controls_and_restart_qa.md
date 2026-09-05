# 041 — Breakout mobile controls and restart QA

## Gate

Requires task 040 exact `PASS`.

## Goal

Make the neutral Breakout prototype comfortable and reliable on phone before any data-driven generation work.

## Scope

1. Choose and document the intended product orientation based on actual playability. Prefer portrait if it works well; do not force 9:16 if the mechanic becomes worse.
2. Implement simple touch/pointer paddle control suitable for one thumb/finger.
3. Prevent parent-page-like scroll/gesture conflicts inside the game canvas where applicable.
4. Keep keyboard/mouse development control where useful.
5. Validate responsive behavior at minimum:
   - 360×800
   - 390×844
   - 540×960
6. Run at least 10 consecutive start/play/fail/restart cycles without page reload and check for duplicated balls, bricks, score drift or broken state.
7. Add/document a LAN preview path using existing generic tooling if compatible.
8. Do not add final graphics/theme.

## Validation

PASS requires:

- touch paddle control is usable in chosen orientation;
- no obvious clipping/horizontal overflow at target mobile viewports;
- 10 consecutive restart cycles pass;
- desktop dev input still works if retained;
- export PASS;
- orientation/control decision documented with evidence.

A real physical phone is desirable but is not a hard gate in this neutral lab task; browser touch emulation is acceptable if clearly stated.

## Result

Create `docs/codex-manual-tasks/041_breakout_mobile_controls_and_restart_qa-RESULT.md`.

Include viewport results, control contract, 10-cycle evidence, preview command/URL pattern, limitations and final status.

## Chain behavior

Exact `PASS` -> 042 in a fresh session. Else STOP GOAL 007.
