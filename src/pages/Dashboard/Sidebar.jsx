import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Sidebar = () => {
  const { user } = useAuth();

  const role = user?.role; // admin | manager | buyer

  // Menu items based on role
  const menu = {
    admin: [
      { label: "Dashboard Home", to: "/dashboard" },
      { label: "Manage Users", to: "/dashboard/users" },
      { label: "Manage Products", to: "/dashboard/products" },
      { label: "Manage Orders", to: "/dashboard/orders" },
    ],
    manager: [
      { label: "Dashboard Home", to: "/dashboard" },
      { label: "All Orders", to: "/dashboard/orders" },
      { label: "Add Product", to: "/dashboard/add-product" },
    ],
    buyer: [
      { label: "Dashboard Home", to: "/dashboard" },
      { label: "My Orders", to: "/dashboard/my-orders" },
      { label: "Wishlist", to: "/dashboard/wishlist" },
    ],
  };

  const links = menu[role] || [];

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 shadow-lg border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
      <div className="p-5">
        <h2 className="text-lg font-bold mb-6 text-gray-800 dark:text-white flex items-center gap-2">
          <span className="text-xl">📊</span>
          <span>Navigation</span>
        </h2>

        <nav>
          <ul className="space-y-1">
            {links.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="block px-4 py-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700
                             text-gray-700 dark:text-gray-200 transition-all duration-200
                             font-medium hover:text-gray-900 dark:hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Back to Home Link */}
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <Link
            to="/"
            className="block px-4 py-2.5 rounded-lg bg-gray-100 dark:bg-gray-700
                       text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600
                       transition-all duration-200 font-medium text-center
                       flex items-center justify-center gap-2"
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
