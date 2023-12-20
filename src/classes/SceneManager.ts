import { BATTLE_SCENE, GUI_SCENE } from "../constants/sceneTypes";
import { GUI_SCENE_COLOR } from '../constants/colors'
import {Color4, Engine, FreeCamera, Scene, Vector3} from "@babylonjs/core";

export class SceneManager {
  _canvas: HTMLCanvasElement;
  _scene: Scene;
  _sceneType: string;
  _engine: Engine;

  globalSceneTypeChange: Function;
  globalGuiTypeChange: Function;

  constructor(canvas: HTMLCanvasElement, engine: Engine) {
    this._canvas = canvas;
    this._engine = engine;
    this._scene = new Scene(this._engine);
  }

  set sceneType(value:string) {
    this._sceneType = value;

    this.onSceneTypeChange();
  }

  get sceneType(){
    return this._sceneType;
  }

  async init(
    sceneType: string,
    adapterSceneTypeChange: Function,
    adapterGuiTypeChange: Function
  ){
    this._sceneType = sceneType;
    this.globalSceneTypeChange = adapterSceneTypeChange;
    this.globalGuiTypeChange = adapterGuiTypeChange;

    await this.onSceneTypeChange();
  }

  async onSceneTypeChange(){
    switch (this.sceneType) {
      case GUI_SCENE: {
        await this._Scene_GUI();

        break;
      }

      case BATTLE_SCENE: {
        await this._Scene_Battle();

        break;
      }
    }
  }

  async _Scene_GUI(){
    this._engine.displayLoadingUI();
    this._scene.detachControl();

    let scene = new Scene(this._engine);
    scene.clearColor = new Color4(...GUI_SCENE_COLOR);

    let camera: FreeCamera = new FreeCamera("camera1", new Vector3(0, 0, 0), scene);
    camera.setTarget(Vector3.Zero());

    //await this.GUIManager.init();

    await scene.whenReadyAsync();
    this._engine.hideLoadingUI();
    this._scene.dispose();

    this._scene = scene;
  }

  async _Scene_Battle(){
    this._engine.displayLoadingUI();
    this._scene.detachControl();

    let scene = new Scene(this._engine);
    scene.clearColor = new Color4(0.33, 0.33, 0.66, 1);

    let camera: FreeCamera = new FreeCamera("camera1", new Vector3(0, 0, 0), scene);
    camera.setTarget(Vector3.Zero());

    await scene.whenReadyAsync();
    this._engine.hideLoadingUI();
    this._scene.dispose();
  
    this._scene = scene;
  }
}
