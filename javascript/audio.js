var audioOST = document.getElementById("OST");
var audioFX = document.getElementById("ShooterFire");

audioFX.volume = 0.075;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function playOST() {
	console.log("current track is " + audioOST);
	audioOST.loop = true;
	audioOST.play();
}

async function playShooterFX() {
	audioFX.play();
	console.log("Played shooting sound!");
}
async function pauseAudio() {
	for (let i = 100; i >= 0; --i) {
		await sleep(20);
		audioOST.volume = i/100;
	}
	audioOST.pause();
	console.log("audio paused at " + audioOST.currentTime);
}
