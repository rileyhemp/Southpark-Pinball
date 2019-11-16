class Ball extends Phaser.Physics.Matter.Image {
    constructor(scene, x, y, texture) {
        super(scene.matter.world, x, y, texture)
        super.setScale(.21) 
        super.setCircle(8.75)
        this.body.friction = 0
        this.body.frictionAir = 0.0001
        scene.sys.displayList.add(this)
        this.setCollidesWith([collisionGroupA, collisionGroupB])
        this.setCollisionCategory(collisionGroupA)
        this.setDensity(.0009)
        this.setDepth(1)
        // this.body.restitution = 0.2
        // this.setBounce(0.2)
        this.body.label = 'Ball'
        this.killZoneCheck()
        this.id = this.body.id
        balls.push(this.body)
    }
    launch(){
        super.setVelocityY(-20.5)
    }
    killZoneCheck(){
        let i = setInterval(()=>{
            if (this.y > 720){
                this.destroy()
                clearInterval(i)
            }
        }, 100)
    }
}

class StaticShape {
    constructor(scene, type, x, y, width, height, rotation, collisionGroup){
        this.body = {}
        this.scene = scene
        this.type = type
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.rotation = rotation
        this.drawShape()
        this.body.collisionFilter.category = collisionGroup
    }
    drawShape(){
        if (this.type === 'rectangle'){
            this.body = this.scene.matter.add.rectangle(this.x, this.y, this.width, this.height, {
                isStatic: true,
                angle: this.rotation
            })
        } else if (this.type === 'circle'){
            this.body = this.scene.matter.add.circle(this.x, this.y, this.width, {
                isStatic: true
            })
        } else {
            alert `${this.type} is not a supported shape`
        }
    }
}

class StaticCustomShape extends Phaser.Physics.Matter.Image {
    constructor(scene, x, y, name, collisionGroup){
        super(scene.matter.world, x, y, name)
        this.setExistingBody(Bodies.fromVertices(0,0, PATHS[`${name}`]))
        this.body.restitution = 0
        this.setVisible(false)
        this.setStatic(true)
        this.x = x
        this.y = y
        this.setCollisionCategory(collisionGroup)
    }
}

class Bumper extends Phaser.Physics.Matter.Image {
    constructor(scene, x, y, name){
        super(scene.matter.world, x, y, name)
        this.setCircle(24)
        this.setStatic(true)
        this.setScale(0.85)
        this.body.mass = .999
        this.x = x
        this.y = y
        this.body.label = name
        this.scene = scene
        this.body.restitution = 1.5
    }
    fire(position){
        //Grab the starting position
        let startPosition = {
            x: this.x,
            y: this.y
        }
        //Calculate the midpoint between the ball and bumper
        let targetX = (this.x + position.x) / 2
        let targetY = (this.y + position.y) / 2

        //Tween to that point
        this.scene.tweens.add({
            targets: this,
            x: targetX,
            y: targetY,
            yoyo: true,
            duration: 20
        })
        //Reset the bumper after a brief delay
        setTimeout(()=>{
            this.x = startPosition.x
            this.y = startPosition.y
        }, 50)
    }
}

class Sensor extends StaticShape {
    constructor(scene, x, y, type, level, label){
        super(scene, 'circle', x, y, 12)
        this.body.collisionFilter.category = 2
        this.body.isSensor = true
        this.body.type = type
        this.level = level
        this.body.label = label
    }
}