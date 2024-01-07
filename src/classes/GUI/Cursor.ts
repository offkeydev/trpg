import { Scene } from "@babylonjs/core";
import { Image, AdvancedDynamicTexture, Button, Control } from "@babylonjs/gui";
import { Helper } from "../Helper";

import { GUIData } from '../../constants/GUI/interfaces';

const CURSOR_WIDTH = '18px';
const CURSOR_HEIGHT = '14px';

export class Cursor {
    Scene: Scene;

    _isMovable: boolean;

    _cursorImage: Image;
    
    _cursorIndex: number = 0;
    
    _menuElements: Control[];
    
    _dynamicTexture: AdvancedDynamicTexture;

    constructor(scene: Scene){
        this.Scene = scene;

        this.init();
    }

    // Trigger when GUIManager GUI changed
    async onGuiChanged(isControlsAvailable: boolean, advancedDynamicTexture: AdvancedDynamicTexture) {
        this._dynamicTexture = advancedDynamicTexture;

        if (isControlsAvailable) {
            this.show();
        } else {
            this.hide();
        }

        await this.render();
    }

    init(){
        const image = new Image('cursor', './assets/textures/gui/cursor.svg');
        image.width = CURSOR_WIDTH;
        image.height = CURSOR_HEIGHT;

        this._cursorImage = image;
    }

    private async render(){
        const position = await this.getCursorPosition();

        this._cursorImage.top = position.top;
        this._cursorImage.left = position.left;

        this._dynamicTexture.addControl(this._cursorImage);

        this.highlightMenuElements();
    }

    hide() {
        this._isMovable = false;

        this._cursorImage.alpha = 0;
    }

    show() {
        this._isMovable = true;

        this._cursorImage.alpha = 1;

    }

    async move(index: number  = 0) {
        if (!this._isMovable) return false;

        const position = await this.getCursorPosition(index);

        this._cursorImage.top = position.top;

        this.highlightMenuElements(index);
    }

    private async getCursorPosition(index: number = 0) : Promise<{ top: string; left: string; }> {
        const menuElements = await Helper.getGuiMenuElements(this._dynamicTexture);
        const menuItem = menuElements[index];

        if (!menuItem) {
            return {
                top: '0',
                left: '0',
            }
        }

        return {
            top: `${menuItem.top}`,
            left: `-${(Number.parseInt(`${menuItem.width}`) / 2) + 12}px`,
        }
    }


    private async highlightMenuElements(index: number  = 0) {
        const menuElements = await Helper.getGuiMenuElements(this._dynamicTexture);

        menuElements.forEach((element, i) => {
            index === i ? element.color = '#ffffff' : element.color = '#A1A1A1'
        });
    }
}