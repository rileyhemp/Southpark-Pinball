
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

let balls = []

let 
    spacebar, 
    left,
    right,
    ball, 
    bounds, 
    leftFlipper, 
    rightFlipper, 
    testShape,
    bumperA, bumperB, bumperC,

    //Background
    playfield,
    plastics,

    //Utilities
    collisionGroupA,
    collisionGroupB,
    collisionGroupC,
    collisionGroupD,
    collisionGroupE,
    sensors,
    isOnRamp,
    leftRampDivert, // Default: false
    leftRampDiverter, 
    leftRampBottom,
    flipperCollisionGroup,
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
    sensors = this.matter.world.nextCategory() // Sensors collision group
    collisionGroupA = this.matter.world.nextCategory() // Ball
    collisionGroupB = this.matter.world.nextCategory() // Walls
    collisionGroupC = this.matter.world.nextCategory()
    collisionGroupD = this.matter.world.nextCategory()
    collisionGroupE = this.matter.world.nextCategory()
    flipperCollisionGroup = this.matter.world.nextCategory()
    isOnRamp = false
    leftRampDivert = false

    test = this
    bounds = this.matter.world.setBounds(0, 0, 520, 800, 30, true, true, true, true)
    left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
    right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
    spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    
    //Add a ball where you click
    this.input.on('pointerdown', function(pointer){
        ball = new Ball(this, pointer.x, pointer.y, 'ball') 
        console.log(pointer.x, ',', pointer.y)
        //ball.setCollisionCategory(sensors)
        ball.setCollidesWith([collisionGroupC,  sensors])
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
    leftFlipper = new LeftFlipper(this, 147, 634) 
    rightFlipper = new RightFlipper(this, 330, 634)

    //Pop bumpers
    bumperA = new Bumper(this, 305, 100, 'bumperA')
    bumperB = new Bumper(this, 392, 95, 'bumperB')
    bumperC = new Bumper(this, 360, 149, 'bumperC')
    
    //Static Objects
    /*********************************************************/
    //StaticCustomShape(scene, x, y, path, collision group)
    //StaticShape(scene, type, x, y, width, height, rotation, collision group)

    //First level (collision group B)
    new StaticCustomShape(this, 160, 168, 'leftRampRight', collisionGroupB)
    new StaticCustomShape(this, 378, 591, 'rightLane', collisionGroupB)
    new StaticCustomShape(this, 97, 591, 'leftLane', collisionGroupB)
    new StaticCustomShape(this, 369, 185, 'rightTrapCowl', collisionGroupB)
    new StaticCustomShape(this, 481, 455, 'farRightWall', collisionGroupB)
    new StaticCustomShape(this, 135, 222, 'leftRampLeft', collisionGroupB)
    new StaticCustomShape(this, 282, 112, 'rightRampLeft', collisionGroupB)
    new StaticCustomShape(this, 445, 530, 'rightWallA', collisionGroupB).setScale(1, 1.1)
    new StaticCustomShape(this, 431, 310, 'rightWallB', collisionGroupB)
    new StaticCustomShape(this, 250, 740, 'killZone', collisionGroupB)
    new StaticCustomShape(this, 120, 535, 'leftSlingshot', collisionGroupB)
    new StaticCustomShape(this, 355, 535, 'rightSlingshot', collisionGroupB)
    new StaticCustomShape(this, 342, 140, 'rightRampRight', collisionGroupB).setBounce(1)
    new StaticCustomShape(this, 40, 488, 'leftWall', collisionGroupB).setScale(1,1.1)
    new StaticCustomShape(this, 130, 170, 'topLoop', collisionGroupB)
    new StaticCustomShape(this, 125, 110, 'leftLoopTop', collisionGroupB)
    new StaticCustomShape(this, 218, 90, 'midTargetLeft', collisionGroupB)
    new StaticCustomShape(this, 398, 392, 'rightTargets', collisionGroupB) 
    new StaticShape(this, 'rectangle', 260, 197, 75, 15, .02, 8) 
    new StaticShape(this, 'rectangle', 156, 110, 90, 15, 1.45, 8) 
    
    //Small round rubbers
    new StaticShape(this, 'circle', 403, 482, 5, null, null, 8) 
    new StaticShape(this, 'circle', 72, 482, 5, null, null, 8) 
    new StaticShape(this, 'circle', 298, 73, 5, null, null, 8) 
    new StaticShape(this, 'circle', 405, 121, 5, null, null, 8)  

    //Medium round rubbers
    new StaticShape(this, 'circle', 236, 698, 8, null, null, 8) // Center post
    new StaticShape(this, 'circle', 88, 421, 8, null, null, 8) 
    new StaticShape(this, 'circle', 140, 571, 8, null, null, 8) //Slingshot corners
    new StaticShape(this, 'circle', 365, 487, 8, null, null, 8) // 
    new StaticShape(this, 'circle', 331, 570, 8, null, null, 8) // 
    new StaticShape(this, 'circle', 108, 487, 8, null, null, 8) // 
    new StaticShape(this, 'circle', 291, 38, 8, null, null, 8)//Top tri-lane
    new StaticShape(this, 'circle', 325, 39, 8, null, null, 8)//Top tri-lane
    new StaticShape(this, 'circle', 359, 37, 8, null, null, 8)//Top tri-lane
    new StaticShape(this, 'circle', 392, 37, 8, null, null, 8)//Top tri-lane
    new StaticShape(this, 'circle', 292, 59, 8, null, null, 8)//Top tri-lane
    new StaticShape(this, 'circle', 326, 59, 8, null, null, 8)//Top tri-lane
    new StaticShape(this, 'circle', 360, 58, 8, null, null, 8)//Top tri-lane
    new StaticShape(this, 'circle', 394, 58, 8, null, null, 8)//Top tri-lane

    //Second level (collision group C)
    new StaticCustomShape(this, 45, 500, 'leftLaneBottomLeft', collisionGroupC) // lane Lane bottom L
    new StaticCustomShape(this, 92, 450, 'leftLaneBottomRight', collisionGroupC) // Left lane bottom R
    new StaticCustomShape(this, 150, 110, 'rightRampDivider', collisionGroupC)
    new StaticCustomShape(this, 135, 7, 'leftRampTop', collisionGroupC)
    leftRampDiverter = new StaticCustomShape(this, 130, 10, 'leftRampDiverter', collisionGroupC)
    leftRampBottom = new StaticShape(this, 'circle', 128, 50, 25, null, null, collisionGroupC) // Left ramp bottom
    new StaticShape(this, 'circle', 365, 80, 50, null, null, collisionGroupC) //Right ramp bottom
    new StaticCustomShape(this, 345, 16, 'rightRampTop', collisionGroupC) // Right ramp top
    new StaticShape(this, 'rectangle', 55, 228, 15, 360, 0.095, 16) // Left lane L
    new StaticShape(this, 'rectangle', 92, 228, 15, 360, 0.095, 16) // Left lane R
    new StaticShape(this, 'rectangle', 100, 522, 15, 25, 1, 16) // Left ramp termination
    new StaticShape(this, 'rectangle', 200, 72, 15, 150, -0.2, 16) // Mid ramp right
    new StaticShape(this, 'rectangle', 275, 90, 15, 110, -0.2, 16) // Right ramp left
    new StaticShape(this, 'rectangle', 325, 95, 15, 80, -0.2, 16) // Right ramp right
    new StaticShape(this, 'rectangle', 422, 228, 15, 345, -0.095, 16) // Right lane L
    new StaticShape(this, 'rectangle', 464, 228, 15, 360, -0.095, 16) // Right lane R
    new StaticShape(this, 'rectangle', 401, 449, 140, 15, -1, 16) // Right lane Bottom L
    new StaticShape(this, 'rectangle', 438, 469, 150, 15, -1, 16) // Right lane Bottom R
    new StaticShape(this, 'rectangle', 376, 523, 15, 25, -1, 16) // Right lane termination

    

    //Sensors 

    //Ramp on / off sensors
    testShape = new Sensor(this, 126, 170, 'ramp', 1, 'leftRampOn')
    new Sensor(this, 187, 146, 'ramp', 1, 'centerRampOn')
    new Sensor(this, 89, 506, 'ramp', 2, 'leftRampOff')  
    new Sensor(this, 309, 135, 'ramp', 2, 'rightRampOn')  
    new Sensor(this, 386, 507, 'ramp', 2, 'rightRampOff')  

    //Collision events
    /*********************************************************/


    this.matter.world.on('collisionstart', function(event, bodyA, bodyB){

        //Sensors
        if (bodyB.label === 'Ball' && bodyA.isSensor) {
            console.log(bodyA)
            //Indicates if the ball is on a ramp
            if (bodyA.type === 'ramp') {
                isOnRamp = !isOnRamp
                console.log(isOnRamp)
            }

            //Toggles the left ramp diverter
            if (bodyA.label === "leftRampOn"){
                leftRampDivert = true
                console.log('Left ramp divert', leftRampDivert)
            }

            if (bodyA.label === "centerRampOn"){
                leftRampDivert = false
                console.log('Left ramp divert', leftRampDivert)
            }
        }
        
        //Slingshots
        if (bodyB.label === 'Ball' && bodyA.label === 'Slingshot'){
            slingshotA.fire()
            slingshotB.fire()
        }

        //Pop bumpers
        let canCallA = true
        let canCallB = true
        let canCallC = true
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
        leftFlipper.release()
    } 

    if (Phaser.Input.Keyboard.JustDown(right)){
        rightFlipper.flip()
        rightFlipper.isFlipping = true
    } 

    if (Phaser.Input.Keyboard.JustUp(right)){
        rightFlipper.isFlipping = false
        rightFlipper.release()
    } 

    //Changes what bodies the ball collides depending on whether it went up a ramp or not. 
    if (balls.length && !isOnRamp){
        balls.forEach(ball => {
            ball.collisionFilter.mask = 14
        })
    } else if (balls.length && isOnRamp){
        balls.forEach(ball => {
            ball.collisionFilter.mask = 18
        })
    }

    if (!leftRampDivert) {
        leftRampDiverter.setCollidesWith(collisionGroupB)
    } else if (leftRampDivert){
        leftRampDiverter.setCollidesWith(collisionGroupA)
    }


    


} 