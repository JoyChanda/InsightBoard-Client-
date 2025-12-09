import React from "react";
import { Link } from "react-router-dom";
import useTitle from "../hooks/useTitle";

const NotFound = () => {
  useTitle("404 Not Found");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* 404 Number */}
      <div className="mb-8">
        <h1 className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
          404
        </h1>
      </div>

      {/* Icon */}
      <div className="text-6xl mb-4">🔍</div>

      {/* Message */}
      <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">
        Page Not Found
      </h2>
      
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-md">
        Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
      </p>

      {/* Button */}
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
      >
        <svg
          className="w-5 h-5"
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
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
