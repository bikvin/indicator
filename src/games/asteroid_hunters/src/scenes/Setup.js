import Phaser from "phaser";
import TopOpenLevelManager from "../utils/topOpenLevelManager"
import { v4 as uuidv4 } from 'uuid';
import VkBridgeLib from '@vkontakte/vk-bridge';
import sharedUtils from "../utils/sharedUtils";


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

        this.setLang();

        this.setUserId();


    }

    nextScene(){
        this.scene.start("StartScene");
        //this.scene.start("FinalScene");
    }

    setLang(){// default lang is 'en'. For vk change it to 'ru'
        if(this.config.target === 'vk'){
            this.config.lang = 'ru';
        }
    }

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

        // vkBridge.send("VKWebAppGetUserInfo");

        // vkBridge.subscribe((e) => {
        //     console.log('vk eventt')
        //     console.log(e)
        //     console.log('e.detail.type', e.type)
        //     //console.log('e.data.type', e.data.type)
        //     if(e.detail.type == 'VKWebAppGetUserInfoResult') {
        //         console.log('got user data')
        //         console.log(e);
        //         this.config.userId = e.detail.data.id;
        //         console.log('this.config.userId is', this.config.userId);
        //         this.nextScene();

        //     }
        //     else if (e.detail.type == 'VKWebAppGetUserInfoFailed'){
        //         console.log('Error');
        //         console.log(e);
        //     }
        // });

        vkBridge.send('VKWebAppGetUserInfo')
            .then((data) => { 
              if (data.id) {
                console.log('got user data');
                console.log(data);
                //this.nextScene();
                this.getUserAgent();
                // Данные пользователя получены
              }
            })
            .catch((error) => {
              // Ошибка
              console.log(error);
            });
    }

    getUserAgent(){
        this.config.vkBridge.send('VKWebAppGetClientVersion')
        .then((data) => { 
            if (data.platform) {
            // Данные пользователя получены
                console.log(data);
                this.nextScene();
            }
        })
        .catch((error) => {
            // Ошибка
            console.log(error);
        });
    }

    
} 