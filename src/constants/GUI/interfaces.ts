interface GUIMenuButton {
    name: string, 
    text: string, 
    offset: number,
    actionValue: string,
}

interface TextInterface {
    name: string, 
    text: string, 
    offset?: number,
    who?: string,
}

interface GUIData {

    // Active menu element 
    activeIndex?: number;

    // Defines should cursor be rendered
    isControlsAvailable?: boolean;

    // Defines should GUI screen change per controller / keyboard action
    onConfirmChangeGUI?: boolean;

    // Defines should Scene change per controller / keyboard action
    onConfirmChangeScene?: boolean;
    
     // GUI Button settings
    guiButton?: {
        // GUI Buttons thats need to render
        renderButtons: GUIMenuButton [];
    }

    guiText?: {
        // GUI simple Text elements
        simpleText?: TextInterface [];

        // GUI text elements with show hide animation
        anmimatedText?: TextInterface [][];

        // SIMPLE GUI text elements with show hide animation
        simpleAnmimatedText?: TextInterface [];

        // GUI text elements with show hide animation
        characterText?: TextInterface [];
    }
}

export {
    GUIData,
    GUIMenuButton,
    TextInterface,
}