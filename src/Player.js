import { Physics } from "phaser";
import { Bullet } from "./Bullet";
import { InputManager } from "./InputManager";

export class Player extends Physics.Arcade.Sprite {
    input;
    shootInterval = 200;
    lastShotTime = 0;
    ammo = 25;
    ammoCounter;
    hp = 3;
    hpCounter;

    takeDamage(damage){
        this.hp -= damage;
        this.hpCounter.emit('hpChanged', this.hp);
        if(this.hp<=0){
            this.disableBody();
            this.rotation = Math.PI/2;
        }
    }

    constructor(scene, x, y){
        super(scene, x, y, 'atlas', 'elf_m_idle_anim_0');
        scene.physics.add.existing(this);

        this.ammoCounter = scene.add.text(100, 100, `Ammo: ${this.ammo}`, { fontSize: '32px', fill: '#ffffff' });
        this.ammoCounter.on('ammoChanged', (ammo) => {
            this.ammoCounter.setText('Ammo: ' + ammo);
        });

        this.hpCounter = scene.add.text(100, 150, `HP: ${this.hp}`, { fontSize: '32px', fill: '#ffffff' });
        this.hpCounter.on('hpChanged', (hp) => {
            this.hpCounter.setText('HP: ' + hp);
        });

        this.body.setOffset(0, 12);
        this.body.setSize(16, 16, false);
        this.body.setMaxSpeed(400);

        this.body.setDrag(800, 800);
      
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
        this.ammoCounter.setPosition(this.x - 50, this.y - 40);
        this.hpCounter.setPosition(this.x - 50, this.y - 80);
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
        if(this.input.keys.Space.isDown){
            
            if(time-this.lastShotTime > this.shootInterval && this.ammo > 0){
                this.ammo--;
                this.ammoCounter.emit('ammoChanged', this.ammo);
                this.scene.add.existing(new Bullet(this.scene, this.x,this.y, this.input.mouse));
                this.lastShotTime = time;
            }         
        }

        if(this.isMoving()){
            this.play('elf_m_run_anim', true);
        } else {
            this.play('elf_m_idle_anim', true);
        }
    }
}