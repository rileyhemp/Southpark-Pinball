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
    _this.body.frictionAir = 0;
    console.log(_this.body.frictionStatic);
    scene.sys.displayList.add(_assertThisInitialized(_this));

    _this.setCollisionCategory(collisionGroupA);

    _this.body.density = 0.75;
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

var StaticCustomShape =
/*#__PURE__*/
function (_Phaser$Physics$Matte2) {
  _inherits(StaticCustomShape, _Phaser$Physics$Matte2);

  function StaticCustomShape(scene, x, y, name) {
    var _this2;

    _classCallCheck(this, StaticCustomShape);

    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(StaticCustomShape).call(this, scene.matter.world, 0, 0, name));
    scene.sys.displayList.add(_assertThisInitialized(_this2));
    _this2.scene = scene;

    _this2.setExistingBody(Bodies.fromVertices(0, 0, PATHS["".concat(name)]));

    _this2.setStatic(true);

    _this2.x = x;
    _this2.y = y;
    return _this2;
  }

  return StaticCustomShape;
}(Phaser.Physics.Matter.Image);

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
dome, center, wallRight, chuteLeft, chuteRight, bumperLeft, bumperRight, //Utilities
collisionGroupA, collisionGroupB, test;
var game = new Phaser.Game(config);

function preload() {
  this.load.image('ball', 'dist/assets/sprites/wizball.png');
  this.load.image('rectA', 'dist/assets/solids/grey-solid.svg');
  this.load.image('schematic', 'dist/assets/schematic.jpg');
  this.load.image('blueprint', 'dist/assets/blueprint.png');
} //***************************************************************************************//


function create() {
  //Set some things up, inputs, collisiongroups, etc. 
  collisionGroupA = this.matter.world.nextCategory();
  collisionGroupB = this.matter.world.nextCategory();
  test = this;
  bounds = this.matter.world.setBounds(0, 0, 440, 800, 30, true, true, true, true);
  left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
  right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
  spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE); //Add a ball where you click

  this.input.on('pointerdown', function (pointer) {
    ball = new Ball(this, pointer.x, pointer.y, 'ball');
  }, this); //Layout overlay

  var blueprint = this.add.image(220, 437.5, 'blueprint');
  blueprint.setScale(0.9); //Add the flippers

  leftFlipper = new LeftFlipper(this, 118, 725);
  rightFlipper = new RightFlipper(this, 274, 725); //Place static objects

  dome = new StaticCustomShape(this, 250, 250, 'dome');
  center = new StaticCustomShape(this, 197, 275, 'center');
  wallRight = new StaticCustomShape(this, 370, 315, 'wallRight');
  chuteLeft = new StaticCustomShape(this, 80, 705, 'chuteLeft');
  chuteRight = new StaticCustomShape(this, 315, 705, 'chuteRight');
  bumperLeft = new StaticCustomShape(this, 90, 635, 'bumperLeft');
  bumperRight = new StaticCustomShape(this, 305, 625, 'bumperRight');
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
//# sourceMappingURL=game.js.map
