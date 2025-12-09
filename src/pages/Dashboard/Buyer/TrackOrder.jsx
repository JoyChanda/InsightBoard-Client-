import React, { useEffect, useState } from "react";
import Timeline from "../../../components/Timeline";
import axios from "axios";

const TrackOrder = () => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const steps = [
    "Order Placed",
    "Processing",
    "Shipped",
    "Out for Delivery",
    "Delivered",
  ];

  // Fetch order (demo sample)
  useEffect(() => {
    const loadOrder = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/orders/track?id=123`);
        setOrder(res.data);
      } catch (error) {
        console.error("Error fetching tracking:", error);
        // Fallback to demo data
        setOrder({
          _id: "123",
          product: { title: "Sample Product" },
          currentStep: 2, // default (Shipped)
        });
      } finally {
        setLoading(false);
      }
    };

    loadOrder();
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-center">
        <div className="loading loading-spinner loading-lg"></div>
        <p className="mt-4">Loading tracking information...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">
        Tracking Order: {order._id}
      </h1>

      <h2 className="font-medium text-lg mb-6">
        Product: {order.product.title}
      </h2>

      {/* Timeline */}
      <div className="mb-8 bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Order Status</h3>
        <Timeline steps={steps} currentStep={order.currentStep} />
      </div>

      {/* Map Placeholder */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Delivery Route</h2>
        <div className="w-full h-64 bg-gray-200 rounded overflow-hidden flex items-center justify-center">
          {/* You can replace this with Google Maps embed later */}
          <iframe
            title="map"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1825.447!2d90.4125!3d23.8151"
          ></iframe>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          * Map placeholder - will be updated with actual delivery tracking
        </p>
      </div>
    </div>
  );
};

export default TrackOrder;
