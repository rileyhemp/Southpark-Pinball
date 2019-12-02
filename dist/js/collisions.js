"use strict";

function initCollisionListeners(scene) {
  scene.matter.world.on('collisionstart', function (event, bodyA, bodyB) {
    if (bodyB.label === 'Ball') {
      //Butters target 
      if (bodyA.label === 'butters') {
        registerHit(scene, bodyA.label, bodyB);
      } //Generic ramp on


      if (bodyA.type === 'ramp-on') {
        bodyB.isOnRamp = true;
        bodyB.isOnPlastic = true;
      }

      if (bodyA.label === 'leftRampOn') {
        bodyB.isOnPlastic = true;
      }

      if (bodyA.label === 'cartman-himself') {
        registerHit(scene, bodyA.type, bodyA.label);
      }

      if (bodyA.label === 'rightTargets') {
        registerHit(scene, bodyA.label);
      }
    }
  });
  scene.matter.world.on('collisionend', function (event, bodyA, bodyB) {
    if (bodyB.label === 'Ball') {
      //Kenny ramp
      if (bodyA.label === 'leftRampHit' && !bodyB.isOnCenterRamp) {
        playRandomSound('kenny_hit', scene);
      } //Stan ramp


      if (bodyA.label === 'centerRampHit') {
        playRandomSound('stan_hit', scene);
      } //Kyle ramp


      if (bodyA.label === 'rightRampHit') {
        playRandomSound('kyle_hit', scene);
      } //Cartman targets 


      if (bodyA.type === 'cartman-hit') {
        registerHit(scene, bodyA.type, bodyA.label);
      }

      if (bodyA.label === 'centerRampOn') {
        bodyB.isOnCenterRamp = true;
      }

      if (bodyA.type === 'loop-hit') {
        registerHit(scene, bodyA.type);
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
      }

      if (bodyA.type === 'all-ramps-off') {
        bodyB.isOnRamp = false;
        bodyB.isOnCenterRamp = false;
        bodyB.isOnPlastic = false;
      } //Launcher on / off


      if (bodyA.type === 'launcher-on') {
        bodyB.isOnLauncher = true;
      }

      if (bodyA.type === 'launcher-off') {
        bodyB.isOnLauncher = false;
      } //Slingshots


      if (bodyA.label === 'leftSlingshot') {
        leftSlingshot.fire();
      }

      if (bodyA.label === 'rightSlingshot') {
        rightSlingshot.fire();
      } //Pop bumpers


      if (bodyA.label === "bumper") {
        bodyA.gameObject.fire(bodyB.position);
        addScore('bumper');
      } //Rails 


      if (bodyA.type === 'rail') {
        scene.sound.playAudioSprite('sound_effects', 'WireRamp', {
          volume: 0.5
        });
        bodyB.isOnPlastic = false;
        addScore('ramp');
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
  });
}
//# sourceMappingURL=collisions.js.map
