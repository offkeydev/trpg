import { GamepadManager } from "@babylonjs/core";
import { Button } from "@babylonjs/inspector/components/Button";

const UP = '12';
const DOWN = '13';
const LEFT = '14';
const RIGHT = '15';

const CROSS = '0';
const CIRCLE = '1';
const TRIANGLE = '3';
const SQUARE = '2';

const L1 = '4';
const L2 = '6';
const R1 = '5';
const R2 = '7';

const ANALOG_LEFT = '10';
const ANALOG_RIGHT = '11';

const START = '8';
const SELECT = '9';

const PS = '16';
const SCREEN = '17';

export class Gamepad extends GamepadManager {
  _gamepad;

  _state;

  _isConnected: boolean = false;

  onButtonPressAction: Function;

  constructor(adapterButtonAction) {
    super();

    this.onButtonPressAction = adapterButtonAction;

    this.init();
  }

  async init(){
    await this.main();
  }

  private async main(){
    this.onGamepadConnectedObservable.add((gamepad, state) => {

      this._gamepad = gamepad;
      this._state = state;
      this._isConnected = true;

      this.onConnect();
    });

    this.onGamepadDisconnectedObservable.add(() => {
      this._gamepad = null;
      this._state = null;
      this._isConnected = false;

      this.onDisconnect();
    });
  }

  private async onConnect(){
    this._gamepad.onButtonDownObservable.add((button, state) =>{
      this.onButtonPress(button, state);
    });

    this._gamepad.onButtonUpObservable.add((button, state) => {
      this.onButtonRelease(button, state);
    });
  }

  private async onDisconnect(){
    
  }

  private onButtonPress(btnType: number, state: object){
      const value = btnType.toString();
      
      this.onButtonPressAction(value);
  }

  private onButtonRelease(btnType: number, state: object){

  }
}
