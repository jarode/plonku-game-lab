# 054 — CITY BREAKER visual audit + locked visual contract

## Goal
Audit the current accepted CITY BREAKER 2012 build and turn the approved Plonku concept into a concrete implementation contract before changing visuals.

## Scope
- Inspect current screenshots/build from GOAL 008.
- Identify what currently reads as generic Breakout / empty prototype.
- Write a locked visual contract for tasks 055–059.
- Preserve gameplay/data logic.

## Required audit findings
At minimum assess:
- hierarchy/header,
- empty playfield,
- generic bricks,
- lack of city/data identity,
- paddle/ball branding,
- annotations/microcopy,
- background depth,
- mobile density/readability,
- result/start states.

## Locked target
The contract must require:
- Plonku dark data-punk base;
- lime/pink/cyan accents;
- retro `.EXE` chrome;
- data-grid/radar/diagram texture;
- city silhouette/map/infrastructure motifs;
- data cells instead of generic bricks;
- factor labels `GĘSTOŚĆ`, `ZIELEŃ`, `ZABUDOWA`, `PODMIOTY`;
- branded paddle and luminous ball;
- playful annotations and arrows;
- no copied OS/product UI.

## Deliverables
- `games/breakout-lab/VISUAL-CONTRACT.md`
- current-state vs target checklist
- desktop/mobile acceptance matrix

## Do not
- do not implement major visuals yet;
- do not change movement or collisions;
- do not modify VGE.

## Acceptance
`PASS` only if the visual contract is specific enough that later workers cannot satisfy it with simple palette/CSS tweaks.

Next on exact PASS: 055.
