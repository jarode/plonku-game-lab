# Pigeon Dash

Instantiated from `templates/runner-v1/`. Canonical GDevelop file: `games/pigeon-dash/pigeon-dash.json`

Park-strut one-input runner (pigeon-themed remap of pack art). Instantiated from `templates/runner-v1/` only — not copied from Zombie or Traffic Dash.

Canonical GDevelop file: `games/pigeon-dash/pigeon-dash.json`. Skin: `pigeon-v1`. Config: `runner.json`.

```text
node tools/apply-skin.mjs pigeon-v1 --game games/pigeon-dash
node tools/sync-chunk-catalog.mjs --game games/pigeon-dash
node tools/sync-runner-config.mjs --game games/pigeon-dash
node tools/gdevelop-web-export.mjs --game games/pigeon-dash
node tools/runner-regression.mjs --game games/pigeon-dash
```

