# 017 — Third runner factory v2 proof

## Gate

Requires task 016 PASS.

## Goal

Prove Runner Factory v2 on a third independently playable client created from the template using the new slot/config/shared-asset/regression path.

## Product target

Create a lightweight third theme that is clearly different from Zombie Runner and Traffic Dash. Keep the one-input runner core. Favor a concept that could plausibly become a Plonku viral microgame.

## Scope

1. Instantiate the third runner only through the supported factory command/path.
2. Use slot-id skin configuration from task 013.
3. Use the slim/shared-asset strategy from task 014.
4. Use runner config from task 015 for title/balance/client settings.
5. Create a distinct chunk catalog and skin/theme without copying another client folder.
6. Run the full regression harness from task 016.
7. Measure:
   - instantiate time;
   - number of client-specific files changed;
   - duplicated binary count/size;
   - core/template files modified;
   - time to first export PASS;
   - time to final regression PASS.
8. If a genuine factory defect is discovered, make only the smallest generic fix and document it.

## Acceptance criteria

PASS only if the third client is playable/exportable, full regression passes, no Zombie/Traffic client folder was copied, and normal production does not require manual nested event-sheet edits.

## Result / chain rule

Create `017_third_runner_factory_v2_proof-RESULT.md` with measurements, validation, defects/fixes, changed files and commit SHA.

Exact `PASS` -> continue to 018. Any other status -> STOP GOAL 003.
