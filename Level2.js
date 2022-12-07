class Level2 {
  constructor(tunnel1, tunnel2, sleepHedge, madHedge,
              canvasWidth, canvasHeight, imgSize, drip,
              hedgeDrink, hedgePee, blanket, branchArray) {
    this.lines = []
    this.anchors = []
    this.tunnel1 = tunnel1
    this.tunnel2 = tunnel2
    this.sleepHedge = sleepHedge
    this.madHedge = madHedge
    this.canvasWidth = canvasWidth
    this.canvasHeight = canvasHeight
    this.imgSize = imgSize
    this.sleepHedgeCount = 0
    this.madHedgeCount = 0
    this.hatFound = false
    this.hasBlanket = false
    this.root = true
    this.drip = drip
    this.dripCount = 0
    this.hedgeDrink = hedgeDrink
    this.hedgePee = hedgePee
    this.hedgeDrinkCount = 0
    this.blanket = blanket
    this.inUse = false
    this.time = true
    this.branchCount = 0
    this.branchArray = branchArray
    this.branchStatic1 = this.branchArray[0]
    this.branchStatic2 = this.branchArray[1]
    this.branchStatic3 = this.branchArray[2]
    this.branchGrow1 = this.branchArray[3]
    this.branchGrow2 = this.branchArray[4]
    this.branchGrow3 = this.branchArray[5]
    this.branchFrameCount = 0
    this.nextLevel = false
  }
    
  init(player) {
    //console.log(this.branchArray)
    player.reposition(1350, 10, player.rotationValue)
    scroll.x = 1000
    scroll.y = 0
    player.dir = -1
    
    this.lines[0] = new Line(0, 1365, 0, 1326, 70)
    this.lines[1] = new Line(1, 1326, 70, 1257, 205)
    this.lines[2] = new Line(2, 1257, 205, 1204, 260)
    this.lines[3] = new Line(3, 1204, 260, 1076, 326)
    this.lines[4] = new Line(4, 1076, 326, 1050, 342)
    this.lines[5] = new Line(5, 1050, 342, 1026, 375)
    this.lines[6] = new Line(6, 1026, 375, 950, 420)
    this.lines[7] = new Line(7, 950, 420, 754, 420)
    this.lines[8] = new Line(8, 754, 420, 700, 404)
    this.lines[9] = new Line(9, 700, 404, 580, 392)
    this.lines[10] = new Line(10, 580, 392, 496, 302)
    this.lines[11] = new Line(11, 496, 302, 434, 279)
    this.lines[12] = new Line(12, 434, 279, 381, 276)
    this.lines[13] = new Line(13, 381, 276, 289, 269)
    this.lines[14] = new Line(14, 289, 269, 205, 222)
    this.lines[15] = new Line(15, 205, 222, 109, 176)
    this.lines[16] = new Line(16, 109, 176, 71, 123)
    this.lines[17] = new Line(17, 71, 123, 12, 21)
    this.lines[18] = new Line(18, 12, 21, 7, 0)
  }
  
  render() {
    //console.log(this.branchCount)
    image(this.tunnel1, 700, 0)
    image(this.tunnel2, 0, 0)
    image(this.sleepHedge[floor(this.sleepHedgeCount) %
      this.sleepHedge.length], 
      860, 74, 100, 100)
    image(this.drip[floor(this.dripCount) %
      this.drip.length], 
      200, 300, 150, 200)

    this.blanketOnHedge()
    this.soothMadHedge()
    this.mouseClickedPee()
    this.branchCounter()
    this.mouseClicked()
    this.branchGrowing()

  }

  update(player) {
    this.reachedEnd(player)
    this.sleepHedgeCount += 0.05
    this.hedgeDrinkCount += 0.1
    this.madHedgeCount += 0.15
    this.dripCount += 0.15
    this.branchFrameCount += 0.15
    this.lines.forEach(line => {
      let theta = 0
      const up = createVector(0, 1)
      theta = cos(line.normal.dot(up))
      this.anchors[line.id] = [line.getClosest(player), theta]
    })
    let possibleAnchors = this.anchors.filter(item => item[0] !==
                                                false)
    if(possibleAnchors.length > 0){
      let pos = possibleAnchors[0][0]
      let angle

      if (player.pos.x > 880) {
        angle = -possibleAnchors[0][1]
        // ELSE IF cases hard coded due to weird angles on certain lines 
        // (dont know why its buggy but ill fix it later)
      } else if (player.pos.x <= 880 && player.pos.x >= 700) {
        angle = 0
      } else if(player.pos.x < 700 && player.pos.x >= 513) {
        angle = .2
      } else if (player.pos.x <= 378 && player.pos.x >= 218) { 
        angle = .14
      } else {
        angle = possibleAnchors[0][1]
      }
      player.reposition(pos.x, pos.y, angle)
    }
  }


  mouseClickedPee() {
    if (mouseX > 280 && mouseX < 335 && mouseY < 455 && mouseY > 415 && mouseIsPressed) {
      return true;
    } else {
      return false
    }
  }

  mouseClicked() {
    return true
  }
  branchCounter() {
    if (mouseX > 280 && mouseX < 335 && mouseY < 455 && mouseY > 415 && this.mouseClicked()) {
      this.branchCount ++
    }
  }

  checkBlanket() {
    if (mouseX > 400 && mouseX < 420 && mouseY < 256 && mouseY > 217 && mouseIsPressed) {
      this.inUse = true
      return true;
    } else {
      return false
    }
  }

  blanketOnHedge() {
    //console.log("time", this.time, mouseX, mouseY)
    if (this.inUse && mouseX > 93 && mouseX < 200 && 
      mouseY < 410 && mouseY > 347 && mouseIsPressed && this.time) {
        setTimeout(this.inUse = false, 2000)
        setTimeout(this.hasBlanket = true, 2000)
        setTimeout(this.time = false, 2000)
        return true
    } else {
      return false
    }
  }

  soothMadHedge() {
    this.checkBlanket()
    //console.log("has blanket", this.hasBlanket, "in use", this.inUse)
    if (!this.hasBlanket && !this.inUse) {
      image(this.madHedge[floor(this.madHedgeCount) %
          this.madHedge.length], 
          788, 320, 130, 130)
      image(this.blanket, 1075, 205)
    } else if (this.inUse && !this.hasBlanket) {
      //noCursor()
      image(this.blanket, mouseX + 665, mouseY - 25)
      image(this.madHedge[floor(this.madHedgeCount) %
        this.madHedge.length], 
        788, 320, 130, 130)
    } else if (this.blanketOnHedge()) {
      console.log('does this get here?')
      image(this.hedgeDrink[floor(this.hedgeDrinkCount) %
        this.hedgeDrink.length], 788, 320, 130, 130)
    } else {
      //console.log('sleeping now')
      image(this.hedgeDrink[floor(this.hedgeDrinkCount) %
        this.hedgeDrink.length], 788, 320, 130, 130)
    }
  }

  branchGrowing() {
    if (!this.mouseClickedPee()) {
      image(this.hedgeDrink[floor(this.hedgeDrinkCount) %
        this.hedgeDrink.length], 250, 400, 100, 100)

      if (this.branchCount == 0) {
        image(this.branchGrow1[0], 200, 250, 300, 250)

      } else if (this.banchCount == 1) {
        image(this.branchStatic1, 200, 250, 300, 250)

      } else if (this.branchCount == 2) {
        image(this.branchStatic2, 200, 250, 300, 250)

      } else {
        image(this.branchStatic3, 200, 250, 300, 250)
      }

    } else {
      image(this.hedgePee[floor(this.hedgeDrinkCount) %
        this.hedgePee.length], 250, 400, 100, 100)
      
      if (this.branchCount == 1) {
        image(this.branchGrow1[floor(this.branchFrameCount) %
          this.branchGrow1.length], 200, 250, 300, 250)

      } else if (this.branchCount == 2) {
        image(this.branchGrow2[floor(this.branchFrameCount) %
          this.branchGrow2.length], 200, 250, 300, 250)

      } else if (this.branchCount == 3) {
        image(this.branchGrow3[floor(this.branchFrameCount) %
          this.branchGrow3.length], 200, 250, 300, 250)

      } else {
        console.log('nothing')
      }
    }
  }


  reachedEnd(player) {
    if (player.pos.x < 50 && player.pos.y < 50) {
      this.nextLevel = true
    }
  }





// end of Level2
}

