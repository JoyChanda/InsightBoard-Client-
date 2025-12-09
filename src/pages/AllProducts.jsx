import { useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import axios from "axios";

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
    <div className="container mx-auto px-4 py-10">

      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
        All Products
      </h1>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-10">
          <div className="loading loading-spinner loading-lg"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading products...</p>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="alert alert-error">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{error}</span>
        </div>
      )}

      {/* Products Grid */}
      {!loading && !error && products.length > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow p-4"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded"
                />

                <h2 className="text-lg font-semibold mt-3 text-gray-900 dark:text-gray-100">
                  {product.name}
                </h2>

                <p className="text-gray-600 dark:text-gray-300 py-1">
                  ${product.price}
                </p>

                <button className="mt-2 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
                  View Details
                </button>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <Pagination page={page} setPage={setPage} totalPages={totalPages} />
        </>
      )}

      {/* Empty State */}
      {!loading && !error && products.length === 0 && (
        <div className="text-center py-10">
          <div className="text-6xl mb-4">📦</div>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
            No Products Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            There are no products available at the moment. Please check back later.
          </p>
        </div>
      )}
    </div>
  );
};

export default AllProducts;
