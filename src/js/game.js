
//Initial config

const config = {
    type: Phaser.CANVAS,
    width: 520,
    height: 800,
    physics: {
        default: 'matter',
        matter: {
            debug: false,
            gravity: {
                x: 0,
                y: .9
            }
        }
    },
    scene: {
        preload: preload, 
        create: create,
        update: update 
    }
}

//Declare global variables 

const Bodies = Phaser.Physics.Matter.Matter.Bodies

let balls = []
let ballsRemaining = 3

let 
    spacebar, 
    left,
    right,
    down,
    ball, 
    bounds, 
    leftFlipper, 
    rightFlipper, 
    sideFlipper,
    launcher,
    bumperA, bumperB, bumperC,
    slingshotA, slingshotB,

    //Background
    playfield,
    plastics,
    table,
    ramps,
    characters,

    //Utilities
    collisionGroupA, collisionGroupB, collisionGroupC, collisionGroupD, collisionGroupE,
    sensorGroupA, sensorGroupB,
    leftRampDivert, // Default: false
    leftRampDiverter, 
    leftRampBottom,
    flipperCollisionGroup,
    test,
    tween,
    testFlipper,
    ballRolling,
    gameActive,
    score,
    multiplier
    
const game = new Phaser.Game(config)

//Load assets

function preload() {
    //Table
    this.load.image('characters', 'dist/assets/table/characters.png')
    this.load.image('ramps', 'dist/assets/table/ramps.png')
    this.load.image('table', 'dist/assets/table/table.png')
    this.load.image('ball', 'dist/assets/table/ball.png')
    this.load.image('flipper', 'dist/assets/table/flipper.png')
    this.load.image('rightFlipper', 'dist/assets/table/right-flipper.png')
    this.load.image('sideFlipper', 'dist/assets/table/side-flipper.png')
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
    //Character Sounds

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
}

function newGame(scene)
{
    gameActive = true
    score = 0
    multiplier = 1
    getNewBall(scene)
}

function endGame()
{
    console.log('game over')
    score = 0
}

function getNewBall(scene)
{
    ball = new Ball(scene, 455, 689, 'ball') 
    scene.sound.playAudioSprite('sound_effects', "rollover")
        ballsRemaining--
        document.querySelector('.balls-remaining').textContent = ballsRemaining
}

function addScore(amount)
{
    let total = amount * multiplier
    score += total
    document.querySelector('.score').textContent = score
}

function playRandomSound(sprite, scene)
{
    let spritemap = Object.keys(scene.cache.json.get(sprite).spritemap)
    scene.sound.playAudioSprite(sprite, spritemap[Math.floor(Math.random()*spritemap.length)])
}

//Initialize table

