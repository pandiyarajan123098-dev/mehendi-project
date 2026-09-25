import React from 'react';
import { useApp } from '../context/AppContext';

export default function CtaBanner() {
  const { scrollToBooking } = useApp();

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="cta-banner-section">
      <div className="container">
        <span className="section-subtitle">CELEBRATE PURE HERITAGE</span>
        <h2 className="section-title">Ready to Create Something Beautiful?</h2>
        <p className="cta-banner-desc">
          Shop freshly rolled botanical cones, book acclaimed master artists for your special day, or begin your certification journey today.
        </p>

        <div className="cta-actions-row">
          <button className="btn-cta-cream" onClick={() => scrollTo('store')}>
            SHOP NOW
          </button>
          <button className="btn-cta-outline" onClick={() => scrollToBooking('Bridal Mehendi')}>
            BOOK AN ARTIST
          </button>
          <button className="btn-cta-outline" onClick={() => scrollTo('classes')}>
            JOIN A CLASS
          </button>
        </div>
      </div>
    </section>
  );
}
