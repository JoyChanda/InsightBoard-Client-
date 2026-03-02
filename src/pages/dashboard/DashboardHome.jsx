import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import API from "../../api";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area
} from 'recharts';
import { motion } from "framer-motion";
import { FaBox, FaDollarSign, FaTag, FaChartPie, FaShoppingBag, FaHeart, FaStar } from "react-icons/fa";

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
        
        // For Buyer, we might not have a dedicated analytics node, 
        // so we can fetch order/wishlist count or use defaults
        if (user?.role === "buyer") {
            try {
                const ordersRes = await API.get("/orders/my");
                setStats({
                    totalOrders: ordersRes.data.length || 0,
                    wishlistCount: 0, // Mocked for now
                    recentOrders: ordersRes.data.slice(0, 5)
                });
            } catch (e) {
                console.error("Buyer stats error:", e);
            }
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.div 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="space-y-8 min-h-screen pb-20"
    >
      {/* Welcome Section */}
      <motion.div variants={itemVariants} className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-base-100 to-accent/5 rounded-[2.5rem] p-8 md:p-12 border border-base-300/50">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <FaChartPie className="text-[12rem] -rotate-12" />
        </div>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
            <div className="flex items-center gap-6">
                <div className="avatar">
                    <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary to-purple-600 shadow-xl shadow-primary/30 flex items-center justify-center text-white text-3xl font-black">
                        {user?.displayName?.[0] || 'U'}
                    </div>
                </div>
                <div>
                    <h1 className="text-4xl font-black tracking-tight text-base-content">
                        Hey, {user?.displayName?.split(" ")[0] || 'User'}!
                    </h1>
                    <p className="text-base-content/50 font-medium mt-1">
                        Here's what's happening on your <span className="text-primary font-bold">{user?.role}</span> account today.
                    </p>
                </div>
            </div>
            
            <div className="flex flex-col items-end gap-1">
                <span className="text-xs font-black uppercase tracking-widest text-base-content/30 italic">Server Time</span>
                <div className="badge badge-lg bg-base-200 border-none p-4 font-black text-primary">
                    {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </div>
            </div>
        </div>
      </motion.div>

      {!loading && stats ? (
        <>
            {/* Stats Grid */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Stat 1 */}
                <div className="group relative bg-base-100 p-8 rounded-[2rem] border border-base-300/50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 overflow-hidden">
                    <div className="absolute top-0 right-0 p-6 text-primary/10 text-6xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12">
                        {user.role === 'buyer' ? <FaShoppingBag /> : <FaBox />}
                    </div>
                    <p className="text-xs font-black uppercase tracking-widest text-base-content/40 mb-2">{user.role === 'buyer' ? 'My Orders' : 'System Orders'}</p>
                    <div className="flex items-baseline gap-2">
                        <span className="text-5xl font-black text-base-content">{stats.totalOrders || 0}</span>
                        <span className="text-xs font-bold text-success">+12%</span>
                    </div>
                    <div className="mt-4 h-1.5 w-full bg-base-200 rounded-full overflow-hidden">
                        <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: '65%' }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="h-full bg-primary" 
                        />
                    </div>
                </div>

                {/* Stat 2 */}
                <div className="group relative bg-base-100 p-8 rounded-[2rem] border border-base-300/50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 overflow-hidden">
                    <div className="absolute top-0 right-0 p-6 text-secondary/10 text-6xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12">
                        {user.role === 'buyer' ? <FaHeart /> : <FaDollarSign />}
                    </div>
                    <p className="text-xs font-black uppercase tracking-widest text-base-content/40 mb-2">{user.role === 'buyer' ? 'Saved Items' : 'Revenue'}</p>
                    <div className="flex items-baseline gap-2">
                        <span className="text-5xl font-black text-base-content">
                            {user.role === 'buyer' ? (stats.wishlistCount || 0) : `$${(stats.totalIncome || stats.totalRevenue || 0).toLocaleString()}`}
                        </span>
                        <span className="text-xs font-bold text-blue-500">Live</span>
                    </div>
                    <div className="mt-4 h-1.5 w-full bg-base-200 rounded-full overflow-hidden">
                        <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: '80%' }}
                            transition={{ duration: 1, delay: 0.7 }}
                            className="h-full bg-secondary" 
                        />
                    </div>
                </div>

                {/* Stat 3 */}
                <div className="group relative bg-base-100 p-8 rounded-[2rem] border border-base-300/50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 overflow-hidden">
                    <div className="absolute top-0 right-0 p-6 text-accent/10 text-6xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12">
                        {user.role === 'buyer' ? <FaStar /> : <FaTag />}
                    </div>
                    <p className="text-xs font-black uppercase tracking-widest text-base-content/40 mb-2">{user.role === 'buyer' ? 'Reward Points' : 'Active Products'}</p>
                    <div className="flex items-baseline gap-2">
                        <span className="text-5xl font-black text-base-content">{user.role === 'buyer' ? 450 : (stats.totalProducts || 0)}</span>
                        <span className="text-xs font-bold text-accent">Active</span>
                    </div>
                    <div className="mt-4 h-1.5 w-full bg-base-200 rounded-full overflow-hidden">
                        <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: '40%' }}
                            transition={{ duration: 1, delay: 0.9 }}
                            className="h-full bg-accent" 
                        />
                    </div>
                </div>
            </motion.div>

            {/* Charts Section */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Activity Chart */}
                <div className="bg-base-100 p-8 rounded-[2.5rem] border border-base-300/50 shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-xl font-black">Performance Trends</h3>
                            <p className="text-xs text-base-content/40 font-bold uppercase tracking-wider">System throughput last 30 days</p>
                        </div>
                        <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="btn btn-ghost btn-sm btn-circle">•••</label>
                        </div>
                    </div>
                    <div className="h-[300px] w-full mt-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={stats.ordersByStatus || [
                                { _id: 'Jan', count: 400 },
                                { _id: 'Feb', count: 300 },
                                { _id: 'Mar', count: 600 },
                                { _id: 'Apr', count: 800 },
                            ]}>
                                <defs>
                                    <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="hsl(var(--p))" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="hsl(var(--p))" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
                                <XAxis dataKey="_id" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700, fill: 'hsl(var(--bc)/0.4)'}} />
                                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700, fill: 'hsl(var(--bc)/0.4)'}} />
                                <Tooltip 
                                    contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.1)', background: 'hsl(var(--b1))' }}
                                />
                                <Area type="monotone" dataKey="count" stroke="hsl(var(--p))" strokeWidth={4} fillOpacity={1} fill="url(#colorCount)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Status Distribution */}
                <div className="bg-base-100 p-8 rounded-[2.5rem] border border-base-300/50 shadow-sm flex flex-col">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-xl font-black">Distribution</h3>
                        <span className="badge badge-outline border-base-300 font-bold opacity-40">Live Data</span>
                    </div>
                    
                    <div className="flex-1 flex flex-col justify-center">
                        <div className="space-y-6">
                            {(stats.ordersByStatus || []).map((item, idx) => (
                                <div key={idx} className="space-y-2">
                                    <div className="flex justify-between items-center px-1">
                                        <span className="text-sm font-black uppercase tracking-widest text-base-content/60">{item._id}</span>
                                        <span className="text-sm font-black text-primary">{item.count}</span>
                                    </div>
                                    <div className="h-4 bg-base-200 rounded-full overflow-hidden">
                                        <motion.div 
                                            initial={{ width: 0 }}
                                            animate={{ width: `${Math.min((item.count / 10) * 100, 100)}%` }}
                                            transition={{ duration: 1, delay: idx * 0.1 }}
                                            className={`h-full rounded-full ${idx % 2 === 0 ? 'bg-primary' : 'bg-secondary'}`} 
                                        />
                                    </div>
                                </div>
                            ))}
                            {(!stats.ordersByStatus || stats.ordersByStatus.length === 0) && (
                                <div className="text-center py-10 opacity-30">
                                    <p className="text-sm font-black italic">No data points available yet</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </motion.div>
        </>
      ) : loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => <div key={i} className="h-48 bg-base-200 animate-pulse rounded-[2rem]"></div>)}
        </div>
      ) : (
        <motion.div 
            variants={itemVariants}
            className="bg-base-200/30 p-20 rounded-[3rem] border-2 border-dashed border-base-300/50 text-center flex flex-col items-center"
        >
             <div className="w-24 h-24 rounded-full bg-base-100 flex items-center justify-center text-5xl shadow-inner mb-6">🚀</div>
             <h2 className="text-3xl font-black text-base-content tracking-tight">Ready for takeoff?</h2>
             <p className="opacity-50 max-w-sm mx-auto mt-3 font-medium text-lg leading-relaxed">
                Your dashboard is empty for now. Start by browsing the store or checking your profile options.
             </p>
             <div className="mt-8 flex gap-4">
                <button className="btn btn-primary btn-lg rounded-2xl px-8 font-black">Browse Store</button>
                <button className="btn btn-ghost btn-lg rounded-2xl px-8 font-bold">My Profile</button>
             </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default DashboardHome;

