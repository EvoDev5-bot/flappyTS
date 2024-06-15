export class Background {
  constructor(game) {
    this.width = 288;
    this.height = 512;
    this.x = 0;
    this.image = document.getElementById("bg");
    this.game = game;
    this.y = this.game.canvas.height - this.height;
    this.noOfInstancesNeeded = Math.ceil(this.game.canvas.width / this.width);
  }
  update(deltatime) {
    this.x -= 0.2 * deltatime;
    if (this.x <= -this.width) {
      this.x += this.width;
    }
  }
  draw(ctx) {
    Array(this.noOfInstancesNeeded + 1)
      .fill("1")
      .forEach((_, i) => {
        ctx.drawImage(
          this.image,
          this.x + this.width * i,
          this.y,
          this.width,
          this.height
        );
      });
  }
}
