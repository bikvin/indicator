import Phaser from "phaser";
import Player from '../entities/Player';

import TouchButtons from '../entities/TouchButtons';

import Saucers from '../objectManagers/Saucers';
import Bullets from '../objectManagers/Bullets';
import Asteroids from "../objectManagers/Asteroids";
import Collectables from "../objectManagers/Collectables";
import LevelTimer from "../entities/LevelTimer";
import levelsConfig from "../gameConfigs/levelConfig"
import BottomLabel from "../entities/BottomLabel";
import DialogWindowManager from "../entities/DialogWindowManager"
//import sharedUtils from "../utils/sharedUtils"
import AsteroidCrunch from "../entities/AsteroidCrunch"
import VkFunctions  from "../utils/VkFunctions";
import sharedUtils from "../utils/sharedUtils";
import lang from "../lang/lang";
//import topOpenLevelManager from "../utils/topOpenLevelManager"

//import Ast_crush from '../anims/Ast_crush';

//const LEVEL_TIME = 3*60*1000;



export default class PlayScene extends Phaser.Scene {
    constructor(config) {
        super("PlayScene");
        this.config = config;

        if(this.config.target === 'vk')  this.vkFunctions = new VkFunctions(this);
    }

    init(data){

        console.log('playScene create');

        this.level = data.level;
        //this.sharedOptions = data.sharedOptions;
        this.paused = false;
        this.muteSounds();
    }

    preload() {
    }

    create() {

        console.log('playScene create')
    
        this.matter.world.autoUpdate = false;
        this.matterTimeStep = 16.66; // set fps to 60 (1000/60 = 16.66)
        this.timeAccumulator = 0; // this is needed in update
        this.gameStepsPaused = false;

        this.levelWon = false;

        this.levelConfig = levelsConfig[this.level];
        

        this.categoryPlayer = 0b000001;
        this.categoryAsteroid = 0b000010;
        this.categorySaucer = 0b000100;
        //this.categoryRoundBody = 0b001000;
        this.categoryCollectable = 0b001000;
        this.categoryBullet = 0b010000;
        
        this.bottomLabel = new BottomLabel(this);
        //this.musicOn = false;

        sharedUtils.createBackground(this);

        this.cursors = this.input.keyboard.createCursorKeys();
        this.player = this.createPlayer(); 
        console.log('this.player = ' + this.player);
        console.log('this.player.ship=' + this.player.ship);

        const saucersConf = this.levelConfig.saucers;

        if(saucersConf){
            this.saucers = new Saucers(this, 
                saucersConf.maxAlive, 
                saucersConf.shootDelay, 
                saucersConf.totalMax, 
                saucersConf.createDelay,
                saucersConf.saucerLives);
        }
        
        
        const asteroidsConf = this.levelConfig.asteroids;
        if(asteroidsConf){
            this.asteroids = new Asteroids(this, 
                asteroidsConf.totalMax, 
                asteroidsConf.maxAlive, 
                asteroidsConf.createDelay,
                asteroidsConf.minVelocity,
                asteroidsConf.maxVelocity);
        }
       

        this.bullets = new Bullets(this, this.levelConfig.ammo);

        
        if(this.levelConfig.collectables) this.collectables = new Collectables(this,
             this.levelConfig.collectables.types,
             this.levelConfig.collectables.minDelay,
             this.levelConfig.collectables.maxDelay,
             this.levelConfig.collectables.minTtl,
             this.levelConfig.collectables.maxTtl,
             this.levelConfig.collectables.maxAlive
             );

        this.matter.world.on('collisionstart', this.onCollision, this);

        if(!this.sounds){
            this.createSounds();
        }
        

        if(!this.sys.game.device.os.desktop){
            this.touchButtons = new TouchButtons(this);
        }
        

 
        if(this.levelConfig.time) this.levelTimer = new LevelTimer(this, this.levelConfig.time);

       // this.graphics = this.add.graphics();
        

        this.dialogWindowManager = new DialogWindowManager(this, levelsConfig);

        this.createPauseButton();

        this.asteroidCrunch = new AsteroidCrunch(this);

        console.log('this.config', this.config);

        if(this.config.target === 'vk') setTimeout(() => {this.vkFunctions.downloadVKAd();}, 5000); /// after 5 sec try to download vk ad to client

        // this.debugArray = ['Debug'];

        // this.debugText = this.add.text(50, 50, this.debugArray, { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', color: '#e8eb34'}).setScale(3);

        if(this.sys.game.device.os.desktop){
            sharedUtils.createInstructions(this, lang);
        }


        
    }



