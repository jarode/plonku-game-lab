# 034 — City naming / narrative pass — RESULT

## Status

PASS

## Summary

Locked stack **Zombie Survival Score / WROCŁAW**. Live number uses `WYNIK`, never `Wrocław 438`. Canonical: `games/zombie-runner/NAMING.md`. Handoff `displayTitle` and PRODUCT display title aligned. Body copy may still say sentence-case Wrocław.

## Files changed

- `games/zombie-runner/NAMING.md`, `COPY.md`, `plonku-handoff.json`, `HANDOFF.md`, `PRODUCT.md`

## Validations

| Check | Outcome |
| --- | --- |
| `runner.json` title | Zombie Survival Score |
| `scorePrefix` | `WYNIK  ` (not the city) |
| HUD bitmaps | tag `WROCŁAW` + box `WYNIK` (existing) |

## Known limitations

- Bitmap start/HUD already matched; no GDevelop event rewrite required.

## Commit SHA

Implementation: `69ef5c0dac1bc64c5caf91170ec2151af9d9ace7`

## Operator actions required

None.

## Safety

```text
production_deploy_executed: false
external_paid_services_used: false
secrets_committed: false
store_publication_executed: false
```
