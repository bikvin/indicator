import Phaser from "phaser";
import sharedUtils from "../utils/sharedUtils"
//import topOpenLevelManager from "../utils/topOpenLevelManager"
//import sharedOptions from "../utils/sharedOptions"
import lang from "../lang/lang"
import VkFunctions  from "../utils/VkFunctions";

export default class StartScene extends Phaser.Scene {
    constructor(config) {
        super("StartScene");

       

       this.config = config;
       
       if(this.config.target === 'vk')  this.vkFunctions = new VkFunctions(this);
    }

    preload() {

       

    }

    init(){
        // if(!this.sharedOptions){
        //     this.sharedOptions = new sharedOptions();
        // }

        //console.log('this.config', this.config);


        //console.log("target", this.config.target);
        this.config.topOpenLevelManager.getTopOpenLevel(this.config.target)
        .then((topOpenLevel)=>{
            //console.log("topOpenLevel", topOpenLevel);
            this.config.topOpenLevel = topOpenLevel;
            this.createButton();
        })
        .catch((err)=>{
            console.log("err", err);
        });
    }

    create() {

        //console.log("start create")

        


        sharedUtils.createBackground(this);
        //this.createButton();
        this.createLabel();
        this.createEarth();
        // this.createShip();
        this.createAsteroids();
        this.createSaucers();
        this.createSoundIcons();
        this.createInfoIcon();

        if(!this.theme){
            this.theme = this.sound.add('theme', {volume: 0.02, loop: true});

            this.theme.play();
        }

        if(this.config.target === 'vk') this.createVkButtons();

        //this.createVkButtons();

       

    }

  
 

    createInfoIcon(){
        this.infoIcon = this.add.image(this.config.width - 50*this.config.scaleMultiplier, this.config.height - 50*this.config.scaleMultiplier, 'info-icon').setOrigin(0.5,0.5).setDepth(1).setScale(0.4*this.config.scaleMultiplier)
        .on('pointerdown', () => {this.scene.start("InfoScene"); });
        sharedUtils.setButtonHover(this.infoIcon, 0.4*this.config.scaleMultiplier, 0.5*this.config.scaleMultiplier);
    }

    createLabel(){
        this.add.image(this.config.width/2, 450*this.config.scaleMultiplier, 'title').setOrigin(0.5,0.5).setDepth(1).setScale(this.config.scaleMultiplier);
    }

    createEarth(){
        this.add.image(this.config.width/2, this.config.height, 'earth-ship').setOrigin(0.5,1).setScale(this.config.scaleMultiplier);
    }

    createButton(){



        const button = this.add.text(this.config.width/2, this.config.height/2, lang.start[this.config.lang], { font: '80px Comfortaa' }).setScale(this.config.scaleMultiplier)
        .setOrigin(0.5)
        .on('pointerdown', () => {this.scene.start("LevelSelectScene"); })
        sharedUtils.setButtonHover(button, this.config.scaleMultiplier, this.config.scaleMultiplier*1.1);
        
        
    }

    createVkButtons(){
        const addToFavoritebutton = this.add.text(30*this.config.scaleMultiplier, this.config.height-170*this.config.scaleMultiplier, 'Добавить\nв избранное', { font: '30px Comfortaa', align: 'left'  }).setScale(this.config.scaleMultiplier)
        .setOrigin(0,0.5)
        .on('pointerdown', () => {
            console.log('add to favorites'); 
            this.vkFunctions.addToFavorites();
        })
        sharedUtils.setButtonHover(addToFavoritebutton, this.config.scaleMultiplier, this.config.scaleMultiplier*1.1);

        const shareButton = this.add.text(30*this.config.scaleMultiplier, this.config.height-100*this.config.scaleMultiplier, 'Поделиться', { font: '30px Comfortaa', align: 'left'  }).setScale(this.config.scaleMultiplier)
        .setOrigin(0,0.5)
        .on('pointerdown', () => {
            console.log('add to wall');
            this.vkFunctions.share();
        })
        sharedUtils.setButtonHover(shareButton, this.config.scaleMultiplier, this.config.scaleMultiplier*1.1);

        const inviteFriendsButton = this.add.text(30*this.config.scaleMultiplier, this.config.height-50*this.config.scaleMultiplier, 'Пригласить друзей', { font: '30px Comfortaa', align: 'left'  }).setScale(this.config.scaleMultiplier)
        .setOrigin(0,0.5)
        .on('pointerdown', () => {
            console.log('invite friends');
            this.vkFunctions.inviteFriends();
        })
        sharedUtils.setButtonHover(inviteFriendsButton, this.config.scaleMultiplier, this.config.scaleMultiplier*1.1);


        }
    

