const Phaser = require("phaser");
const Player = require("./Player");
const GameData = require("../assets/game.json");

class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
  }
  preload() {
    this.canvas = this.sys.game.canvas; //  Sets the canvas property for ease of acess
    this.load.image("bg", "static/back.gif");
    this.load.image("owl", "static/owl.gif");
    // joystick plugin hehe
    this.load.plugin(
      "rexvirtualjoystickplugin",
      "https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexvirtualjoystickplugin.min.js",
      true
    );
  }

  create() {
    this.physics.world.setBounds(0, 0, GameData.worldWidth, innerHeight);

    let image = this.add.image(
      this.cameras.main.width / 2,
      this.cameras.main.height / 2,
      "bg"
    );
    let scaleX = this.cameras.main.width / image.width;
    let scaleY = this.cameras.main.height / image.height;
    let scale = Math.max(scaleX, scaleY);
    image.setScale(scale).setScrollFactor(0.2);

    this.fpsText = this.add.text(10, 10, "FPS: --", {
      font: "bold 26px Arial",
      fill: "#ffffff",
    });

    this.player = new Player(this, 0, 0, "owl");
    this.player.scale = 0.8;

    // Platforms
    let platforms = this.physics.add.staticGroup();
    let platformsArr = [];
    platformsArr.push(this.add.rectangle(300, 400, 100, 30, 0x0000ff));
    platformsArr.push(this.add.rectangle(500, 550, 200, 30, 0x0000ff));
    platformsArr.push(this.add.rectangle(500, 400, 500, 30, 0xff000ff));
    // this.add.rectangle(300, 100, 100, 30, 0x0000ff);
    // this.add.rectangle(300, 100, 100, 30, 0x0000ff);
    platforms.addMultiple(platformsArr);
    this.physics.add.collider(this.player, platforms);

    this.cursors = this.input.keyboard.createCursorKeys();

    // Camera
    this.cameras.main.setBounds(0, 0, GameData.worldWidth, innerHeight);
    this.cameras.main.startFollow(this.player);

    // joystick
    this.joystick = this.plugins
      .get("rexvirtualjoystickplugin")
      .add(this, {
        radius: 60,
        x: window.innerWidth - 75,
        y: window.innerHeight - 75,
        dir: "4dir",
        base: this.add.circle(0, 0, 60, 0xe0e4f1),
        thumb: this.add.circle(0, 0, 30, 0x333),
      })
  }

  update(time, delta) {
    this.fpsText.setText("FPS: " + (1000 / delta).toFixed(3));
    this.player.update();
    this.handleJoystick();
  }

  handleJoystick() {
    let cursorKeys = this.joystick.createCursorKeys();
    let keyDown = '';
    for (let name in cursorKeys) {
      if (cursorKeys[name].isDown) keyDown = name;
    }

    if (keyDown === "left") this.player.body.setVelocityX(-400);
    else if (keyDown === "right") this.player.body.setVelocityX(400);
    else if (
      ["up", "down"].includes(keyDown) &&
      this.player.thrustFuel > 0
    ) {
      this.player.body.setVelocityY(-400);
      this.player.thrustFuel -= 1;
    }
  }
}

module.exports = GameScene;
