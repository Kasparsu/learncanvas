import { Physics } from "phaser";

export class Goblin extends Physics.Arcade.Sprite {
    maxHp = Math.floor(Math.random() * 10) + 1;
    hp = this.maxHp
    hpCounter;
    player;
    damage = 1;
    attackSpeed = 1000;
    lastAttackTime = 0;
    
    takeDamage(damage){
        this.hp -= damage;
        this.hpCounter.emit('hpChanged', this.hp);
        if(this.hp<=0){
            this.disableBody();
            this.rotation = Math.PI/2;
        }
    }

    constructor(scene, x, y, player){
        super(scene, x, y, 'atlas', 'goblin_idle_anim_0');
        scene.physics.add.existing(this);
        this.body.setSize(10, 10, true);
        this.body.setMaxSpeed(200);

        this.body.setDrag(800, 800);

        this.hpCounter = scene.add.text(100, 150, `HP: ${this.hp}`, { fontSize: '32px', fill: '#ffffff' });
        this.hpCounter.on('hpChanged', (hp) => {
            if(hp<=0){
                this.hpCounter.destroy();
            } else {
                this.hpCounter.setText('HP: ' + hp);
            }
        });

        this.player = player;

        this.anims.create({
            key: 'goblin_idle_anim',
            frames: this.anims.generateFrameNames('atlas', { prefix: 'goblin_idle_anim_', start:0, end: 3}),
            repeat: -1,
            frameRate: 8,
            size: 10,
        });

        this.anims.create({
            key: 'goblin_run_anim',
            frames: this.anims.generateFrameNames('atlas', { prefix: 'goblin_run_anim_', start:0, end: 3}),
            repeat: -1,
            frameRate: 8,
            scale: 10,
        });
        this.anims.create({
            key: 'goblin_hit_anim',
            frames: this.anims.generateFrameNames('atlas', { prefix: 'goblin_hit_anim_', start:0, end: 0}),
            repeat: -1,
            frameRate: 8,
            scale: 10,
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
            this.hpCounter.setPosition(this.x-this.maxHp*5, this.y-this.maxHp*40);
        } else {
            this.anims.play('goblin_idle_anim', true);
        }
    }
}