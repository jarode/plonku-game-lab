# Runner Template v1

Reusable portrait endless-runner seed extracted from the proven Zombie Runner client.

## Relationship

| Layer | Lives in | Who edits it |
| --- | --- | --- |
| Jump / collision / score / state events | Each game's GDevelop JSON (seeded from this template) | Only if the template is defective |
| Chunk sequencer, retry, `?dev=1` | `templates/runner-v1/runtime/chunk-runtime.template.js` | Template (then `sync-chunk-catalog`) |
| Chunk data | `<game>/chunks.json` | Each game |
| Placeholder art pack | `templates/runner-v1/assets/` | Shared; instantiate does **not** copy it |
| Per-game art | `<game>/assets/` optional overrides | Each game |
| Export / preview / skin / sync tools | `tools/` with `--game` | Shared |

**Zombie Runner** (`games/zombie-runner/`) is the golden *client*: Wrocław copy, skins, and chunk ids. Do not copy that folder to start a new game.

This template is the reusable seed. Instantiating copies it into `games/<slug>/`. The sequencer JS stays canonical here; `sync-chunk-catalog` injects it into whichever project `--game` points at.

## What is reusable

- Portrait 540×960, `adaptWidth`, one-button jump (Space / tap)
- States: Preparing → Playing → Dead → in-place retry (`zrSoftReset`)
- Named hazards `CactusObstacle`, `IslandObstacle`, `WreckObstacle` (logic names, not themes)
- Chunk catalog + EASY/MEDIUM/HARD sequencer
- Score as survival time
- `?dev=1` hooks
- Asset slots (player / three hazards / bg / ground / button)
- `node tools/gdevelop-web-export.mjs --game …`

## What is not reusable (keep on the Zombie client)

- Wrocław / Zombie titles, package name, skins `wroclaw-v1` / `alt-blocky`
- Zombie-specific chunk ids (`easy-cactus`, …)
- `PROVENANCE.md` / upstream dino example notes for that client
- Intro/Leaderboard leftover scenes (copied in the seed but unused as `firstLayout`)

## Instantiate a new game (task 011)

From the repo root:

```text
node tools/instantiate-runner.mjs my-runner --title "My Runner"
```

Then:

1. Open `games/my-runner/my-runner.json` in GDevelop.
2. Replace placeholder sprites via a new `skins/<name>/manifest.json` and `node tools/apply-skin.mjs <name> --game games/my-runner`.
3. Edit `games/my-runner/chunks.json` (keep 9 chunks, 3 per group) and `node tools/sync-chunk-catalog.mjs --game games/my-runner`.
4. Change HUD/title strings in the Game scene (Preparing / Playing / Dead text). Set scene string `HudTitle` for the in-place retry banner (`zrSoftReset` reads it). Optionally change `ObstacleSpeed` (balancing).
5. Do **not** copy files from `games/zombie-runner/` to paper over gaps.
6. Export: `node tools/gdevelop-web-export.mjs --game games/my-runner`

## Validate this seed

```text
node tools/sync-chunk-catalog.mjs --game templates/runner-v1
node tools/gdevelop-web-export.mjs --game templates/runner-v1
```

Placeholder art is the MIT GDevelop “Run, Dino run” pack (same files Zombie started from). Themes belong in client skins, not in this folder's branding.
