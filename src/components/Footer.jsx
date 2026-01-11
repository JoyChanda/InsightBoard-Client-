import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {

  return (
    <footer className="bg-footer border-t border-base-200 text-base-content transition-colors">
      <div className="container mx-auto px-4 py-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info - Brand & Description */}
          <div className="space-y-4 text-center md:text-left">
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <span className="text-3xl">🚢</span>
              <h2 className="text-xl font-bold text-base-content">
                InsightBoard
              </h2>
            </div>
            <p className="text-sm leading-relaxed text-base-content/70">
              Your trusted garment production management platform for
              streamlined order tracking and efficient manufacturing workflows.
            </p>

            {/* Social Media */}
            <div className="flex gap-3 pt-2 justify-center md:justify-start">
              <a
                href="#"
                className="text-lg text-base-content/70 hover:text-blue-500 transition-colors"
                aria-label="Facebook"
              >
                <FaFacebook />
              </a>
              <a
                href="#"
                className="text-lg text-base-content/70 hover:text-pink-500 transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                className="text-lg text-base-content/70 hover:text-gray-400 transition-colors"
                aria-label="Twitter"
              >
                <FaXTwitter />
              </a>
              <a
                href="#"
                className="text-lg text-base-content/70 hover:text-blue-600 transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedin />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4 text-center md:text-left">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-base-content">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-sm text-base-content/70 hover:text-primary transition-all"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-sm text-base-content/70 hover:text-primary transition-all"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="text-sm text-base-content/70 hover:text-primary transition-all"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard"
                  className="text-sm text-base-content/70 hover:text-primary transition-all"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-sm text-base-content/70 hover:text-primary transition-all"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4 text-center md:text-left">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-base-content">
              Services
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="#"
                  className="text-sm text-base-content/70 hover:text-primary transition-all"
                >
                  Order Management
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-sm text-base-content/70 hover:text-primary transition-all"
                >
                  Production Tracking
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-sm text-base-content/70 hover:text-primary transition-all"
                >
                  Inventory Monitor
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-sm text-base-content/70 hover:text-primary transition-all"
                >
                  Quality Control
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4 text-center md:text-left">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-base-content">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 justify-center md:justify-start">
                <FaMapMarkerAlt className="text-sm mt-1 text-base-content/70" />
                <span className="text-sm text-base-content/70">
                  456 Garment District
                  <br />
                  Dhaka, Bangladesh
                </span>
              </li>
              <li className="flex items-center gap-2 justify-center md:justify-start">
                <FaEnvelope className="text-sm text-base-content/70" />
                <a
                  href="mailto:contact@insightboard.com"
                  className="text-sm text-base-content/70 hover:text-primary transition-all"
                >
                  contact@insightboard.com
                </a>
              </li>
              <li className="flex items-center gap-2 justify-center md:justify-start">
                <FaPhone className="text-sm text-base-content/70" />
                <a
                  href="tel:+8801234567890"
                  className="text-sm text-base-content/70 hover:text-primary transition-all"
                >
                  +880 123 456 7890
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-base-200 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <p className="text-sm text-center text-base-content/70">
              © {new Date().getFullYear()} InsightBoard. All rights reserved.
            </p>

            {/* Legal Links */}
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/privacy-policy"
                className="text-sm text-base-content/70 hover:text-primary transition-all"
              >
                Privacy Policy
              </Link>
              <Link
                to="#"
                className="text-sm text-base-content/70 hover:text-primary transition-all"
              >
                Terms of Service
              </Link>
              <Link
                to="#"
                className="text-sm text-base-content/70 hover:text-primary transition-all"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
