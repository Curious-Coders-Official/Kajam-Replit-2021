const Phaser = require("phaser");

class Enemy extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "enemy");
    scene.physics.add.existing(this);
    scene.add.existing(this);
    this.setCollideWorldBounds(true);

    
  }

  update(time, delta){
    console.log(time +":"+ delta);
  }
}

module.exports = Enemy;