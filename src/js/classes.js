class Ball extends Phaser.Physics.Matter.Image 
{
    constructor(scene, x, y, texture) 
    {
        super(scene.matter.world, x, y, texture)
        super.setScale(.8) 
        super.setCircle(8.75)
        this.id = this.body.id
        this.scene = scene
        this.body.label = 'Ball'
        this.setupBall()
        this.update()
    }

    setupBall()
    {
        this.body.friction = 0
        this.body.frictionAir = 0
        this.setDensity(.001)
        this.setDepth(1)
        //Set what the ball can collide with
        this.setCollisions('table')
        //Set the ball's own collision category
        this.setCollisionCategory(collisionGroupA)
        //Initialize variables 
        this.body.isOnRamp = false
        this.body.isOnCenterRamp = false
        this.body.isOnLauncher = false
        //Add ball to array
        balls.push(this.body)
        //Prevents the ball from spinning
        this.body.inertia = Infinity
        //Add the ball to the display list
        this.scene.sys.displayList.add(this)
        //Add rolling table sounds
        this.table_sfx = this.scene.sound.add('ball_rolling', { loop: true })
        this.table_sfx.play() 
        //Add rolling ramp sounds
        this.ramp_sfx = this.scene.sound.add('ramp_rolling', { loop: true })
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
        //Loads a ball on the launcher
        this.setVelocityX(0)
        this.setVelocityY(0)
        this.x = 455
        this.y = 689
    }

    update()
    {
        //Watch for changes
        let i = setInterval(()=>
        {
            //Changes sound when ball is on a ramp
            if (this.body.isOnPlastic) 
            {
                this.table_sfx.volume = this.table_sfx.volume - .1
                this.ramp_sfx.volume = .1
            }
            //Sets the volume of the ball rolling to the balls speed. 
            else
            {
                this.ramp_sfx.volume = 0
                this.table_sfx.volume = this.body.speed/8.5
            }
            
            //Kills the sound if the ball has been destroyed (by butters' target)
            if (this.body.isDestroyed)
            {
                this.table_sfx.stop()
                this.ramp_sfx.stop()
            }

            //Check balls status and adjust collisions accordingly
            if (this.body.isOnRamp && this.body.isOnCenterRamp)
            {
                this.setCollisions('centerRamp')
                this.setDepth(3)
            } 
            else if (this.body.isOnRamp)
            {
                this.setCollisions('ramps')
                this.setDepth(3)
            } 
            else if (!this.body.isOnRamp && this.body.isOnLauncher)
            {
                this.setCollisions('launcher')
                this.setDepth(1)
            } 
            else 
            {
                this.setCollisions('table')
                this.setDepth(1)
            } 

            //Checks if the ball has escaped the map and puts it back on the launcher
            if (this.x < 0 || this.x > game.config.width || this.y < 0 || this.y > game.config.height)
            {
                this.readyBall()
            }

            //Check if the ball is in a killzone
            if (this.x < 425 && (this.y > 650 && (this.x < 192 || this.x > 330)) || this.y > 720) 
            {
                //Remove ball from array
                balls.pop()
                //Play sound
                this.scene.sound.playAudioSprite('sound_effects', 'Drain')
                playRandomSound('generic_negative', this.scene, 400)
                //Stop rolling sounds
                this.table_sfx.stop()
                this.ramp_sfx.stop()
                //Destroy and stop watching for changes
                this.destroy()
                clearInterval(i)
            }
        }, 16.66666)
    }
}

class StaticShape 
{
    constructor(scene, type, x, y, width, height, rotation, collisionGroup, label)
    {
        this.body = {}
        this.scene = scene
        this.type = type
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.rotation = rotation
        this.drawShape()
        this.object = this.scene.matter.add.image(this.x, this.y, null).setExistingBody(this.body).setVisible(false)
        this.object.setCollisionCategory(collisionGroup)
        this.body.label = label
    }

    drawShape()
    {
        if (this.type === 'rectangle')
        {
            this.body = this.scene.matter.add.rectangle(this.x, this.y, this.width, this.height, {
                isStatic: true,
                angle: this.rotation
                }
            )
        } 
        else if (this.type === 'circle')
        {
            this.body = this.scene.matter.add.circle(this.x, this.y, this.width, {
                isStatic: true
                }
            )
        } 
        else {alert `${this.type} is not a supported shape`}
    }
}

