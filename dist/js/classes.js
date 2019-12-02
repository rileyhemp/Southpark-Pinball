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

    _get(_getPrototypeOf(Ball.prototype), "setScale", _assertThisInitialized(_this)).call(_assertThisInitialized(_this), .8);

    _get(_getPrototypeOf(Ball.prototype), "setCircle", _assertThisInitialized(_this)).call(_assertThisInitialized(_this), 8.75);

    _this.id = _this.body.id;
    _this.scene = scene;
    _this.body.label = 'Ball';

    _this.setupBall();

    _this.update();

    return _this;
  }

  _createClass(Ball, [{
    key: "setupBall",
    value: function setupBall() {
      this.setCollisions('table');
      this.body.hasCollided = false;
      this.body.isOnRamp = false;
      this.body.isOnCenterRamp = false;
      this.body.isOnLauncher = false;
      this.body.friction = 0;
      this.body.frictionAir = 0;
      this.body.inertia = Infinity;
      this.setDensity(.001);
      this.setDepth(1);
      this.setCollisionCategory(collisionGroupA);
      balls.push(this.body); //Add the ball to the display list

      this.scene.sys.displayList.add(this); //Add sound

      this.table_sfx = this.scene.sound.add('ball_rolling', {
        loop: true
      });
      this.ramp_sfx = this.scene.sound.add('ramp_rolling', {
        loop: true
      });
      this.table_sfx.play();
      this.ramp_sfx.play();
    }
  }, {
    key: "setCollisions",
    value: function setCollisions(level) {
      //Changes what the ball can collide with depending on where it is
      if (level === 'table') {
        this.setCollidesWith([collisionGroupA, collisionGroupB, collisionGroupD, sensorGroupA]);
      } else if (level === 'launcher') {
        this.setCollidesWith([collisionGroupA, collisionGroupB, collisionGroupE, sensorGroupA]);
      } else if (level === 'ramps') {
        this.setCollidesWith([collisionGroupA, collisionGroupC, collisionGroupE, sensorGroupB]);
      } else if (level === 'centerRamp') {
        this.setCollidesWith([collisionGroupA, collisionGroupC, collisionGroupD, sensorGroupB]);
      }
    }
  }, {
    key: "readyBall",
    value: function readyBall() {
      this.x = 455;
      this.y = 689;
    }
  }, {
    key: "update",
    value: function update() {
      var _this2 = this;

      var i = setInterval(function () {
        //Changes sound when ball is on a ramp
        if (_this2.body.isOnPlastic) {
          _this2.table_sfx.volume = 0;
          _this2.ramp_sfx.volume = .25;
        } //Sets the volume of the ball rolling to the balls speed. 
        else {
            _this2.ramp_sfx.volume = 0;
            _this2.table_sfx.volume = _this2.body.speed / 8;
          } //Check if the ball is on a ramp


        if (_this2.body.isOnRamp && _this2.body.isOnCenterRamp) {
          _this2.setCollisions('centerRamp');

          _this2.setDepth(3);
        } else if (_this2.body.isOnRamp) {
          _this2.setCollisions('ramps');

          _this2.setDepth(3);
        } else if (!_this2.body.isOnRamp && _this2.body.isOnLauncher) {
          _this2.setCollisions('launcher');

          _this2.setDepth(1);
        } else {
          _this2.setCollisions('table');

          _this2.setDepth(1);
        } //Checks if the ball has escaped the map


        if (_this2.x < 0 || _this2.x > game.config.width || _this2.y < 0 || _this2.y > game.config.height) {
          _this2.readyBall();
        } //Check if the ball is in a killzone


        if (_this2.x < 425 && _this2.y > 650 && (_this2.x < 192 || _this2.x > 330) || _this2.y > 720) {
          balls.pop();

          _this2.destroy();

          _this2.table_sfx.stop();

          _this2.ramp_sfx.stop();

          clearInterval(i);
        }
      }, 16.66666);
    }
  }]);

  return Ball;
}(Phaser.Physics.Matter.Image);

