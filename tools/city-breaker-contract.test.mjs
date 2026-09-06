import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { parseBoardInput, BoardContractError } from "../games/breakout-lab/data/board-from-input.mjs";
import { cityProfileToBoardInput, FACTOR_KEYS } from "../games/breakout-lab/data/city-profile-adapter.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const fixDir = path.join(root, "games/breakout-lab/data/city-breaker/fixtures");
const badDir = path.join(root, "games/breakout-lab/data/city-breaker/invalid");

function load(dir, name) {
  return JSON.parse(fs.readFileSync(path.join(dir, name), "utf8"));
}

test("six city-breaker fixtures adapt to length-4 values and are deterministic", () => {
  const names = fs.readdirSync(fixDir).filter((n) => n.endsWith(".json")).sort();
  assert.equal(names.length, 6);
  const required = [
    "balanced-mid.json",
    "dense-spike.json",
    "green-open.json",
    "high-edge.json",
    "low-edge.json",
    "mixed-spike.json",
  ];
  assert.deepEqual(names, required);
  for (const name of names) {
    const raw = load(fixDir, name);
    const a = cityProfileToBoardInput(raw);
    const b = cityProfileToBoardInput(JSON.parse(JSON.stringify(raw)));
    assert.equal(a.values.length, 4);
    assert.deepEqual(a.values, b.values);
    assert.equal(a.id, raw.id);
    parseBoardInput(a);
  }
});

test("adapter emits values in FACTOR_KEYS order", () => {
  const input = cityProfileToBoardInput(load(fixDir, "dense-spike.json"));
  assert.deepEqual(FACTOR_KEYS, [
    "populationDensity",
    "forestCover",
    "dwellingsPer1000",
    "entitiesPer1000",
  ]);
  assert.deepEqual(input.values, [94, 8, 88, 72]);
});

test("values passthrough still accepts length 16", () => {
  const values = Array.from({ length: 16 }, (_, i) => i * 6);
  const parsed = parseBoardInput({ id: "max-len", values });
  assert.equal(parsed.values.length, 16);
});

test("out-of-range factor fails closed", () => {
  assert.throws(
    () =>
      cityProfileToBoardInput({
        id: "oor",
        factors: {
          populationDensity: 101,
          forestCover: 0,
          dwellingsPer1000: 0,
          entitiesPer1000: 0,
        },
      }),
    BoardContractError
  );
});

test("NaN factor fails closed", () => {
  assert.throws(
    () =>
      cityProfileToBoardInput({
        id: "nan",
        factors: {
          populationDensity: Number.NaN,
          forestCover: 0,
          dwellingsPer1000: 0,
          entitiesPer1000: 0,
        },
      }),
    BoardContractError
  );
});

test("missing values / missing factor never become zero", () => {
  assert.throws(() => cityProfileToBoardInput(load(badDir, "missing-factor.json")), (err) => {
    return err instanceof BoardContractError && err.code === "missing_factor";
  });
  assert.throws(() => cityProfileToBoardInput({ id: "nope" }), (err) => {
    return err instanceof BoardContractError && err.code === "missing_factors";
  });
});

test("null factor fails closed", () => {
  assert.throws(() => cityProfileToBoardInput(load(badDir, "null-factor.json")), BoardContractError);
});

test("explicit zeros on low-edge are valid values not missing", () => {
  const input = cityProfileToBoardInput(load(fixDir, "low-edge.json"));
  assert.deepEqual(input.values, [0, 0, 0, 0]);
});
