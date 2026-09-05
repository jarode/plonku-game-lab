// Zombie Runner chunk sequencer (task 005). Catalog is injected by tools/sync-chunk-catalog.mjs
const CHUNK_CATALOG = __CHUNK_CATALOG__;

(function runChunkSystem(runtimeScene) {
  if (runtimeScene.getTimeManager().isFirstFrame()) {
    runtimeScene._zrChunk = null;
  }
  const status = runtimeScene
    .getScene()
    .getVariables()
    .get("GameStatus")
    .getAsString();
  if (status !== "Playing") {
    if (status === "Preparing" || status === "Dead") {
      runtimeScene._zrChunk = null;
    }
    return;
  }

  const sceneVars = runtimeScene.getScene().getVariables();
  const speed = Math.max(
    80,
    sceneVars.get("ObstacleSpeed").getAsNumber() || 550
  );
  const platforms = runtimeScene.getObjects("Platform");
  const groundTop =
    platforms.length > 0 ? platforms[0].getAABBTop() : 832;

  const groups = { EASY: [], MEDIUM: [], HARD: [] };
  for (const chunk of CHUNK_CATALOG.chunks) {
    if (groups[chunk.group]) groups[chunk.group].push(chunk);
  }
  const order = ["EASY", "MEDIUM", "HARD"];

  if (!runtimeScene._zrChunk) {
    const startRaw = sceneVars.get("DevStartGroup").getAsString();
    const startGroup = startRaw || "EASY";
    const groupIndex = Math.max(0, order.indexOf(startGroup));
    runtimeScene._zrChunk = {
      groupIndex: groupIndex,
      inGroup: 0,
      timer: 0,
      nextDue: 0,
      booted: false,
    };
  }
  const st = runtimeScene._zrChunk;

  const spawnChunk = (chunk) => {
    const origin = runtimeScene.getGame().getGameResolutionWidth() + 40;
    for (const hazard of chunk.hazards) {
      const obj = runtimeScene.createObject(hazard.object);
      if (!obj) continue;
      obj.setX(origin + hazard.x);
      const yOff = hazard.object === "IslandObstacle" ? 64 : 0;
      obj.setY(groundTop - yOff);
      obj.addPolarForce(180, speed, 1);
    }
  };

  const pickNext = () => {
    const name = order[st.groupIndex % order.length];
    const pool = groups[name];
    if (!pool || pool.length === 0) return null;
    const chunk = pool[st.inGroup % pool.length];
    st.inGroup += 1;
    if (st.inGroup >= pool.length) {
      st.inGroup = 0;
      st.groupIndex += 1;
    }
    return chunk;
  };

  if (!st.booted) {
    const first = pickNext();
    if (first) {
      spawnChunk(first);
      st.nextDue = first.width / speed;
    }
    st.timer = 0;
    st.booted = true;
    return;
  }

  st.timer += runtimeScene.getTimeManager().getElapsedTime() / 1000;
  if (st.timer >= st.nextDue) {
    st.timer = 0;
    const next = pickNext();
    if (next) {
      spawnChunk(next);
      st.nextDue = next.width / speed;
    }
  }
})(runtimeScene);
