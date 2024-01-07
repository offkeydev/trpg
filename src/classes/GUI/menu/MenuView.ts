import { AdvancedDynamicTexture, Button} from '@babylonjs/gui';
import { GUIMenuButton } from '../../../constants/GUI/interfaces';

export class MenuView {
    constructor(){

    }

    async render(menuElements: GUIMenuButton [], dynamicTexture: AdvancedDynamicTexture){
        menuElements.forEach(async (el) => {
            const { name, text, offset } = el;

            let menuItem = Button.CreateSimpleButton(name, text);
            menuItem.top = offset;

            await this.attachStyles(menuItem);
            
            dynamicTexture.addControl(menuItem);
        });
    }

    private async attachStyles(menuElement: Button){
        menuElement.height = '40px';
        menuElement.width = '140px';
        menuElement.fontFamily = 'Nova Square';
        menuElement.fontSize = '16';
        menuElement.color = '#A1A1A1';
        menuElement.thickness = 0;
    }
}