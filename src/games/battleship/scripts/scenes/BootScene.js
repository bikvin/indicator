import Phaser from "phaser";

import sea from '../../sprites/sea.png';


export default class BootScene extends Phaser.Scene {
    constructor() {
        super("Boot");
        
    }

    preload() {
        //console.log('boot scene')
        //this.load.image('bg', bgPng);
        //this.load.image('bg', 'assets/sprites/background.png');
        this.load.image('sea', sea);
    }

    create() {
        
        this.scene.start("Preload", { seaPaddingTop: 431 });
    }

    
} 