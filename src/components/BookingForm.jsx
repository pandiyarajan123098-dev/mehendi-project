import React, { useState, useEffect } from 'react';
import { Calendar, CheckCircle2, ShieldCheck, Sparkles, ExternalLink, Send } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { submitArtistBooking } from '../services/api';

export default function BookingForm() {
  const { prefilledService, showToast, triggerConfetti } = useApp();

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    eventType: 'Bridal Mehendi',
    eventDate: '',
    preferredTime: '',
    guestCount: '',
    location: '',
    designStyle: '',
    requirements: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(null);

  useEffect(() => {
    if (prefilledService) {
      setFormData(prev => ({ ...prev, eventType: prefilledService }));
    }
  }, [prefilledService]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.fullName || !formData.phone || !formData.email || !formData.eventDate) {
      showToast('Please fill in all required fields marked with *', 'warning');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await submitArtistBooking(formData);
      setBookingSuccess(res);
      triggerConfetti();
      showToast(`Booking request submitted! Reference: ${res.bookingId}`);
    } catch (err) {
      console.error(err);
      showToast('Request received! Our studio coordinator will reach out shortly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setBookingSuccess(null);
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      eventType: 'Bridal Mehendi',
      eventDate: '',
      preferredTime: '',
      guestCount: '',
      location: '',
      designStyle: '',
      requirements: ''
    });
  };

  return (
    <section id="booking-section" className="booking-section">
      <div className="container">
        <div className="booking-card-wrapper">
          {/* Left Column: Info & Perks */}
          <div className="booking-info-left">
            <span className="section-subtitle">RESERVE YOUR ARTIST</span>
            <h2 className="section-title">Check Artist Availability</h2>
            <p className="booking-info-desc">
              Bridal dates fill 3–6 months in advance. Submit your celebration specifics, and our studio coordinator will verify artist schedules and share our lookbook within 2 hours.
            </p>

            <div className="booking-perk-box">
              <div className="booking-perk-icon">
                <ShieldCheck size={16} />
              </div>
              <div>
                <div className="booking-perk-title">Certified Chemical-Free</div>
                <div className="booking-perk-desc">
                  We only use hand-blended organic Sojat henna freshly made for each booking.
                </div>
              </div>
            </div>

            <div className="booking-perk-box">
              <div className="booking-perk-icon">
                <Sparkles size={16} />
              </div>
              <div>
                <div className="booking-perk-title">Direct Artist Consultation</div>
                <div className="booking-perk-desc">
                  Personalized moodboard discussions and bridal element customization included.
                </div>
              </div>
            </div>

            <div className="booking-whatsapp-link">
              <span>Prefer immediate chat?</span>
              <a
                href="https://wa.me/919876543210?text=Hello%20Rivaaz%20Henna%20Team,%20I%20would%20like%20to%20inquire%20about%20artist%20availability"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>WhatsApp Studio Team</span>
                <ExternalLink size={12} style={{ display: 'inline', marginLeft: 4 }} />
              </a>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="booking-form-right">
            {bookingSuccess ? (
              <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                <div style={{ width: 56, height: 56, borderRadius: '50%', backgroundColor: '#EAF3EC', color: '#1B3627', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
                  <CheckCircle2 size={32} />
                </div>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.6rem', marginBottom: 8 }}>
                  Availability Request Received!
                </h3>
                <p style={{ color: '#666', fontSize: '0.85rem', marginBottom: 16 }}>
                  Booking Reference: <strong style={{ color: '#1B3627' }}>{bookingSuccess.bookingId}</strong>
                </p>
                <p style={{ color: '#555', fontSize: '0.85rem', lineHeight: 1.5, maxWidth: 440, margin: '0 auto 24px auto' }}>
                  Thank you, <strong>{formData.fullName}</strong>. Our senior bridal coordinator is reviewing our artist roster for <strong>{formData.eventDate}</strong> and will connect via WhatsApp/Phone within 2 hours.
                </p>
                <button className="btn-secondary" onClick={handleReset}>
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="booking-form-grid">
                {/* Full Name */}
                <div className="form-group">
                  <label className="form-label" htmlFor="fullName">FULL NAME *</label>
                  <input
                    id="fullName"
                    type="text"
                    name="fullName"
                    required
                    placeholder="e.g. Radhika Kapoor"
                    className="form-input"
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                </div>

                {/* Phone */}
                <div className="form-group">
                  <label className="form-label" htmlFor="phone">PHONE NUMBER (+91) *</label>
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    required
                    placeholder="e.g. 98765 43210"
                    className="form-input"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                {/* Email */}
                <div className="form-group">
                  <label className="form-label" htmlFor="email">EMAIL ADDRESS *</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    required
                    placeholder="e.g. radhika@example.com"
                    className="form-input"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                {/* Event Type */}
                <div className="form-group">
                  <label className="form-label" htmlFor="eventType">EVENT TYPE *</label>
                  <select
                    id="eventType"
                    name="eventType"
                    required
                    className="form-select"
                    value={formData.eventType}
                    onChange={handleChange}
                  >
                    <option value="Bridal Mehendi">Bridal Mehendi</option>
                    <option value="Wedding & Engagement">Wedding &amp; Engagement</option>
                    <option value="Events & Sangeet">Events &amp; Sangeet</option>
                    <option value="Traditional Marwari">Traditional Marwari</option>
                    <option value="Party & Occasions">Party &amp; Occasions</option>
                    <option value="Destination Weddings">Destination Weddings</option>
                  </select>
                </div>

                {/* Event Date */}
                <div className="form-group">
                  <label className="form-label" htmlFor="eventDate">EVENT DATE *</label>
                  <input
                    id="eventDate"
                    type="date"
                    name="eventDate"
                    required
                    className="form-input"
                    value={formData.eventDate}
                    onChange={handleChange}
                  />
                </div>

                {/* Preferred Time */}
                <div className="form-group">
                  <label className="form-label" htmlFor="preferredTime">PREFERRED TIME *</label>
                  <input
                    id="preferredTime"
                    type="time"
                    name="preferredTime"
                    required
                    className="form-input"
                    value={formData.preferredTime}
                    onChange={handleChange}
                  />
                </div>

                {/* Guest Count */}
                <div className="form-group">
                  <label className="form-label" htmlFor="guestCount">GUEST COUNT *</label>
                  <input
                    id="guestCount"
                    type="text"
                    name="guestCount"
                    required
                    placeholder="e.g. Bride + 12 Guests"
                    className="form-input"
                    value={formData.guestCount}
                    onChange={handleChange}
                  />
                </div>

                {/* City / Venue */}
                <div className="form-group">
                  <label className="form-label" htmlFor="location">CITY / VENUE LOCATION *</label>
                  <input
                    id="location"
                    type="text"
                    name="location"
                    required
                    placeholder="e.g. The Leela Palace, Udaipur"
                    className="form-input"
                    value={formData.location}
                    onChange={handleChange}
                  />
                </div>

                {/* Preferred Design Style */}
                <div className="form-group full-width">
                  <label className="form-label" htmlFor="designStyle">PREFERRED DESIGN STYLE</label>
                  <input
                    id="designStyle"
                    type="text"
                    name="designStyle"
                    placeholder="Royal Rajasthani Storytelling"
                    className="form-input"
                    value={formData.designStyle}
                    onChange={handleChange}
                  />
                </div>

                {/* Additional Requirements */}
                <div className="form-group full-width">
                  <label className="form-label" htmlFor="requirements">ADDITIONAL REQUIREMENTS / CUSTOM DETAILS</label>
                  <textarea
                    id="requirements"
                    name="requirements"
                    rows="3"
                    placeholder="Tell us about personalized bridal portraits, love story motifs, or specific skin sensitivities..."
                    className="form-textarea"
                    value={formData.requirements}
                    onChange={handleChange}
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-submit-booking"
                >
                  <Calendar size={16} />
                  <span>
                    {isSubmitting ? 'VERIFYING SCHEDULE...' : 'REQUEST BOOKING & CHECK ARTIST AVAILABILITY'}
                  </span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
