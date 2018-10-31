var Assets = (function() {
    function create_image(path) {
        var img = document.createElement("img");
        img.src = path;
        
        return img;
    }
    
    var mothership = create_image("pics/mothership.png");
    var background = create_image("pics/background.png");

    var shooter            = create_image("pics/shooter.png");
    var aggressive_shooter = create_image("pics/shooter_aggressive.png");

    var bullet        = create_image("pics/bullet.png");
    var plasma_bullet = create_image("pics/plasma_bullet.png");
    var fast_bullet   = create_image("pics/bullet_fast.png");
    var bouncy_bullet = create_image("pics/bullet_bouncy.png");

    var enemy      = create_image("pics/enemy.png");
    var weak_enemy = create_image("pics/enemy_weak.png");
    
    var rapid_fire       = create_image("pics/powerup_rapid_fire.png");
    var bouncing_bullets = create_image("pics/powerup_bouncing_bullets.png");
    var piercing_shots   = create_image("pics/powerup_piercing_shots.png");
    var invincibility    = create_image("pics/powerup_invincibility.png");
    var fragile_enemies  = create_image("pics/powerup_fragile_enemies.png");
    
    //object to hold all of the assets
    return {
        get mothership() { return mothership; },
        get background() { return background; },
        
        get shooter() { return shooter; },
        get aggressive_shooter() { return aggressive_shooter; },
        
        get bullet() { return bullet; },
        get plasma_bullet() { return plasma_bullet; },
        get fast_bullet() { return fast_bullet; },
        get bouncy_bullet() { return bouncy_bullet; },
        
        get enemy() { return enemy; },
        get weak_enemy() {return weak_enemy;},
        
        get rapid_fire() { return rapid_fire; },
        get bouncing_bullets() { return bouncing_bullets; },
        get piercing_shots() { return piercing_shots; },
        get invincibility() { return invincibility; },
        get fragile_enemies() { return fragile_enemies; },
    };
})();