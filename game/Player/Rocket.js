const Phaser = require("phaser");

class Rocket {
  isThrusting = false;
  thrustBegin = false;
  regenRate = 500; // in milliseconds
  thrustFuel = 80;
  particleEmitting = false;

  constructor(scene,player,x,y){
    this.scene = scene;
    this.player = player;
    this.x = x;
    this.y = y;

    this.particles = this.scene.add.particles("fire");
    this.particles.depth = -1;

    this.emitter = this.particles.createEmitter({
      x: 200,
      y: 300,
      lifespan: 500,
      speed: { min: 100, max: 400 },
      angle: 90,
      gravityY: 200,
      scale: { start: 0.4, end: 0 },
      quantity: 1,
      blendMode: 'ADD',
      on: false,
    });
    this.emitter.startFollow(this.player);
    this.emitter.followOffset.set(0,player.height);
    this.particleEmitting = true;
  }

  update(){

    if(this.player.body.onFloor()){
      this.isThrusting = false;
      this.thrustBegin = false;
    }

    if (
      (this.scene.cursors.space.isDown || this.scene.cursors.up.isDown) &&
      this.thrustFuel > 0
    ) {
      this.player.body.setVelocityY(-300);
      this.emitter.on = true;
      if(!this.thrustBegin){
        this.player.playIfNot("pre-thrust");
        this.player.playAfterDelay("hold-thrust", 600)
        this.isThrusting = true;
        this.thrustBegin = true;
      }
      this.thrustFuel -= 1;
    } else {
      this.emitter.on = false;
    }

    // Fuel System
    if (
      this.player.body.onFloor() &&
      this.thrustFuel < 80
    ) {
      this.thrustFuel++;
      this.timeStamp = Date.now();
    }
  }
}

module.exports = Rocket;