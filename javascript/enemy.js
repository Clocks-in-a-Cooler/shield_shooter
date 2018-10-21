function Enemy(x, y, v_x, v_y) {
    this.x      = x;
    this.y      = y;
    this.v_x    = v_x;
    this.v_y    = v_y;
    this.active = true;
    this.offset = 12.5;
    this.speed  = 0.3;
}

Enemy.prototype.get_new_position = function(lapse) {
    this.x += lapse * this.v_x * this.speed;
    this.y += lapse * this.v_y * this.speed;
    
    //bouncing ability
    if (this.x <= 0 && this.v_x < 0) {
        this.v_x = -this.v_x;
    }
    
    if (this.y <= 0 && this.v_y < 0) {
        this.v_y = -this.v_y;
    }
    
    if (this.x >= Engine.game_area_x - 25 && this.v_x > 0) {
        this.v_x = -this.v_x;
    }
    
    if (this.y >= Engine.game_area_y - 25 && this.v_y > 0) {
        this.v_y = -this.v_y;
    }
    
    var b         = this;
    var collision = false;
    
    //check for collisions with things like bullets or shooters
    var bullets = Engine.bullets.filter(function(bullet) {
        var same_x = (bullet.x > b.x - 12.5) && (bullet.x < b.x + 12.5);
        var same_y = (bullet.y > b.y - 12.5) && (bullet.y < b.y + 12.5);
        
        return (same_x && same_y);
    });
    
    bullets.forEach(function(bullet) {
        bullet.collision();
        collision = true;
    });
    
    //shooters collision    
    var shooters = Engine.shooters.filter(function(shooter) {
        return b.get_collision(shooter.x, shooter.y, shooter.offset);
    });
    
    shooters.forEach(function(shooter) {
        shooter.collision();
        collision = true;
    });
    /*
    //check collision with mothership
    if (this.get_collision(Mothership.x, Mothership.y, 37.5)) {
        Engine.log("Player has lost.");
        Mothership.collision();
    }
    */
    
    if (collision) {
        this.active = false;
        Engine.add_score();
    }
}

Enemy.prototype.draw = function(context) {
    context.drawImage(Assets.enemy, (this.x - this.offset), (this.y - this.offset));
};

//getting the object collision between a circle and a square is hard, okay?
Enemy.prototype.get_collision = function(c_x, c_y, radius) {
    var dist_x = Math.abs(c_x - this.x - this.offset);
    var dist_y = Math.abs(c_y - this.y - this.offset);
    
    if (dist_x > (this.offset + radius)) { return false; }
    if (dist_y > (this.offset + radius)) { return false; }
    
    if (dist_x <= this.offset) { return true; }
    if (dist_y <= this.offset) { return true; }
    
    var dx = dist_x - this.offset;
    var dy = dist_y - this.offset;
    
    return ((dx * dx + dy * dy) <= (radius * radius));
}