import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import API from "../../api";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const DashboardHome = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        let endpoint = "/analytics/dashboard";
        if (user?.role === "manager") endpoint = "/analytics/manager";
        if (user?.role === "buyer") {
            setLoading(false);
            return;
        }

        const res = await API.get(endpoint);
        setStats(res.data.analytics);
      } catch (err) {
        console.error("Dashboard Stats Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [user]);

  return (
    <div className="space-y-8 min-h-full">
      {/* Welcome Card */}
      <div className="bg-base-100 dark:bg-base-200 rounded-2xl shadow-sm p-8 border border-base-200 dark:border-base-300">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
                <div className="avatar placeholder">
                    <div className="bg-primary text-primary-content rounded-2xl w-16 h-16 text-2xl font-black">
                        {user?.displayName?.[0] || user?.email?.[0]}
                    </div>
                </div>
                <div>
                    <h1 className="text-3xl font-black text-base-content">
                        Hello, {user?.displayName || user?.email?.split("@")[0]}! 👋
                    </h1>
                    <p className="text-base-content/60 font-medium">
                        Welcome to your <span className="text-primary uppercase">{user?.role}</span> command center.
                    </p>
                </div>
            </div>
            <div className="flex gap-2">
                <div className="badge badge-outline border-base-300 p-4 font-bold opacity-70">
                    {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </div>
            </div>
        </div>
      </div>

      {!loading && stats ? (
        <>
            {/* Dynamic Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="stat bg-base-100 rounded-2xl border border-base-200 shadow-sm p-6 overflow-hidden relative group">
                    <div className="absolute -right-4 -bottom-4 text-9xl opacity-5 group-hover:scale-110 transition-transform duration-500">📦</div>
                    <div className="stat-title text-xs uppercase font-black opacity-50">Total Orders</div>
                    <div className="stat-value text-primary text-4xl my-1">{stats.totalOrders || 0}</div>
                    <div className="stat-desc font-medium">Consolidated system orders</div>
                </div>

                <div className="stat bg-base-100 rounded-2xl border border-base-200 shadow-sm p-6 overflow-hidden relative group">
                    <div className="absolute -right-4 -bottom-4 text-9xl opacity-5 group-hover:scale-110 transition-transform duration-500">💰</div>
                    <div className="stat-title text-xs uppercase font-black opacity-50">Volume/Income</div>
                    <div className="stat-value text-secondary text-4xl my-1">${(stats.totalIncome || stats.totalRevenue || 0).toLocaleString()}</div>
                    <div className="stat-desc font-medium">Total financial throughput</div>
                </div>

                <div className="stat bg-base-100 rounded-2xl border border-base-200 shadow-sm p-6 overflow-hidden relative group">
                    <div className="absolute -right-4 -bottom-4 text-9xl opacity-5 group-hover:scale-110 transition-transform duration-500">✨</div>
                    <div className="stat-title text-xs uppercase font-black opacity-50">Active Items</div>
                    <div className="stat-value text-accent text-4xl my-1">{stats.totalProducts || 0}</div>
                    <div className="stat-desc font-medium">Live production listings</div>
                </div>
            </div>

            {/* General Overview Chart */}
            <div className="bg-base-100 p-8 rounded-2xl shadow-sm border border-base-200">
                <h3 className="text-xl font-black mb-6 flex items-center gap-2">
                    📊 System Distribution Overview
                </h3>
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={stats.ordersByStatus || []}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
                            <XAxis dataKey="_id" axisLine={false} tickLine={false} />
                            <YAxis axisLine={false} tickLine={false} />
                            <Tooltip 
                                cursor={{fill: 'rgba(0,0,0,0.05)'}}
                                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                            />
                            <Bar dataKey="count" fill="hsl(var(--p))" radius={[4, 4, 0, 0]} barSize={50} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </>
      ) : loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
            {[1, 2, 3].map(i => <div key={i} className="h-32 bg-base-200 rounded-2xl"></div>)}
        </div>
      ) : (
        <div className="bg-base-200/50 p-20 rounded-3xl border-2 border-dashed border-base-300 text-center">
             <div className="text-6xl mb-4">🚀</div>
             <h2 className="text-2xl font-black text-base-content">Your Journey Starts Here</h2>
             <p className="opacity-60 max-w-sm mx-auto mt-2">Explore the sidebar to manage your production, view orders, or update your profile.</p>
        </div>
      )}
    </div>
  );
};

export default DashboardHome;
