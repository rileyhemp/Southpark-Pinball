"use strict";

function collisionHandler(event, bodyA, bodyB, scene) {
  if (bodyB.label === 'Ball') {
    //Kenny ramp
    if (bodyA.label === 'leftRampOn') {
      playRandomSound('kenny_hit', scene);
    } //Stan ramp


    if (bodyA.label === 'centerRampOn') {
      playRandomSound('stan_hit', scene);
      bodyB.isOnCenterRamp = true;
    } //Kyle ramp


    if (bodyA.label === 'rightRampOn') {
      playRandomSound('kyle_hit', scene);
    } //Generic ramp on


    if (bodyA.type === 'ramp-on') {
      bodyB.isOnRamp = true;
      bodyB.isOnPlastic = true;
    } //Generic ramp off


    if (bodyA.type === 'ramp-off') {
      setTimeout(function () {
        bodyB.isOnRamp = false;
        bodyB.isOnCenterRamp = false;
      }, 100);
    } //Launcher on / off


    if (bodyA.type === 'launcher-on') {
      bodyB.isOnLauncher = true;
    }

    if (bodyA.type === 'launcher-off') {
      bodyB.isOnLauncher = false;
    } //Slingshots


    if (bodyA.label === 'slingshotA') {
      slingshotA.fire();
    }

    if (bodyA.label === 'slingshotB') {
      slingshotB.fire();
    } //Pop bumpers


    if (bodyA.label === "bumper") {
      bodyA.gameObject.fire(bodyB.position);
      addScore(1000);
    } //Butters target 


    if (bodyA.label === 'butters') {
      registerHit(scene, bodyA.label, bodyB);
      addScore(10000);
      playRandomSound('butters_hit', scene);
    } //Rails 


    if (bodyA.type === 'rail') {
      scene.sound.playAudioSprite('sound_effects', 'WireRamp', {
        volume: 0.5
      });
      bodyB.isOnPlastic = false;
      addScore(5000);
    } //Rubbers 


    if (bodyA.label === 'rubber') {
      var sounds = ['rubber_hit_1', 'rubber_hit_2', 'rubber_hit_3'];
      scene.sound.playAudioSprite('sound_effects', sounds[Math.floor(Math.random() * 3)]);
    } //Flippers 


    if (bodyA.label === 'flipper') {
      var _sounds = ['flip_hit_1', 'flip_hit_2', 'flip_hit_3'];
      scene.sound.playAudioSprite('sound_effects', _sounds[Math.floor(Math.random() * _sounds.length)]);
    }
  }
} //Hit registration


function registerHit(scene, object, body) {
  if (object === 'butters') {
    scene.sound.playAudioSprite('sound_effects', 'hole_enter');
    body.render.visible = false;
    body.isDestroyed = true;
    body.destroy(); //Holds the ball for 1.5 seconds and shoots back to left flipper

    setTimeout(function () {
      ball = new Ball(scene, 340, 259, 'ball');
      ball.setVelocityY(3.3);
      ball.setVelocityX(-3.3);
      scene.sound.playAudioSprite('sound_effects', 'ExitSandman');
    }, 1500);
  }
}
//# sourceMappingURL=collision-handler.js.map
