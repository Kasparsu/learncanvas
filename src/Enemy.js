import { Physics } from "phaser";

export class Enemy extends Physics.Arcade.Sprite{
    player;
    constructor(scene, x, y, player){
        super(scene, x, y, 'atlas', 'masked_orc_run_anim_0');
        this.player = player;
        scene.physics.add.existing(this);
        this.body.setOffset(0, 4);
        this.body.setSize(16, 16, false);

        this.anims.create({
            key: 'masked_orc_run_anim',
            frames: this.anims.generateFrameNames('atlas', { prefix: 'masked_orc_run_anim_', start:0, end: 3}),
            repeat: -1,
            frameRate: 8,
            
        });

        this.anims.play('masked_orc_run_anim');

        this.setScale(4);
    }

    preUpdate(time, delta){
        super.preUpdate(time, delta);
        this.scene.physics.moveToObject(this, this.player, 100);
    }
}