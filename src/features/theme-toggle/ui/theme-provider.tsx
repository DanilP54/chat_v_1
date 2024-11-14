import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light" | "system";

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

interface ThemeProviderState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeProviderContext = createContext<ThemeProviderState>({
  theme: "system",
  setTheme: () => null,
});

export const ThemeProvider = ({
  children,
  defaultTheme = "system",
  storageKey = "chat-room-ui-theme",
  ...props
}: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme,
  );

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      const newSystemTheme = e.matches ? "dark" : "light";
      if (theme === "system") {
        root.classList.add(newSystemTheme);
      }
    };

    const systemThemeMediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)",
    );
    systemThemeMediaQuery.addEventListener("change", handleSystemThemeChange);

    if (theme === "system") {
      const initialSystemTheme = systemThemeMediaQuery.matches
        ? "dark"
        : "light";
      root.classList.add(initialSystemTheme);
      return;
    } else {
      root.classList.add(theme);
    }

    return () => {
      systemThemeMediaQuery.removeEventListener(
        "change",
        handleSystemThemeChange,
      );
    };
  }, [theme]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};
