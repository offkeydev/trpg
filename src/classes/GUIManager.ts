import { AdvancedDynamicTexture, Button, TextBlock, Control, Image } from "@babylonjs/gui";
import { Engine, Scene } from "@babylonjs/core";

const DIRECTION_KEYBOARD_BUTTONS = ['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight'];
const KEYBOARD_ACTION_BUTTONS = ['Enter'];

const DIRECTION_GAMEPAD_BUTTONS = ['12','13','14','15'];
const GAMEPAD_ACTION_BUTTONS = ['1'];

import {
  MAIN_LOADING,
  GUI_CHOOSE_CONTROLS,
  GUI_USE_KEYBOARD,
  GUI_USE_CONTROLLER,
  GUI_CONNECT_CONTROLLER,
  GUI_START_GAME_MENU,
} from '../constants/GUITypes';

const GUI_CONTEXT_MENU = {
  [GUI_CHOOSE_CONTROLS]: {
    isControlsAvailable: true,
    activeIndex: 0,
    onConfirmChangeGUI: true,
    onConfirmChangeScene: false,
    guiButtonValues: [GUI_USE_KEYBOARD, GUI_CONNECT_CONTROLLER],
    guiButtons: [
      {
        name: 'button_use_keyboard',
        text: 'KEYBOARD',
        offset: 80
      },
      {
        name: 'button_use_controller',
        text: 'CONTROLLER',
        offset: 118
      }
    ]
  },

  [GUI_USE_KEYBOARD]: {
    isControlsAvailable: true,
    activeIndex: 0,
    onConfirmChangeGUI: true,
    onConfirmChangeScene: false,
    guiButtonValues: [GUI_START_GAME_MENU],
    guiButtons: [
      {
        name: 'button_done',
        text: 'DONE',
        offset: 80
      },
    ]
  },

  [GUI_CONNECT_CONTROLLER]: {
    isControlsAvailable: false,
    activeIndex: 0,
    onConfirmChangeGUI: true,
    onConfirmChangeScene: false,
  }
}


export class GUIManager {
  _scene: Scene;
  _engine: Engine;
  _currentDynamicTexture: AdvancedDynamicTexture;

  _guiType: string;

  _currentContextData;
  _activeMenuIndex: number = 0;
  _guiButtonValues: string[] = [];
  _guiButtons: { name: string, text: string, offset: number }[] = [];
  _isControlsAvailable: boolean = false;
  _onConfirmChangeGUI: boolean = false;
  _onConfirmChangeScene: boolean = false;

  _cursorImage: Image;

  globalSceneTypeChange: Function;
  globalGuiTypeChange: Function;

  constructor(scene: Scene, engine: Engine) {
    this._engine = engine;
    this._scene = scene;
  }

  set guiType(value: string) {
    this._guiType = value;
  }

  get guiType(){
    return this._guiType;
  }

  async init(
    guiType: string,
    adapterSceneTypeChange: Function,
    adapterGuiTypeChange: Function
  ){
    this._guiType = guiType;
    this.globalSceneTypeChange = adapterSceneTypeChange;
    this.globalGuiTypeChange = adapterGuiTypeChange;

    await this.setCurrentGuiData();

    await this.onChangeGuiType();
  }

  async setGuiType(value: string) {
    this.guiType = value;

    await this.setCurrentGuiData();

    await this.onChangeGuiType();
  }

  async onChangeGuiType() {
    await this.renderGuiDisplay();

    if (this._guiButtons) {
      await this.renderContextMenuButtons();
    }

    if (this._isControlsAvailable) {
      await this.renderContextMenuCursor();

      this.highlightActiveMenuItem();
    }
  }

  async setCurrentGuiData(){
    const {
      activeIndex,
      guiButtonValues,
      guiButtons,
      isControlsAvailable,
      onConfirmChangeGUI,
      onConfirmChangeScene,
    } = GUI_CONTEXT_MENU[this._guiType];

    console.log('this._guiType', this._guiType)
    console.log('GUI_CONTEXT_MENU[this._guiType]', GUI_CONTEXT_MENU[this._guiType])

    this._activeMenuIndex = activeIndex;
    this._guiButtons = guiButtons;
    this._guiButtonValues = guiButtonValues;
    this._isControlsAvailable = isControlsAvailable;
    this._onConfirmChangeGUI = onConfirmChangeGUI;
    this._onConfirmChangeScene = onConfirmChangeScene;
  }

  async renderGuiDisplay(){
    switch(this._guiType){
      case GUI_CHOOSE_CONTROLS: {
        this._GUI_ChooseControls();

        break;
      }

      case GUI_USE_KEYBOARD: {
        this._GUI_UseKeyboard();

        break;
      }

      case GUI_CONNECT_CONTROLLER: {
        this._GUI_ConnectController();

        break;
      }

      case GUI_START_GAME_MENU: {
        this._GUI_StartGame();

        break;
      }

      default: return console.log('GUI type is undefined');
    }
  }

  async renderContextMenuButtons(){
    this._guiButtons.forEach((button, index) => {
      const { name, text, offset } = button;

      let preparedButton = Button.CreateSimpleButton(name, text);

      preparedButton.height = '40px';
      preparedButton.width = '140px';
      preparedButton.fontFamily = 'Nova Square';
      preparedButton.fontSize = '16';
      preparedButton.color = '#A1A1A1';
      preparedButton.top = offset;
      preparedButton.thickness = 0;

      this._currentDynamicTexture.addControl(preparedButton);
    });
  }

