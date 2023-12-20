import '@babylonjs/inspector';
import '@babylonjs/loaders/glTF';
import {
  Engine,
  Scene,
} from '@babylonjs/core';

export class EngineManager {
  _canvas: HTMLCanvasElement;
  _engine: Engine;

  constructor() {
    this._canvas = this.createCanvas();
    this._engine = new Engine(this._canvas, true, {
      preserveDrawingBuffer: true,
      stencil: true,
      disableWebGL2Support: false,
    })
  }

  async startRenderLoop(scene: Scene) {
    this._engine.runRenderLoop(() => {
      scene.render();
    })
  }

  async pauseRenderLoop(scene: Scene) {

  }

  async stopRenderLoop(scene: Scene) {

  }

  async main(){
    window.addEventListener('resize', () => {
      this._engine.resize();
    });
  }

  createCanvas(){
    const canvas = document.createElement('canvas');

    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.id = 'canvas-main';

    document.body.appendChild(canvas);

    canvas.dataset.sceneSettings = JSON.stringify({
      sceneType: 'GUI',
    })

    return canvas;
  }
}

