import * as three from 'three';
import { BehaviorSubject, Subject } from 'rxjs/Rx';
import * as moment from 'moment';

export abstract class Thing {
  velocity = new three.Vector2();
  acceleration = new three.Vector2();
  protected positionTimestamp: moment.Moment;

  private objects: three.Object3D[] = [];
  private objectAdded$ = new Subject<three.Object3D>();
  private objectRemoved$ = new Subject<three.Object3D>();
  protected locationUpdated$ = new BehaviorSubject(
    new three.Vector3(this.location.x, this.location.y)
  );

  constructor(public location: three.Vector2) {
    this.positionTimestamp = moment();
  }

  getObjects() {
    return this.objects.slice();
  }

  protected addObject(o: three.Object3D) {
    this.objects.push(o);
    this.objectAdded$.next(o);
  }

  protected removeObject(o: three.Object3D) {
    this.objects.filter(x => x !== o);
    this.objectRemoved$.next(o);
  }

  animateToTimestamp(newTimestamp: moment.Moment) {
    let timeDelta = newTimestamp.diff(this.positionTimestamp, 'milliseconds') / 1000;
    this.updateMovement(timeDelta);
    this.updateAnimation(timeDelta);
    this.positionTimestamp = newTimestamp;
  }

  protected updateMovement(seconds: number) {
    let velocityDelta = this.acceleration.multiplyScalar(seconds);
    let newVelocity = this.velocity.add(velocityDelta);

    // v0 * dt + 1/2 * a * dt^2
    let locationDeltaVelocity = this.velocity.multiplyScalar(seconds);
    let locationDeltaAcceleration = this.acceleration.multiplyScalar(0.5 * seconds * seconds);
    let newLocation = this.location.add(locationDeltaVelocity).add(locationDeltaAcceleration);

    [this.location, this.velocity] = [newLocation, newVelocity]
    this.locationUpdated$.next(new three.Vector3(this.location.x, this.location.y));
  }

  protected updateAnimation(seconds: number) {}

  collidesWith(other: Thing) {
    let actualDistance = this.location.distanceTo(other.location)
    let collisionDistance = this.getCollisionRadius() + other.getCollisionRadius();
    return actualDistance <= collisionDistance;
  }

  destroy() {
    this.objectAdded$.complete();
    this.objectRemoved$.complete();
  }

  getObjectAdded = () => this.objectAdded$.asObservable();
  getObjectRemoved = () => this.objectRemoved$.asObservable();

  abstract getCollisionRadius(): number
}
