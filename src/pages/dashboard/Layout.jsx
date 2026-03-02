import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./Sidebar";
import DashboardHeader from "../../components/DashboardHeader";
import Footer from "../../components/Footer";
import { motion, AnimatePresence } from "framer-motion";

const DashboardLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div
      className="
        min-h-screen flex flex-col
        bg-base-200/50
        text-base-content
        transition-colors duration-300
        relative overflow-hidden
      "
    >
      {/* Dynamic Background Accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full -mr-64 -mt-64 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/5 blur-[100px] rounded-full -ml-32 -mb-32 pointer-events-none"></div>

      {/* Header */}
      <DashboardHeader toggleMobileMenu={toggleMobileMenu} />

      {/* Body */}
      <div className="flex flex-1 overflow-hidden relative z-10">
        {/* Sidebar */}
        <Sidebar 
          isMobileMenuOpen={isMobileMenuOpen} 
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />

        {/* Overlay for mobile menu */}
        <AnimatePresence>
            {isMobileMenuOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}
        </AnimatePresence>

        {/* Main Content */}
        <main
          className="
            flex-1 overflow-y-auto 
            p-4 sm:p-8 md:p-12
            transition-all duration-300
            w-full
          "
        >
          <div className="max-w-7xl mx-auto">
             <Outlet />
          </div>
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default DashboardLayout;

