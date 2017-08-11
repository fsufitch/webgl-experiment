import * as three from 'three';
import * as moment from 'moment';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Thing } from '../world';

@Injectable()
export class GameCanvasService {
  private scene = new three.Scene();
  private sceneUpdates$ = new BehaviorSubject(this.scene);
  private running = false;
  private things: Thing[] = [];

  getSceneUpdates = () => this.sceneUpdates$.asObservable();

  runAnimationLoop() {
    if (this.running) {
      throw 'Animation loop already running!';
    }
    this.running = true;

    let renderFrame = (timestampMs: number) => {
      requestAnimationFrame(renderFrame);
      this.things.forEach(t => t.animateToTimestamp(moment()));
      this.sceneUpdates$.next(this.scene);
    }
    requestAnimationFrame(renderFrame);
  }

  addThing(t: Thing) {
    this.scene.add(...t.getObjects());
    t.getObjectAdded().subscribe(o => this.scene.add(o));
    t.getObjectRemoved().subscribe(o => this.scene.remove(o));

    this.things.push(t);
    this.sceneUpdates$.next(this.scene);
  }

  removeThing(t: Thing) {
    t.getObjects().forEach(o => this.scene.remove(o));
    this.things = this.things.filter(t2 => t2 !== t);
    this.sceneUpdates$.next(this.scene);
  }
}
