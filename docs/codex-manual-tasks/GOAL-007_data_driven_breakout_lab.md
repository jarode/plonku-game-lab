# GOAL 007 — Data-Driven Breakout Lab

Status: READY
Branch: `ai-control`

## Goal

Prove a second Plonku game family using a mechanic fundamentally different from Runner Factory v2.

Start from the official GDevelop Breakout example, reduce it to a clean mobile-friendly neutral prototype, then prove that structured numeric input can generate the level itself.

This goal intentionally does **not** choose the final Plonku topic yet.

Target proof:

> data -> level structure -> gameplay

Zombie Runner proved primarily `data -> difficulty`. Breakout Lab must prove that data can materially shape the board.

## Existing work that stays parked

Tasks 034–038 belong to the unfinished Zombie GOAL 006. Do not execute, renumber, delete or rewrite them as part of this goal.

GOAL 007 begins at task 039.

## Chain

Execute each task in a fresh worker/session.

```text
039 PASS -> 040
040 PASS -> 041
041 PASS -> 042
042 PASS -> 043
043 PASS -> 044
044 PASS -> 045
045 -> STOP
```

Any status other than exact `PASS` (`FAIL`, `BLOCKED`, `OPERATOR_ACTION_REQUIRED`, `INCONCLUSIVE`, missing/ambiguous RESULT) => STOP immediately.

After 045 always STOP. Do not create or start 046 automatically.

## Scope boundaries

Allowed:

- use the official `GDevelopApp/GDevelop-examples` Breakout example as upstream only after provenance/license validation;
- create a new game client under `games/`;
- add game-specific tooling/config/tests where useful;
- reuse existing generic export/preview conventions when they fit;
- create a neutral Plonku visual shell;
- build a deterministic data-to-board adapter and fixtures.

Not allowed:

- modify Zombie Runner or Runner Factory behavior unless a demonstrated shared-tool defect requires a bounded fix;
- choose/fake a final public-data topic;
- add production APIs, accounts, ads, multiplayer or monetization;
- deploy to Plonku;
- use paid assets/services;
- claim a data-driven level without deterministic evidence.

## Definition of success

GOAL 007 succeeds only if task 045 concludes:

`ACCEPTED — ready for topic selection`

with evidence that:

- the Breakout game exports reproducibly;
- mobile control is usable;
- restart/game loop is stable;
- the board can be generated deterministically from neutral structured input;
- at least several intentionally different input fixtures produce meaningfully different playable boards;
- the prototype is visually neutral-Plonku rather than tied to a specific topic;
- provenance is documented;
- no production deployment occurred.
