# CITY BREAKER 2012 — visual contract (GOAL 009 / 054)

Locked for tasks 055–059. Palette/CSS tweaks on Kenney bricks **do not** satisfy this contract. Geometry and `city-breaker-v1` mapping stay authoritative; art follows cells, never fakes extra holes.

`2012` = mood. No 2012 statistics. No Windows/macOS/iOS/GTA/iPhone chrome.

## 1. Current-state audit (GOAL 008)

Inspected: `docs/codex-manual-tasks/evidence/050-city-breaker-default.png`, `052-shell-*.png`, overlay in `runtime/lab-hooks.js`, Kenney `Assets/Block_*.png`.

| Area | Now (generic / prototype) | Target (must ship) |
| --- | --- | --- |
| Hierarchy / header | Three floating chips + paper title bar; chips wrap chaotically at 320px | One authored **utility window** (`CITYBRK.EXE`) with title row, status row, hook row as a single framed object |
| Playfield | Empty navy GDevelop stage; tiny Kenney bricks floating in the void | Data arena: grid + radar + skyline **behind** bricks; factor callouts **around** the board |
| Bricks | Generic white/yellow/red rounded Kenney slabs; HP = recolor only | Four **factor families** with icon/pattern/border (not color-only); HP as extra mark |
| City/data identity | Profile chip + Polish hook; board does not look like city data | Visible `GĘSTOŚĆ` `ZIELEŃ` `ZABUDOWA` `PODMIOTY` on/around cells; `BLOKI = FAKTY. PIŁKA = ZMIANA.` |
| Paddle / ball | Tiny default paddle + orange ball | Branded cyan paddle bar + luminous lime ball (original sprites) |
| Annotations | Hint line only | Arrows/callouts from factors to board edges (desktop); compact tags on 320 |
| Background depth | Flat navy + CSS scanlines | Layered: navy → grid → radar rings → skyline silhouette → bricks |
| Mobile | Letterboxed landscape table; HUD overlaps field | Same window system; reduce decoration, keep 44px CTAs, factor families still distinct **without** microscopic labels on cells |
| Start / result | Overlay text on empty field | Dedicated start/generation/result compositions (058) inside the same window |

## 2. Palette (tokens)

| Token | Hex | Use |
| --- | --- | --- |
| void | `#070B14` | Page / outside window |
| navy | `#0A1020` | Window interior / field |
| lime | `#C8FF00` | Title, CTA, ball glow, GĘSTOŚĆ marks |
| pink | `#FF2D95` | Profile, fail, PODMIOTY marks |
| cyan | `#00E5FF` | Score, paddle, ZABUDOWA marks |
| green-data | `#3DFF9A` | ZIELEŃ family (not lime) |
| paper | `#D8D0C0` | EXE title strip only |
| ink | `#1A1410` | Text on paper |
| grid | `rgba(0,229,255,0.12)` | Technical overlay |

## 3. Shell layout (055) — not “three chips”

Desktop (≥1024 CSS px):

```
┌ CITYBRK.EXE — PUBLIC DATA / 2012 INTERNET ENERGY          [ · ] ┐  paper strip 28px
│ CITY BREAKER 2012     PROFIL: {LABEL}     WYNIK n · ŻYCIA n   │  status 40px
│ TWOJE MIASTO WŁAŚNIE WYGENEROWAŁO CI LEVEL.                    │  hook 36px
│ BLOKI = FAKTY. PIŁKA = ZMIANA.                                 │  mantra 22px
│ ┌ playfield (remaining height)  grid+radar+skyline+board    ┐ │
│ └────────────────────────────────────────────────────────────┘ │
│ factor legend + profile CTAs (start only)                      │  56px
└────────────────────────────────────────────────────────────────┘
```

