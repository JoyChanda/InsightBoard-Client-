import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaRocket, FaEye, FaHeart } from "react-icons/fa";

export default function About() {
  return (
    <div className="min-h-screen bg-base-200">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-secondary text-white py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link to="/" className="inline-flex items-center gap-2 mb-6 hover:underline">
              <FaArrowLeft /> Back to Home
            </Link>
            <h1 className="text-5xl md:text-6xl font-bold mb-4">About Us</h1>
            <p className="text-xl opacity-90">
              Learn more about InsightBoard and our journey
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="card bg-base-100 shadow-xl"
            >
              <div className="card-body">
                <div className="flex items-center gap-3 mb-4">
                  <FaRocket className="text-3xl text-primary" />
                  <h2 className="card-title text-3xl">Our Mission</h2>
                </div>
                <p className="text-lg">
                  To empower businesses with actionable insights through powerful analytics 
                  and intuitive campaign management tools, making data-driven decisions 
                  accessible to everyone.
                </p>
              </div>
            </motion.div>

            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="card bg-base-100 shadow-xl"
            >
              <div className="card-body">
                <div className="flex items-center gap-3 mb-4">
                  <FaEye className="text-3xl text-secondary" />
                  <h2 className="card-title text-3xl">Our Vision</h2>
                </div>
                <p className="text-lg">
                  To become the world's leading analytics platform, transforming how 
                  organizations understand and engage with their data, driving innovation 
                  and growth across industries.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Company Details */}
      <section className="py-16 px-6 bg-base-100">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-8 text-center">Our Story</h2>
            
            <div className="space-y-6 text-lg">
              <p>
                Founded in 2024, InsightBoard emerged from a simple observation: businesses 
                were drowning in data but starving for insights. Our founders, a team of 
                data scientists and UX designers, recognized the need for a platform that 
                could bridge the gap between complex analytics and actionable business intelligence.
              </p>

              <p>
                What started as a small project has grown into a comprehensive analytics 
                platform serving thousands of users worldwide. We've remained committed to 
                our core principle: making powerful analytics accessible, intuitive, and 
                beautiful.
              </p>

              <p>
                Today, InsightBoard helps businesses of all sizes track campaigns, analyze 
                performance, and make data-driven decisions with confidence. Our platform 
                combines cutting-edge technology with thoughtful design, ensuring that every 
                user has the tools they need to succeed.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-8 text-center">Our Core Values</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              {/* Value 1 */}
              <div className="card bg-base-100 shadow-lg">
                <div className="card-body items-center text-center">
                  <FaHeart className="text-4xl text-error mb-4" />
                  <h3 className="card-title">User-Centric</h3>
                  <p>
                    Every feature we build starts with understanding user needs and 
                    solving real problems.
                  </p>
                </div>
              </div>

              {/* Value 2 */}
              <div className="card bg-base-100 shadow-lg">
                <div className="card-body items-center text-center">
                  <FaRocket className="text-4xl text-primary mb-4" />
                  <h3 className="card-title">Innovation</h3>
                  <p>
                    We constantly push boundaries, exploring new technologies and 
                    approaches to analytics.
                  </p>
                </div>
              </div>

              {/* Value 3 */}
              <div className="card bg-base-100 shadow-lg">
                <div className="card-body items-center text-center">
                  <FaEye className="text-4xl text-secondary mb-4" />
                  <h3 className="card-title">Transparency</h3>
                  <p>
                    We believe in clear communication, honest practices, and building 
                    trust with our users.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-gradient-to-br from-primary to-secondary text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of businesses using InsightBoard to unlock their data potential
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn btn-lg bg-white text-primary hover:bg-gray-100 border-none"
                >
                  Create Account
                </motion.button>
              </Link>
              <Link to="/">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn btn-lg btn-outline border-white text-white hover:bg-white hover:text-primary"
                >
                  Back to Home
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
