import React from 'react';
import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Hero() {
  const { scrollToBooking } = useApp();

  const scrollToStore = () => {
    const el = document.getElementById('store');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero-section">
      <div className="container">
        {/* Rounded Framed Hero Container */}
        <div className="hero-framed-card">
          <div className="hero-card-overlay"></div>

          {/* All Hero Content & Text inside Container */}
          <div className="hero-content">
            {/* Unique Attractive Tag Pill */}
            <div className="hero-unique-tag">
              <Sparkles size={13} className="tag-sparkle" />
              <span>PURE SOJAT BOTANICAL HENNA</span>
            </div>

            {/* Main Headline */}
            <h1 className="hero-title">
              Beautiful Mehendi,
              <span className="title-italic">Beautiful Memories</span>
            </h1>

            {/* Short Description */}
            <p className="hero-desc">
              Premium Mehendi Cones, Bridal Services &amp; Expert Classes — all in one place.
            </p>

            {/* CTA Buttons */}
            <div className="hero-actions">
              <button className="btn-primary" onClick={scrollToStore}>
                <span>SHOP MEHENDI CONES</span>
                <ArrowRight size={15} />
              </button>
              <button className="btn-secondary" onClick={() => scrollToBooking('Bridal Mehendi')}>
                <span>BOOK A MEHENDI ARTIST</span>
              </button>
            </div>

            {/* Attractive Trust Benefits Box */}
            <div className="hero-trust-box">
              <div className="hero-trust-chip">
                <div className="trust-chip-icon">
                  <CheckCircle2 size={14} color="#1B3627" />
                </div>
                <span className="trust-chip-text">Fresh Batches</span>
              </div>

              <div className="trust-box-divider"></div>

              <div className="hero-trust-chip">
                <div className="trust-chip-icon">
                  <CheckCircle2 size={14} color="#1B3627" />
                </div>
                <span className="trust-chip-text">100% Organic</span>
              </div>

              <div className="trust-box-divider"></div>

              <div className="hero-trust-chip">
                <div className="trust-chip-icon">
                  <CheckCircle2 size={14} color="#1B3627" />
                </div>
                <span className="trust-chip-text">Pan-India Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
