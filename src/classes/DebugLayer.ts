import { Scene } from "@babylonjs/core";

export class DebugLayer {
  _scene: Scene;

  constructor(scene) {
    this._scene = scene;

    this.initListeners();
  }

  initListeners() {
    window.addEventListener('keydown', (ev) => {
      if (ev.shiftKey) {
        this._scene.debugLayer.isVisible() ? this.hideDebugLayer() : this.showDebugLayer();
      }
    });
  }

  hideDebugLayer(){
    this._scene.debugLayer.hide();
  }

  showDebugLayer(){
    this._scene.debugLayer.show();
  }
}
