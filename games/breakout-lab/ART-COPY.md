# CITY BREAKER 2012 — art + copy lock (049)

Implementation-ready. `2012` is mood, not a data year. No third-party OS/phone/GTA chrome.

## Hook

**TWOJE MIASTO WŁAŚNIE WYGENEROWAŁO CI LEVEL.**

Support: `PUBLIC DATA / 2012 INTERNET ENERGY` · `CITY DATA → GAME LEVEL`

## Palette

| Token | Hex | Use |
| --- | --- | --- |
| navy | `#0a1020` | field |
| lime | `#c8ff00` | titles / CTA |
| pink | `#ff2d95` | profile / fail |
| cyan | `#00e5ff` | HUD score |
| paper | `#d8d0c0` | fake window chrome |
| ink | `#1a1410` | body on paper |

Typography: UI Arial/Verdana (system). Optional pixel-adjacent tracking + uppercase. No unlicensed bitmap fonts.

## Texture / panels

- 1px lime/pink/cyan frames, chunky padding.
- Optional CSS noise (`opacity` 0.04 repeating) — original, not a downloaded pack.
- Fake window title `CITYBRK.EXE` — generic filename, not Windows chrome clone (no start-bar, no traffic-lights, no iOS status bar).

## HUD / buttons

- HUD chips: `BREAKOUT` replaced by `CITY BREAKER 2012` (short: `CITYBRK`).
- Profile chip: `PROFIL · {label}` not raw fixture jargon on the player path (`balanced-mid` → `BALANS`).
- CTA: lime fill, ink text, 44px min height.
- Bricks: keep three HP families; 050 may recolor Kenney placeholders to lime/pink/cyan **tints** (recolor, not a new Kenney pack). Prefer original 1-bit panels if generated in-repo.

## Ball / paddle

Paddle: cyan slab. Ball: lime or paper circle. No branded orbs.

## Background

Navy + faint scanlines CSS. No city skyline photo.

## States (copy)

Longest strings must fit 320px width (wrap, max ~2 lines).

| Slot | PL |
| --- | --- |
| First screen title | `CITY BREAKER 2012` |
| Hook | `TWOJE MIASTO WŁAŚNIE WYGENEROWAŁO CI LEVEL.` |
| Sub | `PUBLIC DATA / 2012 INTERNET ENERGY` |
| Start CTA | `ODPAL LEVEL` |
| Profile label | `PROFIL` + short QA name |
| HUD score | `WYNIK {n}` |
| HUD lives | `ZYCIA {n}` |
| Play hint | `RUSZ PALETKA · DOTKNIJ / SPACJA` |
| Fail | `SYGNAL UTRACONY` |
| Retry | `JESZCZE RAZ` |
| Win | `LEVEL ROZBITT` (use `LEVEL ROZBITY`) |
| Result line | `LEVEL Z DANYCH PUBLICZNYCH · TO INTERPRETACJA GRY, NIE WERDYKT O MIESCIE.` |
| Share placeholder | `Rozbilam/em level CITY BREAKER 2012 · profil {id} · wynik {n}` |
| Disclaimer | `Rok 2012 = estetyka. Statystyki nie sa z 2012. Brak danych != zero.` |
| Mapping legend | `gestosc → wiecej cegiel` / `zielen → przeswity` / `zabudowa → masa` / `podmioty → twardsze klocki` |

QA profile display names:

| id | Player label |
| --- | --- |
| balanced-mid | BALANS |
| dense-spike | GESTE MIASTO |
| green-open | ZIELONY OTWARTY |
| mixed-spike | SPIKE |
| low-edge | MINIMUM |
| high-edge | MAXIMUM |

## Asset path

| Kind | 049/050 |
| --- | --- |
| HUD / window / scanlines | Procedural CSS in lab-hooks (original) |
| Brick/paddle/ball pixels | Recolor existing sprites in 050 or generate tiny original PNGs under `games/breakout-lab/assets/citybrk-2012/` |
| Plonku brand | Lime/pink/cyan only; no Zombie skyline reuse |
| Kenney / GDevelop | Lab leftovers OK until replaced; not “Plonku original art” |

Provenance for any new PNG: created in this repo for CITY BREAKER 2012, MIT with the game. No scraped UI kits.

## Forbidden

Windows/macOS/iOS/Android widgets, iPhone bezel, GTA names, nostalgic sprite CDs, “dane z 2012”.
