import { NgModule } from '@angular/core';

import { CommonModule } from '../common';
import { GameCanvasComponent, GameCanvasService } from './game-canvas';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    GameCanvasComponent,
  ],
  providers: [
    GameCanvasService,
  ],
  exports: [
    GameCanvasComponent,
  ],
})
export class GameEngineModule {}
