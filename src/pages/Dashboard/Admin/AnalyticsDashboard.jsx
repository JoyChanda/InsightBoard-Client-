import { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line
} from 'recharts';

const AnalyticsDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/analytics/dashboard?timeRange=${timeRange}`,
          { withCredentials: true }
        );
        setData(res.data.analytics);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [timeRange]);

  if (loading) return <div className="p-10 text-center">Loading Analytics...</div>;
  if (!data) return <div className="p-10 text-center">Failed to load data</div>;

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-base-content">Admin Analytics</h1>
          <select
            className="select select-bordered w-full md:w-auto"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <option value="today">Today</option>
            <option value="week">Last 7 Days</option>
            <option value="month">Last 30 Days</option>
            <option value="all">All Time</option>
          </select>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-10">
        <div className="stat bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-900 dark:to-blue-800 shadow-lg rounded-lg p-4 text-center border border-blue-200 dark:border-blue-700">
            <div className="stat-title text-xs uppercase font-bold text-white dark:text-blue-100">Total Users</div>
            <div className="stat-value text-white text-2xl">{data.totalUsers}</div>
            <div className="stat-desc text-xs text-blue-100">New in period</div>
        </div>
        <div className="stat bg-gradient-to-br from-green-500 to-green-600 dark:from-green-900 dark:to-green-800 shadow-lg rounded-lg p-4 text-center border border-green-200 dark:border-green-700">
            <div className="stat-title text-xs uppercase font-bold text-white dark:text-green-100">Products</div>
            <div className="stat-value text-white text-2xl">{data.totalProducts}</div>
            <div className="stat-desc text-xs text-green-100">Added in period</div>
        </div>
        <div className="stat bg-gradient-to-br from-purple-500 to-purple-600 dark:from-purple-900 dark:to-purple-800 shadow-lg rounded-lg p-4 text-center border border-purple-200 dark:border-purple-700">
            <div className="stat-title text-xs uppercase font-bold text-white dark:text-purple-100">Orders</div>
            <div className="stat-value text-white text-2xl">{data.totalOrders}</div>
            <div className="stat-desc text-xs text-purple-100">Total orders</div>
        </div>
        <div className="stat bg-gradient-to-br from-yellow-500 to-yellow-600 dark:from-yellow-900 dark:to-yellow-800 shadow-lg rounded-lg p-4 text-center border border-yellow-200 dark:border-yellow-700">
            <div className="stat-title text-xs uppercase font-bold text-white dark:text-yellow-100">Revenue</div>
            <div className="stat-value text-white text-2xl">${data.totalIncome}</div>
            <div className="stat-desc text-xs text-yellow-100">Total income</div>
        </div>
         <div className="stat bg-gradient-to-br from-cyan-500 to-cyan-600 dark:from-cyan-900 dark:to-cyan-800 shadow-lg rounded-lg p-4 text-center border border-cyan-200 dark:border-cyan-700">
            <div className="stat-title text-xs uppercase font-bold text-white dark:text-cyan-100">Active Managers</div>
            <div className="stat-value text-white text-2xl">{data.activeManagers}</div>
            <div className="stat-desc text-xs text-cyan-100">Current Active</div>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-base-100 p-6 rounded-lg shadow">
          <h3 className="text-xl font-bold mb-4 text-center">Orders by Status</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.ordersByStatus}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="_id" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#8884d8" name="Orders" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-base-100 p-6 rounded-lg shadow">
          <h3 className="text-xl font-bold mb-4 text-center">Products by Category</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.productsByCategory}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {data.productsByCategory.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Charts Row 2: Trend */}
      <div className="bg-base-100 p-6 rounded-lg shadow mb-8">
          <h3 className="text-xl font-bold mb-4 text-center">Order Trend (Daily)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.ordersTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="_id" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="orders" stroke="#8884d8" activeDot={{ r: 8 }} name="Orders" />
                <Line yAxisId="right" type="monotone" dataKey="sales" stroke="#82ca9d" name="Sales ($)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
