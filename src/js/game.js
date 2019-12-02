/* 

South Park Pinball v1.0

Built by Riley Hemphill @ The Creative Circus, 2019

*/

//Initial config
const config = 
{
    type: Phaser.CANVAS,
    width: 520,
    height: 800,
    physics: {
        default: 'matter',
        matter: {
            debug: true,
            gravity: 
            {
                x: 0,
                y: .9
            }
        }
    },
    game: 
    {
        balls: 3
    },
    scene: 
    {
        preload: preload, 
        create: create,
        update: update 
    }
}

//Declare global variables 

let table, ramps, characters, 
leftFlipper, rightFlipper, sideFlipper,
bumperA, bumperB, bumperC,
leftSlingshot, rightSlingshot,
launcher, ball,
spacebar, left, right, down,
collisionGroupA, collisionGroupB, collisionGroupC, collisionGroupD, collisionGroupE,
sensorGroupA, sensorGroupB,
cartmanLeft, cartmanCenter, cartmanRight, cartmanBlock, rampsCartmanActive,
objectives, 
gameActive,
backgroundMusic, eventMusic

let balls = []
let currentBall = 1
let multiplier = 1
let score = 0

const Bodies = Phaser.Physics.Matter.Matter.Bodies
const game = new Phaser.Game(config)

function create() {

    //Development multitool
    this.input.on('pointerdown', function(pointer)
    {
        //Log the mouse coordinates
        console.log(pointer.x+",", pointer.y)

        //Make a ball where you click
        ball = new Ball(this, pointer.x, pointer.y, 'ball') 

        //Set velocity for testing ramps etc
        ball.setVelocityY(-10)

        //Start a new game
        // newGame(this)
    }, this)

    //Setup collision groups 
    sensorGroupA = this.matter.world.nextCategory() // Ground level sensors
    sensorGroupB = this.matter.world.nextCategory() // Upper level sensors
    collisionGroupA = this.matter.world.nextCategory() // Ball
    collisionGroupB = this.matter.world.nextCategory() // Walls
    collisionGroupC = this.matter.world.nextCategory() 
    collisionGroupD = this.matter.world.nextCategory()
    collisionGroupE = this.matter.world.nextCategory()

    //Setup controls
    left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
    down = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)
    right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
    spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    
    //Create object to store hit counts for each objective
    objectives = 
    {
        'cartman-left': 0,
        'cartman-center': 0,
        'cartman-right': 0,
        'cartman-himself': 0,
        'loop-hit': 0
    }

    //Textures
    table = this.add.image(260, 400, 'table').setDepth(1)
    ramps = this.add.image(260, 400, 'ramps').setDepth(2)
    rampsCartmanActive =  this.add.image(260, 400, 'ramps_cartman_active').setDepth(0)
    characters = this.add.image(260, 400, 'characters').setDepth(4)
    
    //Flippers
    leftFlipper = new LeftFlipper(this, 150, 632) 
    rightFlipper = new RightFlipper(this, 327, 632)
    sideFlipper = new SideFlipper(this, 407, 313)

    //Pop bumpers
    bumperA = new Bumper(this, 308, 125, 'bumper')
    bumperB = new Bumper(this, 365, 135, 'bumper')
    bumperC = new Bumper(this, 335, 190, 'bumper')

    //Slingshots
    leftSlingshot = new Slingshot(this, 121, 490, 152, 574, 177, 510, 5, 'leftSlingshot')
    rightSlingshot = new Slingshot(this, 353, 491, 324, 574, 298, 510, 5, 'rightSlingshot')

    //Launcher
    launcher = new Launcher(this, 455, 755)
    
    //Static Objects
    /*********************************************************/
    //See static-objects.js

    createStaticObjects(this)

    //Collision events
    /*********************************************************/
    //See collisions.js

    initCollisionListeners(this) 
}

//Update
/*********************************************************/

function update() {
    
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
        //Get a new ball if there are any remaining. Otherwise end the game.
        if ( currentBall <= config.game.balls && gameActive)
        {
            getNewBall(this)
        }
        else
        { 
            gameActive = false
        }
    }

    //Events
    if (objectives['cartman-left'] && objectives['cartman-center'] && objectives['cartman-right'])
    {
        startEvent('cartman', this)
    }
} 

//Functions 
/*********************************************************/

function newGame(scene)
{
    gameActive = true
    score = 0
    multiplier = 1
    backgroundMusic = scene.sound.add('background_music')
    getNewBall(scene)
}

function endGame()
{
    console.log('game over')
    score = 0
}

function getNewBall(scene)
{
    backgroundMusic.pause()
    ball = new Ball(scene, 455, 689, 'ball') 
    scene.sound.playAudioSprite('sound_effects', "rollover")
        currentBall++
        document.querySelector('.balls-remaining').textContent = currentBall
}

function addScore(name)
{
    let amount
    switch(name)
    {
        case "bumper" : amount = 1000 
            break
        case "butters" : amount = 10000
            break
        case "ramp" : amount = 5000
            break
        case "cartman-win" : amount = 100000
            break
        case "randy" : amount = 2500
            break
        case "loop" : amount = 10000
            break
    }
    let total = amount * multiplier
    score += total
    document.querySelector('.score').textContent = score
}

    //Hit registration
    /*********************************************************/

function registerHit(scene, bodyA, bodyB) {
    switch(bodyA)
    {
        case "butters" :
            playRandomSound('butters_hit', scene)  
            scene.sound.playAudioSprite('sound_effects', 'hole_enter')
            scene.sound.playAudioSprite('sound_effects', 'thunder', {volume: 0.5})
            bodyB.render.visible = false
            bodyB.isDestroyed = true
            bodyB.destroy()
            //Holds the ball for 3 seconds and shoots back to left flipper
            setTimeout(()=>
            {
                ball = new Ball(scene, 340, 259, 'ball') 
                ball.setVelocityY(3.3)
                ball.setVelocityX(-3.3)
                scene.sound.playAudioSprite('sound_effects', 'ExitSandman')
                addScore('butters')
            }, 3000)     
            break     

        case "cartman-hit" :
            if (!objectives[bodyB] && bodyB != 'cartman-himself')
            {
                objectives[bodyB]++
                scene.sound.playAudioSprite('sound_effects', 'target')
            } 
            break          
        
        case "cartman-himself" :
            objectives[bodyB]++
            playRandomSound('cartman_damage', scene)
            scene.sound.playAudioSprite('sound_effects', 'rubber_hit_2')
            break

        case "rightTargets" :
            console.log('asdad')
            playRandomSound('randy_hit', scene)
            scene.sound.playAudioSprite('sound_effects', 'rubber_hit_1')    
            addScore('randy')
            break
        
        case "loop-hit" :
            playRandomSound('loop_hit', scene)
            addScore('loop')
            objectives[bodyA]++
            console.log(objectives)
    }
}

function playRandomSound(sprite, scene, delay)
{
    let spritemap = Object.keys(scene.cache.json.get(sprite).spritemap)
    setTimeout(()=>{
        scene.sound.playAudioSprite(sprite, spritemap[Math.floor(Math.random()*spritemap.length)])
    }, delay)
}


