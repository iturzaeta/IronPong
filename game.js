const TOP_KEY = 38;
const DOWN_KEY = 40;
const W_KEY=87;
const S_KEY=83;
const PAUSA = 32;

let pause = false

class Game {
  constructor(ctx) {
    this.ctx = ctx;

    this.bg = new Background(this.ctx);
    this.pelota = new Pelota(this.ctx);
    this.rectanguloDer= new Rectangulo(this.ctx,this.ctx.canvas.width-30,this.ctx.canvas.height/2 - 30);
    this.rectanguloIzq= new Rectangulo(this.ctx,10,this.ctx.canvas.height/2 - 30);
    this.intervalId = null;

    

    this._setListeners();

    this.scoreLeft=0;
    this.scoreRight=0;

    //this.tick = 0;
  }

  run() {
    
    this.intervalId = setInterval(() => {
      if (pause === true) {
        this.printPause()
        return

      }
      this._clear()
      this._draw()
      this._move()
      this._checkCollisions();
    }, 1000 / 60)
  }



  _clear() {
   this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
  }

  _draw() {
    this.ctx.font = "30px Arial";
    this.ctx.fillStyle = "black";
    this.ctx.fillText(this.scoreRight, this.ctx.canvas.width/2-50, 50);
    this.ctx.fillText(this.scoreLeft, this.ctx.canvas.width/2+50, 50);
    this.bg.draw();
    this.pelota.draw();
    this.rectanguloDer.draw();
    this.rectanguloIzq.draw();

  }


  _move() {
    setTimeout(() => {this.pelota.move()}, 2000)
    this.rectanguloDer.move();
    this.rectanguloIzq.move();

  }

  _checkCollisions() {
    
    if(this.pelota.collide(this.rectanguloDer)){
      this.pelota.cambiarDireccionX(-5);
    }else if(this.pelota.collide(this.rectanguloIzq)){
      this.pelota.cambiarDireccionX(5);
    }

    if(this.pelota.collideTop()) {
      this.pelota.cambiarDireccionY(2);
    }
    
    if (this.pelota.collideBot()) {
      this.pelota.cambiarDireccionY(-2)
    }

    if(this.pelota.collideRight()){
      this.scoreLeft++;
      //AQUI ESTARIA BIEN METER UN SETTIMEOUT
       //clearInterval(this.intervalId)
       this.pelota = new Pelota(this.ctx);
    }

    if(this.pelota.collideLeft()){
      this.scoreRight++;
      //AQUI ESTARIA BIEN METER UN SETTIMEOUT
      //clearInterval(this.intervalId)
      this.pelota = new Pelota(this.ctx);
    }
  }

  printPause () {
    this.ctx.font = "30px Arial";
    this.ctx.fillStyle = "black";
    this.ctx.textAlign = "center"
    this.ctx.fillText("PAUSE", this.ctx.canvas.width/2, this.ctx.canvas.height/2 );
  }

  _setListeners() {
    document.onkeydown = (e) => {
      if (e.keyCode === TOP_KEY) {
        //this.vy = -5
        this.rectanguloDer.aumentarVelocidad(-3);
      } else if (e.keyCode === DOWN_KEY) {
        //this.vy = 5
        this.rectanguloDer.aumentarVelocidad(3);
      } else if (e.keyCode === W_KEY) {
        //this.vy = 5
        this.rectanguloIzq.aumentarVelocidad(-3);
      } else if (e.keyCode === S_KEY) {
        //this.vy = 5
        this.rectanguloIzq.aumentarVelocidad(3);
      } else if (e.keyCode===PAUSA) {
        pause = !pause
        console.log(pause)
      }
    }

    document.onkeyup = (e) => {
      if (e.keyCode === TOP_KEY || e.keyCode === DOWN_KEY) {
        this.rectanguloDer.aumentarVelocidad(0);
      }else if (e.keyCode === W_KEY || e.keyCode === S_KEY){
        this.rectanguloIzq.aumentarVelocidad(0);
      }
    }
  } 

}
