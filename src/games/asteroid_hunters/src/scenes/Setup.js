import Phaser from "phaser";
import TopOpenLevelManager from "../utils/topOpenLevelManager"
import { v4 as uuidv4 } from 'uuid';
import VkBridgeLib from '@vkontakte/vk-bridge';


export default class SetupScene extends Phaser.Scene {


    constructor(config) {
        super('SetupScene');

        this.config = config;
        
        
    }

    preload() {

        //console.log('Preload Preload');
        this.createBackground();
        
    
    }

    createBackground(){
        this.add.image(0, 0, 'space').setAngle(90).setOrigin(0,1);
    }

   

    create() {
        console.log('Setup Create');
       
        

        this.setupTopOpenLevel();

        this.setupSoundParams();

        this.setLang();

        this.setUserId();

        this.scene.start("StartScene");


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

        vkBridge.send("VKWebAppGetUserInfo");

        vkBridge.subscribe((e) => {
            console.log('vk eventt')
            console.log(e)
            console.log('e.detail.type', e.type)
            //console.log('e.data.type', e.data.type)
            if(e.detail.type == 'VKWebAppGetUserInfoResult') {
                console.log('got user data')
                console.log(e);
            }
            else if (e.detail.type == 'VKWebAppGetUserInfoFailed'){
                console.log('Error');
                console.log(e);
            }
        });
    }

    
} 