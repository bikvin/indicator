
import Phaser, { Scene } from "phaser";
import StartScene from './src/scenes/Start';
import PlayScene from './src/scenes/Play';
import PreloadScene from './src/scenes/Preload';
import LevelSelectScene from './src/scenes/LevelSelect';
import FinalScene from './src/scenes/Final';
import BootScene from './src/scenes/Boot';
import InfoScene from './src/scenes/Info';
import SetupScene from './src/scenes/Setup';
//import VkBridgeLib from '@vkontakte/vk-bridge';

const HEIGHT = 800;
const WIDTH = 1422;
const START_POSITION = {
  x: WIDTH/2,
  y: HEIGHT/2
} 

const target = document.getElementById("ast_game").getAttribute("target") || 'indicator'; // 'vk' or undefined or some other
const referer = document.getElementById("ast_game").getAttribute("referer"); // 'localhost or indicator.games' 
let lang = 'en'

// let vkBridge = undefined;
// if(target === 'vk'){
//   lang = 'ru',
//   vkBridge = VkBridgeLib
// }



//console.log(target)


const SHARED_CONFIG = {
  width: WIDTH,
  height: HEIGHT,
  startPosition: START_POSITION,
  publicGameFolder: 'games/asteroid_hunters/',
  target: target,
  referer: referer,
  lang: lang,

};

const Scenes = [BootScene, PreloadScene, StartScene, InfoScene, LevelSelectScene, PlayScene, FinalScene, SetupScene];

const createScene = Scene => new Scene(SHARED_CONFIG);
const initScenes = () => Scenes.map(createScene);

const config = {
  type: Phaser.AUTO,
  ...SHARED_CONFIG,
  physics: {
    default: 'matter',
    matter: {
      //debug: true,
      debug: false,
      gravity: {x: 0, y: 0}
    },
    //enableSleeping: true
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  
  scene: initScenes()

}


new Phaser.Game(config);
