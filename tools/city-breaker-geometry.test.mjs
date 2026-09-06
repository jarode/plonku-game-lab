import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { cityBoardFromProfile } from "../games/breakout-lab/data/city-board-from-factors.mjs";
import { cityProfileToBoardInput } from "../games/breakout-lab/data/city-profile-adapter.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const fixDir = path.join(root, "games/breakout-lab/data/city-breaker/fixtures");
const snapDir = path.join(root, "games/breakout-lab/data/city-breaker/snapshots");

function loadFix(name) {
  return JSON.parse(fs.readFileSync(path.join(fixDir, name), "utf8"));
}

function grid(board) {
  return board.cells.map((row) => row.map((c) => (c ? c.hp : 0)));
}

test("same profile → same signature twice", () => {
  const raw = loadFix("dense-spike.json");
  const a = cityBoardFromProfile(raw);
  const b = cityBoardFromProfile(JSON.parse(JSON.stringify(raw)));
  assert.equal(a.signature, b.signature);
  assert.deepEqual(grid(a), grid(b));
});

test("golden snapshots match all six fixtures", () => {
  const names = fs.readdirSync(fixDir).filter((n) => n.endsWith(".json"));
  for (const name of names) {
    const board = cityBoardFromProfile(loadFix(name));
    const snapPath = path.join(snapDir, board.id + ".json");
    const snap = JSON.parse(fs.readFileSync(snapPath, "utf8"));
    assert.equal(board.signature, snap.signature);
    assert.equal(board.brickCount, snap.brickCount);
    assert.deepEqual(grid(board), snap.cells);
  }
});

test("playability: last row empty, brick caps, not sealed, not empty", () => {
  for (const name of fs.readdirSync(fixDir).filter((n) => n.endsWith(".json"))) {
    const board = cityBoardFromProfile(loadFix(name));
    assert.ok(board.brickCount >= 8 && board.brickCount <= 28, board.id);
    assert.ok(board.cells[4].every((c) => c == null), board.id + " opening row");
    assert.equal(board.cells[0].length, 8);
  }
});

test("green-open has corridors; dense-spike is a wall", () => {
  const green = cityBoardFromProfile(loadFix("green-open.json"));
  const dense = cityBoardFromProfile(loadFix("dense-spike.json"));
  const greenEmptyCols = [0, 1, 2, 3, 4, 5, 6, 7].filter((c) => green.cells.every((row) => row[c] == null));
  assert.ok(greenEmptyCols.length >= 1);
  assert.ok(dense.brickCount >= green.brickCount + 10);
  assert.deepEqual(dense.debug.forestCover.corridorColumns, []);
  assert.ok(green.debug.forestCover.corridorColumns.length >= 2);
});

test("raw zeros still playable via transform", () => {
  const board = cityBoardFromProfile(loadFix("low-edge.json"));
  assert.deepEqual(cityProfileToBoardInput(loadFix("low-edge.json")).values, [0, 0, 0, 0]);
  assert.ok(board.brickCount >= 8);
});

test("debug names each factor", () => {
  const d = cityBoardFromProfile(loadFix("mixed-spike.json")).debug;
  assert.ok(d.populationDensity && d.forestCover && d.dwellingsPer1000 && d.entitiesPer1000);
});
