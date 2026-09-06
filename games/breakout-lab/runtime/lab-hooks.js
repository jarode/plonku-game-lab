// Breakout Lab hooks (injected into Game JsCode). Restart is scene replace, not a second Game instance.
(function (runtimeScene) {
  var BO_BOARDS = __BO_BOARDS__;
  var BO_CITY_BOARDS = __BO_CITY_BOARDS__;

  function hideAll(name) {
    const list = runtimeScene.getObjects(name);
    for (let i = 0; i < list.length; i++) list[i].hide(true);
  }
  hideAll("GDevelop_WaterMark");
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

  function updatePlonkuShell(gameState, scoreVal, livesVal) {
    if (typeof document === "undefined") return;
    const pid = (typeof window !== "undefined" && window.__boBoardId) || "balanced-mid";
    let root = document.getElementById("bo-plonku-shell");
    if (!root) {
      try {
        const canvas = runtimeScene.getGame().getRenderer().getCanvas();
        if (!canvas || !canvas.parentElement) return;
        const parent = canvas.parentElement;
        if (getComputedStyle(parent).position === "static") parent.style.position = "relative";
        try {
          document.body.style.background = "#0a1020";
        } catch (eBg) {}
        root = document.createElement("div");
        root.id = "bo-plonku-shell";
        root.style.cssText =
          "position:absolute;inset:0;z-index:6;font-family:Verdana,Arial,sans-serif;color:#c8ff00;pointer-events:none;";
        root.innerHTML =
          '<div style="pointer-events:none;position:absolute;inset:0;background:repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(200,255,0,0.04) 3px);opacity:0.9;"></div>' +
          '<div style="pointer-events:none;position:absolute;top:8px;left:8px;right:8px;border:2px solid #1a1410;background:#d8d0c0;color:#1a1410;padding:4px 8px;font-size:11px;letter-spacing:0.12em;">CITYBRK.EXE — PUBLIC DATA / 2012 INTERNET ENERGY</div>' +
          '<div style="pointer-events:none;position:absolute;top:36px;left:8px;right:8px;display:flex;flex-wrap:wrap;gap:6px;justify-content:space-between;">' +
          '<div style="border:1px solid #c8ff00;padding:5px 8px;background:rgba(10,16,32,0.88);font-size:11px;letter-spacing:0.12em;color:#c8ff00;">CITY BREAKER 2012</div>' +
          '<div id="bo-profile-chip" style="border:1px solid #ff2d95;padding:5px 8px;background:rgba(10,16,32,0.88);font-size:11px;letter-spacing:0.1em;color:#ff2d95;">PROFIL</div>' +
          '<div id="bo-hud-chip" style="border:1px solid #00e5ff;padding:5px 8px;background:rgba(10,16,32,0.88);font-size:11px;letter-spacing:0.08em;color:#00e5ff;">WYNIK 0</div>' +
          "</div>" +
          '<div id="bo-hook" style="pointer-events:none;position:absolute;left:10px;right:10px;top:78px;text-align:center;font-size:13px;letter-spacing:0.06em;color:#c8ff00;text-shadow:0 0 8px #0a1020;">TWOJE MIASTO WŁAŚNIE WYGENEROWAŁO CI LEVEL.</div>' +
          '<div id="bo-legend" style="pointer-events:none;position:absolute;left:8px;right:8px;bottom:118px;text-align:center;font-size:10px;letter-spacing:0.04em;color:#00e5ff;">gestosc → cegly · zielen → przeswity · zabudowa → masa · podmioty → HP</div>' +
          '<div id="bo-state-hint" style="pointer-events:none;position:absolute;left:8px;right:8px;bottom:52px;text-align:center;font-size:12px;letter-spacing:0.1em;color:#c8ff00;"></div>' +
          '<div id="bo-result" style="pointer-events:auto;display:none;position:absolute;left:12px;right:12px;bottom:8px;border:1px solid #ff2d95;background:rgba(10,16,32,0.92);padding:8px;font-size:11px;color:#00e5ff;text-align:center;"></div>';
        parent.appendChild(root);
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
            "pointer-events:auto;border:1px solid #c8ff00;background:#c8ff00;color:#1a1410;padding:8px 10px;font-size:11px;letter-spacing:0.08em;text-decoration:none;min-height:44px;display:inline-flex;align-items:center;";
          bar.appendChild(a);
        }
        const shareBtn = document.createElement("button");
        shareBtn.id = "bo-share";
        shareBtn.type = "button";
        shareBtn.textContent = "UDOSTEPNIJ";
        shareBtn.style.cssText =
          "pointer-events:auto;display:none;position:absolute;right:8px;bottom:8px;z-index:7;border:1px solid #ff2d95;background:#0a1020;color:#ff2d95;padding:8px 10px;font-size:11px;letter-spacing:0.08em;min-height:44px;";
        shareBtn.onclick = function (ev) {
          ev.preventDefault();
          ev.stopPropagation();
          const text =
            window.__boShareText ||
            "CITY BREAKER 2012 · level z danych publicznych · to interpretacja gry, nie werdykt o miescie.";
          function fallback() {
            if (navigator.clipboard && navigator.clipboard.writeText) {
              navigator.clipboard.writeText(text);
            }
            shareBtn.textContent = "SKOPIOWANO";
          }
          if (navigator.share) {
            navigator.share({ text: text }).catch(fallback);
          } else fallback();
        };
        root.appendChild(shareBtn);
      } catch (eShell) {
        return;
      }
    }
    if (typeof window !== "undefined") {
      window.__boShareText =
        "Rozbilam/em level CITY BREAKER 2012 · profil " +
        profileLabel(pid) +
        " · wynik " +
        Math.floor(scoreVal) +
        " · to interpretacja gry, nie dane z 2012.";
    }
    const hud = document.getElementById("bo-hud-chip");
    if (hud) hud.textContent = "WYNIK " + Math.floor(scoreVal) + " · ZYCIA " + Math.floor(livesVal);
    const shareEl = document.getElementById("bo-share");
    if (shareEl) shareEl.style.display = gameState === "Lost" || gameState === "Won" ? "inline-flex" : "none";
    const chip = document.getElementById("bo-profile-chip");
    if (chip) chip.textContent = "PROFIL · " + profileLabel(pid);
    const legend = document.getElementById("bo-legend");
    if (legend) legend.style.display = gameState === "NotStarted" ? "block" : "none";
    const hook = document.getElementById("bo-hook");
    if (hook) hook.style.display = gameState === "NotStarted" ? "block" : "none";
    const pick = document.getElementById("bo-profiles");
    if (pick) pick.style.display = gameState === "NotStarted" ? "flex" : "none";
    const hint = document.getElementById("bo-state-hint");
    if (hint) {
      if (gameState === "NotStarted") hint.textContent = "ODPAL LEVEL · RUSZ PALETKA · DOTKNIJ / SPACJA";
      else if (gameState === "Lost") hint.textContent = "SYGNAL UTRACONY · JESZCZE RAZ (R)";
      else if (gameState === "Won") hint.textContent = "LEVEL ROZBITY";
      else hint.textContent = "";
    }
    const res = document.getElementById("bo-result");
    if (res) {
      if (gameState === "Lost" || gameState === "Won") {
        res.style.display = "block";
        res.textContent =
          "PROFIL " +
          profileLabel(pid) +
          " · WYNIK " +
          Math.floor(scoreVal) +
          " · LEVEL Z DANYCH PUBLICZNYCH · TO INTERPRETACJA GRY, NIE WERDYKT O MIESCIE. Rok 2012 = estetyka, nie data statystyk.";
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
    const cellW = 100;
    const cellH = 32;
    const gw = board.columns * cellW;
    const ox = (scene.getGame().getGameResolutionWidth() - gw) / 2;
    const oy = 56;
    for (let r = 0; r < board.rows; r++) {
      for (let c = 0; c < board.columns; c++) {
        const cell = board.cells[r][c];
        if (!cell) continue;
        const obj = scene.createObject(objNames[cell.hp]);
        if (!obj) continue;
        obj.setPosition(ox + c * cellW, oy + r * cellH);
        try {
          obj.getVariables().get("Health").setNumber(cell.hp);
        } catch (eH) {}
        try {
          const anim = typeof obj.getBehavior === "function" ? obj.getBehavior("Animation") : null;
          if (anim && typeof anim.setAnimationIndex === "function") anim.setAnimationIndex(cell.hp - 1);
          else if (typeof obj.setAnimation === "function") obj.setAnimation(cell.hp - 1);
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
