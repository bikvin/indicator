import Phaser from "phaser";
import sharedUtils from "../utils/sharedUtils"
import sharedOptions from "../utils/sharedOptions"

export default class PreloadScene extends Phaser.Scene {
    constructor(config) {
        super("StartScene");

       this.config = config;
       
    }

    preload() {



    }

    init(){
        if(!this.sharedOptions){
            this.sharedOptions = new sharedOptions();
        }
    }

    create() {
        this.createBackground();
        this.createButton();
        this.createLabel();
        this.createEarth();
        this.createShip();
        this.createAsteroids();
        this.createSaucers();
        this.createSoundIcons();
        this.createInfoIcon();

        if(!this.theme){
            this.theme = this.sound.add('theme', {volume: 0.02, loop: true});

            this.theme.play();
        }
    }
    
    createBackground(){
        this.add.image(0, 0, 'space').setAngle(90).setOrigin(0,1);
    }

    createInfoIcon(){
        this.infoIcon = this.add.image(this.config.width - 50, this.config.height - 50, 'info-icon').setOrigin(0.5,0.5).setDepth(1).setScale(0.4)
        .on('pointerdown', () => {this.scene.start("InfoScene", {sharedOptions: this.sharedOptions}); });
        sharedUtils.setButtonHover(this.infoIcon, 0.4, 0.5);
    }

    createLabel(){
        this.add.image(this.config.width/2, 450, 'title').setOrigin(0.5,0.5).setDepth(1);
    }

    createEarth(){
        this.add.image(this.config.width/2, this.config.height, 'earth').setOrigin(0.5,1);
    }

    createButton(){

        const button = this.add.text(this.config.width/2, this.config.height/2, 'Start', { font: '80px Comfortaa' })
        .setOrigin(0.5)
        .on('pointerdown', () => {this.scene.start("LevelSelectScene", {sharedOptions: this.sharedOptions}); })
        sharedUtils.setButtonHover(button);
        
        
    }

    createShip(){
        this.add.image(310, 710, 'ship').setOrigin(0.5,1).setScale(0.5).setAngle(-35);
    }

    createAsteroids(){
        this.add.image(100, 100, 'gray_asteroids', 'asteroid_gray_lg_1').setOrigin(0.5,1).setAngle(-35).setScale(1);
        this.add.image(1000, 150, 'gray_asteroids', 'asteroid_gray_lg_2').setOrigin(0.5,1).setAngle(-35).setScale(1);
        this.add.image(1350, 600, 'gray_asteroids', 'asteroid_gray_lg_3').setOrigin(0.5,1).setAngle(-35).setScale(0.8);
    }

    createSaucers(){
        this.add.image(350, 100, 'saucer_image').setOrigin(0.5,1);
        this.add.image(1100, 500, 'saucer_image').setOrigin(0.5,1);
    }

    createSoundIcons(){


        let soundTexture
        (this.sharedOptions.soundOn) ? soundTexture = 'sound-icon' : soundTexture = 'nosound-icon'
        this.soundIcon = this.add.image(this.config.width-200, 70, soundTexture).setOrigin(0.5,0.5).setDepth(1).setScale(0.6)
        .on('pointerdown', this.toggleSound.bind(this));
        sharedUtils.setButtonHover(this.soundIcon, 0.6, 0.7);


        // if(this.sharedOptions.musicOn){
        //     const musicTexture = 'music-icon'
        // }else{
        //     const musicTexture = 'nomusic-icon'
        // }
        let musicTexture
        (this.sharedOptions.musicOn) ? musicTexture = 'music-icon' : musicTexture = 'nomusic-icon'

        this.musicIcon = this.add.image(this.config.width-100, 70, musicTexture).setOrigin(0.5,0.5).setDepth(1).setScale(0.5)
        .on('pointerdown', this.toggleMusic.bind(this));
        sharedUtils.setButtonHover(this.musicIcon, 0.5, 0.6);
         

    }

    toggleSound(){

        if(this.sharedOptions.soundOn){
            this.soundIcon.setTexture('nosound-icon');
        }else{
            this.soundIcon.setTexture('sound-icon')
        }
        this.sharedOptions.soundOn = !this.sharedOptions.soundOn;
    }

    toggleMusic(){

        if(this.sharedOptions.musicOn){
            this.musicIcon.setTexture('nomusic-icon');
            this.theme.pause();
        }else{
            this.musicIcon.setTexture('music-icon')
            this.theme.resume();
        }
        this.sharedOptions.musicOn = !this.sharedOptions.musicOn;
    }

    



    
} 