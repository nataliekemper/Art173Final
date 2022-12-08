class Level3 {
    constructor(pond1, pond2, fish, fishKey, waterRipple, waterShadow, bunnyStuff) {
        this.pond1 = pond1
        this.pond2 = pond2
        this.fish = fish
        this.fishKey = fishKey
        this.miniGame = null
        this.hasKey = false
        this.playingMiniGame = false
        this.waterRipple = waterRipple
        this.waterShadow = waterShadow
        this.bunnyStuff = bunnyStuff
        this.sadBunny = this.bunnyStuff[0]
        this.bubbles1 = this.bunnyStuff[1]
        this.sadBunnyCount = 0
        this.bubblesCount = 0
    }

    init(player) {
        //console.log(this.fishKey)
        player.reposition(160, 350, 0)
        this.miniGame = new MiniGame(this.fish, this.fishKey, this.waterRipple, this.waterShadow)
        this.miniGame.init()
    }

    render() {
        image(this.pond1, 0, 0)
        image(this.pond2, 700, 0)
        if (!this.miniGame.gotKey) {
            image(this.sadBunny[floor(this.sadBunnyCount) %
                this.sadBunny.length], 
                1112, 375, 100, 100)
            image(this.bubbles1[floor(this.bubblesCount) %
                this.bubbles1.length], 
                1060, 313, 200, 200)
    
        } else {
            console.log("draw bunny")
        }


        this.mouseClicked()
    }

    mouseClicked() {
        if (mouseX < 370 && mouseX > 167 && mouseY < 440 && mouseY > 400 && mouseIsPressed) {
            this.playingMiniGame = true
        }
    }

    update() {
        this.bubblesCount += 0.1
        this.sadBunnyCount += 0.15
        if (this.miniGame.gameOver) {
            this.playingMiniGame = false
        }
    }

}