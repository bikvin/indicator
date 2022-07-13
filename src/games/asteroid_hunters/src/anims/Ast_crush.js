export default class Ast_crush extends Phaser.GameObjects.Sprite{

    static generate(scene, x, y, proportion) {
        return new Ast_crush({scene, x, y, proportion});
    }
    
    constructor(data) {
        
   
        super(data.scene, data.x, data.y, 'crush_ast', '1');
        this.scene.add.existing(this);


        // Сгенерировать набор фреймов текстуры, необходимых для анимации
        const frames = this.scene.anims.generateFrameNames('crush_ast', {
            prefix: '',
            start: 1,
            end: 9
        });

        this.scene.anims.create({
            key: 'crush_ast',
            frames,
            frameRate:10,
            repeat: 0
        });

        this.setScale(data.proportion) // get scale(proportion) from asteroid and apply it to explosion as well

        this.play('crush_ast');


        this.once('animationcomplete', () => {
            this.destroy();
        });

    }


}