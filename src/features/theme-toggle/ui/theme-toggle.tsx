import { useTheme } from "./theme-provider";
import { Sun, Moon } from "./icons/index.ts";

export const ThemeToggle = () => {
  const { setTheme, theme } = useTheme();

  const light = theme === "light";

  const handleChangeTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  if (light) {
    return (
      <Moon
        strokeWidth={2}
        onClick={handleChangeTheme}
        size={25}
        className="cursor-pointer dark:invert"
      />
    );
  }

  return (
    <Sun
      strokeWidth={2}
      onClick={handleChangeTheme}
      color="#333"
      size={25}
      className="cursor-pointer dark:invert"
    />
  );
};
