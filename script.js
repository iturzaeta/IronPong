const canvas = document.getElementById("my-canvas")
const ctx = canvas.getContext("2d")


const start = document.getElementById("start")
const menu = document.getElementById('menu')
const juego = document.getElementById('juego')
const replay = document.getElementById('replay')
const vel = document.getElementById('speed')
const speaker = document.getElementById("speaker")

let speed = 13



vel.onchange = (e) => {
    speed = e.target.value
}


start.onclick = () => {
    menu.style.display = 'none'
    juego.style.display = 'flex'
    const game = new Game(ctx)
    game.gameplay.play()
    game.run(speed)
    start.disabled = true
    
}

replay.onclick = () => {
    replay.style.display = 'none'
    const game = new Game(ctx)
    game.run(speed)
    canvas.style.cursor = "none"
    

}

