import { Scene } from "@babylonjs/core";
import { MenuView } from "./MenuView";
import { MenuController } from "./MenuController";
import { AdvancedDynamicTexture } from "@babylonjs/gui";

import { isNil } from 'lodash';

export class MenuManager {
    Scene: Scene;

    MenuView: MenuView;
    MenuController: MenuController;

    constructor(scene: Scene){
        this.Scene = scene;
        this.MenuView = new MenuView();
        this.MenuController = new MenuController();
    }

    onGuiChanged(guiButton, dynamicTexture: AdvancedDynamicTexture){
        if (isNil(guiButton)) return console.log('guiButton is null or undefined');

        const {
            renderButtons,
            buttonValues,
        } = guiButton;

        console.log('guiButton', guiButton);
        
        this.MenuView.render(renderButtons, dynamicTexture)
        
    }

    private async onMount(){

    }
}