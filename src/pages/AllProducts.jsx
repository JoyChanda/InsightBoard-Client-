import { useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import axios from "axios";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const limit = 12;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/products?page=${page}&limit=${limit}`
        );

        setProducts(res.data.products);
        setTotalPages(res.data.totalPages);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProducts();
  }, [page]);

  return (
    <div className="container mx-auto px-4 py-10">

      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
        All Products
      </h1>

      {/* 3-column Grid */}
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
    </div>
  );
};

export default AllProducts;
