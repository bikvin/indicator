import Phaser from "phaser";
import bgPng from '../../sprites/gameboard.png';


export default class BootScene extends Phaser.Scene {
    constructor() {
        super("Boot");
        
    }

    preload() {
        console.log('boot scene')
        this.load.image('bg', bgPng);
        //this.load.image('bg', 'assets/sprites/background.png');
    }

    create() {
        
        this.scene.start("Preload");
    }

    
} 