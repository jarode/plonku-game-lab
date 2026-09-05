// Zombie Runner chunk sequencer (task 005) + dev controls (task 006).
const CHUNK_CATALOG = __CHUNK_CATALOG__;

function zrIsDev() {
  try {
    return (
      typeof window !== "undefined" &&
      /(?:\?|&|#)dev=1\b/.test(String(window.location && window.location.href))
    );
  } catch (e) {
    return false;
  }
}

function zrJustPressed(runtimeScene, key) {
  return gdjs.evtTools.input.wasKeyJustPressed(runtimeScene, key);
}

function zrSoftReset(runtimeScene) {
  const names = [
    "CactusObstacle",
    "IslandObstacle",
    "WreckObstacle",
    "BonusObject",
    "BonusParticle",
  ];
  for (const name of names) {
    const list = runtimeScene.getObjects(name).slice();
    for (const obj of list) {
      if (typeof obj.deleteFromScene === "function") obj.deleteFromScene(runtimeScene);
    }
  }
  runtimeScene.getGame().getVariables().get("Score").setNumber(0);
  const sv = runtimeScene.getScene().getVariables();
  sv.get("GameStatus").setString("Preparing");
  runtimeScene._zrChunk = null;
  const dinos = runtimeScene.getObjects("Dino");
  if (dinos.length) {
    const dino = dinos[0];
    const ix = dino.getVariables().get("InitialX").getAsNumber();
    dino.setX(ix || 48);
    dino.setY(724);
    try {
      dino.getBehavior("Animation").setAnimationName("Idle");
    } catch (e) {}
    try {
      dino.activateBehavior("PlatformerObject", true);
    } catch (e2) {}
  }
  const texts = runtimeScene.getObjects("ScoreText");
  if (texts.length && typeof texts[0].setString === "function") {
    texts[0].setString(
      "Zombie Runner - Wroclaw" + "\n" + "Tap or Space to run"
    );
  }
}

(function runChunkAndDev(runtimeScene) {
  const sceneVars = runtimeScene.getScene().getVariables();
  const gameVars = runtimeScene.getGame().getVariables();
  const input = runtimeScene.getGame().getInputManager();

  if (zrIsDev()) {
    sceneVars.get("DevMode").setNumber(1);
    const dinoList = runtimeScene.getObjects("Dino");
    const dino = dinoList.length ? dinoList[0] : null;
    const plat = dino && dino.getBehavior("PlatformerObject");
    if (zrJustPressed(runtimeScene, "I")) {
      const next = sceneVars.get("Invincible").getAsNumber() ? 0 : 1;
      sceneVars.get("Invincible").setNumber(next);
    }
    if (zrJustPressed(runtimeScene, "1")) runtimeScene.getTimeManager().setTimeScale(0.5);
    if (zrJustPressed(runtimeScene, "2")) runtimeScene.getTimeManager().setTimeScale(1);
    if (zrJustPressed(runtimeScene, "3")) runtimeScene.getTimeManager().setTimeScale(2);
    if (plat && (zrJustPressed(runtimeScene, "NumpadAdd") || zrJustPressed(runtimeScene, "Equal"))) {
      plat.setJumpSpeed(plat.getJumpSpeed() + 100);
    }
    if (plat && (zrJustPressed(runtimeScene, "NumpadSubtract") || zrJustPressed(runtimeScene, "Minus"))) {
      plat.setJumpSpeed(Math.max(200, plat.getJumpSpeed() - 100));
    }
    if (zrJustPressed(runtimeScene, "PageUp")) {
      sceneVars.get("ObstacleSpeed").setNumber(sceneVars.get("ObstacleSpeed").getAsNumber() + 50);
    }
    if (zrJustPressed(runtimeScene, "PageDown")) {
      sceneVars.get("ObstacleSpeed").setNumber(Math.max(80, sceneVars.get("ObstacleSpeed").getAsNumber() - 50));
    }
    if (zrJustPressed(runtimeScene, "E")) {
      sceneVars.get("DevStartGroup").setString("EASY");
      zrReplaceGame(runtimeScene);
      return;
    }
    if (zrJustPressed(runtimeScene, "M")) {
      sceneVars.get("DevStartGroup").setString("MEDIUM");
      zrReplaceGame(runtimeScene);
      return;
    }
    if (zrJustPressed(runtimeScene, "H")) {
      sceneVars.get("DevStartGroup").setString("HARD");
      zrReplaceGame(runtimeScene);
      return;
    }
    if (zrJustPressed(runtimeScene, "R")) {
      zrSoftReset(runtimeScene);
      return;
    }
    if (zrJustPressed(runtimeScene, "N")) {
      const ids = CHUNK_CATALOG.chunks.map((c) => c.id);
      let idx = ids.indexOf(sceneVars.get("DevForceChunk").getAsString());
      idx = (idx + 1) % ids.length;
      sceneVars.get("DevForceChunk").setString(ids[idx]);
      sceneVars.get("DevStartGroup").setString(CHUNK_CATALOG.chunks[idx].group);
      zrReplaceGame(runtimeScene);
      return;
    }
    const hud = runtimeScene.getObjects("DevHud");
    if (hud.length) {
      hud[0].hide(false);
      const ts = runtimeScene.getTimeManager().getTimeScale();
      const jump = plat ? plat.getJumpSpeed() : 0;
      const line =
        "DEV I=inv " +
        sceneVars.get("Invincible").getAsNumber() +
        " 1/2/3=time " +
        ts +
        " PgUp/Dn=scroll " +
        sceneVars.get("ObstacleSpeed").getAsNumber() +
        " +/- jump " +
        jump +
        " E/M/H R N " +
        sceneVars.get("DevForceChunk").getAsString();
      if (typeof hud[0].setString === "function") hud[0].setString(line);
      else hud[0].getBehavior("Text").setText(line);
    }
  } else {
    sceneVars.get("DevMode").setNumber(0);
    sceneVars.get("Invincible").setNumber(0);
    runtimeScene.getTimeManager().setTimeScale(1);
    const hud = runtimeScene.getObjects("DevHud");
    if (hud.length) hud[0].hide(true);
  }

  const status = sceneVars.get("GameStatus").getAsString();
  if (status === "Dead") {
    const retry =
      zrJustPressed(runtimeScene, "Space") ||
      zrJustPressed(runtimeScene, "R") ||
      gdjs.evtTools.input.isMouseButtonReleased(runtimeScene, "Left");
    if (retry) {
      zrSoftReset(runtimeScene);
      return;
    }
  }
  if (status !== "Playing") {
    if (status === "Preparing" || status === "Dead") {
      runtimeScene._zrChunk = null;
    }
    return;
  }

  const speed = Math.max(80, sceneVars.get("ObstacleSpeed").getAsNumber() || 550);
  const platforms = runtimeScene.getObjects("Platform");
  const groundTop = platforms.length > 0 ? platforms[0].getAABBTop() : 832;
  const groups = { EASY: [], MEDIUM: [], HARD: [] };
  for (const chunk of CHUNK_CATALOG.chunks) {
    if (groups[chunk.group]) groups[chunk.group].push(chunk);
  }
  const order = ["EASY", "MEDIUM", "HARD"];

  if (!runtimeScene._zrChunk) {
    const forceId = sceneVars.get("DevForceChunk").getAsString();
    const startRaw = sceneVars.get("DevStartGroup").getAsString();
    const startGroup = startRaw || "EASY";
    let groupIndex = Math.max(0, order.indexOf(startGroup));
    runtimeScene._zrChunk = {
      groupIndex: groupIndex,
      inGroup: 0,
      timer: 0,
      nextDue: 0,
      booted: false,
      forceId: forceId,
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
    if (st.forceId) {
      const forced = CHUNK_CATALOG.chunks.find((c) => c.id === st.forceId);
      st.forceId = "";
      if (forced) return forced;
    }
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
