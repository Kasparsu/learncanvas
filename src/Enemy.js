import { Physics } from "phaser";

export class Enemy extends Physics.Arcade.Sprite {
    player;
    damageTimer = 0;
    damageInterval = 1000;
    damageAmount = 25;
    _health = 100;

    set health(num) {
        this._health = num;
        if(num <= 0){
            this.stop();
            this.disableBody();
            //rotate body 90 degrees
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
        this.body.setOffset(0, 4);
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
        //right side is -90 degrees to 90 degrees, so I derived it from this equation 1.571rad × 180/π = 90° => 1.571rad = 90° / 180/π
        if (this.body.angle > -90 / (180 / Math.PI) && this.body.angle < 90 / (180 / Math.PI)) {
            this.setFlipX(false);
        } else {
            this.setFlipX(true);
        }

        // Check for collision with player
        if (this.scene.physics.overlap(this, this.player)) {

            // Apply damage every 1 second
            if (time > this.damageTimer + this.damageInterval) {
                this.damageTimer = time;
                console.log("hit");
                this.player.health -= this.damageAmount;
            }
        }
    }
}