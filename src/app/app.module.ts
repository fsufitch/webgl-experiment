import { NgModule } from '@angular/core';

import { CommonModule } from '../common';
import { GameEngineModule } from '../engine';
import { AppComponent } from './app.component';
import { CubeCanvasComponent } from './cube-canvas.component';

@NgModule({
  imports: [
    CommonModule,
    GameEngineModule,
  ],
  declarations: [
    AppComponent,
    CubeCanvasComponent,
  ],
  bootstrap: [
    AppComponent,
  ]
})
export class AppModule {}
