import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { GameInputControlServices, GameInputService } from './game-controls';

@Injectable()
export class PlayerService {
  constructor(@Inject(GameInputControlServices) private controlServices: GameInputService[]) {}

  private moveNorth$ = Observable.merge(...this.controlServices.map(s => s.getMoveNorth()));
  private moveWest$ = Observable.merge(...this.controlServices.map(s => s.getMoveWest()));
  private moveSouth$ = Observable.merge(...this.controlServices.map(s => s.getMoveSouth()));
  private moveEast$ = Observable.merge(...this.controlServices.map(s => s.getMoveEast()));

  listen() {
    this.moveNorth$.subscribe(n => {
      console.log('moving north:', n);
    });
  }
}
