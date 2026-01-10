import { useTheme } from "../context/ThemeContext";
import { FiSun, FiMoon } from "react-icons/fi";

/**
 * ThemeToggle Component
 * A button to toggle between light and dark themes
 */
const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2 rounded-lg bg-base-200 hover:bg-base-300 transition-all duration-300 ease-in-out group"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {/* Sun Icon (visible in dark mode) */}
      <FiSun
        className={`w-5 h-5 text-yellow-500 transition-all duration-300 ${
          theme === "dark"
            ? "opacity-100 rotate-0 scale-100"
            : "opacity-0 rotate-90 scale-0 absolute"
        }`}
      />
      
      {/* Moon Icon (visible in light mode) */}
      <FiMoon
        className={`w-5 h-5 text-indigo-600 transition-all duration-300 ${
          theme === "light"
            ? "opacity-100 rotate-0 scale-100"
            : "opacity-0 -rotate-90 scale-0 absolute"
        }`}
      />
    </button>
  );
};

export default ThemeToggle;
