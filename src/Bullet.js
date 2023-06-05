import * as Phaser from "phaser";
import { MainScene } from "./MainScene";
import mapJSON from './assets/map.json';

export class Bullet extends Phaser.Physics.Arcade.Sprite {
    hit = false;
    damage = 50;

    constructor(scene,x,y, target){
        super(scene, x, y);
        scene.physics.add.existing(this);
        this.setTexture('atlas', 'weapon_arrow');
        this.setBodySize(15, 15);
        this.setScale(3);
        this.body.setMaxSpeed(800);
        this.setPushable(false);
        this.body.useDamping = true;
        this.rotation = Phaser.Math.Angle.BetweenPoints(this, target)+Math.PI/2;
        
        scene.physics.add.collider(this, scene.map.getLayer("Floor").tilemapLayer, () => {
            this.body.setVelocity(0);
        });

        scene.physics.add.overlap(this, scene.goblin, (arrows, goblin) => {
            if(!this.hit){
                goblin.health -= this.damage;
                this.hit = true;
                this.body.setVelocity(0);
            }
        });
        scene.physics.moveToObject(this, target, 800);
    }
}