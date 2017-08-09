// Based on https://raw.githubusercontent.com/mrdoob/three.js/master/examples/js/Detector.js

import { Injectable } from '@angular/core';

interface GLWindow extends Window {
  CanvasRenderingContext2D: CanvasRenderingContext2D;
  WebGLRenderingContext: WebGLRenderingContext;
}


@Injectable()
export class WebGLSupportService {
  private glWindow = <GLWindow>window;

  hasCanvasRenderingContext2D() {
    return this.glWindow.CanvasRenderingContext2D;
  }

  getWebGLRenderingContextSupport() {
    return {
      browser: this.getBrowserSupport(),
      gpu: this.getGPUSupport(),
    }
  }

  private getBrowserSupport() {
    return !!this.glWindow.WebGLRenderingContext;
  }

  private getGPUSupport() {
    try {
      var canvas = document.createElement( 'canvas' );
      return !!(this.glWindow.WebGLRenderingContext && ( canvas.getContext( 'webgl' ) || canvas.getContext( 'experimental-webgl' )));
    } catch (e) {
      return false;
    }
  }
}
