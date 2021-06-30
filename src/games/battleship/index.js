import Phaser from "phaser";
import BootScene from './scripts/scenes/BootScene';
import GameScene from "./scripts/scenes/GameScene";
import PreloadScene from './scripts/scenes/PreloadScene';

let config = {
    type: Phaser.AUTO,
    width: 1900,
    height: 1600,
    scene: [BootScene, PreloadScene, GameScene],
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

console.log('test')