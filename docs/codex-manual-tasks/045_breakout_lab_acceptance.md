# 045 — Breakout Lab acceptance

## Gate

Requires task 044 exact `PASS`.

## Goal

Close GOAL 007 with an evidence-based decision on whether the neutral data-driven Breakout prototype is strong enough to proceed to topic selection.

## Review scope

Review tasks 039–044 and current repository state.

Re-run/verify at minimum:

- clean HTML5 export;
- core start/play/fail/retry flow;
- mobile control at target viewport(s);
- 10 restart cycles or equivalent retained evidence with no accumulating state defect;
- all neutral fixtures load;
- deterministic same-input board generation;
- meaningfully different board structures for contrasting inputs;
- neutral Plonku shell;
- provenance/license documentation;
- no production deployment/network dependency/final topic coupling.

## Product questions

Answer explicitly:

1. Is Breakout a sufficiently different mechanic from Runner Factory to justify a second game family?
2. Can real structured Plonku data later replace neutral fixtures without rewriting the core game?
3. Do data values materially shape the board rather than merely recolor it?
4. Is mobile play good enough to continue?
5. What is the single biggest remaining technical/product risk before choosing a theme?

## Decision

Exactly one:

- `ACCEPTED — ready for topic selection`
- `NOT ACCEPTED — prototype defects remain`
- `OPERATOR_ACTION_REQUIRED`

## Acceptance criteria

PASS only if the decision is exactly:

`ACCEPTED — ready for topic selection`

and each required claim has concrete evidence.

## Result

Create `docs/codex-manual-tasks/045_breakout_lab_acceptance-RESULT.md` with evidence table, limitations, recommended constraints for topic selection and final status.

## Chain behavior

STOP after 045 regardless of outcome.
Do not create or start task 046 automatically.
Do not deploy to Plonku in this goal.
