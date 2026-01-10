import { motion } from "framer-motion";

/**
 * Reusable Section Wrapper for Landing Page
 * Ensures consistent padding, max-width, and heading styles.
 */
const Section = ({ title, subtitle, children, className = "", id = "" }) => {
  return (
    <section id={id} className={`py-16 px-4 md:px-10 ${className}`}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-10 text-center md:text-left"
        >
          {title && (
            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-base-content">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-lg text-base-content/70 max-w-2xl">
              {subtitle}
            </p>
          )}
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
};

export default Section;
