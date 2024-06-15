import { isColliding } from "./utils.js";
export class Player {
  constructor(game) {
    this.x = 300;
    this.y = 300;
    this.spriteHeight = 24;
    this.spriteWidth = 34;
    this.width = this.spriteWidth * 2;
    this.height = this.spriteHeight * 2;
    this.image = document.querySelector("#player");
    this.startFrame = 6;
    this.frameX = this.startFrame;
    this.maxFrame = 8;
    this.fps = 10;
    this.frameCounter = 0;
    this.frameInterval = 1000 / this.fps;
    this.vy = 0;
    this.weight = 0.025;
    this.game = game;
    document.addEventListener("keydown", (e) => {
      if (e.key == "ArrowUp" || e.key == " ") {
        this.vy = -0.6;
      }
    });
    document.addEventListener("click", (e) => {
      this.vy = -0.6;
    });
  }
  update(deltatime) {
    this.game.obstacles.forEach((obs) => {
      if (
        isColliding(
          { x: this.x, y: this.y, w: this.width, h: this.height },
          {
            x: obs.pipe1.x,
            y: obs.pipe1.y,
            w: obs.pipe1.width,
            h: obs.pipe1.height * 3,
          }
        ) ||
        isColliding(
          { x: this.x, y: this.y, w: this.width, h: this.height },
          {
            x: obs.pipe2.x,
            y: obs.pipe2.y - obs.pipe2.height * 3,
            w: obs.pipe2.width,
            h: obs.pipe2.height * 3,
          }
        )
      ) {
        this.game.gameOver = true;
      }
    });
    this.frameCounter += deltatime;
    this.vy += this.weight;
    this.y += this.vy * deltatime;
    if (this.frameCounter >= this.frameInterval) {
      this.frameCounter -= this.frameInterval;
      if (this.frameX == this.maxFrame) this.frameX = this.startFrame;
      else this.frameX++;
    }
  }
  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.spriteWidth * this.frameX,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}
