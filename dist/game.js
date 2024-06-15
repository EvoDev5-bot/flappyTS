import { Background } from "./background.js";
import { Obstacle } from "./obstacles.js";
import { Player } from "./player.js";
import { displayStatusText } from "./utils.js";
export class Game {
  constructor() {
    this.lastTime = 0;
    this.canvas = document.getElementById("canvas");
    this.ctx = null;
    this.obstacles = [];
    this.frameCount = 0;
    this.obstacleInterval = 2500;
    this.player = new Player(this);
    this.gameOver = false;
    this.score = 0;
    if (this.canvas) {
      this.ctx = this.canvas.getContext("2d");
    } else {
      console.error("Canvas not loaded");
    }
    [this.canvas.width, this.canvas.height] = [1200, 800];
    this.background = new Background(this);
  }
  update(timestamp) {
    const deltatime = timestamp - this.lastTime;
    this.lastTime = timestamp;
    this.frameCount += deltatime;
    if (!this.ctx) {
      console.error("CTX is null");
      return;
    }
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    if (this.frameCount >= this.obstacleInterval) {
      this.frameCount -= this.obstacleInterval;
      this.obstacles.push(
        new Obstacle(this.canvas.width, Math.random() * this.canvas.height)
      );
    }
    const drawList = [this.background, ...this.obstacles, this.player];
    const updateList = [this.background, ...this.obstacles, this.player];
    drawList.forEach((obj) => {
      obj.draw(this.ctx);
    });
    updateList.forEach((obj) => {
      obj.update(deltatime);
    });
    this.obstacles.forEach((obs, i, a) => {
      if (obs.markedForDeletion) {
        a.splice(i, 1);
        this.score++;
      }
    });
    displayStatusText(this);
  }
}
