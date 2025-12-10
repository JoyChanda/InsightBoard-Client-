import { motion } from "framer-motion";
import { FaSearch, FaClipboardCheck, FaCogs, FaTruck } from "react-icons/fa";

const steps = [
  {
    id: 1,
    icon: FaSearch,
    title: "Browse & Select",
    description: "Explore our wide range of production orders and manufacturing capabilities",
    color: "text-blue-500"
  },
  {
    id: 2,
    icon: FaClipboardCheck,
    title: "Place Order",
    description: "Submit your requirements with detailed specifications and customization options",
    color: "text-green-500"
  },
  {
    id: 3,
    icon: FaCogs,
    title: "Production Tracking",
    description: "Monitor real-time status updates through Cutting → Sewing → Finishing stages",
    color: "text-purple-500"
  },
  {
    id: 4,
    icon: FaTruck,
    title: "Quality & Delivery",
    description: "Final quality inspection and expedited shipment to your destination",
    color: "text-orange-500"
  }
];

export default function HowItWorks() {
  return (
    <section className="py-16 px-6 bg-base-100">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-2">How It Works</h2>
          <p className="text-lg opacity-70">
            Simple steps to streamline your production workflow
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="relative"
              >
                <div className="bg-base-200 rounded-lg p-6 h-full shadow-lg hover:shadow-2xl transition-shadow">
                  {/* Step Number */}
                  <div className="absolute -top-4 -left-4 w-10 h-10 bg-primary text-primary-content rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                    {step.id}
                  </div>

                  {/* Icon */}
                  <div className={`text-5xl ${step.color} mb-4 mt-2`}>
                    <Icon />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>

                  {/* Description */}
                  <p className="text-sm opacity-70 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Connector Arrow (hidden on last item and mobile) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-3xl text-primary opacity-30">
                    →
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
