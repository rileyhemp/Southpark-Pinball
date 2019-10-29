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
let balls, spacebar, ball, bounds

const game = new Phaser.Game(config)

function preload() {
    this.load.image('ball', 'dist/assets/sprites/wizball.png')
    this.load.image('rectA', 'dist/assets/solids/grey-solid.svg')
}

function create() {

    bounds = this.matter.world.setBounds(0, 0, 440, 800, 30, true, true, true, true)
    this.matter.world.setGravity(0,1)
   
    
    

    class Ball extends Phaser.Physics.Matter.Image {
        constructor(scene, x, y, texture) {
            super(scene.matter.world, x, y, texture)
            super.setScale(.3)
            super.setCircle(13)
            scene.sys.displayList.add(this)
            console.log(scene)
        }
        launch(){
            super.setVelocityY(-30)
        }
    }
    
    ball = new Ball(this, 430, 800, 'ball')

   
    

    spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

    
}

function update() {
    if (Phaser.Input.Keyboard.JustDown(spacebar)){
        this.create()
    }
} 

