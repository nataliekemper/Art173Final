class Level3 {
    constructor(pond1, pond2, fish, fishKey) {
        this.pond1 = pond1
        this.pond2 = pond2
        this.fish = fish
        this.fishKey = fishKey
        this.miniGame = null
        this.hasKey = false
        this.playingMiniGame = false
    }

    init(player) {
        //console.log(this.fishKey)
        player.reposition(160, 350, 0)
        this.miniGame = new MiniGame(this.fish, this.fishKey)
        this.miniGame.init()
    }

    render() {
        image(this.pond1, 0, 0)
        image(this.pond2, 700, 0)
        this.mouseClicked()
    }

    mouseClicked() {
        if (mouseX < 370 && mouseX > 167 && mouseY < 440 && mouseY > 400 && mouseIsPressed) {
            this.playingMiniGame = true
        }
    }

    update() {
        if (this.miniGame.gameOver) {
            this.playingMiniGame = false
        }
    }

}