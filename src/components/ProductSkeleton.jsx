export default function ProductSkeleton() {
  return (
    <div className="card bg-base-100 border border-base-300 shadow-xl h-full animate-pulse">
      <div className="h-48 bg-base-300 w-full"></div>
      <div className="card-body p-5 space-y-3">
        <div className="h-4 bg-base-300 rounded w-1/2"></div>
        <div className="h-6 bg-base-300 rounded w-3/4"></div>
        <div className="h-10 bg-base-300 rounded w-full"></div>
        <div className="flex justify-between items-center mt-auto">
          <div className="h-6 bg-base-300 rounded w-1/4"></div>
          <div className="h-8 bg-base-300 rounded w-1/3"></div>
        </div>
      </div>
    </div>
  );
}
