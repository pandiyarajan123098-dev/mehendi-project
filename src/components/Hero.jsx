import React from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Star, Leaf } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Hero() {
  const { scrollToBooking } = useApp();

  const scrollToStore = () => {
    const el = document.getElementById('store');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero-section">
      <div className="container hero-grid">
        {/* Left Column: Hero Content */}
        <div className="hero-content">
          <div className="hero-pill-badge">
            <Star size={13} fill="#D4AF37" color="#D4AF37" className="star-icon" />
            <span>Trusted by 10,000+ Happy Brides & Enthusiasts • 100% Organic Henna</span>
          </div>

          <h1 className="hero-title">
            Beautiful Mehendi,
            <span className="title-italic">Beautiful Memories</span>
          </h1>

          <p className="hero-desc">
            Premium Mehendi Cones, Professional Mehendi Services and Expert Online &amp; Offline Classes — everything you need in one royal atelier.
          </p>

          <div className="hero-actions">
            <button className="btn-primary" onClick={scrollToStore}>
              <span>SHOP MEHENDI CONES</span>
              <ArrowRight size={16} />
            </button>
            <button className="btn-secondary" onClick={() => scrollToBooking('Bridal Mehendi')}>
              <span>BOOK A MEHENDI ARTIST</span>
            </button>
          </div>

          <div className="hero-features-row">
            <div className="hero-feature-item">
              <CheckCircle2 size={16} />
              <span>Fresh Batches Prepared Weekly</span>
            </div>
            <div className="hero-feature-item">
              <CheckCircle2 size={16} />
              <span>Chemical-Free &amp; Lab Tested</span>
            </div>
            <div className="hero-feature-item">
              <CheckCircle2 size={16} />
              <span>Pan-India Chilled Delivery</span>
            </div>
          </div>
        </div>

        {/* Right Column: Arched Image Frame */}
        <div className="hero-image-wrapper">
          <div className="hero-arch-container">
            <img
              src="/images/hero_bridal_full.png"
              alt="Intricate Royal Bridal Mehendi Hands"
              loading="eager"
            />
            {/* Top Pill Badge */}
            <div className="hero-badge-top">
              <Leaf size={12} />
              <span>100% PURE SOJAT HENNA</span>
            </div>
          </div>

          {/* Floating Guarantee Badge */}
          <div className="hero-floating-card">
            <div className="shield-icon-circle">
              <ShieldCheck size={20} />
            </div>
            <div>
              <div className="floating-card-title">Guaranteed Stain</div>
              <div className="floating-card-sub">Deep Mahogany tone within 48h</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
