# TASK 047 — CITY BREAKER 2012 data contract + deterministic fixtures

## Goal
Create the bounded game-side adapter and fixture contract that turns approved Plonku city factors into Breakout input values.

## Source boundary
Use the current approved VGE factor semantics only:
- population density,
- forest cover share,
- dwellings per 1000 population,
- registered entities per 1000 population.

Do not add new sources or historical observations in this task.

## Runtime contract
The Breakout engine consumes only:

```json
{
  "id": "profile-id",
  "values": [12, 44, 71, 93]
}
```

Rules:
- `values.length` must be between 4 and 16,
- every value must be finite and in `[0,100]`,
- same input must be deterministic,
- invalid/missing values must fail safely and visibly in dev mode,
- missing must never silently become zero.

## Required work
1. Inspect accepted GOAL 007 input contract and reuse it rather than creating a parallel format.
2. Add or document an adapter layer for `CITY BREAKER 2012` that maps the four approved normalized factor values into the neutral board-generator contract.
3. Add deterministic fixtures covering at least:
   - `balanced-mid`,
   - `dense-spike`,
   - `green-open`,
   - `mixed-spike`,
   - low edge case,
   - high edge case.
4. Include fixture metadata with labels/notes for QA, but keep the actual runtime board-generator input generic.
5. Add validation tests for:
   - 4 values,
   - max supported length,
   - out-of-range values,
   - NaN / non-number values,
   - missing values,
   - repeated same fixture produces byte/stable equivalent normalized input.
6. Document how a future VGE handoff can provide these normalized values without coupling the GDevelop runtime directly to VGE internals.

## Acceptance gates
PASS only if:
- no new factual data source was invented,
- adapter remains deterministic,
- missing is not zero,
- fixtures produce valid 4–16 arrays,
- the game remains runnable with fixtures offline,
- future live integration has a clean boundary.

## Out of scope
- geometry formulas,
- art,
- final city names sourced from production,
- network calls,
- site integration.

## Chain
Exact `PASS` → task 048.
Any other status → STOP.
