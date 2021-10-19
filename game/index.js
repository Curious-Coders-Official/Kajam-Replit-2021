const Phaser = require("phaser");
const GameScene = require("./gameScene");

let width = window.innerWidth;
let height = window.innerHeight;


var config = {
  type: Phaser.AUTO,
  width,
  height,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 1500 },
      debug: true
    }
  },
  scene: GameScene
};

var game = new Phaser.Game(config);