  async renderContextMenuCursor(){
    const position = await this.getCursorPosition();

    const image = new Image('cursor', './assets/textures/gui/cursor.svg');
    image.width = "18px";
    image.height = "14px";
    image.top = position.top;
    image.left = position.left;

    this._cursorImage = image;

    this._currentDynamicTexture.addControl(image);
  }

  async getMenuElements(): Promise<Control[]>{
    return this._currentDynamicTexture.getDescendants()?.filter((menuItem) => menuItem instanceof Button);
  }

  async getCursorPosition(index: number = 0) : Promise<{ top: string; left: string; }> {
    const menuElements = await this.getMenuElements();
    const menuItem = menuElements[index];

    return {
      top: `${menuItem.top}`,
      left: `-${(Number.parseInt(`${menuItem.width}`) / 2) + 12}px`,
    }
  }

  unhighlightMenuItems(menuElements: Control[]){
    menuElements.forEach((item) => item.color = '#A1A1A1');
  }

  async highlightActiveMenuItem(index: number = 0){
    const menuElements = await this.getMenuElements();

    this.unhighlightMenuItems(menuElements);

    menuElements[index].color = '#FFFFFF'
  }

  async onControllerButtonPressed(sceneType: string, button: string){
    if ([...DIRECTION_KEYBOARD_BUTTONS, ...DIRECTION_GAMEPAD_BUTTONS].includes(button)){
      await this.updateIndexByDirection(button);

      await this.moveCursor();

      await this.highlightActiveMenuItem(this._activeMenuIndex);
    }

    if ([...KEYBOARD_ACTION_BUTTONS, ...GAMEPAD_ACTION_BUTTONS].includes(button)){
      await this.getActionTypeByButton(button);
    }
  }

  async updateIndexByDirection(button: string){
    switch (button) {
      case 'ArrowUp':
      case '12': {
        if (!this._activeMenuIndex) return

        this._activeMenuIndex -= 1;

        break;
      }

      case 'ArrowDown':
      case '13': {
        if (this._guiButtons.length - 1 === this._activeMenuIndex) return;

        this._activeMenuIndex += 1;

        break;
      }
    }
  }

  async getActionTypeByButton(button: string){
    const {
      _onConfirmChangeGUI,
      _onConfirmChangeScene,
      _activeMenuIndex,
      _guiButtonValues,
    } = this;

    switch (button) {
      case 'Enter':
      case '1': {
        if (_onConfirmChangeGUI){
          await this.setGuiType(_guiButtonValues[_activeMenuIndex]);
        }

        if (_onConfirmChangeScene){

        }

        break;
      }
    }
  }

  async moveCursor(){
    const updatedPosition = await this.getCursorPosition(this._activeMenuIndex);

    this._cursorImage.top = updatedPosition.top;
  }

  // GUI Screens
  async _GUI_ChooseControls(){
    this._currentDynamicTexture?.clear();
    this._currentDynamicTexture?.dispose();

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

    this._currentDynamicTexture = GUI_menu;
  }

  async _GUI_UseKeyboard(){
    this._currentDynamicTexture.clear();
    this._currentDynamicTexture.dispose();

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

    this._currentDynamicTexture = GUI_menu;
  }

  async _GUI_ConnectController(){
    this._currentDynamicTexture.clear();
    this._currentDynamicTexture.dispose();

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

    this._currentDynamicTexture = GUI_menu;
  }

  async _GUI_StartGame(){
    this._currentDynamicTexture?.clear();
    this._currentDynamicTexture?.dispose();

    const GUI_menu = AdvancedDynamicTexture.CreateFullscreenUI('game_start_menu');

    const title = new TextBlock('title', 'Turn based tactical RPG');
    title.resizeToFit = true;
    title.fontFamily = 'Nova Square';
    title.fontSize = '48';
    title.color = 'white';
    title.top = '-160';
    GUI_menu.addControl(title)

    const newGameBtn = new TextBlock('btn1', 'New Game');
    newGameBtn.fontFamily = 'Nova Square';
    newGameBtn.fontSize = '24';
    newGameBtn.color = 'white';
    newGameBtn.top = '0';
    GUI_menu.addControl(newGameBtn)

    const loadGameBtn = new TextBlock('btn2', 'Load Game');
    loadGameBtn.fontFamily = 'Nova Square';
    loadGameBtn.fontSize = '24';
    loadGameBtn.color = 'white';
    loadGameBtn.top = '42';
    GUI_menu.addControl(loadGameBtn)

    const settingsBtn = new TextBlock('btn3', 'Options');
    settingsBtn.fontFamily = 'Nova Square';
    settingsBtn.fontSize = '24';
    settingsBtn.color = 'white';
    settingsBtn.top = '84';
    GUI_menu.addControl(settingsBtn)

    this._currentDynamicTexture = GUI_menu;
  }

  async _GUI_loading(){
    this._currentDynamicTexture.clear();
    this._currentDynamicTexture.dispose();

    const GUI_loading = AdvancedDynamicTexture.CreateFullscreenUI('loading_gui');

    const title = new TextBlock('title', 'Loading...');
    title.resizeToFit = true;
    title.fontFamily = 'Nova Square';
    title.fontSize = '48';
    title.color = 'white';
    title.top = '0';

    GUI_loading.addControl(title)

    this._currentDynamicTexture = GUI_loading;


    // @ Replace with corret timeout
    return new Promise((resolve, reject) => setTimeout(() => resolve(true), 3000));
  }
    // GUI Screens END
}
