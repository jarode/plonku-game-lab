# GOAL 004 — Zombie Runner Wrocław product

## Purpose

Ship the first real Plonku product built on Runner Factory v2 instead of creating more factory infrastructure.

Product: **Zombie Runner — Wrocław**.

## Chain

Execute in fresh worker sessions, in this exact order:

1. `019_product_brief_zombie_runner_wroclaw.md`
2. `020_original_art_pack_wroclaw_v1.md`
3. `021_gameplay_polish_and_session_tuning.md`
4. `022_ui_audio_and_product_identity.md`
5. `023_mobile_device_qa_gate.md`
6. `024_plonku_web_handoff_package.md`
7. `025_zombie_runner_product_acceptance.md`

## Continuation rule

After each task, read its matching `-RESULT.md`.

- If status is exactly `PASS`, continue to the next task in a fresh worker session.
- If status is `FAIL`, `BLOCKED`, `OPERATOR_ACTION_REQUIRED`, `INCONCLUSIVE`, missing, ambiguous, or anything other than exact `PASS`, STOP this goal immediately.
- Never skip a failed gate.

Task 023 deliberately requires a real physical-phone test. If the worker cannot perform it, return `OPERATOR_ACTION_REQUIRED`, provide exact manual test steps, and STOP. Resume only after operator evidence is supplied.

## Final stop

After task 025, STOP regardless of status. Do not create or start task 026.

## Success definition

GOAL 004 is successful only if task 025 ends with `PASS` and decision:

`ACCEPTED — ready for Plonku integration`

No public deployment or Plonku-site modification is authorized by this goal.