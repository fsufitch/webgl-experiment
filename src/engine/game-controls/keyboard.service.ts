import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { GameInputService } from './game-input.types';

export class KeyboardControlService implements GameInputService {
  private keyDown$: Observable<KeyboardEvent> = Observable.fromEvent(window, 'keydown');
  private keyUp$: Observable<KeyboardEvent> = Observable.fromEvent(window, 'keyup');

  private static createToggleKeyBinding(
    toggleOn: Observable<KeyboardEvent>,
    toggleOff: Observable<KeyboardEvent>,
    codeFilter: string,
    onEventType: string,
    offEventType: string,
  ) {
    return Observable.merge(toggleOn, toggleOff)
      .filter(ev => ev.code == codeFilter)
      .map(ev => {
        if (ev.type == onEventType) {
          return true;
        } else if (ev.type == offEventType) {
          return false;
        } else {
          throw `Unknown event type ${ev.type}`;
        }
      })
      .distinctUntilChanged();
  }

  private moveNorth$ = Observable.concat(
    Observable.of(false),
    KeyboardControlService.createToggleKeyBinding(this.keyDown$, this.keyUp$, 'KeyW', 'keydown', 'keyup'),
  );

  private moveWest$ = Observable.concat(
    Observable.of(false),
    KeyboardControlService.createToggleKeyBinding(this.keyDown$, this.keyUp$, 'KeyA', 'keydown', 'keyup'),
  );

  private moveEast$ = Observable.concat(
    Observable.of(false),
    KeyboardControlService.createToggleKeyBinding(this.keyDown$, this.keyUp$, 'KeyD', 'keydown', 'keyup'),
  );

  private moveSouth$ = Observable.concat(
    Observable.of(false),
    KeyboardControlService.createToggleKeyBinding(this.keyDown$, this.keyUp$, 'KeyS', 'keydown', 'keyup'),
  );

  getMoveNorth() { return this.moveNorth$; }
  getMoveWest() { return this.moveWest$; }
  getMoveEast() { return this.moveEast$; }
  getMoveSouth() { return this.moveSouth$; }
}
