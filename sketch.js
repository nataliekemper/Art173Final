let idle = []
let idleRight = []
let leftWalk = []
let rightWalk = []

let mushIdle
let mushSprout = []
let mushPulse = []

let sleepHedgeSprite, sleepHedgeSprite2
let madHedgeSprite, sleepMadHedgeSprite
let peeHedge, drinkHedge
let hedgePee = []
let hedgeDrink = []
let sleepHedge = []
let sleepHedge2 = []
let madHedge = []
let sleepMadHedge = []
let tunnel
let tunnel2
let blanket
let drippy
let drip = []
let branchStatic1, branchStatic2, branchStatic3
let grow1, grow2, grow3
let branchGrow1 = []
let branchGrow2 = []
let branchGrow3 = []
let branchArray = []

let pond1, pond2, fishy, fishyKey
let fish = []
let fishKey = []

let waterRipple, waterShadow
let waterMove = []
let bub, bun
let bubbles = []
let bunny = []
let chest, openChest, happyBunny
let bunnyStuff = []
let floatingHat
let hat = []

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
let openn = []
let emptyTree, endScreen
let gameWon = false
let mushSound, backSound, peeSound
let sounds = []


function preload() {
  mushSound = loadSound("sounds/mushroomSound.mp3");
  backSound = loadSound("sounds/backSound.mp3");
  peeSound = loadSound("sounds/peeSound.mp3")
  
  idleSprite = loadImage('benjaminImages/BenjaminIdleSpriteSheet.png')
  idleRightSprite = loadImage('benjaminImages/BenjiIdleRight.png')
  leftSprite = loadImage('benjaminImages/BenjiWalkingLeftSpriteSheet.png')
  rightSprite = loadImage('benjaminImages/BenjiWalkingRightSpriteSheet.png')

  idleMush = loadImage('mushroom/mushIdle.png')
  sproutingMush = loadImage('mushroom/mushStatic.png')
  pulseMush = loadImage('mushroom/mushPulse.png')
  
  sleepHedgeSprite = loadImage('hedgeImage/SleepingHedgeSprite.png')
  sleepHedgeSprite2 = loadImage('hedgeImage/sleepHedge2.png')
  madHedgeSprite = loadImage('hedgeImage/madHedgeSprite.png')
  peeHedge = loadImage('hedgeImage/hedgePee.png')
  drinkHedge = loadImage('hedgeImage/hedgeDrink.png')
  blanket = loadImage('hedgeImage/blanket.png')
  sleepMadHedgeSprite = loadImage('hedgeImage/sleepMadHedge.png')

  startScreen  = loadImage('landscapes/startScreen.png')
  endScreen  = loadImage('benjaminImages/endScreen.png')
  murky = loadImage('landscapes/murky.png')
  murky2 = loadImage('landscapes/murky2Final.png')
  opening = loadImage('landscapes/opening.png')
  openn = loadImage('landscapes/open.png')
  emptyTree = loadImage('landscapes/emptyTree.png')
  tunnel = loadImage('landscapes/tunnelLevel.png')
  tunnel2 = loadImage('landscapes/tunnel2.png')
  drippy = loadImage('landscapes/drip.png')
  branchStatic1 = loadImage('branch/branchStatic1.png')
  branchStatic2 = loadImage('branch/branchStatic2.png')
  branchStatic3 = loadImage('branch/branchStatic3.png')
  grow1 = loadImage('branch/branchGrow1.png')
  grow2 = loadImage('branch/branchGrow2.png')
  grow3 = loadImage('branch/branchGrow3.png')

  pond1 = loadImage('level3Images/level3-1.png')
  pond2 = loadImage('level3Images/level3-2.png')
  waterRipple = loadImage('waterImages/waterRipples.png')
  waterShadow = loadImage('waterImages/waterShadow.png')
  fishy = loadImage('level3Images/fish.png')
  fishyKey = loadImage('level3Images/fishKey.png')
  bub = loadImage('level3Images/bubbles1.png')
  bun = loadImage('level3Images/sadBunny.png')
  chest = loadImage('level3Images/chest.png')
  openChest = loadImage('level3Images/openChest.png')
  happyBunny = loadImage('level3Images/happyBunny.png')
  floatingHat = loadImage('level3Images/floatingHat.png')
}

function startGame(){
  backSound.play()
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
  
  // for (let i = 0; i < 12; i ++) {
  //   openn[i] = opening.get(i * 160, 0, 160, 230)
  // }
  
  // these 4 loops load the hedge sprites
  for (let i = 0; i < 6; i ++) {
    sleepHedge[i] = sleepHedgeSprite.get(i * origImgSize, 0, origImgSize, origImgSize)
    sleepHedge2[i] = sleepHedgeSprite2.get(i * origImgSize, 0, origImgSize, origImgSize)
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
  for (let i = 0; i < 4; i ++) {
    sleepMadHedge[i] = sleepMadHedgeSprite.get(i * origImgSize, 0, origImgSize, origImgSize)
  }


  // branch stuff
  for (let i = 0; i < 20; i ++) {
    branchGrow1[i] = grow1.get(i * 300, 0, 300, 250)
    branchGrow2[i] = grow2.get(i * 300, 0, 300, 250)
    branchGrow3[i] = grow3.get(i * 300, 0, 300, 250)
  }

  for (let i = 0; i < 5; i ++) {
    waterMove[i] = waterRipple
  }

  for (let i = 0; i < 6; i ++) {
    bunny[i] = bun.get(i * 100, 0, 100, 100)
    hat[i] = floatingHat.get(i * 100, 0, 100, 100)
  }
  for (let i = 0; i < 4; i ++) {
    bubbles[i] = bub.get(i * 200, 0, 200, 200)
  }

  bunnyStuff[0] = bunny
  bunnyStuff[1] = bubbles
  bunnyStuff[2] = happyBunny
  bunnyStuff[3] = chest
  bunnyStuff[4] = openChest
  bunnyStuff[5] = hat

  
  for (let i = 0; i < 21; i ++) {
    drip[i] = drippy.get(i * 150, 0, 150, 200)
  }

  for (let i = 0; i < 6; i ++) {
    fish[i] = fishy.get(i * 200, 0, 200, 200)
  }
  for (let i = 0; i < 6; i ++) {
    fishKey[i] = fishyKey.get(i * 200, 0, 200, 200)
  }
  

  branchArray[0] = branchStatic1
  branchArray[1] = branchStatic2
  branchArray[2] = branchStatic3
  branchArray[3] = branchGrow1
  branchArray[4] = branchGrow2
  branchArray[5] = branchGrow3

  sounds[0] = [peeSound]
  // creating and initializing a new game
  game = new Game(idle, idleRight, leftWalk, rightWalk, 
                  murky, murky2, idleMush, mushSprout, mushPulse, openn,
                  emptyTree, mushSound, backSound, tunnel, tunnel2,
                  sleepHedge, sleepHedge2, madHedge, drip, hedgeDrink, hedgePee, sleepMadHedge, blanket, branchArray,
                  pond1, pond2, fish, fishKey, waterRipple, waterShadow, waterMove, bunnyStuff, sounds)
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
    gameWon = game.won
    
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
    
    setTimeout(drawEndScreen, 7000)
  
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

function mousePressed() {
  if (game) {
    if (game.currentLevel == 1) {
      if (game.level.branchHedge.checkClick(mouseX, mouseY)) {
        game.level.branchHedge.numClicked += 1
        game.level.branchHedge.branchFrameCount = 0
      }
    }
  }
}





