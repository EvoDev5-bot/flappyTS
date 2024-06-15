class Pipe {
  constructor(x, y, rotated) {
    this.width = 52;
    this.height = 320;
    this.image = document.getElementById("pipe");
    this.markedForDeletion = false;
    this.x = x;
    this.y = y;
    if (rotated == undefined) {
      this.rotated = false;
    } else this.rotated = rotated;
  }
  update(deltatime) {
    this.x -= 0.2 * deltatime;
    if (this.x + this.width < 0) this.markedForDeletion = true;
  }
  draw(ctx) {
    if (this.rotated) {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(Math.PI);
      ctx.drawImage(this.image, -this.width, 0, this.width, this.height);
      ctx.drawImage(
        document.getElementById("pipeExt"),
        -this.width,
        this.height,
        this.width,
        this.height
      );
      ctx.drawImage(
        document.getElementById("pipeExt"),
        -this.width,
        this.height * 2,
        this.width,
        this.height
      );
      ctx.restore();
    } else {
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
      ctx.drawImage(
        document.getElementById("pipeExt"),
        this.x,
        this.y + this.height,
        this.width,
        this.height
      );
      ctx.drawImage(
        document.getElementById("pipeExt"),
        this.x,
        this.y + this.height + this.height,
        this.width,
        this.height
      );
    }
  }
}
export class Obstacle {
  constructor(x, y) {
    this.markedForDeletion = false;
    this.pipe1 = new Pipe(x, y + 100);
    this.pipe2 = new Pipe(x, y - 100, true);
  }
  update(deltatime) {
    this.pipe1.update(deltatime);
    this.pipe2.update(deltatime);
  }
  draw(ctx) {
    this.pipe1.draw(ctx);
    this.pipe2.draw(ctx);
    if (this.pipe1.markedForDeletion && this.pipe2.markedForDeletion)
      this.markedForDeletion = true;
  }
}
