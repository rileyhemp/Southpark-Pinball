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

class StaticObject extends Phaser.Physics.Matter.Image {
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

const Bodies = Phaser.Physics.Matter.Matter.Bodies

const flipperLength = 70

const frictionAmount = 1

let 
    balls, 
    spacebar, 
    left,
    right,
    ball, 
    bounds, 
    leftFlipper, 
    rightFlipper, 
    leftApron,
    rightApron,
    dome,
    apronLeft,
    apronRight,
    apronBottom,
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
    wallTopRightInner,
    collisionGroupA,
    collisionGroupB,
    pegA,
    pegB,
    pegC,
    pegs,
    test
    
const game = new Phaser.Game(config)

function preload() {
    this.load.image('ball', 'dist/assets/sprites/wizball.png')
    this.load.image('rectA', 'dist/assets/solids/grey-solid.svg')
    this.load.image('schematic', 'dist/assets/schematic.jpg')
    this.load.image('dome', 'dist/assets/textures/Dome.png')
}

//***************************************************************************************//

function create() {

    //Define collision groups
    collisionGroupA = this.matter.world.nextCategory()
    collisionGroupB = this.matter.world.nextCategory()

    //Add the flippers
    leftFlipper = new LeftFlipper(this, 150, 710)
    rightFlipper = new RightFlipper(this, 290, 710)

    test = this

    //Set world bounds
    bounds = this.matter.world.setBounds(0, 0, 440, 800, 30, true, true, true, true)

    //Define inputs
    left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
    right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
    spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    
    //Layout overlay
    //let schematic = this.add.image(220,400, 'schematic')
    //schematic.scale = 0.8
    //schematic.y = schematic.y + 20
   
    //Create the ball

    ball = new Ball(this, 100, 625, 'ball') 
    
    //Place static objects

    dome = new StaticObject(this, 220, 190, 'dome')
    
    apronLeft = new StaticObject(this, 90, 658, 'apronLeft')

    apronRight = new StaticObject(this, 340, 680, 'apronRight')

    bumperLeft = new StaticObject(this, 120, 622, 'bumperLeft')

    bumperRight = new StaticObject(this, 314, 622, 'bumperRight')

    fixtureTopLeft = new StaticObject(this, 90, 165, 'fixtureTopLeft')  

    hsBottom = new StaticObject(this, 215, 115, 'hsBottom')

    hsTop = new StaticObject(this, 215, 110, 'hsTop')

    triPegLeft = new StaticObject(this, 40, 445, 'triPegLeft')

    triPegRight = new StaticObject(this, 400, 428, 'triPegRight')

    pegA = this.matter.add.image(0, 0, 'pegA')
    pegA.x = 312
    pegA.y = 60

    pegB = this.matter.add.image(0, 0, 'pegB')
    pegB.x = 370
    pegB.y = 109

    pegC = this.matter.add.image(0, 0, 'pegC')
    pegC.x = 298
    pegC.y = 135

    pegs = [pegA, pegB, pegC]

    for (let i=0; i<pegs.length; i++){
        pegs[i].frictionStatic = frictionAmount
        pegs[i].setBounce(2)
        pegs[i].setCircle(24).setStatic(true)
    }

    //Walls

    wallTopLeft = new StaticObject(this, 27, 345, 'wallTopLeft')

    wallTopRight = new StaticObject(this, 426, 305, 'wallTopRight')

    wallTopRightInner = new StaticObject(this, 385, 220, 'wallTopRightInner')

    wallLowLeft = new StaticObject(this, 26, 510, 'wallLowLeft')
    
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