class Pipe {
  x: number;
  y: number;
  width = 52;
  height = 320;
  rotated: boolean;
  image = document.getElementById("pipe") as HTMLImageElement;
  markedForDeletion = false;
  constructor(x: number, y: number, rotated?: boolean) {
    this.x = x;
    this.y = y;
    if (rotated == undefined) {
      this.rotated = false;
    } else this.rotated = rotated;
  }
  update(deltatime: number): void {
    this.x -= 0.2 * deltatime;

    if (this.x + this.width < 0) this.markedForDeletion = true;
  }
  draw(ctx: CanvasRenderingContext2D): void {
    if (this.rotated) {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(Math.PI);
      ctx.drawImage(this.image, -this.width, 0, this.width, this.height);
      ctx.drawImage(
        document.getElementById("pipeExt") as HTMLImageElement,
        -this.width,
        this.height,
        this.width,
        this.height
      );
      ctx.drawImage(
        document.getElementById("pipeExt") as HTMLImageElement,
        -this.width,
        this.height * 2,
        this.width,
        this.height
      );
      ctx.restore();
    } else {
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);

      ctx.drawImage(
        document.getElementById("pipeExt") as HTMLImageElement,
        this.x,
        this.y + this.height,
        this.width,
        this.height
      );

      ctx.drawImage(
        document.getElementById("pipeExt") as HTMLImageElement,
        this.x,
        this.y + this.height + this.height,
        this.width,
        this.height
      );
    }
  }
}

export class Obstacle {
  pipe1: Pipe;
  pipe2: Pipe;
  markedForDeletion = false;
  constructor(x: number, y: number) {
    this.pipe1 = new Pipe(x, y + 100);
    this.pipe2 = new Pipe(x, y - 100, true);
  }
  update(deltatime: number): void {
    this.pipe1.update(deltatime);
    this.pipe2.update(deltatime);
  }
  draw(ctx: CanvasRenderingContext2D): void {
    this.pipe1.draw(ctx);
    this.pipe2.draw(ctx);
    if (this.pipe1.markedForDeletion && this.pipe2.markedForDeletion)
      this.markedForDeletion = true;
  }
}
