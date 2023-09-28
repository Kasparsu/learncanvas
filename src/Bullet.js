import * as Phaser from "phaser";
import { MainScene } from "./MainScene";
export class Bullet extends Phaser.Physics.Arcade
  .Sprite {
  hit = false;
  damage = 10;
  constructor(scene, x, y, target) {
    super(scene, x, y);
    scene.physics.add.existing(this);
    this.setTexture("atlas", "weapon_arrow");
    this.setScale(4);
    this.setBodySize(12, 12);
    this.body.setMaxSpeed(800);
    this.body.useDamping = true;
    this.body.setDrag(1, 1);
    scene.physics.add.collider(
      this,
      scene.map.getLayer("Floor").tilemapLayer,
      () => {
        this.body.setVelocity(0);
      }
    );
    scene.physics.add.overlap(
      this,
      scene.goblin,
      (bullet, goblin) => {
        if (!this.hit) {
          goblin.health -= this.damage;
          this.hit = true;
          this.body.setVelocity(0);
        }
      }
    );
    console.log(
      Phaser.Math.Angle.BetweenPoints(
        this,
        target
      )
    );
    this.rotation =
      Phaser.Math.Angle.BetweenPoints(
        this,
        target
      ) +
      Math.PI / 2;

    scene.physics.moveToObject(this, target, 800);
  }
}
