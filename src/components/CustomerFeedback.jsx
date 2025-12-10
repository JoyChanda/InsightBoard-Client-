import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { customerFeedback } from "../data/customerFeedback";

export default function CustomerFeedback() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-rotate carousel
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % customerFeedback.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handlePrevious = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? customerFeedback.length - 1 : prev - 1
    );
    setIsAutoPlaying(false);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % customerFeedback.length);
    setIsAutoPlaying(false);
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const currentFeedback = customerFeedback[currentIndex];

  return (
    <section className="py-16 px-6 bg-gradient-to-br from-primary/10 to-secondary/10">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-2">What Our Clients Say</h2>
          <p className="text-lg opacity-70">
            Trusted by manufacturers worldwide
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={handlePrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-10 btn btn-circle btn-primary shadow-lg"
            aria-label="Previous testimonial"
          >
            <FaChevronLeft />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-10 btn btn-circle btn-primary shadow-lg"
            aria-label="Next testimonial"
          >
            <FaChevronRight />
          </button>

          {/* Testimonial Card */}
          <div className="bg-base-100 rounded-2xl shadow-2xl p-8 md:p-12 min-h-[320px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
                className="text-center"
              >
                {/* Avatar */}
                <div className="flex justify-center mb-6">
                  <img
                    src={currentFeedback.avatar}
                    alt={currentFeedback.name}
                    className="w-20 h-20 rounded-full border-4 border-primary shadow-lg"
                  />
                </div>

                {/* Rating Stars */}
                <div className="flex justify-center gap-1 mb-4">
                  {[...Array(currentFeedback.rating)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-500 text-xl" />
                  ))}
                </div>

                {/* Feedback Text */}
                <p className="text-lg md:text-xl italic mb-6 leading-relaxed text-base-content/80">
                  "{currentFeedback.feedback}"
                </p>

                {/* Customer Info */}
                <div>
                  <h4 className="font-bold text-xl">{currentFeedback.name}</h4>
                  <p className="text-sm opacity-70">
                    {currentFeedback.role} at {currentFeedback.company}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {customerFeedback.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex
                    ? "bg-primary w-8"
                    : "bg-base-content/30 hover:bg-base-content/50"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
