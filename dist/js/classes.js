"use strict";

function _templateObject() {
  var data = _taggedTemplateLiteral(["", " is not a supported shape"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

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

    _get(_getPrototypeOf(Ball.prototype), "setScale", _assertThisInitialized(_this)).call(_assertThisInitialized(_this), .21);

    _get(_getPrototypeOf(Ball.prototype), "setCircle", _assertThisInitialized(_this)).call(_assertThisInitialized(_this), 8.75);

    _this.body.friction = 0; //this.body.frictionAir = 0.00001

    scene.sys.displayList.add(_assertThisInitialized(_this));

    _this.setCollisionCategory(collisionGroupA);

    _this.body.density = 0.25;

    _this.setDepth(1);

    _this.body.label = 'Ball';

    _this.killZoneCheck();

    return _this;
  }

  _createClass(Ball, [{
    key: "launch",
    value: function launch() {
      _get(_getPrototypeOf(Ball.prototype), "setVelocityY", this).call(this, -20.5);
    }
  }, {
    key: "killZoneCheck",
    value: function killZoneCheck() {
      var _this2 = this;

      var i = setInterval(function () {
        if (_this2.y > 720) {
          _this2.destroy();

          clearInterval(i);
        }
      }, 100);
    }
  }]);

  return Ball;
}(Phaser.Physics.Matter.Image);

var StaticShape =
/*#__PURE__*/
function () {
  function StaticShape(scene, type, x, y, width, height, rotation, collisionGroup) {
    _classCallCheck(this, StaticShape);

    this.body = {};
    this.scene = scene;
    this.type = type;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.rotation = rotation;
    this.drawShape(); //this.body.collisionFilter.category = collisionGroup
  }

  _createClass(StaticShape, [{
    key: "drawShape",
    value: function drawShape() {
      if (this.type === 'rectangle') {
        this.body = this.scene.matter.add.rectangle(this.x, this.y, this.width, this.height, {
          isStatic: true,
          angle: this.rotation
        });
      } else if (this.type === 'circle') {
        this.body = this.scene.matter.add.circle(this.x, this.y, this.width, {
          isStatic: true
        });
      } else {
        alert(_templateObject(), this.type);
      }
    }
  }]);

  return StaticShape;
}();

var StaticCustomShape =
/*#__PURE__*/
function (_Phaser$Physics$Matte2) {
  _inherits(StaticCustomShape, _Phaser$Physics$Matte2);

  function StaticCustomShape(scene, x, y, name, collisionGroup) {
    var _this3;

    _classCallCheck(this, StaticCustomShape);

    _this3 = _possibleConstructorReturn(this, _getPrototypeOf(StaticCustomShape).call(this, scene.matter.world, x, y, name));

    _this3.setExistingBody(Bodies.fromVertices(0, 0, PATHS["".concat(name)]));

    _this3.body.restitution = 0;

    _this3.setVisible(false);

    _this3.setStatic(true);

    _this3.x = x;
    _this3.y = y;

    _this3.setCollisionCategory(collisionGroup);

    return _this3;
  }

  return StaticCustomShape;
}(Phaser.Physics.Matter.Image);

var Bumper =
/*#__PURE__*/
function (_Phaser$Physics$Matte3) {
  _inherits(Bumper, _Phaser$Physics$Matte3);

  function Bumper(scene, x, y, name) {
    var _this4;

    _classCallCheck(this, Bumper);

    _this4 = _possibleConstructorReturn(this, _getPrototypeOf(Bumper).call(this, scene.matter.world, x, y, name));

    _this4.setCircle(24);

    _this4.setStatic(true);

    _this4.setScale(0.85);

    _this4.body.mass = .999;
    _this4.x = x;
    _this4.y = y;
    _this4.body.label = name;
    _this4.scene = scene;
    _this4.body.restitution = 1.5;
    console.log(_assertThisInitialized(_this4));
    return _this4;
  }

  _createClass(Bumper, [{
    key: "fire",
    value: function fire(position) {
      var _this5 = this;

      //Grab the starting position
      var startPosition = {
        x: this.x,
        y: this.y
      }; //Calculate the midpoint between the ball and bumper

      var targetX = (this.x + position.x) / 2;
      var targetY = (this.y + position.y) / 2; //Tween to that point

      this.scene.tweens.add({
        targets: this,
        x: targetX,
        y: targetY,
        yoyo: true,
        duration: 20
      }); //Reset the bumper after a brief delay

      setTimeout(function () {
        _this5.x = startPosition.x;
        _this5.y = startPosition.y;
      }, 50);
    }
  }]);

  return Bumper;
}(Phaser.Physics.Matter.Image);
//# sourceMappingURL=classes.js.map
