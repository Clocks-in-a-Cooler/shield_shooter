function Bullet(x, y, cx, cy) {
    this.x = x;
    this.y = y;
    this.active = true;

    this.vector = this.get_vector(x, y, cx, cy);
    this.speed = 0.3;
}

//calculates the vector, given the starting position and the end position. the length of the vector is always 1 (with bullets, at least)
Bullet.prototype.get_vector = function(start_x, start_y, end_x, end_y) {
    var vx = (end_x - start_x) / Math.sqrt((end_x - start_x) * (end_x - start_x) + (end_y - start_y) * (end_y - start_y));

    var vy = (end_y - start_y) / Math.sqrt((end_x - start_x) * (end_x - start_x) + (end_y - start_y) * (end_y - start_y));

    if (isNaN(vx) || isNaN(vy)) {
        this.active = false;
    }

    return {
        x: vx,
        y: vy,
    };
};

Bullet.prototype.get_new_position = function(lapse) {
    this.x += this.vector.x * lapse * this.speed;
    this.y += this.vector.y * lapse * this.speed;

    if (this.x < 0 || this.y < 0 || this.x > Engine.game_area_x || this.y > Engine.area_y) {
        this.active = false;
    }
};

//also add something to detect collision, and deactivate the bullet
