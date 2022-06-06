//#region [ rgba(0,205,30, 0.2)]
//#endregion

import Phaser from "phaser";
import AttentionSprite from './AttentionSprite'


export default class SetupSceneGraphics {

    constructor(scene, data) {
        this.scene = scene

        this.init(data)
    }

    init(data){

        this.seaPaddingTop = data.seaPaddingTop

        this.seaScaleFactor = 0.85

        this.pngFileWidth = 758
        this.pngFileHeight = 758

        this.marginBetweenSeas = 15
        this.shipSetupTopMargin = 70
        this.betweenShipYDist = 90

        this.cellSize = 69 * this.seaScaleFactor
        
        this.leftTopX = scene.cameras.main.centerX - (this.pngFileWidth /2 - 56) * this.seaScaleFactor

        this.leftTopY = 48* this.seaScaleFactor + this.seaPaddingTop


        this.seaWidth = this.pngFileWidth*this.seaScaleFactor
        this.seaHeight = this.pngFileHeight*this.seaScaleFactor
    }

    setShipStartPositions(){

        const centerWidth = this.scene.game.config.width/2
        const topShipY = this.seaPaddingTop + this.seaHeight + this.cellSize/2 + this.shipSetupTopMargin
        const firstRowCenterX = centerWidth/4*3 - 10
        const secondRowCenterX = centerWidth/4*5 + 10


        this.shipStartPositions = [
            {id: 1, length: 4, x:firstRowCenterX+110, y: topShipY, sprite: 'ship4', originX: 0.87, originY: 0.5},

            {id: 2, length: 3, x:firstRowCenterX+60, y: topShipY + this.betweenShipYDist, sprite: 'ship3_1', originX: 0.83, originY: 0.5},
            {id: 3, length: 3, x:firstRowCenterX+60, y: topShipY + this.betweenShipYDist*2, sprite: 'ship3_2', originX: 0.83, originY: 0.5},
            
            {id: 4, length: 2, x:secondRowCenterX+40, y: topShipY, sprite: 'ship2', originX: 0.75, originY: 0.5},
            {id: 5, length: 2, x:secondRowCenterX+40, y: topShipY + this.betweenShipYDist, sprite: 'ship2', originX: 0.75, originY: 0.5},
            {id: 6, length: 2, x:secondRowCenterX+40, y: topShipY + this.betweenShipYDist*2, sprite: 'ship2', originX: 0.75, originY: 0.5},

            {id: 7, length: 1, x:firstRowCenterX - 50, y: topShipY + this.betweenShipYDist*3- 20, sprite: 'ship1', originX: 0.5, originY: 0.5},
            {id: 8, length: 1, x:firstRowCenterX+50, y: topShipY + this.betweenShipYDist*3- 20, sprite: 'ship1', originX: 0.5, originY: 0.5},
            {id: 9, length: 1, x:secondRowCenterX-50, y: topShipY + this.betweenShipYDist*3 - 20, sprite: 'ship1', originX: 0.5, originY: 0.5},
            {id: 10, length: 1, x:secondRowCenterX+50, y: topShipY + this.betweenShipYDist*3 - 20, sprite: 'ship1', originX: 0.5, originY: 0.5},
        ]
    }

    setShipsFromServer(matrixFromServer, gameMatrix, ships){
        console.log('setShipsFromServer')


        console.log("matrixFromServer", matrixFromServer)

        for(let row=0; row < 10; row++){
            for(let col=0; col < 10; col++){
                //console.log(matrix[row][col])
                if(matrixFromServer[row][col] != null){
                    const ship = ships.find(ship => ship.id == matrixFromServer[row][col].id)
                    ship.x = matrixFromServer[row][col].x,
                    ship.y = matrixFromServer[row][col].y,
                    ship.angle = matrixFromServer[row][col].angle
                    ship.disableDrag()

                    gameMatrix.matrix[row][col].ship= ship;
                    //console.log(ship)
                }
            }
        }
        // ships.forEach(ship => {
        //     ship.disableDrag()
        // })

        //this.setReady()
 
    }


    static setLabels(scene){

        console.log(scene)

        scene.buttonTextStyle = { 
            fontFamily: 'Pattaya', 
            fontSize: '40px' }

        scene.placeShipsLabel = scene.add.text(scene.game.config.width/2, 720, 'Place your ships :', { 
            fontFamily: 'Pattaya', 
            fontSize: '64px' })
            .setOrigin(0.5);
        
        scene.waitingForOppLabel = scene.add.text(scene.game.config.width/2, 1200, 'Waiting for opponent ...', { 
                fontFamily: 'Pattaya', 
                fontSize: '50px' })
                .setOrigin(0.5, 0.5);
        
        scene.opponentLabel =  scene.add.text(scene.game.config.width/2, 1200, 'Opponent: ', { 
                fontFamily: 'Pattaya', 
                fontSize: '40px' })
                .setOrigin(1, 0.5);
    
        scene.opponentNameLabel = scene.add.text(scene.game.config.width/2, 1200, '', { 
                    fontFamily: 'Comfortaa', 
                    fontSize: '50px' }).setOrigin(0, 0.5);
        
        scene.isPlacingShipsLabel = scene.add.text(scene.game.config.width/2, 1270, 'is placing his/her ships ', { 
                        fontFamily: 'Comfortaa', 
                        fontSize: '40px' })
                        .setOrigin(0.5);

        scene.autoPlaceLabel = scene.add.text(scene.game.config.width/2, 1100, 'auto place', { 
            fontFamily: 'Comfortaa', 
            fontSize: '30px' })
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', scene.gameMatrix.autoPlaceShips, this.gameMatrix)
            .on('pointerover', () => scene.autoPlaceLabel.setStyle({ color: '#ebe6c9'  }))
            .on('pointerout', () => scene.autoPlaceLabel.setStyle({ color: '#fff' }));

        

        scene.setOpponentLabel()
        scene.setUserName()

        scene.setReadyButton(scene)

        //this.setOpponentInfo()
        scene.youAreReadyLabel = scene.add.text(scene.cameras.main.centerX, 900, 'You are ready. Waiting for opponent.', scene.buttonTextStyle)
        .setOrigin(0.5)
        .setPadding(50)
        .setStyle({ backgroundColor: '#56BE5D' })
        .setVisible(false)

        

        scene.rightArrow = new AttentionSprite(scene, 670, 880, 'arrow')
        .setScale(0.5)
        .setTint(0x8bd4ff)
        .setAngle(10)
        

        scene.leftArrow = new AttentionSprite(scene, 110, 880, 'arrow')
        .setScale(0.5)
        .setAngle(-10)
        .setTint(0x8bd4ff)
        .setFlipX(true)

        
 
        
    }

        //setReady(scene){

}