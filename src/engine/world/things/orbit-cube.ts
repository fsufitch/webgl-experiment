import * as three from 'three';

import { SampleCube } from './sample-cube';

export class OrbitCube extends SampleCube {
  constructor(location: three.Vector2, sideLength: number, color: three.Color,
    public orbitCenter: three.Vector2, public orbitVelocity: number) {
      super(location, sideLength, color);

      let velocityVector = new three.Vector2()
        .subVectors(this.orbitCenter, this.location)
        .rotateAround(new three.Vector2(), Math.PI/2)
        .setLength(orbitVelocity);
      this.velocity = velocityVector;
  }

  protected updateMovement(seconds: number) {
    let orbitRadius = this.orbitCenter.distanceTo(this.location);

    // a = v^2 / r
    let accelerationScalar = (this.orbitVelocity * this.orbitVelocity) / orbitRadius;

    let accelerationVector = new three.Vector2()
      .subVectors(this.orbitCenter, this.location)
      .setLength(accelerationScalar);
    this.acceleration.copy(accelerationVector);

    super.updateMovement(seconds);
  }
}
