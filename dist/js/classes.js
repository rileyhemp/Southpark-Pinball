"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _templateObject() {
  var data = _taggedTemplateLiteral(["", " is not a supported shape"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

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
    this.drawShape();
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
function (_Phaser$Physics$Matte) {
  _inherits(StaticCustomShape, _Phaser$Physics$Matte);

  function StaticCustomShape(scene, x, y, name, collisionGroup) {
    var _this;

    _classCallCheck(this, StaticCustomShape);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(StaticCustomShape).call(this, scene.matter.world, x, y, name));

    _this.setExistingBody(Bodies.fromVertices(0, 0, PATHS["".concat(name)]));

    _this.body.restitution = 0;
    _this.body.label = name;

    _this.setVisible(false);

    _this.setStatic(true);

    _this.x = x;
    _this.y = y;

    _this.setCollisionCategory(collisionGroup);

    return _this;
  }

  return StaticCustomShape;
}(Phaser.Physics.Matter.Image);

var Bumper =
/*#__PURE__*/
function (_Phaser$Physics$Matte2) {
  _inherits(Bumper, _Phaser$Physics$Matte2);

  function Bumper(scene, x, y, name) {
    var _this2;

    _classCallCheck(this, Bumper);

    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(Bumper).call(this, scene.matter.world, x, y, name));

    _this2.setCircle(24);

    _this2.setStatic(true);

    _this2.setScale(0.75);

    _this2.body.mass = .999;
    _this2.x = x;
    _this2.y = y;
    _this2.body.label = name;
    _this2.scene = scene;
    _this2.body.restitution = 1;

    _this2.setCollisionCategory(collisionGroupB);

    _this2.canAnimate = true;
    _this2.canPlaySound = true;
    return _this2;
  }

  _createClass(Bumper, [{
    key: "fire",
    value: function fire(position) {
      var _this3 = this;

      var sounds = ['Bumper', 'BumperLeft', 'BumperMiddle', 'BumperRight'];

      if (this.canAnimate) {
        //Play a random bumper sound & a bell
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
        }); //Move the bumper back to the starting position and un-restrict firing shortly thereafter. 

        setTimeout(function () {
          _this3.x = startPosition.x;
          _this3.y = startPosition.y;
          setTimeout(function () {
            _this3.canAnimate = true;
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
    var _this4;

    _classCallCheck(this, Sensor);

    _this4 = _possibleConstructorReturn(this, _getPrototypeOf(Sensor).call(this, scene, 'rectangle', x, y, width, height, rotation, collisionGroup));
    _this4.body.isSensor = true;
    _this4.body.type = type;
    _this4.body.label = name;
    return _this4;
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
      //Create the top of the launcher
      var rectA = Phaser.Physics.Matter.Matter.Bodies.circle(this.x, this.y, 15);
      var body = this.scene.matter.body.create({
        parts: [rectA]
      });
      this.top = this.scene.matter.add.image(150, 0, null).setExistingBody(body).setVisible(false);
      this.top.setCollisionCategory(collisionGroupA);
      this.top.setCollidesWith(collisionGroupA);
      this.top.body.inertia = Infinity; //Create the rest of the launcher

      this.bottom = new StaticShape(this.scene, 'rectangle', this.x, this.y + 50, 40, 20, 0, collisionGroupA);
      this.left = new StaticShape(this.scene, 'rectangle', this.x - 10, this.y, 10, 100, 0, collisionGroupA);
      this.right = new StaticShape(this.scene, 'rectangle', this.x + 10, this.y, 10, 100, 0, collisionGroupA);
      this.spring = this.scene.matter.add.constraint(this.bottom, this.top);
      this.spring.length = 90;
    }
  }, {
    key: "charge",
    value: function charge() {
      var _this5 = this;

      //Starts the music
      backgroundMusic.play(); //Pulls back the spring until it reaches desired length

      this.update = setInterval(function () {
        _this5.spring.length--;

        if (_this5.spring.length < 70) {
          clearInterval(_this5.update);
        }
      }, 40);
    }
  }, {
    key: "fire",
    value: function fire() {
      var _this6 = this;

      //Play sound
      this.scene.sound.playAudioSprite('sound_effects', "Plunger"); //Stop pulling the spring back

      clearInterval(this.update); //Tween back to the starting position. The time is constant, so the greater distance the greater the impact. 

      this.scene.tweens.add({
        targets: this.spring,
        length: 102,
        duration: 20
      }); //Reset the spring

      setTimeout(function () {
        _this6.spring.length = 90;
      }, 50);
    }
  }]);

  return Launcher;
}();
//# sourceMappingURL=classes.js.map
