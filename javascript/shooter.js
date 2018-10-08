function Shooter(x, y, angle) {
    this.x     = x;
    this.y     = y;
    this.angle = angle || 0;
    //this.o_angle = angle; //this will never change, and you will soon see why

    this.speed = 0.2;
    this.offset = 12.5; //half of the length or width
    this.loaded = true;
    this.cooldown = 500; //in milliseconds
    this.active = true;

    Engine.log("a new shooter has been created at " + this.x + ", " + this.y);
}

Shooter.prototype.fire = function(time) {
    var s = this;
    if (this.loaded == true) {
        this.loaded = false;
        setTimeout(function() {
            s.loaded = true;
        }, s.cooldown);
        return new Bullet(this.x, this.y, Engine.cursor_x, Engine.cursor_y);
    }
};

Shooter.prototype.get_new_position = function(lapse) {
    //get the position it should go to
    //Math.sin gives you the y co-ordinate
    //Math.cos gives you the x co-ordinate
    this.angle += lapse * 0.001;
    var should_x = Math.cos(this.angle) * Mothership.orbit_radius + Mothership.x + 37.5;
    var should_y = Math.sin(this.angle) * Mothership.orbit_radius + Mothership.y + 37.5;

    //then calculate where the shooter will actually go to
    this.x += (should_x - this.x - this.offset) * this.speed;
    this.y += (should_y - this.y - this.offset) * this.speed;
};

Shooter.prototype.collision = function() {
    //what happens when you get hit by an enemy?
    this.active = false;
    //you're dead, that's what.
};