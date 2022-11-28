export default class SaucerExhaust {
    constructor(scene){

        this.scene = scene;

        this.init();
    }

    init(){


        const particles = this.scene.add.particles('saucer_exhaust');


        this.emitter = particles.createEmitter({
            blendMode: 'ADD',
            scale: { start: 0.15* this.scene.config.scaleMultiplier, end: 0.4* this.scene.config.scaleMultiplier},
            lifespan: { min: 800* this.scene.config.scaleMultiplier, max: 1200* this.scene.config.scaleMultiplier},
            speed: 100* this.scene.config.scaleMultiplier,
            angle: { min: -10, max: 10 },
            quantity: 0,
            x: 200,
            y: 300,
            alpha:{start:1, end:0.1},
            frequency: 800,
           
            
            
          });

 
    }

    update(saucer, velocity){

        if(this.stopped){
            this.emitter.setQuantity(0);
            return;
        }

        const vec = new Phaser.Math.Vector2(velocity.x, velocity.y).setLength(30);

        this.emitter.setPosition(saucer.x-vec.x, saucer.y-vec.y);

      
        
        if (vec.length() > 0){
            this.emitter.setQuantity(1);

            
            const angle = Phaser.Math.RadToDeg(vec.angle());
            this.emitter.setAngle(angle-180)
   
        }else{
            this.emitter.setQuantity(0);
            

        }
    }

    stop(){
        this.stopped = true;
    }

    unstop(){
        this.stopped = false;
    }

}