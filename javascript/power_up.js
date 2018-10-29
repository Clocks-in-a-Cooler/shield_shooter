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
    this.active    = false;
    this.caught    = false;
    
    this.x       = x;
    this.y       = y;
    this.v_x     = v_x;
    this.v_y     = v_y;
    this.offset  = 15;
    this.bounces = 10;
    this.speed   = 0.2;
}

Power_up.prototype.get_new_position = function(lapse) {
    
};

Power_up.prototype.bounce_at_edge = function() {
    this.bounces++;
};