# CITY BREAKER 2012 — data contract (047)

Game runtime still consumes only the GOAL 007 object `{ id, values }` (`BOARD-CONTRACT.md`). This layer maps **four already-normalized VGE city factors** onto that object. No new observations. No network.

## Factor order → `values`

| `values[i]` | Key | VGE family |
| --- | --- | --- |
| 0 | `populationDensity` | population density |
| 1 | `forestCover` | forest cover share |
| 2 | `dwellingsPer1000` | dwellings per 1000 population |
| 3 | `entitiesPer1000` | registered entities per 1000 population |

v1 length is **4**. Longer `values` remain valid on the generator for later packs; this adapter always emits 4.

Missing / `null` / `NaN` / out of `[0,100]` → `BoardContractError`. **Never coerce missing to 0.** Explicit `0` is a real low score.

## Adapter

`data/city-profile-adapter.mjs` → `cityProfileToBoardInput(profile)`.

Profile JSON may include QA `label` / `notes`; those are **not** passed into `boardFromInput`.

## Future VGE handoff

Site/backend (not this game) should:

1. Resolve a city in the approved catalog.
2. Read the four factors already normalized to `[0,100]` (same semantics as Plonku/VGE today).
3. POST or embed `{ "id": "<stable-slug>", "values": [d, f, dw, e] }` or `{ id, factors: { ... } }`.
4. Not ship VGE SQL/schema into GDevelop. The HTML5 build stays fixture-offline until a later goal adds fetch.

## Fixtures

`data/city-breaker/fixtures/*.json` — QA archetypes, not census claims. `dense-spike` is the 046 `dense-urban` mood.
