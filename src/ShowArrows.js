export class AmmoDisplay {
  scene;
  player;
  arrowCount;
  arrowText;
  constructor(scene, player) {
    this.scene = scene;
    this.player = player;
    this.arrowCount = player.ammo;
    
    // create the arrow display text
    this.arrowText = this.scene.add.text(10, 10, `Arrows: ${this.arrowCount}`, {
      fontSize: '32px',
      fill: '#fff'
    });
  }

  update() {
    // update the arrow count
    this.arrowCount = this.player.ammo;

    // update the arrow display text
    this.arrowText.setText(`Arrows: ${this.arrowCount}`);
  }
}
