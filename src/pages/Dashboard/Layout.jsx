import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import DashboardHeader from "../../components/DashboardHeader";
import Footer from "../../components/Footer";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
      {/* Header - Top Section */}
      <DashboardHeader />

      {/* Main Body - Middle Section (Sidebar + Content) */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Left Section (Routes/Links) */}
        <Sidebar />

        {/* Main Content - Right Section (Content/Pages) */}
        <main className="flex-1 overflow-y-auto p-6 pb-12">
          <Outlet />
        </main>
      </div>

      {/* Footer - Bottom Section */}
      <Footer />
    </div>
  );
};

export default DashboardLayout;

