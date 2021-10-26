const Phaser = require("phaser");
const Utils = require("./Utils");

class Shield extends Phaser.Physics.Arcade.Sprite {
  constructor(player, scene) {
    let x = player.x;
    let y = player.y;
    super(scene, x, y, "shield");
    this.player = player;

    this.scene.add.existing(this);
    this.setOrigin(0.6, 0.6);
    this.setScale(0.2);

    // Utils.anglePointToPoint()
  }

  update() {
    // Follow player
    this.setX(this.player.x);
    this.setY(this.player.y)

    let ang = Utils.anglePointToPoint(
      this.x - this.scene.cameras.main.scrollX,
      this.y - this.scene.cameras.main.scrollY,
      this.scene.mouseX,
      this.scene.mouseY
    ); // Set angle in relation to the mouse
    this.setAngle(ang);
    // Collision with bullets, will do once the bullet is made
  }
}

module.exports = Shield;
