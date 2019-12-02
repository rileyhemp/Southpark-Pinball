"use strict";

function startEvent(name, scene) {
  switch (name) {
    case "cartman":
      var duration = 14500;
      startCartman(scene);
      setTimeout(function () {
        objectives['cartman-himself'] > 4 ? endCartman(scene, 'win') : endCartman(scene, 'loss');
      }, duration);
  }
}

function startCartman(scene) {
  eventMusic = scene.sound.add('cartman_music');
  setTimeout(function () {
    backgroundMusic ? backgroundMusic.pause() : null;
    eventMusic.play();
    scene.tweens.add({
      targets: eventMusic,
      volume: {
        from: 0,
        to: 1
      },
      duration: 1000
    });
  }, 2000);
  scene.sound.playAudioSprite('sound_effects', 'Drain');
  playRandomSound('cartman_start', scene, 500);
  rampsCartmanActive.setDepth(2);
  ramps.setDepth(0); //Reset the counter

  objectives['cartman-left'] = 0;
  objectives['cartman-center'] = 0;
  objectives['cartman-right'] = 0; //Open the cartman ramp

  var targets = [cartmanRight, cartmanLeft, cartmanCenter, cartmanBlock];

  for (var target in targets) {
    targets[target].object.setCollidesWith(collisionGroupD);
  }
}

function endCartman(scene, result) {
  eventMusic.stop();

  if (result === 'win') {
    addScore('cartman-win');
    playRandomSound('cartman_end', scene, 500);
  } else {
    playRandomSound('generic_negative', scene, 500);
  }

  objectives['cartman-himself'] = 0;
  rampsCartmanActive.setDepth(0);
  ramps.setDepth(2);
  scene.sound.playAudioSprite('sound_effects', 'kicker_enter_center');
  var targets = [cartmanRight, cartmanLeft, cartmanCenter, cartmanBlock];

  for (var target in targets) {
    targets[target].object.setCollidesWith(collisionGroupA);
  }
}
//# sourceMappingURL=events.js.map
