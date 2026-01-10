import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  const { price, _id } = product;
  // Handle data structure differences between API (title, images, qty, desc) and Mock (name, image, availableQuantity, description)
  const title = product.title || product.name || "Untitled Product";
  const image = product.images?.[0] || product.image || "https://via.placeholder.com/400x300?text=No+Image";
  const qty = product.qty ?? product.availableQuantity ?? 0;
  const description = product.desc || product.description || "";
  const truncatedDesc = description.length > 60 ? description.slice(0, 60) + "..." : description;

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all overflow-hidden group border border-base-300"
    >
      <figure className="h-48 overflow-hidden relative">
        <Link to={`/products/${_id}`} className="w-full h-full block">
          <motion.img
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.4 }}
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
        </Link>
        {/* Quantity Badge */}
        <div className="absolute top-2 right-2 badge bg-base-100/90 text-base-content backdrop-blur-sm text-xs font-bold shadow-md border border-base-300">
          Qty: {qty}
        </div>
      </figure>

      <div className="card-body p-5">
        <div className="text-xs uppercase font-medium text-base-content/50 tracking-wider">
          {product.category || "General"}
        </div>
        
        <Link to={`/products/${_id}`} className="hover:underline">
          <h2 className="card-title text-lg text-base-content line-clamp-1" title={title}>
            {title}
          </h2>
        </Link>
        
        {/* Description */}
        {truncatedDesc && (
          <p className="text-sm text-base-content/70 mb-3 min-h-[40px]">{truncatedDesc}</p>
        )}

        <div className="flex justify-between items-center mt-auto">
          <p className="text-primary font-bold text-xl">${price}</p>

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
