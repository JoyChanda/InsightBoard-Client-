import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Spinner from "../../../components/Spinner";

const PendingOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/bookings/pending`, { withCredentials: true });
            setOrders(res.data);
        } catch {
            toast.error("Failed to load pending orders");
        } finally {
            setLoading(false);
        }
    };

    const handleStatus = async (id, status) => {
        if(!confirm(`Are you sure you want to ${status} this order?`)) return;
        try {
            await axios.put(`${import.meta.env.VITE_API_URL}/bookings/${id}/status`, { status }, { withCredentials: true });
            toast.success(`Order ${status} successfully`);
            setOrders(orders.filter(o => o._id !== id));
        } catch {
            toast.error("Failed to update status");
        }
    };

    if (loading) return <Spinner message="Loading pending orders..." />;

    return (
        <div className="p-6">
             <h1 className="text-3xl font-bold mb-6 text-base-content">Pending Orders</h1>
             
             <div className="grid gap-4">
                {orders.map(order => (
                    <div key={order._id} className="card bg-base-100 shadow-lg border border-l-4 border-l-warning p-4">
                        <div className="flex flex-col md:flex-row justify-between">
                            <div className="flex-1">
                                <h3 className="font-bold text-lg">{order.product?.title} (x{order.qty})</h3>
                                <p className="text-base-content/70 text-sm">Order ID: {order._id}</p>
                                <p className="mt-2 font-semibold">Total: ${order.total}</p>
                                <div className="text-sm mt-2">
                                    <p><strong>Customer:</strong> {order.receiverName}</p>
                                    <p><strong>Address:</strong> {order.shippingAddress}</p>
                                    <p><strong>Contact:</strong> {order.contactNumber}</p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 justify-center mt-4 md:mt-0">
                                <button onClick={() => handleStatus(order._id, "processing")} className="btn btn-success btn-sm text-white">Approve</button>
                                <button onClick={() => handleStatus(order._id, "rejected")} className="btn btn-error btn-sm text-white">Reject</button>
                            </div>
                        </div>
                    </div>
                ))}
                
                {orders.length === 0 && <div className="text-center py-10 bg-base-200 rounded-lg">No pending orders.</div>}
             </div>
        </div>
    );
};

export default PendingOrders;
