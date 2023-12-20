export class Keyboard {
  globalControllerAction: Function

  constructor(adapterControllerAction) {
    this.globalControllerAction = adapterControllerAction;

    this.init();
  }

  async init(){
    await this.attachListeners();
  }

  onKeyDown = (e) => {
    this.globalControllerAction(e.key);
  }

  onKeyUp = (e) => {
    console.log(`Key unpressed: ${e.key}`);
  }

  async attachListeners(){
    document.addEventListener('keydown', this.onKeyDown);
    document.addEventListener('keyup', this.onKeyUp);
  }

  async destroyListeners(){
    document.removeEventListener('keydown', this.onKeyDown);
    document.removeEventListener('keyup', this.onKeyUp);
  }
}
