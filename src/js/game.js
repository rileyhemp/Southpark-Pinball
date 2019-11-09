class Ball extends Phaser.Physics.Matter.Image {
    constructor(scene, x, y, texture) {
        super(scene.matter.world, x, y, texture)
        super.setScale(.17)
        super.setCircle(8.657)
        this.body.friction = 0
        this.body.frictionAir = 0
        console.log(this.body.frictionStatic)
        scene.sys.displayList.add(this)
        this.setCollisionCategory(collisionGroupA)
        this.body.density = 0.75
    }
    launch(){
        super.setVelocityY(-30)
    }
}

class StaticCustomShape extends Phaser.Physics.Matter.Image {
    constructor(scene, x, y, name){
        super(scene.matter.world, 0, 0, name)
        scene.sys.displayList.add(this)
        this.scene = scene
        this.setExistingBody(Bodies.fromVertices(0,0, PATHS[`${name}`]))
        this.setStatic(true)
        this.x = x
        this.y = y
    }
}

const config = {
    type: Phaser.AUTO,
    width: 440,
    height: 875,
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
    dome, bottomFrame,
    center,
    wallRight, wallRightInner,
    chuteLeft, chuteRight,
    bumperLeft, bumperRight,
    ballStashInner, ballStashOuter,
    pillA, pillB, pillC, pillD,

    //Utilities
    collisionGroupA,
    collisionGroupB,
    test
    
const game = new Phaser.Game(config)

function preload() {
    this.load.image('ball', 'dist/assets/sprites/wizball.png')
    this.load.image('rectA', 'dist/assets/solids/grey-solid.svg')
    this.load.image('schematic', 'dist/assets/schematic.jpg')
    this.load.image('blueprint', 'dist/assets/blueprint.png')
}

//***************************************************************************************//

function create() {

    //Set some things up, inputs, collisiongroups, etc. 
    collisionGroupA = this.matter.world.nextCategory()
    collisionGroupB = this.matter.world.nextCategory()
    test = this
    bounds = this.matter.world.setBounds(0, 0, 440, 875, 30, true, true, true, true)
    left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
    right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
    spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    
    //Add a ball where you click
    this.input.on('pointerdown', function(pointer){
        ball = new Ball(this, pointer.x, pointer.y, 'ball') 
    }, this)
    
    //Layout overlay
    // let blueprint = this.add.image(220,437.5, 'blueprint')
    // blueprint.setScale(0.9)
    

    //Add the flippers
    leftFlipper = new LeftFlipper(this, 118, 725)
    rightFlipper = new RightFlipper(this, 274, 725)
    
    //Place static objects

    dome = new StaticCustomShape(this, 250, 250, 'dome')
    bottomFrame = new StaticCustomShape(this, 210, 830, 'bottomFrame')

    center = new StaticCustomShape(this, 197, 275, 'center')

    wallRight = new StaticCustomShape(this, 370, 315, 'wallRight')
    wallRightInner = new StaticCustomShape(this, 305, 170, 'wallRightInner')

    ballStashInner = new StaticCustomShape(this, 107, 130, 'ballStashInner')
    ballStashOuter = new StaticCustomShape(this, 72, 150, 'ballStashOuter')

    chuteLeft = new StaticCustomShape(this, 80, 705, 'chuteLeft')
    chuteRight = new StaticCustomShape(this, 315, 705, 'chuteRight')

    bumperLeft = new StaticCustomShape(this, 90, 635, 'bumperLeft')
    bumperRight = new StaticCustomShape(this, 305, 625, 'bumperRight')

    pillA = new StaticCustomShape(this, 130, 125, 'pill')
    pillB = new StaticCustomShape(this, 175, 125, 'pill')
    pillC = new StaticCustomShape(this, 220, 125, 'pill')
    pillD = new StaticCustomShape(this, 265, 125, 'pill')

    
}

function update() {

    leftFlipper.hold()
    rightFlipper.hold()
    
    if(Phaser.Input.Keyboard.JustDown(spacebar)){
        ball = new Ball(this, 130, 625, 'ball') 
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





///The base of the flipper is a 15mm diameter circle, sloping down to a 5mm diameter circle at the tip. Overall length is 71mm, 