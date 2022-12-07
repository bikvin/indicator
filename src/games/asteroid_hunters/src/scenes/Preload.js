import Phaser from "phaser";
import LoadingBar from '../utils/LoadingBar';
import sharedUtils from "../utils/sharedUtils";



let sceneConfig = {
    key: 'PreloadScene',
    pack: {
        files: [{
            type: 'plugin',
            key: 'rexwebfontloaderplugin',
            url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexwebfontloaderplugin.min.js',
            start: true
        }]
    }
};

export default class PreloadScene extends Phaser.Scene {


    constructor(config) {
        super(sceneConfig);

        this.config = config;
        
        
    }

    preload() {

        //console.log('Preload Preload');

        sharedUtils.createBackground(this);
        this.loadingBar = new LoadingBar(this);
        this.preloadAssets();
    }



    preloadAssets(){
        // images

         
         this.load.image('ship', this.config.publicGameFolder + 'assets/images/ship.png');
         this.load.image('fire_particle', this.config.publicGameFolder + 'assets/images/fire_particle.png');
         this.load.image('bullet_player', this.config.publicGameFolder + 'assets/images/bullet_player.png');
         this.load.image('bullet_saucer', this.config.publicGameFolder + 'assets/images/bullet_saucer.png');
         this.load.image('saucer_exhaust', this.config.publicGameFolder + 'assets/images/saucer_exhaust.png');
         this.load.image('left_right_button', this.config.publicGameFolder + 'assets/images/left_right_button.png');
         //this.load.image('right_button', 'assets/images/right_button.png');
         this.load.image('gas_button', this.config.publicGameFolder + 'assets/images/gas_button.png');
         this.load.image('shoot_button', this.config.publicGameFolder + 'assets/images/shoot_button.png');
         this.load.image('diamond', this.config.publicGameFolder + 'assets/images/diamond.png');
         this.load.image('triple', this.config.publicGameFolder + 'assets/images/triple.png');
         this.load.image('ammo', this.config.publicGameFolder + 'assets/images/ammo.png');
         this.load.image('label', this.config.publicGameFolder + 'assets/images/label.png');
         this.load.image('play-icon', this.config.publicGameFolder + 'assets/images/play-icon.png');
         this.load.image('restart-icon', this.config.publicGameFolder + 'assets/images/restart-icon.png');
         this.load.image('pause-icon', this.config.publicGameFolder + 'assets/images/pause-icon.png');
         this.load.image('back-icon', this.config.publicGameFolder + 'assets/images/back-icon.png');
         this.load.image('forward-icon', this.config.publicGameFolder + 'assets/images/forward-icon.png');
         this.load.image('angles-icon', this.config.publicGameFolder + 'assets/images/angles-icon.png');
         this.load.image('title', this.config.publicGameFolder + 'assets/images/title.png');
         this.load.image('earth-ship', this.config.publicGameFolder + 'assets/images/earth-ship.png');
         this.load.image('lock-icon', this.config.publicGameFolder + 'assets/images/lock-icon.png');
         this.load.image('end-title', this.config.publicGameFolder + 'assets/images/end-title.png');
         this.load.image('music-icon', this.config.publicGameFolder + 'assets/images/music-icon.png');
         this.load.image('nomusic-icon', this.config.publicGameFolder + 'assets/images/nomusic-icon.png');
         this.load.image('sound-icon', this.config.publicGameFolder + 'assets/images/sound-icon.png');
         this.load.image('nosound-icon', this.config.publicGameFolder + 'assets/images/nosound-icon.png');
         this.load.image('ast-crunch', this.config.publicGameFolder + 'assets/images/ast-crunch3.png');
         this.load.image('info-icon', this.config.publicGameFolder + 'assets/images/info-icon.png');
         this.load.image('use-arrows-icon', this.config.publicGameFolder + 'assets/images/use-arrows.png');
        
        
        // matter_bodies
        // this.load.json('ship_body', shipBody);
        // this.load.json('gray_asteroids_shapes', grayAsteroidsShapes);
        // this.load.json('saucer_body', saucerBody);

        this.load.json('ship_body', this.config.publicGameFolder + 'assets/matter_bodies/ship.json');
        this.load.json('gray_asteroids_shapes', this.config.publicGameFolder + 'assets/matter_bodies/g_asteroids.json');
        this.load.json('saucer_body', this.config.publicGameFolder + 'assets/matter_bodies/saucer.json');

        // atlas
        // this.load.atlas('gray_asteroids', gray_asteroids_png, gray_asteroids_json);
        // this.load.atlas('boom',boom_png,boom_json);
        // this.load.atlas('saucer_boom',saucer_boom_png,saucer_boom_json);
        // this.load.atlas('crush_ast', crush_ast_png, crush_ast_json);
        // this.load.atlas('saucer_image', saucer_image_png, saucer_image_json);

        this.load.atlas('gray_asteroids', this.config.publicGameFolder + 'assets/atlas/gray_asteroids.png', this.config.publicGameFolder + 'assets/atlas/gray_asteroids.json');
        this.load.atlas('boom',this.config.publicGameFolder + 'assets/atlas/boom.png',this.config.publicGameFolder + 'assets/atlas/boom.json');
        this.load.atlas('saucer_boom',this.config.publicGameFolder + 'assets/atlas/saucer_boom.png',this.config.publicGameFolder + 'assets/atlas/saucer_boom.json');
        this.load.atlas('crush_ast', this.config.publicGameFolder + 'assets/atlas/crush_ast.png', this.config.publicGameFolder + 'assets/atlas/crush_ast.json');
        this.load.atlas('saucer_image', this.config.publicGameFolder + 'assets/atlas/saucer.png', this.config.publicGameFolder + 'assets/atlas/saucer.json');
       

        // sounds
        // this.load.audio('thrust', thrustSound);
        // this.load.audio('boom', boomSound);
        // this.load.audio('theme', themeSound);
        // this.load.audio('astCrush', astCrushSound);
        // this.load.audio('shoot', shootSound);
        // this.load.audio('saucer_boom', saucerBoomSound);
        // this.load.audio('collect', collectSound);
        // this.load.audio('no-ammo', noAmmoSound);
        // this.load.audio('ast-hit', astHit);

        this.load.audio('thrust', this.config.publicGameFolder + 'assets/sounds/thrusterFire.mp3');
        this.load.audio('boom', this.config.publicGameFolder + 'assets/sounds/boom.mp3');
        this.load.audio('theme', this.config.publicGameFolder + 'assets/sounds/ObservingTheStar.mp3');
        this.load.audio('astCrush', this.config.publicGameFolder + 'assets/sounds/Blink19.mp3');
        this.load.audio('shoot', this.config.publicGameFolder + 'assets/sounds/footstep_concrete_003.mp3');
        this.load.audio('saucer_boom', this.config.publicGameFolder + 'assets/sounds/saucer_explode.mp3');
        this.load.audio('collect', this.config.publicGameFolder + 'assets/sounds/collect.mp3');
        this.load.audio('no-ammo', this.config.publicGameFolder + 'assets/sounds/no-ammo.mp3');
        this.load.audio('ast-hit', this.config.publicGameFolder + 'assets/sounds/ast-hit.mp3');

        this.plugins.get('rexwebfontloaderplugin').addToScene(this);

        var config = {
            google: {
                families: ['Pattaya', 'Comfortaa']
            }
        };
        this.load.rexWebFont(config);
    }

    create() {
        console.log('Preload Create');

        this.scene.start("SetupScene");
     



    }

    
} 