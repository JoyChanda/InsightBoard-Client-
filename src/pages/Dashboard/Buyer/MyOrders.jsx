import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      // Using new standard /orders routes
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/orders/my`, { withCredentials: true });
      // Controller returns { success: true, orders: [...] }
      setOrders(res.data.orders || []);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  const filteredOrders = orders.filter(order => {
    if (filter === "all") return true;
    if (filter === "active") return ["pending", "processing", "shipped"].includes(order.status);
    if (filter === "completed") return order.status === "delivered";
    if (filter === "cancelled") return order.status === "cancelled" || order.status === "rejected";
    return true;
  });

  const getStatusColor = (status) => {
    switch (status) {
        case "pending": return "badge-warning";
        case "processing": return "badge-info";
        case "shipped": return "badge-primary";
        case "delivered": return "badge-success";
        case "cancelled": return "badge-error";
        case "rejected": return "badge-error";
        default: return "badge-ghost";
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-base-content">My Orders</h1>

      {/* Tabs */}
      <div className="tabs tabs-boxed mb-6 bg-base-200 text-base-content">
        <a className={`tab ${filter === 'all' ? 'tab-active' : ''}`} onClick={() => setFilter('all')}>All Orders</a>
        <a className={`tab ${filter === 'active' ? 'tab-active' : ''}`} onClick={() => setFilter('active')}>Active</a>
        <a className={`tab ${filter === 'completed' ? 'tab-active' : ''}`} onClick={() => setFilter('completed')}>Completed</a>
        <a className={`tab ${filter === 'cancelled' ? 'tab-active' : ''}`} onClick={() => setFilter('cancelled')}>Cancelled</a>
      </div>

      {/* Orders List */}
      {loading ? (
        <div className="flex justify-center"><span className="loading loading-spinner loading-lg"></span></div>
      ) : filteredOrders.length > 0 ? (
        <div className="space-y-4">
            {filteredOrders.map(order => (
                <div key={order._id} className="card bg-white dark:bg-gray-800 shadow-xl border border-gray-200 dark:border-gray-700">
                    <div className="card-body p-6">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                            <div>
                                <h3 className="font-bold text-lg mb-1">
                                    {order.product?.title || "Product Unavailable"} 
                                    <span className="text-sm font-normal text-base-content/70 ml-2">(Qty: {order.qty})</span>
                                </h3>
                                <p className="text-sm text-base-content/70">Order ID: {order._id}</p>
                            </div>
                            <div className="flex items-center gap-3 mt-2 md:mt-0">
                                <span className={`badge ${getStatusColor(order.status)} badge-lg capitalize`}>{order.status}</span>
                                <span className="font-bold text-xl text-primary">${order.total}</span>
                            </div>
                        </div>

                        <div className="divider my-0"></div>

                        <div className="flex flex-col md:flex-row justify-between items-center mt-4">
                            <div className="text-sm text-base-content/70">
                                <p>Ordered on: {new Date(order.createdAt).toLocaleDateString()}</p> 
                                {order.tracking && order.tracking.length > 0 && (
                                    <p className="mt-1 text-info">
                                        Last Update: {order.tracking[order.tracking.length - 1].status} 
                                        ({new Date(order.tracking[order.tracking.length - 1].date).toLocaleDateString()})
                                    </p>
                                )}
                            </div>
                            
                            <div className="mt-4 md:mt-0 flex gap-2">
                                <Link to={`/dashboard/track-order/${order._id}`} className="btn btn-sm btn-outline btn-info">
                                    Track Order
                                </Link>
                                {order.status === 'pending' && (
                                    <button className="btn btn-sm btn-outline btn-error" onClick={() => toast.info("Cancellation logic to be implemented")}>
                                        Cancel Order
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      ) : (
        <div className="text-center py-10 bg-base-200 rounded-lg">
            <p className="text-base-content/70">No orders found in this category.</p>
            <Link to="/products" className="btn btn-primary mt-4">Browse Products</Link>
        </div>
      )}
    </div>
  );
};

export default MyOrders;
