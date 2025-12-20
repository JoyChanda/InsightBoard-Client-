const Spinner = ({ size = "md", message = "Loading..." }) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
    xl: "w-24 h-24",
  };

  return (
    <div className="flex flex-col items-center justify-center p-10 min-h-[300px]">
      <div className={`${sizeClasses[size]} relative`}>
        {/* Outer spinning ring */}
        <div className="absolute inset-0 border-4 border-base-200 rounded-full"></div>

        {/* Spinning gradient ring */}
        <div className="absolute inset-0 border-4 border-transparent border-t-primary rounded-full animate-spin"></div>

        {/* Inner pulsing dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
        </div>
      </div>

      {message && (
        <p className="mt-4 text-base-content/70 font-medium animate-pulse">
          {message}
        </p>
      )}
    </div>
  );
};

export default Spinner;
