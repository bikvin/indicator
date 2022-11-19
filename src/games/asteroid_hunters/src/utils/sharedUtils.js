
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


}
