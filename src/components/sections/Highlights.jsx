import { motion } from "framer-motion";

const stats = [
  { label: "Active Users", value: "1,245+", prefix: "" },
  { label: "Products Managed", value: "850", prefix: "" },
  { label: "Completed Orders", value: "3,400", prefix: "" },
  { label: "Customer Satisfaction", value: "98", prefix: "%" },
];

const Highlights = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, idx) => (
        <motion.div
          key={idx}
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, delay: idx * 0.1 }}
          viewport={{ once: true }}
          className="bg-base-100 p-8 rounded-2xl border border-base-300 shadow-sm text-center"
        >
          <div className="text-4xl font-extrabold text-primary mb-2">
            {stat.value}{stat.prefix}
          </div>
          <div className="text-sm font-medium text-base-content/60 uppercase tracking-widest">
            {stat.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Highlights;
