import { useEffect, useState } from "react";
import API from "../../../api";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';

const ManagerReports = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await API.get("/analytics/manager");
        setData(res.data.analytics);
      } catch (err) {
        console.error("Failed to fetch manager reports:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center p-20">
      <span className="loading loading-spinner loading-lg text-primary"></span>
    </div>
  );

  if (!data) return (
    <div className="p-10 text-center bg-base-200 rounded-xl">
      <p className="text-error font-bold">Failed to load reports. Please try again later.</p>
    </div>
  );

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

  return (
    <div className="p-6 space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-center bg-base-100 p-6 rounded-2xl shadow-sm border border-base-200">
          <div>
            <h1 className="text-3xl font-black text-base-content">Production Reports</h1>
            <p className="text-base-content/60">Insight into your product performance and orders.</p>
          </div>
          <div className="badge badge-primary p-4 gap-2 mt-4 md:mt-0">
             <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
             LIVE DATA
          </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="stat bg-base-100 border border-base-200 shadow-sm rounded-2xl p-6">
            <div className="stat-title text-xs uppercase font-black text-base-content/50">My Products</div>
            <div className="stat-value text-primary text-3xl my-1">{data.totalProducts}</div>
            <div className="stat-desc text-xs opacity-60">Total listings created</div>
        </div>
        <div className="stat bg-base-100 border border-base-200 shadow-sm rounded-2xl p-6">
            <div className="stat-title text-xs uppercase font-black text-base-content/50">Total Orders</div>
            <div className="stat-value text-secondary text-3xl my-1">{data.totalOrders}</div>
            <div className="stat-desc text-xs opacity-60">Orders for your items</div>
        </div>
        <div className="stat bg-base-100 border border-base-200 shadow-sm rounded-2xl p-6">
            <div className="stat-title text-xs uppercase font-black text-base-content/50">Revenue</div>
            <div className="stat-value text-accent text-3xl my-1">${data.totalRevenue?.toLocaleString()}</div>
            <div className="stat-desc text-xs opacity-60">Generated across orders</div>
        </div>
        <div className="stat bg-base-100 border border-base-200 shadow-sm rounded-2xl p-6">
            <div className="stat-title text-xs uppercase font-black text-base-content/50">Units Sold</div>
            <div className="stat-value text-warning text-3xl my-1">{data.totalUnitsSold}</div>
            <div className="stat-desc text-xs opacity-60">Total items produced</div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Status Distribution */}
        <div className="bg-base-100 p-8 rounded-2xl shadow-sm border border-base-200">
          <h3 className="text-lg font-black mb-6 flex items-center gap-2">
            <span className="text-2xl">📈</span> Order Status Breakdown
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.ordersByStatus}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
                <XAxis dataKey="_id" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip 
                    cursor={{fill: 'rgba(0,0,0,0.05)'}}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="count" fill="hsl(var(--p))" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Distribution */}
        <div className="bg-base-100 p-8 rounded-2xl shadow-sm border border-base-200">
          <h3 className="text-lg font-black mb-6 flex items-center gap-2">
            <span className="text-2xl">🥧</span> My Portfolio Mix
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.productsByCategory}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="count"
                >
                  {data.productsByCategory.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerReports;
