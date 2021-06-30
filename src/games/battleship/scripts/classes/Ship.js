import Phaser from "phaser";

export default class Ship extends Phaser.GameObjects.Sprite {
    constructor(options) {
        super(options.scene, options.x, options.y, options.sprite)
        this.setInteractive()
        this.setOrigin(options.originX, options.originY)

        this.length = options.length

        this.scene.add.existing(this);

        this.init()

    }

    init(){
        
        this.setDragAndTurn()
        //this.snapped = false
        this.firstPos = {}
        this.pos = []
        this.oldPos = []

        this.matrix = this.scene.gameMatrix
        

    }

    setDragAndTurn(){
        this.scene.input.setDraggable(this);
        this.scene.input.dragDistanceThreshold = 10;
        this.drag = false

        this.on('dragstart', () => {
            console.log('dragStart')
            this.drag = true
            this.removeOldPosFromMatrix()
            this.matrix.setMargins()
            this.printMatrix()

        })

        this.on('drag', (a, dragX, dragY) => {
            this.x = dragX;
            this.y = dragY;
            this.scene.gameMatrix.snapShip(this)
            //console.log(this.scene.gameMatrix.snapShip)
        })

        this.on('pointerup', () => {
            console.log('pointerup')
            this.turn()


            
        })

        this.on('dragend', () => {
            console.log('dragEnd')
            console.log('Ship Snapped - ' + this.shipIsSnapped())
            
            //console.log('Ship is inside - ', this.shipIsInside())
            console.log('First pos - ', this.firstPos)

            
            this.checkPos()
            

        })
    }

    turn(){             
            console.log('Turn')
          
            if(this.drag) return this.drag = false // this is to cancel turning after drag on pointer up
    
            //console.log(turnShip.angle)
            if(this.angle == 0){
                this.angle = -90
            }else{
                this.angle = 0 
            }

            this.removeOldPosFromMatrix()
            this.matrix.setMargins()
            this.printMatrix()
            
            this.checkPos()

            // if(this.pos.length>0){
            //     this.setPos({row: this.pos[0].row, col: this.pos[0].col})
            // }
            //this.setPos({row: this.row, col: this.col})
            
    }

    checkPos(){// this should check the pos and set in if its ok. or [] if not
        //this.oldPos = this.pos

        if(this.shipIsSnapped()){
            this.clearTint()
            this.setPos(this.firstPos)
        }else{
            this.pos = []
        }

        if(!this.shipIsInside() || this.shipOverlaps()){
            //console.log('ship is NOT inside')
            this.pos = []
            this.setTint(0xff0000)
        }else{
            console.log('ship is inside')
        }


        //console.log('this.pos = '+ JSON.stringify(this.pos))
        //console.log('this.oldPos = '+ JSON.stringify(this.oldPos))

        //this.removeOldPosFromMatrix()
        this.writePosToMatrix()
       
    }

    shipOverlaps(){
        let shipOverlaps = false
        this.pos.forEach(pos => {
            console.log(pos.col, pos.row)
            console.log(this.matrix.matrix[pos.row][pos.col].ship)
            if(this.matrix.matrix[pos.row][pos.col].ship != null) shipOverlaps = true
        })
        return shipOverlaps
    }

    setPos(matrixPoint){ // this function writes position of a ship to itself depending on start point and angle
        //console.log('Set pos')

        //console.log('Is inside ' + this.shipIsInside())

        // console.log(`col= ${matrixPoint.col} row=${matrixPoint.row}`)
        // console.log('Length: ' + this.length)
        // console.log(this.angle)
        //this.removePosFromMatrix()

        
        this.pos = []

        for(let i = 0; i < this.length; i++){
            if(this.angle == 0){
                this.pos.push({row: matrixPoint.row, col: matrixPoint.col-i})
            }else if (this.angle == -90){
                this.pos.push({row: matrixPoint.row+i, col: matrixPoint.col})
            }
        }
        
        //this.writePosToMatrix();
        //this.snapped = true
        //this.checkPos()
    }

    shipIsSnapped(){
        let isSnapped = false
        
        this.scene.gameMatrix.matrix.forEach(matrixRow => {

            matrixRow.forEach(matrixPoint => { 
                //console.log('This coord', this.x, this.y)
                //console.log('Matrix point', matrixPoint.x, matrixPoint.y)
                if ( (this.x == matrixPoint.x) && (this.y == matrixPoint.y)){
                    
                    isSnapped = true
                }
            })
        })
        return isSnapped
    }


   

    removeOldPosFromMatrix(){

        //this.oldPos.forEach(pos => {
        this.pos.forEach(pos => {
            this.scene.gameMatrix.matrix[pos.row][pos.col].ship = null
        })
        //this.scene.gameMatrix.matrix[0][0] = 'yeeeha'
        //console.log(this.scene.gameMatrix.matrix)
        
    }

    writePosToMatrix(){

        this.pos.forEach(pos => {
            //console.log(pos)
            //const matrix = this.scene.gameMatrix.matrix

            this.matrix.matrix[pos.row][pos.col].ship = this

            // const margin = [
            //                 [-1,-1],
            //                 [-1, 0],
            //                 [-1,1],
            //                 [0,-1],
            //                 [0,1],
            //                 [1,-1],
            //                 [1,0],
            //                 [1,1],
            //             ]
            // matrix[pos.row-1][pos.col-1].ship = '*'

        })

        this.matrix.setMargins()
        this.printMatrix()
        
    }

    // checkPos(){
    //     console.log('check pos')
    //     this.pos.forEach(pos => {
    //         if(pos.row > 9 || pos.col < 0){
    //             this.setTint(0xff0000)
    //         }
    //         else{
    //             //this.clearTint()
    //             this.setTint(0x00ff00)
    //         }
    //     })
    // }

    shipIsInside(){
        console.log('check ship inside')
        let isInside = true
        this.pos.forEach(pos => {
            if(pos.row > 9 || pos.col < 0){
                isInside =  false
            }     
        })
        return isInside
    }

    printMatrix(){
        const matrix = this.scene.gameMatrix.matrix

        //console.log(matrix[0][0])
        //console.log(typeof(matrix[0][0].ship))
        //console.log(matrix[0][0].x)

        let str = ''
        for(var i = 0; i < 10; i++) {
            //console.log('i= ' + i)
            for(var z = 0; z < 10; z++) {
                //console.log(matrix[i][z].ship)
                if(matrix[i][z].ship === '*'){
                    str += ' ' + '*'
                }
                else if(matrix[i][z].ship != null){
                    str += ' ' + matrix[i][z].ship.length
                }else{
                    str += ' ' + '.'
                }
              
            }
            //str.push(' \n')
            str += ' \n'
          }
        console.log(str)
          
    }
}


