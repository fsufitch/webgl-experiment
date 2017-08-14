import { Component } from '@angular/core';
import { KeyboardControlService } from './keyboard.service';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'game-controls-debug',
  template: require('./game-controls-debug.component.html'),
  styles: [require('./game-controls-debug.component.scss')],
})
export class GameControlsDebugComponent {
  constructor(private keyboardControl: KeyboardControlService) {}

  private keyboardNorth$ = this.keyboardControl.getMoveNorth().map(x => x ? 'north' : '');
  private keyboardWest$ = this.keyboardControl.getMoveWest().map(x => x ? 'west' : '');
  private keyboardEast$ = this.keyboardControl.getMoveEast().map(x => x ? 'east' : '');
  private keyboardSouth$ = this.keyboardControl.getMoveSouth().map(x => x ? 'south': '');

  keyboardDisplay$ = Observable.combineLatest(this.keyboardNorth$, this.keyboardWest$, this.keyboardEast$, this.keyboardSouth$)
    .map(strings => strings.reduce((curr, next) => !! next ? [...curr, next] : curr, <string[]>[]))
    .map(strings => strings.join(', '));
}
