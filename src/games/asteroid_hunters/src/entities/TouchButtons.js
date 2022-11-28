export default class TouchButtons {
    constructor(scene){
        this.scene = scene;

        this.init();
    }

    init(){

        this.scene.input.addPointer(3)

        this.leftButton = this.scene.add.image(50*this.scene.config.scaleMultiplier, this.scene.config.height - 200* this.scene.config.scaleMultiplier, 'left_right_button').setAngle(180).setDepth(2).setScale(1.2*this.scene.config.scaleMultiplier);

        this.rightButton = this.scene.add.image(230* this.scene.config.scaleMultiplier, this.scene.config.height - 60* this.scene.config.scaleMultiplier, 'left_right_button').setDepth(2).setScale(1.2* this.scene.config.scaleMultiplier);

        this.gasButton = this.scene.add.image(this.scene.config.width - 80* this.scene.config.scaleMultiplier, this.scene.config.height - 230* this.scene.config.scaleMultiplier, 'gas_button').setAngle(-90).setDepth(2).setScale(1.2* this.scene.config.scaleMultiplier);

        this.shootButton = this.scene.add.image(this.scene.config.width - 230* this.scene.config.scaleMultiplier, this.scene.config.height - 70* this.scene.config.scaleMultiplier, 'shoot_button').setScale(1* this.scene.config.scaleMultiplier).setDepth(2);

        this.controlButtons = [this.leftButton, this.rightButton, this.gasButton, this.shootButton];

        this.leftButton.setInteractive();
        this.rightButton.setInteractive();
        this.gasButton.setInteractive();
        this.shootButton.setInteractive();

        this.leftButton.isDown = false;
        this.rightButton.isDown = false;
        this.gasButton.isDown = false;
        this.shootButton.isDown = false;

        
        //this.scene.input.on('gameobjectdown', function (pointer, gameObject) {
        this.scene.input.on('gameobjectover', function (pointer, gameObject) {


            if(this.controlButtons.includes(gameObject)){ // apply only to ship controls
                gameObject.setTintFill(0xffff00, 0xffff00, 0xff0000, 0xff0000);
                gameObject.isDown = true;
            }

            
    
        }, this);

        //this.scene.input.on('gameobjectup', function (pointer, gameObject) {
        this.scene.input.on('gameobjectout', function (pointer, gameObject) {

            if(this.controlButtons.includes(gameObject)){ // apply only to ship controls
                gameObject.clearTint();
                gameObject.isDown = false;

            }
    
        }, this);
    }
}