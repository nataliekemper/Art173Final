let idle = []
let idleRight = []
let leftWalk = []
let rightWalk = []

let mushIdle
let mushSprout = []
let mushPulse = []

let sleepHedgeSprite
let madHedgeSprite
let peeHedge, drinkHedge
let hedgePee = []
let hedgeDrink = []
let sleepHedge = []
let madHedge = []
let tunnel
let tunnel2
let blanket
let drippy
let drip = []

let origImgSize = 100
let imgSize = 150
let imgCount = 0
let canvasWidth = 700
let canvasHeight = 500
let benjamin
// mapSize must be multiples of 700
const mapSize = 1400
let benPos
let scroll = {x: 0, y: 0}
let sky, murky, murky2, startScreen

let game
let level1
let level2
let mushrooms = []
let opening
let open = []
let emptyTree, endScreen
let gameWon = false
let mushSound, backSound


function preload() {
  mushSound = loadSound("sounds/mushroomSound.mp3");
  backSound = loadSound("sounds/backSound.mp3");
  
  idleSprite = loadImage('benjaminImages/BenjaminIdleSpriteSheet.png')
  idleRightSprite = loadImage('benjaminImages/BenjiIdleRight.png')
  leftSprite = loadImage('benjaminImages/BenjiWalkingLeftSpriteSheet.png')
  rightSprite = loadImage('benjaminImages/BenjiWalkingRightSpriteSheet.png')

  idleMush = loadImage('mushroom/mushIdle.png')
  sproutingMush = loadImage('mushroom/mushStatic.png')
  pulseMush = loadImage('mushroom/mushPulse.png')
  
  sleepHedgeSprite = loadImage('hedgeImage/SleepingHedgeSprite.png')
  madHedgeSprite = loadImage('hedgeImage/madHedgeSprite.png')
  peeHedge = loadImage('hedgeImage/hedgePee.png')
  drinkHedge = loadImage('hedgeImage/hedgeDrink.png')
  blanket = loadImage('hedgeImage/blanket.png')

  startScreen  = loadImage('landscapes/startScreen.png')
  endScreen  = loadImage('benjaminImages/endScreen.png')
  murky = loadImage('landscapes/murky.png')
  murky2 = loadImage('landscapes/murky2Final.png')
  opening = loadImage('landscapes/opening.png')
  emptyTree = loadImage('landscapes/emptyTree.png')
  tunnel = loadImage('landscapes/tunnelLevel.png')
  tunnel2 = loadImage('landscapes/tunnel2.png')
  drippy = loadImage('landscapes/drip.png')
}

function startGame(){
  //backSound.play()
  for(let i = 0; i < 12; i++){
    idle[i] = idleSprite.get(i * origImgSize, 0, origImgSize,
                             origImgSize)
  }
  for(let i = 0; i < 12; i++){
    idleRight[i] = idleRightSprite.get(i * origImgSize, 0,
                                  origImgSize,
                                  origImgSize)
  }
  for(let i = 0; i < 4; i++){
    leftWalk[i] = leftSprite.get(i * origImgSize, 0,
                                 origImgSize, origImgSize)
  }
  for(let i = 0; i < 4; i++){
    rightWalk[i] = rightSprite.get(i * origImgSize, 0,
                                   origImgSize, origImgSize)
  }

  // these for loops load the 2 states of the mushrooms

  for (let i = 0; i < 11; i ++) {
    mushSprout[i] = sproutingMush.get(i * origImgSize, 0, origImgSize, origImgSize)
  }

  for (let i = 0; i < 8; i ++) {
    mushPulse[i] = pulseMush.get(i * origImgSize, 0, origImgSize, origImgSize)
  }
  
  for (let i = 0; i < 12; i ++) {
    open[i] = opening.get(i * 160, 0, 160, 230)
  }
  
  // these 4 loops load the hedge sprites
  for (let i = 0; i < 6; i ++) {
    sleepHedge[i] = sleepHedgeSprite.get(i * origImgSize, 0, origImgSize, origImgSize)
  }
  for (let i = 0; i < 15; i ++) {
    madHedge[i] = madHedgeSprite.get(i * origImgSize, 0, origImgSize, origImgSize)
  }
  for (let i = 0; i < 4; i ++) {
    hedgeDrink[i] = drinkHedge.get(i * origImgSize, 0, origImgSize, origImgSize)
  }
  for (let i = 0; i < 6; i ++) {
    hedgePee[i] = peeHedge.get(i * origImgSize, 0, origImgSize, origImgSize)
  }
  

  for (let i = 0; i < 21; i ++) {
    drip[i] = drippy.get(i * 150, 0, 150, 200)
  }
  

  // creating and initializing a new game
  game = new Game(idle, idleRight, leftWalk, rightWalk, 
                  murky, murky2, idleMush, mushSprout, mushPulse, open,
                  emptyTree, mushSound, backSound, tunnel, tunnel2,
                  sleepHedge, madHedge, drip, hedgeDrink, hedgePee, blanket)
  game.init()
  loop()
}


function setup(){
  createCanvas(canvasWidth, canvasHeight)
}

function draw(){
  //console.log(mouseX, mouseY)

  if (game && !gameWon) {
    
    benPos = game.player.pos.copy()
    scroll = benPos.sub(350, 300) 
  
    if (scroll.x < 0) {
      translate(0, 0) 
    } else if (scroll.x > 700){
      translate(-700, 0) 
    } else {
      translate(-scroll.x, 0) 
    }

    moving()

    game.update()
    game.render()
    gameWon = game.gameWon
    
  } else if (gameWon) {
    benPos = game.player.pos.copy()
    scroll = benPos.sub(350, 300) 
  
    if (scroll.x < 0) {
      translate(0, 0) 
    } else if (scroll.x > 700){
      translate(-700, 0) 
    } else {
      translate(-scroll.x, 0) 
    }

    moving()
    game.update()
    game.render()
    
    setTimeout(drawEndScreen, 8000)
  
  } else {
    image(startScreen, 0, 0)
    if (mouseClicked()) {
      startGame()
    }
  }
}

function drawEndScreen() {
  image(endScreen, 700, 0)
  setTimeout(noLoop, 1000)
}

function moving() {
    if(keyIsDown(LEFT_ARROW)){

      // level 2 constraints
      if (game.currentLevel == 1) {
        if (!game.level.hasBlanket 
          && game.player.pos.x < 1085) {
            game.player.move(0, 0)
          } else if (!game.level.root 
            && game.player.pos.x < 342) {
              game.player.move(0, 0)
          } else {
            game.player.move(-1.5, 0)
          }
      // level 2 constraints

      } else {
        game.player.move(-1.5, 0)
      }
    }

    if(keyIsDown(RIGHT_ARROW)){
      game.player.move(1.5, 0)
    }
  
    if(keyIsDown(DOWN_ARROW)){
      game.player.move(0, 1.5)
    }
  
    if(keyIsDown(UP_ARROW)){
      game.player.move(0, -1.5)
    }
}

// Checks whether user clicks the 'button' on the main screen
function mouseClicked() {
  if (mouseX < 410 && mouseX > 296 && mouseY > 335 && mouseY < 400 && mouseIsPressed) {
    return true;
  } else {
    return false
  }
}





