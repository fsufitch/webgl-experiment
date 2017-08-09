import { NgModule } from '@angular/core';

import { CommonModule } from '../common';
import { AppComponent } from './app.component';
import { CubeCanvasComponent } from './cube-canvas.component';

@NgModule({
  imports: [
    CommonModule,
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
