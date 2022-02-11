import { useContext } from "react";
import { ThemeContext, Theme } from "../components/theme-provider";

const useTheme = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return { theme, toggleTheme };
};

export { useTheme, Theme };
