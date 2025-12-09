import { useAuth } from "../../context/AuthContext";

const DashboardHome = () => {
  const { user } = useAuth();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
        Welcome to Your Dashboard
      </h1>

      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
        <p className="text-lg text-gray-800 dark:text-gray-200">
          Hello, <span className="font-semibold">{user?.displayName || user?.email}</span>!
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
          Role: <span className="font-medium capitalize">{user?.role}</span>
        </p>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-5 rounded-lg text-white">
          <h3 className="text-lg font-semibold">Quick Stats</h3>
          <p className="text-3xl font-bold mt-2">0</p>
          <p className="text-sm opacity-90">Total Items</p>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 p-5 rounded-lg text-white">
          <h3 className="text-lg font-semibold">Activity</h3>
          <p className="text-3xl font-bold mt-2">0</p>
          <p className="text-sm opacity-90">Recent Actions</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-5 rounded-lg text-white">
          <h3 className="text-lg font-semibold">Notifications</h3>
          <p className="text-3xl font-bold mt-2">0</p>
          <p className="text-sm opacity-90">New Updates</p>
        </div>
      </div>

      <div className="mt-6 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
          Getting Started
        </h2>
        <ul className="space-y-2 text-gray-700 dark:text-gray-300">
          <li>✅ Use the sidebar to navigate between different sections</li>
          <li>✅ Your menu items are customized based on your role ({user?.role})</li>
          <li>✅ Dashboard pages will be added as development continues</li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardHome;
