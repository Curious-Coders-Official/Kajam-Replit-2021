const Phaser = require("phaser");

class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
  }
  preload() {
    this.canvas = this.sys.game.canvas; //  Sets the canvas property for ease of acess
  }
  create() {


    // Player
    this.player = this.add.rectangle(300, 200, 50, 70, 0xff0000);
    this.physics.add.existing(this.player);
    this.player.body.setCollideWorldBounds(true);

    // Platforms
    let platformsArr = [];
    platformsArr.push(this.add.rectangle(300, 400, 100, 30, 0x0000ff));
    platformsArr.push(this.add.rectangle(500, 550, 200, 30, 0x0000ff));
    // this.add.rectangle(300, 100, 100, 30, 0x0000ff);
    // this.add.rectangle(300, 100, 100, 30, 0x0000ff);
    // this.add.rectangle(300, 100, 100, 30, 0x0000ff);
    let platforms = this.physics.add.staticGroup();
    platforms.addMultiple(platformsArr);

    this.physics.add.collider(this.player, platforms);

    this.cursors = this.input.keyboard.createCursorKeys();


    // Camera
    this.cameras.main.setBounds(0, 0, this.canvas.height * 2 + 3000, this.canvas.height * 2 + 200);
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setBackgroundColor('#ccccff');
  }
  update() {
    if (this.cursors.left.isDown) {
      this.player.body.x = this.player.body.x - 10;
    } else if (this.cursors.right.isDown) {
      this.player.body.x = this.player.body.x + 10;
    } if ((this.cursors.space.isDown || this.cursors.up.isDown) && this.player.body.onFloor()) {
      this.player.body.setVelocityY(-900);
    }
  }
}

module.exports = GameScene;