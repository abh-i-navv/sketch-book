import { createContext, useContext } from "react";

export const DrawContext = createContext({
    elements: [],
    setElements: () => {}
})

export const DrawProvider = DrawContext.Provider

export default function useDraw() {
    return useContext(DrawContext)
}