import { Scene } from "@babylonjs/core";

export class GUIController {
    Scene: Scene;

    constructor(scene: Scene){
        this.Scene = scene;
    }
}