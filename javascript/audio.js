/*
    this wonderful audio courtesy of Julian Will
    https://github.com/LukeCastellan
 */

var audioOST = document.getElementById("OST");
var audioFX  = document.getElementById("ShooterFire");

audioFX.volume = 0.075;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function playOST() {
    Engine.log("current track is " + audioOST);
    audioOST.loop = true;
    audioOST.play();
}

async function playShooterFX() {
    audioFX.play();
    Engine.log("Played shooting sound.");
}
async function pauseAudio() {
    for (let i = 100; i >= 0; --i) {
        await sleep(20);
        audioOST.volume = i/100;
    }
    audioOST.pause();
    Engine.log("audio paused at " + audioOST.currentTime);
}

//normally I'd use the "Audio", but that's taken.
var Sound = (function() {
    //sound effects
    var shooter_fx = new Audio("audio/fx/shooter2.mp3");
    
    //soundtracks
    var ost  = new Audio("audio/ost/menu_theme.mp3");
    ost.loop = true;
    
    return {
        //sound effects' functions
        play_shooter_fx: function() { 
            shooter_fx.play();
            Engine.log("shooter shooting sound played.");
        },
        
        //soundtracks' functions
        play_OST: function() {
            ost.play();
            
            Engine.log("playing OST...");
        },
    };
})();