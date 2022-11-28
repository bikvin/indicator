export default class Boom extends Phaser.GameObjects.Sprite{

    static generate(scene, x, y) {
        return new Boom({scene, x, y});
    }
    
    constructor(data) {
      
        super(data.scene, data.x, data.y, 'boom', 'boom1');
        this.scene.add.existing(this);


        // Сгенерировать набор фреймов текстуры, необходимых для анимации
        const frames = this.scene.anims.generateFrameNames('boom', {
            prefix: 'boom',
            start: 1,
            end: 4
        });

        this.scene.anims.create({
            key: 'boom',
            frames,
            frameRate:10,
            repeat: 0
        });

        this.setScale(this.scene.config.scaleMultiplier);

        this.play('boom');


        this.once('animationcomplete', () => {
            this.destroy();
        });

    }


}