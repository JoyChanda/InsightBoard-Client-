import { useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import ProductSkeleton from "../components/ProductSkeleton";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const limit = 12;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/products?page=${page}&limit=${limit}`
        );

        setProducts(res.data.products || []);
        setTotalPages(res.data.totalPages || 1);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please check your API connection.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page]);

  return (
    <div className="min-h-screen bg-base-100 transition-colors duration-300">
      <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-base-content">
        All Products
      </h1>

      {/* Error State */}
      {error && !loading && (
        <div className="alert alert-error mb-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{error}</span>
        </div>
      )}

      {/* Grid Content */}
      <div className="min-h-[400px]">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(limit)].map((_, i) => <ProductSkeleton key={i} />)}
          </div>
        ) : products.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>

            {/* Pagination */}
            <Pagination page={page} setPage={setPage} totalPages={totalPages} />
          </>
        ) : !error && (
          <div className="text-center py-10">
            <div className="text-6xl mb-4">📦</div>
            <h2 className="text-2xl font-semibold text-base-content mb-2">
              No Products Found
            </h2>
            <p className="text-base-content/70">
              There are no products available at the moment. Please check back later.
            </p>
          </div>
        )}
      </div>
      </div>
    </div>
  );
};

export default AllProducts;
