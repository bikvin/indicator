import Phaser from "phaser";
import Ship from "./Ship";

export default class GameMatrix {
    constructor(scene, leftTopX, leftTopY, cellSize) {
        this.initMatrix(scene, leftTopX, leftTopY, cellSize)
        //console.log('GameMatrix constructor')
    }


    initMatrix(scene, leftTopX, leftTopY, cellSize){
        //console.log('Init Matrix')
        this.scene = scene

        this.matrix = [
                        [],
                        [],
                        [],
                        [],
                        [],
                        [],
                        [],
                        [],
                        [],
                        [],
                    ]
                    
        const topLeftSnapPoint = {x: leftTopX+cellSize/2, y: leftTopY+cellSize/2}

        for (let row = 0; row<=9; row++){
            for(let col = 0; col<=9; col++){
                const x = topLeftSnapPoint.x + col*cellSize
                const y = topLeftSnapPoint.y + row*cellSize

                this.matrix[row][col] = {row:row, col:col, x:x, y:y, ship: null}

            }
        }

        
    }

    snapShip(ship){
        //console.log('Snap Ship')
       

        this.matrix.forEach(matrixRow => {

            matrixRow.forEach(matrixPoint => { 
              
                const dist = Phaser.Math.Distance.BetweenPoints(ship, matrixPoint)
                if(dist <= 50){
                    
            
                    ship.x = matrixPoint.x
                    ship.y = matrixPoint.y
                    ship.firstPos = {row: matrixPoint.row, col: matrixPoint.col}
                    
                }
            })
        })
    }

    
    clearMargins(){
        console.log('Clear Margins')
        for(let row=0; row < 10; row++){
            for(let col=0; col < 10; col++){
                if(this.matrix[row][col].ship === '*'){
                    this.matrix[row][col].ship = null
                }
            }
        }
    }

    check(){
        this.resetShips()
        //console.log('Matrix check')
        const marginCoords = [
            {row: -1, col: -1},
            {row: -1, col:  0},
            {row: -1, col: 1},
            {row: 0, col: -1},
            {row: 0, col: 1},
            {row: 1, col: -1},
            {row: 1, col: 0},
            {row: 1, col: 1},
        ]
        for(let row=0; row < 10; row++){
            
            for(let col=0; col < 10; col++){
                const checkCellShip = this.matrix[row][col].ship

                marginCoords.forEach(matrixCoord => {
                    const checkMarginRow = Math.max(Math.min(row + matrixCoord.row, 9), 0)
                    const checkMarginCol = Math.max(Math.min(col + matrixCoord.col, 9), 0)
                    const checkMarginShip = this.matrix[checkMarginRow][checkMarginCol].ship
                    
                    
                    if(checkCellShip != null) {
                        if((checkMarginShip != null) && (checkMarginShip.id != checkCellShip.id)) { 
                            // console.log('Too close')
                            // console.log('checkMarginShip.id: ', checkMarginShip.id, 'checkCellShip.id: ', checkCellShip.id)
                            
                            checkCellShip.setPosIncorrect()
                        }
                    }
                    
                    
                })
            }
        }

        this.countCorrectShips()
    }

    countCorrectShips(){
        let correctShips = 0
        this.scene.ships.forEach(ship => {
            //console.log("ship.posSet: ", ship.posSet, "ship.posCorrect: ", ship.posCorrect)
            if(ship.posSet && ship.posCorrect) correctShips ++
        })
        console.log('Number of correct ships: ',correctShips)
        if(correctShips >= 10) console.log('Can. Start. Game. At. Last')
    }

    resetShips(){
        this.scene.ships.forEach(ship => {
            if(ship.posSet){
                ship.setPosCorrect()
            }
            
        })
    }
    
}