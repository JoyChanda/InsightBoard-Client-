import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";
import API from "../api";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await API.get("/products/home");
        setProducts(res.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching home products:", err);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <Hero />

      {/* Featured Products Section */}
      <section className="py-16 px-6 bg-base-200">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-2 text-center">Featured Products</h2>
            <p className="text-center text-lg opacity-70 mb-12">
              Discover our top campaigns and analytics tools
            </p>

            {/* Loading State */}
            {loading && (
              <div className="flex justify-center items-center py-20">
                <span className="loading loading-spinner loading-lg text-primary"></span>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="alert alert-error max-w-md mx-auto">
                <span>{error}</span>
              </div>
            )}

            {/* Products Grid */}
            {!loading && !error && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product, index) => (
                  <motion.div
                    key={product._id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </div>
            )}

            {/* Empty State */}
            {!loading && !error && products.length === 0 && (
              <div className="text-center py-20">
                <p className="text-xl opacity-70">No products available at the moment</p>
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
