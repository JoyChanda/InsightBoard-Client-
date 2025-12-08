import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content py-12">
      <div className="container">

        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Logo + Description */}
          <div>
            <h1 className="text-2xl font-bold mb-3 flex items-center gap-2">
              <span className="text-3xl">🚢</span>
              InsightBoard
            </h1>
            <p className="text-sm opacity-80">
              We provide top-notch analytics and campaign management services.  
              Quality and customer satisfaction is our main priority.
            </p>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Services</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="#" className="link link-hover opacity-80 hover:opacity-100 transition-opacity">
                  Campaign Management
                </Link>
              </li>
              <li>
                <Link to="#" className="link link-hover opacity-80 hover:opacity-100 transition-opacity">
                  Analytics Dashboard
                </Link>
              </li>
              <li>
                <Link to="#" className="link link-hover opacity-80 hover:opacity-100 transition-opacity">
                  Data Insights
                </Link>
              </li>
              <li>
                <Link to="#" className="link link-hover opacity-80 hover:opacity-100 transition-opacity">
                  Reporting Tools
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="#" className="link link-hover opacity-80 hover:opacity-100 transition-opacity">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="#" className="link link-hover opacity-80 hover:opacity-100 transition-opacity">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="#" className="link link-hover opacity-80 hover:opacity-100 transition-opacity">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="#" className="link link-hover opacity-80 hover:opacity-100 transition-opacity">
                  Live Chat
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Terms Column */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="#" className="link link-hover opacity-80 hover:opacity-100 transition-opacity">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="#" className="link link-hover opacity-80 hover:opacity-100 transition-opacity">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="#" className="link link-hover opacity-80 hover:opacity-100 transition-opacity">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link to="#" className="link link-hover opacity-80 hover:opacity-100 transition-opacity">
                  Acceptable Use
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
            <div className="flex space-x-4 text-2xl">
              <a href="#" className="hover:text-blue-500 transition-colors duration-300 cursor-pointer">
                <FaFacebook />
              </a>
              <a href="#" className="hover:text-pink-500 transition-colors duration-300 cursor-pointer">
                <FaInstagram />
              </a>
              <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors duration-300 cursor-pointer">
                <FaXTwitter />
              </a>
              <a href="#" className="hover:text-blue-600 transition-colors duration-300 cursor-pointer">
                <FaLinkedin />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="border-t border-base-300 mt-10 pt-5 text-center text-sm opacity-80">
          © {new Date().getFullYear()} InsightBoard — All rights reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;
