"use strict";

function preload() {
  //Table
  this.load.image('characters', 'dist/assets/table/characters.png');
  this.load.image('ramps', 'dist/assets/table/ramps.png');
  this.load.image('ramps_cartman_active', 'dist/assets/table/ramps-cartman-active.png');
  this.load.image('ramps_cartman_gate', 'dist/assets/table/ramps-cartman-gate.png');
  this.load.image('table', 'dist/assets/table/table.png');
  this.load.image('ball', 'dist/assets/table/ball.png');
  this.load.image('flipper', 'dist/assets/table/flipper.png');
  this.load.image('rightFlipper', 'dist/assets/table/right-flipper.png');
  this.load.image('sideFlipper', 'dist/assets/table/side-flipper.png'); //Lights

  this.load.image('blueArrowOff', 'dist/assets/table/lights/blue-arrow-off.png');
  this.load.image('blueArrowOn', 'dist/assets/table/lights/blue-arrow-on.png');
  this.load.image('redArrowOff', 'dist/assets/table/lights/red-arrow-off.png');
  this.load.image('redArrowOn', 'dist/assets/table/lights/red-arrow-on.png');
  this.load.image('greenArrowOff', 'dist/assets/table/lights/green-arrow-off.png');
  this.load.image('greenArrowOn', 'dist/assets/table/lights/green-arrow-on.png'); //Table Sounds

  this.load.audioSprite('sound_effects', 'dist/assets/sounds/sound_effects.json', ['dist/assets/sounds/sound_effects.ogg', 'dist/assets/sounds/sound_effects.mp3']);
  this.load.audio('ball_rolling', ['dist/assets/sounds/fx_ballrolling.ogg', 'dist/assets/sounds/fx_ballrolling.mp3']);
  this.load.audio('ramp_rolling', ['dist/assets/sounds/fx_plasticrolling.ogg', 'dist/assets/sounds/fx_plasticrolling.mp3']); //Music

  this.load.audio('background_music', ['dist/assets/sounds/background_music.ogg', 'dist/assets/sounds/character_sounds/background_music.mp3']);
  this.load.audioSprite('intro_music', 'dist/assets/sounds/intro-music.json', ['dist/assets/sounds/intro-music.ogg', 'dist/assets/sounds/intro-music.mp3']);
  this.load.audio('cartman_music', ['dist/assets/sounds/music/cartman_event.ogg', 'dist/assets/sounds/music/cartman_event.mp3']); //Generic Negative

  this.load.audioSprite('generic_negative', 'dist/assets/sounds/character_sounds/generic_negative.json', ['dist/assets/sounds/character_sounds/generic_negative.ogg', 'dist/assets/sounds/character_sounds/generic_negative.mp3']); //Generic Positive

  this.load.audioSprite('generic_positive', 'dist/assets/sounds/character_sounds/generic_positive.json', ['dist/assets/sounds/character_sounds/generic_positive.ogg', 'dist/assets/sounds/character_sounds/generic_positive.mp3']); //Cartman

  this.load.audioSprite('cartman_block', 'dist/assets/sounds/character_sounds/cartman_block.json', ['dist/assets/sounds/character_sounds/cartman_block.ogg', 'dist/assets/sounds/character_sounds/cartman_block.mp3']);
  this.load.audioSprite('cartman_damage', 'dist/assets/sounds/character_sounds/cartman_damage.json', ['dist/assets/sounds/character_sounds/cartman_damage.ogg', 'dist/assets/sounds/character_sounds/cartman_damage.mp3']);
  this.load.audioSprite('cartman_end', 'dist/assets/sounds/character_sounds/cartman_end.json', ['dist/assets/sounds/character_sounds/cartman_end.ogg', 'dist/assets/sounds/character_sounds/cartman_end.mp3']);
  this.load.audioSprite('cartman_start', 'dist/assets/sounds/character_sounds/cartman_start.json', ['dist/assets/sounds/character_sounds/cartman_start.ogg', 'dist/assets/sounds/character_sounds/cartman_start.mp3']); //Kenny

  this.load.audioSprite('kenny_hit', 'dist/assets/sounds/character_sounds/kenny_hit.json', ['dist/assets/sounds/character_sounds/kenny_hit.ogg', 'dist/assets/sounds/character_sounds/kenny_hit.mp3']); //Kyle

  this.load.audioSprite('kyle_hit', 'dist/assets/sounds/character_sounds/kyle_hit.json', ['dist/assets/sounds/character_sounds/kyle_hit.ogg', 'dist/assets/sounds/character_sounds/kyle_hit.mp3']); //Stan

  this.load.audioSprite('stan_hit', 'dist/assets/sounds/character_sounds/stan_hit.json', ['dist/assets/sounds/character_sounds/stan_hit.ogg', 'dist/assets/sounds/character_sounds/stan_hit.mp3']); //Butters

  this.load.audioSprite('butters_hit', 'dist/assets/sounds/character_sounds/butters_hit.json', ['dist/assets/sounds/character_sounds/butters_hit.ogg', 'dist/assets/sounds/character_sounds/butters_hit.mp3']); //Mr Hanky 

  this.load.audioSprite('loop_hit', 'dist/assets/sounds/character_sounds/loop_hit.json', ['dist/assets/sounds/character_sounds/loop_hit.ogg', 'dist/assets/sounds/character_sounds/loop_hit.mp3']); //Randy

  this.load.audioSprite('randy_hit', 'dist/assets/sounds/character_sounds/randy_hit.json', ['dist/assets/sounds/character_sounds/randy_hit.ogg', 'dist/assets/sounds/character_sounds/randy_hit.mp3']);
}
//# sourceMappingURL=preload.js.map
