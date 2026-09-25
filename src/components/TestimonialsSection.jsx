import React from 'react';
import { Star } from 'lucide-react';
import { testimonials } from '../data/testimonialsAndFaqs';

export default function TestimonialsSection() {
  return (
    <section className="testimonials-section">
      <div className="container">
        <span className="section-subtitle">TESTIMONIALS</span>
        <h2 className="section-title">What Our Customers Say</h2>
        <p className="section-desc">
          Real stories from celebratory brides, excited students, and festive hostesses.
        </p>

        <div className="testimonials-grid">
          {testimonials.map((item) => (
            <div key={item.id} className="testimonial-card">
              <div className="testimonial-stars">
                {[...Array(item.stars)].map((_, i) => (
                  <Star key={i} size={15} fill="#D4AF37" strokeWidth={0} />
                ))}
              </div>

              <blockquote className="testimonial-quote">
                "{item.quote}"
              </blockquote>

              <div className="testimonial-author-row">
                <div className="author-avatar">{item.initials}</div>
                <div>
                  <div className="author-name">{item.author}</div>
                  <div className="author-role">{item.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
