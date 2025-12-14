import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

const DashboardHeader = ({ toggleMobileMenu }) => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [avatarError, setAvatarError] = useState(false);

  const displayName = user?.displayName || user?.email?.split("@")[0] || "User";
  const initials = displayName?.[0]?.toUpperCase() || "U";
  
  // Filter out invalid image URLs (e.g., Unsplash webpages instead of direct image links)
  const isValidPhoto = (url) => {
      if (!url) return false;
      if (url.includes("unsplash.com/photos/")) return false; // This is a webpage, not an image
      return true;
  };

  const showImage = isValidPhoto(user?.photoURL) && !avatarError;

  return (
    <header
      className="
        bg-base-200 
        backdrop-blur-md
        shadow-md 
        border-b 
        border-base-300 
        transition-colors duration-300
      "
    >
      <div className="flex items-center justify-between px-6 py-3">
        {/* Left section: Hamburger + Brand */}
        <div className="flex items-center space-x-3">
          {/* Hamburger Menu Button (Mobile Only) */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-lg hover:bg-purple-100/60 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6 text-gray-700 dark:text-gray-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* Brand */}
          <Link to="/" className="flex items-center gap-2 group">
            <span className="text-3xl transition-transform duration-300 group-hover:scale-110">
              🚢
            </span>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                InsightBoard
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 -mt-1 hidden sm:block">
                Production Tracker
              </span>
            </div>
          </Link>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-3">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="
              p-2 rounded-lg
              hover:bg-purple-100/60 dark:hover:bg-gray-700
              transition-all duration-200
            "
            aria-label="Toggle theme"
            title={
              theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
            }
          >
            {theme === "dark" ? (
              <span className="text-xl">🌞</span>
            ) : (
              <span className="text-xl">🌙</span>
            )}
          </button>

          {/* User Info */}
          {/* Desktop profile pill */}
          <Link
            to="/dashboard/profile"
            className="
              hidden md:flex items-center space-x-2
              px-3 py-1.5 rounded-lg
              bg-base-100
              border border-base-300
              hover:bg-base-200
              transition-colors
              text-base-content
            "
          >
            <div className="text-right">
              <p className="text-sm font-semibold">{displayName}</p>
              <p className="text-xs text-base-content/70 capitalize text-right">
                {user?.role || "user"}
              </p>
            </div>

            {/* Avatar */}
            <div
              className="
                w-9 h-9 rounded-full overflow-hidden shrink-0
                bg-gradient-to-br from-purple-500 to-blue-500
                flex items-center justify-center
                text-white text-sm font-bold
                border border-white/50 dark:border-gray-600
              "
            >
              {showImage ? (
                <img
                  src={user.photoURL}
                  alt="Profile"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  crossOrigin="anonymous"
                  onError={() => setAvatarError(true)}
                />
              ) : (
                <span>{initials}</span>
              )}
            </div>
          </Link>

          {/* Mobile avatar button pinned right */}
          <Link
            to="/dashboard/profile"
            className="
              md:hidden inline-flex items-center justify-center
              w-10 h-10 rounded-full
              bg-gradient-to-br from-purple-500 to-blue-500
              border border-white/60 dark:border-gray-600
              text-white font-semibold
              overflow-hidden
            "
            aria-label="Profile"
          >
            {showImage ? (
              <img
                src={user.photoURL}
                alt="Profile"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                crossOrigin="anonymous"
                onError={() => setAvatarError(true)}
              />
            ) : (
              <span>{initials}</span>
            )}
          </Link>

          {/* Logout */}
          <button
            onClick={logout}
            className="
              px-3 py-1.5 
              bg-red-500 hover:bg-red-600 
              text-white rounded-lg 
              transition-colors text-sm font-medium
            "
          >
            <i className="fa fa-sign-out" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
