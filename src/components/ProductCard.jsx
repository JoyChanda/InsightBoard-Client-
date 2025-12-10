import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  const { name, price, image, description, _id } = product;

  // Truncate description to max 80 characters
  const truncatedDesc = description
    ? description.length > 80
      ? description.substring(0, 80) + "..."
      : description
    : "";

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all overflow-hidden group"
    >
      <figure className="h-48 overflow-hidden">
        <motion.img
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.4 }}
          src={image || "https://via.placeholder.com/400x300"}
          alt={name}
          className="w-full h-full object-cover"
        />
      </figure>

      <div className="card-body">
        <h2 className="card-title text-lg">{name}</h2>
        
        {/* Description */}
        {truncatedDesc && (
          <p className="text-sm opacity-70 mb-2">{truncatedDesc}</p>
        )}

        <p className="text-primary font-bold text-xl">${price}</p>

        <div className="card-actions justify-end mt-2">
          <Link to={`/products/${_id}`}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-primary btn-sm"
            >
              View Details
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
