import type {ThemeId} from "./themes";
import {createContext} from "react";
import type {ThemeProviderProps} from "../types/ThemeProviderProps";
import {useState} from "react";

type ThemeContextValue = {
    themeId: ThemeId;
    setThemeId: (themeId: ThemeId) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

function ThemeProvider(props: ThemeProviderProps) {
    const { children } = props

    const [themeId, setThemeId] = useState<ThemeId>("default");

    return (
        <ThemeProvider themeId={ThemeContext.Provider}></ThemeProvider>
    )
}

export default ThemeProvider;