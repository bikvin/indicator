import Phaser from "phaser";
import Ship from "../classes/Ship";
import GameMatrix from '../classes/GameMatrix'



export default class GameScene extends Phaser.Scene {
    constructor() {
        super("Game");

        this.shipStartPositions = []
        this.ships = []

        this.drag = false

    }

    init(data){

        
        this.seaPaddingTop = data.seaPaddingTop

        this.cellSize = 69
        this.leftTopX = 56
        this.leftTopY = 48 + this.seaPaddingTop
    }

    preload(){
        this.add.sprite(0, this.seaPaddingTop, 'sea').setOrigin(0, 0);
        this.add.sprite(1900, this.seaPaddingTop, 'sea').setOrigin(1, 0);
    }

    create() {
        
        this.gameMatrix = new GameMatrix(this, this.leftTopX,this.leftTopY,this.cellSize)
        this.setShipStartPositions()
        this.setShipSprites()

        
  
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
                originY: shipStartPosition.originY
                })
            )
        })

    }

    setShipStartPositions(){
        const centerWidth = this.game.config.width/2

        this.shipStartPositions = [
            {id: 1, length: 4, x:centerWidth+110, y: this.seaPaddingTop, sprite: 'ship4', originX: 0.87, originY: 0.5},
            {id: 2, length: 3, x:centerWidth+60, y: this.seaPaddingTop + 120, sprite: 'ship3_1', originX: 0.83, originY: 0.5},
            {id: 3, length: 3, x:centerWidth+60, y: this.seaPaddingTop + 230, sprite: 'ship3_2', originX: 0.83, originY: 0.5},
            {id: 4, length: 2, x:centerWidth+40, y: this.seaPaddingTop + 330, sprite: 'ship2', originX: 0.75, originY: 0.5},
            {id: 5, length: 2, x:centerWidth+40, y: this.seaPaddingTop + 430, sprite: 'ship2', originX: 0.75, originY: 0.5},
            {id: 6, length: 2, x:centerWidth+40, y: this.seaPaddingTop + 530, sprite: 'ship2', originX: 0.75, originY: 0.5},
            {id: 7, length: 1, x:centerWidth-50, y: this.seaPaddingTop + 630, sprite: 'ship1', originX: 0.5, originY: 0.5},
            {id: 8, length: 1, x:centerWidth+50, y: this.seaPaddingTop + 630, sprite: 'ship1', originX: 0.5, originY: 0.5},
            {id: 9, length: 1, x:centerWidth-50, y: this.seaPaddingTop + 710, sprite: 'ship1', originX: 0.5, originY: 0.5},
            {id: 10, length: 1, x:centerWidth+50, y: this.seaPaddingTop + 710, sprite: 'ship1', originX: 0.5, originY: 0.5},
        ]
    }
    
}
