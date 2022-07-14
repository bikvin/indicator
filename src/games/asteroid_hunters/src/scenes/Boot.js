import Phaser from "phaser";
import space from './../../assets/images/space.png'
//import lb_example from './../../assets/images/lb-example.png'

export default class BootScene extends Phaser.Scene {
    constructor() {
        super('Boot');
       
    }
    preload() {
       console.log('Boot preload')
        this.load.image('space', space);
        //this.load.image('lb-example', lb_example);
    }
    create() {
        this.scene.start('PreloadScene');
    }
}