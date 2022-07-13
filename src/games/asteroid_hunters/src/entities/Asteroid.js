import MovingObject from "./MovingObject";
import Ast_crush from '../anims/Ast_crush';



const LARGE_AST_THRESHOLD = 0.8;
const DEFAULT_MIN_VELOCITY = 0.5;
const DEFAULT_MAX_VELOCITY = 1.5;
const START_OFFSET = 50;
const MIN_ANGLE = 0;
const MAX_ANGLE = 359
const MAX_ANG_SPEED = 0.005;
const MIN_ANG_SPEED = 0;
const MAX_LIVES = 5;
const MIN_LIVES = 2




export default class Asteroid extends MovingObject {
    constructor(scene, minVelosity = DEFAULT_MIN_VELOCITY, maxVelocity= DEFAULT_MAX_VELOCITY, isDebris = false, parentX = undefined, parentY = undefined) {
 

        super(scene, START_OFFSET)


        this.scene = scene;

        this.MIN_VELOCITY = minVelosity;
        this.MAX_VELOCITY = maxVelocity;

       

        this.isAsteroid = true;

        if(isDebris){
            this.parentX = parentX;
            this.parentY = parentY;
        }
     

        this.activate();

        

    }

    setProperties(){
        this.MIN_SCALE = 0.5;
        this.MAX_SCALE = 1;

     
    }

    minusLife(){
        --this.lives;

        if(this.lives <= 0){

            this.kill();
            
        }
    
    }

    kill(){
      
        this.scene.sounds.astCrush.play();
        this.deactivate();
        
        if(this.proportion > LARGE_AST_THRESHOLD){
        
            this.scene.asteroids.createDebris(this.x, this.y, Math.max(this.width, this.height))
        }
        Ast_crush.generate(this.scene, this.x, this.y, this.proportion); // animation

        if(!this.isDebris){
            this.scene.asteroids.asteroidsHit++;
            this.scene.asteroids.updateAsteroidsLabel();
            this.scene.checkWin();
           
        } 
    }

    deactivate(){
        
        super.deactivate();
        if(!this.isDebris) this.scene.checkWin();
    }

    activate(){

        this.setProperties();

        this.activateBody()

  
        this.setStartPosition();

     

        // tmp comm
        this.x = this.startPosition.x;
        this.y = this.startPosition.y;

        // set texture
        const asteroid_frame = `asteroid_gray_lg_${Phaser.Math.Between(1,4)}`;
        this.setTexture('gray_asteroids', asteroid_frame);
        
        // set physical body
        const asteroids_shapes = this.scene.cache.json.get('gray_asteroids_shapes');
        this.setBody(asteroids_shapes[asteroid_frame], {friction:0, frictionAir:0});
   
        // Make random point on the setAngle
        const randomPoint = {x: Phaser.Math.Between(0, this.scene.config.width), y: Phaser.Math.Between(0, this.scene.config.height)};

        // get asteroid speed
       
        const speed = Phaser.Math.FloatBetween(this.MIN_VELOCITY, this.MAX_VELOCITY);
      

        // set vectors x y as x y velocity
        const dirVec = new Phaser.Math.Vector2(randomPoint.x-this.startPosition.x, randomPoint.y-this.startPosition.y).setLength(speed);

        this.setVelocity(dirVec.x, dirVec.y);
        
        // tmp comm
        this.setAngularVelocity(Phaser.Math.FloatBetween(MIN_ANG_SPEED, MAX_ANG_SPEED));

        this.proportion = Phaser.Math.FloatBetween(this.MIN_SCALE, this.MAX_SCALE);

        this.setScale(this.proportion);
       
        this.setLives()

        this.angle = Phaser.Math.Between(MIN_ANGLE,MAX_ANGLE);


        this.setCollisionCategory(this.scene.categoryAsteroid)
        this.setCollidesWith([ this.scene.categoryAsteroid, this.scene.categoryPlayer, this.scene.categoryBullet])

        this.setDepth(1);

    }

    
    setLives(){
        this.lives = Math.round(((this.scale - this.MIN_SCALE))/((this.MAX_SCALE - this.MIN_SCALE))*(MAX_LIVES-MIN_LIVES)) + MIN_LIVES
    }

    setStartPosition(){
        this.startPosition = this.getStartPosition();
    }

    





}