import * as Phaser from "phaser";

export class Bullet extends Phaser.Physics.Arcade.Sprite {
    hit = false;
    damage = 25;

    constructor(scene,x,y, target){
        super(scene, x, y);
        scene.physics.add.existing(this);
        this.setTexture('atlas', 'weapon_arrow');
        this.setBodySize(16, 16);
        this.setScale(4);
        this.body.setMaxSpeed(800);
        this.setPushable(false);
        this.body.useDamping = true;
        console.log(scene.enemyGroup);
        this.rotation = Phaser.Math.Angle.BetweenPoints(this, target)+Math.PI/2;
        
        scene.physics.add.collider(this, scene.map.getLayer("Floor").tilemapLayer, () => {
            this.body.setVelocity(0);
        });
        scene.physics.add.overlap(this, scene.enemyGroup, (bullet, enemy) => {
           
            if(!this.hit){
                enemy.health -= this.damage;
                this.hit = true;
                this.body.setVelocity(0);
            }
        });
        scene.physics.moveToObject(this, target, 800);
    }
}