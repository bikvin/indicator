import lang from "../lang/lang"

export default class DialogWindowManager {
    constructor(scene, levelsConfig) {

        this.scene = scene;

        this.levelsConfig = levelsConfig;

      

        this.init(); 
    }

    init(){
        this.overlayOptions = {};

    }

    createWindow(type, reason = ''){

        console.log('createWindow', 'type=', type, 'reason=', reason);

        this.type = type;
        this.reason = reason;

 

        this.levelConfig = this.levelsConfig[this.scene.level];

        this.setWindowData(type);

       

        this.createOverlay(this.overlayOptions.scale);
        this.createButtons(this.buttons, this.overlayOptions);
        this.createText(this.text);
    }

    setWindowData(type){


        switch(type){
            case 'pause':
                
                this.text = {
                    //header: 'pause',
                    header: lang.pause[this.scene.config.lang],
                    headerY: this.scene.config.height/2-60, 
                } 
                this.buttons = [
                    {
                        icon: 'back-icon',
                        iconScale: 0.7,
                        callback: () => {this.scene.exitScene();}
                    },
                    {
                        icon: 'play-icon',
                        iconScale: 0.7,
                        callback: () => {this.scene.unpauseGame()}
                    },                           
                    
                ];
                break;
            case 'win':
                
                this.text = {
                    //header: 'Mission accomplished !',
                    header: lang.missionAccomplished[this.scene.config.lang],
                    headerY: this.scene.config.height/2-60,
                }
                this.buttons = [
                    {                      
                        icon: 'forward-icon',
                        iconScale: 0.7,
                        callback: () => {this.scene.nextLevel();}
                        
                    }
                ]
                
                break;
            case 'lose':
           
                this.text = {
                    //header: 'Mission failed !',
                    header: lang.missionFailed[this.scene.config.lang],
                    headerY: this.scene.config.height/2-80,
                    reason: this.reason,
                    reasonY: this.scene.config.height/2-40,
                }
                this.buttons = [
                    {
                        icon: 'back-icon',
                        iconScale: 0.7,
                        callback: () => {this.scene.exitScene();}
                    },
                    {
                        icon: 'restart-icon',
                        iconScale: 0.7,
                        callback: () => {this.scene.restartScene()}
                    }, 
                    
                ]
                this.overlayOptions = {
                    scale: 1.2,

               
                }
                break;
            case 'levelSelect':

                //console.log('this.scene.level', this.scene.level);
                //console.log('this.scene.config.lang ',this.scene.config.lang)

                //console.log('lang.levelTexts[this.scene.level].prompt[this.scene.config.lang]', lang.levelTexts[this.scene.level].prompt[this.scene.config.lang])
                this.text = {
                    header: `${lang.level[this.scene.config.lang]} ${this.scene.level+1}`,
                    headerY: this.scene.config.height/2-110,
                    //prompt: this.levelConfig.prompt,
                    prompt: lang.levelTexts[this.scene.level].prompt[this.scene.config.lang],
                    promptY: this.scene.config.height/2-70,
                    //target: this.levelConfig.targetText,
                    target: lang.levelTexts[this.scene.level].targetText[this.scene.config.lang],
                    targetY: this.scene.config.height/2+120,
                }
                this.buttons = [
                    {
                        icon: 'back-icon',
                        iconScale: 0.7,
                        callback: () => {this.scene.exitScene()}
                    },
                    {
                        icon: this.scene.level <= this.scene.topOpenLevel ? 'play-icon' : 'lock-icon',
                        locked: this.scene.level <= this.scene.topOpenLevel ? false : true,
                        iconScale: 0.7,
                        callback: () => {this.scene.startGame()}
                    },                          
                    
                ];
                
                this.overlayOptions = {
                    scale: 1.5,
                    arrows: true,
                    arrowScale: 0.6
                }
                break;
                
        }
    }

    removeWindow(){
        this.overlay.destroy();
        this.destroyIcons();
        this.header.destroy();
    }

    destroyIcons(){
        this.icons.forEach((icon) => {icon.destroy();});
    }

    

    createOverlay(scale = 1){


        this.overlay = this.scene.add.image(this.scene.config.width/2, this.scene.config.height/2, 'label').setOrigin(0.5).setAlpha(0.9).setScale(scale);

        this.overlay.setDepth(2)
    }

