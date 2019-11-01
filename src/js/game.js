class Ball extends Phaser.Physics.Matter.Image {
    constructor(scene, x, y, texture) {
        super(scene.matter.world, x, y, texture)
        super.setScale(.17)
        super.setCircle(8.657)
        scene.sys.displayList.add(this)
    }
    launch(){
        super.setVelocityY(-30)
    }
}

class Bumper extends Phaser.Physics.Matter.Sprite {
    constructor(scene, x, y, texture){
        super(scene.matter.world, x, y, texture)
        super.setStatic(true)
        scene.sys.displayList.add(this)
    }
}

const config = {
    type: Phaser.AUTO,
    width: 440,
    height: 800,
    physics: {
        default: 'matter',
        matter: {
            debug: true
        }
    },
    scene: {
        preload: preload, 
        create: create,
        update: update 
    }
}

const Bodies = Phaser.Physics.Matter.Matter.Bodies

const flipperLength = 65

let 
    balls, 
    spacebar, 
    left,
    right,
    ball, 
    bounds, 
    leftFlipper, 
    leftBlock, 
    leftPivot, 
    leftFlipperPin, 
    rightFlipper, 
    rightBlock, 
    rightPivot, 
    rightFlipperPin,
    leftApron,
    rightApron,
    createBall,
    leftFlipperActive,
    dome,
    apronLeft,
    apronRight,
    apronBottom,
    bouncer,
    bumperRight,
    bumperLeft,
    fixtureTopLeft,
    hsBottom,
    hsTop,
    triPegLeft,
    triPegRight,
    wallLowLeft,
    wallTopLeft,
    wallTopRight,
    wallTopRightInner

const game = new Phaser.Game(config)



function preload() {
    this.load.image('ball', 'dist/assets/sprites/wizball.png')
    this.load.image('rectA', 'dist/assets/solids/grey-solid.svg')
    this.load.image('schematic', 'dist/assets/schematic.jpg')
    this.load.image('dome', 'dist/assets/textures/Dome.png')
}


//***************************************************************************************//


