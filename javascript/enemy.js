function Enemy(x, y, v_x, v_y) {
    this.x      = x;
    this.y      = y;
    this.v_x    = v_x;
    this.v_y    = v_y;
    this.active = true;
    this.offset = 12.5;
}

Enemy.prototype.get_new_position = function(lapse) {
    this.x = lapse * v_x;
    this.y = lapse * v_y;
    
    //bouncing ability
    if (this.x < 0 || this.x > Engine.game_area_x) {
        this.v_x = -1 * this.v_x;
    }
    
    if (this.y < 0 || this.y > Engine.game_area_y) {
        this.v_y = -1 * this.v_y;
    }
}

//getting the object collision between a circle and a square is hard, okay?
Enemy.prototype.get_collision = function(c_x, c_y, radius) {
    var angle  = Math.atan((this.y - c_y) / (this.x - c_x));
    var s_dist = (this.offset + radius) / Math.sin(angle);
    var a_dist = Math.hypot((this.x - c_x), (this.y - c_y));
    
    return (s_dist >= a_dist);
    
    //this function requires debugging
}