class Level3 {
    constructor(pond1, pond2) {
        this.pond1 = pond1
        this.pond2 = pond2
    }

    init(player) {
        player.reposition(160, 350, 0)
    }

    render() {
        image(this.pond1, 0, 0)
        image(this.pond2, 700, 0)
    }

    update() {

    }

}