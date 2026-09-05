# 043 — Deterministic data-driven board generator — RESULT

## Status

PASS

## Summary

Game no longer loads random `BrickLayout1–5`. `tools/patch-breakout-lab.mjs` embeds the 042 catalog into JsCode. Bricks spawn from `cells` (HP 1–3 → `Block_1/2/3`, gaps stay empty). `?fixture=` selects a named board. Unknown id falls back to `balanced-mid` with `__boBoardError=unknown_fixture`.

## Generator architecture

1. Node `boardFromInput` at patch time.
2. Catalog JSON inlined as `BO_BOARDS` in `runtime/lab-hooks.js`.
3. First frame of Game: delete leftover blocks, place grid, set Health/animation, scale paddle.
4. Restart = scene replace → apply again.

See `games/breakout-lab/GENERATOR.md`.

## Fixture → board (smoke)

| id | bricks | Block_1/2/3 | signature prefix |
| --- | --- | --- | --- |
| sparse-low | 6 | 6/0/0 | `65946b7f6c78` |
| dense-high | 40 | 0/0/40 | `18ae1f83c1a9` |
| balanced-mid | 13 | 1/3/9 | `7c837642c177` |
| mixed-corridor | 15 | 0/0/15 | `3d50c084c6cd` |
| mixed-spike | 8 | 0/3/5 | `d6511ad964d8` |

Same default fixture signature after 10 fail/restart cycles. Invalid `?fixture=not-a-real-fixture` → balanced-mid + `unknown_fixture`.

`sparse-low` values raised into the top-row band so the board is playable (still much sparser than dense-high).

## Validations

| Check | Outcome |
| --- | --- |
| `node --test tools/breakout-board-contract.test.mjs` | PASS |
| `BREAKOUT_SMOKE --viewport 360x800` (export + 10 restarts + 5 fixtures + invalid) | PASS |
| Network / topic copy | none |

## Known limitations

- Ball launch force is still the example ~400; `ballSpeed` is in the board object but not yet applied to forces.
- `CreateObjectsFromExternalLayout` may remain on unused layouts (e.g. Physics); Game path does not use it.
- Physical phone not required.

## Commit SHA

Implementation: `PENDING`

## Operator actions required

None.

## Safety

```text
production_deploy_executed: false
external_paid_services_used: false
secrets_committed: false
store_publication_executed: false
```
