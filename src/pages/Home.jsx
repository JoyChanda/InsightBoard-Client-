import { useEffect, useState } from "react";
import Hero from "../components/Hero";
import Section from "../components/Section";
import ProductCard from "../components/ProductCard";
import HowItWorks from "../components/HowItWorks";
import CustomerFeedback from "../components/CustomerFeedback";
import Features from "../components/sections/Features";
import Services from "../components/sections/Services";
import Categories from "../components/sections/Categories";
import Highlights from "../components/sections/Highlights";
import Statistics from "../components/sections/Statistics";
import Blogs from "../components/sections/Blogs";
import FAQ from "../components/sections/FAQ";
import CTA from "../components/sections/CTA";
import { mockProducts } from "../data/mockProducts";
import API from "../api";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        try {
          const res = await API.get("/products/home");
          const fetchedProducts = res.data.products || res.data;
          
          if (Array.isArray(fetchedProducts) && fetchedProducts.length > 0) {
            setProducts(fetchedProducts);
            setLoading(false);
          } else {
             setProducts(mockProducts.slice(0, 3)); // Only 3 for landing page
             setLoading(false);
          }
        } catch (apiError) {
          setProducts(mockProducts.slice(0, 3));
          setLoading(false);
        }
      } catch (err) {
        setError("Failed to load products");
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="space-y-0">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Features Section */}
      <Section 
        title="Powerful Key Features" 
        subtitle="Designed to handle high-volume garment production with ease and precision."
        className="bg-base-100"
      >
        <Features />
      </Section>

      {/* 3. Services Section */}
      <Section 
        title="Core Services" 
        subtitle="End-to-end manufacturing orchestration for modern businesses."
        className="bg-base-200"
      >
        <Services />
      </Section>

      {/* 4. Products Section (Featured) */}
      <Section 
        id="products-section"
        title="Featured Order Opportunities" 
        subtitle="Explore our latest production batches available for bulk ordering."
        className="bg-base-100"
      >
        {loading && <div className="text-center py-10"><span className="loading loading-spinner text-primary"></span></div>}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((p) => <ProductCard key={p._id} product={p} />)}
          </div>
        )}
      </Section>

      {/* 5. Categories Section */}
      <Section 
        title="User Analytics Categories" 
        subtitle="Tailored experiences for every role in the manufacturing ecosystem."
        className="bg-base-200"
      >
        <Categories />
      </Section>

      {/* 6. Highlights Section */}
      <Section 
        title="Platform Highlights" 
        subtitle="A quick overview of our global reach and system performance."
        className="bg-base-100"
      >
        <Highlights />
      </Section>

      {/* 7. Statistics Section */}
      <Section 
        title="Detailed Statistics" 
        subtitle="Real-time data visualization of factory output and accuracy."
        className="bg-base-200"
      >
        <Statistics />
      </Section>

      {/* 8. Testimonials Section (Wrapped) */}
      <div className="bg-base-100">
        <CustomerFeedback />
      </div>

      {/* 9. Blogs Section */}
      <Section 
        title="Industry Insights" 
        subtitle="Latest news and guide from our manufacturing experts."
        className="bg-base-200"
      >
        <Blogs />
      </Section>

      {/* 10. How It Works (Special Step Section) */}
      <div id="how-it-works-section">
        <HowItWorks />
      </div>

      {/* 11. FAQ Section */}
      <Section 
        title="Frequently Asked Questions" 
        subtitle="Everything you need to know about the InsightBoard platform."
        className="bg-base-200"
      >
        <FAQ />
      </Section>

      {/* 12. CTA Section */}
      <Section className="bg-base-100 mb-10">
        <CTA />
      </Section>
    </div>
  );
}

