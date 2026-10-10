# Archive Heist — first playable Godot casebook

**Status:** exploratory runnable Godot game. Tested with Godot 4.6.3 headless on Linux, not visual QA on physical mobile devices.

## Source reuse

The self-contained standalone scene follows the 4-card / round / scoring / completion interaction pattern already built in the user's `jarode/fundacjakod` KOD Play `Shape Match` and `Animal Finder` minigames. **It does not copy the children's project or its accessibility core**: visual layout and source code here are an independent prototype so the existing Fundacja KOD app stays unchanged.

## Offline content and rights

- Eight **real artworks** from The Metropolitan Museum of Art Collection API. The manifest filters `isPublicDomain=true` and non-empty images; source links are preserved.
- Local JPG thumbnails stored under `assets/met-*.jpg` to play without a network.
- Original source records, original media URLs and SHA-256 checksums under `data/met-objects.json`.
- The date printed on exactly **one** card per case is deliberately false **within the game's fiction**, not a claim about the museum's actual records.
- Open Access CC0 materials, see [The Met's Open Access policy](https://www.metmuseum.org/policies/open-access) and [CSV/API sources](https://github.com/metmuseum/openaccess). Museum name is factual attribution, not endorsement.
- The prototype intentionally uses a **simple century-consistency puzzle**. It does **not** yet deliver the complex multi-clue investigations envisioned for a commercial Archive Heist.

## Play

Open `project.godot` in Godot 4.6.3, run F6/F5, choose the one altered catalogue year (hint: compare the century label with displayed year). Eight cases, score, images, result and restart. All assets are offline.

## Deterministic generator

```sh
python3 tools/build_levels.py
godot --headless --path . --editor --quit-after 2
godot --headless --path . --script res://tests/test_game.gd
```

Output `data/levels.json` is deterministic; eight puzzles x four cards, unique source IDs per case, exactly one altered date that conflicts with the displayed catalogue period. The original archive year and source ID are revealed after choosing.

## Next gate

- Browser build requires Godot 4.6.3 Web export template (not installed on initial Linux host).
- Manual visual inspection and mobile physical test remain outstanding.
- Increase difficulty: multi-clue logical elimination (not simply comparing years).
- Test real engagement before planning eight more game genres.
