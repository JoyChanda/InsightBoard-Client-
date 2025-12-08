import { motion } from "framer-motion";

export default function ProductCard({ product }) {
  const { name, price, image, _id } = product;

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow cursor-pointer"
    >
      <figure className="h-48 overflow-hidden">
        <img
          src={image || "https://via.placeholder.com/400x300"}
          alt={name}
          className="w-full h-full object-cover"
        />
      </figure>

      <div className="card-body">
        <h2 className="card-title text-lg">{name}</h2>
        <p className="text-primary font-bold text-xl">${price}</p>

        <div className="card-actions justify-end mt-2">
          <button className="btn btn-primary btn-sm">
            View Details
          </button>
        </div>
      </div>
    </motion.div>
  );
}
