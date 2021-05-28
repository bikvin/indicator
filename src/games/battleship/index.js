import Phaser from "phaser";
import BootScene from './scripts/scenes/BootScene';
import PreloadScene from './scripts/scenes/PreloadScene';

let config = {
    type: Phaser.AUTO,
    width: 1902,
    height: 1000,
    scene: [BootScene, PreloadScene],
    physics: {
        default: 'arcade',
        arcade: {
            debug: false 
        }
    },
    scale: {
        mode: Phaser.Scale.FIT,
        
    },
    parent: 'phaser-game',
    canvasStyle: '',

    
};

let game = new Phaser.Game(config);

console.log('test')