# Plonku web handoff — Zombie Survival Score / WROCŁAW

Contract for a **later** Plonku integration. This repo does not modify or deploy the Plonku site.

Machine-readable twin: `plonku-handoff.json`.

## Production export

From the **plonku-game-lab** root, GDevelop closed:

```text
node tools/gdevelop-web-export.mjs --game games/zombie-runner
```

Success line: `WEB_EXPORT: PASS`.

| Item | Path |
| --- | --- |
| Working export | `games/zombie-runner/build/` (gitignored) |
| Entry | `build/index.html` |
| Required | `index.html`, `gd.js`, `data.js`, `runtimegame.js`, `runtimescene.js`, `code0.js`–`code2.js`, copied image/audio next to them |

Copy a clean folder for embed:

```text
node tools/package-plonku-handoff.mjs --game games/zombie-runner
```

Writes `dist/plonku-handoff/zombie-runner/` (gitignored) plus `plonku-embed.json` with a `buildId`.

## Base path / assets

GDevelop HTML5 uses **relative** `src`/`href` (no leading `/`). Host the **entire** export directory as one unit.

| Hosting | OK? |
| --- | --- |
| `https://plonku.example/games/zombie-runner/` with `index.html` in that folder | Yes |
| iframe `src` pointing at that URL | Yes (allow autoplay/pointer; same-origin or CORS not required for relative assets) |
| Flattening files into a CDN root that also serves other games’ `gd.js` | No — collisions |
| `<base href>` pointing away from the export folder | No unless every relative URL is rewritten |

## Viewport / orientation

- Design: **540×960**, `orientation: portrait`, `adaptWidth`.
- `index.html` already has `viewport` + `user-scalable=no` + `theme-color`.
- Prefer CSS/iframe that keeps a 9:16 stage; landscape is “usable but not the product”.

## Cache / versioning

- `buildId` in packaged `plonku-embed.json` (git SHA + time).
- Hosts should cache-bust on `buildId` (query on iframe src or folder name `zombie-runner/<buildId>/`).
- Do not assume long-cache on `index.html`.

## Runtime dependencies

- **None** beyond a static file server. No GDevelop cloud APIs required for play.
- Gameplay music: export copies `cybernyczny-zmrok.mp3` (project resource name `DesertMusic.mp3`). One loop per session; do not start a second Howler instance on retry.
- Desktop mute: `U` → `localStorage zr-muted`. Phone: system volume.
- Optional `?dev=1` is **not** for production embeds.

## Player flow (embed QA)

- Start: `ROZPOCZNIJ GRĘ` or Space. `WYBIERZ MIASTO` opens picker; `WROCŁAW · GRAJ` returns to start/GO without starting a run.
- Jump: Space / tap / jump button while Playing.
- Dead: Space, R, or tap except city chrome → in-place retry.

## Branding files (in this repo, not the HTML5 folder until export copies used resources)

| Role | Repo path |
| --- | --- |
| Icon / mark | `games/zombie-runner/assets/wroclaw-v1/logo.png` |
| Thumbnail | `games/zombie-runner/assets/wroclaw-v1/bg_far.png` |

The HTML5 export copies in-game resources; copy icon/thumbnail into the Plonku CMS separately if the site needs a card image.

## What this is not

- Not a public deploy.
- Not analytics, ads, or login.
- Not a second app framework around GDJS.