function create() {

    //Set world bounds
    bounds = this.matter.world.setBounds(0, 0, 440, 800, 30, true, true, true, true)

    //Set gravity
    this.matter.world.setGravity(0,.35)

    //Define inputs
    left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
    right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
    spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    
    //Layout overlay
    let schematic = this.add.image(220,400, 'schematic')
    schematic.scale = 0.8
    
    //Create the ball
    ball = new Ball(this, 100, 625, 'ball') 
    ball.setFrictionStatic(0)
    ball.setMass(.1)
    ball.setFrictionAir(0)
    ball.setBounce(0.05)
    
    //Left flipper mechanism
    
    //Create bottom block to stop flipper from going too low
    leftBlock = this.matter.add.image(170,727 ,'rectA', this, {
        isStatic: true
    })
    leftBlock.scaleX = .1,
    leftBlock.scaleY = .1,
    leftBlock.rotation = .55
    
    //Create a pivot point to attach the constraint to
    leftPivot = this.matter.add.image(145, 695, null, this)
    leftPivot.setScale(.2)
    leftPivot.setCircle(1)
    leftPivot.setStatic(true)

    //Create the left flipper components 
    let rectA = Bodies.rectangle(166 , 700, flipperLength, 16)
    let circleA = Bodies.circle(150, 699, 5)
    circleA.mass = 2
    let circleB = Bodies.circle(188, 695, 4)

    //Merge left flipper components
    leftFlipper = Phaser.Physics.Matter.Matter.Body.create({
        parts: [ circleA, circleB, rectA  ]
    });
    this.matter.add.image(150, 0, null).setScale(0.2).setExistingBody(leftFlipper)

    //Add the pivot constraint
    leftFlipperPin = this.matter.add.constraint(leftPivot, leftFlipper)    
    leftFlipperPin.stiffness = .9
    leftFlipperPin.length = 0
    leftFlipperPin.pointA = {
        x: 5, 
        y: 5
    }
    leftFlipperPin.pointB = {
        x: -15, 
        y: 0
    }

    //Right flipper mechanism
    
    //Create bottom block to stop flipper from going too low
    rightBlock = this.matter.add.image(260,727 ,'rectA', this, {
        isStatic: true
    })
    rightBlock.scaleX = .1,
    rightBlock.scaleY = .1,
    rightBlock.rotation = -.55
    //345 286
    //Create a pivot point to attach the flipper to
    rightPivot = this.matter.add.image(286, 695, null, this)
    rightPivot.setScale(.2)
    rightPivot.setCircle(1)
    rightPivot.setStatic(true)
 
    //Create the right flipper components 
    let rectB = Bodies.rectangle(254 , 700, flipperLength, 16)
    let circleC = Bodies.circle(270, 699, 5)
    circleC.mass = 2
    let circleD = Bodies.circle(229, 695, 4)

    
    //Create right flipper compound body
    rightFlipper = Phaser.Physics.Matter.Matter.Body.create({
        parts: [ circleC, circleD, rectB  ]
    });
    this.matter.add.image(350, 0, null).setScale(0.2).setExistingBody(rightFlipper)

    //Add the pivot constraint
    rightFlipperPin = this.matter.add.constraint(rightPivot, rightFlipper)    
    rightFlipperPin.stiffness = .9
    rightFlipperPin.length = 0
    rightFlipperPin.pointA = {
        x: -5, 
        y: 5
    }
    rightFlipperPin.pointB = {
        x: 15, 
        y: 0
    }

    //Increase mass of the flippers
    //leftFlipper.mass = 50


    //Place static objects. 

    //1. Create a game object with desired texture
    dome = this.matter.add.image(0, 0, 'dome')
    //2. Set that objects physics body to its vector outline and set it as static
    dome.setExistingBody(Bodies.fromVertices(0,0, PATHS.dome)).setStatic(true)
    dome.x = 220
    dome.y = 180

    apronLeft = this.matter.add.image(0, 0, 'apronLeft')
    apronLeft.setExistingBody(Bodies.fromVertices(0,0, PATHS.apronLeft)).setStatic(true)
    apronLeft.x = 71
    apronLeft.y = 630

    apronRight = this.matter.add.image(0, 0, 'apronRight')
    apronRight.setExistingBody(Bodies.fromVertices(0,0, PATHS.apronRight)).setStatic(true)
    apronRight.x = 340
    apronRight.y = 654

    bumperLeft = this.matter.add.image(0, 0, 'bumperLeft')
    bumperLeft.setExistingBody(Bodies.fromVertices(0,0, PATHS.bumperLeft)).setStatic(true)
    bumperLeft.x = 120
    bumperLeft.y = 602


    bumperRight = this.matter.add.image(0, 0, 'bumperRight')
    bumperRight.setExistingBody(Bodies.fromVertices(0,0, PATHS.bumperRight)).setStatic(true)
    bumperRight.x = 314
    bumperRight.y = 602

    fixtureTopLeft = this.matter.add.image(0, 0, 'fixtureTopLeft')
    fixtureTopLeft.setExistingBody(Bodies.fromVertices(0,0, PATHS.fixtureTopLeft)).setStatic(true)
    fixtureTopLeft.x = 90
    fixtureTopLeft.y = 145

    hsBottom = this.matter.add.image(0, 0, 'hsBottom')
    hsBottom.setExistingBody(Bodies.fromVertices(0,0, PATHS.hsBottom)).setStatic(true)
    hsBottom.x = 215
    hsBottom.y = 85

    hsTop = this.matter.add.image(0, 0, 'hsTop')
    hsTop.setExistingBody(Bodies.fromVertices(0,0, PATHS.hsTop)).setStatic(true)
    hsTop.x = 215
    hsTop.y = 80

    triPegLeft = this.matter.add.image(0, 0, 'triPegLeft')
    triPegLeft.setExistingBody(Bodies.fromVertices(0,0, PATHS.triPegLeft)).setStatic(true)
    triPegLeft.x = 40
    triPegLeft.y = 425

    triPegRight = this.matter.add.image(0, 0, 'triPegRight')
    triPegRight.setExistingBody(Bodies.fromVertices(0,0, PATHS.triPegRight)).setStatic(true)
    triPegRight.x = 400
    triPegRight.y = 408

    wallTopLeft = this.matter.add.image(0, 0, 'wallTopLeft')
    wallTopLeft.setExistingBody(Bodies.fromVertices(0,0, PATHS.wallTopLeft)).setStatic(true)
    wallTopLeft.x = 27
    wallTopLeft.y = 325

    wallTopRight = this.matter.add.image(0, 0, 'wallTopRight')
    wallTopRight.setExistingBody(Bodies.fromVertices(0,0, PATHS.wallTopRight)).setStatic(true)
    wallTopRight.x = 426
    wallTopRight.y = 285

    wallTopRightInner = this.matter.add.image(0, 0, 'wallTopRightInner')
    wallTopRightInner.setExistingBody(Bodies.fromVertices(0,0, PATHS.wallTopRightInner)).setStatic(true)
    wallTopRightInner.x = 385
    wallTopRightInner.y = 200

    wallLowLeft = this.matter.add.image(0, 0, 'wallLowLeft')
    wallLowLeft.setExistingBody(Bodies.fromVertices(0,0, PATHS.wallLowLeft)).setStatic(true)
    wallLowLeft.x = 26
    wallLowLeft.y = 490

    








}

function update() {
    
    if(Phaser.Input.Keyboard.JustDown(spacebar)){
        ball = new Ball(this, 100, 625, 'ball') 
        ball.setFrictionStatic(0.02)
        ball.setMass(.25)
        ball.setFrictionAir(0)
    }

    //Input control of left flipper
    if (Phaser.Input.Keyboard.JustDown(left)){
        leftFlipperActive = true
        leftFlipper.torque = -3
    } 
    
    if (Phaser.Input.Keyboard.JustUp(left)){
        leftFlipperActive = false
    } 
    //Apply torque in opposite direction after left flipper reaches max angle
    if( leftFlipper.angle <= -.5){
        leftFlipper.torque = 1
    } 

    //Input control of right flipper
    if (Phaser.Input.Keyboard.JustDown(right)){
        rightFlipper.torque = 3
    } 
    //Apply torque in opposite direction after right flipper reaches max angle
    if(rightFlipper.angle >= .5 ){
         rightFlipper.torque = -1
     } 
    
    //This function lowers the gravity when the ball is going up and raises it on the way down.
    // if(ball.body.velocity.y < 0){
    //     this.matter.world.setGravity(0,0.35)
    // } else {
    //     this.matter.world.setGravity(0,.35)
    // }

} 





///The base of the flipper is a 15mm diameter circle, sloping down to a 5mm diameter circle at the tip. Overall length is 71mm, 