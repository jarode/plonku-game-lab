# Breakout Lab — board generator (043)

Runtime boards come from the 042 contract, not random `BrickLayout1–5`.

## Source of truth

- Mapping: `data/board-from-input.mjs`
- Fixtures: `data/fixtures/*.json`
- Patch `tools/patch-breakout-lab.mjs` embeds a finished catalog into Game JsCode (`runtime/lab-hooks.js` token `__BO_BOARDS__`).

## Selector

`?fixture=<id>` on the exported `index.html`.

Unknown id → load `balanced-mid` and set `window.__boBoardError = "unknown_fixture"`.

Default (no query) → `balanced-mid`.

## Runtime flags

| Flag | Meaning |
| --- | --- |
| `__boBoard` | mapped board object |
| `__boBoardSignature` | SHA-256 from Node mapping |
| `__boBoardId` | fixture id actually applied |
| `__boBoardError` | `""` or `unknown_fixture` |

Same fixture → same signature after restart (scene replace). No network.
