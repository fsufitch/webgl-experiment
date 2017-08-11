import { NgModule } from '@angular/core';

import { CommonModule } from '../common';
import { GameEngineModule } from '../engine';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    CommonModule,
    GameEngineModule,
  ],
  declarations: [
    AppComponent,
  ],
  bootstrap: [
    AppComponent,
  ]
})
export class AppModule {}