    // createShip(){
    //     this.add.image(315*this.config.widthMultiplier, 705*this.config.heightMultiplier, 'ship').setOrigin(0.5,1).setScale(0.5*this.config.scaleMultiplier).setAngle(-35);
    // }

    createAsteroids(){
        this.add.image(100*this.config.scaleMultiplier, 700*this.config.scaleMultiplier, 'gray_asteroids', 'asteroid_gray_lg_1').setOrigin(0.5,1).setAngle(-35).setScale(1*this.config.scaleMultiplier);
        this.add.image(1000*this.config.scaleMultiplier, 150*this.config.scaleMultiplier, 'gray_asteroids', 'asteroid_gray_lg_2').setOrigin(0.5,1).setAngle(-35).setScale(1*this.config.scaleMultiplier);
        this.add.image(1350*this.config.scaleMultiplier, 600*this.config.scaleMultiplier, 'gray_asteroids', 'asteroid_gray_lg_3').setOrigin(0.5,1).setAngle(-35).setScale(0.8*this.config.scaleMultiplier);
    }

    createSaucers(){
        this.add.image(350*this.config.scaleMultiplier, 100*this.config.scaleMultiplier, 'saucer_image').setOrigin(0.5,1).setScale(this.config.scaleMultiplier);
        this.add.image(1100*this.config.scaleMultiplier, 500*this.config.scaleMultiplier, 'saucer_image').setOrigin(0.5,1).setScale(this.config.scaleMultiplier);
    }

    createSoundIcons(){


        let soundTexture
        (this.config.soundOn) ? soundTexture = 'sound-icon' : soundTexture = 'nosound-icon'
        this.soundIcon = this.add.image(this.config.width-200*this.config.scaleMultiplier, 70*this.config.scaleMultiplier, soundTexture).setOrigin(0.5,0.5).setDepth(1).setScale(0.6*this.config.scaleMultiplier)
        .on('pointerdown', this.toggleSound.bind(this));
        sharedUtils.setButtonHover(this.soundIcon, 0.6*this.config.scaleMultiplier, 0.7*this.config.scaleMultiplier);


       
        let musicTexture
        (this.config.musicOn) ? musicTexture = 'music-icon' : musicTexture = 'nomusic-icon'

        this.musicIcon = this.add.image(this.config.width-100*this.config.scaleMultiplier, 70*this.config.scaleMultiplier, musicTexture).setOrigin(0.5,0.5).setDepth(1).setScale(0.5*this.config.scaleMultiplier)
        .on('pointerdown', this.toggleMusic.bind(this));
        sharedUtils.setButtonHover(this.musicIcon, 0.5*this.config.scaleMultiplier, 0.6*this.config.scaleMultiplier);
         

    }

    toggleSound(){

        if(this.config.soundOn){
            this.soundIcon.setTexture('nosound-icon');
        }else{
            this.soundIcon.setTexture('sound-icon')
        }
        this.config.soundOn = !this.config.soundOn;
    }

    toggleMusic(){

        if(this.config.musicOn){
            this.musicIcon.setTexture('nomusic-icon');
            this.theme.pause();
        }else{
            this.musicIcon.setTexture('music-icon')
            this.theme.resume();
        }
        this.config.musicOn = !this.config.musicOn;
    }

    



    
} 