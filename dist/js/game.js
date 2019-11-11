"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var Ball =
/*#__PURE__*/
function (_Phaser$Physics$Matte) {
  _inherits(Ball, _Phaser$Physics$Matte);

  function Ball(scene, x, y, texture) {
    var _this;

    _classCallCheck(this, Ball);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Ball).call(this, scene.matter.world, x, y, texture));

    _get(_getPrototypeOf(Ball.prototype), "setScale", _assertThisInitialized(_this)).call(_assertThisInitialized(_this), .17);

    _get(_getPrototypeOf(Ball.prototype), "setCircle", _assertThisInitialized(_this)).call(_assertThisInitialized(_this), 8.657);

    _this.body.friction = 0;
    _this.body.frictionAir = 0.00001;
    scene.sys.displayList.add(_assertThisInitialized(_this));

    _this.setCollisionCategory(collisionGroupA);

    _this.body.density = 0.75;

    _this.setDepth(1);

    return _this;
  }

  _createClass(Ball, [{
    key: "launch",
    value: function launch() {
      _get(_getPrototypeOf(Ball.prototype), "setVelocityY", this).call(this, -30);
    }
  }]);

  return Ball;
}(Phaser.Physics.Matter.Image);

var StaticShape =
/*#__PURE__*/
function (_Phaser$Physics$Matte2) {
  _inherits(StaticShape, _Phaser$Physics$Matte2);

  function StaticShape(scene, x, y, name) {
    var _this2;

    _classCallCheck(this, StaticShape);

    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(StaticShape).call(this, scene.matter.world, 0, 0, name));
    scene.sys.displayList.add(_assertThisInitialized(_this2));
    return _this2;
  }

  return StaticShape;
}(Phaser.Physics.Matter.Image);

var StaticCustomShape =
/*#__PURE__*/
function (_StaticShape) {
  _inherits(StaticCustomShape, _StaticShape);

  function StaticCustomShape(scene, x, y, name) {
    var _this3;

    _classCallCheck(this, StaticCustomShape);

    _this3 = _possibleConstructorReturn(this, _getPrototypeOf(StaticCustomShape).call(this, scene, x, y, name));

    _this3.setExistingBody(Bodies.fromVertices(0, 0, PATHS["".concat(name)]));

    _this3.setStatic(true);

    _this3.x = x;
    _this3.y = y;

    _this3.setCollidesWith(collisionGroupA);

    return _this3;
  }

  return StaticCustomShape;
}(StaticShape);

var Bumper =
/*#__PURE__*/
function (_StaticShape2) {
  _inherits(Bumper, _StaticShape2);

  function Bumper(scene, x, y, name) {
    var _this4;

    _classCallCheck(this, Bumper);

    _this4 = _possibleConstructorReturn(this, _getPrototypeOf(Bumper).call(this, scene, x, y, name));

    _this4.setCircle(24);

    _this4.setStatic(true);

    _this4.x = x;
    _this4.y = y;
    return _this4;
  }

  return Bumper;
}(StaticShape);

