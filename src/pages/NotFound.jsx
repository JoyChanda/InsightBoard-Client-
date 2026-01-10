import React from "react";
import { Link } from "react-router-dom";
import useTitle from "../hooks/useTitle";
import { motion } from "framer-motion";

const NotFound = () => {
  useTitle("404 Not Found");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-base-200">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full"
      >
        {/* 404 Number */}
        <div className="mb-8">
          <h1 className="text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
            404
          </h1>
        </div>

        {/* Icon */}
        <div className="text-7xl mb-6">🔍</div>

        {/* Message */}
        <h2 className="text-3xl font-bold text-base-content mb-4 tracking-tight">
          Page Not Found
        </h2>
        
        <p className="text-lg text-base-content/60 mb-10 leading-relaxed">
          Oops! The page you're looking for doesn't exist. It might have been moved or deleted by our production team.
        </p>

        {/* Button */}
        <Link
          to="/"
          className="btn btn-primary btn-lg px-10 shadow-xl hover:shadow-2xl hover:scale-[1.05] transition-all"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
