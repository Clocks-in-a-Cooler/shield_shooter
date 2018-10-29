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
    
    if (Engine.fragile_enemies) {
        this.destroy_at_edge();
    } else {
        this.bounce_at_edge();
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
        return b.get_shooter_collision(shooter);
    });
    
    shooters.forEach(function(shooter) {
        shooter.collision();
        collision = true;
    });
    //check for mothership collision
    if (this.get_mothership_collision()) {
        Mothership.collision();
        collision = true;
        Engine.log("mothership collision detected!");
    }
    
    if (collision) {
        this.active = false;
        Engine.add_score();
    }
}

Enemy.prototype.draw = function(context) {
    //if the powerup for fragile enemies is on, then draw the "enemy weak" image
    var sprite = Engine.fragile_enemies ? Assets.enemy_weak : Assets.enemy;
    context.drawImage(sprite, (this.x - this.offset), (this.y - this.offset));
};

//getting the object collision between a circle and a square is hard, okay?
Enemy.prototype.get_shooter_collision = function(shooter) {
    var dist = (this.x - shooter.x) * (this.x - shooter.x) + (this.y - shooter.y) * (this.y - shooter.y);
    dist     = Math.sqrt(dist);
    
    return (dist <= 25);
};

Enemy.prototype.get_mothership_collision = function() {
    var same_x = (this.x > Mothership.x - this.offset) && (this.x < Mothership.x + 75 + this.offset);
    var same_y = (this.y > Mothership.y - this.offset) && (this.y < Mothership.y + 75 + this.offset);
    
    return same_x && same_y;
};

Enemy.prototype.bounce_at_edge = function() {
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
};

Enemy.prototype.destroy_at_edge = function() {
    if (this.x <= 0 || this.x >= Engine.game_area_x - 25) {
        this.active = false;
    }
    
    if (this.y <= 0 || this.y >= Engine.game_area_y - 25) {
        this.active = false;
    }
};