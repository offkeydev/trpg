import {ArcRotateCamera, FreeCamera, Scene, Vector3} from "@babylonjs/core";
import {GUI_CAMERA_TYPE} from "../constants/cameraTypes";

export class CameraManager {
  _canvas;
  _scene;

  constructor(canvas, scene) {
    this._canvas = canvas;
    this._scene = scene;

   // this.init();
  }

  async init(){
  }

  async _Camera_GUI(scene: Scene){
    let camera: FreeCamera = new FreeCamera('camera1', new Vector3(0, 0, 0), scene);
    camera.setTarget(Vector3.Zero());
  }

  async _Camera_Battle(){
    const camera: ArcRotateCamera = new ArcRotateCamera(GUI_CAMERA_TYPE, Math.PI / 2, Math.PI / 2, 2, Vector3.Zero(), this._scene);
    camera.attachControl(this._canvas, true);
  }
}
