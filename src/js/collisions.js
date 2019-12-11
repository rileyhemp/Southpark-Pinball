function registerHit(scene, bodyA, bodyB) {

	lights.butters.hit === 0 && bodyA !='cartman-hit' ? flashLights('butters', 1) : null

    switch(bodyA)
    {
        case "butters" :
			playRandomSound('butters_hit', scene)  
			lights.butters.active= true
            scene.sound.playAudioSprite('sound_effects', 'thunder', {volume: 0.5})
            scene.sound.playAudioSprite('sound_effects', 'hole_enter')
            bodyB.render.visible = false
            bodyB.isDestroyed = true
			bodyB.destroy()
			balls.pop()
			if (rampsLit < 5)
			{
				alert('Jackpot x' + rampsLit , 2000)
				addScore('jackpot', rampsLit)
			} else 
			{
				alert('Super Jackpot - 500,000', 2000)
				addScore('super-jackpot')
			}
            //Holds the ball for 3 seconds and shoots back to left flipper
            setTimeout(()=>
            {
                ball = new Ball(scene, 340, 259, 'ball') 
                ball.setVelocityY(3.3)
                ball.setVelocityX(-3.3)
                scene.sound.playAudioSprite('sound_effects', 'ExitSandman')
				addScore('butters')
				clearLights()
				rampsLit = 0
            }, 3000)     
            break     

        case "cartman-hit" :
            if (!lights[bodyB] && bodyB != 'cartman-himself')
            {
				scene.sound.playAudioSprite('sound_effects', 'target')
				lights.cartman[bodyB].hit++
            } 
            break          
        
        case "cartman-himself" :
			lights.cartmanBody.hit++
            playRandomSound('cartman_damage', scene)
			scene.sound.playAudioSprite('sound_effects', 'rubber_hit_2')
			addScore('cartman-body')
            break
        
        case "loop-hit" :
			rampsLit++
			addScore('loop')
			if (bodyB.velocity.x > 0)
			{
				flashLights('leftLoop', 1)
			} else
			{
				flashLights('rightLoop', 1)
			}
			break
		
		case "leftRampHit" :
			rampsLit++
			addScore('ramp')
			flashLights('leftRamp', 1)
			break
		case "centerRampHit" :
			rampsLit++
			addScore('ramp')
			flashLights('centerRamp', 1)
			break
		case "rightRampHit" :
			rampsLit++
			addScore('ramp')
			flashLights('rightRamp', 1)
			break
    }
}
function initCollisionListeners(scene) 
{
	//Collision start events
    scene.matter.world.on('collisionstart', (event, bodyA, bodyB) => 
    {
        if (bodyB.label === 'Ball') 
        {
            if ( bodyA.label === 'butters' ) 
            {   
                registerHit(scene, bodyA.label, bodyB)
            }
            if (bodyA.label === 'cartman-himself')
            {
				registerHit(scene, bodyA.type, bodyA.label)
			}       
			if (bodyA.type === 'loop-on') 
			{
				bodyB.level = 'table'
			}
			//Ramps
			if (bodyA.type === 'ramp-on')
			{
				bodyB.isOnRamp = true
				bodyB.isOnPlastic = true
			}            
			if (bodyA.label === 'leftRampOn')
			{
				bodyB.isOnPlastic = true
			}    
			//COMBOS
            if (bodyA.label === 'flipper')
            {
                //This function evaluates whether the ball is in an active combo. 
                //See ball.js for info on how it works
                if ( bodyB.isInMotion )
                {
                    bodyB.isInMotion = false
                    let scorePrevious = bodyB.currentScore
                    bodyB.currentScore = score
                    bodyB.currentScore > scorePrevious ? bodyB.combo++ : bodyB.combo = 0
                }   
            }
        }
	})

	//Collision end events
    scene.matter.world.on('collisionend', (event, bodyA, bodyB) => 
    {
        if (bodyB.label === 'Ball') 
        {
			//Ramp hits
            if (bodyA.label === 'leftRampHit' && !bodyB.isOnCenterRamp)
            {
				registerHit(scene, bodyA.label)
            }
            if (bodyA.label === 'centerRampHit')
            {
				registerHit(scene, bodyA.label)
			}
            if (bodyA.label === 'rightRampHit')
            {
				registerHit(scene, bodyA.label)
            }
            if (bodyA.type === 'cartman-hit')
            {
                registerHit(scene, bodyA.type, bodyA.label)
            }
			//Ramp on/off
            if (bodyA.label === 'centerRampOn')
            {
                bodyB.isOnCenterRamp = true
            }

            if (bodyA.type === 'loop-hit')
            {
                registerHit(scene, bodyA.type, bodyB)
			}
			
			if (bodyA.type === 'loop-on') 
			{
				bodyB.level = 'table'
			}

            //Generic ramp on
            if (bodyA.type === 'ramp-on')
            {
                bodyB.isOnRamp = true
                bodyB.isOnPlastic = true
            } 

            //Generic ramp off
            if (bodyA.type === 'ramp-off')
            {
                setTimeout(function(){
                    bodyB.isOnRamp = false
                    bodyB.isOnCenterRamp = false
                }, 100)
			}
			
			//"Roll back" failsafe 
            if (bodyA.type === 'all-ramps-off')
            {
                bodyB.isOnRamp = false
                bodyB.isOnCenterRamp = false
                bodyB.isOnPlastic = false
            }

            //Launcher on / off
            if (bodyA.type === 'launcher-on')
            {
                bodyB.isOnLauncher = true
            }

            if (bodyA.type === 'launcher-off')
            {
                bodyB.isOnLauncher = false
            }
        
            //Slingshots
            if (bodyA.label === 'leftSlingshot' && bodyB.position.x > 148)
            {
                leftSlingshot.fire()
            }

            if (bodyA.label === 'rightSlingshot' && bodyB.position.x < 335)
            {
                rightSlingshot.fire()
            }

            //Pop bumpers
            if ( bodyA.label === "bumper") 
            {
                bodyA.gameObject.fire(bodyB.position)
                addScore('bumper')
            }

            //Rails 
            if (bodyA.type === 'rail')
            {
                scene.sound.playAudioSprite('sound_effects', 'WireRamp', {
                    volume: 0.5
                })
                bodyB.isOnPlastic = false
                addScore('ramp')
            }

            //Rubbers 
            if (bodyA.label === 'rubber')
            {
                let sounds = ['rubber_hit_1', 'rubber_hit_2', 'rubber_hit_3']
                scene.sound.playAudioSprite('sound_effects', sounds[Math.floor(Math.random()*3)])
            }

            //Flippers 
            if (bodyA.label === 'flipper')
            {
                let sounds = ['flip_hit_1', 'flip_hit_2', 'flip_hit_3']
                scene.sound.playAudioSprite('sound_effects', sounds[Math.floor(Math.random()*sounds.length)])
            }
        }
    })
}