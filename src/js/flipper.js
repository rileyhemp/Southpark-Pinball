
//set a circle in the beginning of the flipper and constrain it to the pivot directly. no offset. 

class Flipper {
    constructor(scene, x, y, options){
        this.scene = scene
        this.x = x
        this.y = y
        this.blockOffsetX = 25
        this.blockOffsetY = 45
        this.blockRotation = .50
        this.stopperOffsetX = 25
        this.stopperOffsetY = -23
        this.flipperOffsetX = 25
        this.flipperOffsetY = 5
        this.torque = -5
        this.staticTorque = 1
        this.flipperLength = 78
        this.isFlipping = false
    }
    createComponents(){
        
        //Bottom block
        this.block = this.scene.matter.add.image(this.x + this.blockOffsetX,this.y + this.blockOffsetY, 'rectA', this.scene, {
            isStatic: true
        })
        this.block.scaleX = .1
        this.block.scaleY = .3
        this.block.visible = false
        this.block.rotation = this.blockRotation

        //Top block
        this.stopper = this.scene.matter.add.image(this.x + this.stopperOffsetX,this.y + this.stopperOffsetY ,'rectA', this.scene, {
            isStatic: true
        })
        this.stopper.scaleX = .1
        this.stopper.scaleY = .4
        this.stopper.visible = false

        //Pivot point
        this.pivot = this.scene.matter.add.image(this.x, this.y, null, this.scene)
        this.pivot.setScale(.2)
        this.pivot.setCircle(1)
        this.pivot.setStatic(true)

        //Flipper
        let rectA = Phaser.Physics.Matter.Matter.Bodies.rectangle(this.x + this.flipperOffsetX , this.y + this.flipperOffsetY, this.flipperLength, 24, {
            chamfer: 10,
        })
        this.flipperBody = this.scene.matter.body.create({
            parts: [ rectA ]
        })
        this.flipper = this.scene.matter.add.image(150, 0, null).setScale(0.2).setExistingBody(this.flipperBody)
        this.flipper.body.restitution = 0

        //Joint
        this.pin = this.scene.matter.add.constraint(this.pivot, this.flipper)
        this.pin.stiffness = 0.9
        this.pin.length = 0
        this.positionPin()
    }

    setPhysicsProperties(){
        
    }

    setCollisionGroups(){
        [ this.block, this.stopper ].forEach( el => {
            el.setCollisionCategory(flipperCollisionGroup)
        })
        this.stopper.setCollidesWith(flipperCollisionGroup)
        this.flipper.setCollisionCategory(collisionGroupA)
        this.flipper.setCollidesWith([ collisionGroupA, flipperCollisionGroup ])

        this.setPhysicsProperties()
    }

    flip(){
        this.flipper.body.torque = this.torque
        if(this.isFlipping){
            this.flipper.body.torque = this.torque
        }
    }

    hold(){
        if (this.isFlipping){
            this.flipper.body.torque = -this.staticTorque
        }
    }
    release(){
        this.flipper.body.torque = this.staticTorque
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