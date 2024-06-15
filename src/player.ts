import { Game } from "./game.js";
import { isColliding } from "./utils.js";

export class Player {
  game: Game;
  x = 300;
  y = 300;
  spriteHeight = 24;
  spriteWidth = 34;
  width = this.spriteWidth * 2;
  height = this.spriteHeight * 2;
  image = document.querySelector("#player") as HTMLImageElement;
  startFrame = 6;
  frameX = this.startFrame;
  maxFrame = 8;
  private fps = 10;
  frameCounter = 0;
  frameInterval = 1000 / this.fps;
  vy = 0;
  weight = 0.025;
  constructor(game: Game) {
    this.game = game;

    document.addEventListener("keydown", (e): void => {
      if (e.key == "ArrowUp" || e.key == " ") {
        this.vy = -0.6;
      }
    });
    document.addEventListener("click", (e): void => {
      this.vy = -0.6;
    });
  }
  update(deltatime: number) {
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
  draw(ctx: CanvasRenderingContext2D) {
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
