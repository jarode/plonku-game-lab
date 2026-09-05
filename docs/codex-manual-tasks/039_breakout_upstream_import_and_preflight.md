# 039 — Breakout upstream import and preflight

## Gate

Start of GOAL 007. Tasks 034–038 remain parked and are not a dependency.

## Goal

Import and validate a clean Breakout baseline from the official GDevelop examples repository without yet applying a Plonku topic or redesign.

## Upstream target

Preferred upstream:

- repository: `GDevelopApp/GDevelop-examples`
- example: `examples/breakout`

Pin the exact upstream commit SHA used.

## Scope

1. Verify the example is legally/permissively usable for this lab. Record license/provenance evidence. If licensing is unclear, return `BLOCKED` and STOP instead of assuming.
2. Import the complete required project/assets into a new game client, preferred slug:

```text
games/breakout-lab/
```

3. Do not copy code/assets from Zombie Runner to bootstrap gameplay.
4. Make only the minimum path/project adjustments required to open and export the example locally.
5. Reuse `tools/gdevelop-web-export.mjs --game ...` if compatible. If it is runner-specific in a way that blocks this game, make the smallest generic shared-tool fix and regression-check existing clients.
6. Record current scenes, controls, scoring, lives/restart behavior, viewport/orientation and obvious demo debt.
7. Do not redesign graphics or gameplay yet.

## Validation

PASS requires:

- exact upstream SHA and provenance recorded;
- game project opens/is structurally valid;
- HTML5 export PASS;
- exported build reaches playable Breakout loop;
- no Zombie client/factory gameplay edits;
- demo debt documented for 040–041;
- `git diff --check` PASS.

## Result

Create:

`docs/codex-manual-tasks/039_breakout_upstream_import_and_preflight-RESULT.md`

Include upstream SHA/license evidence, imported paths, export evidence, current mechanics/control summary, demo debt and final status.

## Chain behavior

Exact `PASS` -> 040 in a fresh session. Else STOP GOAL 007.
