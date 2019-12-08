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
		this.setDepth(5)
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
		//backgroundMusic.play()
		document.querySelector('.launcher-inner').style.transition = 'height 1s linear'
		document.querySelector('.launcher-inner').style.height = '100%'
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
		document.querySelector('.launcher-inner').style.transition = '0.3s'
		document.querySelector('.launcher-inner').style.height = '0%'
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
