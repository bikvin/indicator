import Phaser from "phaser";
import DialogWindowManager from "../entities/DialogWindowManager";
import levelsConfig from "./levelConfig"
import sharedUtils from "../utils/sharedUtils"
import lang from "../lang/lang"

export default class LevelSelectScene extends Phaser.Scene {
    constructor(config) {
        super("LevelSelectScene");
        this.config = config;
  
        
    }

    init(data){


        this.topOpenLevel = sharedUtils.getTopOpenLevel(this.config.target);

        this.level = data.level || this.topOpenLevel;

        if(this.level >= levelsConfig.length) this.level = levelsConfig.length-1; // if topopenlevel is set higher than last level set this.level to last level
        

        this.sharedOptions = data.sharedOptions;
        
    }

    preload() {




    }

    create() {
        this.createBackground();

        if(this.sys.game.device.os.desktop){
            this.createUseArrowsLabel();
        }

       


        this.dialogWindowManager = new DialogWindowManager(this,  levelsConfig);

        this.createLevelSelectWindow();

    }


    
    
    createBackground(){
        this.add.image(0, 0, 'space').setAngle(90).setOrigin(0,1);
    }

    createUseArrowsLabel(){
        this.add.image(450, 700, 'use-arrows-icon').setOrigin(0.5).setScale(0.7);
        this.add.text(600, 700,  lang.instructions[this.config.lang], { font: '25px Comfortaa' }).setOrigin(0, 0.5);
    }

    createLevelSelectWindow(){

        this.dialogWindowManager.createWindow('levelSelect');
    }

    startGame(){

        this.scene.start("PlayScene", {level: this.level, sharedOptions: this.sharedOptions});
    }

    exitScene(){
        this.scene.start("StartScene");
    }
    
} 