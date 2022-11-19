const DEFAULT_MIN_DELAY = 5000;
const DEFAULT_MAX_DELAY = 15000;
const DEFAULT_MAX_TTL = 25000;
const DEFAULT_MIN_TTL = 10000;
const DEFAULT_MAX_ALIVE = 1;

import Collectable from '../entities/Collectable'

export default class Collectables extends Phaser.GameObjects.Group{
    constructor(scene, types, minDelay = DEFAULT_MIN_DELAY, maxDelay = DEFAULT_MAX_DELAY, minTtl = DEFAULT_MIN_TTL, maxTtl = DEFAULT_MAX_TTL, maxAlive = DEFAULT_MAX_ALIVE){
        super(scene);
        this.scene = scene;
        this.types = types;

        this.minDelay = minDelay;
        this.maxDelay = maxDelay;
        this.minTtl = minTtl;
        this.maxTtl = maxTtl;
        this.maxAlive = maxAlive;

        this.init();
    }

    init(){
       
        if(!this.types) return; // if types are not set up in the level config then do nothing on collectables

        this.diamonds = 0;

        this.liveTimer = this.scene.time.addEvent({
            delay: Phaser.Math.Between(this.minDelay, this.maxDelay),
            callback: this.tick,
            callbackScope: this,
            loop: true,
            
        });

        if(this.types.includes("diamond")) this.createDiamondLabel();


    }

    tick(){
        if(this.countActive() < this.maxAlive){

            const ttl = Phaser.Math.Between(this.minTtl, this.maxTtl);
            const collectableType = this.types[Phaser.Math.Between(0,this.types.length - 1)];

            this.createCollectable(Phaser.Math.Between(0, this.scene.config.width),Phaser.Math.Between(0, this.scene.config.height), collectableType, ttl);
        }
    }

    addDiamond(){
        this.diamonds++;

        this.updateDiamondLabel();
        this.scene.checkWin();
    }



    createDiamondLabel(){
        //this.diamondLabel = this.scene.add.text(1000, this.scene.config.height-30,'', { font: '32px Arial' }).setOrigin(0.5);
        //this.updateDiamondLabel();
        const string = this.makeDiamondLabelString();

        this.scene.bottomLabel.addItem({
            order:2,
            name: 'diamonds',
            value: string
        })

       

    }

    updateDiamondLabel(){
        //const string = `Diamonds: ${this.diamonds}`;

        const string = this.makeDiamondLabelString();
        this.scene.bottomLabel.updateData('diamonds', string);

    }

    makeDiamondLabelString(){
        let string = ''

        if(this.scene.levelConfig.win && this.scene.levelConfig.win.item == 'diamond'){

            string = `${this.diamonds}/${this.scene.levelConfig.win.qty}`

        }else{

            string = `${this.diamonds}`
               
        }

        return string;
    }

    createCollectable(x, y, collectableType, ttl){
        const deadCollectable = this.getFirstDead();


        if(deadCollectable){

            deadCollectable.activate(x, y, collectableType, ttl);
            //console.log('reset collectable')
        }else{

            const collectable = new Collectable(this.scene, x, y, collectableType, ttl);
            this.add(collectable);
            //console.log('new collectable')
            
        };


    }


    pauseEvents(){
        this.liveTimer.paused = true; // timer for creation-recreation of collectables
       
       this.getChildren().forEach((collectable) => {collectable.liveTimer.paused = true;}); // timers for deactivation of collectibles

    }

    resumeEvents(){
        this.liveTimer.paused = false;
        this.getChildren().forEach((collectable) => {collectable.liveTimer.paused = false;});
       
    }

    

    
}