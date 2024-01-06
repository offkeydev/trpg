import { AdvancedDynamicTexture, Button, TextBlock, Control, Image } from "@babylonjs/gui";
import { Engine, Scene, Animation, AnimationGroup } from "@babylonjs/core";
import { GUI_CONTEXT_MENU } from '../../constants/GUI/context';
import { GUIData, GUIMenuButton } from '../../constants/GUI/interfaces';
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
} from '../../constants/GUI/types';


const DIRECTION_KEYBOARD_BUTTONS = ['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight'];
const KEYBOARD_ACTION_BUTTONS = ['Enter'];

const DIRECTION_GAMEPAD_BUTTONS = ['12','13','14','15'];
const GAMEPAD_ACTION_BUTTONS = ['1'];


import { Text } from "./Text";
import { Cursor } from "./Cursor";


export class GUIManager {
  _scene: Scene;
  _engine: Engine;
  _dynamicTexture: AdvancedDynamicTexture;

  Text: Text;
  
  Cursor: Cursor;

  _guiType: string;

  _cursorImage: Image;

  _cursorIndex: number = 0;

  onSceneTypeChanged: Function;
  onGuiTypeChanged: Function;

  _GUIData: GUIData

  constructor(scene: Scene, engine: Engine) {
    this._engine = engine;
    this._scene = scene;

    this.Cursor = new Cursor(scene);
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
    
    //DEV
    //this._guiType = GUI_START_GAME_SCENE;

    this.onSceneTypeChanged = adapterSceneTypeChange;
    this.onGuiTypeChanged = adapterGuiTypeChange;

    await this.setCurrentGuiData();

    await this.onChangeGuiType();
  }

  async setGuiType(value: string) {
    this.guiType = value;

    await this.setCurrentGuiData();

    await this.onChangeGuiType();
  }

  async onChangeGuiType() {
    const {
      isControlsAvailable,
      guiButton,
      guiText,
     } = this._GUIData;

    await this.renderGuiDisplay();

    if (guiButton) {
      const { renderButtons } = guiButton;

      await this.renderContextMenuButtons(renderButtons);
    }

    if (guiText) {
      //await this.renderTextElements()
    }

    if (isControlsAvailable) {
      this.Cursor.show();
    } else {
      this.Cursor.hide();
    }
  }

  async setCurrentGuiData(){
    this._GUIData = GUI_CONTEXT_MENU[this._guiType];
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
        this._GUI_StartGameMenu();

        break;
      }

      case GUI_START_GAME_SCENE: {
        this._GUI_StartGame();

        break;
      }

