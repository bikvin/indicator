

export default class SharedUtils{

    
    static getTopOpenLevel(){
        
        const topOpenLevel = parseInt(localStorage.getItem('topOpenLevel')) || 0;


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
