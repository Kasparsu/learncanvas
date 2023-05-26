import { Physics } from "phaser";

export class Goblin extends Physics.Arcade.Sprite {
    player;
    damageTimer = 0;
    damageInterval = 500;
    damageAmount = 10;
    _health = 100;

    set health(num) {
        this._health = num;
        if (num <= 0) {
            this.stop();
            this.disableBody();
            this.setRotation(90 / (Math.PI / 180));
        }
    }

    get health() {
        return this._health;
    }

    constructor(scene, x, y, player) {
        super(scene, x, y, 'atlas', 'swampy_idle_anim_0');
        this.player = player;
        scene.physics.add.existing(this);
        this.body.setOffset(0, 4);
        this.body.setSize(16, 16, false);

        this.anims.create({
            key: 'swampy_idle_anim',
            frames: this.anims.generateFrameNames('atlas', {
                prefix: 'swampy_idle_anim_',
                start: 0,
                end: 3
            }),
            repeat: -1,
            frameRate: 8,
        });

        this.anims.play('swampy_idle_anim_');

        this.setScale(4);
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);
        this.scene.physics.moveToObject(this, this.player, 100);

        if (this.scene.physics.overlap(this, this.player)) {
            if (time > this.damageTimer + this.damageInterval) {
                this.damageTimer = time;
                console.log("shoot");
                this.player.health -= this.damageAmount;
            }
        }
    }
}
