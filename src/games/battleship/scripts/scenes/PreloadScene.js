import Phaser from "phaser";


export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super("Preload");
    }

    preload(){
       this.add.sprite(0, 0, 'bg').setOrigin(0, 0);

        console.log('preload scene')
    }



    create() {
      
      
    }

    
} 