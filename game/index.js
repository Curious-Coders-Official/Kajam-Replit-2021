const Phaser = require("phaser");
const GameScene = require("./gameScene");
const joystick = require('./joystick.min.js')

let width = window.innerWidth * 2;
let height = window.innerHeight * 2;

var config = {
  type: Phaser.AUTO,
  width,
  height,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 1500 },
      debug: true,
    },
  },
  plugins: {
        global: [{
            key: 'joystick',
            plugin: joystick,
            start: true
        },
        ]
    },
  scene: GameScene,
};

var game = new Phaser.Game(config);
