# 009 — Asset/Reskin Contract v1

## Gate

Requires task 008 PASS.

## Goal

Decouple gameplay logic from specific artwork so the runner can be reskinned quickly without touching core movement/collision/state logic.

## Scope

Define and implement a small v1 asset contract covering at minimum:

```text
player
hazard_01
hazard_02
hazard_03
background_far
background_near
ground
powerup_optional
button
logo_optional
```

For each slot document:

- purpose;
- expected dimensions/aspect guidance;
- anchor/origin assumptions;
- collision-shape expectations where relevant;
- animation expectations where relevant;
- fallback behavior when optional assets are absent.

Refactor current references so swapping the asset set does not require editing core player movement, score, state-machine, or chunk-selection logic.

## Constraints

- Do not build a universal asset-management framework.
- Do not create final production art in this task.
- Preserve current gameplay and collision semantics.

## Acceptance criteria

PASS only if the current Zombie skin works through the contract and a temporary alternate reskin can be demonstrated without changing core gameplay logic. Export/smoke validation must still pass.

## Result

Create `009_asset_reskin_contract_v1-RESULT.md` with the contract, proof of alternate reskin, validations, changed files, limitations, and commit SHA.

## Chain behavior

When executed under `GOAL-001_zombie_runner_mvp.md`, push implementation + RESULT, then inspect the RESULT status. If status is exactly `PASS`, STOP successfully: Goal 001 implementation chain is complete and ready for supervisor review. For any other status, STOP and report the non-PASS state.