var StaticShape =
/*#__PURE__*/
function () {
  function StaticShape(scene, type, x, y, width, height, rotation, collisionGroup, label) {
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

    this.object = this.scene.matter.add.image(this.x, this.y, null).setExistingBody(this.body).setVisible(false);
    this.object.setCollisionCategory(collisionGroup);
    this.body.label = label;
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
    _this3.body.label = "StaticCustomShape";

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

    _this4.setScale(0.75);

    _this4.body.mass = .999;
    _this4.x = x;
    _this4.y = y;
    _this4.body.label = name;
    _this4.scene = scene;
    _this4.body.restitution = 1;

    _this4.setCollisionCategory(collisionGroupB);

    _this4.canAnimate = true;
    _this4.canPlaySound = true;
    return _this4;
  }

  _createClass(Bumper, [{
    key: "fire",
    value: function fire(position) {
      var _this5 = this;

      var sounds = ['Bumper', 'BumperLeft', 'BumperMiddle', 'BumperRight'];

      if (this.canAnimate) {
        this.scene.sound.playAudioSprite('sound_effects', sounds[Math.floor(Math.random() * sounds.length)]);
        this.scene.sound.playAudioSprite('sound_effects', 'bell_ding', {
          volume: 0.2
        }); //Restrict firing

        this.canAnimate = false; //Grab the starting position

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
          duration: 20,
          repeat: 0
        }); //Move the bumper back to the starting position and un-restrict firing. 

        setTimeout(function () {
          _this5.x = startPosition.x;
          _this5.y = startPosition.y;
          setTimeout(function () {
            _this5.canAnimate = true;
          }, 100);
        }, 40);
      }
    }
  }]);

  return Bumper;
}(Phaser.Physics.Matter.Image);

var Sensor =
/*#__PURE__*/
function (_StaticShape) {
  _inherits(Sensor, _StaticShape);

  function Sensor(scene, x, y, width, height, rotation, type, name, collisionGroup) {
    var _this6;

    _classCallCheck(this, Sensor);

    _this6 = _possibleConstructorReturn(this, _getPrototypeOf(Sensor).call(this, scene, 'rectangle', x, y, width, height, rotation, collisionGroup));
    _this6.body.isSensor = true;
    _this6.body.type = type;
    _this6.body.label = name;
    return _this6;
  }

  return Sensor;
}(StaticShape);

var Launcher =
/*#__PURE__*/
function () {
  function Launcher(scene, x, y) {
    _classCallCheck(this, Launcher);

    this.x = x;
    this.y = y;
    this.scene = scene;
    this.createComponents();
  }

  _createClass(Launcher, [{
    key: "createComponents",
    value: function createComponents() {
      //Create a dynamic body for the top
      var rectA = Phaser.Physics.Matter.Matter.Bodies.circle(this.x, this.y, 15);
      var body = this.scene.matter.body.create({
        parts: [rectA]
      });
      this.top = this.scene.matter.add.image(150, 0, null).setExistingBody(body).setVisible(false);
      this.top.setCollisionCategory(collisionGroupA);
      this.top.setCollidesWith(collisionGroupA);
      this.top.body.inertia = Infinity;
      this.bottom = new StaticShape(this.scene, 'rectangle', this.x, this.y + 50, 40, 20, 0, collisionGroupA);
      this.left = new StaticShape(this.scene, 'rectangle', this.x - 10, this.y, 10, 100, 0, collisionGroupA);
      this.right = new StaticShape(this.scene, 'rectangle', this.x + 10, this.y, 10, 100, 0, collisionGroupA);
      this.spring = this.scene.matter.add.constraint(this.bottom, this.top);
      this.spring.length = 90;
    }
  }, {
    key: "charge",
    value: function charge() {
      var _this7 = this;

      backgroundMusic.play(); //Pulls back the spring until it reaches desired length

      this.update = setInterval(function () {
        _this7.spring.length--;

        if (_this7.spring.length < 70) {
          clearInterval(_this7.update);
        }
      }, 40);
    }
  }, {
    key: "fire",
    value: function fire() {
      var _this8 = this;

      //Play sound
      this.scene.sound.playAudioSprite('sound_effects', "Plunger"); //Stop pulling the spring back

      clearInterval(this.update);
      this.scene.tweens.add({
        targets: this.spring,
        length: 102,
        duration: 20
      }); //Reset the spring

      setTimeout(function () {
        _this8.spring.length = 90;
      }, 50);
    }
  }]);

  return Launcher;
}();
//# sourceMappingURL=classes.js.map
