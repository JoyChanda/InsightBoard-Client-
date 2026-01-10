import { FaBriefcase, FaUserShield, FaFileAlt } from "react-icons/fa";
import { motion } from "framer-motion";

const services = [
  {
    title: "Business Insights",
    description: "Deep dive into production data to identify trends and optimize manufacturing speed.",
    icon: FaBriefcase,
  },
  {
    title: "User Management",
    description: "Full control over user roles, permissions, and access logs for maximum security.",
    icon: FaUserShield,
  },
  {
    title: "Detailed Reporting",
    description: "Export automated reports for orders, payments, and factory performance metrics.",
    icon: FaFileAlt,
  },
];

const Services = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {services.map((service, idx) => {
        const Icon = service.icon;
        return (
          <motion.div
            key={idx}
            className="group p-8 rounded-2xl bg-base-100 border border-base-300 hover:border-primary/50 transition-all duration-300"
          >
            <div className="text-4xl text-primary mb-6 group-hover:scale-110 transition-transform duration-300">
              <Icon />
            </div>
            <h3 className="text-xl font-bold mb-3">{service.title}</h3>
            <p className="text-base-content/70">
              {service.description}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
};

export default Services;
