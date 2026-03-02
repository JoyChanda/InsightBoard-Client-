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
    <footer className="glass border-t border-base-300/30 text-base-content mt-20">
      <div className="container mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info - Brand & Description */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white text-2xl shadow-lg">
                🚢
              </div>
              <h2 className="text-2xl font-black bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent tracking-tight">
                InsightBoard
              </h2>
            </div>
            <p className="text-sm leading-relaxed text-base-content/60 font-medium">
              Revolutionizing garment production with precision tracking and 
              intelligent manufacturing orchestration. Scale your factory output with data-driven clarity.
            </p>

            {/* Social Media */}
            <div className="flex gap-4 pt-2">
              {[
                { icon: <FaFacebook />, color: "hover:text-blue-600", label: "Facebook" },
                { icon: <FaInstagram />, color: "hover:text-pink-500", label: "Instagram" },
                { icon: <FaXTwitter />, color: "hover:text-slate-400", label: "Twitter" },
                { icon: <FaLinkedin />, color: "hover:text-blue-700", label: "LinkedIn" },
              ].map((social, i) => (
                <a
                  key={i}
                  href="#"
                  className={`w-10 h-10 rounded-full bg-base-200/50 flex items-center justify-center text-lg text-base-content/70 ${social.color} transition-all duration-300 hover:scale-110 hover:-translate-y-1 shadow-sm`}
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-xs font-black uppercase tracking-widest text-primary">
              Navigation
            </h3>
            <ul className="space-y-3">
              {["Home", "About Us", "Products", "Dashboard", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    to={item === "Home" ? "/" : `/${item.toLowerCase().replace(" ", "-")}`}
                    className="text-sm font-semibold text-base-content/60 hover:text-primary transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/20 group-hover:bg-primary transition-colors"></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h3 className="text-xs font-black uppercase tracking-widest text-primary">
              Core Services
            </h3>
            <ul className="space-y-3">
              {["Order Management", "Production Tracking", "Inventory Monitor", "Quality Control"].map((service) => (
                <li key={service}>
                  <Link
                    to="#"
                    className="text-sm font-semibold text-base-content/60 hover:text-primary transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/20 group-hover:bg-primary transition-colors"></span>
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-xs font-black uppercase tracking-widest text-primary">
              Connect With Us
            </h3>
            <div className="p-6 rounded-3xl bg-base-200/50 border border-base-300/30 space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary mt-1">
                  <FaMapMarkerAlt />
                </div>
                <span className="text-sm font-medium text-base-content/70">
                  456 Garment District<br />Dhaka, Bangladesh
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <FaEnvelope />
                </div>
                <a href="mailto:contact@insightboard.com" className="text-sm font-medium text-base-content/70 hover:text-primary transition-colors">
                  contact@insightboard.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-base-300/30 mt-16 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-sm font-bold text-base-content/40">
              © {new Date().getFullYear()} InsightBoard. Precision Engineered.
            </p>

            <div className="flex flex-wrap justify-center gap-8">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
                <Link
                  key={item}
                  to="#"
                  className="text-xs font-black uppercase tracking-widest text-base-content/40 hover:text-primary transition-colors"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
