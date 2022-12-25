import Phaser from "phaser";
import TopOpenLevelManager from "../utils/topOpenLevelManager"
import { v4 as uuidv4 } from 'uuid';
import VkBridgeLib from '@vkontakte/vk-bridge';
import sharedUtils from "../utils/sharedUtils";
//import { TopologyDescriptionChangedEvent } from "mongodb";


export default class SetupScene extends Phaser.Scene {


    constructor(config) {
        super('SetupScene');

        this.config = config;
        
        
    }

    preload() {

        //console.log('Preload Preload');
        sharedUtils.createBackground(this);
        
        
    
    }

   

    create() {
        console.log('Setup Create');
       
        

        this.setupTopOpenLevel();

        this.setupSoundParams();

        //this.setLang();

        this.setUserId();

        // this.debugArray = ['Debug'];

        // this.debugText = this.add.text(50, 50, this.debugArray, { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', color: '#e8eb34'}).setScale(3);


    }

    nextScene(){
        this.scene.start("StartScene");
        //this.scene.start("FinalScene");
    }

    // setLang(){// default lang is 'en'. For vk change it to 'ru'
    //     if(this.config.target === 'vk'){
    //         this.config.lang = 'ru';
    //     }
    // }

    setUserId(){
        
        if(this.config.target === 'indicator'){

            if(user) {// user is logged in at indicator.games
                this.config.userId = user._id;
                console.log('this.config.userId from db ' + this.config.userId);
                
            }else{// user is not logged in at indicator.games so use id in localstorage
                this.config.userId = this.getUserIdLocalStorage() || this.createNewUserIdLocalStorage();
                console.log('this.config.userId from localstorage ' + this.config.userId);
            }        
            
            this.nextScene();

        }
        else if(this.config.target === 'vk'){ 
                this.initVkBrigge();
    
        }
    }

    setupTopOpenLevel(){
        this.config.topOpenLevelManager = new TopOpenLevelManager(this.config);
        this.config.topOpenLevel = 0;
    }

    setupSoundParams(){
        this.config.musicOn = true;
        this.config.soundOn = true;
    }

    getUserIdLocalStorage(){
        const userId = localStorage.getItem('asteroidsUserId');
        return (userId);
    }

    createNewUserIdLocalStorage(){
        const newUserId = uuidv4(); 
        localStorage.setItem('asteroidsUserId',newUserId);
        return newUserId;
    }




    initVkBrigge(){
        console.log("initVkBrigge")
       
        this.config.vkBridge = VkBridgeLib; // make VkBridgeLib available from config to access from other scenes
        const vkBridge = this.config.vkBridge;

        vkBridge.send('VKWebAppInit', {}).then(() => {
            this.getVkUser();
          });
        
    }

    getVkUser(){
        console.log('getVkUser')
        const vkBridge = this.config.vkBridge;



        vkBridge.send('VKWebAppGetUserInfo')
            .then((data) => { 
              if (data.id) {
                console.log('got user data');
                console.log(data);
                this.nextScene();
                //this.getUserAgent();
                // Данные пользователя получены
              }
            })
            .catch((error) => {
              // Ошибка
              console.log(error);
            });
    }

    // getUserAgent(){
    //     this.config.vkBridge.send('VKWebAppGetClientVersion')
    //     .then((data) => { 
    //         if (data.platform) {
    //         // Данные пользователя получены
    //             console.log(data);
    //             this.config.platform = data.platform;

    //             if(data.platform === 'android') {
    //                 this.checkHomeScreenAdd();
    //             }else{
    //                 this.nextScene();
    //             }
    //             //this.nextScene();
                
    //         }
    //     })
    //     .catch((error) => {
    //         // Ошибка
    //         console.log(error);
    //     });
    // }


    // checkHomeScreenAdd(){
    //     this.config.vkBridge.send('VKWebAppAddToHomeScreenInfo')
    //     .then((data) => { 
    //         if (data.is_added_to_home_screen) {
    //         // Информация получена
    //             console.log('Got home screen info');
    //             console.log(data);
    //             this.debugArray.push('Got home screen info');
    //             this.debugText.text = data.is_added_to_home_screen;
    //             //this.nextScene();
    //         }
    //     })
    //     .catch((error) => {
    //         // Ошибка
    //         console.log(error);
    //         this.debugArray.push('error');
    //         this.debugText.text = error;
    //     });
    // }

    
} 