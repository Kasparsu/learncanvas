export class arrowDisplay {
  scene;
  player;
  arrowCount;
  arrowText;
  constructor(scene, player) {
    this.scene = scene;
    this.player = player;
    this.arrowCount = player.arrows;

    this.arrowText = this.scene.add.text(
      550,
      10,
      `${this.arrowCount} arrows`,
      {
        fontSize: "32px",
        fill:
          this.arrowCount > 3 ? "purple" : "red",
      }
    );
  }

  update() {
    this.arrowCount = this.player.arrows;

    this.arrowText.setText(
      `${this.arrowCount} arrows`
    );
  }
  destroy() {
    this.arrowText.destroy();
  }
}
