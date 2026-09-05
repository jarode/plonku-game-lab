# 033A — Operator: wygeneruj grafiki slotów Plonku — RESULT

## Status

PASS

## Summary

Operator dropped 10 PNG in `docs/codex-manual-tasks/refs/goal-005/art-drop/` (minimum + jump button). Packer now reads those filenames, keeps real alpha (no black flood on hoodie), scales to GDevelop slots. Tram stays **160×40** (wariant A). Fake run/idle/jump/dead cycles are bob-only from `*-01` frames. Start HUD still vector text over the new city. Collision/jump events unchanged.

## Files changed

- `docs/codex-manual-tasks/033A_operator_generate_plonku_slot_art.md`
- `docs/codex-manual-tasks/refs/goal-005/art-drop/` (README + 10 PNG)
- `tools/build-plonku-art.py`
- `games/zombie-runner/assets/wroclaw-v1/**` (packed slots + UI from `bg.png`)
- `docs/codex-manual-tasks/GOAL-005_plonku_visual_retheme.md` (pointer to 033A)

## Validations

| Check | Outcome |
| --- | --- |
| Drop sizes | bg 2560×1920, ground 256×256, runners 680×472, barricade 344×384, pigeon 512×264, tram 640×160, jump 512×512, RGBA |
| `python tools/build-plonku-art.py` | slot PNGs written |
| `RUNNER_REGRESSION` `--viewport 360x800` | PASS |

## Known limitations

- Only one frame per pose; extra klatki `02+` not in drop.
- Tram is readable but thin (slot 160×40).
- UI copy is still drawn in packer, not painted on drop UI panels.

## Commit SHA

Implementation: `dcdd8fb82414cc8505b166bf2870eb5c7ff929e8`

## Operator actions required

None. Do not start GOAL 006 / 034 unless asked.

## Safety

```text
production_deploy_executed: false
external_paid_services_used: false
secrets_committed: false
store_publication_executed: false
```
