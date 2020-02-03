import {Vec} from './Vec.mjs';

class Scoreboard {
    constructor(game, x, y, squareSide) {
        const inter = 19 * squareSide;

        this.game = game;
        this.pos = new Vec(x, y);
        this.scoreL = 0;
        this.scoreR = 0;
        this.squareSide = squareSide;
        this.leftX = this.pos.x - (inter / 2) - (3 * this.squareSide);
        this.rightX = this.pos.x + (inter / 2) - (3 * this.squareSide);
    }

    get scoreLeft() {
        return this.scoreL;
    }

    set scoreLeft(score) {
        this.scoreL = score % 10;
    }

    get scoreRight() {
        return this.scoreR;
    }

    set scoreRight(score) {
        this.scoreR = score % 10;
    }

    drawFor(scoreProp, x, y, i) {
        if (Scoreboard.scores[scoreProp][i]) {
            this.game.context.fillRect(x, y, this.squareSide, this.squareSide);
        }
    }

    update() {
        return this;
    }

    drawScore(lx, rx, y, i) {
        this.drawFor(this.scoreL, lx, y, i);
        this.drawFor(this.scoreR, rx, y, i);
    }

    draw() {
        let i = 0,
            lx = this.leftX,
            rx = this.rightX,
            {y} = this.pos;

        for (i = 0; i < 15; i += 1) {
            if (i !== 0 && i % 3 === 0) {
                y += this.squareSide - 1;
                lx = this.leftX;
                rx = this.rightX;
            }

            lx += this.squareSide - 1;
            rx += this.squareSide - 1;
            this.game.context.fillStyle = 'white';
            this.drawScore(lx, rx, y, i);
        }
    }
}
Scoreboard.scores = {
    '0': [1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1],
    '1': [0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0],
    '2': [1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1],
    '3': [1, 1, 1, 0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 1, 1],
    '4': [1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1],
    '5': [1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1],
    '6': [1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1],
    '7': [1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
    '8': [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1],
    '9': [1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1]
};

export {Scoreboard};
