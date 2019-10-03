class Pelota {
  constructor(ctx) {
    this.ctx = ctx
    this.w = 20
    this.h = 40
    this.x= this.ctx.canvas.width/2;
    this.y= this.ctx.canvas.height/2;
    this.r=10;



    //PROBANDO SALIDA INICIAL DE LA PELOTA
    this.vx = (Math.random() < 0.5 ? -1 : 1) * (Math.random() + 5)
    this.vy = (Math.random() * 4) * (Math.random() < 0.5 ? -1 : 1)
  }

  draw() {
  
      console.log('entra')
      this.ctx.beginPath();
      this.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
      this.ctx.fill();
    
    //this.ctx.stroke();
    //this.ctx.closePath()
  }

  move() {
    this.x += this.vx
    this.y += this.vy
  }

  collide(el) {
    const colX = el.x + el.w > this.x - 2 && el.x < this.x + 2
    const colY = el.y + el.h > this.y && el.y < this.y

    return colX && colY
  }

  

  collideRight(){
    const colX = this.x < -40;

    return colX;
  }

  collideLeft(){
    const colX = this.x + this.w > this.ctx.canvas.width+40;
    return colX;
  }

  collideTop() {
    const colY = this.y < 0 + this.r;
    return colY;
  }

  collideBot() {
    const colY = this.y > this.ctx.canvas.height - this.r
    return colY;
  }

  cambiarDireccionX(velocidad){
    this.vx = velocidad;
    //this.vy = velocidad;
  }

  cambiarDireccionY(velocidad) {
    this.vy = velocidad;
  }

  aumentarVelocidad(vel) {
    this.vx += vel
  }


  iniciarPelota(){
    this.x=250;
    this.y=150;
  }
}
