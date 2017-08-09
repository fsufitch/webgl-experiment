import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';

import { PROVIDERS } from './services';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
  ],
  providers: [
    ...PROVIDERS,
  ],
  exports: [
    BrowserModule,
    HttpModule,
  ],
})
export class CommonModule {}
