import type {ThemeId} from "./themes";
import {createContext} from "react";

type ThemeContextValue = {
    themeId: ThemeId;
    setThemeId: (themeId: ThemeId) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);