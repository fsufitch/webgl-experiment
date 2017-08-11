import * as three from 'three';
import * as moment from 'moment';
import { Thing } from './abstract-thing';

const RAD_PER_SECOND = Math.PI / 4;

export class SampleCube extends Thing {
  private geometry: three.BoxGeometry;
  private solidCube: three.Mesh;
  private wireCube: three.Mesh;

  constructor(location: three.Vector2, public sideLength: number, public color: three.Color) {
    super(location);

    this.geometry = new three.BoxGeometry(sideLength, sideLength, sideLength);

    this.solidCube = new three.Mesh(this.geometry,
      new three.MeshBasicMaterial( { color: color.getHex() } )
    );
    this.addObject(this.solidCube);

    this.wireCube = new three.Mesh(this.geometry,
      new three.MeshBasicMaterial( {wireframe: true, color: 0xffffff} )
    );
    this.addObject(this.wireCube);

    this.locationUpdated$.subscribe(loc => {
      this.solidCube.position.copy(loc);
      this.wireCube.position.copy(loc);
    })
  }

  updateAnimation(seconds: number) {
    let deltaRotation = seconds * RAD_PER_SECOND;
    this.solidCube.rotation.x += deltaRotation;
    this.solidCube.rotation.y += deltaRotation;
    this.wireCube.rotation.copy(this.solidCube.rotation);
  }

  getCollisionRadius() {
    return Math.sqrt(3 * this.sideLength * this.sideLength);
  }
}
