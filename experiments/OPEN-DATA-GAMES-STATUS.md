# Open Data → Games: first two playable prototypes

Date: 2026-10-10. **Isolated feature branch**. Do not merge unreviewed changes into game-lab main.

## Museum Breaker (GDevelop / HTML5)

- Based on the existing GDevelop Breakout Lab (MIT example) and data-board adapter; no new game engine.
- 11 Open Access Met artefact records drive deterministic board layout. Public record browser with titles, thumbnail URLs, chronology and original source links.
- `node tests/met-open-data-game.test.mjs`: PASS.
- `node tools/gdevelop-web-export.mjs --game games/breakout-lab --smoke-only`: **WEB_EXPORT PASS** (GDevelop 5.6.283 Linux exported in isolated graphics container).
- Download [Museum Breaker web preview ZIP](open-data-met-breaker/museum-breaker-web-preview.zip). Unzip, run `python3 -m http.server 8080` from the extracted folder and open `http://localhost:8080/`.
- Browser runtime and real-phone tests: check the feature PR's evidence and status; **must not assume PASS from export alone**.
- Source of truth: [Open Data proof](open-data-met-breaker/README.md).

## Archive Heist (Godot / desktop game prototype)

- Godot 4.6.3 self-contained source: [archive-heist-godot/](archive-heist-godot/).
- 8 date-label cases, 4 photo cards per case, offline The Met CC0 media, scoring, feedback and restart.
- `python3 experiments/archive-heist-godot/tools/build_levels.py`: PASS.
- `godot --headless --path experiments/archive-heist-godot --script res://tests/test_game.gd`: **PASS** for 8 rounds, correct/wrong answers and restart.
- Download [Archive Heist Godot project ZIP](archive-heist-godot-source.zip) and open `project.godot` using official Godot 4.6.3.
- Browser export and physical mobile checks: **not done**. Headless tests do not establish visual quality.
- Adapted general game-card/round pattern from our KOD Play `Shape Match` / `Animal Finder`, but kept Fundacja KOD repository unchanged.

## Rights and limits

Museum catalogue facts and eligible Open Access images are sourced from The Met, subject to specific object rights and attribution. Original unlicensed material, software UI, source code and logos of licensors must be audited independently before commercial launch. This is a technical demo, not a museum endorsement. Some GDevelop baseline sample UI/sound/font assets still require release-grade license review.

**Product fit remains uncertain:** The Godot puzzle is a simple date/century contradiction, not yet a deep detective mystery. Museum Breaker is an arcade visualization using real records, not automatically a compelling game.
