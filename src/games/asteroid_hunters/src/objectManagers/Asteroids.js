import Asteroid from "../entities/Asteroid";
import Debris from "../entities/Debris";

const DEFAULT_TOTAL_MAX_ASTEROIDS = -1; // negative == infinite
const DEFAULT_MAX_ALIVE_ASTEROIDS = 5;
const DEFAULT_DELAY = 2000;


export default class Asteroids extends Phaser.GameObjects.Group {
    constructor(scene, totalMax = DEFAULT_TOTAL_MAX_ASTEROIDS, maxAlive = DEFAULT_MAX_ALIVE_ASTEROIDS, delay = DEFAULT_DELAY, MIN_VELOCITY, MAX_VELOCITY) {
        super(scene);
        this.scene = scene;
        this.totalMax = totalMax;
        this.maxAlive = maxAlive;

        this.minVelocity = MIN_VELOCITY;
        this.maxVelocity = MAX_VELOCITY;

        this.countCreated = 0;


        this.asteroidTimer = this.scene.time.addEvent({
            delay: delay,
            callback: this.tick,
            callbackScope: this,
            loop: true
        });

        this.debrises = new Phaser.GameObjects.Group; // separate group for debris storage

        this.asteroidsHit = 0;
        this.asteroidsCreating = true; // this is used for victory detection

        if(this.scene.levelConfig.asteroids.maxAlive > 0) this.createAsteroidsLabel();

    }

    createAsteroidsLabel(){
        //this.asteroidsLabel = this.scene.add.text(800, this.scene.config.height-30,'', { font: '32px Arial' }).setOrigin(0.5);
        //this.updateAsteroidsLabel();
        const string = this.makeDiamondLabelString();

        this.scene.bottomLabel.addItem({
            order:1,
            name: 'Asteroids',
            value: string
        })

    }

    updateAsteroidsLabel(){

        const string = this.makeDiamondLabelString();
        this.scene.bottomLabel.updateData('Asteroids', string);
    }

    makeDiamondLabelString(){
        let string = ''

        if(this.scene.levelConfig.win && this.scene.levelConfig.win.item == 'asteroid'){

            string = `${this.asteroidsHit}/${this.scene.levelConfig.win.qty}`

        }else{

            string = `${this.asteroidsHit}`
               
        }

        return string;
    }

    tick(){


        if(this.countCreated < this.totalMax || this.totalMax<0 ){

            if(this.countActive() < this.maxAlive){
                this.createAsteroid();          

            }
        }else{
            this.asteroidTimer.remove();
            this.asteroidsCreating = false; // this is used for victory detection
           
        }
    }

    createAsteroid(){
        const deadAst = this.getFirstDead()


        if(deadAst){
            deadAst.activate();
        }else{
            const ast = new Asteroid(this.scene, this.minVelocity, this.maxVelocity);

            this.add(ast);
            
        };
        
        ++this.countCreated;
    }

    createDebris(parentX, parentY, diameter) {



        const debrisQuantity = Phaser.Math.Between(2,3);

        const positionVec = new Phaser.Math.Vector2();
        

        for(let i=0; i < debrisQuantity; i++){
            positionVec.setToPolar((2*Math.PI/debrisQuantity)*i, 0.5*diameter/2);
            const debris = new Debris(this.scene, parentX+positionVec.x, parentY+positionVec.y);
            this.debrises.add(debris);
        }



    }

    pauseEvents(){
        this.asteroidTimer.paused = true;
       

    }

    resumeEvents(){
        this.asteroidTimer.paused = false;
       
    }

}
