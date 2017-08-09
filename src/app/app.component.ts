import { Component } from '@angular/core';

import { WebGLSupportService } from '../common';
import { CubeCanvasComponent } from './cube-canvas.component';

@Component({
  selector: 'ng2app',
  template: require('./app.component.html'),
  styles: [
    require('./app.component.scss'),
  ],
})
export class AppComponent {
  constructor(private webGLSupportService: WebGLSupportService) {}

  private webGLSupportCategories = this.webGLSupportService.getWebGLRenderingContextSupport();
  hasBrowserSupport = this.webGLSupportCategories.browser;
  hasGPUSupport = this.webGLSupportCategories.gpu;
  hasWebGLSupport = this.hasGPUSupport && this.hasBrowserSupport;
}
