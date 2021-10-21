const Phaser = require("phaser");
const GameScene = require("./gameScene");

let width = innerWidth;
let height = innerHeight;
width = innerWidth;
height = innerHeight;

var config = {
  type: Phaser.CANVAS,
  width,
  height,
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
