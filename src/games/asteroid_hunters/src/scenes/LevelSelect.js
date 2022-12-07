import Phaser from "phaser";
import DialogWindowManager from "../entities/DialogWindowManager";
import levelsConfig from "../gameConfigs/levelConfig"
import sharedUtils from "../utils/sharedUtils"
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

        this.topOpenLevel = this.config.topOpenLevel;

        this.level = this.data.level || this.topOpenLevel;



        if(this.level >= levelsConfig.length) this.level = levelsConfig.length-1; // if topopenlevel is set higher than last level set this.level to last level
        
        
    }

    preload() {




    }

  

    create() {

        //console.log('LevelSelect Create');


        sharedUtils.createBackground(this);



        this.dialogWindowManager = new DialogWindowManager(this,  levelsConfig);

        this.createLevelSelectWindow();

       

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