export default class LevelTimer{
    constructor(scene, time){
        this.time = time;
        this.scene = scene;

        this.init();
    }

    init(){
       
        const levelTimerProperties = {
            delay: this.time,

            callback: this.timeUp,
            callbackScope: this,
            loop: false,
            repeat: 0
            
        }
        this.levelTimer = this.scene.time.addEvent(levelTimerProperties);

      
        this.scene.events.on('update', this.update, this);

        this.addText();
    }

    timeUp(){

        if(this.scene.levelConfig.win.item == 'time'){
            //console.log('time-win condition')
            this.scene.onWin();
        }else{
            //console.log('time-lose condition')
            this.scene.onLose('Time is up.');
        }
    }

    update(){

        const remaining = this.levelTimer.getRemaining();
        const totalSeconds = Math.round(remaining / 1000);
        const minutes = parseInt(totalSeconds/60);
        let seconds = ('0' + totalSeconds % 60);
        seconds = seconds.substring(seconds.length-2, seconds.length);
        const string = `${minutes}:${seconds}`;

 
        //console.log('levelTimer update');
        this.scene.bottomLabel.updateData('Time', string);
    
        
    }

    addText(){

        
        this.scene.bottomLabel.addItem({
            
                order: 0,
                name: 'Time',
                value: '0:00'

        });
   
    }

    stop(){
        this.scene.events.off('update', this.update, this);
        this.levelTimer.remove();
    }

   
}

