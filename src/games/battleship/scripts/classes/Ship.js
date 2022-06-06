import Phaser from "phaser";

export default class Ship extends Phaser.GameObjects.Sprite {
    constructor(options) {
        super(options.scene, options.x, options.y, options.sprite)
        this.setInteractive()
        this.setOrigin(options.originX, options.originY)

        this.length = options.length
        this.id = options.id

        this.scene.add.existing(this);

        this.setScale(options.scale)
        this.setDepth(1)

        this.init()

    }

    init(){
        
        this.setDragAndTurn()
        this.firstPos = {}
        this.pos = []
        this.oldPos = []
        this.posCorrect = false
        this.posSet = false

        this.matrix = this.scene.gameMatrix
        

    }

    disableDrag(){
        this.disableInteractive()
    }

    setDragAndTurn(){
        this.scene.input.setDraggable(this);
        this.scene.input.dragDistanceThreshold = 10;
        this.drag = false

        this.on('dragstart', () => {
            //console.log('dragStart')
            this.drag = true
            this.removeOldPosFromMatrix()       
            //this.printMatrix()

        })

        this.on('drag', (a, dragX, dragY) => {
            this.x = dragX;
            this.y = dragY;
            this.scene.gameMatrix.snapShip(this)
           
        })

        this.on('pointerup', () => {
            //console.log('pointerup')
            this.turn()

            
        })

        this.on('dragend', () => {
            //console.log('dragEnd')
            //console.log('Ship Snapped - ' + this.shipIsSnapped())  
            //console.log('First pos - ', this.firstPos)
            this.checkPos()
        })
    }

    turn(){             
            //console.log('Turn')
          
            if(this.drag) return this.drag = false // this is to cancel turning after drag on pointer up
    
            if(this.angle == 0){
                this.angle = -90
            }else{
                this.angle = 0 
            }

            this.removeOldPosFromMatrix()
            
            //this.printMatrix()

            this.checkPos()

            
    }

    checkPos(){// this should check the pos and set in if its ok. or [] if not

        if(this.shipIsSnapped()){
            this.clearTint()
            this.setPos(this.firstPos)


            if(!this.shipIsInside() || this.shipOverlaps()){
                //console.log('ship is NOT inside')
                this.pos = []
                this.setTint(0xff0000)
                this.posSet = false
            }else{
                //console.log('ship is inside')
                this.posSet = true
            }
    
        }else{
            
            this.pos = []
            this.posSet = false
            //console.log('Ship is NOT snapped', "this.posSet: ", this.posSet )
        }
        //console.log("!this.shipIsInside(): ", !this.shipIsInside(), "this.shipOverlaps()", this.shipOverlaps())
        this.writePosToMatrix()
       
    }

    shipOverlaps(){
        //console.log('ship overlaps')
        let shipOverlaps = false
        this.pos.forEach(pos => {
            //console.log(pos.col, pos.row)
            //console.log(this.matrix.matrix[pos.row][pos.col].ship)
            if(this.matrix.matrix[pos.row][pos.col].ship != null) shipOverlaps = true
        })
        //console.log('ship overlaps: ', shipOverlaps)
        return shipOverlaps
    }

    setPos(matrixPoint){ // this function writes position of a ship to itself depending on start point and angle
        
        this.pos = []

        for(let i = 0; i < this.length; i++){
            if(this.angle == 0){
                this.pos.push({row: matrixPoint.row, col: matrixPoint.col-i})
            }else if (this.angle == -90){
                this.pos.push({row: matrixPoint.row+i, col: matrixPoint.col})
            }
        }
  
    }

    shipIsSnapped(){
        let isSnapped = false
        
        this.scene.gameMatrix.matrix.forEach(matrixRow => {

            matrixRow.forEach(matrixPoint => { 
  
                if ( (this.x == matrixPoint.x) && (this.y == matrixPoint.y)){
                    
                    isSnapped = true
                }
            })
        })
        return isSnapped
    }

    removeOldPosFromMatrix(){

        this.pos.forEach(pos => {
            this.scene.gameMatrix.matrix[pos.row][pos.col].ship = null
        })
  
        
    }

    writePosToMatrix(){

        this.pos.forEach(pos => {

            this.matrix.matrix[pos.row][pos.col].ship = this

        })

        this.matrix.check()

        //this.printMatrix()
        
    }

    shipIsInside(){
        //console.log('check ship inside')
        let isInside = true
        this.pos.forEach(pos => {
            if(pos.row > 9 || pos.col < 0){
                isInside =  false
            }     
        })
        return isInside
    }

    printMatrix(){ // prints matrix representation to console
        const matrix = this.scene.gameMatrix.matrix

        let str = ''
        for(var i = 0; i < 10; i++) {
            
            for(var z = 0; z < 10; z++) {
                
                if(matrix[i][z].ship === '*'){
                    str += ' ' + '*'
                }
                else if(matrix[i][z].ship != null){
                    str += ' ' + matrix[i][z].ship.length
                }else{
                    str += ' ' + '.'
                }
              
            }
            
            str += ' \n'
          }
        console.log(str)
          
    }

    setPosIncorrect(){
        this.setTint(0xff0000)
        this.posCorrect = false
    }

    setPosCorrect(){
        this.clearTint()
        this.posCorrect = true
    }
}


