import Phaser from "phaser";

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
        
       this.Yoffset = 0;
        
    }

    preload() {




    }

    create() {
        this.createBackground();
        //this.createButton();
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
                this.add.text(this.config.width/2, 130 + this.Yoffset, datum.names.join(', '), { font: '25px Comfortaa' })
                .setOrigin(0.5)
            }
            this.Yoffset += 150
        })
    }



    createButton(){

        const button = this.add.text(this.config.width/2, 700, 'Start Again', { font: '40px Comfortaa' })
        .setOrigin(0.5)
        .setInteractive({ cursor: 'pointer' })
        .on('pointerover', () => {button.setScale( 1.1 );})
        .on('pointerout', () => button.setScale( 1 ))
        .on('pointerdown', () => {button.setScale( 1 ); this.scene.start("StartScene"); })
        
    }


    
} 