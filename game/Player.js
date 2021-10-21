const Phaser = require("phaser");

class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x,y){
    super(scene, x,y, 'owl');
    scene.physics.add.existing(this);
    scene.add.existing(this);
    this.setCollideWorldBounds(true);
    
    this.thrustFuel = 80;
  }
  update(){
    // Left-Right controls
    if (this.scene.cursors.left.isDown) {
      this.body.setVelocityX(-400);
    }else if(this.scene.cursors.right.isDown) {
      this.body.setVelocityX(400);
    }
    if(this.scene.cursors.left.isUp && this.scene.cursors.right.isUp){
      this.body.setVelocityX(0);
    }

    // Thrusting
    if((this.scene.cursors.space.isDown || this.scene.cursors.up.isDown) && this.thrustFuel > 0){
      this.body.setVelocityY(-400);
      this.thrustFuel -= 1;
      console.log(this.thrustFuel)
    }
  }
}

module.exports = Player;