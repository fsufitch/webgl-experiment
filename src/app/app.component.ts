import * as three from 'three';
import { Component, ViewChild, OnInit } from '@angular/core';

import { WebGLSupportService } from '../common';
import { GameCanvasService, SampleCube } from '../engine';

@Component({
  selector: 'ng2app',
  template: require('./app.component.html'),
  styles: [
    require('./app.component.scss'),
  ],
})
export class AppComponent implements OnInit {
  constructor(
    private webGLSupportService: WebGLSupportService,
    private gameCanvasService: GameCanvasService,
  ) {}

  private webGLSupportCategories = this.webGLSupportService.getWebGLRenderingContextSupport();
  hasBrowserSupport = this.webGLSupportCategories.browser;
  hasGPUSupport = this.webGLSupportCategories.gpu;
  hasWebGLSupport = this.hasGPUSupport && this.hasBrowserSupport;

  ngOnInit() {
    this.gameCanvasService.addThing(new SampleCube(new three.Vector2(-1, -1), 1, new three.Color('red')));
    this.gameCanvasService.addThing(new SampleCube(new three.Vector2(-1, 1), 1, new three.Color('green')));
    this.gameCanvasService.addThing(new SampleCube(new three.Vector2(1, -1), 1, new three.Color('blue')));
    this.gameCanvasService.addThing(new SampleCube(new three.Vector2(1, 1), 1, new three.Color('black')));

    this.gameCanvasService.runAnimationLoop();
  }
}
