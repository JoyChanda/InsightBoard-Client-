import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 mt-16 py-12">
      <div className="container">

        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Logo + Description */}
          <div>
            <h1 className="text-2xl font-bold mb-3 dark:text-white">
              InsightBoard
            </h1>
            <p className="text-sm">
              We provide top-notch analytics and campaign management services.  
              Quality and customer satisfaction is our main priority.
            </p>
          </div>

          {/* Services Column 1 */}
          <div>
            <h3 className="text-lg font-semibold mb-3 dark:text-white">Services</h3>
            <ul className="space-y-2 text-sm">
              <li>Campaign Management</li>
              <li>Analytics Dashboard</li>
              <li>Data Insights</li>
              <li>Reporting Tools</li>
            </ul>
          </div>

          {/* Services Column 2 */}
          <div>
            <h3 className="text-lg font-semibold mb-3 dark:text-white">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>Help Center</li>
              <li>Contact Us</li>
              <li>FAQ</li>
              <li>Live Chat</li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-3 dark:text-white">Follow Us</h3>
            <div className="flex space-x-4 text-xl">
              <FaFacebook className="cursor-pointer hover:text-blue-500 transition-colors" />
              <FaInstagram className="cursor-pointer hover:text-pink-500 transition-colors" />
              <FaTwitter className="cursor-pointer hover:text-blue-400 transition-colors" />
              <FaLinkedin className="cursor-pointer hover:text-blue-600 transition-colors" />
            </div>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-300 dark:border-gray-700 mt-10 pt-5 text-center text-sm">
          © {new Date().getFullYear()} InsightBoard — All rights reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;
