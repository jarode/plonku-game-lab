/**
 * Resolve a lab game folder and its canonical GDevelop JSON.
 * Default: games/zombie-runner (golden client).
 */
import fs from "node:fs";
import path from "node:path";

export function parseLabArgs(argv) {
  const flags = new Set();
  let gameRel = "games/zombie-runner";
  const rest = [];
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--game") {
      gameRel = argv[++i];
      if (!gameRel) throw new Error("--game requires a path");
      continue;
    }
    if (a.startsWith("--")) flags.add(a);
    else rest.push(a);
  }
  return { flags, gameRel, rest };
}

export function resolveGameDir(repoRoot, gameRel) {
  const dir = path.resolve(repoRoot, gameRel);
  if (!fs.existsSync(dir) || !fs.statSync(dir).isDirectory()) {
    throw new Error(`Game directory not found: ${dir}`);
  }
  return dir;
}

export function findProjectJson(gameDir) {
  const names = fs.readdirSync(gameDir).filter((n) => n.endsWith(".json"));
  const preferred = path.basename(gameDir) + ".json";
  const ordered = names.includes(preferred)
    ? [preferred, ...names.filter((n) => n !== preferred)]
    : names;
  for (const name of ordered) {
    if (name === "chunks.json") continue;
    const full = path.join(gameDir, name);
    try {
      const data = JSON.parse(fs.readFileSync(full, "utf8"));
      if (data && data.gdVersion && data.layouts) return full;
    } catch {
      continue;
    }
  }
  throw new Error(`No GDevelop project JSON in ${gameDir}`);
}
