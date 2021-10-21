const Phaser = require("phaser");
const Player = require("./Player");
class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
  }
  preload() {
    this.canvas = this.sys.game.canvas; //  Sets the canvas property for ease of acess
    this.load.image('back', 'static/back.gif');
    this.load.image('owl', 'static/owl.gif');
    // joystick plugin hehe
    this.load.plugin(
      "rexvirtualjoystickplugin",
      "https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexvirtualjoystickplugin.min.js",
      true
    );
  }
  
  create() {
    this.add.image(0, 0, 'back').setDisplayOrigin(0,0).setScale(2.7);
    this.fpsText = this.add.text(10, 10, "FPS: --", {
        font: 'bold 26px Arial',
        fill: '#ffffff'
    });

    this.player = new Player(this, 500,300, 'owl');
    
    // Platforms 
    let platforms = this.physics.add.staticGroup();
    let platformsArr = [];
    platformsArr.push(this.add.rectangle(300, 400, 100, 30, 0x0000ff));
    platformsArr.push(this.add.rectangle(500, 550, 200, 30, 0x0000ff));
    // this.add.rectangle(300, 100, 100, 30, 0x0000ff);
    // this.add.rectangle(300, 100, 100, 30, 0x0000ff);
    // this.add.rectangle(300, 100, 100, 30, 0x0000ff);
    platforms.addMultiple(platformsArr);
    this.physics.add.collider(this.player, platforms);

    this.cursors = this.input.keyboard.createCursorKeys();

    // Camera
    this.cameras.main.setBounds(
      0,
      0,
      this.canvas.height * 2 + 3000,
      this.canvas.height * 2 + 200
    );
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setBackgroundColor("#ccccff");

    // joystick
    this.joystick = this.plugins
      .get("rexvirtualjoystickplugin")
      .add(this, {
        radius: 60,
        x: window.innerWidth - 75,
        y: window.innerHeight - 75,
        dir: '4dir',
        base: this.add.circle(0, 0, 60, 0xe0e4f1),
        thumb: this.add.circle(0, 0, 30, 0x333),
      })
      .on("update", this.handleJoystick, this);
  }

  update(time, delta) {
    this.fpsText.setText("FPS: "+ (1000/delta).toFixed(3))
    this.player.update();
  }

  handleJoystick() {
    let cursorKeys = this.joystick.createCursorKeys();
    let keyDown = Object.values(cursorKeys).find((key) => key.isDown);
    
    if (keyDown === "left")
      this.player.body.x = this.player.body.x - 10;
    else if (keyDown === "right")
      this.player.body.x = this.player.body.x + 10;
    else if (
      (["bottom", "top"].includes(keyDown)) &&
      this.player.body.onFloor()
    ) {
      this.player.body.setVelocityY(-900);
    }
  }
}

module.exports = GameScene;
