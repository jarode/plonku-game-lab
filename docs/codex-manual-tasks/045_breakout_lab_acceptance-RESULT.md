# 045 — Breakout Lab acceptance — RESULT

## Status

PASS

## Decision

`ACCEPTED — ready for topic selection`

## Summary

GOAL 007 (039–044) delivered a second game family: official Breakout import, lab boot/restart, pointer paddle, a fail-closed numeric board contract, five deterministic fixtures with different **structure** (not only HP color), and a topic-free Plonku shell. This session re-ran a clean HTML5 export + smoke (10 restarts, five fixtures, invalid fallback) at 360×800.

## Evidence table

| Claim | Evidence |
| --- | --- |
| Clean HTML5 export | `BREAKOUT_SMOKE` 045 run includes `gdevelop-web-export.mjs --game games/breakout-lab` then PASS |
| Start / play / fail / retry | Space → `GamePlay`; lives 0 → `Lost`; `SceneStack.replace("Game", true)` ×10; score 0, 1 ball, 3 lives |
| Mobile control | Pointer paddle (041); smoke viewports 360×800 / 390×844 / 540×960; landscape 1920×1080 letterboxed |
| 10 restart cycles, no accumulating state | Same default signature `7c837642c177…` after 10 cycles; brickCount stays 13 |
| All five fixtures | sparse-low 6 / dense-high 40 / balanced-mid 13 / mixed-corridor 15 / mixed-spike 8; unique signatures |
| Same input → same board | Restart signature match; Node `boardFromInput` SHA-256 |
| Different input → different structure | Sparse top-row only vs dense 8×5 vs corridor empty columns vs spike |
| Neutral Plonku shell | `SHELL.md`; `docs/codex-manual-tasks/evidence/044-breakout-shell.png` |
| Provenance | `games/breakout-lab/PROVENANCE.md` — GDevelop-examples `3294639…`, MIT |
| No deploy / no network / no final topic | Lab-local fixtures; overlay copy is system-level |

## Product questions

1. **Different mechanic from Runner Factory?** Yes. This is a bounded table with paddle/ball/brick HP, not an endless lane runner. It justifies a second family.

2. **Can real Plonku series replace fixtures?** Yes, if they emit `{ id, values: number[4..16] in [0,100] }` with no null holes. Mapping lives in `board-from-input.mjs`; GDevelop only consumes the catalog/board object.

3. **Do values shape the board?** Yes. Gaps, column count, and height of the stack change with the series. HP 1–3 is secondary. Contrasting fixtures are not recolors of one layout.

4. **Is mobile good enough to continue?** Yes for a lab: thumb X on the paddle, `touch-action: none`, restart without reload. Portrait still letterboxes a landscape table; theme work should keep landscape or redesign the field, not pretend 9:16 is already solved.

5. **Biggest remaining risk before a theme?** Fitting a real public series into 4–16 clamped values without flattening the story, plus unused `ballSpeed` (launch force still ~400). Secondary: Kenney brick art vs a topic pack; keep the contract stable.

## Recommended constraints for topic selection

- Keep the v1 schema; do not special-case cities or APIs in the generator.
- Prefer series that produce **gaps and density**, not a single flat magnitude.
- Do not ship portrait-first until the playfield is redesigned.
- Theme art may replace `Block_*` sprites; do not abandon HP/gap mapping.

## Limitations

- `Game(Physics)` / Menu still in the JSON, unused at boot.
- `ballSpeed` / `bonusSlots` recorded but not fully driving example powerups.
- Physical phone not required in 041–044.
- No Plonku-site embed in this goal.

## Chain

039–044 RESULT status PASS on `ai-control`. After this file: **STOP**. Task 046 was not created.

## Commit SHA

Implementation: `PENDING` (RESULT-only task)

## Operator actions required

None.

## Safety

```text
production_deploy_executed: false
external_paid_services_used: false
secrets_committed: false
store_publication_executed: false
```
