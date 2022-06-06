//#region [ rgba(0,205,30, 0.2)]
//#endregion

import Phaser from "phaser";
import Ship from "../classes/Ship";
import GameMatrix from '../classes/GameMatrix'
import AttentionSprite from '../classes/AttentionSprite'
import SetupSceneGraphics from '../classes/SetupSceneGraphics'




export default class SetupScene extends Phaser.Scene {
    constructor() {
        super("Setup");

        this.shipStartPositions = []
        this.ships = []

        this.drag = false

    }

    init(data){

        this.data = data


        this.playerReady = false


    }

    preload(){
        
        const playerSea = this.add.sprite(this.cameras.main.centerX, this.seaPaddingTop + this.seaHeight/2, 'sea').setOrigin(0.5, 0.5);
        playerSea.displayWidth = this.seaWidth
        playerSea.displayHeight = this.seaHeight

        
    }

    create() {

        this.gameMatrix = new GameMatrix(this, this.leftTopX,this.leftTopY,this.cellSize)

        this.graphics = new SetupSceneGraphics(this, this.data)

        this.setShipStartPositions()
        this.setShipSprites()

        SetupSceneGraphics.setLabels(this)

        //console.log(players)
        //console.log(user.username)

        //console.log('Register our wonderful listener')

        // socket.on('userJoined', (players) => {
        //     console.log('User Joined Our Wonderful game')
        //     console.log('Players: ', players)
        //     //updateUserList(players)
        // })

        //console.log('Socket: ', socket)

       

        this.setListeners()

        socket.emit('joinGame')
  
    }

    setListeners(){
        socket.on('playerJoinedGame', (players) => {
            console.log('Player Joined Our Wonderful game')
            //console.log('Players: ', players)
            this.setOpponent(players)
            //updateUserList(players)
        })

        // socket.on('userLeft', (players) => {
        //     console.log('Player LEFT Our Wonderful game')
        //     console.log('Players: ', players)
        //     this.setOpponent(players)
        //     //updateUserList(players)
        // })

        socket.on('playerIsReady', (player) => {
            console.log('Player is ready', player)
            this.updateOpponentLabel(player)
        })

        socket.on('playerLeftGame', (players) => {
            console.log('Player Left Game')
            this.setOpponent(players)
            
        })

        socket.on('youAreReadyAlready', (matrix) => {
            
            console.log('youAreReadyAlready')
            console.log("matrix", matrix)
            console.log(JSON.parse(matrix))
            console.log('this.gameMatrix.matrix', this.gameMatrix.matrix)

            SetupSceneGraphics.setShipsFromServer(JSON.parse(matrix), this.gameMatrix, this.ships)
            //this.setOpponent(players)
            
        })
    }

    

    updateOpponentLabel(player){
        //console.log('this: ', this)
        
        if(this.opponent && player._id === this.opponent._id){
            this.isPlacingShipsLabel.text = 'is ready!'
        }
    }

    setOpponent(players){
        //console.log('Players: ', players)
        //console.log('User: ', user)
        this.opponent = players.find(player => player.user._id != user._id)
        //console.log('Opponent: ', this.opponent)
        this.setOpponentLabel(this.opponent)

        /// if i am ready, send event that i'm ready
        if(this.playerReady) socket.emit('playerReady', user)
        
    }

    

  

    showReadyButton(){
        console.log('Show ready Button')
        this.startButton.setVisible(true)
        this.shipsPlacedLabel.setVisible(true)

        this.placeShipsLabel.setVisible(false)
        this.rightArrow.setVisible(false)
        this.leftArrow.setVisible(false)
    }

    hideReadyButton(){
        //console.log('Hide ready Button')
        this.startButton.setVisible(false)
        this.shipsPlacedLabel.setVisible(false)

        this.placeShipsLabel.setVisible(true)
        this.rightArrow.setVisible(true)
        this.leftArrow.setVisible(true)
    }





    setOpponentLabel(opponent){
        if(!opponent){
            this.opponentLabel.setVisible(false)
            this.opponentNameLabel.text = ''
            this.isPlacingShipsLabel.setVisible(false)

            this.waitingForOppLabel.setVisible(true)
        
        } else {
            this.waitingForOppLabel.setVisible(false)
            this.opponentLabel.setVisible(true)
    
            this.opponentNameLabel.text = opponent.user.username
        
            this.isPlacingShipsLabel.setVisible(true)

            
        }
    }


    setUserName(){
        const playerNameLabel = this.add.text(50, 250, user.username, { 
            fontFamily: 'Comfortaa', 
            fontSize: '40px',
            }).setOrigin(0, 0.5);
        playerNameLabel.angle = -90
    }



    setShipSprites(){

        this.shipStartPositions.forEach(shipStartPosition => {
            this.ships.push(
                new Ship({scene: this , 
                id: shipStartPosition.id,
                length: shipStartPosition.length,
                x: shipStartPosition.x, 
                y: shipStartPosition.y, 
                sprite: shipStartPosition.sprite,
                originX: shipStartPosition.originX,
                originY: shipStartPosition.originY,
                scale: this.seaScaleFactor
                })
            )
        })

    }

    setReadyButton(){
        
        this.shipsPlacedLabel = this.add.text(this.game.config.width/2, 780, 'ships placed', { 
            fontFamily: 'Pattaya', 
            fontSize: '40px' })
            .setOrigin(0.5, 0.5);

        this.startButton = this.add.text(this.cameras.main.centerX, 900, 'Press if ready', this.buttonTextStyle)
        .setOrigin(0.5)
        .setPadding(50)
        .setStyle({ backgroundColor: '#f2736d' })
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', this.setReady, this)
        .on('pointerover', () => this.startButton.setStyle({ backgroundColor: '#f6574f'  }))
        .on('pointerout', () => this.startButton.setStyle({ backgroundColor: '#f2736d' }));

        this.startButton.setVisible(false)
        this.shipsPlacedLabel.setVisible(false)
    }

    setReady(){
        console.log('Set ready')
        //this.youAreReadyLabel.setVisible(true)
        //debugger
        this.youAreReadyLabel.setVisible(true)

        this.startButton.setVisible(false)
        this.placeShipsLabel.setVisible(false)
        this.rightArrow.setVisible(false)
        this.leftArrow.setVisible(false)
        this.autoPlaceLabel.setVisible(false)

        this.ships.forEach(ship => {
            ship.disableDrag()
        })
        this.playerReady = true


        //console.log(this.gameMatrix.makeServerMatrix())
        socket.emit('playerReady', user, JSON.stringify(this.gameMatrix.makeServerMatrix()))
    }

    
    
}
