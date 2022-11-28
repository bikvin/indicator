import Phaser from "phaser";
import DialogWindowManager from "../entities/DialogWindowManager";
import levelsConfig from "../gameConfigs/levelConfig"
//import sharedUtils from "../utils/sharedUtils"
import lang from "../lang/lang"
//import topOpenLevelManager from "../utils/topOpenLevelManager"
//const Level = require('../models/AstLevel')
//console.log('vkLevel', vkLevel)



export default class LevelSelectScene extends Phaser.Scene {
    constructor(config) {
        super("LevelSelectScene");
        this.config = config;
  
        
    }

    init(data){

        //console.log('LevelSelect init');

 
        this.data = data;

        //this.sharedOptions = data.sharedOptions;


        //this.topOpenLevel = await topOpenLevelManager.getTopOpenLevel(this.config.target);
        this.topOpenLevel = this.config.topOpenLevel;

        //console.log('this.topOpenLevel=',this.topOpenLevel);
        
        //console.log('data', data);
        this.level = this.data.level || this.topOpenLevel;

        //this.level = this.topOpenLevel;

        //console.log("this.level = " + this.level);

        if(this.level >= levelsConfig.length) this.level = levelsConfig.length-1; // if topopenlevel is set higher than last level set this.level to last level
        
        
    }

    preload() {




    }

  

    create() {

        //console.log('LevelSelect Create');

       // this.newInit();




        this.createBackground();

        if(this.sys.game.device.os.desktop){
            this.createUseArrowsLabel();
        }

       


        this.dialogWindowManager = new DialogWindowManager(this,  levelsConfig);

        this.createLevelSelectWindow();

       

    }

    
    
    
    createBackground(){
        this.add.image(0, 0, 'space').setAngle(90).setOrigin(0,1).setDisplaySize(window.innerHeight* window.devicePixelRatio,window.innerWidth* window.devicePixelRatio);
    }

    createUseArrowsLabel(){
        this.add.image(450*this.config.scaleMultiplier, 700*this.config.scaleMultiplier, 'use-arrows-icon').setOrigin(0.5).setScale(0.7*this.config.scaleMultiplier);
        this.add.text(600*this.config.scaleMultiplier, 700*this.config.scaleMultiplier,  lang.instructions[this.config.lang], { font: '25px Comfortaa' }).setOrigin(0, 0.5).setScale(this.config.scaleMultiplier);
    }

    createLevelSelectWindow(){

        this.dialogWindowManager.createWindow('levelSelect');
    }

    startGame(){

        this.scene.start("PlayScene", {level: this.level});
    }

    exitScene(){
        this.scene.start("StartScene");
    }
    
} 