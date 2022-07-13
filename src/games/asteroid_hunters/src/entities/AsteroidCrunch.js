const ANGLE_DIFFERENCE = 90;
const SPEED = 500;
const SCALE = 0.5;
const LIFESPAN_MIN = 300;
const LIFESPAN_MAX = 500;

export default class AsteroidCrunch {
    constructor(scene){
      
        this.scene = scene;

        this.init();
    }

    init(){
       

        this.maxQuantity = 10;
        this.minQuantity = 7;

        this.emittedInRound = 0;

        const particles = this.scene.add.particles('ast-crunch');
       

        this.emitter = particles.createEmitter({
            blendMode: 'NORMAL',
            scale: { start: SCALE, end: SCALE },
            lifespan: { min: LIFESPAN_MIN, max: LIFESPAN_MAX },
            speed: SPEED,
            angle: { min: -ANGLE_DIFFERENCE, max: ANGLE_DIFFERENCE },
            quantity: this.minQuantity,
            x: 200,
            y: 300,
            alpha:{start:1, end:1},
            frequency: 800,
            emitCallback: this.onEmit,
            emitCallbackScope: this,
            radial: true,
           
            
            
          });

          this.emitter.stop();

         
    }

    onEmit(){
       
      this.emitter.stop();
    }

    launch(x,y,angle){
        this.emitter.setPosition(x,y)
        this.emitter.setAngle({ min: angle-ANGLE_DIFFERENCE, max: angle+ANGLE_DIFFERENCE })

       
        this.emitter.setQuantity(Phaser.Math.Between(this.minQuantity,this.maxQuantity));
        this.emitter.start();
    }

    

}