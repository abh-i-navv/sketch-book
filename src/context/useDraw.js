import { createContext, useContext } from "react";

export const DrawContext = createContext({
    elements: [],
    setElements: () => {},
    currentTool: 'pen',
    setCurrentTool: () => {},
    strokeWidth: '5',
    setStrokeWidth: () => {},
    roughness: '0',
    setRoughness: () => {},
    stroke: '#000000',
    setStroke: () => {},
    elementHistory: [],
    setElementHistory: () => {},
    isMoving: [],
    setMoving: () => {}

})

export const DrawProvider = DrawContext.Provider

export default function useDraw() {
    return useContext(DrawContext)
}