import { Physics } from "phaser";

export class Goblin extends Physics.Arcade.Sprite {
    
    constructor(scene, x, y){
        super(scene, x, y, 'atlas', 'goblin_idle_anim_0');
        scene.physics.add.existing(this);
        this.body.setOffset(3, 12);
        this.body.setSize(10, 16, false);
        this.body.setMaxSpeed(400);

        this.body.setDrag(800, 800);
      
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

        if(this.isMoving()){
            this.play('goblin_run_anim', true);
        } else {
            this.play('goblin_idle_anim', true);
        }
    }
}