function Knight() {
    this.pos = width + 50;
    this.speedMod = 1 + getRandomInt(-20, 50) / 100;
    this.legProgress = 0;

    this.update = function() {
        this.pos -= 2 * this.speedMod;
    }
}
