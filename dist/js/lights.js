"use strict";

function initLights(scene) {
  //Stan
  var stan1_off = scene.add.image(216, 282, 'stan1_off').setDepth(2);
  var stan1_on = scene.add.image(216, 282, 'stan1_on').setDepth(0);
  var stan2_off = scene.add.image(226, 316, 'stan2_off').setDepth(2);
  var stan2_on = scene.add.image(226, 316, 'stan2_on').setDepth(0);
  var stan3_off = scene.add.image(237, 346, 'stan3_off').setDepth(2);
  var stan3_on = scene.add.image(237, 346, 'stan3_on').setDepth(0); //Kyle

  var kyle1_off = scene.add.image(300, 260, 'stan1_off copy').setDepth(2);
  var kyle1_on = scene.add.image(300, 260, 'stan1_on copy').setDepth(0);
  var kyle2_off = scene.add.image(295, 297, 'stan2_off copy').setDepth(2);
  var kyle2_on = scene.add.image(295, 297, 'stan2_on copy').setDepth(0);
  var kyle3_off = scene.add.image(290, 336, 'stan3_off copy').setDepth(2);
  var kyle3_on = scene.add.image(290, 336, 'stan3_on_copy').setDepth(0); //Butters

  var butters_arrow_off = scene.add.image(329, 284, 'butters_arrow_off').setDepth(2);
  var butters_arrow_on = scene.add.image(329, 284, 'butters_arrow_on').setDepth(0);
  var butters_circle_off = scene.add.image(319, 304, 'butters_circle_off').setDepth(2);
  var butters_circle_on = scene.add.image(319, 304, 'butters_circle_on').setDepth(0); //Cartman

  var cartman1_off = scene.add.image(234, 245, 'cartman_left_off').setDepth(2);
  var cartman1_on = scene.add.image(234, 245, 'cartman_left_on').setDepth(0);
  var cartman2_off = scene.add.image(257, 246, 'cartman_center_off').setDepth(2);
  var cartman2_on = scene.add.image(257, 246, 'cartman_center_on').setDepth(0);
  var cartman3_off = scene.add.image(279, 247, 'cartman_right_off').setDepth(2);
  var cartman3_on = scene.add.image(279, 247, 'cartman_right_on').setDepth(0); //Kenny

  var kenny1_off = scene.add.image(205, 252, 'kenny1_off').setDepth(2);
  var kenny1_on = scene.add.image(205, 252, 'kenny1_on').setDepth(0);
  var kenny2_off = scene.add.image(230, 264, 'kenny2_off').setDepth(2);
  var kenny2_on = scene.add.image(230, 264, 'kenny2_on').setDepth(0);
  var kenny3_off = scene.add.image(256, 277, 'kenny3_off').setDepth(2);
  var kenny3_on = scene.add.image(256, 277, 'kenny3_on').setDepth(0); //Left loop

  var left_loop1_off = scene.add.image(150, 311, 'left_loop1_off').setDepth(2);
  var left_loop1_on = scene.add.image(150, 311, 'left_loop1_on').setDepth(0);
  var left_loop2_off = scene.add.image(161, 343, 'left_loop2_off').setDepth(2);
  var left_loop2_on = scene.add.image(161, 343, 'left_loop2_on').setDepth(0);
  var left_loop3_off = scene.add.image(172, 373, 'left_loop3_off').setDepth(2);
  var left_loop3_on = scene.add.image(172, 373, 'left_loop3_on').setDepth(0); //Right loop

  var right_loop1_off = scene.add.image(360, 317, 'right_loop1_off').setDepth(2);
  var right_loop1_on = scene.add.image(360, 317, 'right_loop1_on').setDepth(0);
  var right_loop2_off = scene.add.image(344, 347, 'right_loop2_off').setDepth(2);
  var right_loop2_on = scene.add.image(344, 347, 'right_loop2_on').setDepth(0);
  var right_loop3_off = scene.add.image(329, 376, 'right_loop3_off').setDepth(2);
  var right_loop3_on = scene.add.image(329, 376, 'right_loop3_on').setDepth(0);
  lights = {
    'stan': {
      one: {
        active: false,
        on: stan1_on,
        off: stan1_off
      },
      two: {
        active: false,
        on: stan2_on,
        off: stan2_off
      },
      three: {
        active: false,
        on: stan3_on,
        off: stan3_off
      }
    },
    'kyle': {
      one: {
        active: false,
        on: kyle1_on,
        off: kyle1_off
      },
      two: {
        active: false,
        on: kyle2_on,
        off: kyle2_off
      },
      three: {
        active: false,
        on: kyle3_on,
        off: kyle3_off
      }
    },
    'kenny': {
      one: {
        active: false,
        on: kenny1_on,
        off: kenny1_off
      },
      two: {
        active: false,
        on: kenny2_on,
        off: kenny2_off
      },
      three: {
        active: false,
        on: kenny3_on,
        off: kenny3_off
      }
    },
    'cartman': {
      one: {
        active: false,
        on: cartman1_on,
        off: cartman1_off
      },
      two: {
        active: false,
        on: cartman2_on,
        off: cartman2_off
      },
      three: {
        active: false,
        on: cartman3_on,
        off: cartman3_off
      }
    },
    // 'butters': {
    //     one: {active: false, on: butters_arrow_on, off: butters_arrow_off},
    //     two: {active: false, on: butters_circle_on, off: butters_circle_off},
    // },
    'left loop': {
      one: {
        active: false,
        on: left_loop1_on,
        off: left_loop1_off
      },
      two: {
        active: false,
        on: left_loop2_on,
        off: left_loop2_off
      },
      three: {
        active: false,
        on: left_loop3_on,
        off: left_loop3_off
      }
    },
    'right loop': {
      one: {
        active: false,
        on: right_loop1_on,
        off: right_loop1_off
      },
      two: {
        active: false,
        on: right_loop2_on,
        off: right_loop2_off
      },
      three: {
        active: false,
        on: right_loop3_on,
        off: right_loop3_off
      }
    }
  }; // console.log(lights['left loop'])

  Object.keys(lights).forEach(function (el) {
    var i = setInterval(function () {
      lights[el].one.active ? lights[el].one.on.setDepth(2) : lights[el].one.on.setDepth(0);
      lights[el].two.active ? lights[el].two.on.setDepth(2) : lights[el].two.on.setDepth(0);
      lights[el].three ? lights[el].three.active ? lights[el].three.on.setDepth(2) : lights[el].three.on.setDepth(0) : null;
    }, 16.667);
  });
}

