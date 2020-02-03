class Vec {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    mag() {
        return Math.sqrt((this.x * this.x) + (this.y * this.y));
    }

    norm(v) {
        this.x *= v / this.mag();
        this.y *= v / this.mag();
    }
}

export {Vec};
