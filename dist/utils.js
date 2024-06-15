export function isColliding(body1, body2) {
  return (
    body1.x < body2.x + body2.w &&
    body1.x + body1.w > body2.x &&
    body1.y < body2.y + body2.h &&
    body1.y + body1.h > body2.y
  );
}
export function displayStatusText(game) {
  const ctx = game.ctx;
  const score = game.score;
  ctx.font = "64px monospace";
  ctx.fillStyle = "yellow";
  ctx.fillText(`Score: ${score}`, 5, 50);
}
export function gameOverMsg(game) {
  const score = game.score;
  const ctx = game.ctx;
  ctx.font = "64px monospace";
  ctx.fillStyle = "yellow";
  ctx.textAlign = "center";
  ctx.fillText(
    `GAME OVER! Your score is ${score}`,
    game.canvas.width / 2,
    game.canvas.height / 2
  );
}
