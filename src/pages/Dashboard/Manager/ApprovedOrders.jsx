import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Spinner from "../../../components/Spinner";

const ApprovedOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState(null);
    
    // Tracking Form
    const [trackNote, setTrackNote] = useState("");
    const [trackLocation, setTrackLocation] = useState("");
    const [trackStatus, setTrackStatus] = useState("Shipped");

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/bookings/approved`, { withCredentials: true });
            setOrders(res.data);
        } catch {
            toast.error("Failed to load approved orders");
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateTracking = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${import.meta.env.VITE_API_URL}/bookings/${selectedOrder._id}/tracking`, {
                status: trackStatus,
                location: trackLocation,
                note: trackNote
            }, { withCredentials: true });
            
            toast.success("Tracking Updated");
            setSelectedOrder(null);
            fetchOrders(); // Refresh to show new status if changed
        } catch {
            toast.error("Failed to update tracking");
        }
    };

    if (loading) return <Spinner message="Loading active orders..." />;

    return (
        <div className="p-6">
             <h1 className="text-3xl font-bold mb-6 text-base-content">Active Orders</h1>
             
             <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
                <table className="table w-full">
                    <thead>
                        <tr className="bg-base-200 text-base-content">
                            <th>Order ID</th>
                            <th>Product</th>
                            <th>Customer</th>
                            <th>Current Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order._id}>
                                <td className="text-xs">{order._id}</td>
                                <td>
                                    <div className="font-bold">{order.product?.title}</div>
                                    <div className="text-xs">Qty: {order.qty}</div>
                                </td>
                                <td>
                                    <div>{order.receiverName}</div>
                                    <div className="text-xs text-base-content/70">{order.contactNumber}</div>
                                </td>
                                <td><span className="badge badge-info">{order.status}</span></td>
                                <td>
                                    <button 
                                        className="btn btn-sm btn-outline"
                                        onClick={() => setSelectedOrder(order)}
                                    >
                                        Update Tracking
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
             </div>

             {/* Tracking Modal */}
             {selectedOrder && (
                <div className="modal modal-open">
                    <div className="modal-box bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                        <h3 className="font-bold text-lg mb-4">Update Tracking for #{selectedOrder._id.slice(-6)}</h3>
                        <form onSubmit={handleUpdateTracking} className="space-y-4">
                            
                            <div className="form-control">
                                <label className="label">Status Update</label>
                                <select className="select select-bordered" value={trackStatus} onChange={(e) => setTrackStatus(e.target.value)}>
                                    <option value="Processing">Processing</option>
                                    <option value="Shipped">Shipped</option>
                                    <option value="Out for Delivery">Out for Delivery</option>
                                    <option value="Delivered">Delivered</option>
                                </select>
                            </div>

                            <div className="form-control">
                                <label className="label">Current Location</label>
                                <input className="input input-bordered" placeholder="e.g. Dhaka Distribution Center" value={trackLocation} onChange={(e) => setTrackLocation(e.target.value)} required />
                            </div>

                            <div className="form-control">
                                <label className="label">Note</label>
                                <input className="input input-bordered" placeholder="e.g. Package arrived at facility" value={trackNote} onChange={(e) => setTrackNote(e.target.value)} required />
                            </div>

                            <div className="modal-action">
                                <button type="button" className="btn" onClick={() => setSelectedOrder(null)}>Cancel</button>
                                <button type="submit" className="btn btn-primary">Update</button>
                            </div>
                        </form>
                    </div>
                </div>
             )}
        </div>
    );
};

export default ApprovedOrders;
