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

function get_horizontal_offset(text, middle) {
    //each character is about 21 pixels wide
    
    return Math.trunc(middle - (text.length / 2) * 12); 
}

function Power_up(power_up, x, y, v_x, v_y) {
    this.power_up  = power_up;
    this.life_time = 2500;
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
    
    this.x      = x;
    this.y      = y;
    this.v_x    = v_x;
    this.v_y    = v_y;
    this.offset = 15;
    this.speed  = 0.35;
    
    this.float_speed = 0.05;
}

Power_up.prototype.get_new_position = function(lapse) {
    if (this.caught) {
        this.life_time -= lapse;
        
        if (this.life_time <= 0) {
            this.active = false;
        }
        
        this.y -= lapse * this.float_speed;
        return;
    }
    
    this.x += lapse * this.v_x * this.speed;
    this.y += lapse * this.v_y * this.speed;
    
    if (this.get_mothership_collision()) {
        Engine.log(this.power_up + "powerup picked up...");
        Engine.activate_power_up(this.power_up);
        this.caught = true;
    }
    
    this.bounce_at_edge();
};

Power_up.prototype.draw = function(context) {
    if (!this.caught) {
        context.drawImage(this.sprite, this.x - 15, this.y - 15);
    } else {
        context.save();
        
        //colour code: rgb(255, 255, 254), aka LightYellow
        context.fillStyle = "rgba(255, 255, 254, " + this.life_time / 2500 + ")";
        context.font      = "14pt Ubuntu";
        
        context.fillText(this.power_up, get_horizontal_offset(this.power_up, this.x), this.y);
    }
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