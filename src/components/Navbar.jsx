import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { useState } from "react";
import UserAvatar from "./UserAvatar";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isProfileSidebarOpen, setIsProfileSidebarOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const displayName = user?.displayName || user?.email?.split("@")[0] || "User";
  const initials = displayName?.[0]?.toUpperCase() || "U";
  
  // Filter out invalid image URLs
  const isValidPhoto = (url) => {
      if (!url) return false;
      if (url.includes("unsplash.com/photos/")) return false; 
      return true;
  };
  const showImage = isValidPhoto(user?.photoURL);


  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="glass sticky top-0 z-50 border-b border-base-300/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Enhanced Design */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white text-2xl shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
              🚢
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-black bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent tracking-tight">
                InsightBoard
              </span>
              <span className="text-[10px] uppercase tracking-widest font-bold text-gray-500 dark:text-gray-400 -mt-1 hidden sm:block">
                Precision Production
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <ul className="hidden md:flex items-center gap-8">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `nav-link-underline transition-colors duration-200 font-medium ${
                    isActive
                      ? "text-primary active"
                      : "text-base-content/80 hover:text-primary"
                  }`
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `nav-link-underline transition-colors duration-200 font-medium ${
                    isActive
                      ? "text-primary active"
                      : "text-base-content/80 hover:text-primary"
                  }`
                }
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/products"
                className={({ isActive }) =>
                  `nav-link-underline transition-colors duration-200 font-medium ${
                    isActive
                      ? "text-primary active"
                      : "text-base-content/80 hover:text-primary"
                  }`
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
                      `nav-link-underline transition-colors duration-200 font-medium ${
                        isActive
                          ? "text-primary active"
                          : "text-base-content/80 hover:text-primary"
                      }`
                    }
                  >
                    Dashboard
                  </NavLink>
                </li>
              </>
            )}
          </ul>

          {/* Right Side - Desktop */}
          <div className="hidden md:flex items-center gap-5">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-base-200/50 hover:bg-base-300/50 transition-all duration-300 text-xl overflow-hidden relative group"
              aria-label="Toggle theme"
            >
              <div className={`transition-transform duration-500 ${theme === "dark" ? "rotate-0 scale-100" : "rotate-90 scale-0 opacity-0"}`}>
                🌞
              </div>
              <div className={`absolute inset-0 flex items-center justify-center transition-transform duration-500 ${theme === "light" ? "rotate-0 scale-100" : "-rotate-90 scale-0 opacity-0"}`}>
                🌙
              </div>
            </button>

            {/* Auth Buttons or User Avatar */}
            {user ? (
              <UserAvatar user={user} logout={logout} />
            ) : (
              <div className="flex gap-3">
                <Link to="/login" className="px-5 py-2 rounded-xl bg-primary text-white font-bold hover:shadow-lg hover:shadow-primary/30 transition-all active:scale-95">
                  Login
                </Link>
                <Link to="/register" className="px-5 py-2 rounded-xl border-2 border-primary/20 hover:border-primary text-primary font-bold transition-all active:scale-95">
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
              className="p-2 rounded-full hover:bg-base-200 transition-colors text-base-content"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                // Close Icon
                <svg
                  className="w-6 h-6"
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
                // Hamburger Icon (Circle Dots)
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="12" r="10" strokeWidth="2" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu (Standard Navigation) */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-base-300 py-4 h-[calc(100vh-4rem)] flex flex-col justify-between">
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
              {!user && (
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

            {/* Bottom Left Profile Icon in Mobile Menu */}
            {user && (
                <div className="pt-4 border-t border-base-300">
                     <button
                        onClick={() => {
                            closeMobileMenu(); // Close menu
                            setIsProfileSidebarOpen(true); // Open Sidebar which will be on left
                        }}
                        className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-base-200 transition-colors"
                     >
                        <div className="
                            w-10 h-10 rounded-full
                            bg-gradient-to-br from-purple-500 to-blue-500
                            border border-white/60 dark:border-gray-600
                            flex items-center justify-center overflow-hidden
                            text-white font-semibold
                        ">
                            {showImage ? (
                                <img
                                src={user.photoURL}
                                alt="Profile"
                                className="w-full h-full object-cover"
                                referrerPolicy="no-referrer"
                                crossOrigin="anonymous"
                                />
                            ) : (
                                <span className="text-sm">{initials}</span>
                            )}
                        </div>
                        <div className="flex flex-col items-start">
                            <span className="font-semibold text-base-content">{displayName}</span>
                            <span className="text-xs text-base-content/70">View Profile</span>
                        </div>
                     </button>
                </div>
            )}
          </div>
        )}
      </div>

       {/* Mobile Profile Sidebar (Left Side) */}
       {isProfileSidebarOpen && user && (
        <div className="fixed inset-0 z-[60] flex justify-start md:hidden">
            {/* Backdrop */}
            <div 
                className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" 
                onClick={() => setIsProfileSidebarOpen(false)}
            ></div>
            
            {/* Drawer (Left Side) */}
            <div className="relative w-72 bg-base-100 h-full shadow-2xl transform transition-transform duration-300 flex flex-col p-6 border-r border-base-200">
                {/* Close Button */}
                <button 
                    onClick={() => setIsProfileSidebarOpen(false)}
                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-base-200 text-base-content"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>

                {/* Content */}
                <div className="flex flex-col items-center mt-6 mb-8 text-center">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white text-3xl font-bold mb-4 border-4 border-base-100 shadow-lg overflow-hidden">
                        {showImage ? (
                            <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                            <span>{initials}</span>
                        )}
                    </div>
                    <h3 className="font-bold text-lg text-base-content">{displayName}</h3>
                    <p className="text-sm text-base-content/70 capitalize">{user?.role}</p>
                    <p className="text-xs text-base-content/50 mt-1">{user?.email}</p>
                </div>

                <div className="flex flex-col gap-3 w-full">
                     <Link 
                        to="/dashboard/profile" 
                        onClick={() => setIsProfileSidebarOpen(false)}
                        className="btn btn-primary w-full text-white"
                    >
                        View Profile
                    </Link>
                    <button 
                        onClick={() => {
                            logout();
                            setIsProfileSidebarOpen(false);
                        }}
                        className="btn btn-outline btn-error w-full"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
