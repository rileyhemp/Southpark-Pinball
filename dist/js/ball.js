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

    _get(_getPrototypeOf(Ball.prototype), "setScale", _assertThisInitialized(_this)).call(_assertThisInitialized(_this), .8);

    _get(_getPrototypeOf(Ball.prototype), "setCircle", _assertThisInitialized(_this)).call(_assertThisInitialized(_this), 8.75);

    _this.id = _this.body.id;
    _this.scene = scene;
    _this.body.label = 'Ball';

    _this.setupBall();

    _this.update();

    _this.body.isInMotion = false;
    _this.body.currentScore = 0;
    _this.body.combo = 0;
    return _this;
  }

  _createClass(Ball, [{
    key: "setupBall",
    value: function setupBall() {
      this.body.friction = 0;
      this.body.frictionAir = 0;
      this.setDensity(.001);
      this.setDepth(1); //Set what the ball can collide with

      this.setCollisions('table'); //Set the ball's own collision category

      this.setCollisionCategory(collisionGroupA); //Initialize variables 

      this.body.isOnRamp = false;
      this.body.isOnCenterRamp = false;
      this.body.isOnLauncher = false;
      this.ballIdleDuration = 0; //Add ball to array

      balls.push(this.body); //Add the ball to the display list

      this.scene.sys.displayList.add(this); //Add rolling table sounds

      this.table_sfx = this.scene.sound.add('ball_rolling', {
        loop: true
      });
      this.table_sfx.play(); //Add rolling ramp sounds

      this.ramp_sfx = this.scene.sound.add('ramp_rolling', {
        loop: true
      });
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
      //Loads a ball on the launcher
      this.setVelocityX(0);
      this.setVelocityY(0);
      this.x = 455;
      this.y = 689;
    }
  }, {
    key: "update",
    value: function update() {
      var _this2 = this;

      //Watch for changes
      var i = setInterval(function () {
        //Changes sound when ball is on a ramp
        if (_this2.body.isOnPlastic) {
          _this2.table_sfx.volume = 0;
          _this2.ramp_sfx.volume = .1;
        } //Sets the volume of the ball rolling to the balls speed. 
        else {
            _this2.ramp_sfx.volume = 0;
            _this2.table_sfx.volume = _this2.body.speed / 8.5;
          }

        if (_this2.body.position.x === _this2.body.positionPrev.x) {
          _this2.ballIdleDuration++;
        } else {
          _this2.ballIdleDuration = 0;
        } // if ( this.body.position.y < 700 && this.ballIdleDuration > 200 )
        // {
        //     this.body.applyForce(1,1)
        // }
        //Kills the sound if the ball has been destroyed (by butters' target)


        if (_this2.body.isDestroyed) {
          _this2.table_sfx.stop();

          _this2.ramp_sfx.stop();
        }

        if (_this2.body.combo < 3) {
          multiplier = 1;
        }

        if (_this2.body.combo >= 3) {
          multiplier = 2; //Alert
        }

        if (_this2.body.combo > 4) {
          multiplier = 3;
        }

        if (_this2.body.combo > 5) {
          multiplier = 4;
        } //Check balls location and adjusts collision groups accordingly


        if (_this2.body.isOnRamp && _this2.body.isOnCenterRamp) {
          _this2.setCollisions('centerRamp');

          _this2.setDepth(5);
        } else if (_this2.body.isOnRamp) {
          _this2.setCollisions('ramps');

          _this2.setDepth(5);
        } else if (!_this2.body.isOnRamp && _this2.body.isOnLauncher) {
          _this2.setCollisions('launcher');

          _this2.setDepth(4);
        } else {
          _this2.setCollisions('table');

          _this2.setDepth(4);
        } //Keeps the ball from spinning


        _this2.body.angle = 0; //Checks if the ball is traveling at a certain speed. 
        //This is for registering missed / made shots and tracking combos. 
        //See collisions.js for the rest of the code. 

        _this2.body.speed > 12 ? _this2.body.isInMotion = true : null; //Check if the ball is in a killzone

        if (_this2.x < 425 && _this2.y > 650 && (_this2.x < 192 || _this2.x > 330) || _this2.y > 720) {
          balls.pop();

          _this2.scene.sound.playAudioSprite('sound_effects', 'Drain'); //playRandomSound('generic_negative', this.scene, 400)


          _this2.table_sfx.stop();

          _this2.ramp_sfx.stop();

          _this2.destroy();

          clearInterval(i);
        }
      }, 16.66666);
    }
  }]);

  return Ball;
}(Phaser.Physics.Matter.Image);
//# sourceMappingURL=ball.js.map
