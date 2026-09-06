# 058 — CITY BREAKER start / generation / result UI — RESULT

## Status

PASS

## Summary

Start stays in the same `CITYBRK.EXE` window. Boot shows a short utility sequence `ANALIZUJĘ DANE...` → `BUDUJĘ LEVEL...` → `{PROFIL}.DATA GOTOWE`. Life-loss flashes the pink frame and swaps the hint. Lost/Won uses a share-ready result card (profile, score, factor legend, Plonku disclaimer, `UDOSTĘPNIJ`). Restart via `R` / scene replace re-inits lives/score.

## Evidence

- `docs/codex-manual-tasks/evidence/058-ui-gen-390x844.png`
- `docs/codex-manual-tasks/evidence/058-ui-390x844.png`
- `docs/codex-manual-tasks/evidence/058-ui-play-390x844.png`
- `docs/codex-manual-tasks/evidence/058-ui-result-390x844.png`
- `docs/codex-manual-tasks/evidence/058-ui-1440x900.png` (desktop start from earlier capture in this task; 390 result is canonical)

## Validations

| Check | Outcome |
| --- | --- |
| Smoke 390×844 including 10 restarts + 6 city profiles | PASS |
| City signatures | golden |

## Known limitations

- GDevelop `SYGNAŁ UTRACONY` title can still appear behind the HTML result card.
- Result capture after last profile (`MAXIMUM`) is intentional.

## Commit SHA

Implementation: `eaf6fbd268b6ff9a39e0e78f4aeaade3f0efc937`

## Operator actions required

None.

## Safety

```text
production_deploy_executed: false
external_paid_services_used: false
secrets_committed: false
store_publication_executed: false
```
