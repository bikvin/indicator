import Phaser from "phaser";
import BootScene from './scripts/scenes/BootScene';
import SetupScene from "./scripts/scenes/SetupScene";
import PreloadScene from './scripts/scenes/PreloadScene';

let config = {
    type: Phaser.AUTO,
    width: 801,
    height: 1424,
    scene: [BootScene, PreloadScene, SetupScene],
    physics: {
        default: 'arcade',
        arcade: {
            debug: false 
        }
    },
    backgroundColor: '#3CB7E5',
    scale: {
        mode: Phaser.Scale.FIT,
        
    },
    parent: 'phaser-game',
    canvasStyle: '',

    
};



let game = new Phaser.Game(config);

//console.log('test')