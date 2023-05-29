import { Physics } from "phaser";
import { Bullet } from "./Bullet";
import { InputManager } from "./InputManager";

export class Player extends Physics.Arcade.Sprite {

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
    
    input;
    shootInterval = 500;
    lastShotTime = 0;

    arrowsLeft = 5;

    constructor(scene, x, y){
        super(scene, x, y, 'atlas', 'elf_m_idle_anim_0');
        scene.physics.add.existing(this);
        this.body.setOffset(0, 12);
        this.body.setSize(16, 16, false);
        this.body.setMaxSpeed(400);

        this.body.setDrag(800, 800);

        this.count = scene.add.text(0, 0, this.arrowsLeft);
      
        this.anims.create({
            key: 'elf_m_idle_anim',
            frames: this.anims.generateFrameNames('atlas', { prefix: 'elf_m_idle_anim_', start:0, end: 3}),
            repeat: -1,
            frameRate: 8,
     
        });
        
        this.anims.create({
            key: 'elf_m_run_anim',
            frames: this.anims.generateFrameNames('atlas', { prefix: 'elf_m_run_anim_', start:0, end: 3}),
            repeat: -1,
            frameRate: 8,
            
        });
        this.anims.create({
            key: 'elf_m_hit_anim',
            frames: this.anims.generateFrameNames('atlas', { prefix: 'elf_m_hit_anim_', start:0, end: 0}),
            repeat: -1,
            frameRate: 8,
      
        });
        
        this.anims.play('elf_m_idle_anim');
    
        this.setScale(4);
        this.input = new InputManager(scene);
       
    }
    isMoving(){
   
        return this.body.speed>0;
    }
    preUpdate(time, delta) {
        super.preUpdate(time, delta);
        if(this.input.keys.KeyA.isDown) {
            this.body.setVelocityX(-this.body.maxSpeed);
            this.setFlipX(true);
        }
        if(this.input.keys.KeyD.isDown) {
            this.body.setVelocityX(this.body.maxSpeed);
            this.setFlipX(false);
        }
        if(this.input.keys.KeyW.isDown) {
            this.body.setVelocityY(-this.body.maxSpeed);
           
        }
        if(this.input.keys.KeyS.isDown) {
            this.body.setVelocityY(this.body.maxSpeed);
            
        }

        if(this.input.keys.Space.isDown && this.arrowsLeft>0){
            
            if(time-this.lastShotTime > this.shootInterval){
                let i = new Bullet(this.scene, this.x,this.y, this.input.mouse)
                this.scene.physics.add.collider(this, i, () => {
                    i.destroy();
                    this.arrowsLeft++;
                    this.count.setText(this.arrowsLeft);
                });

                this.scene.add.existing(i);
                this.lastShotTime = time;
                this.arrowsLeft--;
                this.count.setText(this.arrowsLeft);
            }       
        }

        if(this.isMoving()){
            this.play('elf_m_run_anim', true);
        } else {
            this.play('elf_m_idle_anim', true);
        }
    }
}