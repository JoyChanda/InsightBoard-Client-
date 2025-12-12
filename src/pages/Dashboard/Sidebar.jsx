import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Sidebar = ({ isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const { user } = useAuth();

  const handleLinkClick = () => {
    // Close mobile menu when a link is clicked
    if (setIsMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  const role = user?.role; // admin | manager | buyer

  // Menu items based on role
  const menu = {
    admin: [
      { label: "Admin Access", to: "/admin-access" },
      { label: "Dashboard Home", to: "/dashboard" },
      { label: "Manage Users", to: "/dashboard/manage-users" },
      { label: "All Products", to: "/dashboard/all-products" },
      { label: "All Orders", to: "/dashboard/all-orders" },
    ],
    superadmin: [
      { label: "Admin Access", to: "/admin-access" },
      { label: "Dashboard Home", to: "/dashboard" },
      { label: "Manage Users", to: "/dashboard/manage-users" },
      { label: "All Products", to: "/dashboard/all-products" },
      { label: "All Orders", to: "/dashboard/all-orders" },
      { label: "Analytics", to: "/dashboard/analytics" },
    ],
    manager: [
      { label: "Dashboard Home", to: "/dashboard" },
      { label: "Pending Orders", to: "/dashboard/pending-orders" },
      { label: "Approved Orders", to: "/dashboard/approved-orders" },
      { label: "Add Product", to: "/dashboard/add-product" },
      { label: "Manage Products", to: "/dashboard/manage-products" },
    ],
    buyer: [
      { label: "Dashboard Home", to: "/dashboard" },
      { label: "My Orders", to: "/dashboard/my-orders" },
      { label: "Wishlist", to: "/dashboard/wishlist" },
    ],
  };

  const links = menu[role] || [];

  return (
    <aside 
      className={`
        fixed md:static inset-y-0 left-0 z-40
        w-64 bg-base-100 dark:bg-base-100/95 backdrop-blur shadow-lg 
        border-r border-base-200 dark:border-base-300 
        overflow-y-auto transition-all duration-300
        transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}
    >
      <div className="p-5">
        <h2 className="text-lg font-bold mb-6 text-base-content flex items-center gap-2">
          <span className="text-xl">📊</span>
          <span>Navigation</span>
        </h2>

        <nav>
          <ul className="space-y-1">
            {links.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  onClick={handleLinkClick}
                  className="
                    block px-4 py-2.5 rounded-lg 
                    hover:bg-purple-100/60 dark:hover:bg-base-200
                    text-base-content/80 dark:text-base-content/80
                    transition-all duration-200
                    font-medium hover:text-primary dark:hover:text-primary
                  "
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Back to Home Link */}
        <div className="mt-8 pt-6 border-t border-base-200 dark:border-base-300">
          <Link
            to="/"
            onClick={handleLinkClick}
            className="
              px-4 py-2.5 rounded-lg 
              bg-base-200 text-base-content
              hover:bg-base-300
              transition-all duration-200 font-medium text-center
              flex items-center justify-center gap-2
              border border-base-300
            "
          >
            <span className="text-lg">🏠</span>
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
