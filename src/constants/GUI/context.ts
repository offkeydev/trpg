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
                  offset: 80,
                  actionValue: GUI_USE_KEYBOARD,
              },
              {
                  name: 'button_use_controller',
                  text: 'CONTROLLER',
                  offset: 118,
                  actionValue: GUI_CONNECT_CONTROLLER,
              }
          ],
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
                  offset: 80,
                  actionValue: GUI_START_GAME_MENU,
              },
          ],
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
                  offset: 80,
                  actionValue: GUI_START_GAME_SCENE,
              },
              {
                  name: 'button_new_game',
                  text: 'LOAD GAME',
                  offset: 118,
                  actionValue: GUI_MENU_LOAD_GAME,
              },
              {
                  name: 'button_settings',
                  text: 'SETTINGS',
                  offset: 156,
                  actionValue: GUI_MENU_SETTINGS,
              },
          ],
      }
  },

  [GUI_START_GAME_SCENE]: {
      isControlsAvailable: false,
      guiText: {
        // characterText: [{
        //     name: 'char_text_0_1',
        //     text: 'This is a characrer dialog text chat character talk',
        //     offset: 0,
        // }],
        simpleText: [{
            name: 'simple_text_0_1',
            text: 'This is a simple text that im not shure where is need to use',
            offset: 0,
        }],
        // simpleAnimatedText: [
        //     {
        //         name: 'animated_text_0_1',
        //         text: 'This is an animated text that has show hide animation',
        //         offset: 0,
        //     },
        //     {
        //         name: 'animated_text_0_2',
        //         text: 'This is an animated text that shown after firs hide',
        //         offset: 0,
        //     }
        // ],
        // animatedText: [
        //     [
        //         {
        //             name: 'arr_anim_text_0_1',
        //             text: 'This is an group text with animation',       
        //             offset: -80,
        //         },
        //         {
        //             name: 'arr_anim_text_0_2',
        //             text: 'This is an group text with animation',
        //             offset: 0,
        //         },
        //         {
        //             name: 'arr_anim_text_0_3',
        //             text: 'This is an group text with animation',
        //             offset: 80,
        //         }
        //     ],
        //     [
        //         {
        //             name: 'arr_anim_text_0_1',
        //             text: 'This is an group text with animation',       
        //             offset: -80,
        //         },
        //         {
        //             name: 'arr_anim_text_0_2',
        //             text: 'This is an group text with animation',
        //             offset: 0,
        //         },
        //         {
        //             name: 'arr_anim_text_0_3',
        //             text: 'This is an group text with animation',
        //             offset: 80,
        //         }
        //     ]
        // ],
      },
  }
}

export {
  GUI_CONTEXT_MENU,
}