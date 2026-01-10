import { FaShieldAlt, FaChartLine, FaUserCog } from "react-icons/fa";
import { motion } from "framer-motion";

const features = [
  {
    title: "Role-based Dashboard",
    description: "Customized interfaces for Admins, Managers, and Buyers to streamline tasks.",
    icon: FaUserCog,
    color: "bg-blue-500/10 text-blue-500",
  },
  {
    title: "Real-time Analytics",
    description: "Track production metrics and order status with live data visualization.",
    icon: FaChartLine,
    color: "bg-purple-500/10 text-purple-500",
  },
  {
    title: "Secure Authentication",
    description: "Multi-layered security with Firebase and JWT for protected data access.",
    icon: FaShieldAlt,
    color: "bg-green-500/10 text-green-500",
  },
];

const Features = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {features.map((feature, idx) => {
        const Icon = feature.icon;
        return (
          <motion.div
            key={idx}
            whileHover={{ y: -5 }}
            className="card bg-base-100 border border-base-300 p-8 shadow-lg hover:shadow-xl transition-all"
          >
            <div className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center text-2xl mb-6`}>
              <Icon />
            </div>
            <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
            <p className="text-base-content/70 leading-relaxed">
              {feature.description}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
};

export default Features;
