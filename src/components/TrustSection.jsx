import React from 'react';
import { Leaf, Award, BookOpen, Clock } from 'lucide-react';

export default function TrustSection() {
  const trustItems = [
    {
      icon: Leaf,
      title: 'Fresh & Quality Henna',
      desc: '100% natural Sojat leaves, triple sifted, mixed with pure eucalyptus oil. Zero chemicals or artificial dyes.'
    },
    {
      icon: Award,
      title: 'Master Artists',
      desc: 'Over a decade of expertise crafting heirloom bridal stories across royal palaces and luxury destination resorts.'
    },
    {
      icon: BookOpen,
      title: 'Structured Learning',
      desc: 'From foundational cone grip pressure to advanced figurative portrait sketching with accredited certification.'
    },
    {
      icon: Clock,
      title: 'Reliable & Timely',
      desc: 'Guaranteed punctuality for your auspicious muhurat, hygienic equipment, and transparent pricing.'
    }
  ];

  return (
    <section className="trust-section">
      <div className="container">
        <span className="section-subtitle">THE RIVAAZ PROMISE</span>
        <h2 className="section-title">Why Brides &amp; Artists Trust Us</h2>

        {/* 4 Trust Pillars */}
        <div className="trust-grid">
          {trustItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="trust-item">
                <div className="trust-icon-wrap">
                  <Icon size={22} />
                </div>
                <h3 className="trust-title">{item.title}</h3>
                <p className="trust-desc">{item.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Royal Dark Green Stats Banner */}
        <div className="stats-banner">
          <div className="stat-item">
            <span className="stat-number">12,500+</span>
            <span className="stat-label">HAPPY BRIDES &amp; CLIENTS</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">85,000+</span>
            <span className="stat-label">FRESH CONES DELIVERED</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">3,200+</span>
            <span className="stat-label">STUDENTS CERTIFIED</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">1,400+</span>
            <span className="stat-label">WEDDINGS &amp; SANGEETS</span>
          </div>
        </div>
      </div>
    </section>
  );
}
