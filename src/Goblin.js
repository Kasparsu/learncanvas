import { Physics } from "phaser";

export class Goblin extends Physics.Arcade.Sprite{
    player;
    hitTime = 0;
    hitSpeed = 1000; // 
    damage = 10;
    _health = 20;

    healthText = this.scene.add.text(800, 10, `Goblin HP: ${this.health}`, {
        fontSize: '24px',
        fill: '#fff'
    });

    set health(num){
        this._health = num;
        this.healthText.setText(`Goblin HP: ${num}`);
        if(num <= 0){
            this.stop();
            this.disableBody();
            this.setRotation(90/(Math.PI/180));
        }
    }

    get health() {
        return this._health;
    }
    constructor(scene, x, y, player){
        super(scene, x, y, 'atlas', 'goblin_run_anim_0');
        this.player = player;
        scene.physics.add.existing(this);
        this.body.setOffset(0, 2);
        this.setScale(4);

        this.anims.create({
            key: 'goblin_run_anim',
            frames: this.anims.generateFrameNames('atlas', { prefix: 'goblin_run_anim_', start:0, end: 3}),
            repeat: -1,
            frameRate: 8,

        });

        this.anims.play('goblin_run_anim');

        
    }

    preUpdate(time, delta){
        super.preUpdate(time, delta);
        this.scene.physics.moveToObject(this, this.player, 100);
        if(this.scene.physics.overlap(this, this.player)){
            if (time > this.hitTime + this.hitSpeed) {
                this.hitTime = time;
                this.player.health -= this.damage;
            }
        }
    }
}