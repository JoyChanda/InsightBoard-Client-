import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth(); // isAuthenticated is not provided, use user directly
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/products/${id}`
        );
        setProduct(res.data);
      } catch (err) {
        setError("Failed to load product details.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleBookNow = () => {
    if (!user) {
      navigate("/login", { state: { from: `/products/${id}` } }); // Redirect to login, then back
      return;
    }
    navigate(`/booking/${id}`);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loading loading-spinner loading-lg text-primary"></div>
      </div>
    );

  if (error)
    return (
      <div className="text-center py-20 text-red-500 text-xl font-bold">
        {error}
      </div>
    );

  if (!product)
    return <div className="text-center py-20">Product not found</div>;

  // Role Logic
  // Show button if: NOT logged in OR (Logged in AND role is 'buyer')
  // Block if: Role is admin/manager OR User is suspended
  const isSuspended = user && user.status === "suspended";
  
  // Determine button text/state
  let buttonText = "Book Now";
  let isDisabled = false;

  if (user && user.role !== "buyer") {
    buttonText = `Restricted to Buyers (${user.role})`;
    isDisabled = true;
  } else if (isSuspended) {
    buttonText = "Account Suspended";
    isDisabled = true;
  } else if (product.qty === 0) {
    buttonText = "Out of Stock";
    isDisabled = true;
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row gap-8 bg-base-100 shadow-xl rounded-2xl p-6 md:p-10">
        {/* Left: Image */}
        <div className="w-full md:w-1/2">
          <div className="carousel w-full rounded-xl overflow-hidden shadow-md">
            {product.images?.length > 0 ? (
              product.images.map((img, i) => (
                <div
                  key={i}
                  id={`slide${i}`}
                  className="carousel-item relative w-full h-96"
                >
                  <img
                    src={img}
                    className="w-full h-full object-cover"
                    alt={product.title}
                  />
                  {product.images.length > 1 && (
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                      <a
                        href={`#slide${
                          i === 0 ? product.images.length - 1 : i - 1
                        }`}
                        className="btn btn-circle btn-sm opacity-70 hover:opacity-100"
                      >
                        ❮
                      </a>
                      <a
                        href={`#slide${
                          i === product.images.length - 1 ? 0 : i + 1
                        }`}
                        className="btn btn-circle btn-sm opacity-70 hover:opacity-100"
                      >
                        ❯
                      </a>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <img
                src="https://placehold.co/600x400?text=No+Image"
                className="w-full h-96 object-cover"
                alt="No Product"
              />
            )}
          </div>
          {/* Thumbnails if multiple (Optional enhancement) */}
        </div>

        {/* Right: Info */}
        <div className="w-full md:w-1/2 flex flex-col space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold text-base-content leading-tight mb-2">
                {product.title}
              </h1>
              <div className="flex gap-2">
                <span className="badge badge-secondary">
                  {product.category}
                </span>
                {product.qty < 5 && product.qty > 0 && (
                  <span className="badge badge-warning">Low Stock</span>
                )}
              </div>
            </div>
            <div className="text-3xl font-bold text-green-600">
              ${product.price}
            </div>
          </div>

          <p className="text-base-content/70 text-lg leading-relaxed border-b border-base-200 pb-4">
            {product.desc}
          </p>

          <div className="grid grid-cols-2 gap-4 text-sm text-base-content/70">
            <div className="flex flex-col p-3 bg-base-200 rounded-lg">
              <span className="uppercase text-xs font-bold mb-1">
                Available Quantity
              </span>
              <span className="text-lg font-semibold text-base-content">
                {product.qty}
              </span>
            </div>
            <div className="flex flex-col p-3 bg-base-200 rounded-lg">
              <span className="uppercase text-xs font-bold mb-1">
                Min Order Qty
              </span>
              <span className="text-lg font-semibold text-base-content">
                {product.minQty}
              </span>
            </div>
          </div>

          {product.demoVideo && (
            <div className="mt-2">
              <a
                href={product.demoVideo}
                target="_blank"
                rel="noopener noreferrer"
                className="link link-primary flex items-center gap-2"
              >
                🎥 Watch Demo Video
              </a>
            </div>
          )}

          <div className="mt-4">
            <span className="block text-sm font-bold text-base-content/60 mb-2">
              Payment Options:
            </span>
            <div className="flex gap-2 flex-wrap">
              {product.paymentOptions?.map((opt) => (
                <span key={opt} className="badge badge-outline">
                  {opt}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-auto pt-6">
            <button
              onClick={handleBookNow}
              disabled={isDisabled}
              className={`btn btn-lg w-full ${
                isDisabled ? "btn-disabled" : "btn-primary"
              } shadow-lg hover:shadow-xl transition-all`}
            >
              {buttonText}
            </button>
            {/* Warning for suspended logic */}
            {isSuspended && (
              <p className="text-error text-sm text-center mt-2">
                Your account is suspended.{" "}
                {user.suspendReason && `Reason: ${user.suspendReason}`}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
