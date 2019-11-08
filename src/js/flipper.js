
class Flipper {
    constructor(scene, x, y){
        this.scene = scene
        this.x = x
        this.y = y
        this.blockOffsetX = 25
        this.blockOffsetY = 37
        this.blockRotation = .50
        this.stopperOffsetX = 25
        this.stopperOffsetY = -25
        this.flipperOffsetX = 25
        this.flipperOffsetY = 5
        this.isFlipping = false
        this.torque = -1.5
        this.staticTorque = 0.5
        this.flipperLength = 62
    }
    createComponents(){
        //Create bottom block
        this.block = this.scene.matter.add.image(this.x + this.blockOffsetX,this.y + this.blockOffsetY, 'rectA', this.scene, {
            isStatic: true
        })
        this.block.scaleX = .1
        this.block.scaleY = .3
        this.block.visible = false
        this.block.rotation = this.blockRotation

        //Create top stopper
        this.stopper = this.scene.matter.add.image(this.x + this.stopperOffsetX,this.y + this.stopperOffsetY ,'rectA', this.scene, {
            isStatic: true
        })
        this.stopper.scaleX = .1
        this.stopper.scaleY = .4
        this.stopper.visible = false

        //Create pivot point
        this.pivot = this.scene.matter.add.image(this.x, this.y, null, this.scene)
        this.pivot.setScale(.2)
        this.pivot.setCircle(1)
        this.pivot.setStatic(true)

        //Create flipper
        let rectA = Phaser.Physics.Matter.Matter.Bodies.rectangle(this.x + this.flipperOffsetX , this.y + this.flipperOffsetY, this.flipperLength, 16)
        this.flipperBody = this.scene.matter.body.create({
            parts: [ rectA ]
        })
        this.flipper = this.scene.matter.add.image(150, 0, null).setScale(0.2).setExistingBody(this.flipperBody)
        //Create pin
        this.pin = this.scene.matter.add.constraint(this.pivot, this.flipper)
        this.pin.stiffness = 0.9
        this.pin.length = 0
        this.positionPin()
    }

    setPhysicsProperties(){
        
    }

    setCollisionGroups(){
        [ this.block, this.stopper, this.flipper ].forEach( el => {
            el.setCollisionCategory(collisionGroupB)
        })
        this.stopper.setCollidesWith(collisionGroupB)
        this.flipper.setCollidesWith([ collisionGroupA, collisionGroupB ])

        this.setPhysicsProperties()
    }

    flip(){
        this.flipper.body.torque = this.torque
        if(this.isFlipping){
            this.flipper.body.torque = this.torque
        }
    }

    hold(){
        this.flipper.body.torque = this.staticTorque
        if (this.isFlipping){
            this.flipper.body.torque = -this.staticTorque
        }
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
            x: -this.flipperLength/2+3, 
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
            x: this.flipperLength/2-3, 
            y: 0
        }
    }
}