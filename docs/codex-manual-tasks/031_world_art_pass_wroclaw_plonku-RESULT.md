# 031 — World art pass: Wrocław + absurd + data-horror-lite — RESULT

## Status

PASS

## Summary

Regenerated `wroclaw-v1` sprites in Plonku palette: night skyline + moon + neon windows/spires, jersey barricade, pigeon, tram, hoodie runner with pink backpack, lime jump button. Same canvas sizes / slot contract. No jump or collision event edits.

## Files changed

- `tools/generate-wroclaw-v1-art.py`
- `games/zombie-runner/assets/wroclaw-v1/**` (player, hazards, bg, ground, button, logo)
- `games/zombie-runner/assets/wroclaw-v1/PROVENANCE.md`
- `games/zombie-runner/zombie-runner.json` (apply-skin refresh)

## Validations

| Check | Outcome |
| --- | --- |
| `APPLY_SKIN` wroclaw-v1 | PASS |
| `RUNNER_REGRESSION` `--viewport 360x800` | PASS |

## Known limitations

- Still procedural silhouettes, not painted illustration.
- Resource **names** still say Dino/Desert; pixels on the Game loop are Wrocław/Plonku.

## Commit SHA

Implementation: `7c5ba8615f1dcf2d69f08ff6e17cf0ddc1c2d46b`

## Operator actions required

None.

## Safety

```text
production_deploy_executed: false
external_paid_services_used: false
secrets_committed: false
store_publication_executed: false
```