function create() {

    this.matter.world.positionIterations = 10
    this.matter.world.velocityIterations = 10

    //Set some things up, inputs, collisiongroups, etc. 
    sensorGroupA = this.matter.world.nextCategory() // Ground level sensors
    sensorGroupB = this.matter.world.nextCategory() // Upper level sensors
    collisionGroupA = this.matter.world.nextCategory() // Ball
    collisionGroupB = this.matter.world.nextCategory() // Walls
    collisionGroupC = this.matter.world.nextCategory()
    collisionGroupD = this.matter.world.nextCategory()
    collisionGroupE = this.matter.world.nextCategory()
    flipperCollisionGroup = this.matter.world.nextCategory()
    leftRampDivert = false
    //test = this
    bounds = this.matter.world.setBounds(0, 0, 520, 800, 30, true, true, true, true)
    left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
    down = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)
    right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
    spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    let ballHasCollided = false

    //Utility functions
    test = this
    //Add a ball where you click
    this.input.on('pointerdown', function(pointer)
    {
        // console.log(pointer.x, ',', pointer.y)
        // //ball.readyBall()
        ball = new Ball(this, pointer.x, pointer.y, 'ball') 
        ball.setVelocityY(-15)
        // ball.setVelocityX(-5)
        //newGame(this)
    }, this)

    //Textures
    table = this.add.image(260, 400, 'table')
    table.setDepth(1)
    ramps = this.add.image(260, 400, 'ramps')
    ramps.setDepth(2)
    characters = this.add.image(260, 400, 'characters')
    characters.setDepth(4)
    
    //Flippers
    leftFlipper = new LeftFlipper(this, 150, 632) 
    rightFlipper = new RightFlipper(this, 327, 632)
    sideFlipper = new SideFlipper(this, 407, 313)

    //Pop bumpers
    bumperA = new Bumper(this, 308, 125, 'bumper')
    bumperB = new Bumper(this, 365, 135, 'bumper')
    bumperC = new Bumper(this, 335, 190, 'bumper')

    //Slingshots
    slingshotA = new Slingshot(this, 121, 490, 152, 574, 177, 510, 5, 'slingshotA')
    slingshotB = new Slingshot(this, 353, 491, 324, 574, 298, 510, 5, 'slingshotB')
    // slingshotA = new Slingshot(this, 137, 533, 'rightSlingshot', collisionGroupB)
    // slingshotB = new Slingshot(this, 340, 533, 'leftSlingshot', collisionGroupB)

    //Launcher
    launcher = new Launcher(this, 455, 755)
    
    //Static Objects
    /*********************************************************/
    //StaticCustomShape(scene, x, y, path, collision group)
    //StaticShape(scene, type, x, y, width, height, rotation, collision group)

    //First level (collision group B)
    //new StaticCustomShape(this, 218, 90, 'midTargetLeft', collisionGroupB)
    new StaticCustomShape(this, 250, 740, 'killZone', collisionGroupB).setScale(0.9, 1)
    new StaticCustomShape(this, 147, 200, 'topLoop', collisionGroupB).setScale(0.85, 0.9)
    new StaticCustomShape(this, 155, 244, 'leftRampLeft', collisionGroupB).setScale(0.82, 1)
    new StaticCustomShape(this, 155, 244, 'leftRampLeft', collisionGroupC).setScale(0.82, 1)
    new StaticCustomShape(this, 152, 134, 'leftLoopTop', collisionGroupB).setAngle(11)
    new StaticShape(this, 'rectangle', 247, 95, 135, 15, 6.15, collisionGroupB) // top loop
    new StaticCustomShape(this, 60, 488, 'leftWall', collisionGroupB).setScale(1,1.1)
    new StaticCustomShape(this, 423, 530, 'rightWallA', collisionGroupB).setScale(1, 1.1).setAngle(-2.2)
    new StaticCustomShape(this, 405, 320, 'rightWallB', collisionGroupB).setScale(.8, 1)
    new StaticCustomShape(this, 350, 218, 'rightTrapCowl', collisionGroupB).setScale(0.82, 1) // Butters trap
    new StaticCustomShape(this, 450, 455, 'farRightWall', collisionGroupB).setAngle(-.5) 
    new StaticCustomShape(this, 365, 593, 'rightLane', collisionGroupB).setScale(0.82, 1)
    new StaticCustomShape(this, 107, 593, 'leftLane', collisionGroupB).setScale(0.82, 1)
    new StaticCustomShape(this, 130, 540, 'leftSlingshot', collisionGroupB).setScale(0.82, 1).setCollidesWith(collisionGroupA)
    new StaticCustomShape(this, 345, 540, 'rightSlingshot', collisionGroupB).setScale(0.82, 1).setCollidesWith(collisionGroupA)
    new StaticCustomShape(this, 378, 400, 'rightTargets', collisionGroupB).setScale(1, 1)
    new StaticShape(this, 'rectangle', 257, 195, 62, 62, .02, collisionGroupB)// Cartmen targets
    new StaticShape(this, 'rectangle', 447, 700, 10, 5, 1, collisionGroupB)// Launcher align
    new StaticShape(this, 'rectangle', 463, 700, 10, 5, -1, collisionGroupB)// Launcher align
    new StaticShape(this, 'rectangle', 425, 475, 1, 470, -0.08, collisionGroupB)// Launcher lane inner
    new StaticShape(this, 'rectangle', 415, 187, 10, 150, .15, collisionGroupD)// Launcher lane gate
    new StaticShape(this, 'rectangle', 55, 506, 10, 200, .08, collisionGroupD)// Left wall
    new StaticShape(this, 'circle', 310, 64, 10, null, null, collisionGroupE, 'rubber')//Launcher top loop gate
    new StaticShape(this, 'circle', 385, 488, 5, null, null, collisionGroupB, 'rubber') // Right lane topper
    new StaticShape(this, 'circle', 86, 488, 5, null, null, collisionGroupB, 'rubber') // Left lane topper
    new StaticShape(this, 'circle', 407, 451, 5, null, null, collisionGroupB, 'rubber') 
    new StaticShape(this, 'circle', 314, 80, 5, null, null, collisionGroupB, 'rubber')//Top tri-lane
    new StaticShape(this, 'circle', 341, 76, 5, null, null, collisionGroupB, 'rubber')//Top tri-lane
    new StaticShape(this, 'circle', 314, 98, 5, null, null, collisionGroupB, 'rubber')//Top tri-lane
    new StaticShape(this, 'circle', 341, 94, 5, null, null, collisionGroupB, 'rubber')//Top tri-lane
    new StaticShape(this, 'circle', 375, 98, 5, null, null, collisionGroupB, 'rubber')//Top tri-lane
    new StaticShape(this, 'circle', 367, 98, 5, null, null, collisionGroupB, 'rubber')//Top tri-lane
    new StaticShape(this, 'circle', 320, 160, 10, null, null, collisionGroupB, 'rubber') // Bumpers spacer
    new StaticShape(this, 'circle', 100, 435, 8, null, null, collisionGroupB, 'rubber') // Left lane
    new StaticShape(this, 'circle', 125, 491, 12, null, null, collisionGroupB, 'rubber') // Slingshot corners
    new StaticShape(this, 'circle', 350, 491, 12, null, null, collisionGroupB, 'rubber') // 
    new StaticShape(this, 'circle', 148, 575, 8, null, null, collisionGroupB, 'rubber') // 
    new StaticShape(this, 'circle', 326, 575, 8, null, null, collisionGroupB, 'rubber') // 
    
    //Second level (collision group C)
    new StaticCustomShape(this, 147, 10, 'leftRampDiverter', collisionGroupE)
    new StaticShape(this, 'circle', 144, 45, 23, null, null, collisionGroupD) // Left ramp bottom
    new StaticCustomShape(this, 65, 500, 'leftLaneBottomLeft', collisionGroupC) // Left Lane bottom L
    new StaticCustomShape(this, 110, 450, 'leftLaneBottomRight', collisionGroupC) // Left lane bottom R
    new StaticCustomShape(this, 171, 184, 'leftRampRight', collisionGroupC).setScale(0.7, 1.2)
    new StaticCustomShape(this, 163, 110, 'rightRampDivider', collisionGroupC).setScale(0.6, 1) // Left / center ramp divider
    new StaticCustomShape(this, 140, 7, 'leftRampTop', collisionGroupC).setScale(0.8, 1)// Left ramp top
    new StaticShape(this, 'rectangle', 220, 117, 35, 180, -0.2, collisionGroupC) // Mid ramp right
    new StaticShape(this, 'circle', 348, 78, 50, null, null, collisionGroupC) //Right ramp bottom
    new StaticCustomShape(this, 335, 16, 'rightRampTop', collisionGroupC).setScale(0.8, 1) // Right ramp top
    new StaticShape(this, 'rectangle', 275, 125, 15, 170, -0.05, collisionGroupC) // Right ramp left
    new StaticShape(this, 'rectangle', 319, 160, 20, 140, -0.15, collisionGroupC) // Right ramp right
    new StaticShape(this, 'rectangle', 315, 160, 10, 140, -0.15, collisionGroupB) // Right ramp right
    new StaticShape(this, 'rectangle', 74, 228, 15, 360, 0.085, collisionGroupC) // Left rail L
    new StaticShape(this, 'rectangle', 112, 228, 15, 360, 0.095, collisionGroupC) // Left rail R
    new StaticShape(this, 'rectangle', 113, 511, 15, 25, 1, collisionGroupC) // Left rail termination
    new StaticShape(this, 'rectangle', 402, 232, 15, 325, -0.08, collisionGroupC) // Right lane L
    new StaticShape(this, 'rectangle', 445, 228, 15, 340, -0.08, collisionGroupC) // Right lane R
    new StaticShape(this, 'rectangle', 383, 443, 130, 15, -1, collisionGroupC) // Right lane Bottom L
    new StaticShape(this, 'rectangle', 427, 450, 160, 15, -1, collisionGroupC) // Right lane Bottom R
    new StaticShape(this, 'rectangle', 363, 514, 15, 30, -1, collisionGroupC) // Right lane termination
    
    //Sensors 
    //constructor(scene, x, y, width, rotation, type, name, collisionGroup)
    //Ramp on
    new Sensor(this, 170, 235, 30, 20, 1.6, 'ramp-on', 'leftRampOn', sensorGroupA)
    new Sensor(this, 207, 205, 50, 20, -.1, 'ramp-on', 'centerRampOn', sensorGroupA)
    new Sensor(this, 303, 200, 60, 20, -.1, 'ramp-on', 'rightRampOn', sensorGroupA)  
    //Ramp off
    new Sensor(this, 78, 461, 30, 20, -.50, 'ramp-off', 'leftRampOff', sensorGroupB)  
    new Sensor(this, 396, 461, 30, 20, .50, 'ramp-off', 'rightRampOff', sensorGroupB) 
    new Sensor(this, 255, 262, 120, 20, 0, 'ramp-off', 'allRampsOff', sensorGroupB)  
    //Launcher on 
    new Sensor(this, 435, 477, 30, 20, 1.6, 'launcher-on', 'launcherOn', sensorGroupA)
    //Launcher off
    new Sensor(this, 349, 100, 80, 20, -.1, 'launcher-off', 'launcherOff', sensorGroupA)
    //Butters
    new Sensor(this, 348, 237, 30, 10, .3, 'target', 'butters', sensorGroupA)
    //Rails 
    new Sensor(this, 107, 47, 30, 20, 0, 'rail', null, sensorGroupB)
    new Sensor(this, 408, 47, 30, 20, 0, 'rail', null, sensorGroupB)

    //Collision events
    /*********************************************************/
    this.matter.world.on(['collisionend'], (event, bodyA, bodyB) => 
    {

        if (bodyB.label === 'Ball') 
        {

            //Ramp sensors on / off

            //Kenny (left) ramp on
            if (bodyA.label === 'leftRampOn')
            {
                playRandomSound('kenny_hit', this)
            }

            if (bodyA.label === 'centerRampOn')
            {
                playRandomSound('stan_hit', this)
                bodyB.isOnCenterRamp = true
            }

            if (bodyA.label === 'rightRampOn')
            {
                playRandomSound('kyle_hit', this)
            }

            //Generic ramp on
            if (bodyA.type === 'ramp-on')
            {
                bodyB.isOnRamp = true
            } 

            //Generic ramp off
            if (bodyA.type === 'ramp-off')
            {
                setTimeout(function(){
                    bodyB.isOnRamp = false
                    bodyB.isOnCenterRamp = false
                }, 100)
            }

            //Launcher on / off
            if (bodyA.type === 'launcher-on')
            {
                bodyB.isOnLauncher = true
            }

            if (bodyA.type === 'launcher-off')
            {
                bodyB.isOnLauncher = false
            }
        
            //Slingshots
            if (bodyA.label === 'slingshotA')
            {
                slingshotA.fire()
            }

            if (bodyA.label === 'slingshotB')
            {
                slingshotB.fire()
            }

            //Pop bumpers
            if ( bodyA.label === "bumper") 
            {
                bodyA.gameObject.fire(bodyB.position)
                addScore(1000)
            }

            //Butters target 
            if ( bodyA.label === 'butters' ) 
            {   
                registerHit(this, bodyA.label, bodyB)
                addScore(10000)
                playRandomSound('butters_hit', this)  
            }

            //Rails 
            if (bodyA.type === 'rail')
            {
                this.sound.playAudioSprite('sound_effects', 'WireRamp')
                addScore(5000)
            }

            //Rubbers 
            if (bodyA.label === 'rubber')
            {
                let sounds = ['rubber_hit_1', 'rubber_hit_2', 'rubber_hit_3']
                this.sound.playAudioSprite('sound_effects', sounds[Math.floor(Math.random()*3)])
            }

            //Flippers 
            if (bodyA.label === 'flipper')
            {
                let sounds = ['flip_hit_1', 'flip_hit_2', 'flip_hit_3']
                this.sound.playAudioSprite('sound_effects', sounds[Math.floor(Math.random()*sounds.length)])
            }
        }

    }
)
    

    

    
    //Hit registration

    function registerHit(scene, object, body) {
        
        if (object === 'butters') {
            scene.sound.playAudioSprite('sound_effects', 'hole_enter')
            //Holds the ball for 1.5 seconds and shoots back to left flipper
            body.render.visible = false
            setTimeout(()=>{
                body.destroy()
                setTimeout(()=>{
                    ball = new Ball(scene, 340, 259, 'ball') 
                    ball.setVelocityY(3)
                    ball.setVelocityX(-3)
                    scene.sound.playAudioSprite('sound_effects', 'ExitSandman')
                }, 1500)
            }, 50)
        }
    }
}



function update() {

    if(Phaser.Input.Keyboard.JustDown(spacebar))
    {
        ball = new Ball(this, 416, 773, 'ball') 
        ball.launch()
    }
    
    if (Phaser.Input.Keyboard.JustDown(left))
    {
        leftFlipper.flip() 
    } 
    
    if (Phaser.Input.Keyboard.JustUp(left))
    {
        leftFlipper.release()
    } 

    if (Phaser.Input.Keyboard.JustDown(right))
    {
        rightFlipper.flip()
        sideFlipper.flip()
    } 

    if (Phaser.Input.Keyboard.JustUp(right))
    {
        rightFlipper.release()
        sideFlipper.release()
    } 

    if (Phaser.Input.Keyboard.JustDown(down))
    {
        launcher.charge()
    }

    if (Phaser.Input.Keyboard.JustUp(down))
    {
        launcher.fire()
    }

    //Round is over when no balls are in play
    if (balls.length === 0)
    {
        //If there are still balls left and a game running, load another ball
        if ( ballsRemaining > -1 && gameActive)
        {
            getNewBall(this)
        }
        //Otherwise the game is over
        else
        { 
            gameActive = false
        }
    }
} 

