const PrivacyPolicy = () => {
  const sections = [
    {
      title: "1. Information We Collect",
      content: [
        "We collect information that you provide directly to us when you create an account, make a purchase, or communicate with us. This includes:",
        "• Personal identification information (name, email address, phone number)",
        "• Account credentials and profile information",
        "• Payment and billing information",
        "• Order history and transaction details",
        "• Communications and correspondence with our support team",
      ],
    },
    {
      title: "2. How We Use Your Information",
      content: [
        "We use the information we collect to:",
        "• Provide, maintain, and improve our services",
        "• Process your transactions and send related information",
        "• Send you technical notices, updates, and support messages",
        "• Respond to your comments, questions, and customer service requests",
        "• Monitor and analyze trends, usage, and activities",
        "• Detect, prevent, and address technical issues and fraudulent activities",
        "• Personalize your experience and provide relevant content",
      ],
    },
    {
      title: "3. Information Sharing and Disclosure",
      content: [
        "We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:",
        "• With your consent or at your direction",
        "• With service providers who perform services on our behalf",
        "• To comply with legal obligations or respond to lawful requests",
        "• To protect the rights, property, and safety of InsightBoard, our users, or others",
        "• In connection with a merger, acquisition, or sale of assets",
      ],
    },
    {
      title: "4. Data Security",
      content: [
        "We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:",
        "• Encryption of data in transit and at rest",
        "• Regular security assessments and audits",
        "• Access controls and authentication mechanisms",
        "• Secure data storage and backup procedures",
        "However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.",
      ],
    },
    {
      title: "5. Cookies and Tracking Technologies",
      content: [
        "We use cookies and similar tracking technologies to:",
        "• Remember your preferences and settings",
        "• Understand how you use our services",
        "• Improve our website performance and user experience",
        "• Provide personalized content and advertisements",
        "You can control cookies through your browser settings. However, disabling cookies may limit your ability to use certain features of our service.",
      ],
    },
    {
      title: "6. Your Rights and Choices",
      content: [
        "You have the following rights regarding your personal information:",
        "• Access: Request a copy of the personal information we hold about you",
        "• Correction: Request correction of inaccurate or incomplete information",
        "• Deletion: Request deletion of your personal information",
        "• Objection: Object to our processing of your personal information",
        "• Portability: Request transfer of your data to another service",
        "To exercise these rights, please contact us at privacy@insightboard.com",
      ],
    },
    {
      title: "7. Data Retention",
      content: [
        "We retain your personal information for as long as necessary to:",
        "• Provide our services to you",
        "• Comply with legal obligations",
        "• Resolve disputes and enforce our agreements",
        "When we no longer need your information, we will securely delete or anonymize it.",
      ],
    },
    {
      title: "8. Children's Privacy",
      content: [
        "Our services are not directed to individuals under the age of 13. We do not knowingly collect personal information from children under 13. If you become aware that a child has provided us with personal information, please contact us, and we will take steps to delete such information.",
      ],
    },
    {
      title: "9. International Data Transfers",
      content: [
        "Your information may be transferred to and processed in countries other than your country of residence. These countries may have different data protection laws. We ensure appropriate safeguards are in place to protect your information in accordance with this Privacy Policy.",
      ],
    },
    {
      title: "10. Changes to This Privacy Policy",
      content: [
        "We may update this Privacy Policy from time to time. We will notify you of any changes by:",
        "• Posting the new Privacy Policy on this page",
        "• Updating the 'Last Updated' date at the top of this policy",
        "• Sending you an email notification for significant changes",
        "Your continued use of our services after changes become effective constitutes acceptance of the revised policy.",
      ],
    },
    {
      title: "11. Contact Us",
      content: [
        "If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:",
        "• Email: privacy@insightboard.com",
        "• Phone: +880 1234-567890",
        "• Address: 123 Business Ave, Dhaka, Bangladesh",
        "We will respond to your inquiry within 30 days.",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-base-200">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary/10 via-base-100 to-secondary/10 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-black text-base-content mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto mb-4">
            Your privacy is important to us. This policy explains how we collect,
            use, and protect your personal information.
          </p>
          <p className="text-sm text-base-content/50">
            Last Updated: January 11, 2026
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Introduction */}
          <div className="bg-base-100 rounded-2xl p-8 shadow-sm border border-base-300 mb-8">
            <p className="text-base-content/80 leading-relaxed">
              Welcome to InsightBoard. This Privacy Policy describes how InsightBoard
              ("we", "us", or "our") collects, uses, shares, and protects your personal
              information when you use our platform and services. By using InsightBoard,
              you agree to the collection and use of information in accordance with this
              policy.
            </p>
          </div>

          {/* Policy Sections */}
          <div className="space-y-6">
            {sections.map((section, index) => (
              <div
                key={index}
                className="bg-base-100 rounded-2xl p-8 shadow-sm border border-base-300"
              >
                <h2 className="text-2xl font-black text-base-content mb-4">
                  {section.title}
                </h2>
                <div className="space-y-3">
                  {section.content.map((paragraph, pIndex) => (
                    <p
                      key={pIndex}
                      className={`text-base-content/80 leading-relaxed ${
                        paragraph.startsWith("•") ? "ml-4" : ""
                      }`}
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Consent Banner */}
          <div className="mt-8 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 border border-primary/20">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-xl font-black text-base-content mb-2">
                  Your Consent Matters
                </h3>
                <p className="text-base-content/70">
                  By using InsightBoard, you acknowledge that you have read and
                  understood this Privacy Policy and agree to its terms.
                </p>
              </div>
              <a href="/contact" className="btn btn-primary">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