    createButtons(buttons, overlayOptions = {}){

  

        const iconDistance = 30;
        const iconWidthAverage = 70;
        this.icons = [];


        let xPos = this.scene.config.width/2 - (iconWidthAverage/2+iconDistance/2)*(buttons.length-1);

        
        buttons.forEach((button) => {

            
           // console.log('number of buttons', buttons.length);


            const icon = this.scene.add.image(xPos, this.scene.config.height/2 + 30, button.icon).setOrigin(0.5).setScale(button.iconScale).setDepth(2);

            if(!button.locked){
                this.setButtonFeatures(icon, button.iconScale, button.callback);
            }
            

            xPos += iconWidthAverage+iconDistance;
            this.icons.push( icon );

        }, this)


        if(overlayOptions.arrows){
            //console.log('arrows here')
            const rightXPos = this.scene.config.width/2 + this.overlay.width/2 * overlayOptions.scale - 50;
            const leftXPos = this.scene.config.width/2 - this.overlay.width/2 * overlayOptions.scale+50;

            const rightArrow = this.scene.add.image(rightXPos, this.scene.config.height/2, 'angles-icon').setOrigin(1, 0.5).setScale(overlayOptions.arrowScale).setAlpha(0.7).setDepth(2);
            const leftArrow = this.scene.add.image(leftXPos, this.scene.config.height/2, 'angles-icon').setOrigin(1, 0.5).setScale(overlayOptions.arrowScale).setAlpha(0.7).setAngle(180).setDepth(2);

            this.setButtonFeatures(rightArrow, overlayOptions.arrowScale, () => {this.nextLevel()});
            this.setButtonFeatures(leftArrow, overlayOptions.arrowScale, () => {this.prevLevel()});
        }
    }

    setButtonFeatures(button, scale, callback){
        button       
        .setInteractive({ cursor: 'pointer' })
        .on('pointerover', () => {button.setScale( scale*1.1 );})
        .on('pointerout', () => {button.setScale( scale );})
        .on('pointerdown', callback )
    }

   

    createText(text){
        //console.log('headerText', headerText)


        this.header = this.scene.add.text(this.scene.config.width/2, text.headerY, text.header, { font: '30px Comfortaa' }).setDepth(2).setOrigin(0.5);

        if(text.prompt) {
            this.prompt = this.scene.add.text(this.scene.config.width/2, text.promptY, text.prompt, { font: '40px Comfortaa' }).setDepth(2).setOrigin(0.5);
        }

        if(text.target) {
            this.target = this.scene.add.text(this.scene.config.width/2, text.targetY, text.target, { font: '30px Comfortaa' }).setDepth(2).setOrigin(0.5);
        }

        if(text.reason) {
            this.reason = this.scene.add.text(this.scene.config.width/2, text.reasonY, text.reason, { font: '25px Comfortaa' }).setDepth(2).setOrigin(0.5);
        }
    }

    updateLevelText(){
        this.header.text = `${lang.level[this.scene.config.lang]} ${this.scene.level+1}`;
        if(this.prompt) {
            //this.prompt.text = this.levelConfig.prompt;
            this.prompt.text = lang.levelTexts[this.scene.level].prompt[this.scene.config.lang]
        }
        if(this.target) {
            //this.target.text = this.levelConfig.targetText;
            this.target.text = lang.levelTexts[this.scene.level].targetText[this.scene.config.lang]
        }
  

    }

    updateIcons(){
        this.destroyIcons();
        this.levelConfig = this.levelsConfig[this.scene.level];
        this.setWindowData(this.type);
        this.createButtons(this.buttons, this.overlayOptions);

    }

    nextLevel(){

        if(this.levelsConfig.length - 1 > this.scene.level) {
            this.scene.level++;
            this.levelConfig = this.levelsConfig[this.scene.level]; 
            this.updateLevelText();
            this.updateIcons();
        }
       

    }

    prevLevel(){
        if(this.scene.level > 0) {
            this.scene.level--;
            this.levelConfig = this.levelsConfig[this.scene.level]; 
            this.updateLevelText();
            this.updateIcons();
        }
       

    }

    

    
}