import { OpaqueToken } from '@angular/core';
import { Observable } from 'rxjs/Observable';

export interface GameInputService {
  getMoveNorth(): Observable<boolean>;
  getMoveWest(): Observable<boolean>;
  getMoveEast() : Observable<boolean>;
  getMoveSouth(): Observable<boolean>;
}

export const GameInputControlServices = new OpaqueToken('GameInputControlServices');
