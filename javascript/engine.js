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
    var shooters = [], bullets = [], enemies = [];

    //for animation
    var last_time = null, lapse = 0;
    
    //for the game
    var difficulty    = 0; //good luck
    var score         = 0; //good luck
    var score_element = create_element("p", "score");
    
    //powerups
    var rapid_fire       = false;
    var bouncing_bullets = false;
    var piercing_shots   = false;
    var invincibility    = false;
    var fragile_enemies  = false;
    
    //each powerup lasts for 7.5 seconds. enjoy it while you can!
    var power_up_duration = 7500;

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
            document.body.appendChild(score_element);
            this.update_score();

            Mothership.init();
        },

        animate: function(time) {
            if (last_time != null) {
                lapse = time - last_time;
            }
            last_time = time;

            //animation code below
            //basically, ask the mothership, the shooters, each bullet and each enemy where it should be.
            //draw them there.
            //if they are outside the windows, don't draw them.

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
                
                //shoot, if it's loaded.
                if (shooters[qz].loaded && click % 2 == 1) {
                    bullets.push(shooters[qz].fire());
                }
            }
            
            bullets = bullets.filter(function(bullet) {return bullet.active;});
            
            for (var qa = 0; qa < bullets.length; qa++) {
                var bullet = bullets[qa];
                bullet.get_new_position(lapse);
                var bullet_elt        = create_element("div", "bullet");
                bullet_elt.style.top  = bullet.y - bullet.offset + "px";
                bullet_elt.style.left = bullet.x - bullet.offset + "px";
                
                game_div.appendChild(bullet_elt);
            }
            
            enemies = enemies.filter(function(enemy) {return enemy.active;});
            for (var qb = 0; qb < enemies.length; qb++) {
                var enemy = enemies[qb];
                enemy.get_new_position(lapse);
                var enemy_elt        = create_element("div", "enemy");
                enemy_elt.style.top  = enemy.y - enemy.offset + "px";
                enemy_elt.style.left = enemy.x - enemy.offset + "px";
                
                game_div.appendChild(enemy_elt);
            }

            //animation loop
            requestAnimationFrame(Engine.animate);
        },

        add_shooter: function(shooter) {
            //it will only support one, for now
            shooters.push(shooter || new Shooter(Mothership.x, Mothership.y, 0));
        },
        
        add_enemy: function(enemy) {
            enemies.push(enemy || new Enemy(0, 0, Math.sqrt(0.5), Math.sqrt(0.5)));
        },
        
        start_game: function() {
            for (var a = 0; a < 2 * Math.PI; a += 0.25 * Math.PI) {
                Engine.add_shooter(new Shooter(Mothership.x, Mothership.y, a));
            }
            
            //start the animation...
            requestAnimationFrame(this.animate);
        },
        
        //updating the score each frame is begging for a system crash, especially on my HP Pavilion g6 from 2012.
        update_score: function() { score_element.innerHTML = "score: " + score; },
        
        add_score: function() { score = score + 1; this.update_score();},
        
        activate_power_up: function(power_up) {
            switch (power_up) {
                //debug! sorry for the long base statements.
                case "rapid fire":
                    Engine.log("activating 'rapid fire' powerup...");
                    rapid_fire = true;
                    setTimeout(function() {
                        rapid_fire = false;
                        Engine.log("deactivating 'rapid fire' powerup...");
                    }, power_up_duration);
                    break;
                case "bouncing bullets":
                    Engine.log("activating 'bouncing bullets' powerup...");
                    bouncing_bullets = true;
                    setTimeout(function() {
                        bouncing_bullets = false;
                        Engine.log("deactivating 'bouncing bullets' powerup...");
                    }, power_up_duration);
                    break;
                case "piercing shots": 
                    Engine.log("activating 'piercing shots' powerup...");
                    piercing_shots = true;
                    setTimeout(function() {
                        piercing_shots = false;
                        Engine.log("deactivating 'piercing shots' powerup...");
                    }, power_up_duration);
                    break;
                case "invincibility":
                    Engine.log("activating 'invincibility' powerup...");
                    invincibility = true;
                    setTimeout(function() {
                        invincibility = false;
                        Engine.log("deactivating 'invincibility' powerup...");
                    }, power_up_duration);
                    break;
                case "fragile enemies":
                    Engine.log("activating 'fragile enemies' powerup...");
                    fragile_enemies = true;
                    setTimeout(function() {
                        fragile_enemies = false;
                        Engine.log("deactivating 'fragile enemies' powerup...");
                    }, power_up_duration);
                    break;
                default:
                    Engine.log("unrecognized powerup '" + power_up + "' -- what is this?");
            }
            
            //all that's missing is a function for creating powerups!
        },

        //getter properties
        get cursor_x() { return cursor.x; },

        get cursor_y() { return cursor.y; },

        get game_area_x() { return window.innerWidth; },

        get game_area_y() { return window.innerHeight; },
        
        get shooter_cooldown() { return shooter_cooldown; },
        
        get shooters() { return shooters;},
        
        get bullets() {return bullets;},
        
        get enemies() {return enemies;},
        
        get score() {return score;}
    };
})();
