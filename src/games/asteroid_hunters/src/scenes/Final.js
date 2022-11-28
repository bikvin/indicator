import Phaser from "phaser";

export default class FinalScene extends Phaser.Scene {
    constructor(config) {
        super("FinalScene");
  
       this.config = config;
        
    }

    preload() {




    }

    create() {
        this.createBackground();
        this.createButton();
        this.createLabel();

    }
    
    createBackground(){
        this.add.image(0, 0, 'space').setAngle(90).setOrigin(0,1).setScale(this.config.scaleMultiplier);
    }

    createLabel(){
        this.add.image(this.config.width/2, 350*this.config.scaleMultiplier, 'end-title').setOrigin(0.5,0.5).setDepth(1).setScale(this.config.scaleMultiplier);

        const youWon = this.add.text(this.config.width/2, this.config.height/2+100*this.config.scaleMultiplier, 'You won!', { font: '60px Comfortaa' })
        .setOrigin(0.5).setScale(this.config.scaleMultiplier);
    }



    createButton(){

        const button = this.add.text(this.config.width/2, 700*this.config.scaleMultiplier, 'Start Again', { font: '40px Comfortaa' })
        .setScale(this.config.scaleMultiplier)
        .setOrigin(0.5)
        .setInteractive({ cursor: 'pointer' })
        .on('pointerover', () => {button.setScale( 1.1*this.config.scaleMultiplier );})
        .on('pointerout', () => button.setScale( 1*this.config.scaleMultiplier ))
        .on('pointerdown', () => {button.setScale( 1*this.config.scaleMultiplier ); this.scene.start("SetupScene"); })
        
    }


    
} 