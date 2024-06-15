import { Game } from "./game";

export class Background {
    game: Game;
    width = 288
    height = 512
    x = 0
    y:number;
    image = document.getElementById('bg') as HTMLImageElement
    noOfInstancesNeeded: number;
    constructor(game: Game){
        this.game=game
        this.y=this.game.canvas.height-this.height
        this.noOfInstancesNeeded = Math.ceil(this.game.canvas.width/this.width)
    }
    update(deltatime:number):void{
        this.x-=0.2*deltatime
        if(this.x <= -this.width){
            this.x+=this.width
        }
    }
    draw(ctx:CanvasRenderingContext2D){
        Array(this.noOfInstancesNeeded+1).fill('1').forEach((_,i) => {
        ctx.drawImage(this.image, this.x + (this.width*i),this.y,this.width,this.height)
        })
    }
}