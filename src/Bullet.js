import * as Phaser from "phaser";

export class Bullet extends Phaser.Physics.Arcade.Sprite {
    damage = 1;

    constructor(scene, x, y, target){
        super(scene, x, y);
        scene.physics.add.existing(this);
        this.setTexture('atlas', 'weapon_axe');
        this.setScale(4);
        this.body.setMaxSpeed(800);
        this.body.useDamping = true;
        this.body.setSize(14, 14);
        this.body.setAngularAcceleration(5000);
        console.log(Phaser.Math.Angle.BetweenPoints(this, target));
        this.rotation = Phaser.Math.Angle.BetweenPoints(this, target)+Math.PI/2;
        
        scene.physics.moveToObject(this, target, 800);

        scene.physics.add.overlap(this, scene.goblins, (bullet, goblin)=>{
            goblin.takeDamage(this.damage);
            if(goblin.hp <= 0){
                scene.player.ammo+=5;
                scene.player.ammoCounter.emit('ammoChanged', scene.player.ammo);
            }
            bullet.destroy();
        });

        scene.physics.add.collider(this, scene.map.getLayer("Floor").tilemapLayer, () => {
            this.body.setVelocity(0);
            this.body.setAngularAcceleration(0);
            this.body.setAngularVelocity(0);

            scene.physics.add.overlap(this, scene.player, (axe, player) => {
                axe.destroy();
                player.ammo++;
                player.ammoCounter.emit('ammoChanged', player.ammo);
            });

            // Fade out and destroy object (before ammo pickup task)
            // scene.tweens.add({
            //     targets: this,
            //     alpha: 0,
            //     duration: 1000,
            //     ease: 'Linear',
            //     repeat: 0,
            //     yoyo: false,
            //     onComplete: () => {
            //         this.destroy();
            //     }
            // });
        });
    }

    // preUpdate(time,delta){
    //     this.x += this.speed.x/1000*delta;
    //     this.y += this.speed.y/1000*delta;
    // }



    // setSpeed(axis, side){
    //     this.speed[axis] = side * this.maxSpeed;
    // }
    // setSpeedsFromAngle(angle){
    //     this.speed.y = this.maxSpeed * Math.cos(angle);
    //     this.speed.x = this.maxSpeed * Math.sin(angle);
    // }
}