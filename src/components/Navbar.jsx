import { Link, NavLink } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import UserAvatar from "./UserAvatar";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();

  const navLinks = (
    <>
      <li><NavLink to="/" className="font-bold">Home</NavLink></li>
      <li><NavLink to="/about" className="font-bold">About Us</NavLink></li>
      {user && (
        <>
          <li><NavLink to="/campaigns" className="font-bold">Campaigns</NavLink></li>
          <li><NavLink to="/dashboard" className="font-bold">Dashboard</NavLink></li>
        </>
      )}
    </>
  );


  return (
    <nav className="w-full py-4 shadow-md transition-colors duration-300 bg-base-100 border-b border-base-300">
      <div className="container mx-auto px-4 flex items-center justify-between">
        
        {/* Logo / Brand */}
        <div className="flex items-center gap-2">
           {/* Mobile Dropdown */}
            <div className="dropdown lg:hidden">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                </svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 text-base-content">
                {navLinks}
            </ul>
            </div>
            <Link to="/" className="text-xl font-bold uppercase tracking-wider flex items-center gap-2">
              <span className="text-2xl">🚢</span>
              InsightBoard
            </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex">
             <ul className="menu menu-horizontal px-1 gap-2 font-medium">
                {navLinks}
             </ul>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="btn btn-ghost btn-circle text-xl"
            title="Toggle Theme"
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>

          {/* Auth Buttons / Avatar */}
          {user ? (
            <UserAvatar />
          ) : (
            <div className="flex items-center gap-2">
                <Link to="/login" className="btn btn-sm btn-outline">Login</Link>
                <Link to="/register" className="btn btn-sm btn-primary">Register</Link>
            </div>
          )}
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
