# 024 — Plonku web handoff package — RESULT

## Status

PASS

## Package contract

| Item | Location |
| --- | --- |
| Human docs | `games/zombie-runner/HANDOFF.md` |
| Machine contract | `games/zombie-runner/plonku-handoff.json` (`plonku-web-handoff/v1`) |
| Packager | `node tools/package-plonku-handoff.mjs --game games/zombie-runner` |
| Generated folder | `dist/plonku-handoff/zombie-runner/` (gitignored) + `plonku-embed.json` (`buildId`) |

Export: `node tools/gdevelop-web-export.mjs --game games/zombie-runner` → `games/zombie-runner/build/index.html`. Relative GDJS assets only. Portrait 540×960, `adaptWidth`. No Plonku website changes.

This run: `PLONKU_HANDOFF: PASS`, `buildId` `1.0.0+78c80dc.20260905T1208`.

## Validations

| Check | Outcome |
| --- | --- |
| Packager smoke (relative `gd.js`, no root-absolute URLs, entry copied) | PASS |
| `RUNNER_REGRESSION` | PASS |
| `dist/` not committed | Yes (`.gitignore`) |

## Files changed

- `games/zombie-runner/HANDOFF.md`, `plonku-handoff.json`, `README.md`
- `tools/package-plonku-handoff.mjs`, `tools/README.md`
- project `description` (no longer “placeholder dino”)
- RESULT

## Known limitations

- Hosts must still set their own cache headers and iframe size.
- Icon/thumbnail stay in the game repo; CMS cards are a Plonku-site task later.

## Commit SHA

Implementation: `4bd9b04eb5156a6e69a57c7c3e74efdc6f3a9176`

## Operator actions required

None.

## Safety

```text
production_deploy_executed: false
external_paid_services_used: false
secrets_committed: false
store_publication_executed: false
```
