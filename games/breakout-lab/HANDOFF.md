# Plonku web handoff — CITY BREAKER 2012

Later integration into `jarode/viral-growth-engine`. **This repo does not modify VGE.**

Machine-readable: `plonku-handoff.json`.

## Product

- **Slug:** `city-breaker-2012`
- **Title:** CITY BREAKER 2012
- **Hook:** TWOJE MIASTO WŁAŚNIE WYGENEROWAŁO CI LEVEL.
- **Input:** thumb/pointer paddle; Space/tap launch; **R** retry (scene replace).
- **Aspect:** iframe **9:16** recommended. Internal game is **1920×1080** landscape (letterboxed on phones).
- **Data:** `city-breaker-v1` mapping from four normalized factors. **No live VGE fetch.**

```text
node tools/gdevelop-web-export.mjs --game games/breakout-lab
node tools/package-plonku-handoff.mjs --game games/breakout-lab
```

Output: `dist/plonku-handoff/city-breaker-2012/` (gitignored) + `plonku-embed.json`.

Cache: bust with `buildId` from `plonku-embed.json`. Keep the whole folder together (`index.html` + `gd.js` + `code*.js` + assets).

Dev: `?profile=dense-spike` (city) or `?fixture=sparse-low` (neutral lab).

## Future VGE architecture (not implemented)

1. VGE resolves city → four catalog factors already in `[0,100]`.
2. Pass `{ id, values: [d,f,dw,e] }` into the embed (query, bootstrap JSON, or postMessage).
3. Do not import VGE SQL into GDevelop.

## Limitations

Kenney brick sprites remain. `2012` is style, not a data year. Physical phone not gated in 052.
