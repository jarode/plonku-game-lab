import fs from "node:fs";
import path from "node:path";

export function packAssetsDir(repoRoot) {
  return path.join(repoRoot, "templates", "runner-v1", "assets");
}

export function isTemplateSeed(gameDir, repoRoot) {
  const a = path.normalize(gameDir);
  const b = path.normalize(path.join(repoRoot, "templates", "runner-v1"));
  return a === b;
}

function inside(root, target) {
  const nRoot = path.normalize(root) + path.sep;
  const nTarget = path.normalize(target);
  return nTarget === path.normalize(root) || nTarget.startsWith(nRoot);
}

/** Resolve a skin/resource path: game-local override, else shared pack. */
export function resolveRunnerAsset(repoRoot, gameDir, rel) {
  const posix = String(rel).replace(/\\/g, "/");
  const local = path.normalize(path.join(gameDir, posix));
  if (inside(gameDir, local) && fs.existsSync(local)) {
    return { abs: local, projectRel: posix };
  }
  const fromGame = path.normalize(path.join(gameDir, posix));
  if (inside(repoRoot, fromGame) && fs.existsSync(fromGame)) {
    return {
      abs: fromGame,
      projectRel: path.relative(gameDir, fromGame).replace(/\\/g, "/"),
    };
  }
  if (posix.startsWith("assets/")) {
    const packAbs = path.normalize(path.join(packAssetsDir(repoRoot), posix.slice("assets/".length)));
    if (inside(repoRoot, packAbs) && fs.existsSync(packAbs)) {
      if (isTemplateSeed(gameDir, repoRoot)) {
        return { abs: packAbs, projectRel: posix };
      }
      return {
        abs: packAbs,
        projectRel: path.relative(gameDir, packAbs).replace(/\\/g, "/"),
      };
    }
  }
  return null;
}

export function rewriteSnapshotToPack(repoRoot, gameDir, snapshot) {
  const out = {};
  for (const [k, v] of Object.entries(snapshot)) {
    out[k] = projectRelForPack(repoRoot, gameDir, v) || v;
  }
  return out;
}

export function packFileAbs(repoRoot, posixRel) {
  const posix = String(posixRel).replace(/\\/g, "/");
  const underAssets = posix.includes("/assets/")
    ? "assets/" + posix.split("/assets/").pop()
    : posix.startsWith("assets/")
      ? posix
      : null;
  if (!underAssets) return null;
  const abs = path.normalize(
    path.join(packAssetsDir(repoRoot), underAssets.slice("assets/".length))
  );
  if (!inside(repoRoot, abs) || !fs.existsSync(abs)) return null;
  return abs;
}

export function projectRelForPack(repoRoot, gameDir, posixRel) {
  const abs = packFileAbs(repoRoot, posixRel);
  if (!abs) return null;
  if (isTemplateSeed(gameDir, repoRoot)) {
    const posix = String(posixRel).replace(/\\/g, "/");
    if (posix.startsWith("assets/")) return posix;
    return "assets/" + posix.split("/assets/").pop();
  }
  return path.relative(gameDir, abs).replace(/\\/g, "/");
}

export function rewriteProjectResourcesToPack(repoRoot, gameDir, project) {
  let changed = 0;
  for (const resource of project.resources?.resources || []) {
    if (!resource.file) continue;
    const next = projectRelForPack(repoRoot, gameDir, resource.file);
    if (next && resource.file !== next) {
      resource.file = next;
      changed += 1;
    }
  }
  return changed;
}
