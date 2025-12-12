import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./Sidebar";
import DashboardHeader from "../../components/DashboardHeader";
import Footer from "../../components/Footer";

const DashboardLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div
      className="
        min-h-screen flex flex-col
        bg-base-100 dark:bg-base-100
        text-base-content
        transition-colors duration-300
      "
    >
      {/* Header */}
      <DashboardHeader toggleMobileMenu={toggleMobileMenu} />

      {/* Body */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Sidebar */}
        <Sidebar 
          isMobileMenuOpen={isMobileMenuOpen} 
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />

        {/* Overlay for mobile menu */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Main Content */}
        <main
          className="
            flex-1 overflow-y-auto 
            p-4 sm:p-6 pb-12
            bg-gray-50 dark:bg-base-200
            md:border-l border-gray-200 dark:border-base-300
            transition-all duration-300
            w-full
          "
        >
          <Outlet />
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default DashboardLayout;
