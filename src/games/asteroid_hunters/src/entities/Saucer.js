import MovingObject from "./MovingObject";
import SaucerExhaust from '../entities/SaucerExhaust';
import SaucerBoom from '../anims/SaucerBoom';


const START_OFFSET = 30;

const WAIT_TIME_MAX = 5000;
const WAIT_TIME_MIN = 1000;
const DEFAULT_LIVES = 1;
const DEFAULT_SHOOT_DELAY = 10000;
const SHOOT_MARGIN_MAX = 70;
const SHOOT_MARGIN_MIN = -70;

export default class Saucer extends MovingObject {
    constructor(scene, shootDelay = DEFAULT_SHOOT_DELAY, lives = DEFAULT_LIVES) {
        super(scene, START_OFFSET)

        this.scene = scene;

        this.isSaucer = true;

       

        this.setProperties();

        this.activate(shootDelay, lives);

        
    }

    setProperties(){
        this.speed = 1;
        this.minVelocity = 1;
        this.maxVelocity = 1;
    }

    activate(shootDelay, lives){

        this.activateBody()

        this.lives = lives;


        this.escapeVec = null;


        this.startPosition = this.getStartPosition();
        this.x = this.startPosition.x;
        this.y = this.startPosition.y;
        this.rayLength = 150;


        // set texture


        this.setTexture('saucer_image');
        
        // set physical body


        const shape = this.scene.cache.json.get('saucer_body');
       
        this.setBody(shape.saucer, {friction:0, frictionAir:0});


        // Make random point on the setAngle
        this.setRandomPoint()


        // get saucer speed
        this.speed = Phaser.Math.FloatBetween(this.minVelocity, this.maxVelocity);


        this.scene.events.on('update', this.update, this);

        
        this.setCollisionCategory(this.scene.categorySaucer)
        this.setCollidesWith([this.scene.categoryPlayer, this.scene.categoryBullet])

        const rayUpdatePeriod = 200;
        if(this.scene.asteroids){ // create rays only if there are asteroids
            this.rayTimer = this.scene.time.addEvent({
                delay: rayUpdatePeriod,                // ms
                callback: this.createRays,
                //args: [],
                callbackScope: this,
                loop: true
            });
        }
        

        if(!this.SaucerExhaust) {
            this.SaucerExhaust = new SaucerExhaust(this.scene)
        }
        else{
            this.SaucerExhaust.unstop();
        }

        this.shootTimer = this.scene.time.addEvent({
            delay: shootDelay, // ms
            callback: this.shoot,
            callbackScope: this,
            loop: true
        });

        this.ast_debr_sauc = []

        this.setDepth(1);
    }

    deactivate(){
        //console.log('saucer deactivate')
        if(this.rayTimer){
            this.rayTimer.remove();
        }
        
        this.shootTimer.remove();
        this.scene.events.off('update', this.update, this);// update the saucer exhaust so that it stops emitting
 
        
        this.SaucerExhaust.stop();

        
        super.deactivate();
        this.scene.checkWin();
    }

    update(){
        //console.log('saucer update')

        this.setAngle(0);
        
        let velocity = {}


        if (this.escapeVec){
            velocity = {x: this.escapeVec.x, y: this.escapeVec.y}


            if(this.waitTimer) {
                this.waitTimer.remove();
                this.waitTimer = null;
                //console.log('removeWaitTimer')
            }
            this.randomPoint = {x: this.x, y: this.y};
        }
        else{
            


            if(Math.abs(this.randomPoint.x - this.x) < 1 && Math.abs(this.randomPoint.y - this.y) < 1){
                //console.log("at the point")
                velocity = {x: 0, y: 0};
     
                if(!this.waitTimer){
                    //console.log('set waitTimer')
                    this.setWaitTimer(Phaser.Math.Between(WAIT_TIME_MAX, WAIT_TIME_MIN))                 
                }
            }
            else{ // not at the point
                velocity = this.getVelocityToPoint(this.randomPoint, this.speed)
   
            }
        }
        this.setVelocity(velocity.x, velocity.y);

        this.SaucerExhaust.update(this,velocity)

     
    }

    shoot(){
        //console.log("saucer shoot")


        // dont shoot if saucer is out of screen
        if(this.x<0 || this.y<0 || this.x > this.scene.config.width || this.y > this.scene.config.height) return;

        const x = this.scene.player.ship.x + Phaser.Math.Between(SHOOT_MARGIN_MIN, SHOOT_MARGIN_MAX);
        const y = this.scene.player.ship.y + Phaser.Math.Between(SHOOT_MARGIN_MIN, SHOOT_MARGIN_MAX);;

        const intersectedObjects = this.scene.matter.intersectRay(this.x,this.y,x,y,1,this.ast_debr_sauc)

        if(intersectedObjects.length > 0){ // obstacles between player and saucer
            //this.scene.graphics.lineStyle(1,0xff0000)
        }else{
            //this.scene.graphics.lineStyle(1,0x00ff00)
            //console.log("shoot")
            const shootVec = new Phaser.Math.Vector2(x-this.x,y-this.y);
            //console.log(this)
            shootVec.setLength(this.width/2)

            console.log('saucer create bullet')
            this.scene.bullets.createBullet(this, shootVec, 'bullet_saucer')
        }

        
    }