      default: return console.log('GUI type is undefined');
    }

    await this.registerDynamicTextureListeners();
  }

  async registerDynamicTextureListeners(){
    this._dynamicTexture.onDisposeObservable.add((ev) => {
      console.log('GUI IS DISPOSED');
    });

    this._dynamicTexture.onEndRenderObservable.addOnce((ev) => {
      console.log('GUI IS RENDERED');

      this.Cursor.onGuiChanged(this._dynamicTexture);
    })
  }


  async renderContextMenuButtons(buttons: GUIMenuButton[]){
    if (!buttons) return console.log('button is undefined');

    buttons.forEach((button, index) => {
      const { name, text, offset } = button;

      let preparedButton = Button.CreateSimpleButton(name, text);

      preparedButton.height = '40px';
      preparedButton.width = '140px';
      preparedButton.fontFamily = 'Nova Square';
      preparedButton.fontSize = '16';
      preparedButton.color = '#A1A1A1';
      preparedButton.top = offset;
      preparedButton.thickness = 0;

      this._dynamicTexture.addControl(preparedButton);
    });
  }

  // async renderTextElements(){
  //   this._guiTextElements.forEach((textEl, index) => {

  //     const { name, text, offset } = textEl;

  //     let textElement = new TextBlock(name, text);

  //     textElement.resizeToFit = true;
  //     textElement.fontFamily = 'Quantico';
  //     textElement.fontSize = '18';
  //     textElement.color = 'white';
  //     textElement.top = offset;
  //     textElement.alpha = 0;

  //     this._currentDynamicTexture.addControl(textElement);

  //     if (this._isShowWithAnimation) {
  //       setTimeout(async () => {
  //         await this.showTextElements(textElement).then(() => {
  //           if (index === (this._guiTextElements.length - 1)) {
  //             setTimeout(() => { this.hideTextElements() }, 5000)
  //           }
  //         });
  //       },5000 * index)
  //     }
  //   });
  // }

  // async showTextElements(element: TextBlock){
  //   let animateVisible = new Animation('show_text', 'alpha', 30, Animation.ANIMATIONTYPE_FLOAT);
  //   const animationGroup = new AnimationGroup("my group");
    
  //   animateVisible.setKeys([
  //     {frame: 0, value: 0},
  //     {frame: 30, value: 1}
  //   ]);

  //   animationGroup.addTargetedAnimation(animateVisible, element);

  //   animationGroup.play(false)
  // }

  // async hideTextElements() {
  //   const elements = await this.getElementsByType('text');

  //   elements.forEach((el) => {
  //     let animateVisible = new Animation('hide_text', 'alpha', 30, Animation.ANIMATIONTYPE_FLOAT);
  //     var animationGroup = new AnimationGroup("my group");

  //     animateVisible.setKeys([
  //       {frame: 0, value: 1},
  //       {frame: 30, value: 0}
  //     ]);
  
  //     animationGroup.addTargetedAnimation(animateVisible, el);
  //     animationGroup.play(false)
  //   });
  // }

  // async renderContextMenuCursor(){
  //   const position = await this.getCursorPosition();

  //   const image = new Image('cursor', './assets/textures/gui/cursor.svg');
  //   image.width = "18px";
  //   image.height = "14px";
  //   image.top = position.top;
  //   image.left = position.left;

  //   this._cursorImage = image;

  //   this._dynamicTexture.addControl(image);

  //   console.log(this._scene.getTextureByName('choose_controller'));
  // }

  // unhighlightMenuItems(menuElements: Control[]){
  //   menuElements.forEach((item) => item.color = '#A1A1A1');
  // }

  // async highlightActiveMenuItem(index: number = 0){
  //   const menuElements = await this.getMenuElements();

  //   this.unhighlightMenuItems(menuElements);

  //   menuElements[index].color = '#FFFFFF'
  // }

  async onControllerButtonPressed(sceneType: string, button: string){
    if ([...DIRECTION_KEYBOARD_BUTTONS, ...DIRECTION_GAMEPAD_BUTTONS].includes(button)){
      
      await this.updateIndexByDirection(button);

      this.Cursor.move(this._cursorIndex);
    }

    if ([...KEYBOARD_ACTION_BUTTONS, ...GAMEPAD_ACTION_BUTTONS].includes(button)){
      await this.getActionTypeByButton(button);
    }
  }

  async updateIndexByDirection(button: string){
    const { _GUIData, _cursorIndex } = this
    const { guiButton } = _GUIData;

    switch (button) {
      case 'ArrowUp':
      case '12': {
        if (!this._cursorIndex) return

        this._cursorIndex -= 1;

        break;
      }

      case 'ArrowDown':
      case '13': {
        if (guiButton.renderButtons.length - 1 === this._cursorIndex) return;

        this._cursorIndex += 1;

        break;
      }
    }
  }

  async getActionTypeByButton(button: string){
    const { _GUIData, _cursorIndex } = this;

    const {
      onConfirmChangeGUI,
      onConfirmChangeScene,
      guiButton,
    } = _GUIData;

    switch (button) {
      case 'Enter':
      case '1': {
        if (onConfirmChangeGUI){
          await this.setGuiType(guiButton.buttonValues[_cursorIndex]);
        }

        if (onConfirmChangeScene){

        }

        break;
      }
    }
  }

  async moveCursor(){
    // const updatedPosition = await this.getCursorPosition(this._cursorIndex);

    // this._cursorImage.top = updatedPosition.top;
  }

  // GUI Screens
  async _GUI_ChooseControls(){
    this._dynamicTexture?.clear();
    this._dynamicTexture?.dispose();

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

    this._dynamicTexture = GUI_menu;
  }

  async _GUI_UseKeyboard(){
    this._dynamicTexture.clear();
    this._dynamicTexture.dispose();

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

    this._dynamicTexture = GUI_menu;
  }

  async _GUI_ConnectController(){
    this._dynamicTexture.clear();
    this._dynamicTexture.dispose();

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

    this._dynamicTexture = GUI_menu;
  }

  async _GUI_StartGameMenu(){
    this._dynamicTexture?.clear();
    this._dynamicTexture?.dispose();

    const GUI_menu = AdvancedDynamicTexture.CreateFullscreenUI('game_start_menu');

    const title = new TextBlock('title', 'Tactics Lore');
    title.resizeToFit = true;
    title.fontFamily = 'Nova Square';
    title.fontSize = '48';
    title.color = 'white';
    title.top = '-160';
    GUI_menu.addControl(title)

    this._dynamicTexture = GUI_menu;
  }

  async _GUI_loading(){
    this._dynamicTexture.clear();
    this._dynamicTexture.dispose();

    const GUI_loading = AdvancedDynamicTexture.CreateFullscreenUI('loading_gui');

    const title = new TextBlock('title', 'Loading...');
    title.resizeToFit = true;
    title.fontFamily = 'Nova Square';
    title.fontSize = '48';
    title.color = 'white';
    title.top = '0';

    GUI_loading.addControl(title)

    this._dynamicTexture = GUI_loading;


    // @ Replace with corret timeout
    return new Promise((resolve, reject) => setTimeout(() => resolve(true), 3000));
  }

  async _GUI_StartGame(){
    this._dynamicTexture?.clear();
    this._dynamicTexture?.dispose();

    const GUI_menu = AdvancedDynamicTexture.CreateFullscreenUI('game_started');

    this._dynamicTexture = GUI_menu;
  }
    // GUI Screens END
}
