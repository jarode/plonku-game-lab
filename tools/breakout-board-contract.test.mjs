import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { boardFromInput, parseBoardInput, BoardContractError } from "../games/breakout-lab/data/board-from-input.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const fixDir = path.join(root, "games/breakout-lab/data/fixtures");
const badDir = path.join(root, "games/breakout-lab/data/invalid");

function load(dir, name) {
  return JSON.parse(fs.readFileSync(path.join(dir, name), "utf8"));
}

test("five fixtures parse and are deterministic", () => {
  const names = fs.readdirSync(fixDir).filter((n) => n.endsWith(".json"));
  assert.equal(names.length, 5);
  const sigs = new Set();
  for (const name of names) {
    const raw = load(fixDir, name);
    const a = boardFromInput(raw);
    const b = boardFromInput(JSON.parse(JSON.stringify(raw)));
    assert.equal(a.signature, b.signature);
    sigs.add(a.signature);
  }
  assert.equal(sigs.size, 5);
});

test("sparse vs dense boards differ in brickCount", () => {
  const sparse = boardFromInput(load(fixDir, "sparse-low.json"));
  const dense = boardFromInput(load(fixDir, "dense-high.json"));
  assert.ok(dense.brickCount > sparse.brickCount + 8);
});

test("mixed corridor has empty columns vs dense", () => {
  const mixed = boardFromInput(load(fixDir, "mixed-corridor.json"));
  const dense = boardFromInput(load(fixDir, "dense-high.json"));
  const mixedEmpty = mixed.cells.flat().filter((c) => c == null).length;
  const denseEmpty = dense.cells.flat().filter((c) => c == null).length;
  assert.ok(mixedEmpty > denseEmpty);
});

test("explicit 0 is a corridor not a missing value", () => {
  const spike = boardFromInput(load(fixDir, "mixed-spike.json"));
  assert.equal(spike.columns, 6);
  assert.ok(spike.brickCount >= 1);
});

test("invalid inputs fail closed", () => {
  assert.throws(() => parseBoardInput(load(badDir, "missing-values.json")), BoardContractError);
  assert.throws(() => parseBoardInput(load(badDir, "null-hole.json")), BoardContractError);
  assert.throws(() => parseBoardInput({ id: "x", values: [1, 2] }), BoardContractError);
});
