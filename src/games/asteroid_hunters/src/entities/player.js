import Exhaust from './Exhaust';
import Boom from '../anims/Boom';

const TURN_SPEED = 3;
const SHIP_ACCELERATION = 0.01;
const MAX_SPEED = 5;
const SHIP_DRAG=0.001;
//const SHIP_DRAG=0;

class Player {
    constructor(scene, x, y) {

        console.log('Player constructor');

        this.scene = scene;

        const ship_body = this.scene.cache.json.get('ship_body');

       this.ship = this.scene.matter.add.sprite(x, y, 'ship', null, {shape: ship_body.ship});


       this.ship.setCollisionCategory(scene.categoryPlayer)
       this.ship.setCollidesWith([scene.categorySaucer, scene.categoryAsteroid, scene.categoryBullet, scene.categoryCollectable])
      
        this.init();
        

      } 

     

      init(){

        console.log('player init')

        this.ship.setScale(0.5 * this.scene.config.scaleMultiplier);

        //this.ship.setScale(0.5);
        // console.log('this.ship', this.ship);
        //this.ship.setScale(6);

        //this.ship.scale = 2;

        this.ship.isPlayer = true;

        this.velocityVec = new Phaser.Math.Vector2();
   
        this.exhaust = new Exhaust(this, this.scene);


      }

      get angle() {

        let leftPressed = false;
        let rightPressed = false;
        if(this.scene.touchButtons){
          leftPressed = this.scene.cursors.left.isDown || this.scene.touchButtons.leftButton.isDown;
          rightPressed = this.scene.cursors.right.isDown || this.scene.touchButtons.rightButton.isDown
        }else{
          leftPressed = this.scene.cursors.left.isDown;
          rightPressed = this.scene.cursors.right.isDown
        }

        if (leftPressed) {
          return this.ship.angle - TURN_SPEED; 
        }
        if (rightPressed) {
          return this.ship.angle + TURN_SPEED;
        }


        return this.ship.angle
       
       
      }

      get velocityXY() {
        
        this.velocityVec.x += this.accelerationXY.x + this.dragXY.x;
        this.velocityVec.y += this.accelerationXY.y + this.dragXY.y;

        this.velocityVec.limit(MAX_SPEED);

        return {x: this.velocityVec.x, y: this.velocityVec.y};
      }

      get accelerationXY() {
        // return x and y acceleration
        let gasPressed = false
        if(this.scene.touchButtons){
          gasPressed = this.scene.cursors.up.isDown || this.scene.touchButtons.gasButton.isDown
        }else{
          gasPressed = this.scene.cursors.up.isDown
        }

        if (gasPressed) {
          const accelerationVec = new Phaser.Math.Vector2();
          return accelerationVec.setToPolar(this.ship.rotation  - Math.PI/2, SHIP_ACCELERATION);
          
        }

        return {x:0, y:0};

      } 

      get dragXY(){
        if(this.velocityVec.x != 0 || this.velocityVec.y != 0){
          const dragVec = new Phaser.Math.Vector2(this.velocityVec.x, this.velocityVec.y).negate().scale(SHIP_DRAG)

          return dragVec

        }
        return {x:0, y:0};

      }

      returnFromEdge(){
        if(this.ship.x < 0) {
          this.ship.x = this.scene.config.width;
        }else if(this.ship.x > this.scene.config.width){
          this.ship.x = 0;
        }

        if(this.ship.y < 0) {
          this.ship.y = this.scene.config.height;
        }else if(this.ship.y > this.scene.config.height){
          this.ship.y = 0;
        }
      }

      crash(){
        this.deactivate();
        Boom.generate(this.scene, this.ship.x, this.ship.y);
        //if(this.scene.sharedOptions.soundOn) this.scene.sounds.boom.play();
        this.scene.sounds.boom.play();

        setTimeout(() => {
          this.scene.onLose();
        }, 1000);
      }

      deactivate(){
        // активировать/деактивировать физическое тело
        this.ship.body.enable = false;
        //this.body.setEnable(false)
        // скрыть/показать текстуру
        this.ship.setVisible(false);
        // активировать/деактивировать объект
        this.ship.setActive(false);
        
        this.scene.matter.world.remove(this.ship); 


    }

      move(){

        

        if(this.movesPaused) return; // dont move if scene is paused
    
        this.ship.setAngle(this.angle);
        this.ship.setVelocity(this.velocityXY.x, this.velocityXY.y);

        this.exhaust.update();

        this.returnFromEdge();



      }

      pauseMoves(){
        this.movesPaused=true;
      }

      resumeMoves(){
        this.movesPaused=false;
      }
}

export default Player;