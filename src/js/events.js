function startEvent(name, scene)
{
    switch(name) 
    {
        case "cartman" :
            let duration = 5000 //14500
            startCartman(scene)
            setTimeout(()=>
            {
                lights['cartmanBody'].hit > 4 ? endCartman(scene, 'win') : endCartman(scene, 'loss')
            }, duration)
    }
}

function startCartman(scene)
{
    cartmanCanStart = false
    // eventMusic = scene.sound.add('cartman_music')
    // setTimeout(()=>
    //     {
    //         backgroundMusic ? backgroundMusic.pause() : null
    //         eventMusic.play()
    //         scene.tweens.add({
    //             targets: eventMusic,
    //             volume: { from: 0, to: 1 },
    //             duration: 1000,
    //         })
	//     }, 2000)

	flashLights('cartman')
	
    scene.sound.playAudioSprite('sound_effects', 'Drain')
	playRandomSound('cartman_start', scene, 500)
	rampsCartmanGate.setDepth(0)
    //Reset the counter

    //Open the cartman ramp once all targets are hit
    let targets = [cartmanRight, cartmanLeft, cartmanCenter, cartmanBlock]
    for ( let target in targets )
    {
        targets[target].object.setCollidesWith(collisionGroupD)
    }
}

function endCartman(scene, result)
{
	lights.cartman.cartmanLeft.hit = 0
	lights.cartman.cartmanCenter.hit = 0
	lights.cartman.cartmanRight.hit = 0
	clearInterval(lights.cartman.isFlashing)
	rampsCartmanGate.setDepth(2)
    // eventMusic.stop()
    if (result === 'win' )
    {
		addScore('cartman-win')
        playRandomSound('cartman_end', scene, 500)
    } else 
    {
        // playRandomSound('generic_negative', scene, 500)
    }
    lights['cartmanBody'].hit = 0
    scene.sound.playAudioSprite('sound_effects', 'kicker_enter_center')
    let targets = [cartmanRight, cartmanLeft, cartmanCenter, cartmanBlock]
    for ( let target in targets )
    {
        targets[target].object.setCollidesWith(collisionGroupA)
	}
	//cartmanCanStart = true
}