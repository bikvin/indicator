export default class TouchButtons {
    constructor(scene){
        this.scene = scene;

        this.init();
    }

    init(){

        this.scene.input.addPointer(3)

        this.leftButton = this.scene.add.sprite(50*this.scene.config.scaleMultiplier, this.scene.config.height - 200* this.scene.config.scaleMultiplier, 'left_right_button')
        .setAngle(180)
        .setDepth(2)
        .setScale(1.2*this.scene.config.scaleMultiplier);

        this.rightButton = this.scene.add.sprite(170* this.scene.config.scaleMultiplier, this.scene.config.height - 60* this.scene.config.scaleMultiplier, 'left_right_button').setDepth(2).setScale(1.2* this.scene.config.scaleMultiplier);

        this.gasButton = this.scene.add.sprite(this.scene.config.width - 80* this.scene.config.scaleMultiplier, this.scene.config.height - 230* this.scene.config.scaleMultiplier, 'gas_button').setAngle(-90).setDepth(2).setScale(1.2* this.scene.config.scaleMultiplier);

        this.shootButton = this.scene.add.sprite(this.scene.config.width - 170* this.scene.config.scaleMultiplier, this.scene.config.height - 70* this.scene.config.scaleMultiplier, 'shoot_button').setScale(1* this.scene.config.scaleMultiplier).setDepth(2);

        this.controlButtons = [this.leftButton, this.rightButton, this.gasButton, this.shootButton];

        //const shape = new Phaser.Geom.Circle(this.leftButton.width/2, this.leftButton.height/2, this.leftButton.width);

    


        this.leftButton.setInteractive(new Phaser.Geom.Circle(this.leftButton.width/2, this.leftButton.height/2, this.leftButton.width), Phaser.Geom.Circle.Contains);    
        this.rightButton.setInteractive(new Phaser.Geom.Circle(this.rightButton.width/2, this.rightButton.height/2, this.leftButton.width), Phaser.Geom.Circle.Contains);
        this.gasButton.setInteractive(new Phaser.Geom.Circle(this.gasButton.width/2, this.gasButton.height/2, this.leftButton.width), Phaser.Geom.Circle.Contains);
        this.shootButton.setInteractive(new Phaser.Geom.Circle(this.shootButton.width/2, this.shootButton.height/2, this.leftButton.width), Phaser.Geom.Circle.Contains);

        // this.scene.input.enableDebug(this.leftButton);
        // this.scene.input.enableDebug(this.rightButton);
        // this.scene.input.enableDebug(this.gasButton);
        // this.scene.input.enableDebug(this.shootButton);

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