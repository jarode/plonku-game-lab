# 027 — UI copy rewrite in Plonku tone — RESULT

## Status

PASS

## Summary

Player-facing copy is Polish Plonku tone. Canonical table: `games/zombie-runner/COPY.md`. `runner.json` drives title, start line, `WYNIK`, `KONIEC GRY`, `Spróbuj jeszcze`. Optional `gameOverTitle` / `gameOverRetry` in `tools/runner-config.mjs` (other games keep English defaults).

Screen CTAs for 028–030 are documented, not drawn yet.

## Files changed

- `games/zombie-runner/COPY.md`, `runner.json`, `zombie-runner.json` (sync)
- `tools/runner-config.mjs`, `tools/runner-config.test.mjs`
- RESULT

## Validations

| Check | Outcome |
| --- | --- |
| `node --test tools/runner-config.test.mjs` | 5 pass |
| `SYNC_RUNNER_CONFIG` | PASS |
| `RUNNER_REGRESSION` | PASS |

## Known limitations

- Start is still the Game preparing HUD, not the 028 layout.
- Choose-city strings exist only in COPY.md.

## Commit SHA

Implementation: `9cc6640e287eb444f80a7000660bdcd254cc7a21`

## Operator actions required

None.

## Safety

```text
production_deploy_executed: false
external_paid_services_used: false
secrets_committed: false
store_publication_executed: false
```
