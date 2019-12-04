function preload() {
    //Table
    this.load.image('characters', 'dist/assets/table/characters.png')
    this.load.image('ramps', 'dist/assets/table/ramps.png')
    this.load.image('ramps_cartman_active', 'dist/assets/table/ramps-cartman-active.png')
    this.load.image('table', 'dist/assets/table/table.png')
    this.load.image('ball', 'dist/assets/table/ball.png')
    this.load.image('flipper', 'dist/assets/table/flipper.png')
    this.load.image('rightFlipper', 'dist/assets/table/right-flipper.png')
	this.load.image('sideFlipper', 'dist/assets/table/side-flipper.png')
	this.load.image('butters_arrow_off', 'dist/assets/table/lights/butters_arrow_off.png')
	this.load.image('butters_arrow_on', 'dist/assets/table/lights/butters_arrow_on.png')
	this.load.image('butters_circle_off', 'dist/assets/table/lights/butters_circle_off.png')
	this.load.image('butters_circle_on', 'dist/assets/table/lights/butters_circle_on.png')
	this.load.image('cartman_center_off', 'dist/assets/table/lights/cartman_center_off.png')
	this.load.image('cartman_center_on', 'dist/assets/table/lights/cartman_center_on.png')
	this.load.image('cartman_left_off', 'dist/assets/table/lights/cartman_left_off.png')
	this.load.image('cartman_left_on', 'dist/assets/table/lights/cartman_left_on.png')
	this.load.image('cartman_right_off', 'dist/assets/table/lights/cartman_right_off.png')
	this.load.image('cartman_right_on', 'dist/assets/table/lights/cartman_right_on.png')
	this.load.image('kenny1_off', 'dist/assets/table/lights/kenny1_off.png')
	this.load.image('kenny1_on', 'dist/assets/table/lights/kenny1_on.png')
	this.load.image('kenny2_off', 'dist/assets/table/lights/kenny2_off.png')
	this.load.image('kenny2_on', 'dist/assets/table/lights/kenny2_on.png')
	this.load.image('kenny3_off', 'dist/assets/table/lights/kenny3_off.png')
	this.load.image('kenny3_on', 'dist/assets/table/lights/kenny3_on.png')
	this.load.image('left_loop1_off', 'dist/assets/table/lights/left_loop1_off.png')
	this.load.image('left_loop1_on', 'dist/assets/table/lights/left_loop1_on.png')
	this.load.image('left_loop2_off', 'dist/assets/table/lights/left_loop2_off.png')
	this.load.image('left_loop2_on', 'dist/assets/table/lights/left_loop2_on.png')
	this.load.image('left_loop3_off', 'dist/assets/table/lights/left_loop3_off.png')
	this.load.image('left_loop3_on', 'dist/assets/table/lights/left_loop3_on.png')
	this.load.image('right_loop1_off', 'dist/assets/table/lights/right_loop1_off.png')
	this.load.image('right_loop1_on', 'dist/assets/table/lights/right_loop1_on.png')
	this.load.image('right_loop2_off', 'dist/assets/table/lights/right_loop2_off.png')
	this.load.image('right_loop3_off', 'dist/assets/table/lights/right_loop2_off-2.png')
	this.load.image('right_loop2_on', 'dist/assets/table/lights/right_loop2_on.png')
	this.load.image('right_loop3_on', 'dist/assets/table/lights/right_loop3_on.png')
	this.load.image('stan1_off copy', 'dist/assets/table/lights/stan1_off copy.png')
	this.load.image('stan1_off', 'dist/assets/table/lights/stan1_off.png')
	this.load.image('stan1_on copy', 'dist/assets/table/lights/stan1_on copy.png')
	this.load.image('stan1_on', 'dist/assets/table/lights/stan1_on.png')
	this.load.image('stan2_off copy', 'dist/assets/table/lights/stan2_off copy.png')
	this.load.image('stan2_off', 'dist/assets/table/lights/stan2_off.png')
	this.load.image('stan2_on copy', 'dist/assets/table/lights/stan2_on copy.png')
	this.load.image('stan2_on', 'dist/assets/table/lights/stan2_on.png')
	this.load.image('stan3_off copy', 'dist/assets/table/lights/stan3_off copy.png')
	this.load.image('stan3_off', 'dist/assets/table/lights/stan3_off.png')
	this.load.image('stan3_on_copy', 'dist/assets/table/lights/stan3_on_copy.png')
	this.load.image('stan3_on', 'dist/assets/table/lights/stan3_on.png')
   
    


    //Table Sounds
    this.load.audioSprite('sound_effects', 'dist/assets/sounds/sound_effects.json', 
        [ 
            'dist/assets/sounds/sound_effects.ogg', 
            'dist/assets/sounds/sound_effects.mp3'
        ]
    )
    this.load.audio('ball_rolling', 
        [
            'dist/assets/sounds/fx_ballrolling.ogg',
            'dist/assets/sounds/fx_ballrolling.mp3'
        ]
    )
    this.load.audio('ramp_rolling', 
        [
            'dist/assets/sounds/fx_plasticrolling.ogg',
            'dist/assets/sounds/fx_plasticrolling.mp3'
        ]
    )
    //Music
    this.load.audio('background_music', 
        [
            'dist/assets/sounds/background_music.ogg',
            'dist/assets/sounds/character_sounds/background_music.mp3'
		])
	this.load.audioSprite('intro_music', 'dist/assets/sounds/intro-music.json', 
        [
            'dist/assets/sounds/intro-music.ogg',
            'dist/assets/sounds/intro-music.mp3'
        ])
    this.load.audio('cartman_music',
        [
            'dist/assets/sounds/music/cartman_event.ogg',
            'dist/assets/sounds/music/cartman_event.mp3'
        ])
    //Generic Negative
    this.load.audioSprite('generic_negative', 'dist/assets/sounds/character_sounds/generic_negative.json',
        [
            'dist/assets/sounds/character_sounds/generic_negative.ogg', 
            'dist/assets/sounds/character_sounds/generic_negative.mp3'
        ]
    )
    //Generic Positive
    this.load.audioSprite('generic_positive', 'dist/assets/sounds/character_sounds/generic_positive.json',
        [
            'dist/assets/sounds/character_sounds/generic_positive.ogg', 
            'dist/assets/sounds/character_sounds/generic_positive.mp3'
        ]
    )
    //Cartman
    this.load.audioSprite('cartman_block', 'dist/assets/sounds/character_sounds/cartman_block.json',
        [
            'dist/assets/sounds/character_sounds/cartman_block.ogg', 
            'dist/assets/sounds/character_sounds/cartman_block.mp3'
        ]
    )
    this.load.audioSprite('cartman_damage', 'dist/assets/sounds/character_sounds/cartman_damage.json',
        [
            'dist/assets/sounds/character_sounds/cartman_damage.ogg', 
            'dist/assets/sounds/character_sounds/cartman_damage.mp3'
        ]
    )
    this.load.audioSprite('cartman_end', 'dist/assets/sounds/character_sounds/cartman_end.json',
        [
            'dist/assets/sounds/character_sounds/cartman_end.ogg', 
            'dist/assets/sounds/character_sounds/cartman_end.mp3'
        ]
    )
    this.load.audioSprite('cartman_start', 'dist/assets/sounds/character_sounds/cartman_start.json',
        [
            'dist/assets/sounds/character_sounds/cartman_start.ogg', 
            'dist/assets/sounds/character_sounds/cartman_start.mp3'
        ]
    )
    //Kenny
    this.load.audioSprite('kenny_hit', 'dist/assets/sounds/character_sounds/kenny_hit.json',
        [
            'dist/assets/sounds/character_sounds/kenny_hit.ogg', 
            'dist/assets/sounds/character_sounds/kenny_hit.mp3'
        ]
    )
    //Kyle
    this.load.audioSprite('kyle_hit', 'dist/assets/sounds/character_sounds/kyle_hit.json',
        [
            'dist/assets/sounds/character_sounds/kyle_hit.ogg', 
            'dist/assets/sounds/character_sounds/kyle_hit.mp3'
        ]
    )
    //Stan
    this.load.audioSprite('stan_hit', 'dist/assets/sounds/character_sounds/stan_hit.json',
        [
            'dist/assets/sounds/character_sounds/stan_hit.ogg', 
            'dist/assets/sounds/character_sounds/stan_hit.mp3'
        ]
    )    
    //Butters
    this.load.audioSprite('butters_hit', 'dist/assets/sounds/character_sounds/butters_hit.json',
        [
            'dist/assets/sounds/character_sounds/butters_hit.ogg', 
            'dist/assets/sounds/character_sounds/butters_hit.mp3'
        ]
    )     
    //Mr Hanky 
    this.load.audioSprite('loop_hit', 'dist/assets/sounds/character_sounds/loop_hit.json',
        [
            'dist/assets/sounds/character_sounds/loop_hit.ogg', 
            'dist/assets/sounds/character_sounds/loop_hit.mp3'
        ]
    )     
    //Randy
    this.load.audioSprite('randy_hit', 'dist/assets/sounds/character_sounds/randy_hit.json',
    [
        'dist/assets/sounds/character_sounds/randy_hit.ogg', 
        'dist/assets/sounds/character_sounds/randy_hit.mp3'
    ]
)    
}