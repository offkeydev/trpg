const getCanvasDataByType = (dataType: string) => {
    const canvasNode = document.getElementById('canvas-main');

    if (!canvasNode) return console.log('canvasNode is undefined');
    
    const settings = canvasNode.dataset[dataType];

    if (settings) {
        return JSON.parse(settings);
    }
    
    return console.log(`Element dosent contain ${dataType} attribute`);
};


export {
    getCanvasDataByType,
}