    createSounds() {
        this.sounds = {
            boom: this.sound.add('boom', {volume: 0.1}),
            theme: this.sound.add('theme', {volume: 0.00001, loop: true}),
            astCrush: this.sound.add('astCrush', {volume: 0.1}),
            shoot: this.sound.add('shoot', {volume: 0.1}),
            saucerBoom: this.sound.add('saucer_boom', {volume: 0.1}),
            collect: this.sound.add('collect', {volume: 0.1}),
            noAmmo: this.sound.add('no-ammo', {volume: 0.05}),
            astHit: this.sound.add('ast-hit', {volume: 0.1}),
            thrust: this.sound.add('thrust', { loop: true, volume: 0.1 })
            
        };
        
        this.muteSounds();
        
 
        
    }

    muteSounds(){ // if sounds are off set all saounds muted and visa versa

        for (var key in this.sounds) {

            this.sounds[key].setMute(!this.config.soundOn);
        }

    }

    onCollision(event, bodyA, bodyB,){

        const player = [bodyA.gameObject, bodyB.gameObject].find(item => {
          
            return item.isPlayer})
        const bullet = [bodyA.gameObject, bodyB.gameObject].find(item => item.isBullet)
        const asteroid = [bodyA.gameObject, bodyB.gameObject].find(item => item.isAsteroid)
        const saucer = [bodyA.gameObject, bodyB.gameObject].find(item => item.isSaucer);
        const collectable = [bodyA.gameObject, bodyB.gameObject].find(item => item.isCollectable);

  

        if(player && asteroid){
            

            this.player.crash();
        }
        else if(player && bullet){
            this.player.crash();
            bullet.deactivate();
        }
        else if(bullet && asteroid){
            //console.log('bullet and asteroid collided')

            const crunchAngle = Phaser.Math.RadToDeg(bullet.dirVec.negate().angle())
  
            this.asteroidCrunch.launch(bullet.x, bullet.y, crunchAngle);
            bullet.deactivate();
            asteroid.minusLife();
            this.sounds.astHit.play()

        }
        else if(bullet && saucer){
            //console.log('Saucer hit')
            bullet.deactivate();
            saucer.minusLife();
            
        }
        else if(player && saucer){
            saucer.minusLife();
            this.player.crash();
        }
        else if(player && collectable){
            //console.log('Collectable Taken');
            collectable.collect();
        }
 
    }

    update(time, delta) {

        // this 'manual' stepping is needed to overcome different screen fps and make it all 60fps
        // https://phaser.discourse.group/t/question-about-matter-js-and-its-update-loop/4824

        if(this.gameStepsPaused) return;

        this.timeAccumulator += delta;
        while(this.timeAccumulator >= this.matterTimeStep) {
            this.timeAccumulator -= this.matterTimeStep;

            this.player.move();

            this.matter.world.step(this.matterTimeStep);
        }

        //console.log(delta);
        
    
        

    }

  

    onLose(reason){
        //console.log("onLose");
    
        this.dialogWindowManager.createWindow('lose', reason);
        this.pauseAllMovements();
     
    }

    onWin(){
        console.log("onWin");
        this.levelWon = true;
        //const topOpenLevel = await topOpenLevelManager.getTopOpenLevel(this.config.target);
        const topOpenLevel = this.config.topOpenLevel;

       

        //this.dialogWindowManager.createWindow('win');
        this.pauseAllMovements();

        if(
            (
            this.level >= topOpenLevel // we were playing the top open level
            || !topOpenLevel// or we have no top open level set
            ) 
            && (this.level < levelsConfig.length-1) // we weren't playing the last level in the game
        )
        {
            console.log("Setting new topOpenLevel")
            this.config.topOpenLevelManager.setTopOpenLevel(this.level+1, this.config.target)
            .then((newTopOpenLevel) => {
                console.log("onWin newTopOpenLevel", newTopOpenLevel);
                this.config.topOpenLevel = newTopOpenLevel;
                //this.level = newTopOpenLevel;
                this.dialogWindowManager.createWindow('win');   // if we set topOpenLevel to db show dialog after it is set
            })
            .catch(err => console.log(err))
           
        }
        else{
            this.dialogWindowManager.createWindow('win'); // if we dont set new topOpenLevel then show dialog immediately
        }

       
      
    }



    

    restartScene(){

        if(this.config.target === 'vk'){
            this.vkFunctions.showVkAd();
        }
        
        this.deactivateGroups();

        this.scene.restart();
    }

    deactivateGroups(){
        //console.log('deactivateChildren');
        if(this.asteroids){
            this.asteroids.getChildren().forEach(asteroid => asteroid.deactivate())

            if(this.asteroids.debrises){
                this.asteroids.debrises.getChildren().forEach(debris => debris.deactivate())
            }
        }           

        if(this.saucers){
            this.saucers.getChildren().forEach(saucer => saucer.deactivate())
        }
        

        this.bullets.resetEvents();
        this.bullets.getChildren().forEach(bullet => bullet.deactivate());

        if(this.collectables){
            this.collectables.getChildren().forEach(collectable => collectable.deactivate());
        }

        //this.levelTimer.levelTimer.remove();
        if(this.levelTimer) this.levelTimer.stop();
    }

 

