
//const AstVkLevel = require('../models/AstVkLevel')


export default class SharedUtils{



    // sets button getting large and small when hovered and some other stuff
    static setButtonHover(button, defaultScale = 1, hoverScale = 1.1){
        button
        .setInteractive({ cursor: 'pointer' })
        .on('pointerover', () => {button.setScale( hoverScale);})
        .on('pointerout', () => button.setScale( defaultScale ))
        .on('pointerdown', () => {button.setScale( defaultScale );})
    }

    static createBackground(scene){
        scene.add.image(0, 0, 'space').setAngle(90).setOrigin(0,1).setDisplaySize(window.innerHeight* window.devicePixelRatio,window.innerWidth* window.devicePixelRatio);
    }

    static createInstructions(scene, lang){

        const delayTime = 4000;
        const dissapearTime = 3000;

        const instImage = scene.add.image(450*scene.config.scaleMultiplier, 600*scene.config.scaleMultiplier, 'use-arrows-icon').setOrigin(0.5).setScale(0.7*scene.config.scaleMultiplier);
        const instText = scene.add.text(600*scene.config.scaleMultiplier, 600*scene.config.scaleMultiplier,  lang.instructions[scene.config.lang], { font: '25px Comfortaa' }).setOrigin(0, 0.5).setScale(scene.config.scaleMultiplier);

        scene.tweens.add({
            targets: [instText, instImage],
            alpha: 0,
            duration: dissapearTime,
            ease: 'Power2',
            delay: delayTime
          }, this);
    }




}
