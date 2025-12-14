import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../../../components/Spinner";

const AdminAllOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("all");
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/bookings/all`, { withCredentials: true });
            setOrders(res.data);
        } catch {
            toast.error("Failed to load orders");
        } finally {
            setLoading(false);
        }
    };

    const filteredOrders = orders.filter((o) => {
        const matchesFilter = filter === "all" ? true : o.status === filter;
        const term = search.toLowerCase();
        const matchesSearch =
            !term ||
            o._id?.toLowerCase().includes(term) ||
            o.receiverName?.toLowerCase().includes(term) ||
            o.product?.title?.toLowerCase().includes(term);
        return matchesFilter && matchesSearch;
    });

    if (loading) return <Spinner message="Loading all orders..." />;

    return (
        <div className="p-6 min-h-full">
            <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between mb-6">
                <h1 className="text-3xl font-bold text-base-content">All Orders (Superadmin)</h1>
                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                    <input
                        type="text"
                        placeholder="Search by ID, buyer, product"
                        className="input input-bordered w-full sm:w-64 bg-base-100 text-base-content border-gray-300 dark:bg-base-200 dark:border-gray-600"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <select className="select select-bordered bg-base-100 text-base-content border-gray-300 dark:bg-base-200 dark:border-gray-600" value={filter} onChange={(e) => setFilter(e.target.value)}>
                        <option value="all">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>
            </div>

            <div className="overflow-x-auto bg-base-100 dark:bg-base-200 rounded-lg shadow border border-base-200 dark:border-base-300">
                 <table className="table w-full">
                    <thead>
                        <tr className="bg-base-200 text-base-content dark:bg-base-300">
                            <th className="font-bold">Order ID</th>
                            <th className="font-bold">Product</th>
                            <th className="font-bold">User</th>
                            <th className="font-bold">Quantity</th>
                            <th className="font-bold">Status</th>
                            <th className="font-bold">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredOrders.map(order => (
                            <tr key={order._id} className="hover:bg-base-200 dark:hover:bg-base-300">
                                <td className="text-xs font-mono">{order._id}</td>
                                <td className="text-base-content">
                                    <div className="font-bold">{order.product?.title || "Unknown"}</div>
                                    <div className="text-xs text-base-content/70">Price: ${order.total}</div>
                                </td>
                                <td className="text-base-content">
                                    <div>{order.receiverName}</div>
                                    <div className="text-xs text-base-content/60">{order.contactNumber}</div>
                                </td>
                                <td className="text-base-content">{order.qty}</td>
                                <td>
                                    <span
                                        className={`badge badge-sm uppercase ${
                                            order.status === "pending"
                                                ? "badge-warning"
                                                : order.status === "approved"
                                                ? "badge-info"
                                                : order.status === "rejected"
                                                ? "badge-error"
                                                : "badge-ghost"
                                        }`}
                                    >
                                        {order.status}
                                    </span>
                                </td>
                                <td>
                                    <Link
                                        to={`/dashboard/track-order/${order._id}`}
                                        className="btn btn-xs btn-outline"
                                    >
                                        View
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminAllOrders;
