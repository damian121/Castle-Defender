function Knight() {
    this.pos = width + 50;
    this.speedMod = 1 + getRandomInt(-20, 50) / 100;
    this.legProgress = 0;
    this.legState = true;
    this.alive = true;
    this.deathPos = 0;
    this.deathVel;

    this.update = function() {
        this.pos -= 2 * this.speedMod;

        if(this.legState) {
            this.legProgress += 2;
        } else {
            this.legProgress -= 2;
        }

        if(this.legProgress > 20 || this.legProgress < -20) {
            this.legState = !this.legState;
        }
    }

    this.dead = function() {
        this.deathVel += 0.2;
        this.deathPos += this.deathVel;
    }
}
