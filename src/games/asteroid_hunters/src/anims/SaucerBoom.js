export default class SaucerBoom extends Phaser.GameObjects.Sprite{

    static generate(scene, x, y) {
        return new SaucerBoom({scene, x, y});
    }
    
    constructor(data) {
        
        super(data.scene, data.x, data.y, 'saucer_boom', 'saucerBoom1');
        this.scene.add.existing(this);


        // Сгенерировать набор фреймов текстуры, необходимых для анимации
        const frames = this.scene.anims.generateFrameNames('saucer_boom', {
            prefix: 'saucerBoom',
            start: 1,
            end: 10
        });

        this.scene.anims.create({
            key: 'saucerBoom',
            frames,
            frameRate:10,
            repeat: 0
        });

        this.play('saucerBoom');


        this.once('animationcomplete', () => {
            this.destroy();
        });

    }


}