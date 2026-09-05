# 009A — GOAL 001 acceptance validation

## Gate

Requires tasks 004–009 to exist with RESULT status PASS.

## Goal

Close the remaining validation gaps before GOAL 001 can be accepted and before task 010 may start.

This is primarily a validation task. Do not redesign the game unless validation finds a real defect.

## Required checks

1. Run the current canonical project through the task 003 web export helper and require `WEB_EXPORT: PASS`.
2. Verify the normal player flow without `?dev=1`.
3. Perform **10 consecutive** real gameplay cycles in the exported build:
   - START / Preparing;
   - PLAYING;
   - trigger GAME OVER through normal hazard collision or an equivalent player-path interaction;
   - RETRY in place;
   - confirm score, hazards/chunks, player state and temporary state reset correctly.
4. During those 10 cycles, check for:
   - duplicated hazards;
   - stale score;
   - broken chunk sequencer state;
   - player animation/position drift;
   - accumulating objects/events;
   - retry requiring page reload.
5. Validate touch/mobile path in the exported build using one of:
   - a physical phone on the LAN preview workflow, preferred when available; or
   - browser mobile/touch emulation if a physical phone is not available.
6. Validate the LAN preview helper can start and serve `games/zombie-runner/build/`. A deliberately terminated preview process after successful serving is not a failure; document the actual port used and whether it is configurable/default.
7. Re-run the current `wroclaw-v1` skin export after validation and require PASS.

## Failure handling

- If all checks pass, create RESULT with status `PASS` and make no gameplay changes unless needed for validation instrumentation.
- If any gameplay defect is found, fix only the smallest bounded defect, re-run the full validation, and document the implementation commit.
- If a required validation cannot be completed, use `BLOCKED` or `OPERATOR_ACTION_REQUIRED`; do not claim PASS.

## Acceptance criteria

PASS only if:

- all 10 consecutive retry cycles complete successfully in the exported build;
- no stale/duplicated gameplay state is observed;
- normal player mode and mobile/touch path remain usable;
- LAN preview serving is demonstrated/documented;
- final web export returns `WEB_EXPORT: PASS`;
- task 010 is not started.

## Result

Create `009A_goal001_acceptance_validation-RESULT.md` with exact validation evidence, any fixes, changed files, limitations, and commit SHA(s). Stop after push. Do not start task 010.
