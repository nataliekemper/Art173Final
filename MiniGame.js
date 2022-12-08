const TOTAL_FISH = 6

class MiniGame {
    constructor(fish, fishKey, waterRipple, waterShadow) {
        this.fishPhoto = fish
        this.fishKey = fishKey
        this.keyFish = null
        this.fish = []
        this.gameOver = false
        this.gotKey = false
        this.color = [170, 135, 176]
        this.waterRipple = waterRipple
        this.waterShadow = waterShadow
    }

init() {
    for (let i = 0; i < TOTAL_FISH; i ++) {
        this.fish[i] = new Fish(this.fishPhoto, 200)
    }
    this.fishKey = new Fish(this.fishKey, 200)
}

render() {
    background(this.color[0], this.color[1], this.color[2])
    image(this.waterShadow, 700, 0)
    image(this.waterRipple, 700, 0)
}

update() {
    //image(this.waterRipple, 700, 0)
    this.fishKey.mouseClicked()
    if (this.fishKey.clicked) {
        this.gameOver = true
        this.gotKey = true
    }

    // Render the randomly generated fish
    for (let i = 0; i < TOTAL_FISH; i++) {
      this.fish[i].render()
      this.fish[i].checkFish()
      this.fish[i].move()
      this.fish[i].update()
    }

    this.fishKey.render()
    this.fishKey.checkFish()
    this.fishKey.move()
    this.fishKey.update()
}











}