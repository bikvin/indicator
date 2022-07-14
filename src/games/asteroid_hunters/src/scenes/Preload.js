import Phaser from "phaser";
import LoadingBar from '../utils/LoadingBar'

/// images
import ship from './../../assets/images/ship.png'
import fire_particle from './../../assets/images/fire_particle.png'
import bullet_player from './../../assets/images/bullet_player.png'
import bullet_saucer from './../../assets/images/bullet_saucer.png'
import saucer_exhaust from './../../assets/images/saucer_exhaust.png'
import left_right_button from './../../assets/images/left_right_button.png'
import gas_button from './../../assets/images/gas_button.png'
import shoot_button from './../../assets/images/shoot_button.png'
import diamond from './../../assets/images/diamond.png'
import triple from './../../assets/images/triple.png'
import ammo from './../../assets/images/ammo.png'
import label from './../../assets/images/label.png'
import playIcon from './../../assets/images/play-icon.png'
import restartIcon from './../../assets/images/restart-icon.png'
import pauseIcon from './../../assets/images/pause-icon.png'
import backIcon from './../../assets/images/back-icon.png'
import forwardIcon from './../../assets/images/forward-icon.png'
import anglesIcon from './../../assets/images/angles-icon.png'
import title from './../../assets/images/title.png'
import earth from './../../assets/images/earth.png'
import lockIcon from './../../assets/images/lock-icon.png'
import endTitle from './../../assets/images/end-title.png'
import musicIcon from './../../assets/images/music-icon.png'
import nomusicIcon from './../../assets/images/nomusic-icon.png'
import soundIcon from './../../assets/images/sound-icon.png'
import nosoundIcon from './../../assets/images/nosound-icon.png'
import astCrunch from './../../assets/images/ast-crunch3.png'
import infoIcon from './../../assets/images/info-icon.png'

// matter_bodies
import shipBody from './../../assets/matter_bodies/ship.json'
import grayAsteroidsShapes from './../../assets/matter_bodies/g_asteroids.json'
import saucerBody from './../../assets/matter_bodies/saucer.json'

// atlas
import gray_asteroids_png from './../../assets/atlas/gray_asteroids.png'
import gray_asteroids_json from './../../assets/atlas/gray_asteroids.json'

import boom_png from './../../assets/atlas/boom.png'
import boom_json from './../../assets/atlas/boom.json'

import saucer_boom_png from './../../assets/atlas/saucer_boom.png'
import saucer_boom_json from './../../assets/atlas/saucer_boom.json'

import crush_ast_png from './../../assets/atlas/crush_ast.png'
import crush_ast_json from './../../assets/atlas/crush_ast.json'

import saucer_image_png from './../../assets/atlas/saucer.png'
import saucer_image_json from './../../assets/atlas/saucer.json'

// sounds

import thrustSound from './../../assets/sounds/thrusterFire.mp3'
import boomSound from './../../assets/sounds/boom.mp3'
import themeSound from './../../assets/sounds/ObservingTheStar.mp3'
import astCrushSound from './../../assets/sounds/Blink19.mp3'
import shootSound from './../../assets/sounds/footstep_concrete_003.mp3'
import saucerBoomSound from './../../assets/sounds/saucer_explode.mp3'
import collectSound from './../../assets/sounds/collect.mp3'
import noAmmoSound from './../../assets/sounds/no-ammo.mp3'
import astHit from './../../assets/sounds/ast-hit.mp3'


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
        //this.load.image('space', 'assets/images/space.png');
        this.load.image('ship', ship);
        this.load.image('fire_particle', fire_particle);
        this.load.image('bullet_player', bullet_player);
        this.load.image('bullet_saucer', bullet_saucer);
        this.load.image('saucer_exhaust', saucer_exhaust);
        this.load.image('left_right_button', left_right_button);
        //this.load.image('right_button', 'assets/images/right_button.png');
        this.load.image('gas_button', gas_button);
        this.load.image('shoot_button', shoot_button);
        this.load.image('diamond', diamond);
        this.load.image('triple', triple);
        this.load.image('ammo', ammo);
        this.load.image('label', label);
        this.load.image('play-icon', playIcon);
        this.load.image('restart-icon', restartIcon);
        this.load.image('pause-icon', pauseIcon);
        this.load.image('back-icon', backIcon);
        this.load.image('forward-icon', forwardIcon);
        this.load.image('angles-icon', anglesIcon);
        this.load.image('title', title);
        this.load.image('earth', earth);
        this.load.image('lock-icon', lockIcon);
        this.load.image('end-title', endTitle);
        this.load.image('music-icon', musicIcon);
        this.load.image('nomusic-icon', nomusicIcon);
        this.load.image('sound-icon', soundIcon);
        this.load.image('nosound-icon', nosoundIcon);
        this.load.image('ast-crunch', astCrunch);
        this.load.image('info-icon', infoIcon);
        
        // matter_bodies
        this.load.json('ship_body', shipBody);
        this.load.json('gray_asteroids_shapes', grayAsteroidsShapes);
        this.load.json('saucer_body', saucerBody);

        // atlas
        this.load.atlas('gray_asteroids', gray_asteroids_png, gray_asteroids_json);
        this.load.atlas('boom',boom_png,boom_json);
        this.load.atlas('saucer_boom',saucer_boom_png,saucer_boom_json);
        this.load.atlas('crush_ast', crush_ast_png, crush_ast_json);
        this.load.atlas('saucer_image', saucer_image_png, saucer_image_json);
       

        // sounds
        this.load.audio('thrust', thrustSound);
        this.load.audio('boom', boomSound);
        this.load.audio('theme', themeSound);
        this.load.audio('astCrush', astCrushSound);
        this.load.audio('shoot', shootSound);
        this.load.audio('saucer_boom', saucerBoomSound);
        this.load.audio('collect', collectSound);
        this.load.audio('no-ammo', noAmmoSound);
        this.load.audio('ast-hit', astHit);

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