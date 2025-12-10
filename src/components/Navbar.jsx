import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { useState } from "react";
import UserAvatar from "./UserAvatar";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-base-100 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo - Enhanced Design */}
          <Link to="/" className="flex items-center gap-2 group">
            <span className="text-3xl transition-transform duration-300 group-hover:scale-110">🚢</span>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                InsightBoard
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 -mt-1 hidden sm:block">
                Production Tracker
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <ul className="hidden md:flex items-center gap-6">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "text-primary font-semibold" : "text-base-content hover:text-primary"
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive ? "text-primary font-semibold" : "text-base-content hover:text-primary"
                }
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/products"
                className={({ isActive }) =>
                  isActive ? "text-primary font-semibold" : "text-base-content hover:text-primary"
                }
              >
                Products
              </NavLink>
            </li>
            {user && (
              <>
                <li>
                  <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                      isActive ? "text-primary font-semibold" : "text-base-content hover:text-primary"
                    }
                  >
                    Dashboard
                  </NavLink>
                </li>
                {user.role === "admin" && (
                  <li>
                    <NavLink
                      to="/dashboard/users"
                      className={({ isActive }) =>
                        isActive
                          ? "text-yellow-500 font-semibold"
                          : "text-yellow-600 hover:text-yellow-500"
                      }
                    >
                      Admin Panel
                    </NavLink>
                  </li>
                )}
              </>
            )}
          </ul>

          {/* Right Side - Desktop */}
          <div className="hidden md:flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="btn btn-ghost btn-circle text-xl"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? "🌞" : "🌙"}
            </button>

            {/* Auth Buttons or User Avatar */}
            {user ? (
              <UserAvatar user={user} logout={logout} />
            ) : (
              <div className="flex gap-2">
                <Link to="/login" className="btn btn-primary btn-sm">
                  Login
                </Link>
                <Link to="/register" className="btn btn-outline btn-sm">
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Controls */}
          <div className="flex md:hidden items-center gap-2">
            {/* Theme Toggle - Top Right on Mobile */}
            <button
              onClick={toggleTheme}
              className="btn btn-ghost btn-circle text-xl"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? "🌙" : "🌞"}
            </button>

            {/* Hamburger / Close Icon */}
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-transparent hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                // Close Icon
                <svg
                  className="w-6 h-6 text-black dark:text-gray-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                // Hamburger Icon
                <svg
                  className="w-6 h-6 text-black dark:text-gray-200"
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
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-base-300 py-4">
            <ul className="flex flex-col gap-4">
              <li>
                <NavLink
                  to="/"
                  onClick={closeMobileMenu}
                  className={({ isActive }) =>
                    isActive
                      ? "text-primary font-semibold block py-2"
                      : "text-base-content hover:text-primary block py-2"
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  onClick={closeMobileMenu}
                  className={({ isActive }) =>
                    isActive
                      ? "text-primary font-semibold block py-2"
                      : "text-base-content hover:text-primary block py-2"
                  }
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/products"
                  onClick={closeMobileMenu}
                  className={({ isActive }) =>
                    isActive
                      ? "text-primary font-semibold block py-2"
                      : "text-base-content hover:text-primary block py-2"
                  }
                >
                  Products
                </NavLink>
              </li>
              {user && (
                <>
                  <li>
                    <NavLink
                      to="/dashboard"
                      onClick={closeMobileMenu}
                      className={({ isActive }) =>
                        isActive
                          ? "text-primary font-semibold block py-2"
                          : "text-base-content hover:text-primary block py-2"
                      }
                    >
                      Dashboard
                    </NavLink>
                  </li>
                  {user.role === "admin" && (
                    <li>
                      <NavLink
                        to="/dashboard/users"
                        onClick={closeMobileMenu}
                        className={({ isActive }) =>
                          isActive
                            ? "text-yellow-500 font-semibold block py-2"
                            : "text-yellow-600 hover:text-yellow-500 block py-2"
                        }
                      >
                        Admin Panel
                      </NavLink>
                    </li>
                  )}
                </>
              )}

              {/* Auth Buttons in Mobile Menu */}
              {user ? (
                <li className="pt-4 border-t border-base-300">
                  <div className="flex items-center gap-3 mb-3">
                    <UserAvatar user={user} logout={logout} />
                  </div>
                </li>
              ) : (
                <>
                  <li className="pt-4 border-t border-base-300">
                    <Link
                      to="/login"
                      onClick={closeMobileMenu}
                      className="btn btn-primary w-full"
                    >
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/register"
                      onClick={closeMobileMenu}
                      className="btn btn-outline w-full"
                    >
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
