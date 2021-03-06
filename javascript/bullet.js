function Bullet(x, y, cx, cy) {
    this.x = x;
    this.y = y;
    
    this.active = true;
    this.sprite = (function() {
        if (Engine.piercing_shots) {
            return Assets.plasma_bullet;
        }
        
        if (Engine.bouncing_bullets) {
            return Assets.bouncy_bullet;
        }
        
        if (Engine.rapid_fire) {
            return Assets.fast_bullet;
        }
        
        return Assets.bullet;
    })();

    this.vector = this.get_vector(x, y, cx, cy);
    this.speed  = (Engine.rapid_fire ? 0.7 : 0.3);
    this.offset = 5;
}

//calculates the vector, given the starting position and the end position. the length of the vector is always 1 (with bullets, at least)
Bullet.prototype.get_vector = function(start_x, start_y, end_x, end_y) {
    var vx = (end_x - start_x) / Math.sqrt((end_x - start_x) * (end_x - start_x) + (end_y - start_y) * (end_y - start_y));

    var vy = (end_y - start_y) / Math.sqrt((end_x - start_x) * (end_x - start_x) + (end_y - start_y) * (end_y - start_y));

    if (isNaN(vx) || isNaN(vy)) {
        this.active = false;
    }
    
    vx = vx + (Math.random() - 0.5) * (Engine.rapid_fire ? 0.125 : 0.03125);
    vy = vy + (Math.random() - 0.5) * (Engine.rapid_fire ? 0.125 : 0.03125);

    return {
        x: vx,
        y: vy,
    };
};

Bullet.prototype.get_new_position = function(lapse) {
    this.x += this.vector.x * lapse * this.speed;
    this.y += this.vector.y * lapse * this.speed;
    
    if (this.x < 0 || this.y < 0) {
        if (Engine.bouncing_bullets) {
            this.bounce();
        } else {
            this.active = false;
        }
    }
    
    if (this.x > Engine.game_area_x || this.y > Engine.game_area_y) {
        if (Engine.bouncing_bullets) {
            this.bounce();
        } else {
            this.active = false;
        }
    }
};

Bullet.prototype.draw = function(context) {
    context.drawImage(this.sprite, (this.x - this.offset), (this.y - this.offset));
};

//also add something to detect collision, and deactivate the bullet
Bullet.prototype.collision = function() {
    //enemies handle the collision detection part, since I'm lazy
    if (!Engine.piercing_shots) {
        this.active = false;
    }
};

Bullet.prototype.bounce = function() {
    //bouncing ability
    if (this.x <= 0 && this.vector.x < 0) {
        this.vector.x = -this.vector.x;
    }
    
    if (this.y <= 0 && this.vector.y < 0) {
        this.vector.y = -this.vector.y;
    }
    
    if (this.x >= Engine.game_area_x - 10 && this.vector.x > 0) {
        this.vector.x = -this.vector.x;
    }
    
    if (this.y >= Engine.game_area_y - 10 && this.vector.y > 0) {
        this.vector.y = -this.vector.y;
    }
};

Bullet.prototype.destroy_at_edge = function() {
    //destroys the bullet when it's at the edge 
    if (this.x < 0 || this.y < 0) {
        this.active = false;
    }
    
    if (this.x > Engine.game_area_x || this.y > Engine.game_area_y) {
        this.active = false;
    }
};