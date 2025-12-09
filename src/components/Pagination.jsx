const Pagination = ({ page, setPage, totalPages }) => {
  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  return (
    <div className="flex items-center justify-center gap-4 mt-10">

      <button
        onClick={handlePrev}
        disabled={page === 1}
        className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded disabled:opacity-50"
      >
        Prev
      </button>

      <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">
        Page {page} of {totalPages}
      </span>

      <button
        onClick={handleNext}
        disabled={page === totalPages}
        className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded disabled:opacity-50"
      >
        Next
      </button>

    </div>
  );
};

export default Pagination;