var config = {
  type: Phaser.AUTO,
  width: 440,
  height: 875,
  physics: {
    default: 'matter',
    matter: {
      debug: true,
      gravity: {
        x: 0,
        y: 0.35
      }
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};
var Bodies = Phaser.Physics.Matter.Matter.Bodies;
var balls, spacebar, left, right, ball, bounds, leftFlipper, rightFlipper, //Static Objects
dome, bottomFrame, center, wallRight, wallRightInner, chuteLeft, chuteRight, bumperLeft, bumperRight, ballStashInner, ballStashOuter, pillA, pillB, pillC, pillD, bumperA, bumperB, bumperC, rightWall, rightDivider, leftDivider, rightTrapDoor, slingshotA, slingshotB, //Background
playfield, plastics, //Utilities
collisionGroupA, collisionGroupB, collisionGroupC, test, tween;
var game = new Phaser.Game(config);

function preload() {
  this.load.image('ball', 'dist/assets/sprites/wizball.png');
  this.load.image('rectA', 'dist/assets/solids/grey-solid.svg');
  this.load.image('schematic', 'dist/assets/schematic.jpg');
  this.load.image('blueprint', 'dist/assets/blueprint.png');
  this.load.image('plastics', 'dist/assets/Plasticos.png');
  this.load.image('playfield', 'dist/assets/Playfield.png');
} //***************************************************************************************//


function create() {
  //Set some things up, inputs, collisiongroups, etc. 
  collisionGroupA = this.matter.world.nextCategory();
  collisionGroupB = this.matter.world.nextCategory();
  collisionGroupC = this.matter.world.nextCategory();
  test = this;
  bounds = this.matter.world.setBounds(0, 0, 440, 875, 30, true, true, true, true);
  left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
  right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
  spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE); //Add a ball where you click

  this.input.on('pointerdown', function (pointer) {
    ball = new Ball(this, pointer.x, pointer.y, 'ball');
    console.log(pointer.x + ',', pointer.y);
  }, this); //Layout overlay
  // let blueprint = this.add.image(220,437.5, 'blueprint')
  // blueprint.setScale(0.9)
  // playfield = this.add.image(220, 445, 'playfield')
  // playfield.setScale(0.21)
  // playfield.setDepth(1)
  // plastics = this.add.image(220, 445, 'plastics')
  // plastics.setScale(0.21)
  // plastics.setDepth(1)
  //Add the flippers

  leftFlipper = new LeftFlipper(this, 118, 725);
  rightFlipper = new RightFlipper(this, 274, 725); //Place static objects

  dome = new StaticCustomShape(this, 250, 250, 'dome');
  bottomFrame = new StaticCustomShape(this, 210, 830, 'bottomFrame');
  center = new StaticCustomShape(this, 197, 275, 'center');
  wallRight = new StaticCustomShape(this, 370, 315, 'wallRight');
  wallRightInner = new StaticCustomShape(this, 305, 170, 'wallRightInner');
  ballStashInner = new StaticCustomShape(this, 107, 130, 'ballStashInner');
  ballStashOuter = new StaticCustomShape(this, 72, 150, 'ballStashOuter');
  chuteLeft = new StaticCustomShape(this, 80, 705, 'chuteLeft');
  chuteRight = new StaticCustomShape(this, 315, 705, 'chuteRight');
  bumperLeft = new StaticCustomShape(this, 90, 635, 'bumperLeft');
  bumperRight = new StaticCustomShape(this, 305, 625, 'bumperRight');
  pillA = new StaticCustomShape(this, 130, 125, 'pill');
  pillB = new StaticCustomShape(this, 175, 125, 'pill');
  pillC = new StaticCustomShape(this, 220, 125, 'pill');
  pillD = new StaticCustomShape(this, 265, 125, 'pill');
  bumperA = new Bumper(this, 200, 240, 'bumperA');
  bumperB = new Bumper(this, 150, 190, 'bumperB');
  bumperC = new Bumper(this, 250, 190, 'bumperC');
  rightWall = this.matter.add.image(390, 595, 'rectA').setScale(0.02, 4.2).setStatic(true);
  leftDivider = this.matter.add.image(40, 630, 'rectA').setScale(0.01, 1.7).setStatic(true);
  rightDivider = this.matter.add.image(352, 600, 'rectA').setScale(0.01, 1).setStatic(true);
  rightTrapDoor = this.matter.add.image(365, 660, 'rectA').setScale(0.01, .9);
  rightTrapDoor.rotation = .8;
  rightTrapDoor.setStatic(true);
  slingshotA = new Slingshot(this, 78, 577, 121, 681, 132, 613, 9);
  slingshotB = new Slingshot(this, 280, 667, 313, 567, 260, 607, 9); //Setup collision events

  this.matter.world.on('collisionstart', function (event, bodyA, bodyB) {
    if (bodyB.label === 'Circle Body' && bodyA.label === 'Slingshot') {
      slingshotA.fire();
      slingshotB.fire();
    }
  });
}

function update() {
  leftFlipper.hold();
  rightFlipper.hold();

  if (Phaser.Input.Keyboard.JustDown(spacebar)) {
    ball = new Ball(this, 130, 625, 'ball');
  }

  if (Phaser.Input.Keyboard.JustDown(left)) {
    leftFlipper.flip();
    leftFlipper.isFlipping = true;
  }

  if (Phaser.Input.Keyboard.JustUp(left)) {
    leftFlipper.isFlipping = false;
  }

  if (Phaser.Input.Keyboard.JustDown(right)) {
    rightFlipper.flip();
    rightFlipper.isFlipping = true;
  }

  if (Phaser.Input.Keyboard.JustUp(right)) {
    rightFlipper.isFlipping = false;
  }
} ///The base of the flipper is a 15mm diameter circle, sloping down to a 5mm diameter circle at the tip. Overall length is 71mm, 

/*

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#000000',
    parent: 'phaser-example',
    physics: {
        default: 'matter',
        matter: {
            gravity: {
                y: 0.8
            },
            debug: true,
            debugBodyColor: 0xffffff
        }
    },
    scene: {
        create: create
    }
};

var bridge = ''

var game = new Phaser.Game(config);

function create ()
{
    this.matter.world.setBounds();

    this.matter.add.mouseSpring();

    var group = this.matter.world.nextGroup(true);

    var bridge = this.matter.add.stack(160, 290, 15, 1, 0, 0, function(x, y) {
        return Phaser.Physics.Matter.Matter.Bodies.rectangle(x - 20, y, 53, 20, { 
            collisionFilter: { group: group },
            chamfer: 5,
            density: 0.005,
            frictionAir: 0.05
        });
    });
    
    var myChain = this.matter.add.chain(bridge, 0.1, 0, -0.1, 0, {
        stiffness: 1,
        length: 0,
        render: {
            visible: false
        }
    });

    this.input.on('pointerdown', function(){
    myChain.bodies[8].force = {
        x: 0,
        y: -10
    }
    })

    console.log(myChain)
    

    this.matter.add.worldConstraint(bridge.bodies[0], 2, 0.9, {
        pointA: { x: 140, y: 300 }, 
        pointB: { x: -25, y: 0 }
    });

    this.matter.add.worldConstraint(bridge.bodies[bridge.bodies.length - 1], 2, 0.9, {
        pointA: { x: 660, y: 300 }, 
        pointB: { x: 25, y: 0 }
    });
}


*/
//# sourceMappingURL=game.js.map
