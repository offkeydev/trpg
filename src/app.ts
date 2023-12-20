import { Adapter } from './classes/Adapter';
import { EngineManager } from './classes/EngineManager';
import FontFaceObserver from 'fontfaceobserver';
import { GlobalSettings } from './classes/GlobalSettings';
import { GUIManager } from './classes/GUIManager';
import { SceneManager } from './classes/SceneManager';
import { ControllerManager } from './classes/controller/ControllerManager';
import {GUI_SCENE} from "./constants/sceneTypes";
import {GUI_CHOOSE_CONTROLS} from "./constants/GUITypes";


const attachSettings = async () => {
  (window as any)['__TRPG__'] = {
    SETTINGS: {
      engineSettings: {

      },
      sceneSettings: {
        sceneType: GUI_SCENE,
      },
      guiSettings: {
        guiType: GUI_CHOOSE_CONTROLS,
      }
    },
    METHODS: {
      onSettingsChanged: () => {

      }
    },
  };
}

const loadFonts = async () => {
  const headNode = document.head;
  const link = document.createElement('link');
  link.rel = 'stylesheet';

  headNode.appendChild(link);
  link.href = 'https://fonts.googleapis.com/css2?family=Dosis&family=Nova+Square&family=Quantico&display=swap';
}


window.addEventListener('DOMContentLoaded', async (event) => {
  await attachSettings();
  await loadFonts();

  const fontDosis = new FontFaceObserver('Dosis');
  const fontNovaSquare = new FontFaceObserver('Nova Square');
  const fontQuantico = new FontFaceObserver('Quantico');

  Promise.all([
    fontDosis.load(),
    fontNovaSquare.load(),
    fontQuantico.load()
  ])
  .then(() => {

    const ENGINE_MANAGER = new EngineManager();
    const { _canvas, _engine } = ENGINE_MANAGER;

    const GLOBAL_SETTINGS = new GlobalSettings();

    const SCENE = new SceneManager(_canvas, _engine);
    const { _scene } = SCENE;


    const GUI = new GUIManager(_scene, _engine);

    const CONTROLLER = new ControllerManager();

    const ADAPTER = new Adapter(
      ENGINE_MANAGER,
      GLOBAL_SETTINGS,
      SCENE,
      GUI,
      CONTROLLER,
    )
  })
  .catch((err) => {
    console.log('Error per loading fonts', err)
  })

});
