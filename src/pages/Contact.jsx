import { useState } from "react";
import { toast } from "react-toastify";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock, FaPaperPlane } from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate form submission
    setTimeout(() => {
      toast.success("Message sent successfully! We'll get back to you soon.");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setLoading(false);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: <FaEnvelope className="text-2xl" />,
      title: "Email Us",
      content: "support@insightboard.com",
      link: "mailto:support@insightboard.com",
    },
    {
      icon: <FaPhone className="text-2xl" />,
      title: "Call Us",
      content: "+880 1234-567890",
      link: "tel:+8801234567890",
    },
    {
      icon: <FaMapMarkerAlt className="text-2xl" />,
      title: "Visit Us",
      content: "123 Business Ave, Dhaka, Bangladesh",
      link: "https://maps.google.com",
    },
    {
      icon: <FaClock className="text-2xl" />,
      title: "Working Hours",
      content: "Mon - Fri: 9:00 AM - 6:00 PM",
      link: null,
    },
  ];

  return (
    <div className="min-h-screen bg-base-200">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary/10 via-base-100 to-secondary/10 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-black text-base-content mb-4">
            Get In Touch
          </h1>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            Have questions or feedback? We'd love to hear from you. Send us a message
            and we'll respond as soon as possible.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-base-100 rounded-2xl p-8 shadow-sm border border-base-300">
              <h2 className="text-2xl font-black text-base-content mb-6">
                Contact Information
              </h2>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 text-primary rounded-xl">
                      {info.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-base-content mb-1">
                        {info.title}
                      </h3>
                      {info.link ? (
                        <a
                          href={info.link}
                          className="text-base-content/70 hover:text-primary transition-colors"
                          target={info.link.startsWith("http") ? "_blank" : undefined}
                          rel={info.link.startsWith("http") ? "noopener noreferrer" : undefined}
                        >
                          {info.content}
                        </a>
                      ) : (
                        <p className="text-base-content/70">{info.content}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-base-100 rounded-2xl p-8 shadow-sm border border-base-300">
              <h3 className="text-xl font-black text-base-content mb-4">
                Quick Links
              </h3>
              <ul className="space-y-3">
                <li>
                  <a href="/about" className="text-base-content/70 hover:text-primary transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="/products" className="text-base-content/70 hover:text-primary transition-colors">
                    Browse Products
                  </a>
                </li>
                <li>
                  <a href="/privacy-policy" className="text-base-content/70 hover:text-primary transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/dashboard" className="text-base-content/70 hover:text-primary transition-colors">
                    Dashboard
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-base-100 rounded-2xl p-8 shadow-sm border border-base-300">
              <h2 className="text-2xl font-black text-base-content mb-6">
                Send Us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">Your Name</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="input input-bordered w-full"
                      required
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">Your Email</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="input input-bordered w-full"
                      required
                    />
                  </div>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Subject</span>
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can we help you?"
                    className="input input-bordered w-full"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Message</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us more about your inquiry..."
                    className="textarea textarea-bordered h-32 w-full"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary w-full md:w-auto px-8"
                >
                  {loading ? (
                    <span className="loading loading-spinner"></span>
                  ) : (
                    <>
                      <FaPaperPlane className="mr-2" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Map Section */}
            <div className="mt-8 bg-base-100 rounded-2xl p-4 shadow-sm border border-base-300 overflow-hidden">
              <div className="aspect-video bg-base-200 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <FaMapMarkerAlt className="text-5xl text-primary mx-auto mb-4" />
                  <p className="text-base-content/70">Map Location</p>
                  <p className="text-sm text-base-content/50">123 Business Ave, Dhaka</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
