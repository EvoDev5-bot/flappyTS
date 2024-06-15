import { Game } from "./game.js";
import { gameOverMsg } from "./utils.js";
window.addEventListener("load", () => {
  const game = new Game();
  function animate(timestamp) {
    game.update(timestamp);
    if (!game.gameOver) requestAnimationFrame(animate);
    else gameOverMsg(game);
  }
  animate(0);
});
