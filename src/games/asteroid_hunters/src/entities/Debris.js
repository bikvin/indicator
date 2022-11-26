
import Asteroid from "./Asteroid";



export default class Debris extends Asteroid {
    constructor(scene, parentX, parentY){



        super(scene, undefined, undefined, true, parentX, parentY);

        this.parentX = parentX;
        this.parentY = parentY;



        this.scene = scene;

        this.isDebris = true;
    }

    setProperties(){
        this.MIN_SCALE = 0.2 * this.scene.config.scaleMultiplier;
        this.MAX_SCALE = 0.3 * this.scene.config.scaleMultiplier;

        this.MIN_VELOCITY = 0.5;
        this.MAX_VELOCITY = 1;

        //this.TEST = 333;
    }

    setLives(){
        this.lives = 1;
    }

   


    setStartPosition(){

        this.startPosition = {
            x: this.parentX, 
            y: this.parentY

        };
    }


}