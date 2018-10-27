var Mothership = (function() {
    var pos = {
        x: 0,
        y: 0,
    };
    
    var vector = {
        x: 0,
        y: 0,
    };

    var offset = 37.5;

    var maximum_shooters = 8;
    var angles           = [0, 0.25 * Math.PI, 0.5 * Math.PI, 0.75 * Math.PI, Math.PI, 1.25 * Math.PI, 1.5 * Math.PI, 1.75 * Math.PI, 2 * Math.PI];
    var speed            = 0.3;

    return {
        init: function() {
            pos.x = window.innerWidth * 0.5;
            pos.y = window.innerHeight * 0.5;
        },

        get_new_position: function(lapse) {
            vector.x = 0; vector.y = 0; //reset the vector
            
            vector.y += (this.directions.up ? -1 : 0);
            vector.y += (this.directions.down ? 1 : 0);
            vector.x += (this.directions.left ? -1 : 0);
            vector.x += (this.directions.right ? 1 : 0);
            
            pos.x += vector.x * lapse * speed;
            pos.y += vector.y * lapse * speed;

            //limit the mothership at the edges of the screen
            pos.x = Math.min(Engine.game_area_x - offset, Math.max(offset, pos.x));
            pos.y = Math.min(Engine.game_area_y - offset, Math.max(offset, pos.y));
        },

        has_room: function(num) { return (num < maximum_shooters); },
        
        directions: {
            up:    false,
            down:  false,
            left:  false,
            right: false,
        },
        
        collision: function() {
            if (!Engine.invicibility) {
                Engine.end_game();
            }
        },
        
        draw: function(context) {
            context.drawImage(Assets.mothership, pos.x - offset, pos.y - offset);
        },

        get x() { return pos.x - offset;},

        get y() { return pos.y - offset;},
        
        get offset() {return offset;},

        get orbit_radius() { return 100; }, //how far the shooters orbit the mothership
    };
})();
