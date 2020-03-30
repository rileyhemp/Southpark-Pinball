"use strict";

/* 

South Park Pinball v1.0

Built by Riley Hemphill @ The Creative Circus, 2019

*/
//Initial config
var config = {
	type: Phaser.CANVAS,
	width: 520,
	height: 800,
	physics: {
		default: "matter",
		matter: {
			debug: false,
			gravity: {
				x: 0,
				y: 0.95
			}
		}
	},
	game: {
		balls: 3
	},
	scene: {
		preload: preload,
		create: create,
		update: update
	}
}; //Declare global variables

var table,
	ramps,
	characters,
	leftFlipper,
	rightFlipper,
	sideFlipper,
	bumperA,
	bumperB,
	bumperC,
	leftSlingshot,
	rightSlingshot,
	launcher,
	ball,
	spacebar,
	left,
	right,
	down,
	collisionGroupA,
	collisionGroupB,
	collisionGroupC,
	collisionGroupD,
	collisionGroupE,
	sensorGroupA,
	sensorGroupB,
	cartmanLeft,
	cartmanCenter,
	cartmanRight,
	cartmanBlock,
	rampsCartmanActive,
	rampsCartmanGate,
	buttersLightOn,
	gameActive,
	backgroundMusic,
	eventMusic,
	lights,
	currentScene,
	welcomeScreen,
	test;
var balls = [];
var currentBall = 0;
var multiplier = 1;
var score = 0;
var rampsLit = 0;
var cartmanCanStart = true;
var alerts = [];
var Bodies = Phaser.Physics.Matter.Matter.Bodies;
var game = new Phaser.Game(config);

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
	game.config.isMobile = true;
} else {
	game.config.isMobile = false;
} //Create

function create() {
	var _this = this;

	document.body.style.visibility = "visible";
	currentScene = this;
	welcomeScreen = document.querySelector(".start-screen");
	welcomeScreen.addEventListener("click", function() {
		welcomeScreen.style.visibility = "hidden";
		newGame(_this);
	}); //Size to fit

	document.querySelector("canvas").style.maxHeight = window.innerHeight + "px";
	document.querySelector("canvas").style.minHeight = window.innerHeight + "px";
	initDomControls(); //Move score section to the right of the newly created canvas

	var displaySection = document.querySelector(".display");
	document.body.appendChild(displaySection);
	test = this;
	playRandomSound("intro_music", this); //What to do on click

	this.input.on(
		"pointerdown",
		function(pointer) {
			// console.log(pointer.x+",", pointer.y)
			// ball = new Ball(this, pointer.x, pointer.y, 'ball')
			// ball.setVelocityY(-20)
			// ball.setVelocityX(-20)
			//Start a new game
			// newGame(this)
		},
		this
	); //Setup collision groups

	sensorGroupA = this.matter.world.nextCategory(); // Ground level sensors

	sensorGroupB = this.matter.world.nextCategory(); // Upper level sensors

	collisionGroupA = this.matter.world.nextCategory(); // Ball

	collisionGroupB = this.matter.world.nextCategory(); // Walls

	collisionGroupC = this.matter.world.nextCategory();
	collisionGroupD = this.matter.world.nextCategory();
	collisionGroupE = this.matter.world.nextCategory(); //Setup controls

	left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
	down = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
	right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
	spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
	initLights(this); //Textures

	table = this.add.image(260, 400, "table").setDepth(1);
	ramps = this.add.image(260, 400, "ramps").setDepth(4);
	rampsCartmanActive = this.add.image(260, 400, "ramps_cartman_active").setDepth(1);
	rampsCartmanGate = this.add.image(260, 400, "ramps_cartman_gate").setDepth(1);
	characters = this.add
		.image(260, 380, "characters")
		.setDepth(5)
		.setScale(0.4); //Flippers

	leftFlipper = new LeftFlipper(this, 150, 632);
	rightFlipper = new RightFlipper(this, 327, 632);
	sideFlipper = new SideFlipper(this, 407, 313); //Pop bumpers

	bumperA = new Bumper(this, 308, 125, "bumper");
	bumperB = new Bumper(this, 365, 135, "bumper");
	bumperC = new Bumper(this, 335, 190, "bumper"); //Slingshots

	leftSlingshot = new Slingshot(this, 121, 490, 152, 574, 177, 510, 5, "leftSlingshot");
	rightSlingshot = new Slingshot(this, 353, 491, 324, 574, 298, 510, 5, "rightSlingshot"); //Launcher

	launcher = new Launcher(this, 455, 755); //Static Objects

	/*********************************************************/
	//See static-objects.js

	createStaticObjects(this); //Collision events

	/*********************************************************/
	//See collisions.js

	initCollisionListeners(this);
} //Update

/*********************************************************/

