
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

const widthMultiplier =window.innerWidth*window.devicePixelRatio/1422;//some assets can be scaled separately for width and height (to be more presice but scewed)
const heightMultiplier =window.innerHeight*window.devicePixelRatio/800;

const scaleMultiplier = (widthMultiplier+heightMultiplier)/2; // most assets are scaled with this one to leave their shape the same

// const HEIGHT = 800 * scaleMultiplier;
// const WIDTH = 1422 * scaleMultiplier;
const HEIGHT = window.innerHeight * window.devicePixelRatio;
const WIDTH = window.innerWidth * window.devicePixelRatio; 
// const HEIGHT = window.innerHeight;
// const WIDTH = window.innerWidth;

const START_POSITION = {
  x: WIDTH/2,
  y: HEIGHT/2
} 

/*----------------------------------------------------------------

Высота должна быть иннерХайт * пикселРатио
Ширина должна быть иннерВидз * пикселРатио

Размеры объектов должны быть такими по отношению к 1422*800 как и были.

Ширина-мультиплаер: иннерВидз * пикселРатио/1422
Высота-мультиплаер: иннерХайт * пикселРатио/800

Средний мультиплаер = Ширина-мультиплаер/Высота-мультиплаер

*/


const target = document.getElementById("ast_game").getAttribute("target") || 'indicator'; // 'vk' or undefined or some other
const referer = document.getElementById("ast_game").getAttribute("referer"); // 'localhost or indicator.games' 
let lang = 'en'
//let lang = 'ru'


console.log('window.innerWidth', window.innerWidth);
console.log('window.innerHeight ',window.innerHeight);
console.log('window.devicePixelRatio', window.devicePixelRatio);




//console.log(target)


const SHARED_CONFIG = {
  width: WIDTH,
  height: HEIGHT,
  startPosition: START_POSITION,
  publicGameFolder: 'games/asteroid_hunters/',
  target: target,
  referer: referer,
  platform: '',
  lang: lang,
  scaleMultiplier: scaleMultiplier,
  widthMultiplier: widthMultiplier,
  heightMultiplier: heightMultiplier

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
