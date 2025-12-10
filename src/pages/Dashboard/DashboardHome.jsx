import { useAuth } from "../../context/AuthContext";

const DashboardHome = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      {/* Welcome Card */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-3xl">👋</span>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Welcome Back!
          </h1>
        </div>
        
        <div className="bg-white dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
          <p className="text-lg text-gray-700 dark:text-gray-200 mb-2">
            Hello, <span className="font-bold text-blue-600 dark:text-blue-400">{user?.displayName || user?.email?.split('@')[0]}</span>! 🎉
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-medium text-xs uppercase tracking-wide">
              {user?.role}
            </span>
            <span>• Ready to manage your dashboard</span>
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-5 rounded-xl text-white shadow-md hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-base font-semibold">Total Orders</h3>
            <span className="text-3xl">📦</span>
          </div>
          <p className="text-3xl font-bold mb-1">0</p>
          <p className="text-sm opacity-90">Active orders in system</p>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 p-5 rounded-xl text-white shadow-md hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-base font-semibold">Completed</h3>
            <span className="text-3xl">✅</span>
          </div>
          <p className="text-3xl font-bold mb-1">0</p>
          <p className="text-sm opacity-90">Successfully delivered</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-5 rounded-xl text-white shadow-md hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-base font-semibold">In Progress</h3>
            <span className="text-3xl">⚡</span>
          </div>
          <p className="text-3xl font-bold mb-1">0</p>
          <p className="text-sm opacity-90">Currently processing</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;


