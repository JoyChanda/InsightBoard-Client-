const DashboardFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-base-100 border-t border-base-200 mt-auto transition-colors">
      <div className="px-6 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0">
          {/* Copyright */}
          <p className="text-sm text-center text-base-content/70">
            © {currentYear} InsightBoard. All rights reserved.
          </p>

          {/* Footer Links */}
          <div className="flex items-center justify-center flex-wrap gap-x-4 gap-y-2">
            <a
              href="#"
              className="text-sm text-base-content/70 hover:text-primary transition-colors"
            >
              Privacy Policy
            </a>
            <span className="text-base-content/30 hidden sm:inline">•</span>
            <a
              href="#"
              className="text-sm text-base-content/70 hover:text-primary transition-colors"
            >
              Terms of Service
            </a>
            <span className="text-base-content/30 hidden sm:inline">•</span>
            <a
              href="#"
              className="text-sm text-base-content/70 hover:text-primary transition-colors"
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
