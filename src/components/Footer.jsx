import { FaFacebook, FaInstagram, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const Footer = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  
  // Inline styles to override DaisyUI theme conflicts
  const headingStyle = { color: '#ffffff' }; // White for both modes
  const textStyle = { color: '#d1d5db' }; // Light gray for both modes

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 py-10">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Info - Brand & Description */}
          <div className="space-y-4 text-center md:text-left">
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <span className="text-3xl">🚢</span>
              <h2 className="text-xl font-bold" style={headingStyle}>InsightBoard</h2>
            </div>
            <p className="text-sm leading-relaxed" style={textStyle}>
              Your trusted garment production management platform for streamlined order tracking and efficient manufacturing workflows.
            </p>
            
            {/* Social Media */}
            <div className="flex gap-3 pt-2 justify-center md:justify-start">
              <a href="#" className="text-lg hover:text-blue-500 transition-colors" style={textStyle} aria-label="Facebook">
                <FaFacebook />
              </a>
              <a href="#" className="text-lg hover:text-pink-500 transition-colors" style={textStyle} aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href="#" className="text-lg hover:text-gray-400 transition-colors" style={textStyle} aria-label="Twitter">
                <FaXTwitter />
              </a>
              <a href="#" className="text-lg hover:text-blue-600 transition-colors" style={textStyle} aria-label="LinkedIn">
                <FaLinkedin />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4 text-center md:text-left">
            <h3 className="text-sm font-semibold uppercase tracking-wide" style={headingStyle}>Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm hover:text-blue-600 transition-all" style={textStyle}>Home</Link>
              </li>
              <li>
                <Link to="/about" className="text-sm hover:text-blue-600 transition-all" style={textStyle}>About Us</Link>
              </li>
              <li>
                <Link to="/products" className="text-sm hover:text-blue-600 transition-all" style={textStyle}>Products</Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-sm hover:text-blue-600 transition-all" style={textStyle}>Dashboard</Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4 text-center md:text-left">
            <h3 className="text-sm font-semibold uppercase tracking-wide" style={headingStyle}>Services</h3>
            <ul className="space-y-2">
              <li>
                <Link to="#" className="text-sm hover:text-blue-600 transition-all" style={textStyle}>Order Management</Link>
              </li>
              <li>
                <Link to="#" className="text-sm hover:text-blue-600 transition-all" style={textStyle}>Production Tracking</Link>
              </li>
              <li>
                <Link to="#" className="text-sm hover:text-blue-600 transition-all" style={textStyle}>Inventory Monitor</Link>
              </li>
              <li>
                <Link to="#" className="text-sm hover:text-blue-600 transition-all" style={textStyle}>Quality Control</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4 text-center md:text-left">
            <h3 className="text-sm font-semibold uppercase tracking-wide" style={headingStyle}>Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 justify-center md:justify-start">
                <FaMapMarkerAlt className="text-sm mt-1" style={textStyle} />
                <span className="text-sm" style={textStyle}>
                  456 Garment District<br />
                  Dhaka, Bangladesh
                </span>
              </li>
              <li className="flex items-center gap-2 justify-center md:justify-start">
                <FaEnvelope className="text-sm" style={textStyle} />
                <a href="mailto:contact@insightboard.com" className="text-sm hover:text-blue-600 transition-all" style={textStyle}>
                  contact@insightboard.com
                </a>
              </li>
              <li className="flex items-center gap-2 justify-center md:justify-start">
                <FaPhone className="text-sm" style={textStyle} />
                <a href="tel:+8801234567890" className="text-sm hover:text-blue-600 transition-all" style={textStyle}>
                  +880 123 456 7890
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            
            {/* Copyright */}
            <p className="text-sm text-center" style={textStyle}>
              © {new Date().getFullYear()} InsightBoard. All rights reserved.
            </p>

            {/* Legal Links */}
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="#" className="text-sm hover:text-blue-600 transition-all" style={textStyle}>Privacy Policy</Link>
              <Link to="#" className="text-sm hover:text-blue-600 transition-all" style={textStyle}>Terms of Service</Link>
              <Link to="#" className="text-sm hover:text-blue-600 transition-all" style={textStyle}>Cookie Policy</Link>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
