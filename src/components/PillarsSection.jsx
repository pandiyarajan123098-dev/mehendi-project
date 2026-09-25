import React from 'react';
import { PenTool, Sparkles, GraduationCap, CheckCircle2, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function PillarsSection() {
  const { scrollToBooking } = useApp();

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="pillars-section">
      <div className="container">
        <span className="section-subtitle">BESPOKE EXCELLENCE</span>
        <h2 className="section-title">Our Three Pillars of Craft</h2>
        <p className="section-desc">
          From fresh organic cones to royal bridal artistry and certified masterclass education.
        </p>

        <div className="pillars-grid">
          {/* Card 1: Shop Mehendi Cones */}
          <div className="pillar-card">
            <div className="pillar-icon-box">
              <PenTool size={22} />
            </div>
            <h3 className="pillar-title">Shop Mehendi Cones</h3>
            <p className="pillar-desc">
              Fresh, handcrafted mehendi cones formulated for ultra-smooth application and rich, enduring bridal stain.
            </p>
            <ul className="pillar-bullets">
              <li>
                <CheckCircle2 size={15} />
                <span>100% Organic Sojat Grade Henna</span>
              </li>
              <li>
                <CheckCircle2 size={15} />
                <span>Ultra-smooth 0.38mm precision tip</span>
              </li>
              <li>
                <CheckCircle2 size={15} />
                <span>Triple-cloth sifted for zero clogs</span>
              </li>
            </ul>
            <button className="pillar-link" onClick={() => scrollToSection('store')}>
              <span>SHOP NOW</span>
              <ArrowRight size={14} />
            </button>
          </div>

          {/* Card 2: Mehendi Services */}
          <div className="pillar-card">
            <span className="pillar-top-badge">MOST POPULAR</span>
            <div className="pillar-icon-box">
              <Sparkles size={22} />
            </div>
            <h3 className="pillar-title">Mehendi Services</h3>
            <p className="pillar-desc">
              Professional artists for royal weddings, intimate sangeets, and celebratory destination gatherings.
            </p>
            <ul className="pillar-bullets">
              <li>
                <CheckCircle2 size={15} />
                <span>Bespoke Bridal Storytelling motifs</span>
              </li>
              <li>
                <CheckCircle2 size={15} />
                <span>Multi-city Artist Collective (Mumbai &amp; Udaipur)</span>
              </li>
              <li>
                <CheckCircle2 size={15} />
                <span>Punctual, hygienic &amp; organic application</span>
              </li>
            </ul>
            <button className="pillar-link" onClick={() => scrollToBooking('Bridal Mehendi')}>
              <span>BOOK A SERVICE</span>
              <ArrowRight size={14} />
            </button>
          </div>

          {/* Card 3: Mehendi Classes */}
          <div className="pillar-card">
            <div className="pillar-icon-box">
              <GraduationCap size={22} />
            </div>
            <h3 className="pillar-title">Mehendi Classes</h3>
            <p className="pillar-desc">
              Master the sacred art of Mehendi through rigorous online certifications and intimate atelier workshops.
            </p>
            <ul className="pillar-bullets">
              <li>
                <CheckCircle2 size={15} />
                <span>Beginner to Master certification modules</span>
              </li>
              <li>
                <CheckCircle2 size={15} />
                <span>Hands-on practice kits delivered home</span>
              </li>
              <li>
                <CheckCircle2 size={15} />
                <span>Lifetime guild community mentorship</span>
              </li>
            </ul>
            <button className="pillar-link" onClick={() => scrollToSection('classes')}>
              <span>EXPLORE CLASSES</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
