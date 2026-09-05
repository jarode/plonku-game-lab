# Plonku visual language — Zombie Runner (GOAL 005 / 026)

Locked for tasks 027–033. Moodboards: `docs/codex-manual-tasks/refs/goal-005/moodboard-game-over-wroclaw.jpg`, `moodboard-ui-kit-plonku.jpg`.

## Style name

**Neon-editorial / data-punk / cyber-grunge.** Public-data dashboard over a slightly haunted city. Humor first, anxiety as spice, never gore-first.

Mantra: **dane + miasto + zombie = gra**. Tagline energy: *duże dane, większe emocje*.

## Palette (mandatory)

| Token | Hex | Use |
| --- | --- | --- |
| Lime | `#D7FF3F` | Primary CTA, big score, frames |
| Hot pink | `#FF2D8B` | City tags, secondary punch, warnings |
| Cyan | `#00D9FF` | Meta / coordinates / secondary icons |
| Navy | `#1A1D23` | Panels, night |
| Off-white | `#F4F4F1` | Body titles |
| Pink moon / haze | `#E8B86D`–`#FF2D8B` wash | Sky only, not UI chrome |

No desert beige as a brand color. Brick may remain as world dirt, not HUD fill.

## Type

Bold condensed editorial sans. Huge titles, tiny ALL-CAPS labels in boxes (`SCORE`, `FAKTY`, `WROCŁAW`, `ZOMBIE`). Slight slant OK on tags, not on the score numeral.

Until a licensed/webfont is added: keep `Nathaniel-19.otf` **or** a bundled original/permissive grotesque; do not mix more than two faces.

## UI language

Everything important lives in a **frame**: 2–4 px neon stroke, navy fill, optional corner ticks. Labels are **tags**, not sentences. Max 2 CTAs on a screen (lime primary, outlined secondary).

## City

Wrocław = night river + twin spires as **silhouette**, tram as threat/absurd, not a guidebook. Coordinates `51.1079° N, 17.0385° E` are optional chrome, not gameplay.

## Tone

PL player-facing. Weird-fun. Examples of attitude (final words are task 027): survival as a data point; the city does not sleep; retry is “spróbuj jeszcze”, not a system error.

## Must kill (current build)

- Prototype English (`Tap to retry`, `Tap to run · U mutes audio` as the only voice)
- Naked `ScoreText` with no frame
- Generic geometric “kids’ cut-out” as the **intended** look (031 replaces world)
- Player-facing **Made with GDevelop**
- Desert/dino **pixels** in the play loop (already mostly gone; 031/032 verify)
- HUD that is only `Wrocław  438`

## Must keep

- One-thumb runner, in-place retry, factory slots/`runner.json`, portrait 540×960
- No ads/login. Choose-city can be a dead/secondary control until GOAL 006.

## Screen map

| Task | Screen |
| --- | --- |
| 028 | Start: title + city tag + `ROZPOCZNIJ GRĘ` + `WYBIERZ MIASTO` |
| 029 | Play HUD: score box + city tag, light |
| 030 | Game over: `KONIEC GRY` + big score + retry + change city |
| 031 | World: tram / barricade / pigeon / runner / skyline |
| 032 | Watermark, titles, export cleanliness |
