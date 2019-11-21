class Slingshot {

    constructor(scene, x1, y1, x2, y2, x3, y3, links){

        this.scene = scene
        this.x1 = x1
        this.x2 = x2
        this.y1 = y1
        this.y2 = y2

        var group = scene.matter.world.nextGroup(true)

        let width = 8
        let height = 20

        this.boxes = scene.matter.add.stack(x1, y1, links, 1, 0, 0, function(x, y) {
            return Phaser.Physics.Matter.Matter.Bodies.rectangle(x - 20, y, width, height, { 
                collisionFilter: { category: 16 },
                chamfer: 0,
                density: .01,
                frictionAir: 0,
                bounce: 0.001,
                friction: 0,
                label: 'Slingshot'
            })
        })

        this.chain = scene.matter.add.chain(this.boxes, 0.5, 0, -0.5, 0, {
            stiffness: 1,
            length: .2,
            render: {
                visible: false
            }
        })

        scene.matter.add.worldConstraint(this.boxes.bodies[0], .2, 0.9, {
            pointA: { x: x1, y: y1},
            pointB: { x:-width/2, y:-height/2 +10 }
        })

        scene.matter.add.worldConstraint(this.boxes.bodies[this.boxes.bodies.length -1], .2, 0.9, {
            pointA: { x: x2, y: y2},
            pointB: { x: width/2, y:-height/2 +10}
        })

        this.block = this.scene.matter.add.image(x3, y3, 'rectA', this.scene, {
            isStatic: true,
        })
        this.block.scaleX = .02
        this.block.scaleY = 0.1
        this.block.visible = false
        this.block.setCollidesWith(collisionGroupB)


        this.constraint = scene.matter.add.constraint( this.block, this.boxes.bodies[Math.floor(this.boxes.bodies.length/2)], 2, 0.0001, {
            pointA: {x: 0, y: 0},
            pointB: {x: 0, y: 0},
        })

    }

    fire(){
        this.constraint.stiffness = .5

        setTimeout(()=>{
            this.constraint.stiffness = .0001
        }, 20)
    }

    charge(){
        
    }

    release(){
        this.constraint.stiffness = 0.0001
    }

}