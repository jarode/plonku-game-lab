# 042 — Data-to-board contract v1

## Gate

Requires task 041 exact `PASS`.

## Goal

Define a small neutral structured-input contract that can deterministically describe a Breakout board without choosing a real-world Plonku topic yet.

## Core principle

The board must be meaningfully shaped by data, not merely recolored.

## Scope

1. Introduce a game-local neutral config/fixture contract, for example:

```json
{
  "id": "fixture-balanced",
  "values": [25, 50, 75, 100]
}
```

The exact schema may differ if a better bounded design is justified.
2. Define deterministic mappings from input dimensions to board properties. Candidate properties include:
   - row/column density;
   - brick presence/distribution;
   - brick durability/HP;
   - gaps/corridors;
   - bonus probability or special brick count;
   - ball speed / paddle width only as secondary difficulty parameters.
3. Separate:
   - **board shape generation** from
   - **difficulty tuning**.
4. Clamp/normalize invalid inputs and fail closed. Do not silently turn missing data into zero if that changes meaning.
5. Add at least five neutral fixtures that exercise extremes and mixed profiles.
6. Document the contract and mapping so a later task can replace fixtures with real Plonku data without rewriting core gameplay.
7. Do not use any real topic, city ranking, Zombie score or production API.

## Acceptance criteria

PASS only if:

- schema is explicit and documented;
- the same input always produces the same board definition;
- different fixture profiles are expected to produce meaningfully different board structures;
- invalid/missing input behavior is explicit;
- the contract can be consumed without hard-coding a future topic;
- no production/network dependency is introduced.

## Result

Create `docs/codex-manual-tasks/042_data_to_board_contract_v1-RESULT.md` with the final schema, mappings, fixture list, invalid-input behavior and final status.

## Chain behavior

Exact `PASS` -> 043 in a fresh session. Else STOP GOAL 007.
