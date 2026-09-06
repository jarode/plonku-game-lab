// Breakout Lab hooks (injected into Game JsCode). Restart is scene replace, not a second Game instance.
(function (runtimeScene) {
  var BO_BOARDS = __BO_BOARDS__;
  var BO_CITY_BOARDS = __BO_CITY_BOARDS__;

  function hideAll(name) {
    try {
      const list = runtimeScene.getObjects(name);
      for (let i = 0; i < list.length; i++) list[i].hide(true);
    } catch (eH) {}
  }
  if (!runtimeScene._boSessionInit) {
    runtimeScene._boSessionInit = true;
    try {
      runtimeScene.getScene().getVariables().get("Lifes").setNumber(3);
      runtimeScene.getScene().getVariables().get("Score").setNumber(0);
    } catch (eInit) {}
  }
  hideAll("Home_Button");

  try {
    const canvas = runtimeScene.getGame().getRenderer().getCanvas();
    if (canvas && canvas.style) canvas.style.touchAction = "none";
  } catch (eTouch) {}

  if (!runtimeScene._boBoardApplied) {
    runtimeScene._boBoardApplied = true;
    applyLabBoard(runtimeScene, BO_BOARDS, BO_CITY_BOARDS);
  }

  hideAll("StartCard_title");
  hideAll("StartCard_Sub_title");
  hideAll("ScoreLabel");
  hideAll("GUIBackGround");
  try {
    if (gdjs.evtTools.camera && typeof gdjs.evtTools.camera.hideLayer === "function") {
      gdjs.evtTools.camera.hideLayer(runtimeScene, "PreStartCard");
    }
  } catch (eLayer) {}

  let st = "";
  let score = 0;
  let lives = 0;
  try {
    st = runtimeScene.getScene().getVariables().get("GameState").getAsString();
  } catch (eSt) {}
  try {
    score = runtimeScene.getScene().getVariables().get("Score").getAsNumber();
  } catch (eSc) {}
  try {
    lives = runtimeScene.getScene().getVariables().get("Lifes").getAsNumber();
  } catch (eLf) {}
  updatePlonkuShell(st, score, lives);
  pulseHitJuice(runtimeScene, st);

  if (st === "NotStarted" || st === "GamePlay") {
    const pads = runtimeScene.getObjects("Paddle");
    if (pads.length) {
      const p = pads[0];
      const im = runtimeScene.getGame().getInputManager();
      const cx = im.getCursorX();
      const w = p.getWidth();
      const maxX = runtimeScene.getGame().getGameResolutionWidth() - w;
      let x = cx - w / 2;
      if (x < 0) x = 0;
      if (x > maxX) x = maxX;
      p.setX(x);
    }
  }

  if (typeof window !== "undefined") {
    window.__boSoftReset = function () {
      const game = window.__boGame;
      if (game && game.getSceneStack) game.getSceneStack().replace("Game", true);
      else gdjs.evtTools.runtimeScene.replaceScene(runtimeScene, "Game", false);
    };
  }

  if (gdjs.evtTools.input.wasKeyJustPressed(runtimeScene, "R")) {
    gdjs.evtTools.runtimeScene.replaceScene(runtimeScene, "Game", true);
  }

  function profileLabel(id) {
    const map = {
      "balanced-mid": "BALANS",
      "dense-spike": "GESTE MIASTO",
      "green-open": "ZIELONY OTWARTY",
      "mixed-spike": "SPIKE",
      "low-edge": "MINIMUM",
      "high-edge": "MAXIMUM",
    };
    return map[id] || "BALANS";
  }

  function pulseHitJuice(scene, gameState) {
    let bricks = 0;
    const names = ["Block_1", "Block_2", "Block_3"];
    for (let n = 0; n < names.length; n++) bricks += scene.getObjects(names[n]).length;
    if (scene._boBrickN == null) scene._boBrickN = bricks;
    if (typeof document === "undefined") {
      scene._boBrickN = bricks;
      return;
    }
    const stage = document.getElementById("cb-stage");
    if (gameState === "GamePlay" && bricks < scene._boBrickN) {
      if (stage) {
        stage.style.boxShadow = "inset 0 0 28px #C8FF00, inset 0 0 8px #FF2D95";
        setTimeout(function () {
          if (stage) stage.style.boxShadow = "";
        }, 90);
      }
      const hud = document.getElementById("bo-hud-chip");
      if (hud) {
        hud.style.background = "#C8FF00";
        hud.style.color = "#1A1410";
        setTimeout(function () {
          hud.style.background = "transparent";
          hud.style.color = "#00E5FF";
        }, 90);
      }
    }
    scene._boBrickN = bricks;
    if (gameState === "GamePlay") {
      const balls = scene.getObjects("Ball");
      const pads = scene.getObjects("Paddle");
      if (balls.length && pads.length) {
        const b = balls[0];
        const p = pads[0];
        const hit =
          b.getX() < p.getX() + p.getWidth() &&
          b.getX() + b.getWidth() > p.getX() &&
          b.getY() + b.getHeight() > p.getY() - 4 &&
          b.getY() < p.getY() + p.getHeight();
        if (hit && !scene._boPadFlash) {
          scene._boPadFlash = true;
          if (stage) stage.style.outline = "1px solid #00E5FF";
          setTimeout(function () {
            scene._boPadFlash = false;
            if (stage) stage.style.outline = "";
          }, 60);
        }
      }
    }
  }

  function startCityGenSequence(label) {
    if (typeof window === "undefined" || window.__boGenOnce) return;
    window.__boGenOnce = true;
    const gen = document.getElementById("cb-gen");
    if (!gen) return;
    const steps = ["ANALIZUJĘ DANE...", "BUDUJĘ LEVEL...", String(label || "BALANS") + ".DATA GOTOWE"];
    let i = 0;
    gen.style.display = "flex";
    function tick() {
      if (i < steps.length) {
        gen.innerHTML =
          "<div style=\"font-size:16px;\">" +
          steps[i] +
          "</div><div style=\"color:#00E5FF;font-size:11px;\">GĘSTOŚĆ · ZIELEŃ · ZABUDOWA · PODMIOTY</div>";
        i += 1;
        setTimeout(tick, 240);
      } else gen.style.display = "none";
    }
    tick();
  }

  function updatePlonkuShell(gameState, scoreVal, livesVal) {
    if (typeof document === "undefined") return;
    const pid = (typeof window !== "undefined" && window.__boBoardId) || "balanced-mid";
    const canvas = runtimeScene.getGame().getRenderer().getCanvas();
    if (!canvas || !canvas.parentElement) return;
    let root = document.getElementById("cb-window");
    if (!root) {
      try {
        document.documentElement.style.height = "100%";
        document.body.style.cssText = "margin:0;height:100%;background:#070B14;";
        const host = canvas.parentElement;
        host.style.cssText =
          "margin:0;height:100%;background:#070B14;display:flex;align-items:center;justify-content:center;padding:8px;box-sizing:border-box;";
        root = document.createElement("div");
        root.id = "cb-window";
        root.style.cssText =
          "position:relative;width:min(1200px,100%);height:min(100%,100dvh);display:flex;flex-direction:column;background:#0A1020;border:2px solid #C8FF00;box-shadow:0 0 0 1px #070B14, 8px 8px 0 #FF2D95;font-family:Verdana,Arial,sans-serif;color:#C8FF00;";
        root.innerHTML =
          '<div style="pointer-events:none;position:absolute;left:-2px;top:-2px;width:10px;height:10px;border-top:2px solid #00E5FF;border-left:2px solid #00E5FF;"></div>' +
          '<div style="pointer-events:none;position:absolute;right:-2px;top:-2px;width:10px;height:10px;border-top:2px solid #00E5FF;border-right:2px solid #00E5FF;"></div>' +
          '<div style="pointer-events:none;position:absolute;left:-2px;bottom:-2px;width:10px;height:10px;border-bottom:2px solid #00E5FF;border-left:2px solid #00E5FF;"></div>' +
          '<div style="pointer-events:none;position:absolute;right:-2px;bottom:-2px;width:10px;height:10px;border-bottom:2px solid #00E5FF;border-right:2px solid #00E5FF;"></div>' +
          '<div id="cb-titlebar" style="flex:0 0 28px;background:#D8D0C0;color:#1A1410;display:flex;align-items:center;justify-content:space-between;padding:0 10px;font-size:11px;letter-spacing:0.14em;border-bottom:2px solid #C8FF00;">' +
          "<span>CITYBRK.EXE — PUBLIC DATA / 2012 INTERNET ENERGY</span><span style=\"border:1px solid #1A1410;padding:0 6px;\">·</span></div>" +
          '<div style="flex:0 0 40px;display:flex;flex-wrap:wrap;align-items:center;gap:8px;padding:6px 10px;border-bottom:1px solid rgba(0,229,255,0.35);background:repeating-linear-gradient(90deg,transparent,transparent 11px,rgba(0,229,255,0.06) 12px);">' +
          '<div style="letter-spacing:0.16em;font-size:13px;color:#C8FF00;">CITY BREAKER 2012</div>' +
          '<div id="bo-profile-chip" style="border:1px solid #FF2D95;color:#FF2D95;padding:4px 8px;font-size:11px;letter-spacing:0.1em;">PROFIL: BALANS</div>' +
          '<div id="bo-hud-chip" style="border:1px solid #00E5FF;color:#00E5FF;padding:4px 8px;font-size:11px;letter-spacing:0.08em;margin-left:auto;">WYNIK 0 · ŻYCIA 3</div></div>' +
          '<div id="bo-hook" style="flex:0 0 auto;padding:6px 10px;font-size:12px;letter-spacing:0.06em;color:#C8FF00;border-bottom:1px solid rgba(200,255,0,0.2);">TWOJE MIASTO WŁAŚNIE WYGENEROWAŁO CI LEVEL.</div>' +
          '<div id="bo-mantra" style="flex:0 0 auto;padding:4px 10px;font-size:10px;letter-spacing:0.12em;color:#00E5FF;">BLOKI = FAKTY. PIŁKA = ZMIANA.</div>' +
          '<div id="cb-stage" style="position:relative;flex:1;min-height:120px;background:#0A1020;overflow:hidden;"></div>' +
          '<div id="bo-legend" style="flex:0 0 auto;padding:4px 10px;font-size:10px;letter-spacing:0.06em;color:#3DFF9A;">GĘSTOŚĆ · ZIELEŃ · ZABUDOWA · PODMIOTY</div>' +
          '<div id="bo-profiles" style="pointer-events:auto;flex:0 0 auto;display:flex;flex-wrap:wrap;gap:6px;padding:8px 10px;"></div>' +
          '<div id="bo-state-hint" style="flex:0 0 auto;padding:0 10px 8px;font-size:11px;letter-spacing:0.1em;color:#C8FF00;"></div>' +
          '<div id="bo-result" style="pointer-events:auto;display:none;margin:0 10px 10px;border:1px solid #FF2D95;background:rgba(7,11,20,0.95);padding:8px;font-size:11px;color:#00E5FF;text-align:center;"></div>' +
          '<div id="cb-gen" style="display:none;pointer-events:none;position:absolute;inset:28px 0 0 0;z-index:20;background:rgba(7,11,20,0.88);color:#C8FF00;font-family:Verdana,Arial,sans-serif;letter-spacing:0.14em;align-items:center;justify-content:center;flex-direction:column;gap:10px;text-align:center;padding:24px;"></div>';
        host.insertBefore(root, canvas);
        const stage = document.getElementById("cb-stage");
        const world = document.createElement("div");
        world.id = "cb-world";
        world.style.cssText = "pointer-events:none;position:absolute;inset:0;z-index:3;";
        world.innerHTML =
          '<div id="cb-grid" style="position:absolute;inset:0;background-image:linear-gradient(rgba(0,229,255,0.10) 1px,transparent 1px),linear-gradient(90deg,rgba(0,229,255,0.10) 1px,transparent 1px);background-size:28px 28px;"></div>' +
          '<div id="cb-radar" style="position:absolute;right:10px;top:10px;width:72px;height:72px;border:1px solid rgba(0,229,255,0.5);border-radius:50%;box-shadow:0 0 0 10px rgba(0,229,255,0.08),inset 0 0 18px rgba(200,255,0,0.12);"></div>' +
          '<div id="cb-radar-dot" style="position:absolute;right:42px;top:28px;width:6px;height:6px;background:#C8FF00;border-radius:50%;"></div>' +
          '<div id="cb-callouts" style="position:absolute;left:8px;top:8px;font-size:9px;letter-spacing:0.1em;line-height:1.5;">' +
          '<div style="color:#C8FF00;">→ GĘSTOŚĆ</div><div style="color:#3DFF9A;">→ ZIELEŃ</div>' +
          '<div style="color:#00E5FF;">→ ZABUDOWA</div><div style="color:#FF2D95;">→ PODMIOTY</div></div>' +
          '<div id="cb-arena-tag" style="position:absolute;left:8px;bottom:8px;font-size:9px;letter-spacing:0.12em;color:rgba(0,229,255,0.85);">ARENA · PROFIL PUBLICZNY · NIE STATYSTYKA 2012</div>' +
          '<div id="cb-scan" style="position:absolute;inset:0;background:repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(7,11,20,0.14) 3px);"></div>';
        canvas.style.cssText =
          "position:relative;z-index:2;width:100%;height:100%;object-fit:contain;touch-action:none;display:block;";
        stage.appendChild(canvas);
        stage.appendChild(world);
        canvas.style.cssText = "position:relative;z-index:2;width:100%;height:100%;object-fit:contain;touch-action:none;display:block;";
        const bar = document.getElementById("bo-profiles");
        const specs = [
          ["balanced-mid", "BALANS"],
          ["dense-spike", "GESTE"],
          ["green-open", "ZIELONY"],
          ["mixed-spike", "SPIKE"],
          ["low-edge", "MIN"],
          ["high-edge", "MAX"],
        ];
        for (let i = 0; i < specs.length; i++) {
          const a = document.createElement("a");
          a.href = "?profile=" + specs[i][0];
          a.textContent = specs[i][1];
          a.style.cssText =
            "pointer-events:auto;border:1px solid #C8FF00;background:#C8FF00;color:#1A1410;padding:8px 10px;font-size:11px;letter-spacing:0.08em;text-decoration:none;min-height:44px;display:inline-flex;align-items:center;box-sizing:border-box;";
          bar.appendChild(a);
        }
        const shareBtn = document.createElement("button");
        shareBtn.id = "bo-share";
        shareBtn.type = "button";
        shareBtn.textContent = "UDOSTĘPNIJ";
        shareBtn.style.cssText =
          "pointer-events:auto;display:none;border:1px solid #FF2D95;background:#070B14;color:#FF2D95;padding:8px 10px;font-size:11px;min-height:44px;";
        shareBtn.onclick = function (ev) {
          ev.preventDefault();
          ev.stopPropagation();
          const text =
            window.__boShareText ||
            "CITY BREAKER 2012 · level z danych publicznych · to interpretacja gry, nie werdykt o miescie.";
          function fallback() {
            if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text);
            shareBtn.textContent = "SKOPIOWANO";
          }
          if (navigator.share) navigator.share({ text: text }).catch(fallback);
          else fallback();
        };
        bar.appendChild(shareBtn);
        startCityGenSequence(profileLabel(pid));
      } catch (eShell) {
        return;
      }
    }
    if (typeof window !== "undefined") {
      window.__boForceResult = function (kind) {
        try {
          runtimeScene.getScene().getVariables().get("GameState").setString(kind);
        } catch (eF) {}
      };
      window.__boShareText =
        "Rozbilam/em level CITY BREAKER 2012 · profil " +
        profileLabel(pid) +
        " · wynik " +
        Math.floor(scoreVal) +
        " · to interpretacja gry, nie dane z 2012.";
    }
    if (runtimeScene._boPrevLives == null) runtimeScene._boPrevLives = lives;
    if (lives < runtimeScene._boPrevLives) {
      runtimeScene._boLifeDropUntil = Date.now() + 900;
      const win = document.getElementById("cb-window");
      if (win) {
        win.style.boxShadow = "0 0 0 1px #070B14, 8px 8px 0 #FF2D95, 0 0 24px #FF2D95";
        setTimeout(function () {
          win.style.boxShadow = "0 0 0 1px #070B14, 8px 8px 0 #FF2D95";
        }, 280);
      }
    }
    runtimeScene._boPrevLives = lives;
    const genEl = document.getElementById("cb-gen");
    if (genEl && (gameState === "Lost" || gameState === "Won" || gameState === "GamePlay")) {
      genEl.style.display = "none";
    }
    const hud = document.getElementById("bo-hud-chip");
    if (hud) hud.textContent = "WYNIK " + Math.floor(scoreVal) + " · ŻYCIA " + Math.floor(livesVal);
    const shareEl = document.getElementById("bo-share");
    if (shareEl) shareEl.style.display = gameState === "Lost" || gameState === "Won" ? "inline-flex" : "none";
    const chip = document.getElementById("bo-profile-chip");
    if (chip) chip.textContent = "PROFIL: " + profileLabel(pid);
    const arena = document.getElementById("cb-arena-tag");
    if (arena) arena.textContent = "ARENA · " + profileLabel(pid) + " · NIE STATYSTYKA 2012";
    const narrow = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(max-width: 380px)").matches;
    const call = document.getElementById("cb-callouts");
    const radar = document.getElementById("cb-radar");
    const rdot = document.getElementById("cb-radar-dot");
    if (call) call.style.display = narrow ? "none" : "block";
    if (radar) radar.style.opacity = narrow ? "0.35" : "1";
    if (rdot) rdot.style.display = narrow ? "none" : "block";
    const mantra = document.getElementById("bo-mantra");
    if (mantra && window.matchMedia) {
      mantra.style.display = window.matchMedia("(max-width: 430px)").matches && gameState !== "NotStarted" ? "none" : "block";
    }
    const legend = document.getElementById("bo-legend");
    if (legend) legend.style.display = gameState === "NotStarted" ? "block" : "none";
    const hook = document.getElementById("bo-hook");
    if (hook) hook.style.display = gameState === "NotStarted" ? "block" : "none";
    const pick = document.getElementById("bo-profiles");
    if (pick) pick.style.display = gameState === "NotStarted" || gameState === "Lost" || gameState === "Won" ? "flex" : "none";
    const hint = document.getElementById("bo-state-hint");
    if (hint) {
      if (runtimeScene._boLifeDropUntil && Date.now() < runtimeScene._boLifeDropUntil && gameState === "NotStarted") {
        hint.textContent = "ŻYCIE UTRACONE · SYGNAŁ CIENIEJE · RUSZ PALETKĄ";
      } else if (gameState === "NotStarted") hint.textContent = "ODPAL LEVEL · RUSZ PALETKA · DOTKNIJ / SPACJA";
      else if (gameState === "Lost") hint.textContent = "SYGNAŁ UTRACONY · JESZCZE RAZ (R)";
      else if (gameState === "Won") hint.textContent = "LEVEL ROZBITY";
      else hint.textContent = "";
    }
    const res = document.getElementById("bo-result");
    if (res) {
      if (gameState === "Lost" || gameState === "Won") {
        res.style.display = "block";
        res.innerHTML =
          "PROFIL " +
          profileLabel(pid) +
          " · WYNIK " +
          Math.floor(scoreVal) +
          "<br>GĘSTOŚĆ · ZIELEŃ · ZABUDOWA · PODMIOTY" +
          "<br>PIŁKA ZROBIŁA Z FAKTÓW KURZ. TO INTERPRETACJA GRY, NIE WERDYKT O MIEŚCIE." +
          "<br>Rok 2012 = estetyka, nie data statystyk.";
      } else res.style.display = "none";
    }
  }

  function applyLabBoard(scene, boards, cityBoards) {
    let id = "balanced-mid";
    let err = "";
    let board = null;
    try {
      const search = typeof window !== "undefined" && window.location ? window.location.search || "" : "";
      const params = new URLSearchParams(search);
      const profile = params.get("profile");
      const q = params.get("fixture");
      if (profile) {
        if (cityBoards && cityBoards[profile]) {
          board = cityBoards[profile];
          id = profile;
        } else {
          err = "unknown_profile";
          board = (cityBoards && cityBoards["balanced-mid"]) || null;
          id = "balanced-mid";
        }
      } else if (q) {
        if (boards && boards[q]) id = q;
        else err = "unknown_fixture";
      } else if (cityBoards && cityBoards["balanced-mid"]) {
        board = cityBoards["balanced-mid"];
        id = "balanced-mid";
      }
    } catch (eQ) {
      err = "query_parse";
    }
    if (!board) board = (boards && (boards[id] || boards["balanced-mid"])) || null;
    if (typeof window !== "undefined") {
      window.__boBoardError = err;
      window.__boBoard = board;
      window.__boBoardSignature = board ? board.signature : "";
      window.__boBoardId = board ? board.id : "";
      window.__boFactorDebug = board && board.debug ? board.debug : null;
    }
    if (!board) return;

    const names = ["Block_1", "Block_2", "Block_3"];
    for (let n = 0; n < names.length; n++) {
      const list = scene.getObjects(names[n]).slice();
      for (let i = 0; i < list.length; i++) {
        if (typeof list[i].deleteFromScene === "function") list[i].deleteFromScene(scene);
      }
    }

    const objNames = ["", "Block_1", "Block_2", "Block_3"];
    const cellW = 160;
    const cellH = 40;
    const gw = board.columns * cellW;
    const ox = (scene.getGame().getGameResolutionWidth() - gw) / 2;
    const oy = 168;
    for (let r = 0; r < board.rows; r++) {
      for (let c = 0; c < board.columns; c++) {
        const cell = board.cells[r][c];
        if (!cell) continue;
        const fam = cell.family || "gestosc";
        const famIdx = { gestosc: 0, zielen: 1, zabudowa: 2, podmioty: 3 }[fam] || 0;
        const obj = scene.createObject(objNames[cell.hp]);
        if (!obj) continue;
        obj.setPosition(ox + c * cellW, oy + r * cellH);
        try {
          if (typeof obj.setSize === "function") obj.setSize(cellW - 8, cellH - 6);
          else {
            if (typeof obj.setWidth === "function") obj.setWidth(cellW - 8);
            if (typeof obj.setHeight === "function") obj.setHeight(cellH - 6);
          }
        } catch (eSz) {}
        try {
          obj.getVariables().get("Health").setNumber(cell.hp);
        } catch (eH) {}
        try {
          if (typeof obj.setAnimation === "function") obj.setAnimation(famIdx);
          else {
            const anim = typeof obj.getBehavior === "function" ? obj.getBehavior("Animation") : null;
            if (anim && typeof anim.setAnimationIndex === "function") anim.setAnimationIndex(famIdx);
          }
        } catch (eA) {}
      }
    }

    const pads = scene.getObjects("Paddle");
    if (pads.length && !scene._boPaddleScaled) {
      scene._boPaddleScaled = true;
      const p = pads[0];
      p.setWidth(p.getWidth() * (board.paddleWidthScale || 1));
    }
  }
})(runtimeScene);
