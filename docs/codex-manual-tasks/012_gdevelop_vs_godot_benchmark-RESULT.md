# 012 — GDevelop vs Godot benchmark and GO/NO-GO — RESULT

## Status

PASS

## Decision

**HYBRID — use GDevelop only for specified game types**

Use GDevelop as the default production path for **2D one-input portrait runners and similar small HTML5/mobile loops** that fit `runner-v1` (jump, chunks, reskin, CLI export).

Do **not** make GDevelop the default for 3D, simulation/tycoon, or games whose truth is a large GDScript/data model. That class still matches the prior Godot workflow (qualitative; not measured in this repo).

## Measured (this lab, GDevelop)

Sources: tasks 001–011 RESULTS, `tools/gdevelop-web-export.mjs`, `tools/instantiate-runner.mjs`, task 011 Traffic Dash session.

| ID | Dimension | GDevelop (measured unless noted) | Files / core touched |
| --- | --- | --- | --- |
| T0 | Template → first playable build | Instantiate Traffic Dash ~**125 ms**; first `WEB_EXPORT: PASS` ~**3.0 s** | Copy of seed; no gameplay rewrite |
| T1 | Reskin | Skin manifest + `apply-skin` (**41** resource paths); **0** new art files | `skins/traffic-v1/manifest.json` + project resource `file` fields |
| T2 | Balance parameter | `ObstacleSpeed` 550 → 420 in the Game scene variable | **1** field |
| T3 | Add/change chunks | Edit `chunks.json` (several layouts including easy-01 wreck) + `sync-chunk-catalog` | Catalog JSON + injected JsCode in the project file |
| T4 | Test on mobile | Helper `preview-lan.mjs` (`0.0.0.0`, port 8765 / `PREVIEW_PORT`). Task 007/009A used browser emulation; **no physical phone** in 011 | Docs + export folder (gitignored) |
| T5 | Debug a gameplay section | 008/009A: retry JS nested under Playing (real defect). 011: catalog sync overwrote retry HUD until `HudTitle` | Event-sheet nesting; ~7 lines of shared runtime |
| T6 | Web export | CLI `EXPORT_HTML5_EXTERNAL`; smoke checks; typical **3–5 s** when GDevelop is not already locking `build/` | Repeatable **PASS** on Zombie, template, Traffic Dash |

**Second-game core logic:** jump/collision events **not** edited. Template runtime gained `HudTitle` only. Zombie JSON **not** copied.

**Automation blockers:** export wants the GDevelop app closed / not holding `build/` (`EPERM` cleanup). Visual layout and collision masks are still editor-centric. Codex can patch JSON/JS; nested event groups are easy to get wrong.

**Asset friction:** skins key off GDevelop resource **names**, not contract slot ids. Instantiate **duplicates** ~90 placeholder binaries per game.

**Iteration / failure modes:** fast CLI export when it works; silent event-sheet bugs (retry never running); huge JSON diffs; GDevelop string/`NewLine()` pitfalls (task 004).

## Godot comparison

**No timed Godot T0–T6 exists in `plonku-game-lab`.** Comparison below is **qualitative**, from the prior Godot working model documented for Plonku-style 3D/sim work (Kenney kits, GDScript, simulation data first, Godot 4.x), not from a head-to-head clock on the same runner.

| Topic | Qualitative vs Godot |
| --- | --- |
| Scene/script split | Godot diffs are usually small scripts + `.tscn`; GDevelop stores events in one large JSON (Traffic Dash project ~24k lines). |
| 2D runner factory | GDevelop now has a measured T0 (~3 s export) this repo never demonstrated for a Godot runner. |
| 3D / tycoon / sim | Godot remains the better default; this experiment did not build that class. |
| HTML5 export | GDevelop CLI was reliable here; Godot web export is not measured in this repository. |
| Codex automation | Both are text-editable; GDevelop event nesting caused production bugs Godot scripts would usually make obvious. |

## Why not GO / NO-GO

- **Not GO (GDevelop for every simple game):** 3D/sim products and the documented Godot tycoon path are out of scope of the measured factory. A blanket GO would ignore that.
- **Not NO-GO:** For this runner class, GDevelop produced two playable clients, a reusable seed, and repeatable exports in seconds. Returning to Godot for *this* loop would throw away measured T0–T3 gains.

## Biggest remaining bottleneck

GDevelop **event-sheet JSON** as the source of truth: opaque nesting, HUD strings in multiple places, catalog sync coupled to inline JS, and per-game copies of the whole art pack.

## Next concrete action

Keep `runner-v1` for the next 2D runner; add **slot-id `apply-skin`** (or a shared asset pack so instantiate does not duplicate binaries). Do not start a Godot port of Traffic Dash. Do not start task 013 until ChatGPT reviews GOAL 002.

## Files changed

- `docs/codex-manual-tasks/012_gdevelop_vs_godot_benchmark-RESULT.md` (this file)

## Known limitations

- Godot side is unlabeled-as-measured: no T0–T6 numbers in this repo.
- 011 art is a remap, not a new pipeline for original illustrations.
- Mobile T4 was not re-run on a physical handset for Traffic Dash.

## Commit SHA

Docs only: `9dbdebad607a5a296ede9d0853ddfd32f5c725b6`

## Operator actions required

ChatGPT review of GOAL 002. No 013 started.

## Safety

```text
production_deploy_executed: false
external_paid_services_used: false
secrets_committed: false
store_publication_executed: false
```
