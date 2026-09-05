# 025 — Zombie Runner Wrocław product acceptance

## Gate

Requires task 024 PASS.

## Goal

Perform final acceptance of Zombie Runner — Wrocław as the first real Plonku product built on Runner Factory v2.

## Scope

Review repository evidence from tasks 019–024 and re-run the critical validations:

- clean export;
- runner regression;
- product skin/art applied;
- runner.json/chunks consistent;
- start → play → game-over → retry loop;
- 10 retry cycles;
- mobile QA evidence including physical phone from 023;
- handoff manifest/package from 024;
- no placeholder/demo identity in normal player flow;
- no accidental dev controls in normal mode;
- no public deployment performed.

Summarize remaining defects as blocker / non-blocker / later polish.

## Decision

Choose exactly one:

- `ACCEPTED — ready for Plonku integration`;
- `NOT ACCEPTED — product defects remain`;
- `OPERATOR_ACTION_REQUIRED` if an external/manual acceptance dependency remains.

Do not start Plonku website integration in this task.

## Acceptance criteria

PASS only when decision is `ACCEPTED — ready for Plonku integration` and all blocker criteria have evidence.

## Result

Create `025_zombie_runner_product_acceptance-RESULT.md` with decision, validation matrix, blockers/non-blockers, release/handoff reference, limitations and commit SHA if files change.

## Chain behavior

STOP after task 025 regardless of status. Do not create or start task 026.