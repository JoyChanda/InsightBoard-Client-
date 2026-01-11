import { useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import API from "../api";
import ProductCard from "../components/ProductCard";
import ProductSkeleton from "../components/ProductSkeleton";
import { FaSearch, FaFilter, FaRedo } from "react-icons/fa";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const limit = 12;

  // Filter States
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sort, setSort] = useState("date_desc");

  // Debounced search could be added, but for now we fetch on state changes or explicit search button
  // Let's use a trigger approach for expensive filters but simple state for others

  const categories = [
    "all", "T-Shirt", "Polo", "Hoodie", "Jersey", "Uniform", "Jacket", "Formal", "Bottom", "Sweatshirt"
  ];

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const params = new URLSearchParams({
        page,
        limit,
        search,
        category: category === "all" ? "" : category,
        minPrice,
        maxPrice,
        sort
      });

      const res = await API.get(`/products?${params.toString()}`);

      setProducts(res.data.products || []);
      setTotalPages(res.data.totalPages || 1);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to load products. Please check your API connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page, category, sort]); // Fetch on page, category, or sort change

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchProducts();
  };

  const handleReset = () => {
    setSearch("");
    setCategory("all");
    setMinPrice("");
    setMaxPrice("");
    setSort("date_desc");
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-base-100 transition-colors duration-300">
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-black text-base-content mb-1">
              Explore Orders
            </h1>
            <p className="text-base-content/60">
              Browse through available production batches and bulk opportunities.
            </p>
          </div>
          
          <div className="flex gap-2">
             <button onClick={handleReset} className="btn btn-ghost btn-outline gap-2">
                <FaRedo className="text-xs" /> Reset
             </button>
          </div>
        </div>

        {/* Filters Section */}
        <div className="bg-base-200 p-6 rounded-2xl mb-10 shadow-sm border border-base-300">
           <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
              {/* Search */}
              <div className="form-control w-full">
                 <label className="label py-1"><span className="label-text font-bold text-xs uppercase opacity-70">Search</span></label>
                 <div className="relative">
                    <input 
                      type="text" 
                      placeholder="Product name..." 
                      className="input input-bordered w-full pl-10 focus:input-primary"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                    <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 opacity-30" />
                 </div>
              </div>

              {/* Category */}
              <div className="form-control w-full">
                 <label className="label py-1"><span className="label-text font-bold text-xs uppercase opacity-70">Category</span></label>
                 <select 
                    className="select select-bordered w-full focus:select-primary"
                    value={category}
                    onChange={(e) => {
                        setCategory(e.target.value);
                        setPage(1);
                    }}
                 >
                    {categories.map(cat => (
                        <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                    ))}
                 </select>
              </div>

              {/* Price Range */}
              <div className="form-control w-full">
                 <label className="label py-1"><span className="label-text font-bold text-xs uppercase opacity-70">Price Range ($)</span></label>
                 <div className="flex items-center gap-2">
                    <input 
                      type="number" 
                      placeholder="Min" 
                      className="input input-bordered w-full input-sm h-12 focus:input-primary"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                    />
                    <span className="opacity-30">-</span>
                    <input 
                      type="number" 
                      placeholder="Max" 
                      className="input input-bordered w-full input-sm h-12 focus:input-primary"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                    />
                 </div>
              </div>

              {/* Sort */}
              <div className="form-control w-full">
                 <label className="label py-1"><span className="label-text font-bold text-xs uppercase opacity-70">Sort By</span></label>
                 <select 
                    className="select select-bordered w-full focus:select-primary"
                    value={sort}
                    onChange={(e) => {
                        setSort(e.target.value);
                        setPage(1);
                    }}
                 >
                    <option value="date_desc">Newest First</option>
                    <option value="price_asc">Price: Low to High</option>
                    <option value="price_desc">Price: High to Low</option>
                    <option value="date_asc">Oldest First</option>
                 </select>
              </div>

              {/* Apply Button */}
              <button type="submit" className="btn btn-primary w-full gap-2">
                 <FaFilter /> Apply Filters
              </button>
           </form>
        </div>

        {/* Error State */}
        {error && !loading && (
          <div className="alert alert-error mb-8 shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>

              {/* Pagination */}
              <Pagination page={page} setPage={setPage} totalPages={totalPages} />
            </>
          ) : !error && (
            <div className="text-center py-20 bg-base-200 rounded-3xl border-2 border-dashed border-base-300">
              <div className="text-8xl mb-6 grayscale opacity-50">🔍</div>
              <h2 className="text-3xl font-black text-base-content mb-2">
                No Results Match Your Search
              </h2>
              <p className="text-base-content/60 max-w-md mx-auto mb-8">
                We couldn't find any products matching your current filters. Try adjusting your search or clearing the filters.
              </p>
              <button onClick={handleReset} className="btn btn-primary px-8">
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
