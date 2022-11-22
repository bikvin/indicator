import Phaser from "phaser";
//import space from './../../assets/images/space.png'
//import lb_example from './../../assets/images/lb-example.png'

export default class BootScene extends Phaser.Scene {
    constructor(config) {
        super('Boot');
        this.config = config;
    }
    preload() {
       console.log('Boot preload')
       //const publicGameFolder = 'games/asteroid_hunters/'
        this.load.image('space', this.config.publicGameFolder + 'assets/images/space.png');
        //this.load.image('lb-example', lb_example);
    }
    create() {
        this.scene.start('PreloadScene');
    }
}