function update() {
	if (Phaser.Input.Keyboard.JustDown(left)) {
		leftFlipper.flip();
	}

	if (Phaser.Input.Keyboard.JustUp(left)) {
		leftFlipper.release();
	}

	if (Phaser.Input.Keyboard.JustDown(right)) {
		rightFlipper.flip();
		sideFlipper.flip();
	}

	if (Phaser.Input.Keyboard.JustUp(right)) {
		rightFlipper.release();
		sideFlipper.release();
	}

	if (Phaser.Input.Keyboard.JustDown(down)) {
		launcher.charge();
	}

	if (Phaser.Input.Keyboard.JustUp(down)) {
		launcher.fire();
	} //Round is over when no balls are in play

	if (balls.length === 0) {
		//Get a new ball if there are any remaining. Otherwise end the game.
		if (currentBall <= config.game.balls - 1 && gameActive) {
			getNewBall(this);
		} else if (gameActive) {
			endGame(this);
			gameActive = false;
		}
	} //Events
	//Cartman

	if (lights.cartman.cartmanLeft.hit > 0 && lights.cartman.cartmanCenter.hit > 0 && lights.cartman.cartmanRight.hit > 0 && cartmanCanStart) {
		startEvent("cartman", this);
	} //Butters

	Object.keys(lights).forEach(function(el) {
		lights[el].hit > 0 && !buttersLightOn ? flashLights("butters", 1) : null;
	});
} //Functions

/*********************************************************/

function newGame(scene) {
	gameActive = true;
	score = 0;
	multiplier = 1;
	backgroundMusic = scene.sound.add("background_music");
	getNewBall(scene);
}

function endGame(scene) {
	document.querySelector(".start-screen > h1").textContent = "Game Over";
	document.querySelector(".byline").textContent = "Final score: " + score;
	document.querySelector(".start-screen > a").textContent = "";
	document.querySelector(".start-screen > p:nth-child(4)").textContent = "Click to play again";
	welcomeScreen.style.visibility = "visible";
	backgroundMusic.stop();
	score = 0;
	document.querySelector(".score").textContent = score;
	currentBall = 0;
}

function getNewBall(scene) {
	clearLights();
	backgroundMusic.play();
	ball = new Ball(scene, 455, 669, "ball");
	scene.sound.playAudioSprite("sound_effects", "rollover");
	currentBall++;
	document.querySelector(".balls-remaining").textContent = currentBall;
}

function restartBall(scene) {
	balls.forEach(function(el) {
		el.isDestroyed = true;
		el.destroy();
		balls.pop();
		backgroundMusic.play();
		ball = new Ball(scene, 455, 669, "ball");
		scene.sound.playAudioSprite("sound_effects", "rollover");
	});
}

function addScore(name, modifier) {
	var amount;

	switch (name) {
		case "bumper":
			amount = 1000;
			break;

		case "butters":
			amount = 10000;
			break;

		case "ramp":
			amount = 5000;
			break;

		case "cartman-win":
			amount = 1000000;
			break;

		case "cartman-body":
			amount = 25000;
			break;

		case "loop":
			amount = 10000;
			break;

		case "jackpot":
			amount = 25000 * modifier;
			break;

		case "super-jackpot":
			amount = 500000;
			break;
	}

	var total = amount * multiplier;
	score += total;
	document.querySelector(".score").textContent = score;
}

function playRandomSound(sprite, scene, delay) {
	var spritemap = Object.keys(scene.cache.json.get(sprite).spritemap);
	setTimeout(function() {
		scene.sound.playAudioSprite(sprite, spritemap[Math.floor(Math.random() * spritemap.length)]);
	}, delay);
}

function alert(message, timeout) {
	var text = document.querySelector(".alert-window");
	text.innerText = message;
	setTimeout(function() {
		text.innerText === message ? (text.innerText = "") : null;
	}, timeout);
}

function playAlerts(alerts) {
	var text = document.querySelector(".alert-window");
	var i = 0;
	alerts[i] != undefined ? (text.innerHTML = alerts[i]) : null;
	var loop = setInterval(function() {
		if (i < alerts.length - 1) {
			i++;
			alerts[i] != undefined ? (text.innerHTML = alerts[i]) : null;
		} else if (alerts.length > 0) {
			i = 0;
			alerts[i] != undefined ? (text.innerHTML = alerts[i]) : null;
		} else {
			text.innerHTML = "";
		}
	}, 3000);
}

function initDomControls() {
	var tableWidth = game.canvas.offsetWidth;

	if (game.config.isMobile === true) {
		var leftButton = document.querySelector(".left-button");
		var rightButton = document.querySelector(".right-button");
		var launchButton = document.querySelector(".launch-button");
		leftButton.style.visibility = "visible";
		rightButton.style.visibility = "visible";
		launchButton.style.visibility = "visible";
		leftButton.style.bottom = "20px";
		rightButton.style.bottom = "20px";
		launchButton.style.bottom = "50px";
		leftButton.style.left = "30px";
		rightButton.style.right = "30px";
		launchButton.style.left = "50%";
		leftButton.addEventListener("touchstart", function() {
			leftFlipper.flip();
		});
		leftButton.addEventListener("touchend", function() {
			leftFlipper.release();
		});
		rightButton.addEventListener("touchstart", function() {
			rightFlipper.flip();
		});
		rightButton.addEventListener("touchend", function() {
			rightFlipper.release();
		});
		launchButton.addEventListener("touchstart", function() {
			launcher.charge();
		});
		launchButton.addEventListener("touchend", function() {
			launcher.fire();
		});
	}
}

document.querySelector("#reload-button").addEventListener("click", function() {
	restartBall(currentScene);
});
//# sourceMappingURL=game.js.map
