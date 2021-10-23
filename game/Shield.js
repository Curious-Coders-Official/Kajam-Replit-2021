const Phaser = require("phaser");
const Utils = require("./Utils");

class Shield extends Phaser.Physics.Arcade.Sprite {
  constructor(player, scene){
    let x = player.x;
    let y = player.y;
    super(scene, x,y, "shield");
    this.player = player;
    
    this.scene.add.existing(this);
    this.setOrigin(0,1);
    this.setScale(5);

    // Utils.anglePointToPoint()
  }

  update(){
    // Follow player
    this.setX(this.player.x);
    this.setY(this.player.y);

    this.setAngle(Utils.anglePointToPoint(this.x, this.y, this.scene.mouseX, this.scene.mouseY)); // Set angle in relation to the mouse


    // Collision with bullets, will do once the bullet is made
  }
}

module.exports = Shield;