const TOP_KEY = 38;
const DOWN_KEY = 40;
const W_KEY=87;
const S_KEY=83;
const PAUSA = 32;

let pause = false

let newRound = false


class Game {
  constructor(ctx) {
    this.ctx = ctx;

    this.bg = new Background(this.ctx);
    this.pelota = new Pelota(this.ctx);
    this.rectanguloDer= new Rectangulo(this.ctx,this.ctx.canvas.width-30,this.ctx.canvas.height/2 - 30);
    this.rectanguloIzq= new Rectangulo(this.ctx,10,this.ctx.canvas.height/2 - 30);


    this._setListeners();

    this.scoreLeft = 0
    this.scoreRight = 0

    this.colideAudio = new Audio("./audio/collide.mp3")     
    this.pauseAudio = new Audio("./audio/pause.mp3")  
    this.player2WinsAudio = new Audio("./audio/player2wins.mp3")
    this.player1WinsAudio = new Audio("./audio/player1wins.mp3")
    this.collideWallsAudio = new Audio("./audio/collideWalls.mp3")
    this.gameplay = new Audio("./audio/gameplay.mp3")
    this.intro = new Audio("./audio/intro.mp3")
    this.applause = new Audio("./audio/applause.wav")
  }


  run(speed) {

    this.intervalId = setInterval(() => {

      if (pause === true) {
        this.gameplay.pause()
        this.pauseAudio.play()
        this.printPause()
        return
      } else {
        this.pauseAudio.pause()
        this.gameplay.play()
      }

      
      this._clear()
      this.gameOver();
      this._draw()
      this._moveRectangulos()
      

      if (newRound === true) {
        this.startNewRound()
        return
      }

      this._move()
      this._checkCollisions();

    }, speed)
    
  }


  _clear() {
   this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
  }

  _draw() {
    this.ctx.font = "30px Arial";
    this.ctx.fillStyle = "white" //score
    this.ctx.fillText(this.scoreRight, this.ctx.canvas.width/2-50, 50);
    this.ctx.fillText(this.scoreLeft, this.ctx.canvas.width/2+50, 50);
    
    this.ctx.fillStyle = "white"
    
    this.bg.draw();
    this.pelota.draw();
    this.rectanguloDer.draw();
    this.rectanguloIzq.draw();

  }
  

  _move() { 
    this.pelota.move()
  }

  _moveRectangulos () {
    this.rectanguloDer.move();
    this.rectanguloIzq.move();
  }


  _checkCollisions() {
    
    if(this.pelota.collideDer(this.rectanguloDer)){
      this.colideAudio.play()
      this.pelota.golpeoPalaSecciones(this.rectanguloDer);
      this.pelota.cambiarDireccionX(-7);
      this.pelota.aumentarVelocidad(-4)
      
      
    }else if(this.pelota.collideIzq(this.rectanguloIzq)){
      this.colideAudio.play()
      this.pelota.golpeoPalaSecciones(this.rectanguloIzq);
      this.pelota.cambiarDireccionX(7);
      this.pelota.aumentarVelocidad(4)

    }

    if(this.pelota.collideTop()) {
      this.collideWallsAudio.play()
      this.pelota.cambiarDireccionY(3);
    }
    
    if (this.pelota.collideBot()) {
      this.collideWallsAudio.play()
      this.pelota.cambiarDireccionY(-3)
    }

    if(this.pelota.collideRight()){
      this.scoreLeft++
      canvas.style.borderColor = this._randomRgb()
      this.pelota = new Pelota(this.ctx);
      newRound = true
      setTimeout(() => {
        newRound = false
      }, 700)
    }

    if(this.pelota.collideLeft()){
      this.scoreRight++
      canvas.style.borderColor = this._randomRgb()
      this.pelota = new Pelota(this.ctx);
      newRound = true
      setTimeout(() => {
        newRound = false
      }, 700)
    }
  }



  printPause () {

    this.ctx.font = "40px Arial";
    this.ctx.fillStyle = "red";
    this.ctx.textAlign = "center"
    this.ctx.fillText("- PAUSE -", this.ctx.canvas.width/2, this.ctx.canvas.height/2);
  }

  

  printRightPlayerWins () {
    this.player2WinsAudio.play()
    this.ctx.font = "30px Arial";
    this.ctx.fillStyle = "yellow";
    this.ctx.textAlign = "center"
    this.ctx.fillText("PLAYER TWO WINS", this.ctx.canvas.width/1.35, this.ctx.canvas.height/2+10);
  }

  printLeftPlayerWins () {
    this.player1WinsAudio.play()
    this.ctx.font = "30px Arial";
    this.ctx.fillStyle = "yellow";
    this.ctx.textAlign = "center"
    this.ctx.fillText("PLAYER ONE WINS", this.ctx.canvas.width/4, this.ctx.canvas.height/2-10);
  }

  gameOver() {
    let replay = document.getElementById("replay")
    let my_canvas = document.getElementById("my-canvas")
  
    if (this.scoreLeft >= 10 && this.scoreLeft - this.scoreRight > 1) {
      clearInterval(this.intervalId);
      canvas.style.borderColor = "#ECCB38"
      this.gameplay.pause()
      this.applause.play()
      this.printRightPlayerWins()
      replay.style.display = 'block';
      my_canvas.style.cursor = "pointer";
            
    } else if (this.scoreRight >= 10 && this.scoreRight - this.scoreLeft > 1) {
      clearInterval(this.intervalId);
      canvas.style.borderColor = "#ECCB38"
      this.gameplay.pause()
      this.applause.play()
      this.printLeftPlayerWins();
      replay.style.display = 'block'
      my_canvas.style.cursor = "pointer";
    }
  }

  clearInterval() {
    clearInterval(this.intervalId);
  }


  startNewRound () {
    this.pelota = new Pelota(this.ctx)
  }


  _randomColor() {
    return Math.random() * 255;
  }

  _randomRgb() {
    const r = this._randomColor()
    const g = this._randomColor()
    const b = this._randomColor()

    return `rgb(${r}, ${g}, ${b})`
  }

  _setListeners() {
    document.onkeydown = (e) => {
      if (e.keyCode === TOP_KEY) {
        
        this.rectanguloDer.aumentarVelocidad(-7.5);

      } else if (e.keyCode === DOWN_KEY) {
        
        this.rectanguloDer.aumentarVelocidad(7.5);

      } else if (e.keyCode === W_KEY) {
        
        this.rectanguloIzq.aumentarVelocidad(-7.5);

      } else if (e.keyCode === S_KEY) {
        
        this.rectanguloIzq.aumentarVelocidad(7.5);

      } else if (e.keyCode===PAUSA) {
        pause = !pause
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
