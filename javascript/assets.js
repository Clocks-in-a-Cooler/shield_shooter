var Assets = (function() {
    function create_image(path) {
        var img = document.createElement("img");
        img.src = path;
        
        return img;
    }
    
    var mothership_png = create_image("pics/mothership.png");
    var shooter_png    = create_image("pics/shooter.png");
    var bullet_png     = create_image("pics/bullet.png");
    var enemy_png      = create_image("pics/enemy.png");
    
    //object to hold all of the assets
    return {
        get mothership() { return mothership_png; },
        get bullet() { return bullet_png; },
        get shooter() { return shooter_png; },
        get enemy() { return enemy_png; },
    };
})();