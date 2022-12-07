class Fish {
    constructor(fish, size) {
        this.fish = fish
        this.fishCount = 0
        this.size = size
        this.spawnPoint = null
        this.spawn()
        this.pos = createVector(0, 0)
        this.vel = createVector(0, 0)
        this.clicked = false
    }

render() {
    image(this.fish[floor(this.fishCount) %
      this.fish.length], this.pos.x, this.pos.y, this.size, this.size)
}

move() {
    if (this.spawnPoint === 'top') { 
      this.vel = createVector(Math.random() * 3, 8)
    } else if (this.spawnPoint === 'bottom') { 
      this.vel = createVector(Math.random() * 3, -8)
    } else if (this.spawnPoint === 'left') { 
      this.vel = createVector(8, Math.random() * 3)
    } else { 
      this.vel = createVector(-8, Math.random() * 3)
    }
    this.pos.add(this.vel)
  }

  outOfBounds() {
    if (this.pos.x < 600) {
      return true
    }
    if (this.pos.x > 1500) {
      return true
    }
    if (this.pos.y < -100) {
      return true
    }
    if (this.pos.y > 600) {
      return true
    }
    return false
  }

spawn() {
    let x, y
    let side = ['top', 'bottom', 'left', 'right']
    const randInd = Math.floor(Math.random() * side.length)
    this.spawnPoint = side[randInd]
    if (side[randInd] === 'top') {
      x = Math.random() * 700
      y = -100
    } else if (side[randInd] === 'bottom') {
      x = Math.random() * 700
      y = 600
    } else if (side[randInd] === 'left') {
      x = 600
      y = Math.random() * 500
    } else { // right
      x = 1400
      y = Math.random() * 500
    }
    this.pos = createVector(x, y)
  }

checkFish() {
    if (this.outOfBounds()){
        this.spawn()
    }
}

mouseClicked() {
  if ((mouseX + 700) > this.pos.x && (mouseX + 700) < this.pos.x + this.size &&
      mouseY < this.pos.y + this.size && mouseY > this.pos.y && mouseIsPressed) {
        this.clicked = true
      }
}

update() {
  this.fishCount += 0.15
}

}