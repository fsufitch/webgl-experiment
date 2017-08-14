import { NgModule } from '@angular/core';

import { CommonModule } from '../common';
import { GameCanvasComponent, GameCanvasService } from './game-canvas';
import {
  KeyboardControlService,
  gameInputControlsFactory,
  GameInputControlServices,
  GameControlsDebugComponent,
} from './game-controls';
import { PlayerService } from './player.service';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    GameCanvasComponent,
    GameControlsDebugComponent,
  ],
  providers: [
    GameCanvasService,
    KeyboardControlService,
    PlayerService,
    {
      provide: GameInputControlServices,
      deps: [KeyboardControlService],
      useFactory: (keyboard: KeyboardControlService) => [keyboard],
    },
  ],
  exports: [
    GameCanvasComponent,
    GameControlsDebugComponent,
  ],
})
export class GameEngineModule {}
