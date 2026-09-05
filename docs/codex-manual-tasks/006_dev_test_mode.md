# 006 — Dev/Test Mode

## Gate

Requires task 005 PASS.

## Goal

Create a developer/test mode that removes the need to replay the whole game after every level or balance change.

## Scope

Add a developer-only test panel or equivalent controls that support at minimum:

- invincibility toggle;
- game speed presets: 0.5x / 1x / 2x;
- editable/adjustable player speed;
- editable/adjustable jump power;
- start from EASY / MEDIUM / HARD chunk groups;
- restart current test quickly;
- jump directly to a selected chunk or representative section where technically practical.

The mode must be clearly separated from normal player mode and easy to disable.

## Constraints

- Do not expose debug controls in the normal production/player flow by accident.
- Do not fork gameplay logic into a second debug-only implementation.
- Debug settings must affect the same core gameplay variables/events used by the game.

## Acceptance criteria

PASS only if a tester can launch directly into each difficulty group, alter speed/jump parameters, toggle invincibility, restart quickly, and return to normal gameplay with defaults restored. Existing export/smoke validation must still pass.

## Result

Create `006_dev_test_mode-RESULT.md` with controls implemented, usage instructions, validations, limitations, and commit SHA. Stop after push.
