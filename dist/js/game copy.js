"use strict";

var tableWidth = 440;
var tableHeight = 800;
var gravity = 1.5;
var ballRadius = 50;
var config = {
  type: Phaser.AUTO,
  width: tableWidth,
  height: tableHeight,
  physics: {
    default: 'matter',
    matter: {
      debug: true
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};
var ball;
var bumperLeft;
var bumperRight;
var cursors;
var spacebar;
var game = new Phaser.Game(config);

function preload() {
  this.load.image('ball', 'dist/assets/sprites/wizball.png');
  this.load.image('rectA', 'dist/assets/solids/grey-solid.svg');
}

function create() {
  cursors = this.input.keyboard.createCursorKeys();
  this.matter.world.setBounds(0, 0, tableWidth, tableHeight, 30, true, true, false, false);
  this.matter.world.setGravity(0, 1.5);
  createBall(this, tableWidth, 500, ballRadius);
  bumperLeft = this.matter.add.image(440, 800, 'rectA', null, {
    isStatic: true
  });
  bumperLeft.setScale(1, 3);
  bumperLeft.rotation = -.6;
  bumperRight = this.matter.add.image(0, 800, 'rectA', null, {
    isStatic: true
  });
  bumperRight.setScale(1, 3);
  bumperRight.rotation = .6;
  spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
}

function update() {
  if (Phaser.Input.Keyboard.JustDown(spacebar)) {
    createBall(this, tableWidth, 500, ballRadius);
  }
}

function createBall(scene, x, y) {
  ball = scene.matter.add.image(x, y, 'ball');
  ball.setCircle(ballRadius);
  ball.setScale(0.5);
  ball.setVelocityY(-30);
  ball.setBounce(0.2);
}
//# sourceMappingURL=game copy.js.map
