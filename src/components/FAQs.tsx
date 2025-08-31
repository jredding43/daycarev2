import React from "react";

// Reusable FAQs Component
const FAQs: React.FC = () => {
  const faqData = [
    [
      "Do you provide meals?",
      "We provide snack times and coordinate lunch options with families; allergy plans are welcomed.",
    ],
    [
      "How do you communicate with families?",
      "We use a family app for check-ins, messages, and daily updates, plus face-to-face conversations at pickup.",
    ],
    [
      "What ages do you serve?",
      "We serve infants through school-age. Contact us and we'll share current openings and placement options.",
    ],
    [
      "What are your hours of operation?",
      "We are open Monday through Friday, from 6:00 AM to 6:00 PM.",
    ],
    [
      "How do I schedule a tour?",
      "You can schedule a tour by contacting us directly or using the 'Schedule a Tour' button on our website.",
    ],
    [
      "What is your tuition policy?",
      "Tuition is based on the age of the child and the days of attendance. Contact us for specific rates and payment options.",
    ],
    [
      "What safety measures are in place?",
      "We have secure entry systems, regular staff training, and follow strict health and safety protocols to ensure a safe environment.",
    ],
  ];

  return (
    <section aria-labelledby="faq">
      <div className="py-8 max-w-7xl mx-auto">
        <div className="p-6 bg-white rounded-xl shadow-md">
          <h2 id="faq" className="text-2xl font-bold text-slate-900">
            Frequently Asked Questions
          </h2>
          <div className="mt-4 space-y-2">
            {faqData.map(([question, answer]) => (
              <details
                key={question}
                className="group rounded-xl border border-slate-200 bg-white p-4 open:shadow-sm"
              >
                <summary className="cursor-pointer select-none font-medium text-slate-900 outline-none transition group-open:text-teal-700">
                  {question}
                </summary>
                <p className="mt-2 text-sm text-slate-700">{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQs;