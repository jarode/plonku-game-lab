# Open Data Game Adapter — The Met → GDevelop Breakout Lab

**Status:** TECHNICAL PROOF / DATA PASS. Browser export and physical gameplay QA not yet run.  
**Branch:** `experiment/open-data-met-breaker`. Does not modify `main`.

## Existing components reused

- GDevelop Breakout Lab: paddle/ball/bricks, score, restart, desktop/mobile controls.
- `games/breakout-lab/data/board-from-input.mjs`: tested data → 5-row board mapping.
- `tools/patch-breakout-lab.mjs`: embeds `data/fixtures/*.json` into game catalog.
- `?fixture=met-vase-open-data`: selects new level **after browser export**.

## Public data

- Source: [The Met Collection API](https://metmuseum.github.io/), query `q=vase&hasImages=true`.
- Manifest: `met-records.json` (11 objects with unique asserted `objectBeginDate`, `isPublicDomain=true`, non-empty `primaryImageSmall`).
- Rights: [The Met Open Access](https://github.com/metmuseum/openaccess): collection data CC0, images only when the object is marked Open Access/public domain. This proof stores remote image URLs but does not copy/distribute image bytes.
- The museum's name/logo is not licensed as an endorsement.
- Import data can change; proof is a reproducible snapshot of specific IDs, not a complete ingest.

## Mapping rule

Each column represents one real museum object; its value is the **age-rank percentile within the selected 11 objects**, derived deterministically from `objectBeginDate` (older => stronger/taller column). Game brick layout is a visualisation **inspired by the data**, not a research conclusion. Same manifest gives the same SHA-256 board signature. The original in-game UI still says `CITY BREAKER 2012`, so it needs a reskin, object labels, and source links before release.

## Commands

```bash
node tools/generate-met-vase-board.mjs --check
# to regenerate:
node tools/generate-met-vase-board.mjs --write
node tools/patch-breakout-lab.mjs
# on a machine with the existing GDevelop CLI / browser:
node tools/gdevelop-web-export.mjs --game games/breakout-lab
node tools/breakout-lab-smoke.mjs --skip-export
# open exported index.html through a local server with ?fixture=met-vase-open-data
```

## What is confirmed and what isn't

- **PASS:** 11 real public-domain records with media URLs, legal candidate filtering, static manifest.
- **PASS:** fixture has 11 numbers in [0,100]; board has valid deterministic geometry.
- **PASS:** existing patcher embeds fixture in the GDevelop project.
- **NOT TESTED:** complete GDevelop browser export, visual runtime load, license inspection of every potential third-party UI/font/sound asset, mobile playability.
- **NOT CLAIMED:** this arcade level is an original detective game or complete new product.

## Next steps

1. Add UI revealing object titles/years/source on block clearance (otherwise dataset is invisible to player).
2. Replace City Breaker art/text in a separate game client, not the canonical `games/breakout-lab`.
3. Add quality and retention tests; evaluate whether data-driven Breakout is actually engaging.
4. In parallel evaluate the stronger creative fit: **Archive Heist in Godot** based on `fundacjakod/apps/kod-play/game/play/shape_match.*`, with unique logic puzzles to implement.

## v1 museum UI integration (feature/open-data-games-v1)

- A contextual museum panel appears **only** for `?fixture=met-vase-open-data`, with real record title, date, image and link.
- Buttons browse all 11 artifacts. Data originates in `met-records.json` and is embedded into GDevelop project during patch; the museum images in this arcade implementation are still remote URL thumbnails.
- Run `node tests/met-open-data-game.test.mjs` to verify the 11-column deterministic board, source eligibility, panel embed and Archive Heist level structure.
- This remains a study with City Breaker baseline gameplay; to launch commercially, create an independent GDevelop client, give columns an explicit data legend, conduct license review for all packaged third-party sound/UI/font files, and pass browser/mobile smoke.


## Browser smoke after export (2026-10-10)

- Full GDevelop Linux export passed; runtime assets and source links were checked.
- Dedicated Chromium 390×844 browser smoke: **MUSEUM_BROWSER_SMOKE PASS**, 11 records, 30 bricks, source link and museum navigation (second card displayed).
- [Screenshot — portrait browser emulation](museum-mobile-smoke.png). The city-style letterboxed landscape playfield remains **too small for quality mobile portrait play**; must be redesigned as a portrait scene or supported primarily in landscape.
- Command: `CHROME_PATH=<chromium executable> node tools/breakout-lab-smoke.mjs --skip-export --viewport 390x844 --museum-only --shot`.
- Real Android/iOS tap QA and the **complete** legacy regression suite remain outstanding. Do not describe them as PASS.