function flashLights(character, command) {
  var keys = ['one', 'two', 'three'];
  lights[character].areFlashing = setInterval(function () {
    keys.forEach(function (el) {
      lights[character][el].active ^= true;
    });
  }, 200);
}
/*
 butters_arrow_off.png
 butters_arrow_on.png
 butters_circle_off.png
 butters_circle_on.png
 cartman_center_off.png
 cartman_center_on.png
 cartman_left_off.png
 cartman_left_on.png
 cartman_right_off.png
 cartman_right_on.png
 kenny1_off.png
 kenny1_on.png
 kenny2_off.png
 kenny2_on.png
 kenny3_off.png
 kenny3_on.png
 left_loop1_off.png
 left_loop1_on.png
 left_loop2_off.png
 left_loop2_on.png
 left_loop3_off.png
 left_loop3_on.png
 right_loop1_off.png
 right_loop1_on.png
 right_loop2_off.png
 right_loop2_off-2.png
 right_loop2_on.png
 right_loop3_on.png
'stan1_off copy.png'
 stan1_off.png
'stan1_on copy.png'
 stan1_on.png
'stan2_off copy.png'
 stan2_off.png
'stan2_on copy.png'
 stan2_on.png
'stan3_off copy.png'
 stan3_off.png
 stan3_on.png
 stan3_on_copy.png */
//# sourceMappingURL=lights.js.map
