const faqs = [
  {
    question: "How do I track my production order?",
    answer: "You can track your order in real-time through the 'Production Tracking' section in your dashboard. It identifies which stage—Cutting, Sewing, or Finishing—your order is currently in.",
  },
  {
    question: "What are the minimum order quantities (MOQ)?",
    answer: "MOQ varies by product category. Generally, t-shirts start at 100 units, while more complex items like jackets may have a lower MOQ of 50 units.",
  },
  {
    question: "Is the platform secure for financial transactions?",
    answer: "Yes, InsightBoard uses Stripe and other secure payment gateways. We never store your credit card details on our servers.",
  },
  {
    question: "Can I manage multiple factory locations?",
    answer: "Absolutely! The Admin and Manager roles support multi-location oversight, allowing you to switch between different manufacturing sites within the same dashboard.",
  },
];

const FAQ = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-4">
      {faqs.map((faq, idx) => (
        <div key={idx} className="collapse collapse-plus bg-base-100 border border-base-300 rounded-xl">
          <input type="checkbox" className="peer" /> 
          <div className="collapse-title text-xl font-bold peer-checked:text-primary">
            {faq.question}
          </div>
          <div className="collapse-content text-base-content/70"> 
            <p>{faq.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FAQ;
