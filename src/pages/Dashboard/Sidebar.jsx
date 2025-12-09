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
    <aside className="w-64 bg-white dark:bg-gray-800 shadow-lg min-h-screen p-5">
      <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">
        Dashboard
      </h2>

      <ul className="space-y-4">
        {links.map((item) => (
          <li key={item.to}>
            <Link
              to={item.to}
              className="block px-3 py-2 rounded-md hover:bg-blue-500 hover:text-white
                         text-gray-800 dark:text-gray-200 transition"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
