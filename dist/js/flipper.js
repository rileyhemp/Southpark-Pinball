"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Flipper =
/*#__PURE__*/
function () {
  function Flipper(scene, x, y, options) {
    _classCallCheck(this, Flipper);

    this.scene = scene;
    this.x = x;
    this.y = y;
    this.blockOffsetX = 25;
    this.blockOffsetY = 45;
    this.blockRotation = .50;
    this.stopperOffsetX = 25;
    this.stopperOffsetY = -23;
    this.flipperOffsetX = 25;
    this.flipperOffsetY = 5;
    this.torque = -8.5;
    this.staticTorque = 2;
    this.flipperLength = 78;
    this.isFlipping = false;
  }

  _createClass(Flipper, [{
    key: "createComponents",
    value: function createComponents() {
      //Bottom block
      this.block = this.scene.matter.add.image(this.x + this.blockOffsetX, this.y + this.blockOffsetY, 'rectA', this.scene, {
        isStatic: true
      });
      this.block.scaleX = .1;
      this.block.scaleY = .3;
      this.block.visible = false;
      this.block.rotation = this.blockRotation; //Top block

      this.stopper = this.scene.matter.add.image(this.x + this.stopperOffsetX, this.y + this.stopperOffsetY, 'rectA', this.scene, {
        isStatic: true
      });
      this.stopper.scaleX = .1;
      this.stopper.scaleY = .4;
      this.stopper.visible = false; //Pivot point

      this.pivot = this.scene.matter.add.image(this.x, this.y, null, this.scene);
      this.pivot.setScale(.2);
      this.pivot.setCircle(1);
      this.pivot.setStatic(true); //Flipper 
      //The flipper is made up of two rectangles, one slightly smaller then the other. The reason for this is that the ball would occassionally miss the flipper at high speed, 
      //and the second rectangle is there as a backup. It works most of the time, but is not ideal. 
      //

      var rectA = Phaser.Physics.Matter.Matter.Bodies.rectangle(this.x + this.flipperOffsetX, this.y + this.flipperOffsetY, this.flipperLength, 24, {
        chamfer: 10
      });
      var rectB = Phaser.Physics.Matter.Matter.Bodies.rectangle(this.x + this.flipperOffsetX, this.y + this.flipperOffsetY, this.flipperLength, 16, {
        chamfer: 10
      });
      this.flipperBody = this.scene.matter.body.create({
        parts: [rectA]
      });
      this.flipperBodyInner = this.scene.matter.body.create({
        parts: [rectB]
      });
      this.flipper = this.scene.matter.add.image(150, 0, null).setExistingBody(this.flipperBody).setVisible(false);
      this.flipperInner = this.scene.matter.add.image(150, 0, null).setExistingBody(this.flipperBodyInner).setVisible(false);
      this.flipper.body.restitution = 0.1;
      this.flipper.setBounce(0.2);
      this.flipperInner.setBounce(0.2); //Joint

      this.pin = this.scene.matter.add.constraint(this.pivot, this.flipper);
      this.pin.stiffness = 0.9;
      this.pin.length = 0;
      this.pin2 = this.scene.matter.add.constraint(this.pivot, this.flipperInner);
      this.pin2.stiffness = 0.9;
      this.pin2.length = 0;
      this.pin3 = this.scene.matter.add.constraint(this.flipper, this.flipperInner);
      this.pin3.stiffness = 0.9;
      this.pin3.length = 0;
      this.positionPin();
    }
  }, {
    key: "setCollisionGroups",
    value: function setCollisionGroups() {
      [this.block, this.stopper].forEach(function (el) {
        el.setCollisionCategory(flipperCollisionGroup);
      });
      this.flipper.setCollisionCategory(collisionGroupA);
      this.flipper.setCollidesWith([collisionGroupA, flipperCollisionGroup]);
      this.flipperInner.setCollisionCategory(collisionGroupB);
      this.flipperInner.setCollidesWith([collisionGroupA, flipperCollisionGroup]);
    }
  }, {
    key: "flip",
    value: function flip() {
      this.flipper.body.torque = this.torque;

      if (this.isFlipping) {
        this.flipper.body.torque = this.torque;
      } //When flipping, increase the friction of the ball (simulates rubbers)
      // ball.setFriction(1)
      // setTimeout(() => {
      //     ball.setFriction(0)
      // }, 100)

    }
  }, {
    key: "hold",
    value: function hold() {
      if (this.isFlipping) {
        this.flipper.body.torque = -this.staticTorque;
      }
    }
  }, {
    key: "release",
    value: function release() {
      this.flipper.body.torque = this.staticTorque;
    }
  }]);

  return Flipper;
}();

