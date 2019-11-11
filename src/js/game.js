

class Ball extends Phaser.Physics.Matter.Image {
    constructor(scene, x, y, texture) {
        super(scene.matter.world, x, y, texture)
        super.setScale(.17)
        super.setCircle(8.657)
        this.body.friction = 0
        this.body.frictionAir = 0.00001
        scene.sys.displayList.add(this)
        this.setCollisionCategory(collisionGroupA)
        this.body.density = 0.75
        this.setDepth(1)
    }
    launch(){
        super.setVelocityY(-30)
    }
}

class StaticShape extends Phaser.Physics.Matter.Image {
    constructor(scene, x, y, name){
        super(scene.matter.world, 0, 0, name)
        scene.sys.displayList.add(this) 
        
    }
}

class StaticCustomShape extends StaticShape {
    constructor(scene, x, y, name){
        super(scene, x, y, name)
        this.setExistingBody(Bodies.fromVertices(0,0, PATHS[`${name}`]))
        this.setStatic(true)
        this.x = x
        this.y = y
        this.setCollidesWith(collisionGroupA)
    }
}

class Bumper extends StaticShape {
    constructor(scene, x, y, name){
        super(scene, x, y, name)
        this.setCircle(24)
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
    bumperA, bumperB, bumperC, 
    rightWall,
    rightDivider,
    leftDivider,
    rightTrapDoor, 
    slingshotA, slingshotB,

    //Background
    playfield,
    plastics,

    //Utilities
    collisionGroupA,
    collisionGroupB,
    collisionGroupC,
    test,
    tween
    
const game = new Phaser.Game(config)

function preload() {
    this.load.image('ball', 'dist/assets/sprites/wizball.png')
    this.load.image('rectA', 'dist/assets/solids/grey-solid.svg')
    this.load.image('schematic', 'dist/assets/schematic.jpg')
    this.load.image('blueprint', 'dist/assets/blueprint.png')
    this.load.image('plastics', 'dist/assets/Plasticos.png')
    this.load.image('playfield', 'dist/assets/Playfield.png')
}

//***************************************************************************************//

function create() {

    //Set some things up, inputs, collisiongroups, etc. 
    collisionGroupA = this.matter.world.nextCategory()
    collisionGroupB = this.matter.world.nextCategory()
    collisionGroupC = this.matter.world.nextCategory()
    test = this
    bounds = this.matter.world.setBounds(0, 0, 440, 875, 30, true, true, true, true)
    left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
    right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
    spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    
    //Add a ball where you click
    this.input.on('pointerdown', function(pointer){
        ball = new Ball(this, pointer.x, pointer.y, 'ball') 
        console.log(pointer.x + ',', pointer.y)
    }, this)

    
    //Layout overlay
    // let blueprint = this.add.image(220,437.5, 'blueprint')
    // blueprint.setScale(0.9)
    
    
    // playfield = this.add.image(220, 445, 'playfield')
    // playfield.setScale(0.21)
    // playfield.setDepth(1)
    
    // plastics = this.add.image(220, 445, 'plastics')
    // plastics.setScale(0.21)
    // plastics.setDepth(1)
    
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
    
    bumperA = new Bumper(this, 200, 240, 'bumperA')
    bumperB = new Bumper(this, 150, 190, 'bumperB')
    bumperC = new Bumper(this, 250, 190, 'bumperC')
    
    rightWall = this.matter.add.image(390, 595, 'rectA').setScale(0.02, 4.2).setStatic(true)
    
    leftDivider = this.matter.add.image(40, 630, 'rectA').setScale(0.01, 1.7).setStatic(true)
    rightDivider = this.matter.add.image(352, 600, 'rectA').setScale(0.01, 1).setStatic(true)
    
    rightTrapDoor = this.matter.add.image(365, 660, 'rectA').setScale(0.01, .9)
    rightTrapDoor.rotation = .8
    rightTrapDoor.setStatic(true)
    
    slingshotA = new Slingshot(this, 78, 577, 121, 681, 132, 613, 9)
    slingshotB = new Slingshot(this, 280, 667, 313, 567, 260, 607, 9)
    
    //Setup collision events
    this.matter.world.on('collisionstart', function(event, bodyA, bodyB){
        if (bodyB.label === 'Circle Body' && bodyA.label === 'Slingshot'){
            slingshotA.fire()
            slingshotB.fire()
        }
    })
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



/*

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#000000',
    parent: 'phaser-example',
    physics: {
        default: 'matter',
        matter: {
            gravity: {
                y: 0.8
            },
            debug: true,
            debugBodyColor: 0xffffff
        }
    },
    scene: {
        create: create
    }
};

var bridge = ''

var game = new Phaser.Game(config);

function create ()
{
    this.matter.world.setBounds();

    this.matter.add.mouseSpring();

    var group = this.matter.world.nextGroup(true);

    var bridge = this.matter.add.stack(160, 290, 15, 1, 0, 0, function(x, y) {
        return Phaser.Physics.Matter.Matter.Bodies.rectangle(x - 20, y, 53, 20, { 
            collisionFilter: { group: group },
            chamfer: 5,
            density: 0.005,
            frictionAir: 0.05
        });
    });
    
    var myChain = this.matter.add.chain(bridge, 0.1, 0, -0.1, 0, {
        stiffness: 1,
        length: 0,
        render: {
            visible: false
        }
    });

    this.input.on('pointerdown', function(){
    myChain.bodies[8].force = {
        x: 0,
        y: -10
    }
    })

    console.log(myChain)
    

    this.matter.add.worldConstraint(bridge.bodies[0], 2, 0.9, {
        pointA: { x: 140, y: 300 }, 
        pointB: { x: -25, y: 0 }
    });

    this.matter.add.worldConstraint(bridge.bodies[bridge.bodies.length - 1], 2, 0.9, {
        pointA: { x: 660, y: 300 }, 
        pointB: { x: 25, y: 0 }
    });
}


*/