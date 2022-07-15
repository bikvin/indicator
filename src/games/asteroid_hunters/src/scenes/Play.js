import Phaser from "phaser";
import Player from '../entities/Player';

import TouchButtons from '../entities/TouchButtons';

import Saucers from '../objectManagers/Saucers';
import Bullets from '../objectManagers/Bullets';
import Asteroids from "../objectManagers/Asteroids";
import Collectables from "../objectManagers/Collectables";
import LevelTimer from "../entities/LevelTimer";
import levelsConfig from "./levelConfig"
import BottomLabel from "../entities/BottomLabel";
import DialogWindowManager from "../entities/DialogWindowManager"
import sharedUtils from "../utils/sharedUtils"
import AsteroidCrunch from "../entities/AsteroidCrunch"

//import Ast_crush from '../anims/Ast_crush';

//const LEVEL_TIME = 3*60*1000;



export default class PlayScene extends Phaser.Scene {
    constructor(config) {
        super("PlayScene");
        this.config = config;
    }

    init(data){

        this.level = data.level;
        this.sharedOptions = data.sharedOptions;
        this.paused = false;
        this.muteSounds();
    }

    preload() {
    }

    create() {

        this.matter.set60Hz();


        this.levelConfig = levelsConfig[this.level];
        

        this.categoryPlayer = 0b000001;
        this.categoryAsteroid = 0b000010;
        this.categorySaucer = 0b000100;
        //this.categoryRoundBody = 0b001000;
        this.categoryCollectable = 0b001000;
        this.categoryBullet = 0b010000;
        
        this.bottomLabel = new BottomLabel(this);
        //this.musicOn = false;

        this.createBackground();

        this.cursors = this.input.keyboard.createCursorKeys();
        this.player = this.createPlayer(); 

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
        
        // if(sharedUtils.musicOn){
        //     this.sounds.theme.play();
        // }
        
    }

    muteSounds(){ // if sounds are off set all saounds muted and visa versa

        for (var key in this.sounds) {

            this.sounds[key].setMute(!this.sharedOptions.soundOn);
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

    update() {

        this.player.move();

      

        

    }

  

    onLose(reason){
        //console.log("onLose");
    
        this.dialogWindowManager.createWindow('lose', reason);
        this.pauseAllMovements();
     
    }

    onWin(){
        //console.log("onWin");

        if(
            (
            this.level >= sharedUtils.getTopOpenLevel() // we were playing the top open level
            || !sharedUtils.getTopOpenLevel() // or we have no top open level set
            ) 
            && (this.level < levelsConfig.length-1) // we weren't playing the last level in the game
        )
        {
            //console.log("Setting new topOpenLevel")
            sharedUtils.setTopOpenLevel(this.level+1)
        }

        this.dialogWindowManager.createWindow('win');
        this.pauseAllMovements();

        //this.matter.pause();
      
    }

    // startNextLevel(){
    //     this.scene.start("LevelSelectScene"); 
    // }

    

    restartScene(){
        
        this.deactivateGroups();

        this.scene.restart();
    }

    deactivateGroups(){
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

    createBackground(){
        this.add.image(0, 0, 'space').setAngle(90).setOrigin(0,1);
    }

    createPlayer() {
        return new Player(this, this.config.startPosition.x, this.config.startPosition.y);

    }

    createPauseButton(){
        this.pauseButton = this.add.image(this.config.width-50, 50, 'pause-icon').setOrigin(0.5).setScale(0.6);

        this.pauseButton
            .setDepth(2)
            .setInteractive({ cursor: 'pointer' })
            .on('pointerover', () => {this.pauseButton.setScale(0.7)})
            .on('pointerout', () => {this.pauseButton.setScale(0.6);})
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
        if(this.saucers) this.saucers.pauseEvents();
        if(this.asteroids) this.asteroids.pauseEvents();
        if(this.collectables) this.collectables.pauseEvents();
        this.player.pauseMoves();
        this.player.exhaust.emitter.setQuantity(0); // fix the bug of thrust running when scene stops
        this.player.exhaust.stopSound();
        this.matter.pause();
        if(this.levelTimer) this.levelTimer.levelTimer.paused = true;

    }

    resumeAllMovements(){
        this.saucers.resumeEvents();
        this.asteroids.resumeEvents();
        this.collectables.resumeEvents();
        this.player.resumeMoves();
        this.matter.resume();
        if(this.levelTimer) this.levelTimer.levelTimer.paused = false;
    }

    checkWin() {
        //console.log('Checking win');
        let win = false;

        switch (this.levelConfig.win.item) {
            case 'asteroid':

                if(this.asteroids.asteroidsHit >= this.levelConfig.win.qty) {
                    //console.log('Victory! Asteroids!');
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
        this.deactivateGroups();
       // console.log('nextLevel')
 

        if(this.level+1 >= levelsConfig.length){ // if we won last level
            //console.log('Final scene')
            this.scene.start("FinalScene");
            return;
        }
        this.scene.start("LevelSelectScene", {level: this.level+1, sharedOptions: this.sharedOptions});

    }

    exitScene(){
        this.deactivateGroups();
        this.scene.start("LevelSelectScene", {level: this.level, sharedOptions: this.sharedOptions});
        //this.scene.start("LevelSelectScene");

    }

    
} 