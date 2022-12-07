class PeeingHedge {
    constructor(hedgeDrink, hedgePee, size, branchGrow1, branchGrow2, branchGrow3, branchStatic1, branchStatic2, branchStatic3) {
        this.x = 250
        this.y = 400
        this.hedgeDrink = hedgeDrink
        this.hedgePee = hedgePee
        this.hedgeDrinkCount = 0
        this.branchFrameCount = 0
        this.branchCount = 0
        this.size = size

        this.branchGrow1 = branchGrow1
        this.branchGrow2 = branchGrow2
        this.branchGrow3 = branchGrow3

        this.branchStatic1 = branchStatic1
        this.branchStatic2 = branchStatic2
        this.branchStatic3 = branchStatic3

        this.numClicked = 0
    }

render() {
    console.log(this.branchFrameCount)
    if (mouseX > 280 && mouseX < 335 && mouseY < 455 && mouseY > 415 && mouseIsPressed) {
    image(this.hedgePee[floor(this.hedgeDrinkCount) %
        this.hedgePee.length], this.x, this.y, this.size, this.size)

        if (this.numClicked == 0) {
            let x = 10

        } else if (this.numClicked == 1) {
            image(this.branchGrow1[floor(this.branchFrameCount) %
                this.branchGrow1.length], 200, 250, 300, 250)

        } else if (this.numClicked == 2) {
            image(this.branchGrow2[floor(this.branchFrameCount) %
                this.branchGrow2.length], 200, 250, 300, 250)

        } else {
            image(this.branchGrow3[floor(this.branchFrameCount) %
                this.branchGrow3.length], 200, 250, 300, 250)
    }

    } else {
    image(this.hedgeDrink[floor(this.hedgeDrinkCount) %
        this.hedgeDrink.length], this.x, this.y, this.size, this.size)
    
        if (this.numClicked == 0) {
            //console.log("no branch")

        } else if (this.numClicked == 1) {
            image(this.branchStatic1, 200, 250, 300, 250)

        } else if (this.numClicked == 2) {
            image(this.branchStatic2, 200, 250, 300, 250)

        } else {
            image(this.branchStatic3, 200, 250, 300, 250)
        }
    }
}

mouseClickedPee() {
    if (mouseX > 280 && mouseX < 335 && mouseY < 455 && mouseY > 415 && mouseIsPressed) {
      return true;
    } else {
      return false
    }
  }


checkClick(mX, mY){
    if(mX > this.x && mX < this.x + this.size &&
        mY > this.y && mY < this.y + this.size){
    //this.clicked = true
    // if (this.id == 100) {
    //     this.snd.play()
    // }
    return true
    } else {
    return false
    }
}

update() {
    this.hedgeDrinkCount += 0.15
    this.branchFrameCount += 0.15
}


}