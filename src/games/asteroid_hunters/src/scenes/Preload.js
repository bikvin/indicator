import Phaser from "phaser";
import LoadingBar from '../utils/LoadingBar'

/// images
// import ship from './../../assets/images/ship.png'
// import fire_particle from './../../assets/images/fire_particle.png'
// import bullet_player from './../../assets/images/bullet_player.png'
// import bullet_saucer from './../../assets/images/bullet_saucer.png'
// import saucer_exhaust from './../../assets/images/saucer_exhaust.png'
// import left_right_button from './../../assets/images/left_right_button.png'
// import gas_button from './../../assets/images/gas_button.png'
// import shoot_button from './../../assets/images/shoot_button.png'
// import diamond from './../../assets/images/diamond.png'
// import triple from './../../assets/images/triple.png'
// import ammo from './../../assets/images/ammo.png'
// import label from './../../assets/images/label.png'
// import playIcon from './../../assets/images/play-icon.png'
// import restartIcon from './../../assets/images/restart-icon.png'
// import pauseIcon from './../../assets/images/pause-icon.png'
// import backIcon from './../../assets/images/back-icon.png'
// import forwardIcon from './../../assets/images/forward-icon.png'
// import anglesIcon from './../../assets/images/angles-icon.png'
// import title from './../../assets/images/title.png'
// import earth from './../../assets/images/earth.png'
// import lockIcon from './../../assets/images/lock-icon.png'
// import endTitle from './../../assets/images/end-title.png'
// import musicIcon from './../../assets/images/music-icon.png'
// import nomusicIcon from './../../assets/images/nomusic-icon.png'
// import soundIcon from './../../assets/images/sound-icon.png'
// import nosoundIcon from './../../assets/images/nosound-icon.png'
// import astCrunch from './../../assets/images/ast-crunch3.png'
// import infoIcon from './../../assets/images/info-icon.png'
// import useArrowsIcon from './../../assets/images/use-arrows.png'

// matter_bodies
// import shipBody from './../../assets/matter_bodies/ship.json'
// import grayAsteroidsShapes from './../../assets/matter_bodies/g_asteroids.json'
// import saucerBody from './../../assets/matter_bodies/saucer.json'

// atlas
// import gray_asteroids_png from './../../assets/atlas/gray_asteroids.png'
// import gray_asteroids_json from './../../assets/atlas/gray_asteroids.json'

// import boom_png from './../../assets/atlas/boom.png'
// import boom_json from './../../assets/atlas/boom.json'

// import saucer_boom_png from './../../assets/atlas/saucer_boom.png'
// import saucer_boom_json from './../../assets/atlas/saucer_boom.json'

// import crush_ast_png from './../../assets/atlas/crush_ast.png'
// import crush_ast_json from './../../assets/atlas/crush_ast.json'

// import saucer_image_png from './../../assets/atlas/saucer.png'
// import saucer_image_json from './../../assets/atlas/saucer.json'

// sounds

// import thrustSound from './../../assets/sounds/thrusterFire.mp3'
// import boomSound from './../../assets/sounds/boom.mp3'
// import themeSound from './../../assets/sounds/ObservingTheStar.mp3'
// import astCrushSound from './../../assets/sounds/Blink19.mp3'
// import shootSound from './../../assets/sounds/footstep_concrete_003.mp3'
// import saucerBoomSound from './../../assets/sounds/saucer_explode.mp3'
// import collectSound from './../../assets/sounds/collect.mp3'
// import noAmmoSound from './../../assets/sounds/no-ammo.mp3'
// import astHit from './../../assets/sounds/ast-hit.mp3'


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
        this.createBackground();
        this.loadingBar = new LoadingBar(this);
        this.preloadAssets();
    }

    createBackground(){
        this.add.image(0, 0, 'space').setAngle(90).setOrigin(0,1);
    }

    preloadAssets(){
        // images
        // //this.load.image('space', 'assets/images/space.png');
        // this.load.image('ship', ship);
        // this.load.image('fire_particle', fire_particle);
        // this.load.image('bullet_player', bullet_player);
        // this.load.image('bullet_saucer', bullet_saucer);
        // this.load.image('saucer_exhaust', saucer_exhaust);
        // this.load.image('left_right_button', left_right_button);
        // //this.load.image('right_button', 'assets/images/right_button.png');
        // this.load.image('gas_button', gas_button);
        // this.load.image('shoot_button', shoot_button);
        // this.load.image('diamond', diamond);
        // this.load.image('triple', triple);
        // this.load.image('ammo', ammo);
        // this.load.image('label', label);
        // this.load.image('play-icon', playIcon);
        // this.load.image('restart-icon', restartIcon);
        // this.load.image('pause-icon', pauseIcon);
        // this.load.image('back-icon', backIcon);
        // this.load.image('forward-icon', forwardIcon);
        // this.load.image('angles-icon', anglesIcon);
        // this.load.image('title', title);
        // this.load.image('earth', earth);
        // this.load.image('lock-icon', lockIcon);
        // this.load.image('end-title', endTitle);
        // this.load.image('music-icon', musicIcon);
        // this.load.image('nomusic-icon', nomusicIcon);
        // this.load.image('sound-icon', soundIcon);
        // this.load.image('nosound-icon', nosoundIcon);
        // this.load.image('ast-crunch', astCrunch);
        // this.load.image('info-icon', infoIcon);
        // this.load.image('use-arrows-icon', useArrowsIcon);


         //this.load.image('space', 'assets/images/space.png');

         
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
         this.load.image('earth', this.config.publicGameFolder + 'assets/images/earth.png');
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
        //console.log('Preload Create');

        this.scene.start("StartScene");


    }

    
} 