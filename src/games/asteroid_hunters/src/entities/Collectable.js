const PHYSICAL_BODY_RADIUS = 30;
const ROTATE_SPEED = 0.1;


//const LARGE_AST_THRESHOLD = 0.8;
import MovingObject from "./MovingObject";

export default class Collectable extends MovingObject{
    constructor(scene, x, y, type, ttl){

        super(scene);
        this.scene = scene;

        

        this.activate(x, y, type, ttl);

    }



    activate(x, y, type, ttl){

        

        this.collectableType = type;

        this.isCollectable = true;   

        //console.log("activate collectable")
        this.setTexture(type);

        this.setScale(this.scene.config.scaleMultiplier);

        this.setCircle(PHYSICAL_BODY_RADIUS * this.scene.config.scaleMultiplier, {friction:0, frictionAir:0});
        this.x  = x;
        this.y = y;

        this.setCollisionCategory(this.scene.categoryCollectable)
        this.setCollidesWith([this.scene.categoryPlayer])

        this.activateBody();

        this.scene.events.on('update', this.rotate, this)

        this.liveTimer = this.scene.time.addEvent({
            delay: ttl,
            callback: this.deactivate,
            callbackScope: this,
            loop: false,
            repeat: 0,
        });

        this.setDepth(0);


        this.body.isSensor = true; // this makes the collectable 'weightless' 

    }

    collect(){
 
        this.scene.sounds.collect.play();



        if(this.collectableType == 'triple'){
            //console.log('triple collected');
            this.scene.bullets.startTripleShot();
        }
        else if(this.collectableType == 'ammo'){
            
            this.scene.bullets.addAmmo();
        }
        else if(this.collectableType == 'diamond'){
            this.scene.collectables.addDiamond();
        }

        this.deactivate();
    }

    deactivate(){
        this.scene.events.off('update', this.rotate, this);
        this.liveTimer.remove();
        super.deactivate()
    }

    rotate(){


        if(this.angle > 5 || this.angle < -5){
            this.clockwise = !this.clockwise;
        }

        if(this.clockwise){
            this.angle += ROTATE_SPEED;
        }
        else if(!this.clockwise){
            this.angle -= ROTATE_SPEED;
        }
    }
}