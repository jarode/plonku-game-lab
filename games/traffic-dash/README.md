# Traffic Dash

Instantiated from `templates/runner-v1/`. Theme: roadside traffic using remapped example sprites (duck runner, trees/signs/cacti as hazards). Slower scroll (`ObstacleSpeed` 420).

Canonical file: `games/traffic-dash/traffic-dash.json`

```text
node tools/apply-skin.mjs traffic-v1 --game games/traffic-dash
node tools/sync-chunk-catalog.mjs --game games/traffic-dash
node tools/gdevelop-web-export.mjs --game games/traffic-dash
```
