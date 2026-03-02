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
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-20">
      {/* Background with Mesh Gradient Effect */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700"></div>
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-white/10 blur-[120px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-400/20 blur-[120px] rounded-full"></div>
        
        {/* Abstract pattern overlay */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6">
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-white text-sm font-bold tracking-wider uppercase"
          >
            🚀 The Future of Garment Production
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-5xl md:text-8xl font-black text-white mb-8 leading-[1.1] tracking-tight"
          >
            Orchestrate Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-indigo-100">
              Manufacturing
            </span> Success
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-lg md:text-2xl text-blue-50/90 mb-12 leading-relaxed max-w-3xl mx-auto font-medium"
          >
            InsightBoard brings precision to every stitch. Streamline workflows, 
            track orders in real-time, and scale your production with data-driven insights.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center w-full sm:w-auto"
          >
            <motion.button
              onClick={() => scrollToSection("products-section")}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.98 }}
              className="px-10 py-5 rounded-2xl bg-white text-blue-700 font-black text-lg shadow-2xl shadow-white/10 hover:shadow-white/20 transition-all"
            >
              Explore Products
            </motion.button>

            <motion.button
              onClick={() => scrollToSection("how-it-works-section")}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.98 }}
              className="px-10 py-5 rounded-2xl bg-transparent border-2 border-white/30 hover:border-white text-white font-black text-lg backdrop-blur-sm transition-all"
            >
              See How It Works
            </motion.button>
          </motion.div>

          {/* Stats Preview */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 border-t border-white/10 pt-10"
          >
            {[
              { label: "Active Orders", value: "2.4k+" },
              { label: "Factory Partners", value: "150+" },
              { label: "Delivery Rate", value: "99.9%" },
              { label: "Support", value: "24/7" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl md:text-3xl font-black text-white">{stat.value}</div>
                <div className="text-xs md:text-sm text-blue-100/60 uppercase tracking-widest font-bold mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute top-1/4 left-10 w-24 h-24 bg-blue-400/20 rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-10 w-32 h-32 bg-indigo-500/20 rounded-full blur-2xl animate-float"></div>
    </section>
  );
}