var LeftFlipper =
/*#__PURE__*/
function (_Flipper) {
  _inherits(LeftFlipper, _Flipper);

  function LeftFlipper(scene, x, y) {
    var _this;

    _classCallCheck(this, LeftFlipper);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(LeftFlipper).call(this, scene, x, y));

    _get(_getPrototypeOf(LeftFlipper.prototype), "createComponents", _assertThisInitialized(_this)).call(_assertThisInitialized(_this));

    _get(_getPrototypeOf(LeftFlipper.prototype), "setCollisionGroups", _assertThisInitialized(_this)).call(_assertThisInitialized(_this));

    return _this;
  }

  _createClass(LeftFlipper, [{
    key: "positionPin",
    value: function positionPin() {
      this.pin.pointA = {
        x: 5,
        y: 5
      };
      this.pin.pointB = {
        x: -this.flipperLength / 2 + 3,
        y: 0
      };
      this.pin2.pointA = {
        x: 5,
        y: 5
      };
      this.pin2.pointB = {
        x: -this.flipperLength / 2 + 3,
        y: 0
      };
    }
  }]);

  return LeftFlipper;
}(Flipper);

var RightFlipper =
/*#__PURE__*/
function (_Flipper2) {
  _inherits(RightFlipper, _Flipper2);

  function RightFlipper(scene, x, y) {
    var _this2;

    _classCallCheck(this, RightFlipper);

    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(RightFlipper).call(this, scene, x, y));
    _this2.blockOffsetX = -_this2.blockOffsetX;
    _this2.blockRotation = -_this2.blockRotation;
    _this2.stopperOffsetX = -_this2.stopperOffsetX;
    _this2.flipperOffsetX = -_this2.flipperOffsetX;
    _this2.torque = -_this2.torque;
    _this2.staticTorque = -_this2.staticTorque;

    _get(_getPrototypeOf(RightFlipper.prototype), "createComponents", _assertThisInitialized(_this2)).call(_assertThisInitialized(_this2));

    _get(_getPrototypeOf(RightFlipper.prototype), "setCollisionGroups", _assertThisInitialized(_this2)).call(_assertThisInitialized(_this2));

    return _this2;
  }

  _createClass(RightFlipper, [{
    key: "positionPin",
    value: function positionPin() {
      this.pin.pointA = {
        x: -5,
        y: 5
      };
      this.pin.pointB = {
        x: this.flipperLength / 2 - 3,
        y: 0
      };
      this.pin2.pointA = {
        x: -5,
        y: 5
      };
      this.pin2.pointB = {
        x: this.flipperLength / 2 - 3,
        y: 0
      };
    }
  }]);

  return RightFlipper;
}(Flipper);

var SideFlipper =
/*#__PURE__*/
function (_Flipper3) {
  _inherits(SideFlipper, _Flipper3);

  function SideFlipper(scene, x, y) {
    var _this3;

    _classCallCheck(this, SideFlipper);

    _this3 = _possibleConstructorReturn(this, _getPrototypeOf(SideFlipper).call(this, scene, x, y));
    _this3.blockOffsetX = 5;
    _this3.blockOffsetY = 40;
    _this3.blockRotation = -1.2;
    _this3.stopperOffsetX = -40;
    _this3.stopperOffsetY = -5;
    _this3.flipperLength = 70;
    _this3.torque = -_this3.torque;
    _this3.staticTorque = -_this3.staticTorque;

    _get(_getPrototypeOf(SideFlipper.prototype), "createComponents", _assertThisInitialized(_this3)).call(_assertThisInitialized(_this3));

    _get(_getPrototypeOf(SideFlipper.prototype), "setCollisionGroups", _assertThisInitialized(_this3)).call(_assertThisInitialized(_this3));

    return _this3;
  }

  _createClass(SideFlipper, [{
    key: "positionPin",
    value: function positionPin() {
      this.pin.pointA = {
        x: -5,
        y: 5
      };
      this.pin.pointB = {
        x: this.flipperLength / 2 - 3,
        y: 0
      };
      this.pin2.pointA = {
        x: -5,
        y: 5
      };
      this.pin2.pointB = {
        x: this.flipperLength / 2 - 3,
        y: 0
      };
    }
  }]);

  return SideFlipper;
}(Flipper);
//# sourceMappingURL=flipper.js.map
