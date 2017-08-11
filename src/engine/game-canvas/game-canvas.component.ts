import * as three from 'three';

import { Component, ElementRef, ViewChild, OnInit, Input } from '@angular/core';
import { GameCanvasService } from './game-canvas.service';

@Component({
  selector: 'game-canvas',
  template: '<p #loading>Loading canvas...</p>',
})
export class GameCanvasComponent implements OnInit {
  @ViewChild('loading') private loadingText: ElementRef;

  @Input() width: number;
  @Input() height: number;

  constructor(
    private element: ElementRef,
    private gameCanvasService: GameCanvasService,
  ) {}

  private camera: three.Camera;
  private renderer = new three.WebGLRenderer({antialias: true});
  private scene$ = this.gameCanvasService.getSceneUpdates();

  ngOnInit() {
    let aspectRatio = parseFloat('' + this.width) / this.height;

    this.camera = new three.PerspectiveCamera(75, aspectRatio, 0.1, 1000);
    this.camera.translateZ(5);
    this.camera.lookAt(new three.Vector3());

    this.renderer.setSize(this.width, this.height);

    (<HTMLElement>this.element.nativeElement).appendChild(this.renderer.domElement);
    (<HTMLElement>this.loadingText.nativeElement).remove();

    this.scene$.subscribe(scene => {
      this.renderer.render(scene, this.camera);
    })
  }
}