    minusLife(){
        //console.log('saucer minusLife')
        --this.lives;

        if(this.lives <= 0){

            this.kill();
            
        }

    }

    kill(){
        this.scene.saucers.saucersHit++;
        console.log('saucers hit', this.scene.saucers.saucersHit)
        if(this.scene.sharedOptions.soundOn) this.scene.sounds.saucerBoom.play();
        this.deactivate();
        
        SaucerBoom.generate(this.scene, this.x, this.y); // animation

        this.scene.saucers.updateSaucersLabel();

        this.scene.checkWin();
    }

    setWaitTimer(waitTime){
        //console.log('setWaitTimer')
        this.waitTimer = this.scene.time.addEvent({
            delay: waitTime,
            callback: this.setNewLocation,
            callbackScope: this,
            loop: false
        });
    }

    createRays(){

        //console.log('createRays')
       
        const raysCount = 20;
        
        const angleStep = Math.PI*2/raysCount
        let line = {}

        const otherSaucers = [...this.scene.saucers.getChildren()]
        const thisIndex = otherSaucers.indexOf(this)
        //console.log('thisIndex', thisIndex)
        if (thisIndex > -1) {
            otherSaucers.splice(thisIndex, 1); // 2nd parameter means remove one item only
        }
 

        this.ast_debr_sauc = [...this.scene.asteroids.getChildren(), ...this.scene.asteroids.debrises.getChildren(), ...otherSaucers]

        let raysTouching = [];
        
        for(let i = 0; i < raysCount; i++){

            const vec = new Phaser.Math.Vector2()
            vec.setToPolar(i*angleStep,this.rayLength)

            line = {
                x1: this.x,
                y1: this.y,
                x2: this.x + vec.x,
                y2: this.y + vec.y
            }

            const intersectedObjects = this.scene.matter.intersectRay(line.x1,line.y1,line.x2,line.y2,1,this.ast_debr_sauc)
            
            if(intersectedObjects.length>0){


                raysTouching.push(true);
            }else{
                
                
                raysTouching.push(false);
            }


        }

        
       this.getEscapeDir(raysTouching, angleStep, raysCount)


        
    }

    getEscapeDir(raysTouching, angleStep, raysCount){
        let conseq = 0;
        let consec_arr=[];
        let prev = true // red

        for(let i=0; i<raysTouching.length; i++){
            const curr = raysTouching[i];
            if(!prev && !curr){ // all green
                conseq++;
            }
            else if(!prev && curr){ // prev green curr red
                consec_arr.push({endsAt: i-1, conseq: conseq});
                conseq = 0;
            }
            else if(prev && curr){ // all red
                // do nothing
            }
            else if(prev && !curr){ // prev red curr green
                conseq++;
            }
            prev = curr;
        }

        if(conseq > 0 && conseq < raysCount){
 
            if(raysTouching[0]){
                consec_arr.push({endsAt:raysTouching.length, conseq: conseq});
            }else{
                consec_arr[0].conseq += conseq;
            }
        }

        const max_conseq = consec_arr.reduce((prev, current) => (prev.conseq > current.conseq) ? prev : current, {conseq: 0})


        let wayNum = max_conseq.endsAt - max_conseq.conseq/2;
     
        if(wayNum < 0) wayNum += raysCount;


        const dirVec = new Phaser.Math.Vector2()
        dirVec.setToPolar(wayNum*angleStep,this.rayLength)
        const escapeSpeed = 1.5;

        if(wayNum){
            this.escapeVec = dirVec.setLength(escapeSpeed);
        }else{
            this.escapeVec = null;
        }


    }



    getRunAngle(closeAsteroids){
        
        const vectors = []
        closeAsteroids.forEach(closeAsteroid => {
            const vec = new Phaser.Math.Vector2(closeAsteroid.x - this.x, closeAsteroid.y - this.y)

            vectors.push(vec)
        })
        // vectors.forEach(vec => {
        //     //console.log(vec.angle())
        // })
    }

    getVelocityToPoint(point, speed){
         // set vectors x y as x y velocity
        if(point){
            const dirVec = new Phaser.Math.Vector2(point.x-this.x, point.y-this.y).setLength(speed);

            return {x: dirVec.x, y: dirVec.y}
        }else{

            return {x: 0, y: 0}
        }
       
    }

    setNewLocation(){

        this.waitTimer = undefined
        this.setRandomPoint()

    }

    setRandomPoint(){
        //console.log("setRandomPoint")
        this.randomPoint =  {x: Phaser.Math.Between(0, this.scene.config.width), y: Phaser.Math.Between(0, this.scene.config.height)};
   
    }

    setStartPosition(){
        this.startPosition = this.getStartPosition();
        this.x = this.startPosition.x;
        this.y = this.startPosition.y;
    }
}