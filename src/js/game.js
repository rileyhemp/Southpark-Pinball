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

//Declare variables here
let balls, spacebar, ball, bounds, leftFlipper, rightFlipper, leftBumper, rightBumper,
leftBlock, leftPivot, leftJoint, constraint1, constraint2, leftStopper

const game = new Phaser.Game(config)

function preload() {
    this.load.image('ball', 'dist/assets/sprites/wizball.png')
    this.load.image('rectA', 'dist/assets/solids/grey-solid.svg')
}

function create() {
    bounds = this.matter.world.setBounds(0, 0, 440, 800, 30, true, true, true, true)
    this.matter.world.setGravity(0,1)
    spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    
    
    
    
    class Ball extends Phaser.Physics.Matter.Image {
        constructor(scene, x, y, texture) {
            super(scene.matter.world, x, y, texture)
            super.setScale(.3)
            super.setCircle(13)
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

    class Flipper extends Phaser.Physics.Matter.Image {
        constructor(scene, x, y, texture, orientation) {
            super(scene.matter.world, x, y, texture)
           // super.setStatic(true)
            super.setFriction(.2)
            scene.sys.displayList.add(this)
            this.setScale(0.5, 1)
            this.rotation = .4    
        }
    }
    
    ball = new Ball(this, 215, 0, 'ball')

    //Flipper mechanism
    leftFlipper = new Flipper(this, 200, 700, 'rectA').setInteractive()
    
    
    leftBlock = this.matter.add.image(175,740,'rectA', this, {
        isStatic: true
    })

    Object.assign(leftBlock, {
        scaleX: .5,
        scaleY: .1,
        rotation: .4
    })

    leftPivot = this.matter.add.image(120, 655, null, this, {
        isStatic: true
    })

    

    leftPivot.setScale(.2)

    constraint1 = this.matter.add.constraint(leftPivot, leftFlipper)
    constraint1.stiffness = .7 
    constraint1.length = 0
    constraint1.pointA = {
        x: 10, 
        y: 10
    }
    constraint1.pointB = {
        x: -65, 
        y: -40
    }

    leftStopper = this.matter.add.image(220, 600, null, this, {isStatic: true})
    leftStopper.setScale(1)

 
    //leftFlipper.applyForce({x:3,y:0}, {x:0, y:-100})


    
   
}

function update() {
    if (Phaser.Input.Keyboard.JustDown(spacebar)){
        this.create()
    }
} 

