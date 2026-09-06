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

  function updatePlonkuShell(gameState, scoreVal, livesVal) {
    if (typeof document === "undefined") return;
    let root = document.getElementById("bo-plonku-shell");
    if (!root) {
      try {
        const canvas = runtimeScene.getGame().getRenderer().getCanvas();
        if (!canvas || !canvas.parentElement) return;
        const parent = canvas.parentElement;
        if (getComputedStyle(parent).position === "static") parent.style.position = "relative";
        root = document.createElement("div");
        root.id = "bo-plonku-shell";
        root.setAttribute("aria-hidden", "true");
        root.style.cssText =
          "position:absolute;inset:0;pointer-events:none;z-index:6;font-family:'Arial Narrow',Arial,sans-serif;color:#e8fff0;";
        root.innerHTML =
          '<div style="position:absolute;top:10px;left:12px;right:12px;display:flex;justify-content:space-between;align-items:flex-start;gap:8px;">' +
          '<div style="border:1px solid #c8ff00;padding:6px 10px;background:rgba(6,12,28,0.82);letter-spacing:0.16em;font-size:12px;color:#c8ff00;">BREAKOUT LAB</div>' +
          '<div id="bo-profile-chip" style="border:1px solid #ff2d95;padding:6px 10px;background:rgba(6,12,28,0.82);letter-spacing:0.14em;font-size:12px;color:#ff2d95;">DATA PROFILE</div>' +
          '<div id="bo-hud-chip" style="border:1px solid #00e5ff;padding:6px 10px;background:rgba(6,12,28,0.82);letter-spacing:0.08em;font-size:12px;color:#00e5ff;">SCORE 0 · LIVES 3</div>' +
          "</div>" +
          '<div id="bo-state-hint" style="position:absolute;left:12px;right:12px;bottom:12px;text-align:center;letter-spacing:0.18em;font-size:13px;color:#c8ff00;text-shadow:0 0 12px #0b1020;"></div>';
        parent.appendChild(root);
      } catch (eShell) {
        return;
      }
    }
    const hud = document.getElementById("bo-hud-chip");
    if (hud) hud.textContent = "SCORE " + Math.floor(scoreVal) + " · LIVES " + Math.floor(livesVal);
    const hint = document.getElementById("bo-state-hint");
    if (hint) {
      if (gameState === "NotStarted") hint.textContent = "MOVE · TAP / SPACE TO LAUNCH";
      else if (gameState === "Lost") hint.textContent = "SIGNAL LOST · RETRY";
      else if (gameState === "Won") hint.textContent = "BOARD CLEAR";
      else hint.textContent = "";
    }
  }

  function applyLabBoard(scene, boards, cityBoards) {
    let id = "balanced-mid";
    let err = "";
    let board = null;
    try {
      if (typeof window !== "undefined" && window.location && window.location.search) {
        const params = new URLSearchParams(window.location.search);
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
        }
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
