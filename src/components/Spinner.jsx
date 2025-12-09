import React from "react";

const Spinner = () => {
  return (
    <div className="flex justify-center py-10">
      <div className="w-8 h-8 border-4 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default Spinner;
