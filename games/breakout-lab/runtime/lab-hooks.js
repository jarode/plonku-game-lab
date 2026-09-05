// Breakout Lab hooks (injected into Game JsCode). Restart is scene replace, not a second Game instance.
(function (runtimeScene) {
  function hideAll(name) {
    const list = runtimeScene.getObjects(name);
    for (let i = 0; i < list.length; i++) list[i].hide(true);
  }
  hideAll("GDevelop_WaterMark");
  hideAll("Home_Button");

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
})(runtimeScene);
