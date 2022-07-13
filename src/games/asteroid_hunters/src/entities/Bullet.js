import MovingObject from "./MovingObject";

const VELOCITY = 10;
const PHYSICAL_BODY_RADIUS = 4;


const START_OFFSET = 0;

export default class Bullet extends MovingObject {

    constructor(scene, source, vec, texture){

        super(scene, START_OFFSET)

        this.scene = scene;

        

        this.activate(source, vec, texture)

        this.isBullet = true;
    }

    activate(source, vec, texture){ 

        // find the position of start of bullet relative to ship center
 

        this.x = source.x + vec.x;
        this.y = source.y + vec.y;

        this.setTexture(texture);
        
        // set physical body
        this.setCircle(PHYSICAL_BODY_RADIUS , {friction:0, frictionAir:0});

        this.dirVec = vec.setLength(VELOCITY);

        this.setVelocity(this.dirVec.x, this.dirVec.y);
        
        this.setCollisionCategory(this.scene.categoryBullet)
        this.setCollidesWith([this.scene.categoryAsteroid, this.scene.categorySaucer, this.scene.categoryPlayer])

        this.activateBody()

        this.body.isSensor = true; // this makes the collectable 'weightless' 

    }

    

}