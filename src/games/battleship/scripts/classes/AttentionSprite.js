import Phaser from "phaser";

export default class AttentionSprite extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, key){
        super(scene, x, y, key)

        scene.add.existing(this)

        scene.tweens.add({
            targets: this,
            y: this.y - 10,
            duration: 1000,
            repeat: -1,
            ease: 'linear',
            yoyo: true
    
        })
    }

    
}