function generate_power_up() {
    var power_ups = [];
    
    if (!Engine.rapid_fire) {
        power_ups.push("rapid fire");
    }
    
    if (!Engine.bouncing_bullets) {
        power_ups.push("bouncing bullets");
    }
    
    if (!Engine.piercing_shots) {
        power_ups.push("piercing shots");
    }
    
    if (!Engine.invincibility) {
        power_ups.push("invincibility");
    }
    
    if (!Engine.fragile_enemies) {
        power_ups.push("fragile enemies");
    }
    
    var num = Math.floor(Math.random() * power_ups.length);
    
    var power_up = power_ups[num];
    
    //generate the coordinates where the powerup spawns
    var x   = (Math.random() < 0.5) ? Engine.game_area_y : 0;
    var y   = Math.floor(Math.random() * Engine.game_area_x);
    var v_x = (Math.random() < 0.5) ? 0.707 : -0.707;
    var v_y = (Math.random() < 0.5) ? 0.707 : -0.707;
    
    return new Power_up(power_up, x, y, v_x, v_y);
}

function Power_up(power_up, x, y, v_x, v_y) {
    this.power_up  = power_up;
    this.life_time = 3500;
    this.active    = true;
    this.caught    = false;
    
    this.sprite = (function() {
        switch (power_up) {
            case "rapid fire":
                return Assets.rapid_fire;
                break;
            case "bouncing bullets":
                return Assets.bouncing_bullets;
                break;
            case "piercing shots":
                return Assets.piercing_shots;
                break;
            case "invincibility":
                return Assets.invincibility;
                break;
            case "fragile enemies":
                return Assets.fragile_enemies;
                break;
            default:
                Engine.log("invalid name for powerup");
        }
    })();
    
    this.x       = x;
    this.y       = y;
    this.v_x     = v_x;
    this.v_y     = v_y;
    this.offset  = 15;
    this.bounces = 10;
    this.speed   = 0.35;
}

Power_up.prototype.get_new_position = function(lapse) {
    this.x += lapse * this.v_x * this.speed;
    this.y += lapse * this.v_y * this.speed;
    
    if (this.get_mothership_collision()) {
        Engine.log(this.power_up + "powerup picked up...");
        Engine.activate_power_up(this.power_up);
        this.active = false;
    }
    
    this.bounce_at_edge();
};

Power_up.prototype.draw = function(context) {
    context.drawImage(this.sprite, this.x - 15, this.y - 15);
};

Power_up.prototype.bounce_at_edge = function() {
    
    //bouncing ability
    if (this.x <= 0 && this.v_x < 0) {
        this.v_x = -this.v_x;
    }
    
    if (this.y <= 0 && this.v_y < 0) {
        this.v_y = -this.v_y;
    }
    
    if (this.x >= Engine.game_area_x - 30 && this.v_x > 0) {
        this.v_x = -this.v_x;
    }
    
    if (this.y >= Engine.game_area_y - 30 && this.v_y > 0) {
        this.v_y = -this.v_y;
    }
};

Power_up.prototype.get_mothership_collision = function() {
    var same_x = (this.x > Mothership.x - this.offset) && (this.x < Mothership.x + 75 + this.offset);
    var same_y = (this.y > Mothership.y - this.offset) && (this.y < Mothership.y + 75 + this.offset);
    
    return same_x && same_y;
};