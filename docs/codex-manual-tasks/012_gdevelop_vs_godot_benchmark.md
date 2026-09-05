# 012 — GDevelop vs Godot benchmark and GO/NO-GO

## Gate

Requires task 011 PASS.

## Goal

Decide whether this GDevelop workflow is actually a better production path for our simple web/mobile games than the previous Godot workflow.

This is primarily an analysis/measurement task. Do not redesign the architecture unless a tiny measurement helper is required.

## Benchmark dimensions

Measure or estimate from repository evidence and actual work completed:

- T0: template -> first playable build;
- T1: reskin effort;
- T2: balance/mechanic parameter change;
- T3: add/change a level chunk;
- T4: test on mobile;
- T5: debug a gameplay section;
- T6: produce web export;
- number of files touched for common changes;
- amount of core logic touched during second-game creation;
- manual editor-only steps that block Codex automation;
- reliability of repeatable testing/export;
- asset workflow friction;
- iteration speed and failure modes.

Compare these findings to documented experience from the prior Godot workflow where evidence is available. Clearly label any comparison that is qualitative rather than measured.

## Decision output

Choose one:

- `GO — use GDevelop as default for this class of game`;
- `HYBRID — use GDevelop only for specified game types`;
- `NO-GO — return to Godot / another stack`.

Include the exact reasons and the boundaries of the decision.

## Constraints

- Do not manipulate metrics to justify the current experiment.
- Separate measured facts from subjective impressions.
- Do not start a third game in this task.

## Acceptance criteria

PASS only if the report contains a clear evidence-based decision, identifies the biggest remaining bottleneck, and recommends the next concrete action for the project.

## Result

Create `012_gdevelop_vs_godot_benchmark-RESULT.md` with the benchmark table, evidence sources, GO/HYBRID/NO-GO decision, limitations, and commit SHA if repository changes are made. Stop after push.
