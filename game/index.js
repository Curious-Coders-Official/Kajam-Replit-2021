const Phaser = require("phaser");
const GameScene = require("./gameScene");

let width = innerWidth;
let height = innerHeight;

var config = {
  type: Phaser.CANVAS,
  width,
  height,
  
  scale: {
    mode: Phaser.Scale.WIDTH_CONTROLS_HEIGHT ,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  pixelArt: true,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: true,
    },
  },
  scene: GameScene,
};

new Phaser.Game(config);
