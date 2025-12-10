const DashboardFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-auto">
      <div className="px-6 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0">
          {/* Copyright */}
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © {currentYear} InsightBoard. All rights reserved.
          </p>

          {/* Footer Links */}
          <div className="flex items-center space-x-4">
            <a
              href="#"
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
            >
              Privacy Policy
            </a>
            <span className="text-gray-400">•</span>
            <a
              href="#"
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
            >
              Terms of Service
            </a>
            <span className="text-gray-400">•</span>
            <a
              href="#"
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
            >
              Help & Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default DashboardFooter;
