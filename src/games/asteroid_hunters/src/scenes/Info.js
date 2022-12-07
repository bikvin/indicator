import Phaser from "phaser";
import sharedUtils from "../utils/sharedUtils";
import lang from "../lang/lang";

// const data = [
//     {
//         title: 'Indicator Games'
//     },
//     {
//         title: 'Created by:',
//         names: ['Ivan Kraev'],
//         contact: 'ivan.a.kraev@gmail.com'
//     },
//     {
//         title: 'Images by:',
//         names: ['Kenney', 'iimages', 'VectorShowStudi', 'WinWin_artlab', 'lilu330', 'In-Finity', 'ararat_art', 'klyaksun', 'vikivector', 'ezagatin']
//     },
//     {
//         title: 'Sounds by:',
//         names: ['Kenney', 'yd', ]
//     },
//     {
//         title: 'Inspired by original Asteroids by Atari and Asteroids game by Minimal'
//     },
//     {
//         title: 'Made with Phaser 3'
//     }
// ]

const data = lang.creditsData;

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

        sharedUtils.createBackground(this);
        this.createButton();
        this.createLabel();

    }
    
    

    createLabel(){

        //const youWon = this.add.text(this.config.width/2, this.config.height/2+100, 'You won!', { font: '60px Comfortaa' })
        //.setOrigin(0.5)



        data.forEach(datum => {
            if(datum.title){


                this.make.text({
                    x: this.config.width/2,
                    y: 100*this.config.scaleMultiplier + this.Yoffset,
                    text: datum.title[this.config.lang],
                    origin: { x: 0.5, y: 0 },
                    style: {
                        font: `${30 * this.config.scaleMultiplier}px Comfortaa`,
                        wordWrap: { width: this.config.width-100*this.config.scaleMultiplier, useAdvancedWrap: true }
                    }
                }) 
                
            }
            if(datum.names){


                this.make.text({
                    x: this.config.width/2,
                    y: 140*this.config.scaleMultiplier + this.Yoffset,
                    text: datum.names.join(', '),
                    origin: { x: 0.5, y: 0 },
                    style: {
                        font: `${25 * this.config.scaleMultiplier}px Comfortaa`,
                        wordWrap: { width: this.config.width-100*this.config.scaleMultiplier, useAdvancedWrap: true }
                    }
                }) 
            }
            if(datum.contact){


                this.make.text({
                    x: this.config.width/2,
                    y: 180*this.config.scaleMultiplier + this.Yoffset,
                    text: datum.contact,
                    origin: { x: 0.5, y: 0 },
                    style: {
                        font: `${20 * this.config.scaleMultiplier}px Comfortaa`,
                        wordWrap: { width: this.config.width-100*this.config.scaleMultiplier, useAdvancedWrap: true }
                    }
                }) 
            }
            this.Yoffset += 100*this.config.scaleMultiplier;
        })
    }



    createButton(){

        this.backButton = this.add.image(70*this.config.scaleMultiplier, 70*this.config.scaleMultiplier, 'back-icon').setOrigin(0.5,0.5).setDepth(1).setScale(0.8*this.config.scaleMultiplier)
        .on('pointerdown', () => {this.scene.start("StartScene", {sharedOptions: this.sharedOptions}); });
        sharedUtils.setButtonHover(this.backButton, 0.8*this.config.scaleMultiplier, 0.9*this.config.scaleMultiplier);
        
    }


    
} 