import * as three from 'three';

import { Component, ElementRef, ViewChild, OnInit, Input } from '@angular/core';
import { GameCanvasService } from './game-canvas.service';

@Component({
  selector: 'game-canvas',
  template: '<p *ngIf="loading">Loading canvas...</p>',
  styles: [`
    canvas {
      top: 0; left: 0; right: 0; bottom: 0;
    }
  `]
})
export class GameCanvasComponent implements OnInit {
  @ViewChild('loading') private loadingText: ElementRef;

  @Input() aspectWidth: string;
  @Input() aspectHeight: string;

  constructor(
    private element: ElementRef,
    private gameCanvasService: GameCanvasService,
  ) {}

  private camera: three.Camera;
  private renderer = new three.WebGLRenderer({antialias: true});
  private scene$ = this.gameCanvasService.getSceneUpdates();
  private loading = true;

  ngOnInit() {
    let aspectRatio = parseFloat(this.aspectWidth) / parseFloat(this.aspectHeight);

    this.camera = new three.PerspectiveCamera(75, aspectRatio, 0.1, 1000);
    this.camera.translateZ(5);
    this.camera.lookAt(new three.Vector3());

    this.resizeRenderer(true);

    (<HTMLElement>this.element.nativeElement).appendChild(this.renderer.domElement);
    this.loading = false;

    this.scene$.subscribe(scene => {
      this.resizeRenderer();
      this.renderer.render(scene, this.camera);
    });
  }

  private resizeRenderer(force=false) {
    let canvas = this.renderer.domElement;
    let contWidth = (<HTMLElement>this.element.nativeElement).clientWidth;
    let contHeight = (<HTMLElement>this.element.nativeElement).clientHeight;

    let { width, height } = this.gameCanvasService.letterBoxFit(
      {width: contWidth, height: contHeight},
      {width: parseFloat(this.aspectWidth), height: parseFloat(this.aspectHeight)},
    );

    // adjust displayBuffer size to match
    if (force || canvas.width !== width || canvas.height !== height) {
      // you must pass false here or three.js sadly fights the browser
      this.renderer.setSize(width, height, false);
    }
  }
}
