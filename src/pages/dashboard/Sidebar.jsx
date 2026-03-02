import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { 
  FaHome, 
  FaUsers, 
  FaBoxOpen, 
  FaChartLine, 
  FaFileAlt, 
  FaUsersCog, 
  FaPlusSquare, 
  FaShoppingBag, 
  FaHeart, 
  FaUserCircle,
  FaSignOutAlt
} from "react-icons/fa";
import { motion } from "framer-motion";

const Sidebar = ({ isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const handleLinkClick = () => {
    if (setIsMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  const role = user?.role;

  const menu = {
    admin: [
      { label: "Overview", to: "/dashboard", icon: <FaHome /> },
      { label: "Manage Users", to: "/dashboard/manage-users", icon: <FaUsers /> },
      { label: "All Products", to: "/dashboard/all-products", icon: <FaBoxOpen /> },
      { label: "Analytics", to: "/dashboard/analytics", icon: <FaChartLine /> },
    ],
    superadmin: [
      { label: "Overview", to: "/dashboard", icon: <FaHome /> },
      { label: "Manage Users", to: "/dashboard/manage-users", icon: <FaUsers /> },
      { label: "All Products", to: "/dashboard/all-products", icon: <FaBoxOpen /> },
      { label: "Analytics", to: "/dashboard/analytics", icon: <FaChartLine /> },
    ],
    manager: [
      { label: "Overview", to: "/dashboard", icon: <FaHome /> },
      { label: "Reports", to: "/dashboard/reports", icon: <FaFileAlt /> },
      { label: "Performance", to: "/dashboard/team-performance", icon: <FaUsersCog /> },
      { label: "Add Product", to: "/dashboard/add-product", icon: <FaPlusSquare /> },
      { label: "Manage Inventory", to: "/dashboard/manage-products", icon: <FaBoxOpen /> },
    ],
    buyer: [
      { label: "Overview", to: "/dashboard", icon: <FaHome /> },
      { label: "My Orders", to: "/dashboard/my-orders", icon: <FaShoppingBag /> },
      { label: "Wishlist", to: "/dashboard/wishlist", icon: <FaHeart /> },
      { label: "My Profile", to: "/dashboard/profile", icon: <FaUserCircle /> },
    ],
  };

  const links = menu[role] || [];

  return (
    <aside 
      className={`
        fixed md:static inset-y-0 left-0 z-40
        w-72 bg-base-200/80 backdrop-blur-xl shadow-2xl 
        border-r border-base-300/50 
        overflow-y-auto transition-all duration-500 ease-in-out
        transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}
    >
      <div className="flex flex-col h-full p-6">
        {/* Navigation Header */}
        <div className="mb-8 px-4">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-base-content/30 mb-4">
            Main Menu
          </p>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 space-y-2">
          {links.map((item) => {
            const isActive = location.pathname === item.to;
            return (
              <li key={item.to} className="list-none">
                <Link
                  to={item.to}
                  onClick={handleLinkClick}
                  className={`
                    group flex items-center gap-4 px-5 py-3.5 rounded-2xl
                    transition-all duration-300 relative overflow-hidden
                    ${isActive 
                      ? 'bg-primary text-primary-content shadow-lg shadow-primary/20 font-bold' 
                      : 'hover:bg-base-300/50 text-base-content/60 hover:text-base-content font-medium'}
                  `}
                >
                  {/* Active Indicator Line */}
                  {isActive && (
                    <motion.div 
                      layoutId="sidebar-active"
                      className="absolute left-0 w-1 h-6 bg-white rounded-r-full"
                    />
                  )}
                  
                  <span className={`text-xl transition-transform duration-300 group-hover:scale-110 ${isActive ? 'text-white' : 'text-primary'}`}>
                    {item.icon}
                  </span>
                  <span className="tracking-tight">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className="mt-auto pt-8 border-t border-base-300/50 space-y-4">
          {/* Back Home */}
          <Link
            to="/"
            className="flex items-center gap-4 px-5 py-3 rounded-2xl hover:bg-base-300/50 transition-all group font-bold text-base-content/70 hover:text-base-content"
          >
            <FaHome className="text-xl opacity-50 group-hover:opacity-100" />
            <span>Storefront</span>
          </Link>

          {/* User Status Card */}
          <div className="bg-base-300/30 rounded-3xl p-4 border border-base-300/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-black shadow-lg">
                {user?.displayName?.[0] || 'U'}
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-black truncate">{user?.displayName || 'User'}</p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-primary">{role}</p>
              </div>
            </div>
            <button 
                onClick={logout}
                className="w-full mt-3 py-2 rounded-xl bg-error/10 hover:bg-error/20 text-error text-xs font-black transition-all flex items-center justify-center gap-2"
            >
                <FaSignOutAlt /> Logout
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

