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
        this.correctShips = 0

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

                //this.scene.add.circle(x, y, 5, 0x6666ff);
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

    autoPlaceShips(){
        console.log('AutoPlceShips')
        this.scene.ships.forEach(ship => {
            this.placeShipRandomly(ship)
        })
        //this.placeShipRandomly(this.scene.ships[0])
    }

    placeShipRandomly(ship){
        //console.log('Correct ships before: ', this.correctShips)

        const correctShipsBefore = this.correctShips

        const row = Phaser.Math.Between(0,9)
        const col = Phaser.Math.Between(0,9)

        const turned = Phaser.Math.Between(0,1)
        const angle = turned ? '-90' : '0'
        //console.log('Turned: ', turned, "Angle: ", angle)

        ship.x = this.matrix[row][col].x
        ship.y = this.matrix[row][col].y
        ship.angle = angle
        ship.firstPos = {row: row, col: col}

        ship.removeOldPosFromMatrix() 
        ship.checkPos()

        //console.log('Correct ships after: ', this.correctShips)

        const correctShipsAfter = this.correctShips

        if((correctShipsBefore < correctShipsAfter) && ship.posCorrect){
            return
        }else{
            this.placeShipRandomly(ship)
        }
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
        this.correctShips = 0
        this.scene.ships.forEach(ship => {
            //console.log("ship.posSet: ", ship.posSet, "ship.posCorrect: ", ship.posCorrect)
            if(ship.posSet && ship.posCorrect) this.correctShips ++
        })
        //console.log('Number of correct ships: ',this.correctShips)
        if(this.correctShips >= 10) {
            console.log('Can. Start. Game. At. Last')
            this.scene.showReadyButton()
        } else{
            this.scene.hideReadyButton()
        }
    }

    resetShips(){
        this.scene.ships.forEach(ship => {
            if(ship.posSet){
                ship.setPosCorrect()
            }
            
        })
    }

    makeServerMatrix(){
        const matrix = this.matrix
        console.log('matrix', matrix)
        //let str = ''
        let arr = []

        for(var i = 0; i < 10; i++) {
            
            arr.push([])
            for(var z = 0; z < 10; z++) {
                
                if(matrix[i][z].ship != null){
                    //str += ' ' + matrix[i][z].ship.length
                    arr[i][z] = {
                        shipType: matrix[i][z].ship.length,
                        hit: false,
                        drowned: false,
                        x:matrix[i][z].ship.x,
                        y:matrix[i][z].ship.y,

                        id: matrix[i][z].ship.id,
                        angle: matrix[i][z].ship.angle
                    }
                    //arr[i][z] = matrix[i][z].ship.length
                }else{
                    arr[i][z] = null
                }
              
            }
            
            
            
          }
        console.log('arr', arr)
        return(arr)
    }
    
}