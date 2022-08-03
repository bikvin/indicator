const SHOOT_DELAY = 400;
const OFFSET_FROM_SHIP = 15;
const TRIPLE_TIME = 20000;
const AMMO_ADDITION = 30;

import Bullet from "../entities/Bullet";


export default class Bullets extends Phaser.GameObjects.Group {
    constructor(scene, ammo){
        super(scene);
        this.scene = scene;

        this.scene.events.on('update', this.update, this);
        

        this.lastShootTime = Date.now();

        this.ammo = ammo;
        if(ammo || ammo === 0) this.createAmmoLabel();

        

    }

    resetEvents() {
        this.scene.events.off('update', this.update, this);
    }


    update(){

        if(this.scene.paused) return; // dont shoot if scene is paused

        let shootPressed = false;
        if(this.scene.touchButtons){
            shootPressed = this.scene.cursors.space.isDown || this.scene.touchButtons.shootButton.isDown
        }else{
            shootPressed = this.scene.cursors.space.isDown;
        }
        

        if(shootPressed){ /// player shoots if space is down and no faster then SHOOT_DELAY
            const t = Date.now()

            if(t - this.lastShootTime > SHOOT_DELAY){
               
                this.lastShootTime = t;
                //this.shoot();

                const shootSource = this.scene.player.ship
                const shootVec = new Phaser.Math.Vector2();
 

                //console.log('shoot in update')

                if(this.tripleShoot){
                    for(let i= -5; i <= 5 ; i += 5){
                        shootVec.setToPolar(Phaser.Math.DegToRad(shootSource.angle-90+i),shootSource.width/2+OFFSET_FROM_SHIP);
                        this.createBullet(shootSource, shootVec, 'bullet_player');
                    }
                } else{
                    shootVec.setToPolar(Phaser.Math.DegToRad(shootSource.angle-90),shootSource.width/2+OFFSET_FROM_SHIP);
                    this.createBullet(shootSource, shootVec, 'bullet_player');
                }
                
            }
    
        }
    }

    createAmmoLabel(){
        //this.ammoLabel = this.scene.add.text(600, this.scene.config.height-30,'', { font: '32px Arial' }).setOrigin(0.5);
        //this.updateAmmoLabel();
        this.scene.bottomLabel.addItem({
            order:1,
            name: 'ammo',
            value: this.ammo
        })
    }

    updateAmmoLabel(){
  
        this.scene.bottomLabel.updateData('ammo', this.ammo);
  
    }

    addAmmo(){ // from ammo collectible
        if(this.ammo || this.ammo === 0){
            this.ammo += AMMO_ADDITION;
            this.updateAmmoLabel();
        }
        
    }

    startTripleShot(){

        this.tripleShootTimerProperties = {
            delay: TRIPLE_TIME,
            callback: this.stopTripleShot,
            callbackScope: this,
            loop: false,
            repeat: 0
            
        }

        if(!this.tripleShoot){
            this.tripleShoot = true;

            //console.log('create triple shot timer');          

            this.tripleShootTimer = this.scene.time.addEvent(this.tripleShootTimerProperties);
        }else{
            //console.log('reset triple shot timer');
            this.tripleShootTimer.reset(this.tripleShootTimerProperties);
        }
        


    }

    stopTripleShot(){
        this.tripleShoot = false;
    }





    createBullet(source, vec, texture){

        //console.log('create bullet source', source.isPlayer);
        if(this.ammo <= 0 && source.isPlayer) {
            this.scene.sounds.noAmmo.play();
            return;
        }

        const deadBullet = this.getFirstDead()


        if(deadBullet){

            deadBullet.activate(source, vec, texture);
            //console.log('reset bullet')
        }else{

            const bullet = new Bullet(this.scene, source, vec, texture);
            this.add(bullet);
            
        };

        
        //if(this.scene.sharedOptions.soundOn) this.scene.sounds.shoot.play();
        this.scene.sounds.shoot.play();

        if(this.ammo){
            this.ammo--;
            this.scene.checkLose();
            this.updateAmmoLabel();
        }
        
        


    }

}
