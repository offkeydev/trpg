import {
  GUI_CHOOSE_CONTROLS,
  GUI_USE_KEYBOARD,
  GUI_CONNECT_CONTROLLER,
  GUI_START_GAME_MENU,
  GUI_START_GAME_SCENE,
  GUI_MENU_LOAD_GAME,
  GUI_MENU_SETTINGS,
} from './types';

// GUI DATA

  //


const GUI_CONTEXT_MENU = {
  [GUI_CHOOSE_CONTROLS]: {
      activeIndex: 0,

      isControlsAvailable: true,
      onConfirmChangeGUI: true,
      onConfirmChangeScene: false,

      guiButton: {
          renderButtons: [
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
          ],
          buttonValues: [GUI_USE_KEYBOARD, GUI_CONNECT_CONTROLLER],
      }
  },

  [GUI_USE_KEYBOARD]: {
      activeIndex: 0,

      isControlsAvailable: true,
      onConfirmChangeGUI: true,
      onConfirmChangeScene: false,

      guiButton: {
          renderButtons: [
              {
                  name: 'button_done',
                  text: 'DONE',
                  offset: 80
              },
          ],
          buttonValues: [GUI_START_GAME_MENU],
      }
  },

  [GUI_CONNECT_CONTROLLER]: {
      activeIndex: 0,

      isControlsAvailable: false,
      onConfirmChangeGUI: true,
      onConfirmChangeScene: false,
  },

  [GUI_START_GAME_MENU]: {
      activeIndex: 0,
      
      isControlsAvailable: true,
      onConfirmChangeGUI: true,
      onConfirmChangeScene: false,

      guiButton: {
          renderButtons: [
              {
                  name: 'button_new_game',
                  text: 'NEW GAME',
                  offset: 80
              },
              {
                  name: 'button_new_game',
                  text: 'LOAD GAME',
                  offset: 118,
              },
              {
                  name: 'button_settings',
                  text: 'SETTINGS',
                  offset: 156,
              },
          ],
          buttonValues: [GUI_START_GAME_SCENE, GUI_MENU_LOAD_GAME, GUI_MENU_SETTINGS],
      }
  },

  [GUI_START_GAME_SCENE]: {
      isControlsAvailable: false,

      isSimpleText: false,
      isAnimatedText: true,
      isCharacterText: false,

      guiAnimatedText: [
      [{
          name: 'text_1_0',
          text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum',
          offset: -80
      },
      {
          name: 'text_1_1',
          text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum',
          offset: 0,
      },
      {
          name: 'text_1_2',
          text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum',
          offset: 80,
      }],
      [{
          name: 'text_2_0',
          text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum',
          offset: -80
      },
      {
          name: 'text_2_1',
          text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum',
          offset: 0,
      },
      {
          name: 'text_2_2',
          text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum',
          offset: 80,
      }],
      
      ],
  }
}

export {
  GUI_CONTEXT_MENU,
}