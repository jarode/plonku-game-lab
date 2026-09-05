# 019 — Zombie Runner Wrocław product brief — RESULT

## Status

PASS

## Summary

Locked **Zombie Runner — Wrocław** as a casual one-thumb portrait runner: 20–35 s typical first death, slapstick undead local (not gore), identity via brick dusk skyline + city obstacles + HUD wordmark. Art/audio/UI tasks have a slot map, palette, allowed/forbidden city references, and a placeholder-debt list. No gameplay implementation in this task.

Canonical brief: `games/zombie-runner/PRODUCT.md`.

## Files changed

- `games/zombie-runner/PRODUCT.md`
- `games/zombie-runner/README.md` (pointer to the brief)
- `docs/codex-manual-tasks/019_product_brief_zombie_runner_wroclaw-RESULT.md`

## Validations

| Check | Outcome |
| --- | --- |
| Inspected client `runner.json`, `chunks.json`, `wroclaw-v1` (empty slots), resources still on shared dino/desert pack | Done |
| `firstLayout` is `Game`; Intro/Leaderboard remain in JSON | Documented as debt for 022 |
| Brief covers player, hook, identity, fantasy, score/retry, visual/audio, mobile, MVP vs later, 020–025 checklist | Yes |
| No product implementation / no paid assets | Yes |

## Known limitations

- Brief does not commission specific pixel sizes; 020 chooses frame sizes that match existing slot resource counts.
- Object names (`Dino`, `CactusObstacle`) stay until a later rename is justified; pixels/copy must change.

## Commit SHA

Implementation: `af9b2cb473f110a37ec02c29320d2ddaa8b4972f`

## Operator actions required

None.

## Safety

```text
production_deploy_executed: false
external_paid_services_used: false
secrets_committed: false
store_publication_executed: false
```
