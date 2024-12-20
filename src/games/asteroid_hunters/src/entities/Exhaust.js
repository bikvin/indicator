import Phaser from "phaser";

const OFFSET_FROM_SHIP = 0;

export default class Exhaust {
    constructor(player, scene){
        console.log('exhaust constructor');
        this.player = player;
        this.scene = scene;

        this.init();
    }

    init(){
        const particles = this.scene.add.particles('fire_particle');

        console.log('init exhaust');

        this.emitter = particles.createEmitter({
          blendMode: 'ADD',
          scale: { start: 0.6*this.scene.config.scaleMultiplier, end: 1.3*this.scene.config.scaleMultiplier},
          //scale: { start: 6, end: 13},
          //lifespan: 120,
          lifespan: 120*this.scene.config.scaleMultiplier,
          speed: { min: 400, max: 600 },
          angle: 90,
          quantity: 0,
          x: -200,
          y: -300,
          alpha:0.3,
          rotate: { onEmit: () => {return this.getAngle()-90} }
        });

        this.emitter.setFrequency(10,1);

        //this.thrust_sound = this.scene.sound.add('thrust', { loop: true, volume: 0.1 });
        //this.circle = this.scene.add.circle(200, 400, 5, 0xff0000);
    
    }

    update(){

        let gasPressed = false
        if(this.scene.touchButtons){
          gasPressed = this.scene.cursors.up.isDown || this.scene.touchButtons.gasButton.isDown
        }else{
          gasPressed = this.scene.cursors.up.isDown
        }
        // run or stop the emitter
        if (gasPressed){
            this.emitter.setQuantity(2);
            //if(this.scene.sharedOptions.soundOn) this.startSound();
            this.startSound();
        }else{
            this.emitter.setQuantity(0);
            this.stopSound();

        }
        
        // find the position of start of emitter relative to ship center
        const vec = new Phaser.Math.Vector2();
        vec.setToPolar(Phaser.Math.DegToRad(this.player.ship.angle+90),this.player.ship.height*this.player.ship.scale/2 + OFFSET_FROM_SHIP*this.player.ship.scale);
        //console.log('this.player.ship.height', this.player.ship.height);
        //console.log('this.player.ship.scale', this.player.ship.scale);
        
        const x = this.player.ship.x+vec.x;
        const y = this.player.ship.y+vec.y;
        
        // set emitter start position
        this.emitter.setPosition(x, y);

        //this.circle.setPosition(x, y);

        this.emitter.setAngle(this.getAngle());
    }

    getAngle(){ // returns right emitter angle
        return this.player.ship.angle+90;
    }

    startSound(){
        if (!this.scene.sounds.thrust.isPlaying) 
        {//this.thrust_sound.play(); 
            this.scene.sounds.thrust.play(); 
        }
    }

    stopSound(){
        if (this.scene.sounds.thrust.isPlaying) 
        {//this.thrust_sound.stop();
            this.scene.sounds.thrust.stop(); 
        }
    }


}