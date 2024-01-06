import { AdvancedDynamicTexture, Button } from "@babylonjs/gui"

export class Helper {
    /*
    * Get all rendered gui elements from AdvancedDynamicTexture
    * @param advancedDynamicTexture: AdvancedDynamicTexture
    * returns array of elements
    */
    public static getGuiElements(advancedDynamicTexture: AdvancedDynamicTexture) {
        return advancedDynamicTexture.getDescendants()
    }

    public static getGuiMenuElements(advancedDynamicTexture: AdvancedDynamicTexture) {
        return advancedDynamicTexture.getDescendants()?.filter((menuItem) => menuItem instanceof Button)
    }

    public static getGuiElementsByType() {

    }
}