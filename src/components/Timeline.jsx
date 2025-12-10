import React from "react";

const Timeline = ({ steps, currentStep }) => {
  return (
    <div className="flex flex-col gap-6">
      {steps.map((step, idx) => (
        <div key={idx} className="flex items-start gap-4">
          {/* Step Indicator */}
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-sm ${
              idx <= currentStep ? "bg-green-600" : "bg-gray-400"
            }`}
          >
            {idx + 1}
          </div>

          {/* Label */}
          <div>
            <p
              className={`font-medium ${
                idx <= currentStep ? "text-green-700 dark:text-green-400" : "text-gray-500 dark:text-gray-400"
              }`}
            >
              {step}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Timeline;
