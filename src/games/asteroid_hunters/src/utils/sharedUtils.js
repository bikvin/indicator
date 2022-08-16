
const AstVkLevel = require('../models/AstVkLevel')

export default class SharedUtils{

    
    static async getTopOpenLevel(target){

        let topOpenLevel
        if(target === 'vk'){
            topOpenLevel = 13;

            try{
                const astVkLevel = await AstVkLevel.create({vkUserId:1111, topOpenLevel: topOpenLevel })
                //res.status(201).json({room: room._id})
            }
            catch (err){
                //res.status(400).send({ err })
                console.error(err);
            }

        }else{
            topOpenLevel = parseInt(localStorage.getItem('topOpenLevel')) || 0;

        }
        


        return topOpenLevel;
    }

    /// sets topOpenLevel to localstorage
    static setTopOpenLevel(level){
        localStorage.setItem('topOpenLevel',level);
    }

    // sets button getting large and small when hovered and some other stuff
    static setButtonHover(button, defaultScale = 1, hoverScale = 1.1){
        button
        .setInteractive({ cursor: 'pointer' })
        .on('pointerover', () => {button.setScale( hoverScale);})
        .on('pointerout', () => button.setScale( defaultScale ))
        .on('pointerdown', () => {button.setScale( defaultScale );})
    }
}
