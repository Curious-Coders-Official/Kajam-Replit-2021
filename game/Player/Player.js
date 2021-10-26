const Phaser = require("phaser");
const Shield = require("../Shield");
const Rocket = require("./Rocket");

class Player extends Phaser.Physics.Arcade.Sprite {


  constructor(scene, x, y) {
    super(scene, x, y, "astronaut");
    this.setScale(3.5);
    this.scene.physics.add.existing(this);
    this.scene.add.existing(this);
    this.setCollideWorldBounds(true);
    this.body.setDragX(500); 
    
    this.setupAnimations(); 
    this.play("idle");
    // this.shield = new Shield(this, this.scene);
    this.rocket = new Rocket(this.scene, this, this.x ,this.y)
    this.timeStamp = Date.now();
  }

  setupAnimations(){
    this.scene.anims.create({
      key: "run",
      frames: this.anims.generateFrameNumbers("astronaut", {
        start: this.getPosFromSheet(1,0),
        end: this.getPosFromSheet(1,14)
      }),
      duration: 1500,
      repeat: -1
    });
    this.scene.anims.create({
      key: "idle",
      duration: 800,
      frames: this.anims.generateFrameNumbers("astronaut", {
        start: this.getPosFromSheet(0,0),
        end: this.getPosFromSheet(0,3)
      }),
      repeat: -1
    });
    this.scene.anims.create({
      key:"pre-thrust",
      duration: 600,
      frames: this.anims.generateFrameNumbers("astronaut", {
        start: this.getPosFromSheet(2,2),
        end: this.getPosFromSheet(2,3)
      }),
      repeat: 1
    });
    this.scene.anims.create({
      key:"hold-thrust",
      duration: 800,
      frames: this.anims.generateFrameNumbers("astronaut", {
        start: this.getPosFromSheet(2,4),
        end: this.getPosFromSheet(2, 6)
      }),
      repeat: 1
    })
  }
  update() {
    // Left-Right controls
    if (this.scene.cursors.left.isDown) {
      this.body.setVelocityX(-300);
      this.flipX = true;
      this.playIfNot("run");
    } else if (this.scene.cursors.right.isDown) {
      this.body.setVelocityX(300);
      this.flipX = false;
      this.playIfNot("run");
    }
    if (this.scene.cursors.left.isUp && this.scene.cursors.right.isUp && !this.rocket.isThrusting) {
      this.playIfNot("idle");
    }

    // Rocket
    this.rocket.update(); 

    // Shield
    // this.shield.update();
  }

  killed(){
    if(this.dead) return;
    this.dead = true;
    console.log("## THE PLAYER DIED ##");
  }


  // Some helper functions
  getPosFromSheet(row, col){
    /* Returns the position of a particular frame in a single 1Dimension */
    return (row*14)+col;
  }
  playIfNot(key){
    /* Plays a particular animation if it is not already playing */
    if(this.anims.getName() !== key){
      this.play(key);
    }
  }
}

module.exports = Player;
