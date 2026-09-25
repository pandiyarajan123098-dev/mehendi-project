import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { faqs } from '../data/testimonialsAndFaqs';

export default function FaqSection() {
  const [openId, setOpenId] = useState('faq-1');

  const toggleFaq = (id) => {
    setOpenId(prev => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="faq-section">
      <div className="container">
        <span className="section-subtitle">GOT QUESTIONS?</span>
        <h2 className="section-title">Frequently Asked Questions</h2>

        <div className="faq-accordion-wrap">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;

            return (
              <div
                key={faq.id}
                className={`faq-item ${isOpen ? 'open' : ''}`}
              >
                <button
                  className="faq-question-btn"
                  onClick={() => toggleFaq(faq.id)}
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  <ChevronDown size={18} className="faq-chevron" />
                </button>

                {isOpen && (
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
