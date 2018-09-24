function Shooter(x, y, angle) {
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.o_angle = angle; //this will never change, and you will soon see why

    this.speed = 0.2;
    this.offset = 12.5; //half of the length or width
    this.last_shot = null;
    this.cooldown = 1000; //in milliseconds
    this.active = true;

    Engine.log("new shooter created.");
}

Shooter.prototype.fire = function(time) {
    if (time - this.last_shot >= this.cooldown || this.last_shot == null) {
        this.last_shot = time;
        return new Bullet(this.x, this.y, Engine.cursor_x, Engine.cursor_y);
    }
};

Shooter.prototype.get_new_position = function(time) {
    //get the position it should go to
    //Math.sin gives you the y co-ordinate
    //Math.cos gives you the x co-ordinate
    var should_x = Math.cos(this.angle) * Mothership.orbit_radius + Mothership.x;
    var should_y = Math.sin(this.angle) * Mothership.orbit_radius + Mothership.y;

    //then calculate where the shooter will actually go to
    this.x += (should_x - this.x - this.offset) * this.speed;
    this.y += (should_y - this.y - this.offset) * this.speed;
};
