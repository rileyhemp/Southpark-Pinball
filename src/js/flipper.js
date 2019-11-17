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
        this.torque = -8.5
        this.staticTorque = 2 
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
        //The flipper is made up of two rectangles, one slightly smaller then the other. The reason for this is that the ball would occassionally miss the flipper at high speed, 
        //and the second rectangle is there as a backup. It works most of the time, but is not ideal. 
        //
        let rectA = Phaser.Physics.Matter.Matter.Bodies.rectangle(this.x + this.flipperOffsetX , this.y + this.flipperOffsetY, this.flipperLength, 24, {
            chamfer: 10,
        })
        let rectB = Phaser.Physics.Matter.Matter.Bodies.rectangle(this.x + this.flipperOffsetX , this.y + this.flipperOffsetY, this.flipperLength, 16, {
            chamfer: 10,
        })
        this.flipperBody = this.scene.matter.body.create({
            parts: [ rectA ]
        })
        this.flipperBodyInner = this.scene.matter.body.create({
            parts: [ rectB ]
        })
        
        this.flipper = this.scene.matter.add.image(150, 0, null).setExistingBody(this.flipperBody).setVisible(false)
        this.flipperInner = this.scene.matter.add.image(150, 0, null).setExistingBody(this.flipperBodyInner).setVisible(false)
        this.flipper.body.restitution = 0.1
        this.flipper.setBounce(0.2)
        this.flipperInner.setBounce(0.2)

        //Joint
        this.pin = this.scene.matter.add.constraint(this.pivot, this.flipper)
        this.pin.stiffness = 0.9
        this.pin.length = 0


        this.pin2 = this.scene.matter.add.constraint(this.pivot, this.flipperInner)
        this.pin2.stiffness = 0.9
        this.pin2.length = 0


        this.pin3 = this.scene.matter.add.constraint(this.flipper, this.flipperInner)
        this.pin3.stiffness = 0.9
        this.pin3.length = 0
        this.positionPin()
    }

    setCollisionGroups(){
        [ this.block, this.stopper ].forEach( el => {
            el.setCollisionCategory(flipperCollisionGroup)
        })
        
        this.flipper.setCollisionCategory(collisionGroupA)
        this.flipper.setCollidesWith([ collisionGroupA, flipperCollisionGroup ])

        this.flipperInner.setCollisionCategory(collisionGroupB)
        this.flipperInner.setCollidesWith([ collisionGroupA, flipperCollisionGroup ])

    }

    flip(){
        this.flipper.body.torque = this.torque
        if(this.isFlipping){
            this.flipper.body.torque = this.torque
        }
        //When flipping, increase the friction of the ball (simulates rubbers)
        // ball.setFriction(1)
        // setTimeout(() => {
        //     ball.setFriction(0)
        // }, 100)
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
        this.pin2.pointA = {
            x: 5,
            y: 5
        }
        this.pin2.pointB = {
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
        this.pin2.pointA = {
            x: -5,
            y: 5
        }
        this.pin2.pointB = {
            x: this.flipperLength/2-3, 
            y: 0
        }
    }
}




