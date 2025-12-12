import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import AllProducts from "./pages/AllProducts";
import ProductDetails from "./pages/ProductDetails";
import AdminAccess from "./pages/AdminAccess";
import Booking from "./pages/Booking";
import Unauthorized from "./pages/Unauthorized";
import PrivateRoute from "./components/PrivateRoute";
import DashboardLayout from "./pages/Dashboard/Layout";
import DashboardHome from "./pages/Dashboard/DashboardHome";
import ManageUsers from "./pages/Dashboard/Admin/ManageUsers";
import AdminAllProducts from "./pages/Dashboard/Admin/AdminAllProducts";
import AdminAllOrders from "./pages/Dashboard/Admin/AdminAllOrders";
import AnalyticsDashboard from "./pages/Dashboard/Admin/AnalyticsDashboard";
import AddProduct from "./pages/Dashboard/Manager/AddProduct";
import ManageProducts from "./pages/Dashboard/Manager/ManageProducts";
import PendingOrders from "./pages/Dashboard/Manager/PendingOrders";
import ApprovedOrders from "./pages/Dashboard/Manager/ApprovedOrders";
import MyOrders from "./pages/Dashboard/Buyer/MyOrders";
import Wishlist from "./pages/Dashboard/Buyer/Wishlist";
import TrackOrder from "./pages/Dashboard/Buyer/TrackOrder";
import Profile from "./pages/Dashboard/Profile";
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
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />
              <Route path="products" element={<AllProducts />} />
              <Route path="products/:id" element={<ProductDetails />} />
              <Route path="admin-access" element={<AdminAccess />} />
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
                      allowedRoles={["manager"]}
                    />
                  }
                >
                  <Route path="add-product" element={<AddProduct />} />
                  <Route path="manage-products" element={<ManageProducts />} />
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
