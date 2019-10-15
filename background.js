class Background {
  constructor(ctx) {
    this.ctx = ctx;
    this.w = this.ctx.canvas.width
    this.h = this.ctx.canvas.height
    this.x = 0
    this.y = 0
  }
 
  draw() {
    ctx.beginPath();
    ctx.moveTo(this.w/2, 0);
    ctx.lineTo(this.w/2, this.h);
    ctx.lineWidth = 4;
    ctx.strokeStyle = canvas.style.borderColor
    ctx.stroke();
  }

}
