const Phaser = require("phaser");
const Shield = require("./Shield");

class Player extends Phaser.Physics.Arcade.Sprite {

  isThrusting = false;
  thrustBegin = false;
  regenRate = 500; // in milliseconds
  thrustFuel = 80;

  constructor(scene, x, y) {
    super(scene, x, y, "astronaut");
    scene.physics.add.existing(this);
    scene.add.existing(this);
    this.setCollideWorldBounds(true);
    this.body.setDragX(500);

    scene.anims.create({
      key: "run",
      frames: this.anims.generateFrameNumbers("astronaut", {
        start: this.getPosFromSheet(1,0),
        end: this.getPosFromSheet(1,14)
      }),
      duration: 1500,
      repeat: -1
    });

    scene.anims.create({
      key: "idle",
      duration: 800,
      frames: this.anims.generateFrameNumbers("astronaut", {
        start: this.getPosFromSheet(0,0),
        end: this.getPosFromSheet(0,3)
      }),
      repeat: -1
    });

    scene.anims.create({
      key:"pre-thrust",
      duration: 600,
      frames: this.anims.generateFrameNumbers("astronaut", {
        start: this.getPosFromSheet(2,2),
        end: this.getPosFromSheet(2,3)
      }),
      repeat: 1
    });

    scene.anims.create({
      key:"hold-thrust",
      duration: 800,
      frames: this.anims.generateFrameNumbers("astronaut", {
        start: this.getPosFromSheet(2,4),
        end: this.getPosFromSheet(2, 6)
      }),
      repeat: 1
    })

    this.play("idle");

    this.setScale(5);

    this.timeStamp = Date.now();

    this.shield = new Shield(this, scene);
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
    if (this.scene.cursors.left.isUp && this.scene.cursors.right.isUp && !this.isThrusting) {
      this.playIfNot("idle");
    }



    //  Thrust
    if(this.body.onFloor()){
      this.isThrusting = false;
      this.thrustBegin = false;
    }

    if (
      (this.scene.cursors.space.isDown || this.scene.cursors.up.isDown) &&
      this.thrustFuel > 0
    ) {
      this.body.setVelocityY(-300);
      if(!this.thrustBegin){
        this.playIfNot("pre-thrust");
        this.playAfterDelay("hold-thrust", 600)
        this.isThrusting = true;
        this.thrustBegin = true;
      }
      this.thrustFuel -= 1;
    }


    // regaining fuel system
    if (
      this.body.onFloor() &&
      this.thrustFuel < 80 &&
      Date.now() - this.timeStamp > this.regenRate
    ) {
      this.thrustFuel++;
      this.timeStamp = Date.now();
    }


    // Shield Update
    this.shield.update();
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
      console.log("PLAY "+key)
    }
  }
}

module.exports = Player;
