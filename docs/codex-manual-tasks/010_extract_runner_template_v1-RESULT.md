# 010 — Extract Runner Template v1 — RESULT

## Status

PASS

## Relationship

Zombie Runner stays the golden **client** (`games/zombie-runner/zombie-runner.json`). The reusable seed is `templates/runner-v1/`. New games are created with `node tools/instantiate-runner.mjs <slug>` and must not copy the Wrocław client.

Shared sequencer/retry/dev JS lives in `templates/runner-v1/runtime/chunk-runtime.template.js` and is injected by `sync-chunk-catalog`. Jump/collision events stay inside each GDevelop JSON (seeded from the template snapshot). Tools take `--game` (default `games/zombie-runner`).

## Extracted (reusable)

- Movement/jump core (seed project events)
- Preparing → Playing → Dead → `zrSoftReset`
- Chunk catalog + sequencer
- Survival score
- `?dev=1` hooks
- Object-name input (Space / tap / JumpButton)
- Asset slot contract + `apply-skin`
- Export/preview/sync with `--game`

## Intentionally not in the reusable layer

- Wrocław/Zombie titles, package id, `wroclaw-v1` / `alt-blocky` skins
- Zombie chunk ids (`easy-cactus`, …)
- Client provenance for the Wrocław experiment
- Unused Intro/Leaderboard scenes (present in the seed as leftover baseline, not branded)

## Instantiate procedure (for 011)

```text
node tools/instantiate-runner.mjs <slug> --title "Display Name"
node tools/apply-skin.mjs <skin> --game games/<slug>
# edit games/<slug>/chunks.json then:
node tools/sync-chunk-catalog.mjs --game games/<slug>
node tools/gdevelop-web-export.mjs --game games/<slug>
```

Details: `templates/runner-v1/README.md`.

## Files changed

- `templates/runner-v1/**` (seed project, generic chunks/skins/contracts, runtime)
- `tools/game-dir.mjs`, `tools/instantiate-runner.mjs`
- `tools/gdevelop-web-export.mjs`, `tools/preview-lan.mjs`, `tools/sync-chunk-catalog.mjs`, `tools/apply-skin.mjs`
- Removed `tools/chunk-runtime.template.js` (moved under the template)
- `tools/README.md`, root `README.md`, Zombie `README.md` / `CHUNK-CONTRACT.md` pointers
- `docs/codex-manual-tasks/010_extract_runner_template_v1-RESULT.md` (this file)

Zombie `zombie-runner.json` was not rewritten.

## Validations

| Check | Outcome |
| --- | --- |
| Template JSON has no Wrocław/Zombie Runner strings | PASS |
| `node tools/gdevelop-web-export.mjs` (Zombie) | **WEB_EXPORT: PASS** |
| `node tools/gdevelop-web-export.mjs --game templates/runner-v1` | **WEB_EXPORT: PASS** |

## Known limitations

- Jump/collision event sheets are snapshotted in both the template JSON and the Zombie JSON; they can drift if someone edits only one. Fix core in the template seed, then re-instantiate or patch clients.
- Seed still includes unused Intro/Leaderboard layouts from the dino example.
- Placeholder sprites are the MIT dino/desert pack (theme-neutral branding, not unique art).
- `zrReplaceGame` is defined in the template runtime (dev E/M/H/N); Zombie’s inlined copy was left unchanged in this task.

## Commit SHA

Implementation: `f990f4411c97b1c0dadc7176cf604d022060e624`

## Operator actions required

None. Task 011 is the factory test; this RESULT does not start it.

## Safety

```text
production_deploy_executed: false
external_paid_services_used: false
secrets_committed: false
store_publication_executed: false
```
