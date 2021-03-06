const Phaser = require("phaser");
const Player = require("./Player/Player");
const GameData = require("../assets/game.json");
const Enemy = require("./Enemy/Enemy");

class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
  }

  preload() {
    this.canvas = this.sys.game.canvas; //  Sets the canvas property for ease of acess

    this.load.image("bg", "static/back.gif");
    this.load.spritesheet("astronaut", "static/astronaut.png", {
      frameWidth:16,
      frameHeight:16
    });
    this.load.image("fire", "static/fire.png");
    this.load.image("bullet", "static/bullet.png");
    this.load.image("fullscreen", "static/fullscreen.png");
    this.load.image("fullscreen_exit", "static/fullscreen_exit.png");
    this.load.image("shield", "static/shield2.png");
    this.load.spritesheet("enemy-sheet", "static/enemies.png", {
      frameWidth:208,
      frameHeight:205
    });

    // joystick plugin hehe
    this.load.plugin(
      "rexvirtualjoystickplugin",
      "/static/joystickplugin.min.js",
      true
    );
  }

  create() {
    this.physics.world.setBounds(0, 0, GameData.worldWidth, GameData.worldHeight);
    let image = this.add.image(
      this.cameras.main.width / 2,
      this.cameras.main.height / 2,
      "bg"
    );
    image.depth = -50;
    let scaleX = this.cameras.main.width / image.width;
    let scaleY = this.cameras.main.height / image.height;
    let scale = Math.max(scaleX, scaleY);
    image.setScale(scale).setScrollFactor(0.2);

    this.fpsText = this.add
      .text(10, 10, "FPS: --", {
        font: "bold 18px Arial",
        fill: "#ffffff",
      })
      .setScrollFactor(0);
      

    this.player = new Player(this, 0, 0, "owl");



    // Platforms
    this.platforms = this.physics.add.staticGroup();
    this.platformsArr = [];
    console.log(GameData.worldWidth)
    this.platformsArr.push(this.add.rectangle(0, GameData.worldHeight, GameData.worldWidth, 150, 0x0000ff).setOrigin(0,1));
    //this.platformsArr.push(this.add.rectangle(500, 550, 200, 30, 0x0000ff));
    //this.platformsArr.push(this.add.rectangle(500, 400, 500, 30, 0xff000ff));
    // this.add.rectangle(300, 100, 100, 30, 0x0000ff);
    // this.add.rectangle(300, 100, 100, 30, 0x0000ff);
    this.platforms.addMultiple(this.platformsArr);
    this.physics.add.collider(this.player, this.platforms);



    // Enemies
    this.enemies = this.physics.add.group();
    this.enemiesArr = [];
    setTimeout(()=>{
      this.enemiesArr.push(new Enemy(this, 100, GameData.worldHeight/2));
      this.enemies.addMultiple(this.enemiesArr);
      this.physics.add.collider(this.enemies, this.platforms)
      this.physics.add.collider(this.enemies, this.player, (player,enemy)=>{
        player.killed();
      });
    }, 10000)
    this.cursors = this.input.keyboard.createCursorKeys();

    // Camera
    this.cameras.main.setBounds(0, 0, GameData.worldWidth, GameData.worldHeight);
    this.cameras.main.startFollow(this.player);

    // joystick
    this.joystick = this.plugins.get("rexvirtualjoystickplugin").add(this, {
      radius: 60,
      x: this.canvas.width - 75,
      y: this.canvas.height - 75,
      dir: "8dir",
      base: this.add.circle(0, 0, 60, 0xe0e4f1, 0.7),
      thumb: this.add.circle(0, 0, 30, 0x333),
    });
    
    // this.shieldJoystick = this.plugins.get("rexvirtualjoystickplugin").add(this, {
    //   radius: 60,
    //   x: 75,
    //   y: this.canvas.height - 75,
    //   dir: "8dir",
    //   base: this.add.circle(0, 0, 60, 0xe0e4f1, 0.7),
    //   thumb: this.add.circle(0, 0, 30, 0x333),
    // });

    // resize button
    let resizeIcon;
    let resizeBtn = this.add
      .circle(this.canvas.width - 26, 26, 20, 0x212121, 0.7)
      .setScrollFactor(0)
      .setInteractive()
      .on("pointerdown", (e) => {
        this.toggleFullScreen(resizeIcon);
      });
    resizeIcon = this.add
      .image(resizeBtn.x, resizeBtn.y, "fullscreen")
      .setScale(1)
      .setScrollFactor(0)
      .setInteractive()
      .on("pointerdown", (e) => {
        this.toggleFullScreen(resizeIcon);
      });

    // shoot button
    // let shootBtn = this.add
    //   .circle(50, 50, 30, 0xe0e4f1, 0.7)
    //   .setScrollFactor(0)
    //   .setInteractive()
    //   .on("pointerdown", this.handleShoot);
    // this.add
    //   .image(shootBtn.x, shootBtn.y, "bullet")
    //   .setScale(0.2)
    //   .setScrollFactor(0);

    // Mouse Event
    this.input.on("pointermove", (pointer) => {
      this.mouseX = pointer.x;
      this.mouseY = pointer.y;
    });
  }

  update(time, delta) {
    this.fpsText.setText("FPS: " + Math.round(1000 / delta));
    this.player.update();
    for(let i = 0; i < this.enemiesArr.length; i++) {
      const enemy = this.enemiesArr[i];
      enemy.update(time, delta);
    }
    this.handleJoystick();
    // this.handleShieldMovement();
  }

  handleJoystick() {
    let cursorKeys = this.joystick.createCursorKeys();
    let keyDown = "";
    for (let name in cursorKeys) {
      if (cursorKeys[name].isDown) keyDown = name;
    }

    if (keyDown === "left") this.player.body.setVelocityX(-400);
    else if (keyDown === "right") this.player.body.setVelocityX(400);
    else if (keyDown === "up" && this.player.thrustFuel > 0) {
      this.player.body.setVelocityY(-400);
      this.player.thrustFuel -= 1;
    } else if (keyDown === "up left" && this.player.thrustFuel > 0) {
      this.player.body.setVelocityX(-400);
      this.player.body.setVelocityY(-400);
      this.player.thrustFuel -= 1;
    } else if (keyDown === "up right" && this.player.thrustFuel > 0) {
      this.player.body.setVelocityX(400);
      this.player.body.setVelocityY(-400);
      this.player.thrustFuel -= 1;
    }
  }
  
  handleShieldMovement() {
    let angle = Math.floor(this.shieldJoystick.angle * 100) / 100;
    
    if (angle > 0) angle = 179 + angle + 179;
    
    if (angle !== 0) {
      this.player.shield.setAngle(angle);
    }
  }

  toggleFullScreen(icon) {
    if (document.fullscreenEnabled) {
      if (this.scale.isFullscreen) {
        this.scale.stopFullscreen();
        icon.setTexture("fullscreen");
        console.log("exited fullscreen!");
      } else {
        this.scale.startFullscreen();
        icon.setTexture("fullscreen_exit");
        console.log("entered fullscreen!");
      }
    }
  }

  handleShoot() {
    // shoot button is clicked so handle it
  }
}

module.exports = GameScene;