    createPlayer() {
        //console.log('PlayScene createPlayer');
        return new Player(this, this.config.startPosition.x, this.config.startPosition.y);

    }



    createPauseButton(){
        this.pauseButton = this.add.image(this.config.width-50*this.config.scaleMultiplier, 50*this.config.scaleMultiplier, 'pause-icon').setOrigin(0.5).setScale(0.6*this.config.scaleMultiplier);

        this.pauseButton
            .setDepth(2)
            .setInteractive({ cursor: 'pointer' })
            .on('pointerover', () => {this.pauseButton.setScale(0.7*this.config.scaleMultiplier)})
            .on('pointerout', () => {this.pauseButton.setScale(0.6*this.config.scaleMultiplier);})
            .on('pointerdown', this.pauseGame.bind(this) )
    }

    pauseGame(){
        //console.log('PauseGame');
    
        if(!this.paused){

            
            
            this.dialogWindowManager.createWindow('pause');

            this.pauseAllMovements();
            //this.player.pauseMoves();
            this.paused = true;
        }

    }

    unpauseGame(){
       // console.log('UnpauseGame');
        this.paused = false;
        this.dialogWindowManager.removeWindow();

        this.resumeAllMovements()
        //this.player.resumeMoves();
       
    }

    pauseAllMovements(){
        //console.log('pauseAllMovements')
        if(this.saucers) this.saucers.pauseEvents();
        if(this.asteroids) this.asteroids.pauseEvents();
        if(this.collectables) this.collectables.pauseEvents();
        this.player.pauseMoves();
        this.player.exhaust.emitter.setQuantity(0); // fix the bug of thrust running when scene stops
        this.player.exhaust.stopSound();
        //console.log("this.matter", this.matter);
        //console.log("this.matter.pause();", this.matter.pause());
        //console.log("this.matter.world;", this.matter.world);
        //console.log("this.matter.world.pause()", this.matter.world.pause());
        //this.matter.pause();
        this.gameStepsPaused = true; 
        if(this.levelTimer) this.levelTimer.levelTimer.paused = true;

    }

    resumeAllMovements(){
        if(this.saucers) this.saucers.resumeEvents();
        if(this.asteroids) this.asteroids.resumeEvents();
        if(this.collectables) this.collectables.resumeEvents();
        this.player.resumeMoves();
        //this.matter.resume();
        this.gameStepsPaused = false; 
        if(this.levelTimer) this.levelTimer.levelTimer.paused = false;
    }

    checkWin() {
       // console.log('Checking win');

        if(this.levelWon) return; // don't check for win if level is won already

        let win = false;
        //let win = true;

        switch (this.levelConfig.win.item) {
            case 'asteroid':

                if(this.asteroids.asteroidsHit >= this.levelConfig.win.qty) {
                    console.log('Victory! Asteroids!');
                    win = 'Victory! Asteroids!';
                }

                else if(this.levelConfig.win.qty == 'all' && !this.asteroids.asteroidsCreating && this.asteroids.countActive() == 0){
                    //console.log('Victory! All Asteroids!')
                    win = 'Victory! All Asteroids!';
                } 
                    
                break;
            
            case 'diamond':
                if(this.collectables.diamonds >= this.levelConfig.win.qty) {
                    //console.log('Victory! Diamonds!');
                    win = 'Victory! Diamonds!';
                }
                break;
            
            case 'saucer':
           
                if(this.saucers.saucersHit >= this.levelConfig.win.qty) {
                    //console.log('Victory! Saucers!');
                    win = 'Victory! Saucers!';
                }
                else if(this.levelConfig.win.qty == 'all' && !this.saucers.saucersCreating && this.saucers.countActive() == 0) {
                    //console.log('Victory! All Saucers!')
                    win = 'Victory! All Saucers!';
                }
                break;


        }

        if(win){
            this.onWin();
        }

      
    }

    checkLose(){
        if(!this.levelConfig.lose || !this.levelConfig.lose.item || !this.levelConfig.ammo) return;

        switch (this.levelConfig.lose.item) {
            case 'ammo':
                if(this.bullets.ammo <= 0) {
                    //console.log('Defeat! Ammo!');
                    this.onLose('No ammo left!');
                    
                }

        }
    }

    nextLevel(){
        console.log('nextLevel')
        this.deactivateGroups();
        
        if(this.config.target === 'vk'){
            this.vkFunctions.showVkAd();
        }
 

        if(this.level+1 >= levelsConfig.length){ // if we won last level
            //console.log('Final scene')
            this.scene.start("FinalScene");
            return;
        }
        //console.log('sharedOptions', this.sharedOptions);
        this.scene.start("LevelSelectScene", {level: this.level+1});

    }

    exitScene(){
        this.deactivateGroups();
        this.scene.start("LevelSelectScene", {level: this.level});
        //this.scene.start("LevelSelectScene");

    }

    

    
} 