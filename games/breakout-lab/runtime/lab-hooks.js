// Breakout Lab hooks (injected into Game JsCode). Restart is scene replace, not a second Game instance.
(function (runtimeScene) {
  var BO_BOARDS = __BO_BOARDS__;

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
    applyLabBoard(runtimeScene, BO_BOARDS);
  }

  let st = "";
  try {
    st = runtimeScene.getScene().getVariables().get("GameState").getAsString();
  } catch (eSt) {}
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

  function applyLabBoard(scene, boards) {
    let id = "balanced-mid";
    let err = "";
    try {
      if (typeof window !== "undefined" && window.location && window.location.search) {
        const q = new URLSearchParams(window.location.search).get("fixture");
        if (q) {
          if (boards && boards[q]) id = q;
          else err = "unknown_fixture";
        }
      }
    } catch (eQ) {
      err = "query_parse";
    }
    const board = (boards && (boards[id] || boards["balanced-mid"])) || null;
    if (typeof window !== "undefined") {
      window.__boBoardError = err;
      window.__boBoard = board;
      window.__boBoardSignature = board ? board.signature : "";
      window.__boBoardId = board ? board.id : "";
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
      p.setWidth(p.getWidth() * board.paddleWidthScale);
    }
  }
})(runtimeScene);
