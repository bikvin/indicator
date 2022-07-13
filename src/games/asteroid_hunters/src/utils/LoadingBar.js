export default class LoadingBar {
    constructor(scene) {
        this.scene = scene;
        this.style = {
            boxColor: 0x73FBF3,
            barColor: 0x73FBF3,
            textColor: '#73FBF3',
            x: this.scene.config.width / 2 - 325,
            y: this.scene.config.height / 2-35,
            width: 650,
            height: 70,
            lineThickness: 7,
            cornerRadius: 35,
            emptyThickness: 4,
            transparency: 0.8
        };

        // this.barStyle = {
        //     color: 0x73FBF3,
        //     x: this.scene.config.width / 2 - 325,
        //     y: this.scene.config.height / 2-35,
        //     width: this.boxStyle.width-,
        //     height: 70,
        //     cornerRadius: 35,
        //     emptyThickness: 7

        // }

        this.progressBox = this.scene.add.graphics();
        this.progressBar = this.scene.add.graphics(); 

        
        //this.scene.add.image(this.scene.config.width / 2, this.scene.config.height / 2 - 25, 'lb-example').setOrigin(0.5).setScale(0.8);

        this.showProgressBox();
        this.setEvents();
        this.addLabel();
    }

    setEvents() {
        this.scene.load.on('progress', this.showProgressBar, this);
        //this.scene.load.on('fileprogress', this.onFileProgress, this);
        this.scene.load.on('complete', this.onLoadComplete, this);
    }

    showProgressBox() {
        // this.progressBox
        //     .fillStyle(this.style.boxColor)
        //     .fillRect(this.style.x, this.style.y, this.style.width, this.style.height);

        this.progressBox
            .lineStyle(this.style.lineThickness, this.style.boxColor, this.style.transparency)
            //.lineGradientStyle(this.style.lineThickness, 0xff0000, 0xffff00, 0xff0000, 0xffff00)
            //.fillGradientStyle(0xff0000, 0xffff00, 0xff0000, 0xffff00)
            .strokeRoundedRect(this.style.x, this.style.y, this.style.width, this.style.height , this.style.cornerRadius);

    }
    
    onLoadComplete() {
        this.progressBar.destroy();
        this.progressBox.destroy();
        this.label.destroy();
    }

    showProgressBar(value) {

        const barHeight = this.style.height-(this.style.lineThickness+this.style.emptyThickness);
        const barWidth = (this.style.width-this.style.lineThickness-this.style.emptyThickness) * value;
        const barCornerRadius = barHeight/2;

        const x = this.style.x+this.style.lineThickness/2+this.style.emptyThickness/2;
        const y = this.style.y+this.style.lineThickness/2+this.style.emptyThickness/2;

        //debugger

        this.progressBar
        .clear()
        .fillStyle(this.style.barColor, this.style.transparency)
        //     .fillRect(this.style.x, this.style.y, this.style.width * value, this.style.height);
        .fillRoundedRect(x, y, barWidth, barHeight , barCornerRadius);
    }

    addLabel(){
        this.label = this.scene.add.text(this.scene.config.width/2, this.scene.config.height/2-70, 'Loading', { font: '30px Arial', color: this.style.textColor}).setDepth(2).setOrigin(0.5);
    }
}