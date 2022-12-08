class Game {
    constructor(idle, idleRight, leftWalk, rightWalk, backdrop1, backdrop2, idleMush, 
      mushSprout, mushPulse, open, emptyTree, mushSound, backSound, tunnel1, tunnel2, sleepHedge, sleepHedge2, madHedge, drip,
      hedgeDrink, hedgePee, sleepMadHedge, blanket, branchArray, pond1, pond2, fish, fishKey, waterRipple, waterShadow,
      waterMove, bunnyStuff){
    this.player = null
    this.levels = []
    this.level = null
    this.currentLevel = 0
    this.idle = idle
    this.idleRight = idleRight
    this.leftWalk = leftWalk
    this.rightWalk = rightWalk
    this.backdrop1 = backdrop1
    this.backdrop2 = backdrop2
    this.idleMush = idleMush
    this.mushSprout = mushSprout
    this.mushPulse = mushPulse
    this.open = open
    this.emptyTree = emptyTree
    this.canvasWidth = 700
    this.canvasHeight = 500
    this.imgSize = 150
    this.fadeColor = null
    this.gameWon = false
    this.mushSound = mushSound
    this.backSound = backSound

    this.tunnel1 = tunnel1
    this.tunnel2 = tunnel2
    this.sleepHedge = sleepHedge
    this.sleepHedge2 = sleepHedge2
    this.sleepMadHedge = sleepMadHedge
    this.madHedge = madHedge
    this.hedgeDrink = hedgeDrink
    this.hedgePee = hedgePee
    this.drip = drip
    this.blanket = blanket
    this.branchArray = branchArray

    this.pond1 = pond1
    this.pond2 = pond2
    this.fish = fish
    this.fishKey = fishKey
    this.waterRipple = waterRipple
    this.waterShadow = waterShadow
    this.waterMove = waterMove
    this.waterCount = 0
    this.bunnyStuff = bunnyStuff
  }
  
  init(){
    this.player = new BenjaminSprite(this.idle, this.idleRight,
                                     this.leftWalk,
                                     this.rightWalk, 350,
                                     380, 150)
    
    this.levels[0] = new Level1(this.backdrop1,
                                this.backdrop2, this.open, this.emptyTree, 
                                this.idleMush, this.mushSprout,
                                this.mushPulse, this.canvasWidth, 
                                this.canvasHeight, this.imgSize,
                                this.mushSound)
    
    this.levels[1] = new Level2(this.tunnel1, this.tunnel2,
                                this.sleepHedge, this.sleepHedge2, this.madHedge,
                                this.canvasWidth, this.canvasHeight,
                                this.imgSize, this.drip, this.hedgeDrink, 
                                this.hedgePee, this.blanket, this.branchArray,
                                this.sleepMadHedge)

    this.levels[2] = new Level3(this.pond1, this.pond2, this.fish, this.fishKey, 
                                this.waterRipple, this.waterShadow,  this.bunnyStuff)

    this.levels[0].init()
    //this.levels[1].init(this.player)
    this.level = this.levels[this.currentLevel]
  }
  
  nextLevel() {
    this.currentLevel ++
    this.level = this.levels[this.currentLevel]
    this.levels[this.currentLevel].init(this.player)
  }
  
  
  
  render(){
    if (this.level.hatFound) {
      this.gameWon = true
      this.level.render(this.player)
      this.player.render()
      this.fadeColor = color(17, 14, 26);
      this.fadeColor.setAlpha(128 + 128 * sin(millis() /
                              3000));
      fill(this.fadeColor);
      rect(0, 0, 1400, 500);
    } else if (this.level.nextLevel) {
      this.nextLevel()
    } else if (this.currentLevel == 2) {
      //console.log(this.level.miniGame)
      if (this.level.playingMiniGame) {
        image(this.waterMove[floor(this.waterCount) %
          this.waterMove.length], 700, 0)
        this.level.miniGame.render()
        this.level.miniGame.update()
      } else {
        this.level.render(this.player)
        this.player.render()
      }
    } else {
      this.level.render(this.player)
      this.player.render()
    }
  }
  
  update(){
    this.player.update()
    this.level.update(this.player)
    this.waterCount += 0.15
  }
  
  drawEndScreen() {
    background(255)
  }
}


    
