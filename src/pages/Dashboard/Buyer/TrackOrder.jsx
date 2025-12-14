import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const TrackOrder = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/bookings/${id}`, { withCredentials: true });
                setOrder(res.data);
            } catch (err) {
                console.error(err);
                // setOrder(null); // Keep handling or show error
            } finally {
                setLoading(false);
            }
        };
        fetchOrder();
    }, [id]);

    if (loading) return <div className="text-center p-10">Loading...</div>;
    if (!order) return <div className="text-center p-10">Order not found</div>;

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-base-content">Track Order #{id.slice(-6)}</h1>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-semibold mb-6">Order Timeline</h2>
                
                <ul className="timeline timeline-vertical timeline-compact">
                    {order.tracking?.map((track, i) => (
                        <li key={i}>
                            <hr className={i > 0 ? "bg-primary" : ""} />
                            <div className="timeline-middle">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-primary">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="timeline-end timeline-box mb-4">
                                <div className="font-bold text-lg">{track.status}</div>
                                <div className="text-sm text-base-content/70">{new Date(track.date).toDateString()} - {track.location}</div>
                                <div className="text-sm italic">{track.note}</div>
                            </div>
                            <hr className={i < order.tracking.length - 1 ? "bg-primary" : ""} />
                        </li>
                    ))}
                </ul>
                
                <div className="mt-8 text-center">
                    <Link to="/dashboard/my-orders" className="btn btn-outline">Back to Orders</Link>
                </div>
            </div>
        </div>
    );
};

export default TrackOrder;
