import { FunctionComponent, createContext, useState } from "react";

import "./theme-provider.scss";

export enum Theme {
  "red" = "red",
  "yellow" = "yellow",
}

export const ThemeContext = createContext({
  toggleTheme: (): void => undefined,
  theme: Theme.red,
});

const ThemeProvider: FunctionComponent = ({ children }) => {
  const [theme, setTheme] = useState(Theme.red);
  const toggleTheme = () =>
    setTheme(theme === Theme.yellow ? Theme.red : Theme.yellow);
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <button
        className={`theme--${theme} theme-provider__toggle-button`}
        onClick={toggleTheme}
      />
      <div>{children}</div>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
