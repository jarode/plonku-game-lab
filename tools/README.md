# tools

Repo helpers. Machine-local GDevelop binaries stay in `F:\gry\GDevelop-5` (or `tools/local/`), not in git.

`--game` defaults to `games/zombie-runner`. Pass `templates/runner-v1` or `games/<slug>` for other projects.

## Web / HTML5 export

```text
node tools/gdevelop-web-export.mjs
node tools/gdevelop-web-export.mjs --game templates/runner-v1
```

## LAN phone preview

```text
node tools/preview-lan.mjs
node tools/preview-lan.mjs --game templates/runner-v1
```

## Chunk catalog

Sequencer source: `templates/runner-v1/runtime/chunk-runtime.template.js`

```text
node tools/sync-chunk-catalog.mjs
node tools/sync-chunk-catalog.mjs --game templates/runner-v1
```

## Skins (v2 slots)

```text
node tools/apply-skin.mjs wroclaw-v1
node tools/apply-skin.mjs traffic-v1 --game games/traffic-dash
```

See `templates/runner-v1/ASSET-CONTRACT.md`. Missing required slots or files exit 1 (`APPLY_SKIN: FAIL`).

## New runner game

```text
node tools/instantiate-runner.mjs my-runner --title "My Runner"
```

See `templates/runner-v1/README.md`.
