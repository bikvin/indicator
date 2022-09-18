import Phaser from "phaser";
import DialogWindowManager from "../entities/DialogWindowManager";
import levelsConfig from "./levelConfig"
import sharedUtils from "../utils/sharedUtils"
import lang from "../lang/lang"
const Level = require('../models/AstLevel')
//console.log('vkLevel', vkLevel)



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

       this.testDbWrite();

    }

    // testDbWrite(){
    //     // try{
    //     //     console.log('try save to db')
    //     //     const astVkLevel = await AstVkLevel.create({vkUserId:1111, topOpenLevel: 3356 })
    //     //     //res.status(201).json({room: room._id})
    //     //     //AstVkLevel.create({vkUserId:1111, topOpenLevel: topOpenLevel }).then(()=>{console.log('Saved')})
    //     // }
    //     // catch (err){
    //     //     //res.status(400).send({ err })
    //     //     console.error(err);
    //     // }

    //     // const fetchPromise = fetch('https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json');

    //     // console.log(fetchPromise);

    //     // fetchPromise.then((response) => {
    //     // console.log(`Received response: ${response.status}`);
    //     // });
    //     console.log('testDbWrite')
    //     //console.log(AstVkLevel)
    //     //console.log(AstVkLevel.create)
    //     // const createLevelPromice = vkLevel.create({vkUserId:1111, topOpenLevel: 3356 })

    //     // createLevelPromice.then((response) => {
    //     //     console.log("Responce")
    //     //     console.log(responce)
    //     // })
    // }

    testDbWrite(){
        // try{
        //     const res = await fetch('http://localhost:3000/asteroid_hunters/create_top_level', {
        //         //credentials: 'same-origin',
        //         method: 'POST',
        //         //body: JSON.stringify({email, password}),
        //         headers: {
        //             'Content-Type': 'application/json',
        //             //'CSRF-Token': token // <-- is the csrf token as a header
        //         }
        //     })
        //     const data = await res.json()
            
        //     console.log(data)

        // }
        // catch (err) {
        //     console.log(err) 
        // }
        console.log('this.config.referer', this.config.referer)
        const path = `${this.config.referer}/asteroid_hunters/create_top_level`
        console.log("path", path);

        const createLevelPromice = fetch(path, {
                //credentials: 'same-origin',
                method: 'POST',
                //body: JSON.stringify({email, password}),
                headers: {
                    'Content-Type': 'application/json',
                    //'CSRF-Token': token // <-- is the csrf token as a header
                }
            })

            createLevelPromice
            .then((res) => {
                console.log(res)
                if (!res.ok) {
                    throw new Error(`HTTP error: ${response.status}`);
                  }
                return res.json()

                //astLevelPromice.then((astLevel) => {console.log(astLevel)})
            })
            .then((astLevel) => {
                console.log(astLevel)
            })
            .catch((error) => {
                console.error(`Could not save progress: ${error}`);
              });
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