# GOAL 006 — Product Polish & Plonku-ready UX

## Purpose

After GOAL 005 visual alignment, tighten product meaning, city narrative, score framing, choose-city flow, and mobile UX. Still no Plonku website deploy.

## Gate

Requires GOAL 005 / task 033 PASS.

## Chain

Execute in fresh worker sessions, in this exact order:

1. `034_city_naming_narrative_pass.md`
2. `035_score_meaning_and_data_framing.md`
3. `036_choose_city_flow.md`
4. `037_final_mobile_readability_interaction_pass.md`
5. `038_product_acceptance.md`

## Continuation rule

After each task, read its matching `-RESULT.md`.

- If status is exactly `PASS`, continue to the next task.
- Any other status → STOP this goal immediately.
- Never skip a failed gate.

## Final stop

After task 038, STOP regardless of status. Do not create or start task 039.

## Success definition

GOAL 006 is successful only if task 038 ends with `PASS` and one of:

- `ACCEPTED — ready for Plonku visual integration`
- `ACCEPTED WITH NOTES`

`REWORK REQUIRED` is not a goal success.

No public deployment or Plonku-site modification is authorized.
