export default class MovingObject extends Phaser.Physics.Matter.Sprite {
    constructor(scene, startOffset){
        super(scene.matter.world, 0, 0, undefined, undefined)
        scene.add.existing(this)

        this.startOffset = startOffset * this.scene.config.scaleMultiplier;
    }

    deactivate(){
        // активировать/деактивировать физическое тело
        //console.log('movingObject deactivate')


        this.body.enable = false;

        // скрыть/показать текстуру
        this.setVisible(false);
        // активировать/деактивировать объект
        this.setActive(false);
        
        this.scene.matter.world.remove(this); 

        this.scene.events.off('update', this.updateObject, this);

        this.setScale(1);

    }

    activateBody(){

        this.scene.matter.world.add(this); 
        // активировать/деактивировать физическое тело
        this.body.enable = true;
        //this.body.setEnable(false)
        // скрыть/показать текстуру
        this.setVisible(true);
        // активировать/деактивировать объект
        this.setActive(true);


       //this.scene.events.on('update', this.update, this);
       this.scene.events.on('update', this.updateObject, this);
    }

    updateObject(){


        if (
            (this.x  >  this.scene.config.width + this.width/2 + this.startOffset) || 
            (this.x  <  -this.width - this.startOffset) ||
            (this.y > this.scene.config.height + this.height/2 +this.startOffset) ||
            (this.y < -this.height/2 - this.startOffset)
            ) 
        {
            //console.log('Off screen');
            this.deactivate();
        }   
        
    }

    getStartPosition() {
        const startRegion = Phaser.Math.Between(1,4);

        if(startRegion == 1){
            return {
                x: -this.startOffset,
                y: Phaser.Math.Between(-this.startOffset, this.scene.config.height + this.startOffset)
            }
        }
        else if (startRegion == 2){
            return {
                x: Phaser.Math.Between(0, this.scene.config.width),
                y: -this.startOffset
            }
        }
        else if (startRegion == 3){
            return {
                x: this.scene.config.width + this.startOffset,
                y: Phaser.Math.Between(-this.startOffset, this.scene.config.height + this.startOffset)
            }
        }
        else if (startRegion == 4){
            return {
                x: Phaser.Math.Between(0, this.scene.config.width),
                y: this.scene.config.height + this.startOffset
            }
        }
    }
        
}