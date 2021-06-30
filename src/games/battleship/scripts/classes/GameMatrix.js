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
        console.log('Snap Ship')
        //ship.snapped=false

        this.matrix.forEach(matrixRow => {

            matrixRow.forEach(matrixPoint => { 
                //this.add.circle(snapPoint.x, snapPoint.y, 3, 0xff0000)
                const dist = Phaser.Math.Distance.BetweenPoints(ship, matrixPoint)
                if(dist <= 50){
                    
                    // /console.log('Snappp', ' row: ', matrixPoint.row, ' col: ', matrixPoint.col)
                    ship.x = matrixPoint.x
                    ship.y = matrixPoint.y
                    ship.firstPos = {row: matrixPoint.row, col: matrixPoint.col}
                    //console.log('snap')
                    // console.log(this.scene)
                    // console.log(this.scene.input.x)
                    // console.log(this.scene.input.y)

                    //this.placeShipToMatrix(ship, matrixPoint)
                    //console.log('row: ' + matrixPoint.row)
                    //console.log('col: ' + matrixPoint.col)
                    //ship.setPosition(matrixPoint)
                    //ship.setPos(matrixPoint)
                    
                    //ship.snapped = true
                }
            })
        })
    }

    setMargins(){
        console.log('Set margins')
        
        this.clearMargins()
        
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
                //debugger
                if(this.matrix[row][col].ship instanceof Ship){
                    //this.matrix[row][col].ship = null
                    console.log('shiip')
                    
                    marginCoords.forEach(matrixCoord => {

                        const starRow = row + matrixCoord.row
                        const starCol = col + matrixCoord.col

                        if(starRow < 0 || starRow >= 10 || starCol < 0 || starCol >=10) return

                        if(this.matrix[starRow][starCol].ship instanceof Ship) return

                        this.matrix[starRow][starCol].ship = "*"
                        //console.log(this.matrix[row + matrixCoord.row][col + matrixCoord.col].ship)
                        //console.log('row: ', row + matrixCoord.row , 'col: ', col + matrixCoord.col )
                        //debugger
                        //console.log(matrixCoord)
                        
                        //this.matrix[row + matrixCoord.row][col + matrixCoord.col].ship = '*'
                    })

                    //console.log('row: ', row, 'col: ', col)
                    //this.matrix[row + 1][col - 1].ship = "*"
                    //console.log(this.matrix[row][col].ship instanceof Ship)
                    //console.log(this.matrix[row + 1][col - 1].ship instanceof Ship)
                }

                //console.log(this.matrix[row][col].ship)
            }
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
    // placeShipToMatrix(ship, matrixPoint){
    //     console.log(ship)
    //     console.log(matrixPoint)
    //     this.matrix
    // }
}