import { Game } from "./game.js";
import { gameOverMsg } from "./utils.js";
window.addEventListener("load", (): void => {
  const game = new Game();
  function animate(timestamp: number): void {
    game.update(timestamp);
    if (!game.gameOver) requestAnimationFrame(animate);
    else gameOverMsg(game);
  }

  animate(0);
});
