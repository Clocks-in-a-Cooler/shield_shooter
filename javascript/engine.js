/* ---------------------------- new engine ------------------------------------------ */
var Engine = (function() {
    var logging = true;

    //stores cursor's position from the top left corner; x corresponds to left-right; y corresponds to up-down
    var cursor = {
        x: 0,
        y: 0,
    };

    var click = 0; //click state

    //the div for the game, serves as a background and holds the objects on the game
    var game_div = (function() {
        var g = document.createElement('div');
        var att = document.createAttribute('class');
        att.value = "game";
        g.setAttributeNode(att);

        return g;
    })();

    //state of the keys are stored in MOTHERSHIP

    //to store stuff
    var shooters = [], bullets = [];

    //for animation
    var last_time = null, lapse = 0;

    return {
        start_logging: function() { logging = true; },
        stop_logging: function() { logging = false; },
        log: function(msg) {
            if (logging) {
                console.log(msg);
            }
        },

        init: function() {
            //set up the mouse move event listeners
            document.onmousemove = function(e) {
                cursor.x = e.pageX;
                cursor.y = e.pageY;
            }

            //set up click event listeners
            addEventListener("mousedown", function() {
                if (click % 2 == 0) {
                    click = click + 1;
                    Engine.log("a mouse click at " + cursor.x + ", " + cursor.y);
                }
            });

            addEventListener("mouseup", function() {
                if (click % 2 == 1) {
                    click = click + 1;
                }
            });

            //set up key event listeners, namely arrow keys or WASD
            // w: 87, a: 65, s: 83, d: 68
            // left: 37, up: 38, right: 39, down: 40
            addEventListener("keydown", function(e) {
                switch (e.keyCode) {
                    case 87:
                    case 38:
                        Mothership.vector.y = -1;
                        Engine.log("UP key pressed");
                        break;

                    case 83:
                    case 40:
                        Mothership.vector.y = 1;
                        Engine.log("DOWN key pressed");
                        break;

                    case 65:
                    case 37:
                        Mothership.vector.x = -1
                        Engine.log("LEFT key pressed");
                        break;

                    case 68:
                    case 39:
                        Mothership.vector.x = 1;
                        Engine.log("RIGHT key pressed");
                        break;
                }
            });

            addEventListener("keyup", function(e) {
                switch (e.keyCode) {
                    case 87:
                    case 38:
                    case 83:
                    case 40:
                        Mothership.vector.y = 0;
                        break;
                    case 65:
                    case 37:
                    case 68:
                    case 39:
                        Mothership.vector.x = 0;
                        break;
                }
            });

            //draw background, which will also serve as a wrapper for everything else
            document.body.appendChild(game_div);

            Mothership.init();
        },

        animate: function(time) {
            if (last_time != null) {
                lapse = time - last_time;
            }
            last_time = time;

            //animation code below
            //basically, ask the mothership, the shooters, and each bullet where it should be.
            //draw them there.
            //if they're outside the windows, don't draw them.

            //clear the screen first
            game_div.innerHTML = "";

            //draw the mothership
            Mothership.get_new_position(lapse);
            var m_ship = create_element("div", "mothership");
            m_ship.style.top = Mothership.y + "px";
            m_ship.style.left = Mothership.x + "px";
            game_div.appendChild(m_ship);

            //filter out the shooters that aren't active
            shooters = shooters.filter(function(shooter) { return shooter.active; });
            //draw the remaining ones
            for (var qz = 0; qz < shooters.length; qz = qz + 1) {
                var shooter = shooters[qz];
                shooter.get_new_position(lapse);
                var shooter_elt = create_element("div", "shooter");
                shooter_elt.style.top = shooter.y + "px";
                shooter_elt.style.left = shooter.x + "px";

                game_div.appendChild(shooter_elt);
            }

            //animation loop
            requestAnimationFrame(Engine.animate);
        },

        add_shooter: function() {
            //it will only support one, for now
            shooters.push(new Shooter(Mothership.x, Mothership.y + 100, 0));
        },

        //getter properties for cursor positions
        get cursor_x() { return cursor.x; },

        get cursor_y() { return cursor.y; },

        get game_area_x() { return window.innerWidth; },

        get game_area_y() { return window.innerHeight; },
    };
})();
