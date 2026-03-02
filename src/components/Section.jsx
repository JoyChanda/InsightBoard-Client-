import { motion } from "framer-motion";

/**
 * Reusable Section Wrapper for Landing Page
 * Ensures consistent padding, max-width, and heading styles.
 */
const Section = ({ title, subtitle, children, className = "", id = "" }) => {
  return (
    <section id={id} className={`py-24 px-6 md:px-12 ${className}`}>
      <div className="max-w-7xl mx-auto">
        {(title || subtitle) && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-20 text-center max-w-3xl mx-auto"
          >
            {title && (
              <h2 className="text-4xl md:text-6xl font-black mb-6 text-base-content tracking-tight">
                {title}
              </h2>
            )}
            
            {title && (
              <div className="w-24 h-2 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-8 rounded-full"></div>
            )}

            {subtitle && (
              <p className="text-lg md:text-xl text-base-content/80 leading-relaxed font-semibold">
                {subtitle}
              </p>
            )}
          </motion.div>
        )}
        
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
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
