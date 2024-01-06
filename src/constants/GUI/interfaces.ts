interface GUIMenuButton {
    name: string, 
    text: string, 
    offset: number 
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

    // Defines is simple text Type
    isSimpleText?: boolean;

    // Defines is animated text Type
    isAnimatedText?: boolean;

    // Defines is character dialog text Type
    isCharacterText?: boolean;
    
     // GUI Button settings
    guiButton?: {
        // GUI Buttons thats need to render
        renderButtons: GUIMenuButton [];

        // GUI Button values that chose with {activeIndex} parameter
        buttonValues: string [];
    }

    guiText?: {
        // GUI simple Text elements
        simpleText: { name: string, text: string, offset: number } [];

        // GUI text elements with show hide animation
        anmimatedText: { name: string, text: string, offset: number }[][];

        // GUI text elements with show hide animation
        characterText: { name: string, who: string, text: string }[];
    }
}

export {
    GUIData,
    GUIMenuButton,
}