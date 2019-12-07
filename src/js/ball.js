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
        this.body.isInMotion = false
        this.body.currentScore = 0
        this.body.combo = 0
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
        this.ballIdleDuration = 0
        //Add ball to array
        balls.push(this.body)
        //Prevents the ball from spinning
        // this.body.inertia = Infinity
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
                this.table_sfx.volume = 0
                this.ramp_sfx.volume = .1
            }
            //Sets the volume of the ball rolling to the balls speed. 
            else
            {
                this.ramp_sfx.volume = 0
                this.table_sfx.volume = this.body.speed/8.5
            }

            if ( this.body.position.x === this.body.positionPrev.x )
            {
                this.ballIdleDuration++
            } else 
            {
                this.ballIdleDuration = 0
            }

            if ( this.body.position.y < 700 && this.ballIdleDuration > 200 )
            {
                this.body.applyForce(1,1)
            }
            
            //Kills the sound if the ball has been destroyed (by butters' target)
            if (this.body.isDestroyed)
            {
                this.table_sfx.stop()
                this.ramp_sfx.stop()
            }

            //Check balls location and adjusts collision groups accordingly
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
                this.setDepth(2)
            } 
            else 
            {
                this.setCollisions('table')
                this.setDepth(2)
			} 
			
			//Keeps the ball from spinning
			// this.body.angle = this.body.anglePrev
			this.body.angle = 0


            //Checks if the ball has escaped the map and puts it back on the launcher
            // if (this.x < 0 || this.x > game.config.width || this.y < 0 || this.y > game.config.height)
            // {
            //     this.readyBall()
            // }

            //Checks if the ball is traveling at a certain speed. 
            //This is for registering missed / made shots and tracking combos. 
            //See collisions.js for the rest of the code. 
            this.body.speed > 12 ? this.body.isInMotion = true : null

            //Check if the ball is in a killzone
            if (this.x < 425 && (this.y > 650 && (this.x < 192 || this.x > 330)) || this.y > 720) 
            {
                balls.pop()
                this.scene.sound.playAudioSprite('sound_effects', 'Drain')
                //playRandomSound('generic_negative', this.scene, 400)
                this.table_sfx.stop()
                this.ramp_sfx.stop()
                this.destroy()
                clearInterval(i)
            }
        }, 16.66666)
    }
}