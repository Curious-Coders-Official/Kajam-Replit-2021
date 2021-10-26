const Phaser = require("phaser");
const Utils = require("../Utils");

class Enemy extends Phaser.Physics.Arcade.Sprite {

  speedX = 90;
  speedY = 310;

  constructor(scene, x, y) {
    super(scene, x, y, "enemy");
    scene.physics.add.existing(this);
    scene.add.existing(this);
    this.setCollideWorldBounds(true);
    this.setFrictionX(100000)


    this.nextJump = 3000;
    
  }

  update(time, delta){
    if(this.nextJump < time){
      console.log("JUMP")
      this.move(this.scene.player.x, this.scene.player.y)
      this.nextJump += 3*1000;
    }    
  }

  move(x,y){
    if(x < this.x){
      this.setVelocity(-this.speedX, -this.speedY);
    } else if (x > this.x){
      this.setVelocity(this.speedX,-this.speedY); 
    }
    // Utils.VelToAngle(angle);
  }

  // Events
}

module.exports = Enemy;