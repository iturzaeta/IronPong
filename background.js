class Background {
  constructor(ctx) {
    this.ctx = ctx;
    this.w = this.ctx.canvas.width
    this.h = this.ctx.canvas.height
    this.x = 0
    this.y = 0




  }
 
  draw() {
    // start the path
    ctx.beginPath();
    ctx.moveTo(this.w/2, 0);
    ctx.lineTo(this.w/2, this.h);
    ctx.strokeStyle = "#FF0000";
    ctx.stroke();
  }

}
