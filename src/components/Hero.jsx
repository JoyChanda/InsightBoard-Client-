import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Hero() {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/hero-banner.jpg"
          alt="Garment Production"
          className="w-full h-full object-cover"
          onError={(e) => {
            // Fallback gradient if image fails to load
            e.target.style.display = 'none';
            e.target.parentElement.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-secondary/90"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center text-white max-w-4xl mx-auto"
        >
          {/* Logo */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.1, duration: 0.6, type: "spring" }}
            className="text-7xl mb-6"
          >
            🚢
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight"
          >
            Welcome to InsightBoard
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl md:text-2xl mb-10 opacity-95 leading-relaxed max-w-3xl mx-auto"
          >
            Streamline your garment production workflow with powerful order tracking and manufacturing management
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button
              onClick={() => scrollToSection("products-section")}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-lg bg-white text-primary hover:bg-gray-100 border-none px-10 shadow-xl"
            >
              View Products
            </motion.button>

            <motion.button
              onClick={() => scrollToSection("how-it-works-section")}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-lg btn-outline border-2 border-white text-white hover:bg-white hover:text-primary px-10"
            >
              Learn How It Works
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-white text-4xl opacity-75"
        >
          ↓
        </motion.div>
      </motion.div>
    </section>
  );
}
