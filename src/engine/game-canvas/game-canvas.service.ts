import * as three from 'three';
import * as moment from 'moment';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Thing } from '../world';
import { WidthHeightTuple } from './width-height-tuple.type';

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

  letterBoxFit(frame: WidthHeightTuple, aspect: WidthHeightTuple): WidthHeightTuple {
    let whRatio = (t: WidthHeightTuple) => t.width / t.height;
    let result: WidthHeightTuple = {width: 0, height: 0};

    if (whRatio(frame) < whRatio(aspect)) {
      result.width = frame.width;
      result.height = frame.width / aspect.width * aspect.height;
    } else if (whRatio(frame) > whRatio(aspect)) {
      result.width = frame.height / aspect.height * aspect.width;
      result.height = frame.height;
    } else {
      result.width = frame.width;
      result.height = frame.height;
    }
    
    return result;
  }

}
