export const themes = {
    default: {
        name: "Default",
        description: "Domyślny styl aplikacji"
    }
} as const;

export type ThemeId = keyof typeof themes;