import Phaser from "phaser";

import sea from '../../sprites/sea.png';


export default class BootScene extends Phaser.Scene {
    constructor() {
        super("Boot");
        
    }

    preload() {

        this.load.image('sea', sea);
    }

    create() {
        
        this.scene.start("Preload", { seaPaddingTop: 50 });
    }

    
} 