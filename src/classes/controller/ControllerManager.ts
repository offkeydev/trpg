import { Keyboard } from "./Keyboard";
import { Gamepad } from "./Gamepad";

export class ControllerManager {
  Keyboard: Keyboard;
  Gamepad: Gamepad;

  async init(adapterControllerAction){
    this.Keyboard = new Keyboard(adapterControllerAction);

    await this.main();
  };

  private async main(){
    await this.attachListeners();
  }

  private async attachListeners(){
    window.addEventListener('gamepadconnected', this.onControlsStateChanged);
    window.addEventListener('gamepaddisconnected', this.onControlsStateChanged);
  }

  private async onControlsStateChanged(state?){

  }
}
