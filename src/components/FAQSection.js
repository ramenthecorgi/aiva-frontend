import React, { useState } from "react";
import { useIntersectionObserver } from '../hooks/useScrollAnimation';

const faqs = [
  {
    question: "How secure is my data with Aiva?",
    answer: "Your data security is our top priority. Aiva uses enterprise-grade encryption, SOC 2 compliance, and zero-trust architecture. We never store your sensitive information permanently and all communications are encrypted end-to-end. Your data remains yours - we're just the intelligent layer on top."
  },
  {
    question: "How quickly can I get started?",
    answer: "Most professionals are up and running in under 15 minutes. Aiva connects to your existing tools through secure OAuth, learns your patterns in the first few days, and starts providing value immediately. No complex setup, training, or IT involvement required."
  },
  {
    question: "How much does Aiva cost?",
    answer: "Aiva pays for herself quickly through time savings. Our plans start at $99/month for professionals, with enterprise options available. Most users save 10+ hours weekly, making the ROI immediate. We offer a 14-day free trial with no credit card required."
  }
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [sectionRef, isVisible] = useIntersectionObserver({ threshold: 0.2 });

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section ref={sectionRef} className="bg-gradient-to-br from-[#1e3799] to-[#0c2461] py-24">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-300 to-amber-300 bg-clip-text text-transparent mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-white/90 font-light">
            Everything you need to know about working with Aiva
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`mb-6 bg-[rgba(10,61,98,0.3)] backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden transition-all duration-600 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{
                transitionDelay: `${index * 150}ms`
              }}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-8 py-6 text-left flex justify-between items-center hover:bg-[rgba(10,61,98,0.2)] transition-colors"
              >
                <h3 className="text-lg font-semibold text-white pr-4">{faq.question}</h3>
                <div className={`text-amber-400 text-2xl transition-transform ${openIndex === index ? 'rotate-45' : ''}`}>
                  +
                </div>
              </button>
              {openIndex === index && (
                <div className="px-8 pb-6">
                  <p className="text-white/80 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Still have questions CTA */}
        <div className="text-center mt-12">
          <p className="text-white/70 mb-4">Still have questions?</p>
          <a href="mailto:team@askaiva.app" className="text-amber-400 hover:text-amber-300 font-semibold transition-colors">
            Get in touch with our team →
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
