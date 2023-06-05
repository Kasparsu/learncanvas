export class Ui {
    scene;
    player;
    arrowCount;
    arrowText;
    constructor(scene, player) {
      this.scene = scene;
      this.player = player;
      this.arrowCount = player.arrows;

      // create the arrow display text
      this.arrowText = this.scene.add.text(200, 10, `Arrows: ${this.arrowCount}`, {
        fontSize: '24px',
        //fill: '#fff'
      });
    }

    update() {
      // update the arrow count
      this.arrowCount = this.player.arrows;

      // update the arrow display text
      this.arrowText.setText(`Arrows: ${this.arrowCount}`);
    }
  }
