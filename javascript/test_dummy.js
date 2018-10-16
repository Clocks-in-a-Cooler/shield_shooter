function Test_dummy(x, y, v_x, v_y) {
    this.x      = x;
    this.y      = y;
    this.v_x    = v_x;
    this.v_y    = v_y;
    this.active = true;
    this.offset = false;
    this.speed  = 0.3;
    
    Engine.log("new test dummy created at (" + x + ", " + y + "), with vector of (" + v_x + ", " + v_y + ").");
}

Test_dummy.prototype = Object.create(Enemy.prototype);

Test_dummy.prototype.collision_with_bullet = function() {
    
};