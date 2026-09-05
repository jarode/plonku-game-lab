# 021 — Gameplay polish and session tuning

## Gate

Requires task 020 PASS.

## Goal

Tune Zombie Runner — Wrocław from a factory proof into a fun, readable short-session product while preserving the Runner Factory v2 architecture.

## Scope

Using the product brief from 019:

- tune obstacle speed, spawn delay, score pace, jump feel and difficulty progression;
- review all EASY/MEDIUM/HARD chunks and revise client chunk data where needed;
- ensure the first seconds are immediately understandable;
- remove impossible/unfair combinations and excessive dead time;
- target a representative session length defined in 019;
- make score/fail/retry feedback satisfying and fast;
- keep touch one-input controls simple;
- preserve dev mode and regression harness.

Use runner.json/chunks/skin/client data before modifying shared runtime. Shared-template changes require a demonstrated cross-client defect and must keep Zombie, Traffic Dash and Pigeon Dash regression PASS.

## Acceptance criteria

PASS only if the tuned game completes export/regression, all difficulty groups remain usable, the session pacing matches the 019 target within a reasonable tolerance, and no unnecessary shared-core changes are introduced.

## Result

Create `021_gameplay_polish_and_session_tuning-RESULT.md` with before/after tuning values, chunk changes, validation evidence, any template changes and justification, limitations, and commit SHA.

## Chain behavior

If and only if RESULT status is exactly `PASS`, continue to task 022 in a fresh worker session. Otherwise STOP GOAL 004.