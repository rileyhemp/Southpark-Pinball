
//Initial config

const config = {
    type: Phaser.CANVAS,
    width: 520,
    height: 800,
    physics: {
        default: 'matter',
        matter: {
            debug: true,
            gravity: {
                x: 0,
                y: 0.35
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

let 
    balls, 
    spacebar, 
    left,
    right,
    ball, 
    bounds, 
    leftFlipper, 
    rightFlipper, 

    //Static Objects
    bumperA,
    leftRampRight,
    rightLane,
    rightTrapCowl,
    farRightWall,
    leftRampLeft,
    rightRampLeft,
    rightWallA,
    killZone,
    leftSlingshot,
    rightRampRight,
    rightWallB,
    leftLane,
    leftWall,
    rightSlingshot,
    topLoop,
    leftLoopTop,
    midTargetLeft,
    rightTargets,

    //Background
    playfield,
    plastics,

    //Utilities
    collisionGroupA,
    collisionGroupB,
    collisionGroupC,
    collisionGroupD,
    collisionGroupE,
    test,
    tween
    
const game = new Phaser.Game(config)

//Load assets

function preload() {
    this.load.image('ball', 'dist/assets/sprites/wizball.png')
    this.load.image('rectA', 'dist/assets/solids/grey-solid.svg')
    this.load.image('schematic', 'dist/assets/schematic.jpg')
    this.load.image('blueprint', 'dist/assets/blueprint.png')
    this.load.image('plastics', 'dist/assets/Plasticos.png')
    this.load.image('playfield', 'dist/assets/Playfield.png')
}

//Initialize table

function create() {

    //Set some things up, inputs, collisiongroups, etc. 
    collisionGroupA = this.matter.world.nextCategory()
    collisionGroupB = this.matter.world.nextCategory()
    collisionGroupC = this.matter.world.nextCategory()
    collisionGroupD = this.matter.world.nextCategory()
    collisionGroupE = this.matter.world.nextCategory()
    test = this
    bounds = this.matter.world.setBounds(0, 0, 520, 800, 30, true, true, true, true)
    left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
    right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
    spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    
    //Add a ball where you click
    this.input.on('pointerdown', function(pointer){
        ball = new Ball(this, pointer.x, pointer.y, 'ball') 
        console.log(pointer.x + ',', pointer.y)
    }, this)

    
    //Layout overlay
    let blueprint = this.add.image(260,400, 'blueprint')
    
    // playfield = this.add.image(220, 445, 'playfield')
    // playfield.setScale(0.21)
    // playfield.setDepth(1)
    
    // plastics = this.add.image(220, 445, 'plastics')
    // plastics.setScale(0.21)
    // plastics.setDepth(1)
    
    //Flippers
    leftFlipper = new LeftFlipper(this, 118, 725)
    rightFlipper = new RightFlipper(this, 274, 725)
    
    //Static Objects
    /*********************************************************/
    
    leftRampRight = new StaticCustomShape(this, 160, 168, 'leftRampRight', collisionGroupA)
    rightLane = new StaticCustomShape(this, 378, 591, 'rightLane', collisionGroupA)
    leftLane = new StaticCustomShape(this, 97, 591, 'leftLane', collisionGroupA)
    rightTrapCowl = new StaticCustomShape(this, 369, 185, 'rightTrapCowl', collisionGroupA)
    farRightWall = new StaticCustomShape(this, 481, 455, 'farRightWall', collisionGroupA)
    leftRampLeft = new StaticCustomShape(this, 135, 222, 'leftRampLeft', collisionGroupA)
    rightRampLeft = new StaticCustomShape(this, 282, 112, 'rightRampLeft', collisionGroupA)
    rightWallA = new StaticCustomShape(this, 445, 530, 'rightWallA', collisionGroupA).setScale(1, 1.1)
    rightWallB = new StaticCustomShape(this, 431, 310, 'rightWallB', collisionGroupA)
    killZone = new StaticCustomShape(this, 250, 740, 'killZone', collisionGroupA)
    leftSlingshot = new StaticCustomShape(this, 120, 535, 'leftSlingshot', collisionGroupA)
    rightSlingshot = new StaticCustomShape(this, 355, 535, 'rightSlingshot', collisionGroupA)
    rightRampRight = new StaticCustomShape(this, 342, 137, 'rightRampRight', collisionGroupA)
    leftWall = new StaticCustomShape(this, 40, 488, 'leftWall', collisionGroupA).setScale(1,1.1)
    topLoop = new StaticCustomShape(this, 130, 170, 'topLoop', collisionGroupA)
    leftLoopTop = new StaticCustomShape(this, 125, 110, 'leftLoopTop', collisionGroupA)
    midTargetLeft = new StaticCustomShape(this, 218, 90, 'midTargetLeft', collisionGroupA)
    rightTargets = new StaticCustomShape(this, 398, 392, 'rightTargets', collisionGroupA)
    
    //Setup collision events
    //Change to one <------------
    let canCallA = true
    let canCallB = true
    let canCallC = true
    this.matter.world.on('collisionstart', function(event, bodyA, bodyB){

        if (bodyB.label === 'Ball' && bodyA.label === 'Slingshot'){
            slingshotA.fire()
            slingshotB.fire()
        }
        //Change to one <------------------
        if ( bodyA.label === "bumperA" && bodyB.label  === 'Ball' && canCallA) {
            canCallA = false
            bumperA.fire(bodyB.position, "bumperA")
            setTimeout(()=>{
                canCallA = true
            }, 100)
        }
        if ( bodyA.label === "bumperB" && bodyB.label  === 'Ball' && canCallB) {
            canCallB = false
            bumperB.fire(bodyB.position, "bumperB")
            setTimeout(()=>{
                canCallB = true
            }, 100)
        }
        if ( bodyA.label === "bumperC" && bodyB.label  === 'Ball' && canCallC) {
            canCallC = false
            bumperC.fire(bodyB.position, "bumperC")
            setTimeout(()=>{
                canCallC = true
            }, 100)
        }
    })
}

function update() {
    
    leftFlipper.hold()
    rightFlipper.hold()
    
    if(Phaser.Input.Keyboard.JustDown(spacebar)){
        ball = new Ball(this, 416, 773, 'ball') 
        ball.launch()
    }
    
    if (Phaser.Input.Keyboard.JustDown(left)){
        leftFlipper.flip() 
        leftFlipper.isFlipping = true
    } 
    
    if (Phaser.Input.Keyboard.JustUp(left)){
        leftFlipper.isFlipping = false
    } 

    if (Phaser.Input.Keyboard.JustDown(right)){
        rightFlipper.flip()
        rightFlipper.isFlipping = true
    } 

    if (Phaser.Input.Keyboard.JustUp(right)){
        rightFlipper.isFlipping = false
    } 


    


} 