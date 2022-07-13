import Saucer from "../entities/Saucer";

const DEFAULT_TOTAL_MAX = -1; // negative == infinite
const DEFAULT_MAX_ALIVE = 1;
const DEFAULT_CREATE_DELAY = 2000;

export default class Saucers extends Phaser.GameObjects.Group {
    constructor(scene, maxAlive = DEFAULT_MAX_ALIVE, shootDelay, totalMax = DEFAULT_TOTAL_MAX, createDelay = DEFAULT_CREATE_DELAY, saucerLives){
        super(scene);
        this.scene = scene;

        //const saucer = new Saucer(this.scene)

        //this.add(saucer);
      
        this.maxAlive = maxAlive;
        this.shootDelay = shootDelay;
        this.totalMax = totalMax;
        this.saucerLives = saucerLives;

        this.countCreated = 0;

        if(this.scene.levelConfig.saucers.maxAlive>0){
            this.saucersHit = 0;
            this.createSaucersLabel();
        }
        

        this.tickTimer = this.scene.time.addEvent({
            delay: createDelay,
            callback: this.tick,
            callbackScope: this,
            loop: true
        });
        this.saucersCreating = true; // this is used for victory detection
    }

    tick(){

       // console.log('saucer tick')


        if(this.countCreated < this.totalMax || this.totalMax < 0){

            if(this.countActive() < this.maxAlive){
                this.createSaucer();          

            }
        }else{
            this.tickTimer.remove();
            this.saucersCreating = false; // this is used for victory detection
            
           
        }
    }

    createSaucer(){
        const dead = this.getFirstDead();


        if(dead){
            dead.activate(this.shootDelay, this.saucerLives);
        }else{
            const saucer = new Saucer(this.scene, this.shootDelay, this.saucerLives);
            //const ast = new Debris(this.scene);
            this.add(saucer);
            
        };
        
        ++this.countCreated;
    }

    createSaucersLabel(){
        const string = this.makeSaucersLabelString();

        this.scene.bottomLabel.addItem({
            order:2,
            name: 'Saucers',
            value: string
        })
    }

    updateSaucersLabel(){

        const string = this.makeSaucersLabelString();
        this.scene.bottomLabel.updateData('Saucers', string);
    }

    makeSaucersLabelString(){
        let string = ''

        if(this.scene.levelConfig.win && this.scene.levelConfig.win.item == 'saucer'){

            string = `${this.saucersHit}/${this.scene.levelConfig.win.qty}`

        }else{

            string = `${this.saucersHit}`
               
        }

        return string;
    }

    pauseEvents(){
        this.tickTimer.paused = true;
        this.getChildren().forEach((saucer) => {saucer.shootTimer.paused = true;});

    }

    resumeEvents(){
        this.tickTimer.paused = false;
        this.getChildren().forEach((saucer) => {saucer.shootTimer.paused = false;});
    }
}