import Phaser from "phaser";
import sharedUtils from "../utils/sharedUtils"
import lang from "../lang/lang"
import VkFunctions  from "../utils/VkFunctions";

export default class FinalScene extends Phaser.Scene {
    constructor(config) {
        super("FinalScene");

        //console.log(this.confing);
  
       this.config = config;

 
       if(this.config.target === 'vk')  this.vkFunctions = new VkFunctions(this);
        
    }

    preload() {




    }

    create() {
        sharedUtils.createBackground(this);
        this.createButton();
        this.createLabel();

        if(this.config.target === 'vk') this.createVkButtons();
    
        //this.createVkButtons();

    }
    

    createLabel(){
        this.add.image(this.config.width/2, 350*this.config.scaleMultiplier, 'end-title').setOrigin(0.5,0.5).setDepth(1).setScale(this.config.scaleMultiplier);

        const youWon = this.add.text(this.config.width/2, this.config.height/2+100*this.config.scaleMultiplier, lang.youWon[this.config.lang], { font: '60px Comfortaa' })
        .setOrigin(0.5).setScale(this.config.scaleMultiplier);
    }



    createButton(){

        const button = this.add.text(this.config.width/2, 650*this.config.scaleMultiplier, lang.startAgain[this.config.lang], { font: '40px Comfortaa' })
        .setScale(this.config.scaleMultiplier)     
        .setOrigin(0.5)
        .setInteractive({ cursor: 'pointer' })
        .on('pointerover', () => {button.setScale( 1.1*this.config.scaleMultiplier );})
        .on('pointerout', () => button.setScale( 1*this.config.scaleMultiplier ))
        .on('pointerdown', () => {button.setScale( 1*this.config.scaleMultiplier ); this.scene.start("SetupScene"); })
        
    }

    createVkButtons(){

        const shareMessage = `Я прошел Asteroid Hunters целиком!`;
        //console.log(shareMessage);


        const shareButton = this.add.text(this.config.width/2, 750*this.config.scaleMultiplier, 'Поделиться', { font: '30px Comfortaa', align: 'center'  }).setScale(this.config.scaleMultiplier)
        .setOrigin(0.5,0.5)
        .setDepth(2)
        .on('pointerdown', () => {
            //console.log('add to wall', shareMessage);
            this.vkFunctions.share(shareMessage);
        });
        sharedUtils.setButtonHover(shareButton, this.config.scaleMultiplier, this.config.scaleMultiplier*1.1);

    }


    
} 