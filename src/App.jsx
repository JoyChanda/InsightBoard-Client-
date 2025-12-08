import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import "./styles/global.css";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <div className="min-h-screen bg-base-100 transition-colors duration-300">
             <Navbar />
             <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    {/* Add other routes as they become available */}
                    <Route path="*" element={<div className="p-10 text-center">404 - Not Found</div>} />
                </Routes>
             </main>
          </div>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
