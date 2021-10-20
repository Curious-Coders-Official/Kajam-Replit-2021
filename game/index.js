const Phaser = require("phaser");
const GameScene = require("./gameScene");

let width = 1500;
let height = 1300;

var config = {
  type: Phaser.CANVAS,
  width,
  height,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 1500 },
      debug: true,
    },
  },
  scene: GameScene,
};

new Phaser.Game(config);