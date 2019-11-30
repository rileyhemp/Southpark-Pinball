class Flipper {
    constructor(scene, x, y, options){
        this.scene = scene
        this.x = x
        this.y = y
        this.blockOffsetX = 45
        this.blockOffsetY = 80
        this.flipperOffsetX = 25
        this.flipperOffsetY = 20
        this.flipperLength = 78
        this.flipperWidth = 40
        this.speed = 60
        this.startPosition = 28
        this.endPosition = 105
        this.isFlipping = false
    }

    createComponents(){
        
        //Bottom block
        this.block = this.scene.matter.add.image(this.x + this.blockOffsetX,this.y + this.blockOffsetY, 'rectA', this.scene, {
            isStatic: true
        })
        this.block.scaleX = .02
        this.block.scaleY = .1
        this.block.originX = 1
        this.block.originY = 0
        this.block.visible = false

        //Pivot point
        this.pivot = this.scene.matter.add.image(this.x, this.y, null, this.scene)
        this.pivot.setScale(.2)
        this.pivot.setCircle(1)
        this.pivot.setStatic(true)

        //Flipper 

        let rectA = Phaser.Physics.Matter.Matter.Bodies.rectangle(this.x + this.flipperOffsetX , this.y + this.flipperOffsetY, this.flipperLength, this.flipperWidth, {
            chamfer: 10,
        })

        this.flipperBody = this.scene.matter.body.create({
            parts: [ rectA ]
        })
        if (this.orientation === 'left') {
            this.flipper = this.scene.matter.add.image(150, 0, 'flipper').setExistingBody(this.flipperBody)
        } else if (this.orientation === 'right') {
            this.flipper = this.scene.matter.add.image(150, 0, 'rightFlipper').setExistingBody(this.flipperBody)
        } else {
            this.flipper = this.scene.matter.add.image(150, 0, 'sideFlipper').setExistingBody(this.flipperBody)
        }
        this.flipper.setDepth(2)

        this.flipper.displayOriginY = this.flipperWidth / 2


        //Joints
        
        this.pin = this.scene.matter.add.constraint(this.pivot, this.flipper)
        this.pin.stiffness = 0.9
        this.pin.length = 0

        this.pistonPin = this.scene.matter.add.constraint(this.flipper, this.block)
        this.pistonPin.length = this.startPosition
        this.flipper.body.parts[1].label = 'flipper'
        this.positionPin()
    }

    setCollisionGroups(){

        this.flipper.setCollisionCategory(collisionGroupA)
        this.flipper.setCollidesWith(collisionGroupA)
    }

    flip(){
        
        if (this.orientation === 'left'){
            this.scene.sound.playAudioSprite('sound_effects', "FlipperUpLeft")
        } else if (this.orientation === 'right'){
            this.scene.sound.playAudioSprite('sound_effects', "FlipperUpRight")            
        }
        this.isFlipping = true
        this.scene.tweens.add({
            targets: this.pistonPin,
            length: this.endPosition,
            duration: this.speed
        })
    }

    release(){
        setTimeout(()=>{
            this.isFlipping = false
        }, 100)
        this.scene.tweens.add({
            targets: this.pistonPin,
            length: this.startPosition,
            duration: this.speed
        })
    }

}

class LeftFlipper extends Flipper {
    constructor(scene, x, y){
        super(scene, x, y)
        this.orientation = 'left'
        super.createComponents()
        this.endPosition = 102
        super.setCollisionGroups()
        this.flipper.displayOriginX = 42
    }
    positionPin(){
        this.pin.pointA = {
            x: 5,  
            y: 5
        }
        this.pin.pointB = {
            x: -this.flipperLength/2, 
            y: -this.flipperWidth/2 + 10
        }
        this.pistonPin.pointA = {
            x: this.flipperLength/2.5, 
            y: 0
        }
    }
}

class RightFlipper extends Flipper {
    constructor(scene, x, y){
        super(scene, x, y)
        this.orientation = 'right'
        this.blockOffsetX = -this.blockOffsetX
        this.flipperOffsetX = -this.flipperOffsetX
        super.createComponents()
        super.setCollisionGroups()
        this.flipper.displayOriginX = 30
        this.flipper.body.parts[1].label = 'RightFlipper'
    }
    positionPin(){
        this.pin.pointA = {
            x: -5,  
            y: 5
        }
        this.pin.pointB = {
            x: this.flipperLength/2, 
            y: -this.flipperWidth/2 + 10
        }
        this.pistonPin.pointA = {
            x: -this.flipperLength/2.5, 
            y: 0
        }
    }
}

class SideFlipper extends Flipper {
    constructor(scene, x, y){
        super(scene, x, y)
        this.orientation = 'side'
        this.blockOffsetX = 25
        this.blockOffsetY = 60
        this.flipperLength = 70
        this.flipperWidth = 35
        this.startPosition = 50
        this.endPosition = 90
        this.speed = 40
        super.createComponents()
        super.setCollisionGroups()
        this.flipper.displayOriginX = 20
    }
    positionPin(){
        this.pin.pointA = {
            x: -5,  
            y: 5
        }
        this.pin.pointB = {
            x: this.flipperLength/2-3, 
            y: 0
        }
        this.pistonPin.pointA = {
            x: -this.flipperLength/2.5, 
            y: 0
        }
    }
}




