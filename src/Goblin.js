import { Physics } from "phaser";

export class Enemy extends Physics.Arcade.Sprite {
    player;
    attackTime = 0;
    attackInterval = 1000;
    attackDamage = 30;
    _health = 400;

    set health(num) {
        this._health = num;
        if(num <= 0){
            this.stop();
            this.disableBody();
            this.setRotation(90/(Math.PI/180));
        }
    }

    get health() {
        return this._health;
    }

    constructor(scene, x, y, player) {
        super(scene, x, y, 'atlas', 'masked_orc_run_anim_0');
        this.player = player;
        scene.physics.add.existing(this);
        this.body.setOffset(-1, 3);
        this.body.setSize(16, 16, false);

        this.anims.create({
            key: 'masked_orc_run_anim',
            frames: this.anims.generateFrameNames('atlas', { prefix: 'masked_orc_run_anim_', start: 0, end: 3 }),
            repeat: -1,
            frameRate: 8,

        });

        this.anims.play('masked_orc_run_anim');

        this.setScale(4);
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);
        this.scene.physics.moveToObject(this, this.player, 100);

        if (this.body.angle > -90 / (180 / Math.PI) && this.body.angle < 90 / (180 / Math.PI)) {
            this.setFlipX(false);
        } else {
            this.setFlipX(true);
        }


        if (this.scene.physics.overlap(this, this.player)) {
            if (time > this.attackTime + this.attackInterval) {
                this.attackTime = time;
                this.player.health -= this.attackDamage;
            }
        }
    }
}