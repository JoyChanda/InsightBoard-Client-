import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import AllProducts from "./pages/AllProducts";
import ProductDetails from "./pages/ProductDetails";
import Unauthorized from "./pages/Unauthorized";
import PrivateRoute from "./components/PrivateRoute";
import DashboardLayout from "./pages/Dashboard/Layout";
import DashboardHome from "./pages/Dashboard/DashboardHome";
import ManageUsers from "./pages/Dashboard/Admin/ManageUsers";
import AddProduct from "./pages/Dashboard/Manager/AddProduct";
import "react-toastify/dist/ReactToastify.css";
import "./styles/global.css";
import "./App.css";

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
              <Route path="unauthorized" element={<Unauthorized />} />
              <Route path="*" element={<div className="p-10 text-center">404 - Not Found</div>} />
            </Route>
            
            {/* Protected Dashboard Routes */}
            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<DashboardLayout />}>
                <Route index element={<DashboardHome />} />
                
                {/* Admin-only routes */}
                <Route element={<PrivateRoute requiredRole="admin" />}>
                  <Route path="users" element={<ManageUsers />} />
                </Route>
                
                {/* Manager routes */}
                <Route path="add-product" element={<AddProduct />} />
                
                {/* Add more dashboard pages here as you create them */}
                {/* <Route path="products" element={<ManageProducts />} /> */}
                {/* <Route path="orders" element={<ManageOrders />} /> */}
              </Route>
            </Route>
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
