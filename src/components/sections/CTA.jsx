import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const CTA = () => {
  return (
    <div className="bg-primary rounded-3xl p-8 md:p-16 text-center text-primary-content relative overflow-hidden shadow-2xl">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/20 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>
      
      <div className="relative z-10 max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight text-white">
          Ready to Streamline Your Production?
        </h2>
        <p className="text-lg md:text-xl mb-10 opacity-90 text-white">
          Join hundreds of manufacturers already using InsightBoard to power their business growth and efficiency.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/register" className="btn btn-lg bg-white text-primary hover:bg-gray-100 border-none px-12">
            Get Started Now
          </Link>
          <Link to="/about" className="btn btn-lg btn-outline border-white text-white hover:bg-white hover:text-primary px-12">
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CTA;
