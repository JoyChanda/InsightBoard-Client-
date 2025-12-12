import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../../../components/ProductCard";

const Wishlist = () => {
    // For now, using localStorage or mock data since backend wishlist endpoint isn't confirmed.
    // Ideally this would fetch from GET /wishlist
    const [wishlistItems, setWishlistItems] = useState([]);
    const [loading, setLoading] = useState(false); // Simulate loading

    useEffect(() => {
        // Simulate fetch
        const saved = JSON.parse(localStorage.getItem("wishlist")) || [];
        // If we saved full product objects, we can use them. 
        // If we saved IDs, we'd need to fetch them.
        // Assuming for now it's empty or robust enough to handle basic mock.
        setWishlistItems(saved);
    }, []);

    const removeFromWishlist = (id) => {
        const newItems = wishlistItems.filter(item => item._id !== id);
        setWishlistItems(newItems);
        localStorage.setItem("wishlist", JSON.stringify(newItems));
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6 text-base-content">My Wishlist</h1>
            
            {wishlistItems.length === 0 ? (
                <div className="text-center py-20 bg-base-100 rounded-lg border border-base-200">
                    <div className="text-6xl mb-4">💖</div>
                    <h2 className="text-2xl font-bold text-base-content">Your wishlist is empty</h2>
                    <p className="text-base-content/70 mt-2 mb-6">Save items you love to revisit them later.</p>
                    <Link to="/products" className="btn btn-primary">Start Shopping</Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wishlistItems.map(item => (
                        <div key={item._id} className="relative">
                            <ProductCard product={item} />
                            <button 
                                onClick={() => removeFromWishlist(item._id)}
                                className="absolute top-2 left-2 btn btn-circle btn-sm btn-error text-white opacity-90 hover:opacity-100"
                                title="Remove from Wishlist"
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Wishlist;
