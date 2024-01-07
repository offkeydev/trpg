import { Scene } from "@babylonjs/core";
import { AdvancedDynamicTexture, TextBlock } from "@babylonjs/gui";

import  {
    MAIN_LOADING,
    GUI_CHOOSE_CONTROLS,
    GUI_USE_KEYBOARD,
    GUI_USE_CONTROLLER,
    GUI_CONNECT_CONTROLLER,
    GUI_START_GAME_MENU,
    GUI_MENU_SETTINGS,
    GUI_START_GAME_SCENE,
    GUI_MENU_LOAD_GAME,
  } from '../../../constants/GUI/types';

export class GUIView {
    Scene: Scene;

    dynamicTexture: AdvancedDynamicTexture;

    constructor(scene: Scene){
        this.Scene = scene;
        this.dynamicTexture = AdvancedDynamicTexture.CreateFullscreenUI('view')
    }

    async renderView(guiType: string) {
        switch(guiType){
            case GUI_CHOOSE_CONTROLS: {
            this.view_ChooseControls();

            break;
        }

        case GUI_USE_KEYBOARD: {
            this.view_UseKeyboard();

            break;
        }

        case GUI_CONNECT_CONTROLLER: {
            this.view_ConnectController();

            break;
        }

        case GUI_START_GAME_MENU: {
            this.view_StartGameMenu();

            break;
        }

        case GUI_START_GAME_SCENE: {
            this.view_StartGame();

            break;
        }

            default: return console.log('GUI type is undefined');
        }
    }

    async view_ChooseControls(){
        this.dynamicTexture?.clear();
        this.dynamicTexture?.dispose();
    
        const GUI_menu = AdvancedDynamicTexture.CreateFullscreenUI('choose_controller');
    
        const title = new TextBlock('title', 'CONTROLS SETTINGS');
        title.resizeToFit = true;
        title.fontFamily = 'Quantico';
        title.fontSize = '48';
        title.color = 'white';
        title.top = '-240';
        GUI_menu.addControl(title)
    
        const text = new TextBlock('text', 'You can use a keyboard or connect remote controller via Bluetooth or USB')
        text.resizeToFit = true;
        text.fontFamily = 'Quantico';
        text.fontSize = '18';
        text.color = 'white';
        text.top = '-120';
        GUI_menu.addControl(text);
    
        const text2 = new TextBlock('text 2', 'We recommend use a remote controller (PlayStation DaulShock or DualSense )');
        text2.resizeToFit = true;
        text2.fontFamily = 'Quantico';
        text2.fontSize = '18';
        text2.color = 'white';
        text2.top = '-80';
        GUI_menu.addControl(text2);
    
        const text3 = new TextBlock('text 3', 'You can change it in any time in game menu options');
        text3.resizeToFit = true;
        text3.fontFamily = 'Quantico';
        text3.fontSize = '18';
        text3.color = 'white';
        text3.top = '-40';
        GUI_menu.addControl(text3);
    
        this.dynamicTexture = GUI_menu;
    }
    
    async view_UseKeyboard(){
        this.dynamicTexture.clear();
        this.dynamicTexture.dispose();

        const GUI_menu = AdvancedDynamicTexture.CreateFullscreenUI('keyboard_selected');

        const title = new TextBlock('title', 'Keyboard selected ');
        title.resizeToFit = true;
        title.fontFamily = 'Quantico';
        title.fontSize = '56';
        title.color = 'white';
        title.top = '-240';
        GUI_menu.addControl(title)

        const text = new TextBlock('text', 'You can change it in any time in game menu options')
        text.resizeToFit = true;
        text.fontFamily = 'Quantico';
        text.fontSize = '18';
        text.color = 'white';
        text.top = '-120';
        GUI_menu.addControl(text);

        this.dynamicTexture = GUI_menu;
    }

    async view_ConnectController(){
    this.dynamicTexture.clear();
    this.dynamicTexture.dispose();

    const GUI_menu = AdvancedDynamicTexture.CreateFullscreenUI('connect_controller');

    const title = new TextBlock('title', 'Await for connecting controller...');
    title.resizeToFit = true;
    title.fontFamily = 'Quantico';
    title.fontSize = '48';
    title.color = 'white';
    title.top = '-240';
    GUI_menu.addControl(title)

    const text = new TextBlock('text', 'Connect remote controller via Bluetooth or USB')
    text.resizeToFit = true;
    text.fontFamily = 'Quantico';
    text.fontSize = '18';
    text.color = 'white';
    text.top = '-120';
    GUI_menu.addControl(text);

    this.dynamicTexture = GUI_menu;
    }
    
    async view_StartGameMenu(){
    this.dynamicTexture?.clear();
    this.dynamicTexture?.dispose();

    const GUI_menu = AdvancedDynamicTexture.CreateFullscreenUI('game_start_menu');

    const title = new TextBlock('title', 'Tactics Lore');
    title.resizeToFit = true;
    title.fontFamily = 'Nova Square';
    title.fontSize = '48';
    title.color = 'white';
    title.top = '-160';
    GUI_menu.addControl(title)

    this.dynamicTexture = GUI_menu;
    }
    
    async view_loading(){
    this.dynamicTexture.clear();
    this.dynamicTexture.dispose();

    const GUI_loading = AdvancedDynamicTexture.CreateFullscreenUI('loading_gui');

    const title = new TextBlock('title', 'Loading...');
    title.resizeToFit = true;
    title.fontFamily = 'Nova Square';
    title.fontSize = '48';
    title.color = 'white';
    title.top = '0';

    GUI_loading.addControl(title)

    this.dynamicTexture = GUI_loading;


    // @ Replace with corret timeout
    return new Promise((resolve, reject) => setTimeout(() => resolve(true), 3000));
    }
    
    async view_StartGame(){
    this.dynamicTexture?.clear();
    this.dynamicTexture?.dispose();

    const GUI_menu = AdvancedDynamicTexture.CreateFullscreenUI('game_started');

    this.dynamicTexture = GUI_menu;
    }
}