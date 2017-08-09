import * as three from 'three';

import { Component, ElementRef, ViewChild, OnInit, Input } from '@angular/core';

@Component({
  selector: 'cube-canvas',
  template: '<p #loading>Loading canvas...</p>',
})
export class CubeCanvasComponent implements OnInit {
  @ViewChild('loading') private loadingText: ElementRef;

  @Input() width: number;
  @Input() height: number;

  constructor(private element: ElementRef) {}

  private scene: three.Scene;
  private camera: three.Camera;
  private renderer: three.Renderer;


  ngOnInit() {
    let aspectRatio = parseFloat('' + this.width) / this.height;

    this.scene = new three.Scene();
    this.camera = new three.PerspectiveCamera(75, aspectRatio, 0.1, 1000);
    this.renderer = new three.WebGLRenderer({antialias: true});

    this.renderer.setSize(this.width, this.height);

    (<HTMLElement>this.element.nativeElement).appendChild(this.renderer.domElement);
    (<HTMLElement>this.loadingText.nativeElement).remove();
    this.render();
  }

  render() {
    let geometry = new three.BoxGeometry( 1, 1, 1 );

    let solidMaterial = new three.MeshBasicMaterial( { color: 0x000088 } );
    let solidCube = new three.Mesh(geometry, solidMaterial);
    this.scene.add( solidCube );

    let edgeMaterial = new three.MeshBasicMaterial( {wireframe: true, color: 0xffffff} );
    let edgeCube = new three.Mesh(geometry, edgeMaterial);
    this.scene.add(edgeCube);

    this.camera.position.z = 5;

    var animate = () => {
      requestAnimationFrame( animate );

      edgeCube.rotation.x = solidCube.rotation.x += 0.05;
      edgeCube.rotation.y = solidCube.rotation.y += 0.05;

      this.renderer.render(this.scene, this.camera);
    };

    animate();
  }
}
