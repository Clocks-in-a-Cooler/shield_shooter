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
    
    var rapid_fire = create_image("pics/powerup_rapid_fire.png");
    
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
        get weak_enemy() {return enemy_weak;},
    };
})();