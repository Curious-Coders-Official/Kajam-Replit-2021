const Phaser = require("phaser");
const GameScene = require("./gameScene");

let width = innerWidth;
let height = innerHeight;

var config = {
  type: Phaser.CANVAS,
  width,
  height,
  pixelArt: true,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 900 },
      debug: true,
    },
  },
  scene: GameScene,
};

new Phaser.Game(config);