class StaticCustomShape extends Phaser.Physics.Matter.Image 
{
    constructor(scene, x, y, name, collisionGroup)
    {
        super(scene.matter.world, x, y, name)
        this.setExistingBody(Bodies.fromVertices(0,0, PATHS[`${name}`]))
        this.body.restitution = 0
        this.body.label = name
        this.setVisible(false)
        this.setStatic(true)
        this.x = x
        this.y = y
        this.setCollisionCategory(collisionGroup)
    }
}

class Bumper extends Phaser.Physics.Matter.Image 
{
    constructor(scene, x, y, name)
    {
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

    fire(position)
    {
        let sounds = ['Bumper', 'BumperLeft', 'BumperMiddle', 'BumperRight']

        if (this.canAnimate) 
        {
            //Play a random bumper sound & a bell
            this.scene.sound.playAudioSprite('sound_effects', sounds[Math.floor(Math.random()*sounds.length)])
            this.scene.sound.playAudioSprite('sound_effects', 'bell_ding', {
                volume: 0.2
            })
            
            //Restrict firing 
            this.canAnimate = false
            
            //Grab the starting position
            let startPosition = 
            {
                x: this.x,
                y: this.y
            }
            //Calculate the midpoint between the ball and bumper
            let targetX = (this.x + position.x) / 2
            let targetY = (this.y + position.y) / 2

            //Tween to that point
            this.scene.tweens.add(
            {
                targets: this,
                x: targetX,
                y: targetY,
                yoyo: true,
                duration: 20,
                repeat: 0
            })

            //Move the bumper back to the starting position and un-restrict firing shortly thereafter. 
            setTimeout(()=>
            {
                this.x = startPosition.x
                this.y = startPosition.y
                setTimeout(()=>
                {
                    this.canAnimate = true
                }, 100)
            }, 40)
        }
    }
}

class Sensor extends StaticShape 
{
    constructor(scene, x, y, width, height, rotation, type, name, collisionGroup)
    {
        super(scene, 'rectangle', x, y, width, height, rotation, collisionGroup)
        this.body.isSensor = true
        this.body.type = type
        this.body.label = name
    }
}

class Launcher 
{
    constructor(scene, x, y) 
    {
        this.x = x
        this.y = y
        this.scene = scene
        this.createComponents()
    }

    createComponents() 
    {
        //Create the top of the launcher
        let rectA = Phaser.Physics.Matter.Matter.Bodies.circle(this.x , this.y, 15)
        let body = this.scene.matter.body.create({
            parts: [ rectA ]
        })
        this.top = this.scene.matter.add.image(150, 0, null).setExistingBody(body).setVisible(false)
        this.top.setCollisionCategory(collisionGroupA)
        this.top.setCollidesWith(collisionGroupA)
        this.top.body.inertia = Infinity
        //Create the rest of the launcher
        this.bottom = new StaticShape(this.scene, 'rectangle', this.x, this.y + 50, 40, 20, 0, collisionGroupA )
        this.left = new StaticShape(this.scene, 'rectangle', this.x - 10, this.y, 10, 100, 0, collisionGroupA )
        this.right = new StaticShape(this.scene, 'rectangle', this.x + 10, this.y, 10, 100, 0, collisionGroupA )
        this.spring = this.scene.matter.add.constraint(this.bottom, this.top)
        this.spring.length = 90
    }

    charge() 
    {
        //Starts the music
        backgroundMusic.play()

        //Pulls back the spring until it reaches desired length
        this.update = setInterval(() => 
        {
            this.spring.length--
            if (this.spring.length < 70)
            {
                clearInterval(this.update)
            }
        }, 40)
    }

    fire() 
    {
        //Play sound
        this.scene.sound.playAudioSprite('sound_effects', "Plunger")

        //Stop pulling the spring back
        clearInterval(this.update)

        //Tween back to the starting position. The time is constant, so the greater distance the greater the impact. 
        this.scene.tweens.add(
        {
            targets: this.spring,
            length: 102,
            duration: 20
        })

        //Reset the spring
        setTimeout(() => 
        {
            this.spring.length = 90
        }, 50)
    }
}
