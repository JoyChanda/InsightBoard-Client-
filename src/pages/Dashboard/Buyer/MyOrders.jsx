import React, { useEffect, useState } from "react";
import axios from "axios";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelId, setCancelId] = useState(null); // store order id for cancel dialog

  // Fetch user orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/orders/my`);
        setOrders(res.data || []);
      } catch (error) {
        console.error("Failed to load orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleCancelOrder = () => {
    // TODO: Add API call to cancel order
    // axios.put(`${import.meta.env.VITE_API_URL}/orders/${cancelId}/cancel`)
    alert("Cancel API not added yet");
    setCancelId(null);
  };

  if (loading) {
    return (
      <div className="p-6 text-center">
        <div className="loading loading-spinner loading-lg"></div>
        <p className="mt-4">Loading orders...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">My Orders</h1>

      {orders.length === 0 ? (
        <div className="text-center py-10">
          <div className="text-6xl mb-4">📦</div>
          <h2 className="text-xl font-semibold mb-2">No Orders Yet</h2>
          <p className="text-gray-600 dark:text-gray-400">You haven't placed any orders yet.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 border text-left font-semibold">Product</th>
                <th className="p-3 border text-left font-semibold">Price</th>
                <th className="p-3 border text-left font-semibold">Qty</th>
                <th className="p-3 border text-left font-semibold">Status</th>
                <th className="p-3 border text-center font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50">
                  <td className="p-3 border">{order.product?.title || order.product?.name}</td>
                  <td className="p-3 border">${order.price}</td>
                  <td className="p-3 border">{order.qty}</td>
                  <td className="p-3 border">
                    <span className={`capitalize px-2 py-1 rounded text-sm ${
                      order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      order.status === 'completed' ? 'bg-green-100 text-green-800' :
                      order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                    }`}>
                      {order.status}
                    </span>
                  </td>

                  <td className="p-3 border text-center">
                    {order.status === "pending" ? (
                      <button
                        onClick={() => setCancelId(order._id)}
                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                      >
                        Cancel
                      </button>
                    ) : (
                      <span className="text-gray-400 dark:text-gray-500">-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Cancel Confirmation Modal */}
      {cancelId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-96">
            <h2 className="text-xl font-semibold mb-2">
              Confirm Cancel Order?
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              Are you sure you want to cancel this order? This action cannot be undone.
            </p>

            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
                onClick={() => setCancelId(null)}
              >
                Close
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                onClick={handleCancelOrder}
              >
                Confirm Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyOrders;
