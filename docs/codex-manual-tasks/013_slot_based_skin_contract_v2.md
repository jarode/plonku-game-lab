# 013 — Slot-based skin contract v2

## Gate

Requires GOAL 002 / task 012 PASS.

## Goal

Remove the most error-prone part of reskinning: skin manifests must target stable semantic slot ids instead of GDevelop resource names or paths.

## Scope

1. Introduce a versioned semantic slot mapping for runner-v1 covering at minimum:
   - player idle/run/jump/dead;
   - hazard_01/02/03;
   - background_far/background_near;
   - ground;
   - jump button;
   - optional powerup/logo.
2. Update `apply-skin` so client skin manifests can declare slot ids, not raw GDevelop resource names.
3. Keep a compatibility path for existing `wroclaw-v1`, `alt-blocky`, and `traffic-v1` or migrate them deterministically.
4. Fail closed when a required slot is missing, duplicated, or points to a missing file.
5. Document the v2 contract and migration behavior.
6. Do not modify movement, collision, score, chunk, or state-machine semantics.

## Acceptance criteria

PASS only if:

- Zombie and Traffic Dash can both apply their skins through slot ids;
- an intentionally invalid required slot produces a non-zero failure;
- both games still export `WEB_EXPORT: PASS`;
- no core gameplay event logic changes are required.

## Result / chain rule

Create `013_slot_based_skin_contract_v2-RESULT.md` with migration proof, validations, limitations, and commit SHA.

If RESULT status is exactly `PASS`, continue to task 014 in a fresh worker session. Any other status = STOP GOAL 003.
