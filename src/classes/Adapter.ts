import { GUI_CHOOSE_CONTROLS, GUI_CONNECT_CONTROLLER } from '../constants/GUI/types';
import { GUI_SCENE } from '../constants/sceneTypes';
import { EngineManager } from './EngineManager';
import { ControllerManager } from "./controller/ControllerManager";
import { GUIManager } from "./GUI/gui/GUIManager";
import { GlobalSettings } from "./GlobalSettings";
import { SceneManager } from "./SceneManager";

const SETTINGS = {
    engineSettings: {

    },
    sceneSettings: {
        sceneType: GUI_SCENE,
    },
    guiSettings: {
        guiType: GUI_CHOOSE_CONTROLS,
    }
}

export class Adapter {
    EngineManager: EngineManager;
    GlobalSettings: GlobalSettings;
    SceneManager: SceneManager;
    GUIManager: GUIManager;
    ControllerManager: ControllerManager;

    constructor(
        engineManager,
        globalSettings ?,
        sceneManager ?,
        guiManager ?,
        controllerManager ?
    ) {
        this.EngineManager = engineManager;
        this.GlobalSettings = globalSettings;
        this.SceneManager = sceneManager;
        this.GUIManager = guiManager;
        this.ControllerManager = controllerManager

        this.init();
    }

    async init() {
        await this.initializeInstances();

        await this.registerObservers();
    }

    private async registerObservers(){
        const {
            SceneManager,
        } = this;

        const {
            _scene
        } = SceneManager        

        _scene.onBeforeRenderObservable.addOnce(() => {
            this.onBeforeSceneRender()
        });

        _scene.onAfterRenderObservable.addOnce((ev) => {
            this.onSceneRender(ev);
        })
    }

    private async onBeforeSceneRender() {
        console.log('Before render');
    }

    private async onSceneRender(ev) {
        console.log('Scene render');
    }

    private async initializeInstances(){
        const {
            onSceneTypeChanged,
            onGuiTypeChanged,
            onControllerAction,
        } = this;

        const {
            engineSettings,
            sceneSettings,
            guiSettings,
        } = SETTINGS;

        const {
            sceneType,
        } = sceneSettings;

        const {
            guiType,
        } = guiSettings;

        await this.SceneManager.init(sceneType, onSceneTypeChanged, onGuiTypeChanged);

        await this.GUIManager.init(guiType, onSceneTypeChanged, onGuiTypeChanged);

        await this.ControllerManager.init(onControllerAction);

        await this.mainLaunch();
    }


    onSceneTypeChanged = async (value?: string) => {

    }

    onGuiTypeChanged = async (value?: string) => {
        await this.GUIManager.setGuiType(value);
    }

    onControllerAction = async (button: string) => {
        console.log('Adapter onControllerAction', button)
        const { _sceneType } = this.SceneManager;

        await this.GUIManager.onControllerButtonPressed(_sceneType, button);
    }

    async mainLaunch() {
        this.EngineManager.startRenderLoop(this.SceneManager._scene);
    }

    // replace with LS Settings
    getSettings(){
        return SETTINGS;
    }

    // set settings to LS
    saveSettings(){

    }

    // trigger when something changed
    onSettingsChanged(){

    }
}
