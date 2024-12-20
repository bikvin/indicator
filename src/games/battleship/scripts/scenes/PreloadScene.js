import Phaser from "phaser";
import ship4 from '../../sprites/ship4.png';
import ship3_1 from '../../sprites/ship3_1.png';
import ship3_2 from '../../sprites/ship3_2.png';
import ship2 from '../../sprites/ship2.png';
import ship1 from '../../sprites/ship1.png';
import arrow from '../../sprites/arrow.png';

let sceneConfig = {
    key: 'Preload',
    pack: {
        files: [{
            type: 'plugin',
            key: 'rexwebfontloaderplugin',
            url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexwebfontloaderplugin.min.js',
            start: true
        }]
    }
};

export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super(sceneConfig);
        
    }

    init(data){
        this.seaPaddingTop = data.seaPaddingTop
    }

    preload(){

        this.plugins.get('rexwebfontloaderplugin').addToScene(this);

        var config = {
            google: {
                families: ['Pattaya', 'Comfortaa']
            }
        };
        this.load.rexWebFont(config);

       this.add.sprite(0, this.seaPaddingTop, 'sea').setOrigin(0, 0);
       this.add.sprite(1900, this.seaPaddingTop, 'sea').setOrigin(1, 0);

       this.load.image('ship4', ship4);
       this.load.image('ship3_1', ship3_1);
       this.load.image('ship3_2', ship3_2);
       this.load.image('ship2', ship2);
       this.load.image('ship1', ship1);
       this.load.image('arrow', arrow);

       
    }



    create() {


        this.scene.start("Setup", { seaPaddingTop: this.seaPaddingTop });
      
    }

    
} 