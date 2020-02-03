import {Rect} from './Rect.mjs';

class Player extends Rect {
    constructor(game, sizex, sizey, followBall, ball) {
        super(sizex, sizey);
        this.game = game;
        this.followBall = followBall;
        this.ball = ball;
        this.scored = false;
    }

    update() {
        if (this.followBall) {
            this.pos.y = this.ball.pos.y;
        }

        this.pos.y = Math.min(Math.max(this.pos.y, this.size.y / 2),
                              this.game.size.y - (this.size.y / 2));
    }

    draw() {
        this.game.context.fillStyle = 'white';
        this.game.context.fillRect(this.left,
                                   this.top,
                                   this.size.x,
                                   this.size.y);
    }
}

export {Player};
