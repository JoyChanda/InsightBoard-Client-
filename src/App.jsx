import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import AllProducts from "./pages/AllProducts";
import ProductDetails from "./pages/ProductDetails";
import Booking from "./pages/Booking";
import Unauthorized from "./pages/Unauthorized";
import PrivateRoute from "./components/PrivateRoute";
import DashboardLayout from "./pages/dashboard/Layout";
import DashboardHome from "./pages/dashboard/DashboardHome";
import ManageUsers from "./pages/dashboard/Admin/ManageUsers";
import AdminAllProducts from "./pages/dashboard/Admin/AdminAllProducts";
import AdminAllOrders from "./pages/dashboard/Admin/AdminAllOrders";
import AnalyticsDashboard from "./pages/dashboard/Admin/AnalyticsDashboard";
import AddProduct from "./pages/dashboard/Manager/AddProduct";
import ManageProducts from "./pages/dashboard/Manager/ManageProducts";
import ManagerReports from "./pages/dashboard/Manager/ManagerReports";
import TeamPerformance from "./pages/dashboard/Manager/TeamPerformance";
import PendingOrders from "./pages/dashboard/Manager/PendingOrders";
import ApprovedOrders from "./pages/dashboard/Manager/ApprovedOrders";
import MyOrders from "./pages/dashboard/Buyer/MyOrders";
import Wishlist from "./pages/dashboard/Buyer/Wishlist";
import TrackOrder from "./pages/dashboard/Buyer/TrackOrder";
import Profile from "./pages/dashboard/Profile";
import NotFound from "./pages/NotFound";
import "react-toastify/dist/ReactToastify.css";
import "./styles/global.css";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />
              <Route path="privacy-policy" element={<PrivacyPolicy />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />
              <Route path="products" element={<AllProducts />} />
              <Route path="products/:id" element={<ProductDetails />} />
              <Route path="unauthorized" element={<Unauthorized />} />
              
              {/* Protected Booking Route */}
              <Route
                path="booking/:id"
                element={
                  <PrivateRoute allowedRoles={["buyer"]}>
                    <Booking />
                  </PrivateRoute>
                }
              />
            </Route>


            {/* Protected Dashboard Routes */}
            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<DashboardLayout />}>
                <Route index element={<DashboardHome />} />

                {/* Admin-only routes */}
                <Route
                  element={
                    <PrivateRoute
                      allowedRoles={["admin", "superadmin"]}
                      requireAdminGate
                    />
                  }
                >
                  <Route path="manage-users" element={<ManageUsers />} />
                  <Route path="all-products" element={<AdminAllProducts />} />
                  <Route path="all-orders" element={<AdminAllOrders />} />
                  <Route path="analytics" element={<AnalyticsDashboard />} />
                </Route>

                {/* Manager routes */}
                <Route
                  element={
                    <PrivateRoute
                      allowedRoles={["manager", "superadmin"]}
                    />
                  }
                >
                  <Route path="add-product" element={<AddProduct />} />
                  <Route path="manage-products" element={<ManageProducts />} />
                  <Route path="reports" element={<ManagerReports />} />
                  <Route path="team-performance" element={<TeamPerformance />} />
                  <Route path="pending-orders" element={<PendingOrders />} />
                  <Route path="approved-orders" element={<ApprovedOrders />} />
                </Route>

                {/* Buyer (and potentially others if they buy) routes */}
                <Route
                  element={
                    <PrivateRoute
                      allowedRoles={["buyer", "manager", "admin", "superadmin"]}
                    />
                  }
                >
                  <Route path="my-orders" element={<MyOrders />} />
                  <Route path="wishlist" element={<Wishlist />} />
                  <Route path="track-order/:id" element={<TrackOrder />} />
                  <Route
                    path="profile"
                    element={<Profile />}
                  />
                </Route>
              </Route>
            </Route>

            {/* 404 Page - No Layout */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
