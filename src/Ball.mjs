import {Rect} from './Rect.mjs';
import {Vec} from './Vec.mjs';

class Ball extends Rect {
    constructor(game, scoreboard, side) {
        super(side, side);
        this.game = game;
        this.scoreboard = scoreboard;
        this.vel = new Vec(0, 0);
    }

    update(dt) {
        let scored = false;

        // Left/right
        if (this.left < 0) {
            this.game.scoreboard.scoreRight += 1;
            scored = true;
        }

        if (this.right > this.game.size.x) {
            this.game.scoreboard.scoreLeft += 1;
            scored = true;
        }

        // Top/bottom
        if (this.top < 0 || this.bottom > this.game.size.y) {
            this.vel.y *= -1;
        }

        this.pos.x += this.vel.x * dt;
        this.pos.y += this.vel.y * dt;

        return scored;
    }

    draw() {
        this.game.context.fillStyle = 'white';
        this.game.context.fillRect(this.left,
                                   this.top,
                                   this.size.x,
                                   this.size.y);
    }
}

export {Ball};
