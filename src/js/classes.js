class Ball extends Phaser.Physics.Matter.Image {
    constructor(scene, x, y, texture) {
        super(scene.matter.world, x, y, texture)
        super.setScale(.8) 
        super.setCircle(8.75)
        this.id = this.body.id
        this.scene = scene
        this.body.label = 'Ball'
        this.setupBall()
        this.update()
    }
    setupBall(){
        this.setCollisions('table')
        this.body.hasCollided = false
        this.body.isOnRamp = false
        this.body.isOnCenterRamp = false
        this.body.isOnLauncher = false
        this.body.friction = 0
        this.body.frictionAir = 0
        this.body.inertia = Infinity
        this.setDensity(.001)
        this.setDepth(1)
        this.setCollisionCategory(collisionGroupA)
        balls.push(this.body)
        //Add the ball to the display list
        this.scene.sys.displayList.add(this)
        //Add sound
        this.table_sfx = this.scene.sound.add('ball_rolling', { loop: true })
        this.ramp_sfx = this.scene.sound.add('ramp_rolling', { loop: true })
        this.table_sfx.play() 
        this.ramp_sfx.play() 
    }
    setCollisions(level)
    { 
        //Changes what the ball can collide with depending on where it is
        if ( level === 'table' ){
            this.setCollidesWith([collisionGroupA, collisionGroupB, collisionGroupD, sensorGroupA])
        } else if ( level === 'launcher' ) {
            this.setCollidesWith([collisionGroupA, collisionGroupB, collisionGroupE, sensorGroupA])
        } else if ( level === 'ramps' ){
            this.setCollidesWith([collisionGroupA, collisionGroupC, collisionGroupE, sensorGroupB])
        } else if ( level === 'centerRamp' ){
            this.setCollidesWith([collisionGroupA, collisionGroupC, collisionGroupD, sensorGroupB])
        }
    }
    readyBall()
    {
        this.x = 455
        this.y = 689
    }
    update()
    {
        let i = setInterval(()=>
        {
            //Changes sound when ball is on a ramp
            if (this.body.isOnPlastic) 
            {
                this.table_sfx.volume = 0
                this.ramp_sfx.volume = .25
            }
            //Sets the volume of the ball rolling to the balls speed. 
            else
            {
                this.ramp_sfx.volume = 0
                this.table_sfx.volume = this.body.speed/8
            }

            //Check if the ball is on a ramp
            if (this.body.isOnRamp && this.body.isOnCenterRamp){
                this.setCollisions('centerRamp')
                this.setDepth(3)
            } else if (this.body.isOnRamp){
                this.setCollisions('ramps')
                this.setDepth(3)
            } else if (!this.body.isOnRamp && this.body.isOnLauncher){
                this.setCollisions('launcher')
                this.setDepth(1)
            } else {
                this.setCollisions('table')
                this.setDepth(1)
            } 
            //Checks if the ball has escaped the map
            if (this.x < 0 || this.x > game.config.width || this.y < 0 || this.y > game.config.height){
                this.readyBall()
            }

            //Check if the ball is in a killzone
            if (this.x < 425 && (this.y > 650 && (this.x < 192 || this.x > 330)) || this.y > 720) {
                balls.pop()
                this.destroy()
                this.table_sfx.stop()
                this.ramp_sfx.stop()
                clearInterval(i)
            }
        }, 16.66666)
    }
}

class StaticShape {
    constructor(scene, type, x, y, width, height, rotation, collisionGroup, label){
        this.body = {}
        this.scene = scene
        this.type = type
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.rotation = rotation
        this.drawShape()
        //this.body.collisionFilter.category = collisionGroup
        this.object = this.scene.matter.add.image(this.x, this.y, null).setExistingBody(this.body).setVisible(false)
        this.object.setCollisionCategory(collisionGroup)
        this.body.label = label
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
        this.body.label = "StaticCustomShape"
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
        this.setScale(0.75)
        this.body.mass = .999
        this.x = x
        this.y = y
        this.body.label = name
        this.scene = scene
        this.body.restitution = 1
        this.setCollisionCategory(collisionGroupB)
        this.canAnimate = true
        this.canPlaySound = true
    }
    fire(position){

        let sounds = ['Bumper', 'BumperLeft', 'BumperMiddle', 'BumperRight']
        
        //Grab the starting position
        if (this.canAnimate) {
            this.scene.sound.playAudioSprite('sound_effects', sounds[Math.floor(Math.random()*sounds.length)])
            this.scene.sound.playAudioSprite('sound_effects', 'bell_ding', {
                volume: 0.2
            })
            
            this.canAnimate = false
            
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
                duration: 20,
                repeat: 0
            })

            setTimeout(()=>{
                this.x = startPosition.x
                this.y = startPosition.y
                setTimeout(()=>{
                    this.canAnimate = true
                }, 100)
            }, 40)

            


        }
    }
}

class Sensor extends StaticShape {
    constructor(scene, x, y, width, height, rotation, type, name, collisionGroup){
        super(scene, 'rectangle', x, y, width, height, rotation, collisionGroup)
        this.body.isSensor = true
        this.body.type = type
        this.body.label = name
    }
}

class Launcher {
    constructor(scene, x, y) {
        this.x = x
        this.y = y
        this.scene = scene
        this.createComponents()
    }

    createComponents() {

        //Create a dynamic body for the top
        let rectA = Phaser.Physics.Matter.Matter.Bodies.circle(this.x , this.y, 15)

        let body = this.scene.matter.body.create({
            parts: [ rectA ]
        })
        this.top = this.scene.matter.add.image(150, 0, null).setExistingBody(body).setVisible(false)
        this.top.setCollisionCategory(collisionGroupA)
        this.top.setCollidesWith(collisionGroupA)
        this.top.body.inertia = Infinity
        this.bottom = new StaticShape(this.scene, 'rectangle', this.x, this.y + 50, 40, 20, 0, collisionGroupA )
        this.left = new StaticShape(this.scene, 'rectangle', this.x - 10, this.y, 10, 100, 0, collisionGroupA )
        this.right = new StaticShape(this.scene, 'rectangle', this.x + 10, this.y, 10, 100, 0, collisionGroupA )
        this.spring = this.scene.matter.add.constraint(this.bottom, this.top)
        this.spring.length = 90
    }
    charge() {
        backgroundMusic.play()

        //Pulls back the spring until it reaches desired length
        this.update = setInterval(() => {
            this.spring.length--
            if (this.spring.length < 70){
                clearInterval(this.update)
            }
        }, 40)
    }
    fire() {

        //Play sound
        this.scene.sound.playAudioSprite('sound_effects', "Plunger")

        //Stop pulling the spring back
        clearInterval(this.update)
        this.scene.tweens.add({
            targets: this.spring,
            length: 102,
            duration: 20
        })
        
        //Reset the spring
        setTimeout(() => {
            this.spring.length = 90
        }, 50)
    }
}
