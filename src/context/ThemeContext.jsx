/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children, storageKey = "theme", defaultTheme = "light" }) => {
  const [theme, setTheme] = useState(() => {
     return localStorage.getItem(storageKey) || defaultTheme;
  });

  useEffect(() => {
    localStorage.setItem(storageKey, theme);

    // Set data-theme attribute for DaisyUI
    document.documentElement.setAttribute("data-theme", theme);

    // Also set dark class for custom dark mode styles
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme, storageKey]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
