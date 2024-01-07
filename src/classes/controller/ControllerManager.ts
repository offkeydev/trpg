import { Keyboard } from "./Keyboard";
import { Gamepad } from "./Gamepad";
import { isFunction } from 'lodash';

export class ControllerManager {
  Keyboard: Keyboard;
  Gamepad: Gamepad;

  onButtonPressAction: Function;

  async init(adapterControllerAction){
    this.onButtonPressAction = adapterControllerAction;

    await this.main();
  };

  private async main(){
    this.Keyboard = new Keyboard(this.onButtonPressAction);
    this.Gamepad = new Gamepad(this.onButtonPressAction);

    await this.attachListeners();
  }

  private async attachListeners(){
    window.addEventListener('gamepadconnected', this.onControllerConected);
    window.addEventListener('gamepaddisconnected', this.onControllerDisconected);
  }

  private async onControllerConected(){
    if (!isFunction(this.Keyboard.destroyListeners)) return;

    this.Keyboard.destroyListeners();
  }

  private async onControllerDisconected(){
    if (!isFunction(this.Keyboard.attachListeners)) return;

    if (!this.Keyboard) return;

    this.Keyboard.attachListeners();
  }

  private async onControlsStateChanged(state?){
    console.log('ControllerManager on Control state changed');
  }
}
