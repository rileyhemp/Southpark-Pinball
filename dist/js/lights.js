"use strict";

function initLights(scene) {
  //Center ramp
  var centerOn = scene.add.image(208, 236, 'blueArrowOn').setDepth(0).setRotation(-0.18).setScale(0.75);
  var centerOff = scene.add.image(208, 236, 'blueArrowOff').setDepth(2).setRotation(-0.18).setScale(0.75); //Right ramp

  var rightOn = scene.add.image(300, 260, 'blueArrowOn').setDepth(0).setRotation(0.1).setScale(0.75);
  var rightOff = scene.add.image(300, 260, 'blueArrowOff').setDepth(2).setRotation(0.1).setScale(0.75); //Left ramp

  var leftOn = scene.add.image(230, 268, 'blueArrowOn').setDepth(0).setRotation(-.9).setScale(0.75);
  var leftOff = scene.add.image(230, 268, 'blueArrowOff').setDepth(2).setRotation(-.9).setScale(0.75); //Left loop

  var leftLoopOn = scene.add.image(150, 311, 'blueArrowOn').setDepth(0).setRotation(-.3).setScale(0.75);
  var leftLoopOff = scene.add.image(150, 311, 'blueArrowOff').setDepth(2).setRotation(-.3).setScale(0.75); //Right loop

  var rightLoopOn = scene.add.image(357, 317, 'blueArrowOn').setDepth(0).setRotation(.4).setScale(0.75);
  var rightLoopOff = scene.add.image(357, 317, 'blueArrowOff').setDepth(2).setRotation(.4).setScale(0.75); //Butters

  var buttersOn = scene.add.image(332, 291, 'greenArrowOn').setDepth(0).setRotation(.3).setScale(0.75);
  var buttersOff = scene.add.image(332, 291, 'greenArrowOff').setDepth(2).setRotation(.3).setScale(0.75); //Cartman

  var cartmanOneOn = scene.add.image(234, 245, 'redArrowOn').setDepth(0).setScale(0.5);
  var cartmanOneOff = scene.add.image(234, 245, 'redArrowOff').setDepth(2).setScale(0.5);
  var cartmanTwoOn = scene.add.image(257, 246, 'redArrowOn').setDepth(0).setScale(0.5);
  var cartmanTwoOff = scene.add.image(257, 246, 'redArrowOff').setDepth(2).setScale(0.5);
  var cartmanThreeOn = scene.add.image(279, 247, 'redArrowOn').setDepth(0).setScale(0.5);
  var cartmanThreeOff = scene.add.image(279, 247, 'redArrowOff').setDepth(2).setScale(0.5);
  lights = {
    'centerRamp': {
      hit: 0,
      active: false,
      on: centerOn,
      off: centerOff
    },
    'rightRamp': {
      hit: 0,
      active: false,
      on: rightOn,
      off: rightOff
    },
    'leftRamp': {
      hit: 0,
      active: false,
      on: leftOn,
      off: leftOff
    },
    'leftLoop': {
      hit: 0,
      active: false,
      on: leftLoopOn,
      off: leftLoopOff
    },
    'rightLoop': {
      hit: 0,
      active: false,
      on: rightLoopOn,
      off: rightLoopOff
    },
    'cartman': {
      'cartmanLeft': {
        hit: 0,
        active: false,
        on: cartmanOneOn,
        off: cartmanOneOff
      },
      'cartmanCenter': {
        hit: 0,
        active: false,
        on: cartmanTwoOn,
        off: cartmanTwoOff
      },
      'cartmanRight': {
        hit: 0,
        active: false,
        on: cartmanThreeOn,
        off: cartmanThreeOff
      }
    },
    'butters': {
      hit: 0,
      active: false,
      on: buttersOn,
      off: buttersOff
    },
    'cartmanBody': {
      hit: 0,
      active: false
    }
  }; // Interval that turns the lights on or off depending on the current state within the lights object

  Object.keys(lights).forEach(function (el) {
    var i = setInterval(function () {
      lights[el].on ? lights[el].hit ? lights[el].on.setDepth(3) : lights[el].on.setDepth(0) : null;
      lights[el].cartmanLeft ? lights[el].cartmanLeft.hit ? lights[el].cartmanLeft.on.setDepth(3) : lights[el].cartmanLeft.on.setDepth(0) : null;
      lights[el].cartmanCenter ? lights[el].cartmanCenter.hit ? lights[el].cartmanCenter.on.setDepth(3) : lights[el].cartmanCenter.on.setDepth(0) : null;
      lights[el].cartmanRight ? lights[el].cartmanRight.hit ? lights[el].cartmanRight.on.setDepth(3) : lights[el].cartmanRight.on.setDepth(0) : null;
    }, 16.667);
  });
}

function flashLights(id, after, duration) {
  //Set default duration
  duration === undefined ? duration = 1000 : null;
  var active = false;
  var endState = after;

  if (id === 'cartman') {
    var keys = ['cartmanLeft', 'cartmanCenter', 'cartmanRight'];
    lights[id].isFlashing = setInterval(function () {
      active ^= true;
      keys.forEach(function (el) {
        active ? lights[id][el].hit = 1 : lights[id][el].hit = 0;
      });
    }, 200);
  } else {
    lights[id].isFlashing = setInterval(function () {
      active ^= true;
      active > 0 ? lights[id].hit = 1 : lights[id].hit = 0;
    }, 200);
    setTimeout(function () {
      clearInterval(lights[id].isFlashing);
      lights[id].hit = endState;
    }, duration);
  }

  id === 'butters' ? buttersLightOn = true : null;
}

function clearLights() {
  Object.keys(lights).forEach(function (el) {
    rampsLit = 0;
    lights[el].hit = 0;
  });
}
//# sourceMappingURL=lights.js.map