- Outer frame: 2px lime, **corner ticks** 8px (original; not a real OS).
- Window sits centered; max-width 1200px desktop.
- Portrait (≤430 CSS px): same regions stacked; mantra may hide; legend one line; CTAs wrap, min-height 44px.
- Do **not** leave GDevelop canvas as an unframed letterbox with HUD sprinkled on top as the only brand.

## 4. Data-block art system (056) — not recolored rectangles

Authoritative grid remains 8×5 from `cityBoardFromProfile`. Each occupied cell gets a **family** in generator metadata (`cell.family`) without changing which cells exist:

| Family | When | Must differ by |
| --- | --- | --- |
| `gestosc` | Occupied, not corridor-adjacent, upper rows | Dense hatch / packed bars |
| `zielen` | Column is corridor **or** neighbor of a corridor | Gap-mark / tree-plot silhouette |
| `zabudowa` | Lower used rows (mass from dwellings) | Brick-plot / facade fragment |
| `podmioty` | `hp >= 3` or cluster stride hit | Chart spike / node mark |

Plus HP pip (1–3 ticks) on every family. Hit/damaged/destroyed frames prepared (056); juice timing is 061.

**Required originals** under `games/breakout-lab/assets/citybrk-2012/` (repo-made PNG, documented in `PROVENANCE-ART.md`):

| File stem | Size |
| --- | --- |
| `cell-{gestosc,zielen,zabudowa,podmioty}-{1,2,3}.png` | 96×32 |
| `cell-{family}-hit.png` | 96×32 |
| `paddle.png` | ~160×24 |
| `ball.png` | 24×24 |
| `skyline.png` | ~640×120, silhouette only |

Kenney `Block_White.png` must **not** be visible in the player path after 056.

At 320/390: families readable by **pattern + silhouette**, not by text on the cell.

## 5. World layer (057)

- Technical grid 32px, radar 2–3 concentric cyan circles (CSS or SVG, original).
- `skyline.png` along the **bottom of the playfield**, below paddle travel, opacity ≤ 0.35, no collisions.
- Four edge callouts (desktop): arrows to `GĘSTOŚĆ` `ZIELEŃ` `ZABUDOWA` `PODMIOTY`.
- 320: callouts collapse to the status/legend row; skyline stays.

Ball/paddle/cells remain the brightest, sharpest objects.

## 6. Copy (player-facing)

Required strings (058 may add generation beat):

- `CITYBRK.EXE — PUBLIC DATA / 2012 INTERNET ENERGY`
- `CITY BREAKER 2012`
- `TWOJE MIASTO WŁAŚNIE WYGENEROWAŁO CI LEVEL.`
- `PROFIL: {LABEL}`
- `WYNIK {n} · ŻYCIA {n}`
- `BLOKI = FAKTY. PIŁKA = ZMIANA.`
- Factor names exactly: `GĘSTOŚĆ`, `ZIELEŃ`, `ZABUDOWA`, `PODMIOTY`

Disclaimer (result): 2012 = estetyka, nie data; interpretacja gry, nie werdykt o mieście.

## 7. Desktop / mobile acceptance matrix

| Viewport | Shell window | Families distinct | World present | Play readable |
| --- | --- | --- | --- | --- |
| 1440 desktop | yes | yes + edge callouts | grid+radar+skyline | bricks ≥ ~70% contrast vs field |
| 1024 | yes | yes | yes, slightly quieter | yes |
| 390 portrait | stacked window | pattern/silhouette, no cell text | skyline + grid, no 4 arrows | paddle/ball obvious |
| 320 portrait | stacked, mantra optional | same | skyline only + grid | CTAs 44px, no clip of paddle |

## 8. Forbidden (reject in 059)

- Kenney/generic rounded bricks as the intended look
- Color-only “reskin”
- Empty navy void as the playfield
- Copied OS widgets, iPhone bezel, GTA, stock explosion packs
- Claiming 2012 observations
- Decoration that looks like hittable bricks

## 9. Out of 054

No major visual implementation in this task. No movement/collision changes. No VGE.
