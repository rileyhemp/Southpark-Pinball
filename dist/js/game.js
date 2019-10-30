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

var config = {
  type: Phaser.AUTO,
  width: 440,
  height: 800,
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
}; //Declare variables here

var balls, spacebar, ball, bounds, leftFlipper, rightFlipper, leftBumper, rightBumper, leftBlock, leftPivot, leftJoint, constraint1, constraint2, leftStopper;
var game = new Phaser.Game(config);

function preload() {
  this.load.image('ball', 'dist/assets/sprites/wizball.png');
  this.load.image('rectA', 'dist/assets/solids/grey-solid.svg');
}

function create() {
  bounds = this.matter.world.setBounds(0, 0, 440, 800, 30, true, true, true, true);
  this.matter.world.setGravity(0, 1);
  spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

  var Ball =
  /*#__PURE__*/
  function (_Phaser$Physics$Matte) {
    _inherits(Ball, _Phaser$Physics$Matte);

    function Ball(scene, x, y, texture) {
      var _this;

      _classCallCheck(this, Ball);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Ball).call(this, scene.matter.world, x, y, texture));

      _get(_getPrototypeOf(Ball.prototype), "setScale", _assertThisInitialized(_this)).call(_assertThisInitialized(_this), .3);

      _get(_getPrototypeOf(Ball.prototype), "setCircle", _assertThisInitialized(_this)).call(_assertThisInitialized(_this), 13);

      scene.sys.displayList.add(_assertThisInitialized(_this));
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

  var Bumper =
  /*#__PURE__*/
  function (_Phaser$Physics$Matte2) {
    _inherits(Bumper, _Phaser$Physics$Matte2);

    function Bumper(scene, x, y, texture) {
      var _this2;

      _classCallCheck(this, Bumper);

      _this2 = _possibleConstructorReturn(this, _getPrototypeOf(Bumper).call(this, scene.matter.world, x, y, texture));

      _get(_getPrototypeOf(Bumper.prototype), "setStatic", _assertThisInitialized(_this2)).call(_assertThisInitialized(_this2), true);

      scene.sys.displayList.add(_assertThisInitialized(_this2));
      return _this2;
    }

    return Bumper;
  }(Phaser.Physics.Matter.Sprite);

  var Flipper =
  /*#__PURE__*/
  function (_Phaser$Physics$Matte3) {
    _inherits(Flipper, _Phaser$Physics$Matte3);

    function Flipper(scene, x, y, texture, orientation) {
      var _this3;

      _classCallCheck(this, Flipper);

      _this3 = _possibleConstructorReturn(this, _getPrototypeOf(Flipper).call(this, scene.matter.world, x, y, texture)); // super.setStatic(true)

      _get(_getPrototypeOf(Flipper.prototype), "setFriction", _assertThisInitialized(_this3)).call(_assertThisInitialized(_this3), .2);

      scene.sys.displayList.add(_assertThisInitialized(_this3));

      _this3.setScale(0.5, 1);

      _this3.rotation = .4;
      return _this3;
    }

    return Flipper;
  }(Phaser.Physics.Matter.Image);

  ball = new Ball(this, 215, 0, 'ball'); //Flipper mechanism

  leftFlipper = new Flipper(this, 200, 700, 'rectA').setInteractive();
  leftBlock = this.matter.add.image(175, 740, 'rectA', this, {
    isStatic: true
  });
  Object.assign(leftBlock, {
    scaleX: .5,
    scaleY: .1,
    rotation: .4
  });
  leftPivot = this.matter.add.image(120, 655, null, this, {
    isStatic: true
  });
  leftPivot.setScale(.2);
  constraint1 = this.matter.add.constraint(leftPivot, leftFlipper);
  constraint1.stiffness = .7;
  constraint1.length = 0;
  constraint1.pointA = {
    x: 10,
    y: 10
  };
  constraint1.pointB = {
    x: -65,
    y: -40
  };
  leftStopper = this.matter.add.image(220, 600, null, this, {
    isStatic: true
  });
  leftStopper.setScale(1); //leftFlipper.applyForce({x:3,y:0}, {x:0, y:-100})
}

function update() {
  if (Phaser.Input.Keyboard.JustDown(spacebar)) {
    this.create();
  }
}
//# sourceMappingURL=game.js.map
