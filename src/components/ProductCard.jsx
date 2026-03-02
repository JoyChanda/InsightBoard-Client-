import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  const { price, _id } = product;
  // Handle data structure differences between API (title, images, qty, desc) and Mock (name, image, availableQuantity, description)
  const title = product.title || product.name || "Untitled Product";
  const getImageUrl = () => {
    const rawImage = product.images?.[0] || product.image;
    if (!rawImage) return "https://placehold.co/600x400/2563EB/FFFFFF?text=InsightBoard+Product";
    
    // Check if it's already a full URL
    if (typeof rawImage === "string" && (rawImage.startsWith("http") || rawImage.startsWith("//"))) {
       // If it's a known failing domain, replace it
       if (rawImage.includes("i.ibb.co")) {
          return `https://placehold.co/600x400/2563EB/FFFFFF?text=${encodeURIComponent(title)}`;
       }
       return rawImage;
    }

    // Handle relative paths
    if (typeof rawImage === "string" && rawImage.startsWith("/")) {
       // Get API host without /api suffix
       let apiBase = import.meta.env.VITE_API_URL || "http://localhost:5000";
       const apiRoot = apiBase.replace(/\/api\/?$/, ""); 
       return `${apiRoot}${rawImage}`;
    }

    return rawImage;
  };

  const image = getImageUrl();
  const qty = product.qty ?? product.availableQuantity ?? 0;
  const description = product.desc || product.description || "";
  const truncatedDesc = description.length > 60 ? description.slice(0, 60) + "..." : description;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5, scale: 1.01 }}
      transition={{ duration: 0.5 }}
      className="group relative bg-base-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 border border-base-300/50 flex flex-col h-full"
    >
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden bg-base-200 flex items-center justify-center">
        <Link to={`/products/${_id}`} className="block h-full w-full">
          <motion.img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-all duration-700"
            onError={(e) => {
              e.target.onerror = null; // Prevent infinite loop
              e.target.src = `https://placehold.co/600x400/213547/FFFFFF?text=${encodeURIComponent(title)}`;
            }}
          />
        </Link>
        
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 rounded-full bg-primary text-white text-[10px] font-black uppercase tracking-widest shadow-xl">
            {product.category || "New Arrival"}
          </span>
        </div>

        {/* Qty Badge */}
        <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-primary text-white text-[10px] font-black uppercase tracking-widest shadow-xl">
          STOCK: {qty}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <Link to={`/products/${_id}`}>
          <h3 className="text-xl font-black text-base-content mb-2 line-clamp-1 group-hover:text-primary transition-colors" title={title}>
            {title}
          </h3>
        </Link>
        <p className="text-sm text-base-content/90 leading-relaxed font-medium line-clamp-2 mb-6 flex-grow">
          {truncatedDesc}
        </p>

        {/* Footer with Glass Effect */}
        <div className="flex items-center justify-between pt-4 border-t border-base-300/50">
          <div>
            <span className="text-xs font-bold text-base-content/60 uppercase tracking-tighter block">Unit Price</span>
            <span className="text-2xl font-black text-primary">${price}</span>
          </div>
          
          <Link to={`/products/${_id}`}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 rounded-2xl bg-base-200 group-hover:bg-primary group-hover:text-white transition-all duration-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
