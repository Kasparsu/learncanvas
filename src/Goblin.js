import { Physics } from "phaser";

export class Goblin extends Physics.Arcade.Sprite {
    hp = 3;
    player;
    damage = 1;
    attackSpeed = 1000;
    lastAttackTime = 0;

    takeDamage(damage){
        this.hp -= damage;
        if(this.hp<=0){
            this.disableBody();
            this.rotation = Math.PI/2;
        }
    }

    constructor(scene, x, y, player){
        super(scene, x, y, 'atlas', 'goblin_idle_anim_0');
        scene.physics.add.existing(this);
        this.body.setOffset(3, 6);
        this.body.setSize(12, 12, false);
        this.body.setMaxSpeed(200);

        this.body.setDrag(800, 800);

        this.player = player;

        this.anims.create({
            key: 'goblin_idle_anim',
            frames: this.anims.generateFrameNames('atlas', { prefix: 'goblin_idle_anim_', start:0, end: 3}),
            repeat: -1,
            frameRate: 8,

        });

        this.anims.create({
            key: 'goblin_run_anim',
            frames: this.anims.generateFrameNames('atlas', { prefix: 'goblin_run_anim_', start:0, end: 3}),
            repeat: -1,
            frameRate: 8,

        });
        this.anims.create({
            key: 'goblin_hit_anim',
            frames: this.anims.generateFrameNames('atlas', { prefix: 'goblin_hit_anim_', start:0, end: 0}),
            repeat: -1,
            frameRate: 8,

        });

        this.anims.play('goblin_idle_anim');

        this.setScale(4);
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);
        if(this.player && this.hp>0) {
            this.rotation = Phaser.Math.Angle.BetweenPoints(this, this.player)+Math.PI/2;
            this.scene.physics.moveToObject(this, this.player, 200);
        }

        if (this.scene.physics.overlap(this, this.player)) {
            if(time>this.lastAttackTime+this.attackSpeed){
                this.lastAttackTime = time;
                this.player.takeDamage(this.damage);
            }
        }

        if(this.body.speed>0) {
            this.anims.play('goblin_run_anim', true);
        } else {
            this.anims.play('goblin_idle_anim', true);
        }
    }
}