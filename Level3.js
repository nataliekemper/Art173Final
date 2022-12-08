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
        this.happyBunny = this.bunnyStuff[2]
        this.chest = this.bunnyStuff[3]
        this.openChest = this.bunnyStuff[4]
        this.hat = this.bunnyStuff[5]
        this.sadBunnyCount = 0
        this.bubblesCount = 0
        this.won = false
    }

    init(player) {
        //console.log(this.fishKey)
        player.reposition(160, 350, 0)
        this.miniGame = new MiniGame(this.fish, this.fishKey, this.waterRipple, this.waterShadow)
        this.miniGame.init()
    }

    render(player) {
        image(this.pond1, 0, 0)
        image(this.pond2, 700, 0)
        if (!this.miniGame.gotKey) {
            image(this.chest, 1165, 205)
            image(this.sadBunny[floor(this.sadBunnyCount) %
                this.sadBunny.length], 
                1112, 375, 100, 100)
            image(this.bubbles1[floor(this.bubblesCount) %
                this.bubbles1.length], 
                1060, 313, 200, 200)
    
        } else {
            image(this.hat[floor(this.bubblesCount) %
                this.hat.length], 
                1165, 185, 100, 100)


            image(this.openChest, 1165, 205)
            image(this.happyBunny, 1110, 225)

            setTimeout(this.won = true, 6000)

            // console.log(player.pos.x, player.pos.y)
            // if (player.pos.x < 1180 && player.pos.x > 1160 && 
            //     player.pos.y < 250 && this.keyPressed) {
            //         image(this.openChest, 1165, 205)
            //         image(this.happyBunny, 1110, 225)
                    
            //     } else {
            //         image(this.hat[floor(this.bubblesCount) %
            //             this.hat.length], 
            //             1165, 190, 100, 100)
            //         image(this.openChest, 1165, 205)
            //         image(this.happyBunny, 1110, 225)
            //     }
            //console.log(this.won)
        }


        this.mouseClicked()
    }

    mouseClicked() {
        if (mouseX < 370 && mouseX > 167 && mouseY < 440 && mouseY > 400 && mouseIsPressed) {
            this.playingMiniGame = true
        }
    }

    keyPressed() {
        if (keyCode == 32) {
            return true;
        } else {
            return false;
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