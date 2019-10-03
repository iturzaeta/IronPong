
class Rectangulo {
  constructor(ctx,x,y) {
    this.ctx = ctx
    this.x = x;
    this.y = y;
    this.w = 20
    this.h = 60
    
    this.vy = 0;

  }

  draw() {
    this.ctx.beginPath();
    this.ctx.fillRect(this.x, this.y, this.w, this.h);
    this.ctx.closePath()
  }

  move() {
    if(this.y + this.vy + this.h < this.ctx.canvas.height && this.y + this.vy > 0) {
      this.y += this.vy
    }
  }

  aumentarVelocidad(velocidad){
    this.vy = velocidad;
  }


}
