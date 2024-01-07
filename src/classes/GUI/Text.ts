import { Scene } from "@babylonjs/core";
import { GUIManager } from "./gui/GUIManager";
import { isEmpty } from 'lodash';
import { TextInterface } from '../../constants/GUI/interfaces'
import { AdvancedDynamicTexture, TextBlock } from "@babylonjs/gui";
import { isNil } from 'lodash';

// Need simple text
// Need animated text
// Need characters text

export class Text {
    Scene: Scene;

    _dinamicTexture: AdvancedDynamicTexture;

    // simple text 
    // _guiText: { name: string, text: string, offset: number }[] = [];

    // // text with animation show/hide
    // _guiAnimatedText: { name: string, text: string, offset: number }[][] = []

    // // characters dialog text 
    // _characterText: { name: string, text: string, offset: number }[] = [];

    constructor(scene: Scene) {
        this.Scene = scene;
    }

    

    // Trigger when GUIManager GUI changed
    async onGUIChanged(guiText, dynamicTexture: AdvancedDynamicTexture){
        if (isNil(guiText)) return console.log('guiText is null or undefined');

        this._dinamicTexture = dynamicTexture;

        await this.prepare(guiText);
    }

    async prepare(guiText: any){
        const { 
            simpleText = [],
            characrerText = [],
            simpleAnimatedText = [],
            anmimatedText = [],
        } = guiText;

        if (!isEmpty(simpleText)) {
            await this.render(simpleText);   
        }

    }

    private async render(text: TextInterface []){
        text.forEach(({
            name,
            text,
            offset,
        }, index) => {
            let textElement = new TextBlock(name, text);

            textElement.resizeToFit = true;
            textElement.fontFamily = 'Quantico';
            textElement.fontSize = '18';
            textElement.color = 'white';
            textElement.top = offset;
            textElement.alpha = 1;

            this._dinamicTexture.addControl(textElement);
        });
    }

    private async renderAnimated(){

    }

    private async renderCharacter(){
        
    }

}