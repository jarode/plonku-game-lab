# TASK 051 — CITY BREAKER 2012 gameplay tuning + city differentiation

## Goal
Tune CITY BREAKER 2012 so the data-driven differences are both visible and fun, not merely technically valid.

## Required work
1. Test the accepted fixtures and at least 6 deterministic profiles spanning the value space.
2. Tune:
   - ball speed,
   - paddle width/speed,
   - brick HP bounds,
   - board density caps,
   - corridor/opening minimums,
   - score pace,
   - session length,
   - retry speed,
   - difficulty escalation if present.
3. Ensure profile identity is noticeable without causing obviously unfair boards.
4. Establish a target first-session duration and document observed distribution over repeated runs.
5. Ensure the same city/profile remains consistent across retries while gameplay still has enough variation from ball physics/player skill to stay interesting.
6. Validate that no single factor dominates so strongly that the other three cease to matter.
7. Add a lightweight explanatory mapping such as:
   - `gęstość → więcej cegieł`,
   - `zieleń → więcej prześwitów`,
   - etc.,
   without presenting the game mapping as a scientific model.
8. Record before/after tuning parameters.

## Acceptance gates
PASS only if:
- at least 6 profiles are playable,
- no profile is trivially empty or functionally impossible,
- city/profile differences are clearly perceptible,
- restart is fast,
- mobile control remains responsive,
- tuning parameters are documented and reproducible.

## Chain
Exact `PASS` → task 052.
Any other status → STOP.
