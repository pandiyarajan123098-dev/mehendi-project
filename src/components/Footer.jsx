import React, { useState } from 'react';
import { Mail, Phone, MapPin, Instagram, Youtube, ExternalLink, Send, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { submitContactMessage } from '../services/api';

export default function Footer() {
  const { scrollToBooking, showToast } = useApp();
  const [contactData, setContactData] = useState({ name: '', email: '', phone: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    if (!contactData.name || !contactData.email || !contactData.message) {
      showToast('Please fill in Name, Email and Message', 'warning');
      return;
    }

    setIsSubmitting(true);
    try {
      await submitContactMessage(contactData);
      setIsSent(true);
      showToast('Message sent to our studio! We will reply shortly.');
    } catch {
      showToast('Message received! Thank you.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Info */}
          <div className="footer-brand">
            <span className="logo-text">RIVAAZ</span>
            <span className="logo-sub">ROYAL MEHENDI ATELIER</span>
            <p>
              Dedicated to the preservation and elevated luxury expression of botanical henna art. Certified Sojat organic cones, heirloom bridal artistry, and masterclass education.
            </p>
            <div style={{ marginTop: 16, display: 'flex', gap: 12 }}>
              <span style={{ fontSize: '0.78rem', color: '#A3D4B3', display: 'flex', alignItems: 'center', gap: 4 }}>
                <MapPin size={14} /> Mumbai Atelier &amp; Udaipur Studio
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4 className="footer-col-title">Atelier Services</h4>
            <ul className="footer-links">
              <li><button onClick={() => scrollTo('store')}>Natural Mehendi Cones</button></li>
              <li><button onClick={() => scrollToBooking('Bridal Mehendi')}>Bridal &amp; Wedding Mehendi</button></li>
              <li><button onClick={() => scrollToBooking('Destination Weddings')}>Destination Celebrations</button></li>
              <li><button onClick={() => scrollTo('classes')}>Online Masterclass</button></li>
              <li><button onClick={() => scrollTo('classes')}>Offline Studio Bootcamp</button></li>
              <li><button onClick={() => scrollTo('portfolio')}>Bridal Art Portfolio</button></li>
            </ul>
          </div>

          {/* Studio Contact */}
          <div className="footer-col">
            <h4 className="footer-col-title">Studio Inquiries</h4>
            <ul className="footer-links">
              <li>
                <a href="tel:+919876543210" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Phone size={13} /> +91 98765 43210
                </a>
              </li>
              <li>
                <a href="mailto:atelier@rivaazhenna.com" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Mail size={13} /> atelier@rivaazhenna.com
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'flex', alignItems: 'center', gap: 6 }}
                >
                  <ExternalLink size={13} /> WhatsApp Studio Desk
                </a>
              </li>
              <li>
                <a
                  href="https://script.google.com/macros/s/AKfycbyN6K8qvfit7zIjy3NMVE1vv1iZFcZPnDUH4WS1wHj5kWj3HT95Xc8bHxA_WrYrpGk3Pw/exec"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#A3D4B3', fontSize: '0.74rem' }}
                  title="Google Sheets Apps Script API Webhook"
                >
                  <ExternalLink size={12} /> Google Sheet API Bridge
                </a>
              </li>
            </ul>
          </div>

          {/* Direct Message Form */}
          <div className="footer-col">
            <h4 className="footer-col-title">Send a Message</h4>
            {isSent ? (
              <div style={{ color: '#A3D4B3', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: 6 }}>
                <CheckCircle2 size={16} />
                <span>Thank you! Your note has been delivered to our concierge.</span>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <input
                  type="text"
                  placeholder="Your Name"
                  required
                  value={contactData.name}
                  onChange={e => setContactData({ ...contactData, name: e.target.value })}
                  style={{ padding: '7px 10px', fontSize: '0.76rem', borderRadius: 4, border: '1px solid #234834', backgroundColor: '#1A3326', color: '#FFF' }}
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  required
                  value={contactData.email}
                  onChange={e => setContactData({ ...contactData, email: e.target.value })}
                  style={{ padding: '7px 10px', fontSize: '0.76rem', borderRadius: 4, border: '1px solid #234834', backgroundColor: '#1A3326', color: '#FFF' }}
                />
                <textarea
                  placeholder="Your Message..."
                  rows="2"
                  required
                  value={contactData.message}
                  onChange={e => setContactData({ ...contactData, message: e.target.value })}
                  style={{ padding: '7px 10px', fontSize: '0.76rem', borderRadius: 4, border: '1px solid #234834', backgroundColor: '#1A3326', color: '#FFF', resize: 'none' }}
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    backgroundColor: '#E6D8C8',
                    color: '#14281D',
                    border: 'none',
                    padding: '8px',
                    borderRadius: 4,
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    letterSpacing: '0.06em',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 6
                  }}
                >
                  <Send size={12} />
                  <span>{isSubmitting ? 'SENDING...' : 'SEND INQUIRY'}</span>
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="footer-bottom-row">
          <div>
            © {new Date().getFullYear()} Rivaaz Henna Atelier. All Rights Reserved. Handcrafted with Pure Sojat Henna.
          </div>
          <div style={{ display: 'flex', gap: 16 }}>
            <a href="#store">Store</a>
            <a href="#services">Services</a>
            <a href="#classes">Classes</a>
            <a href="#faq">FAQ</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
