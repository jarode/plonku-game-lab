# 042 — Data-to-board contract v1 — RESULT

## Status

PASS

## Summary

Neutral contract: `{ id, values: number[4..16] in [0,100] }` → 5-row grid. Gaps from low values, HP from magnitude. Missing/`null` values **reject**. Five fixtures plus invalid samples. Pure mapping in `board-from-input.mjs`; not wired into GDevelop yet (043).

## Schema / mapping

`games/breakout-lab/data/BOARD-CONTRACT.md`

## Fixtures

`sparse-low`, `dense-high`, `balanced-mid`, `mixed-corridor`, `mixed-spike`

## Invalid behavior

`BoardContractError` codes: `missing_values`, `values_not_finite`, `values_length`, `values_range`, `bad_id`, `not_object`. Tests in `tools/breakout-board-contract.test.mjs`.

## Validations

| Check | Outcome |
| --- | --- |
| `node --test tools/breakout-board-contract.test.mjs` | 5 pass |
| Same input same signature | PASS |
| Sparse vs dense brickCount | PASS |
| No network / no topic | PASS |

## Known limitations

- Not yet spawned in the GDevelop scene (043).
- Random example `BrickLayout` still used at runtime until 043.

## Commit SHA

Implementation: `707258a259d757d23479b539909bbf4a1da2978b`

## Operator actions required

None.

## Safety

```text
production_deploy_executed: false
external_paid_services_used: false
secrets_committed: false
store_publication_executed: false
```
