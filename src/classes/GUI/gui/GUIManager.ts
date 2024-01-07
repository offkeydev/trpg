import { AdvancedDynamicTexture, Button, TextBlock, Control, Image } from "@babylonjs/gui";
import { Engine, Scene, Animation, AnimationGroup } from "@babylonjs/core";
import { GUI_CONTEXT_MENU } from '../../../constants/GUI/context';
import { GUIData, GUIMenuButton } from '../../../constants/GUI/interfaces';


import {
   DIRECTION_KEYBOARD_BUTTONS,
   DIRECTION_GAMEPAD_BUTTONS,
   KEYBOARD_ACTION_BUTTONS,
   GAMEPAD_ACTION_BUTTONS,
} from '../../../constants/controls'


import { Text } from "../Text";
import { Cursor } from "../Cursor";
import { GUIView } from "./GUIView";
import { GUIController } from "./GUIController";
import { MenuManager } from "../menu/MenuManager";


export class GUIManager {
  Scene: Scene;
  Engine: Engine;
  Text: Text;
  Cursor: Cursor;

  GUIView: GUIView;
  GUIController: GUIController;

  MenuManager: MenuManager;

  onSceneTypeChanged: Function;
  onGuiTypeChanged: Function;

  guiType: string;

  _cursorIndex: number = 0;

  guiData: GUIData

  constructor(scene: Scene, engine: Engine) {
    this.Engine = engine;
    this.Scene = scene;
    
    this.GUIView = new GUIView(scene);
    this.GUIController = new GUIController(scene);
    this.MenuManager = new MenuManager(scene);

    this.Cursor = new Cursor(scene);
    this.Text = new Text(scene);
  }

  async init(
    guiType: string,
    adapterSceneTypeChange: Function,
    adapterGuiTypeChange: Function
  ){
    this.guiType = guiType;
    this.onSceneTypeChanged = adapterSceneTypeChange;
    this.onGuiTypeChanged = adapterGuiTypeChange;

    this.onMount();
  }

  private async onMount(){
    this.setGuiType(this.guiType);
  }

  async setGuiType(type: string){
    this.guiType = type;

    await this.setGuiData();
  }

  private async setGuiData(){
    this.guiData = GUI_CONTEXT_MENU[this.guiType];

    await this.render();
  }

  private async render(){
    await this.GUIView.renderView(this.guiType);

    await this.registerDynamicTextureListeners();
  }

  private async registerDynamicTextureListeners(){
    const { dynamicTexture } = this.GUIView;

    dynamicTexture.onDisposeObservable.add((ev) => {
      this.onGuiDisplayDisposed();
    });

    dynamicTexture.onEndRenderObservable.addOnce(async (ev) => {
      await this.onGuiDisplayRendered();
    });
  }

  private async onGuiDisplayDisposed(){

  }

  private async onGuiDisplayRendered(){
    const {
      isControlsAvailable,
      guiText,
      guiButton,
    } = this.guiData;

    await this.Cursor.onGuiChanged(isControlsAvailable, this.GUIView.dynamicTexture);

    await this.Text.onGUIChanged(guiText,  this.GUIView.dynamicTexture);

    await this.MenuManager.onGuiChanged(guiButton, this.GUIView.dynamicTexture)
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

  async onControllerButtonPressed(sceneType: string, button: string){

    // if (!this._GUIData.isControlsAvailable) return false;

    // if ([...DIRECTION_KEYBOARD_BUTTONS, ...DIRECTION_GAMEPAD_BUTTONS].includes(button)){
      
    //   await this.updateIndexByDirection(button);

    //   this.Cursor.move(this._cursorIndex);
    // }

    // if ([...KEYBOARD_ACTION_BUTTONS, ...GAMEPAD_ACTION_BUTTONS].includes(button)){
    //   await this.getActionTypeByButton(button);
    // }
  }

  // async updateIndexByDirection(button: string){
  //   const { _GUIData } = this
  //   const { guiButton } = _GUIData;

  //   switch (button) {
  //     case 'ArrowUp':
  //     case '12': {
  //       if (!this._cursorIndex) return

  //       this._cursorIndex -= 1;

  //       break;
  //     }

  //     case 'ArrowDown':
  //     case '13': {
  //       if (guiButton.renderButtons.length - 1 === this._cursorIndex) return;

  //       this._cursorIndex += 1;

  //       break;
  //     }
  //   }
  // }

  // async getActionTypeByButton(button: string){
  //   const { _GUIData, _cursorIndex } = this;

  //   const {
  //     onConfirmChangeGUI,
  //     onConfirmChangeScene,
  //     guiButton,
  //   } = _GUIData;

  //   switch (button) {
  //     case 'Enter':
  //     case '1': {
  //       if (onConfirmChangeGUI){
  //         await this.setGuiType(guiButton.buttonValues[_cursorIndex]);
  //       }

  //       if (onConfirmChangeScene){

  //       }

  //       break;
  //     }
  //   }
  // }

  // GUI Screens
  
    // GUI Screens END
}
