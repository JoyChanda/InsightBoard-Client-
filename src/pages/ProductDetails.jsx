import { useState } from "react";
import { useParams } from "react-router-dom";
import BookingForm from "../components/BookingForm";

const ProductDetails = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const { id } = useParams(); // Get product ID from URL

  // Example dummy product
  // TODO: Replace with actual API call: axios.get(`${import.meta.env.VITE_API_URL}/products/${id}`)
  const product = {
    id: id,
    name: "Premium Camera",
    price: 1200,
    description:
      "High-quality digital camera perfect for photography enthusiasts.",
    image:
      "https://images.unsplash.com/photo-1519183071298-a2962be90b8e?auto=format&fit=crop&w=800&q=80",
  };

  console.log("Product ID from URL:", id);

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Product Section */}
      <div className="flex flex-col md:flex-row gap-6 bg-white shadow rounded-xl p-5">
        <img
          src={product.image}
          alt={product.name}
          className="w-full md:w-1/2 rounded-xl object-cover"
        />

        <div className="flex-1">
          <h1 className="text-3xl font-bold">{product.name}</h1>

          <p className="text-xl font-semibold text-green-600 mt-3">
            ${product.price}
          </p>

          <p className="text-gray-600 mt-4 leading-relaxed">
            {product.description}
          </p>

          <button
            onClick={() => setIsBookingOpen(true)}
            className="mt-6 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Book Now
          </button>
        </div>
      </div>

      {/* Booking Form Modal */}
      {isBookingOpen && (
        <BookingForm onClose={() => setIsBookingOpen(false)} product={product} />
      )}
    </div>
  );
};

export default ProductDetails;
