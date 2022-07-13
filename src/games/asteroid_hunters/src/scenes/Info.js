import Phaser from "phaser";
import sharedUtils from "../utils/sharedUtils"

const data = [
    {
        title: 'Indicator Games'
    },
    {
        title: 'Created by:',
        names: ['Ivan Kraev'],
        contact: 'ivan.a.kraev@gmail.com'
    },
    {
        title: 'Images by:',
        names: ['Kenney', 'iimages', 'VectorShowStudi', 'WinWin_artlab', 'lilu330', 'In-Finity', 'ararat_art', 'klyaksun', 'vikivector', 'ezagatin']
    },
    {
        title: 'Sounds by:',
        names: ['Kenney', 'yd', ]
    },
    {
        title: 'Inspired by original Asteroids by Atari and Asteroids game by Minimal'
    },
    {
        title: 'Made with Phaser 3'
    }
]

export default class InfoScene extends Phaser.Scene {
    constructor(config) {
        super("InfoScene");
  
       this.config = config;
        
   
        
    }

    preload() {




    }

    init(){
   
        this.Yoffset = 0;
    }

    create() {

        this.createBackground();
        this.createButton();
        this.createLabel();

    }
    
    createBackground(){
        this.add.image(0, 0, 'space').setAngle(90).setOrigin(0,1);
    }

    createLabel(){

        //const youWon = this.add.text(this.config.width/2, this.config.height/2+100, 'You won!', { font: '60px Comfortaa' })
        //.setOrigin(0.5)



        data.forEach(datum => {
            if(datum.title){
                this.add.text(this.config.width/2, 100 + this.Yoffset, datum.title, { font: '30px Comfortaa' })
                .setOrigin(0.5)
            }
            if(datum.names){
                this.add.text(this.config.width/2, 140 + this.Yoffset, datum.names.join(', '), { font: '25px Comfortaa' })
                .setOrigin(0.5)
            }
            if(datum.contact){
                this.add.text(this.config.width/2, 180 + this.Yoffset, datum.contact, { font: '20px Comfortaa' })
                .setOrigin(0.5)
            }
            this.Yoffset += 130
        })
    }



    createButton(){

        this.backButton = this.add.image(70, 70, 'back-icon').setOrigin(0.5,0.5).setDepth(1).setScale(0.8)
        .on('pointerdown', () => {this.scene.start("StartScene", {sharedOptions: this.sharedOptions}); });
        sharedUtils.setButtonHover(this.backButton, 0.8, 0.9);
        
    }


    
} 