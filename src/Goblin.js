import { Physics } from "phaser";

export class Goblin extends Physics.Arcade.Sprite {

    healthLevel = 100;

    set health(i) {
        this.healthLevel = i;
        if(i <= 0){
            this.disableBody();
            this.setRotation(90/(Math.PI/180));
        }
    }
    get health() {
        return this.healthLevel;
    }

    constructor(scene, x, y, player) {
        super(scene, x, y, 'atlas', 'goblin_idle_anim_0');
        scene.physics.add.existing(this);
        this.body.setOffset(3, 5);
        this.body.setSize(12, 12, false);
        this.body.setMaxSpeed(400);
        this.body.setDrag(800, 800);
        this.player = player;

        this.anims.create({
            key: 'goblin_idle_anim',
            frames: this.anims.generateFrameNames('atlas', { prefix: 'goblin_idle_anim_', start: 0, end: 3 }),
            repeat: -1,
            frameRate: 8,
        });

        this.anims.create({
            key: 'goblin_run_anim',
            frames: this.anims.generateFrameNames('atlas', { prefix: 'goblin_run_anim_', start: 0, end: 3 }),
            repeat: -1,
            frameRate: 8,
        });

        this.anims.play('goblin_idle_anim');
        this.setScale(6);
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);
        this.scene.physics.moveToObject(this, this.player, 100);

        if (this.body.speed > 0) {
            this.anims.play('goblin_run_anim', true);
        } else {
            this.anims.play('goblin_idle_anim', true);
        }
    }
}