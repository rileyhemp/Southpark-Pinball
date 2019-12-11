"use strict";

function startEvent(name, scene) {
  switch (name) {
    case "cartman":
      var duration = 14500;
      startCartman(scene);
      setTimeout(function () {
        lights['cartmanBody'].hit > 4 ? endCartman(scene, 'win') : endCartman(scene, 'loss');
      }, duration);
  }
}

function startCartman(scene) {
  cartmanCanStart = false;
  flashLights('cartman');
  alert('Hit Cartman', 4000);
  scene.sound.playAudioSprite('sound_effects', 'Drain');
  playRandomSound('cartman_start', scene, 500);
  rampsCartmanGate.setDepth(0); //Reset the counter
  //Open the cartman ramp once all targets are hit

  var targets = [cartmanRight, cartmanLeft, cartmanCenter, cartmanBlock];

  for (var target in targets) {
    targets[target].object.setCollidesWith(collisionGroupD);
  }
}

function endCartman(scene, result) {
  lights.cartman.cartmanLeft.hit = 0;
  lights.cartman.cartmanCenter.hit = 0;
  lights.cartman.cartmanRight.hit = 0;
  clearInterval(lights.cartman.isFlashing);
  rampsCartmanGate.setDepth(2);

  if (result === 'win') {
    addScore('cartman-win');
    alert('Defeated Cartman - 1,000,000', 2000);
    playRandomSound('cartman_end', scene, 500);
  } else {
    alert('Cartman Failed', 2000);
  }

  lights['cartmanBody'].hit = 0;
  scene.sound.playAudioSprite('sound_effects', 'kicker_enter_center');
  var targets = [cartmanRight, cartmanLeft, cartmanCenter, cartmanBlock];

  for (var target in targets) {
    targets[target].object.setCollidesWith(collisionGroupA);
  }

  cartmanCanStart = true;
}
//# sourceMappingURL=events.js.map
