# 003 — Reproducible web export

## Gate

Requires task 002 PASS.

## Goal

Create a repeatable, documented way to export the current GDevelop game to web/HTML5 and validate the result without manual guesswork.

## Scope

1. Determine the safest supported export path available in the current toolchain.
2. Add a repo-local helper under `tools/` where useful.
3. Produce export output outside tracked source or in an ignored build directory.
4. Add a smoke validation that verifies at minimum:
   - export completes successfully;
   - `index.html` exists;
   - expected runtime assets are present;
   - no obvious missing-file references exist.
5. Document exact commands/steps.

## Constraints

- Do not deploy publicly.
- Do not commit generated web bundles unless the task proves they are intentionally required.
- Do not use paid/cloud export services unless already available and explicitly free for this workflow.

## Acceptance criteria

PASS only if a fresh checkout can follow the documented procedure and produce a valid web export with a clear PASS/FAIL validation signal.

If the installed GDevelop tooling cannot support automation, report the exact limitation and the smallest manual boundary instead of pretending full automation exists.

## Result

Create `003_reproducible_web_export-RESULT.md` with status, commands, evidence, changed files, limitations, and commit SHA. Stop after push.
