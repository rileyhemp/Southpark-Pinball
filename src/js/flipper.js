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
        this.endPosition = 100
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

        
        this.flipper = this.scene.matter.add.image(150, 0, null).setExistingBody(this.flipperBody).setVisible(false)


        //Joints
        
        this.pin = this.scene.matter.add.constraint(this.pivot, this.flipper)
        this.pin.stiffness = 0.9
        this.pin.length = 0

        this.pistonPin = this.scene.matter.add.constraint(this.flipper, this.block)
        this.pistonPin.length = this.startPosition

        this.positionPin()
    }

    setCollisionGroups(){

        this.flipper.setCollisionCategory(collisionGroupA)
        this.flipper.setCollidesWith(collisionGroupA)
    }

    flip(){
        this.scene.tweens.add({
            targets: this.pistonPin,
            length: this.endPosition,
            duration: this.speed
        })
    }

    release(){
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
        super.createComponents()
        super.setCollisionGroups()
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
        this.blockOffsetX = -this.blockOffsetX
        this.blockRotation = -this.blockRotation
        this.stopperOffsetX = -this.stopperOffsetX
        this.flipperOffsetX = -this.flipperOffsetX
        this.torque = -this.torque
        this.staticTorque = -this.staticTorque
        super.createComponents()
        super.setCollisionGroups()
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
        this.blockOffsetX = 25
        this.blockOffsetY = 60
        this.flipperLength = 55
        this.startPosition = 50
        this.endPosition = 80
        this.speed = 28
        super.createComponents()
        super.setCollisionGroups()
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




