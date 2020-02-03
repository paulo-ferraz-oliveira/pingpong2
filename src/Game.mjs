import {Rect} from './Rect.mjs';
import {Ball} from './Ball.mjs';
import {Player} from './Player.mjs';
import {Scoreboard} from './Scoreboard.mjs';

const canvas = document.getElementById('pong');

class Game extends Rect {
    constructor() {
        super(canvas.width, canvas.height);
        this.context = canvas.getContext('2d');
        this.scoreboard = new Scoreboard(this,
                                         this.size.x / 2,
                                         this.size.y * 0.06000,
                                         this.size.x * 0.01563);
        this.ball = new Ball(this,
                             this.scoreboard,
                             this.size.x * 0.01563);
        this.leftPlayer = new Player(this,
                                     this.size.x * 0.03125,
                                     this.size.y * 0.20830,
                                     false,
                                     this.ball);
        this.rightPlayer = new Player(this,
                                      this.leftPlayer.size.x,
                                      this.leftPlayer.size.y,
                                      true,
                                      this.ball);
        this.players = [this.leftPlayer, this.rightPlayer];
        this.elements = [this.ball, this.scoreboard].concat(this.players);
        this.lastMs = 0;
        this.dt = 0;
        this.frames = 0;
        this.lastFrameC = 0;
        this.frameC = 0;

        this.addEventListeners();
    }

    addEventListeners() {
        canvas.addEventListener('mousemove', (event) => {
            this.leftPlayer.pos.y = event.offsetY;
            event.preventDefault();
        });
        canvas.addEventListener('click', (event) => {
            if (this.ball.vel.x === 0 && this.ball.vel.y === 0) {
                this.ball.vel.x = 100;
                this.ball.vel.y = 75;
                this.ball.vel.norm(350);
            }
            event.preventDefault();
        });
    }

    clearBackground() {
        this.context.fillStyle = 'black';
        this.context.fillRect(0, 0, this.size.x, this.size.y);
    }

    drawFPS(ms) {
        if (ms - this.lastFrameC <= 1000) {
            this.frames += 1;
        } else {
            this.frameC = this.frames;
            this.frames = 1;
            this.lastFrameC = ms;
        }

        if (this.frameC) {
            this.context.font = '10px Monospace';
            this.context.fillText(`${this.frameC} fps`, 0, 10);
        }
    }

    update(dt) {
        const scored = this.ball.update(dt);

        this.players.forEach((player) => {
            if (player.left <= this.ball.right &&
                player.right >= this.ball.left &&
                player.top <= this.ball.bottom &&
                player.bottom >= this.ball.top) {
                // TODO: proper top/bottom collision detection
                this.ball.vel.x *= -1;
            }
        });

        this.elements.forEach((updateable) => updateable.update(dt));

        return scored;
    }

    draw(ms) {
        this.clearBackground();
        this.elements.forEach((drawable) => drawable.draw());
        this.drawFPS(ms);
    }

    loop(ms) {
        let scored = false;
        const step = 1 / 120;

        // Main game loop and fixed step compensations
        this.dt += Math.min(1, (ms - this.lastMs) / 1000);

        while (this.dt > step) {
            this.dt -= step;
            scored = this.update(step);
        }

        this.draw(ms);
        this.lastMs = ms;

        if (scored) {
            this.reset();
        }

        window.requestAnimationFrame(this.loop.bind(this));
    }

    reset() {
        this.ball.pos.x = this.size.x / 2;
        this.ball.pos.y = this.size.y / 2;
        this.ball.vel.x = 0;
        this.ball.vel.y = 0;
        this.leftPlayer.pos.x = this.size.x * 0.06250;
        this.leftPlayer.pos.y = this.size.y / 2;
        this.rightPlayer.pos.x = this.size.x - this.leftPlayer.pos.x;
        this.rightPlayer.pos.y = this.size.y / 2;
    }

    init() {
        this.reset();
        window.requestAnimationFrame(this.loop.bind(this));
        return this;
    }
}

canvas.height = Math.max(document.body.scrollHeight,
                         document.body.offsetHeight,
                         document.documentElement.clientHeight,
                         document.documentElement.scrollHeight,
                         document.documentElement.offsetHeight);
canvas.width = canvas.height * 1.5;
canvas.style['left'] = '50%';
canvas.style['margin-left'] = `${-canvas.width / 2}px`;
canvas.style['top'] = '50%';
canvas.style['margin-top'] = `${-canvas.height / 2}px`;

window.pong = new Game().init();
