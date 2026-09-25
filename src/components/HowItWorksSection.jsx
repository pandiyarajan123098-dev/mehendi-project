import React from 'react';
import { Package, ShoppingBag, Snowflake, Sparkles, Calendar, PhoneCall, GraduationCap, Box, Award, Leaf } from 'lucide-react';

export default function HowItWorksSection() {
  return (
    <section className="how-it-works-section">
      <div className="container">
        <span className="section-subtitle">EFFORTLESS EXPERIENCE</span>
        <h2 className="section-title">How It Works</h2>
        <p className="section-desc">
          Three seamless pathways tailored to your ceremonial and educational journey.
        </p>

        <div className="process-rows-wrap">
          {/* Row 1: Cones Delivery Flow */}
          <div className="process-row-card">
            <div className="process-row-title-box">
              <span className="process-step-num">1</span>
              <span className="process-row-heading" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Package size={15} color="#A67B40" />
                Cones Delivery Flow
              </span>
            </div>
            <div className="process-step-item">
              <Package size={16} />
              <span>Browse Fresh Batches</span>
            </div>
            <div className="process-step-item">
              <ShoppingBag size={16} />
              <span>Add to Cart &amp; Checkout</span>
            </div>
            <div className="process-step-item">
              <Snowflake size={16} />
              <span>Receive Chilled Cones</span>
            </div>
          </div>

          {/* Row 2: Artist Booking Flow */}
          <div className="process-row-card">
            <div className="process-row-title-box">
              <span className="process-step-num">2</span>
              <span className="process-row-heading" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Leaf size={15} color="#A67B40" />
                Artist Booking Flow
              </span>
            </div>
            <div className="process-step-item">
              <Sparkles size={16} />
              <span>Choose Service Package</span>
            </div>
            <div className="process-step-item">
              <Calendar size={16} />
              <span>Submit Event Details</span>
            </div>
            <div className="process-step-item">
              <PhoneCall size={16} />
              <span>Artist Confirmation &amp; Call</span>
            </div>
          </div>

          {/* Row 3: Academy Learning Flow */}
          <div className="process-row-card">
            <div className="process-row-title-box">
              <span className="process-step-num">3</span>
              <span className="process-row-heading" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <GraduationCap size={15} color="#A67B40" />
                Academy Learning Flow
              </span>
            </div>
            <div className="process-step-item">
              <GraduationCap size={16} />
              <span>Select Online / Studio</span>
            </div>
            <div className="process-step-item">
              <Box size={16} />
              <span>Register &amp; Receive Kit</span>
            </div>
            <div className="process-step-item">
              <Award size={16} />
              <span>Graduate &amp; Earn Certificate</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
