# TASK 053 — CITY BREAKER 2012 final acceptance + Plonku handoff

## Goal
Perform final acceptance for GOAL 008 and, only on exact PASS, package CITY BREAKER 2012 for later integration into `jarode/viral-growth-engine`.

## Preconditions
Tasks 046–052 must each have exact PASS RESULT files.

## Required work
1. Review all GOAL 008 RESULT files and implementation diffs. Do not accept solely because previous workers wrote PASS.
2. Re-run the critical automated checks:
   - deterministic input validation,
   - board snapshot/golden tests,
   - neutral Breakout regression,
   - web export/package smoke.
3. Re-run a bounded browser smoke of at least:
   - balanced profile,
   - dense profile,
   - open/green profile.
4. Confirm the product truth:
   - data changes level geometry materially,
   - same profile is deterministic,
   - different profiles create recognizably different boards,
   - game remains fun/readable on mobile,
   - 2012 is style only,
   - no unsupported historical claim,
   - no copied third-party IP.
5. Create/update the standard game handoff documentation following the Zombie Runner precedent where applicable.
6. Produce a complete static HTML handoff package using the established repo packaging convention. Keep the entire generated runtime folder together; do not flatten generated GDevelop files.
7. Handoff metadata must include at least:
   - game slug,
   - display title,
   - source branch/SHA,
   - build/package ID if available,
   - intended portrait aspect ratio,
   - start/input behavior,
   - known limitations,
   - cache/versioning guidance,
   - data contract version,
   - exact statement that v1 uses normalized fixture/profile input and does not itself fetch live VGE data unless that has explicitly been implemented and verified.
8. Record recommended future VGE integration architecture, but DO NOT modify `jarode/viral-growth-engine` in this task.

## Final acceptance gates
PASS only if all are true:
- tasks 046–052 evidence is internally consistent,
- current implementation independently passes critical checks,
- static package launches successfully,
- no asset/runtime file is missing,
- product is ready to be embedded as a first-class Plonku game,
- no known blocker would make site integration misleading or unusable.

## Final status
On acceptance, RESULT must contain exactly:

`ACCEPTED — CITY BREAKER 2012 ready for Plonku integration review`

If not accepted, use the appropriate non-PASS status and document blockers.

## STOP CONTRACT
After task 053 ALWAYS STOP.
- Do not create task 054.
- Do not start GOAL 009.
- Do not modify `jarode/viral-growth-engine`.
- Return control to ChatGPT/operator for review and integration decision.
