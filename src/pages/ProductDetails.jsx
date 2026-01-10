import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import Section from "../components/Section";
import ProductCard from "../components/ProductCard";
import ProductSkeleton from "../components/ProductSkeleton";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [relatedLoading, setRelatedLoading] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        window.scrollTo(0, 0);
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/products/${id}`
        );
        setProduct(res.data);
        fetchRelated(res.data.category, res.data._id);
      } catch (err) {
        setError("Failed to load product details.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const fetchRelated = async (category, currentId) => {
    try {
      setRelatedLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/products?category=${category}&limit=5`
      );
      const filtered = (res.data.products || []).filter(p => p._id !== currentId);
      setRelatedProducts(filtered.slice(0, 4));
    } catch (err) {
      console.error("Failed to fetch related products", err);
    } finally {
      setRelatedLoading(false);
    }
  };

  const handleBookNow = () => {
    if (!user) {
      navigate("/login", { state: { from: `/products/${id}` } });
      return;
    }
    navigate(`/booking/${id}`);
  };

  const handleAddToWishlist = () => {
    if (!user) {
      toast.error("Please login to add to wishlist");
      navigate("/login", { state: { from: `/products/${id}` } });
      return;
    }
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    const exists = wishlist.find((p) => p._id === product._id);
    if (exists) {
      toast.info("Item already in wishlist");
      return;
    }
    wishlist.push(product);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    toast.success("Added to wishlist!");
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen bg-base-200">
      <div className="loading loading-spinner loading-lg text-primary"></div>
    </div>
  );

  if (error || !product) return (
    <div className="text-center py-20 bg-base-200 min-h-screen">
      <h2 className="text-3xl font-bold text-error">{error || "Product not found"}</h2>
      <Link to="/products" className="btn btn-primary mt-6">Back to Products</Link>
    </div>
  );

  const isSuspended = user && user.status === "suspended";
  let buttonText = "Book Now";
  let isDisabled = false;

  if (user && user.role !== "buyer") {
    buttonText = "Restricted to Buyers";
    isDisabled = true;
  } else if (isSuspended) {
    buttonText = "Account Suspended";
    isDisabled = true;
  } else if (product.qty === 0) {
    buttonText = "Out of Stock";
    isDisabled = true;
  }

  const getImageUrl = (img) => {
    if (!img) return "https://placehold.co/600x400?text=No+Image";
    return img.startsWith("http") ? img : `${import.meta.env.VITE_API_URL}/${img}`;
  };

  return (
    <div className="bg-base-200 min-h-screen pb-16">
      {/* 1. Overview Section (Main Product Info) */}
      <Section className="bg-base-100 dark:bg-base-200 pt-10">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left: Image Carousel */}
          <div className="w-full lg:w-1/2">
            <div className="carousel w-full rounded-2xl overflow-hidden shadow-2xl border border-base-300">
              {product.images?.length > 0 ? (
                product.images.map((img, i) => (
                  <div key={i} id={`slide${i}`} className="carousel-item relative w-full h-[300px] md:h-[500px]">
                    <img src={getImageUrl(img)} className="w-full h-full object-cover" alt={product.title} />
                    {product.images.length > 1 && (
                      <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <a href={`#slide${i === 0 ? product.images.length - 1 : i - 1}`} className="btn btn-circle btn-sm bg-base-100/50">❮</a>
                        <a href={`#slide${i === product.images.length - 1 ? 0 : i + 1}`} className="btn btn-circle btn-sm bg-base-100/50">❯</a>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="carousel-item w-full h-[500px] bg-base-300 flex items-center justify-center">
                   <span className="text-xl font-bold opacity-30">No Image Available</span>
                </div>
              )}
            </div>
            
            {/* Thumbnails */}
            {product.images?.length > 1 && (
                <div className="flex gap-4 mt-6 overflow-x-auto pb-2">
                    {product.images.map((img, i) => (
                        <a key={i} href={`#slide${i}`} className="w-20 h-20 rounded-lg overflow-hidden border-2 border-transparent hover:border-primary transition-all shrink-0">
                            <img src={getImageUrl(img)} className="w-full h-full object-cover" />
                        </a>
                    ))}
                </div>
            )}
          </div>

          {/* Right: Summary & Purchase */}
          <div className="w-full lg:w-1/2 flex flex-col">
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <div className="flex gap-2 mb-4">
                    <span className="badge badge-primary badge-outline font-bold tracking-wider uppercase text-[10px]">{product.category}</span>
                    {product.qty < 5 && product.qty > 0 && <span className="badge badge-error text-white text-[10px] font-bold">LOW STOCK</span>}
                    {product.qty === 0 && <span className="badge badge-ghost text-[10px] font-bold">OUT OF STOCK</span>}
                </div>
                
                <h1 className="text-4xl md:text-5xl font-black text-base-content mb-4 tracking-tight leading-[1.1]">
                    {product.title}
                </h1>
                
                <div className="flex items-center gap-4 mb-8">
                    <span className="text-4xl font-extrabold text-primary">${product.price}</span>
                    <div className="h-8 w-px bg-base-300"></div>
                    <div className="flex flex-col">
                        <span className="text-[10px] font-bold opacity-50 uppercase">Inventory Status</span>
                        <span className="text-sm font-bold">{product.qty} Units Available</span>
                    </div>
                </div>

                <p className="text-lg text-base-content/70 leading-relaxed mb-10 italic">
                    {product.desc}
                </p>

                <div className="space-y-4 mb-10">
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-base-content/40">Quick Stats</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-base-200 rounded-xl border border-base-300">
                            <span className="block text-[10px] font-bold opacity-50 uppercase mb-1">Min Order</span>
                            <span className="text-lg font-bold">{product.minQty} units</span>
                        </div>
                        <div className="p-4 bg-base-200 rounded-xl border border-base-300">
                            <span className="block text-[10px] font-bold opacity-50 uppercase mb-1">Production Code</span>
                            <span className="text-lg font-bold">#PROD-{product._id.slice(-5).toUpperCase()}</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                    <button
                        onClick={handleBookNow}
                        disabled={isDisabled}
                        className={`btn btn-lg h-16 sm:flex-[2] ${isDisabled ? "btn-disabled bg-base-300" : "btn-primary"} shadow-2xl hover:scale-[1.02] transition-all`}
                    >
                        {buttonText}
                    </button>
                    <button 
                        onClick={handleAddToWishlist}
                        className="btn btn-lg h-16 sm:flex-1 btn-outline border-base-300 hover:border-secondary hover:bg-secondary/10"
                        title="Add to Wishlist"
                    >
                        <span className="text-2xl">❤</span>
                    </button>
                </div>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* 2. Key Information / Specifications Section */}
      <Section title="Key Information" subtitle="Detailed specifications and logistics data for this production order." className="bg-base-200">
        <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
                <h3 className="text-xl font-bold border-b border-base-300 pb-2">Logistics & Payments</h3>
                <div className="overflow-x-auto">
                    <table className="table bg-base-100 rounded-xl overflow-hidden shadow-sm">
                        <tbody>
                            <tr>
                                <td className="font-bold opacity-50 uppercase text-xs">Category</td>
                                <td className="font-semibold">{product.category}</td>
                            </tr>
                            <tr>
                                <td className="font-bold opacity-50 uppercase text-xs">Minimum Qty</td>
                                <td className="font-semibold">{product.minQty} Units</td>
                            </tr>
                            <tr>
                                <td className="font-bold opacity-50 uppercase text-xs">Payment Options</td>
                                <td className="flex flex-wrap gap-1">
                                    {product.paymentOptions?.map(opt => <span key={opt} className="badge badge-sm badge-ghost">{opt}</span>)}
                                </td>
                            </tr>
                            {product.demoVideo && (
                                <tr>
                                    <td className="font-bold opacity-50 uppercase text-xs">Media</td>
                                    <td><a href={product.demoVideo} target="_blank" rel="noreferrer" className="link link-primary font-bold">Watch Video</a></td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            
            <div className="bg-primary/5 p-8 rounded-2xl border border-primary/20">
                <h3 className="text-xl font-bold mb-4">Production Overview</h3>
                <p className="text-base-content/80 leading-relaxed mb-6">
                    Our manufacturing hubs follow ISO 9001 certified processes. For this specific <strong>{product.title}</strong> batch, we ensure multiple quality checkpoints from sourcing to final packaging.
                </p>
                <div className="flex gap-4">
                    <div className="flex-1 text-center bg-base-100 p-4 rounded-xl shadow-sm border border-base-300">
                        <span className="text-2xl block mb-1">🛡️</span>
                        <span className="text-[10px] uppercase font-bold opacity-50">Certified Quality</span>
                    </div>
                    <div className="flex-1 text-center bg-base-100 p-4 rounded-xl shadow-sm border border-base-300">
                        <span className="text-2xl block mb-1">🚀</span>
                        <span className="text-[10px] uppercase font-bold opacity-50">Fast Shipping</span>
                    </div>
                </div>
            </div>
        </div>
      </Section>

      {/* 3. Related Items Section */}
      <Section title="Related Products" subtitle="Complementary production orders you might be interested in." className="bg-base-100">
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedLoading ? (
                [...Array(4)].map((_, i) => <ProductSkeleton key={i} />)
            ) : relatedProducts.length > 0 ? (
                relatedProducts.map(p => <ProductCard key={p._id} product={p} />)
            ) : (
                <div className="col-span-full py-10 text-center opacity-50 italic">No related products found in this category.</div>
            )}
         </div>
      </Section>
    </div>
  );
};

export default ProductDetails;
