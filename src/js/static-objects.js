function createStaticObjects(scene)
{    
    //StaticCustomShape(scene, x, y, path, collision group)
    //StaticShape(scene, type, x, y, width, height, rotation, collision group)

    //First level (collision group B)
    //new StaticCustomShape(scene, 218, 90, 'midTargetLeft', collisionGroupB)
    new StaticCustomShape(scene, 250, 740, 'killZone', collisionGroupB).setScale(0.9, 1)
    new StaticCustomShape(scene, 147, 200, 'topLoop', collisionGroupB).setScale(0.85, 0.9)
    new StaticCustomShape(scene, 155, 244, 'leftRampLeft', collisionGroupB).setScale(0.82, 1)
    new StaticCustomShape(scene, 155, 244, 'leftRampLeft', collisionGroupC).setScale(0.82, 1)
    new StaticCustomShape(scene, 152, 134, 'leftLoopTop', collisionGroupB).setAngle(11)
    new StaticShape(scene, 'rectangle', 247, 95, 135, 15, 6.15, collisionGroupB) // top loop
    new StaticCustomShape(scene, 60, 488, 'leftWall', collisionGroupB).setScale(1,1.1)
    new StaticCustomShape(scene, 423, 530, 'rightWallA', collisionGroupB).setScale(1, 1.1).setAngle(-2.2)
    new StaticCustomShape(scene, 405, 320, 'rightWallB', collisionGroupB).setScale(.8, 1)
    new StaticCustomShape(scene, 350, 218, 'rightTrapCowl', collisionGroupB).setScale(0.82, 1) // Butters trap
    new StaticCustomShape(scene, 450, 455, 'farRightWall', collisionGroupB).setAngle(-.5) 
    new StaticCustomShape(scene, 365, 593, 'rightLane', collisionGroupB).setScale(0.82, 1)
    new StaticCustomShape(scene, 107, 593, 'leftLane', collisionGroupB).setScale(0.82, 1)
    new StaticCustomShape(scene, 130, 540, 'leftSlingshot', collisionGroupB).setScale(0.82, 1).setCollidesWith(collisionGroupA)
    new StaticCustomShape(scene, 345, 540, 'rightSlingshot', collisionGroupB).setScale(0.82, 1).setCollidesWith(collisionGroupA)
    new StaticCustomShape(scene, 378, 400, 'rightTargets', collisionGroupB).setScale(1, 1)//Randy
    new StaticShape(scene, 'rectangle', 447, 700, 10, 5, 1, collisionGroupB)// Launcher align
    new StaticShape(scene, 'rectangle', 463, 700, 10, 5, -1, collisionGroupB)// Launcher align
    new StaticShape(scene, 'rectangle', 425, 475, 1, 470, -0.08, collisionGroupB)// Launcher lane inner
    new StaticShape(scene, 'rectangle', 415, 187, 10, 150, .15, collisionGroupD)// Launcher lane gate
    new StaticShape(scene, 'rectangle', 55, 506, 10, 200, .08, collisionGroupD)// Left wall
    new StaticShape(scene, 'circle', 310, 64, 10, null, null, collisionGroupE, 'rubber')//Launcher top loop gate
    new StaticShape(scene, 'circle', 385, 488, 5, null, null, collisionGroupB, 'rubber') // Right lane topper
    new StaticShape(scene, 'circle', 86, 488, 5, null, null, collisionGroupB, 'rubber') // Left lane topper
    new StaticShape(scene, 'circle', 407, 451, 5, null, null, collisionGroupB, 'rubber') 
    new StaticShape(scene, 'circle', 314, 80, 5, null, null, collisionGroupB, 'rubber')//Top tri-lane
    new StaticShape(scene, 'circle', 341, 76, 5, null, null, collisionGroupB, 'rubber')//Top tri-lane
    new StaticShape(scene, 'circle', 314, 98, 5, null, null, collisionGroupB, 'rubber')//Top tri-lane
    new StaticShape(scene, 'circle', 341, 94, 5, null, null, collisionGroupB, 'rubber')//Top tri-lane
    new StaticShape(scene, 'circle', 375, 98, 5, null, null, collisionGroupB, 'rubber')//Top tri-lane
    new StaticShape(scene, 'circle', 367, 98, 5, null, null, collisionGroupB, 'rubber')//Top tri-lane
    new StaticShape(scene, 'circle', 320, 160, 10, null, null, collisionGroupB, 'rubber') // Bumpers spacer
    new StaticShape(scene, 'circle', 100, 435, 8, null, null, collisionGroupB, 'rubber') // Left lane
    new StaticShape(scene, 'circle', 125, 491, 12, null, null, collisionGroupB, 'rubber') // Slingshot corners
    new StaticShape(scene, 'circle', 350, 491, 12, null, null, collisionGroupB, 'rubber') // 
    new StaticShape(scene, 'circle', 148, 575, 8, null, null, collisionGroupB, 'rubber') // 
    new StaticShape(scene, 'circle', 326, 575, 8, null, null, collisionGroupB, 'rubber') // 
    cartmanBlock = new StaticShape(scene, 'rectangle', 257, 202, 70, 62, .02, collisionGroupB)// Cartman targets
    new StaticShape(scene, 'rectangle', 249, 125, 62, 30, .02, collisionGroupB)// Cartman back center
    new StaticShape(scene, 'rectangle', 219, 160, 82, 10, 1.5, collisionGroupB)// Cartman back left
    new StaticShape(scene, 'rectangle', 283, 159, 82, 10, 1.3, collisionGroupB)// Cartman back right
    
    //Second level (collision group C)
    new StaticCustomShape(scene, 147, 10, 'leftRampDiverter', collisionGroupE)
    new StaticShape(scene, 'circle', 144, 45, 23, null, null, collisionGroupD) // Left ramp bottom
    new StaticCustomShape(scene, 65, 500, 'leftLaneBottomLeft', collisionGroupC) // Left Lane bottom L
    new StaticCustomShape(scene, 110, 450, 'leftLaneBottomRight', collisionGroupC) // Left lane bottom R
    new StaticCustomShape(scene, 171, 184, 'leftRampRight', collisionGroupC).setScale(0.7, 1.2)
    new StaticCustomShape(scene, 163, 110, 'rightRampDivider', collisionGroupC).setScale(0.6, 1) // Left / center ramp divider
    new StaticCustomShape(scene, 140, 7, 'leftRampTop', collisionGroupC).setScale(0.8, 1)// Left ramp top
    new StaticShape(scene, 'rectangle', 220, 117, 35, 180, -0.2, collisionGroupC) // Mid ramp right
    new StaticShape(scene, 'circle', 348, 78, 50, null, null, collisionGroupC) //Right ramp bottom
    new StaticCustomShape(scene, 335, 16, 'rightRampTop', collisionGroupC).setScale(0.8, 1) // Right ramp top
    // new StaticShape(scene, 'rectangle', 275, 125, 15, 170, -0.05, collisionGroupC) // Right ramp left
    new StaticShape(scene, 'rectangle', 319, 160, 20, 140, -0.15, collisionGroupC) // Right ramp right
    new StaticShape(scene, 'rectangle', 315, 160, 10, 140, -0.15, collisionGroupB) // Right ramp right
    new StaticShape(scene, 'rectangle', 74, 228, 15, 360, 0.085, collisionGroupC) // Left rail L
    new StaticShape(scene, 'rectangle', 112, 228, 15, 360, 0.095, collisionGroupC) // Left rail R
    new StaticShape(scene, 'rectangle', 113, 511, 15, 25, 1, collisionGroupC) // Left rail termination
    new StaticShape(scene, 'rectangle', 402, 232, 15, 325, -0.08, collisionGroupC) // Right lane L
    new StaticShape(scene, 'rectangle', 445, 228, 15, 340, -0.08, collisionGroupC) // Right lane R
    new StaticShape(scene, 'rectangle', 383, 443, 130, 15, -1, collisionGroupC) // Right lane Bottom L
    new StaticShape(scene, 'rectangle', 427, 450, 160, 15, -1, collisionGroupC) // Right lane Bottom R
    new StaticShape(scene, 'rectangle', 363, 514, 15, 30, -1, collisionGroupC) // Right lane termination
    
    //Sensors 
    //constructor(scene, x, y, width, height, rotation, type, name, collisionGroup)
    //Ramp on
    new Sensor(scene, 165, 235, 30, 20, 1.6, 'ramp-on', 'leftRampOn', sensorGroupA)
    new Sensor(scene, 202, 205, 30, 20, -.1, 'ramp-on', 'centerRampOn', sensorGroupA)
    new Sensor(scene, 303, 200, 30, 20, -.1, 'ramp-on', 'rightRampOn', sensorGroupA)  
    //Ramp off
    new Sensor(scene, 78, 461, 30, 20, -.50, 'ramp-off', 'leftRampOff', sensorGroupB)  
    new Sensor(scene, 396, 461, 30, 20, .50, 'ramp-off', 'rightRampOff', sensorGroupB) 
    new Sensor(scene, 255, 262, 120, 20, 0, 'all-ramps-off', 'allRampsOff', sensorGroupB)  
    //Ramp hit
    new Sensor(scene, 110, 36, 30, 20, 1.6, 'ramp-hit', 'leftRampHit', sensorGroupB)
    new Sensor(scene, 136, 13, 50, 20, -.1, 'ramp-hit', 'centerRampHit', sensorGroupB)
    new Sensor(scene, 349, 16, 60, 20, -.1, 'ramp-hit', 'rightRampHit', sensorGroupB)  
    //Loop hit
    new Sensor(scene, 296, 68, 20, 20, 0, 'loop-hit', null, sensorGroupA)
    //Cartman hit
    cartmanLeft = new Sensor(scene, 257, 226, 18, 20, 0, 'cartman-hit', 'cartman-center', sensorGroupA)
    cartmanCenter = new Sensor(scene, 237, 226, 18, 20, 0, 'cartman-hit', 'cartman-left', sensorGroupA)
    cartmanRight = new Sensor(scene, 277, 226, 18, 20, 0, 'cartman-hit', 'cartman-right', sensorGroupA)
    new Sensor(scene, 249, 153, 40, 10, 0, 'cartman-himself', 'cartman-himself', sensorGroupA) //Cartman himself
    //Launcher on 
    new Sensor(scene, 435, 477, 30, 20, 1.6, 'launcher-on', 'launcherOn', sensorGroupA)
    //Launcher off
    new Sensor(scene, 349, 100, 80, 20, -.1, 'launcher-off', 'launcherOff', sensorGroupA)
    //Butters
    new Sensor(scene, 356, 218, 30, 10, .3, 'target', 'butters', sensorGroupA)
    //Rails 
    new Sensor(scene, 107, 47, 30, 20, 0, 'rail', null, sensorGroupB)
    new Sensor(scene, 408, 47, 30, 20, 0, 'rail', null, sensorGroupB)
}