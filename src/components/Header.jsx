import React, { useState } from 'react';
import { ShoppingBag, User, Calendar, History, Menu, X, Phone, MapPin, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Header() {
  const {
    cartItemCount,
    setIsCartOpen,
    user,
    setIsAuthModalOpen,
    setIsOrderHistoryOpen,
    scrollToBooking
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (id) => {
    setMobileMenuOpen(false);
    if (id === 'booking') {
      scrollToBooking('Bridal Mehendi');
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className="site-header">
        <div className="container header-inner">
          {/* Brand Logo */}
          <a href="#" className="logo-brand">
            <span className="logo-text">RIVAAZ</span>
            <span className="logo-sub">HENNA ATELIER</span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="desktop-nav">
            <ul className="nav-links">
              <li><a href="#store" className="nav-link">Shop Cones</a></li>
              <li><a href="#services" className="nav-link">Services</a></li>
              <li><a href="#booking-section" className="nav-link">Book Artist</a></li>
              <li><a href="#classes" className="nav-link">Classes</a></li>
              <li><a href="#portfolio" className="nav-link">Portfolio</a></li>
              <li><a href="#faq" className="nav-link">FAQ</a></li>
            </ul>
          </nav>

          {/* Header Actions */}
          <div className="header-actions">
            {/* Order History */}
            <button
              className="btn-header-account btn-hide-sm"
              onClick={() => setIsOrderHistoryOpen(true)}
              title="View Order & Booking History"
              aria-label="Order History"
            >
              <History size={15} />
              <span>History</span>
            </button>

            {/* User Account / Auth */}
            <button
              className="btn-header-account btn-hide-sm"
              onClick={() => setIsAuthModalOpen(true)}
              title={user ? `Signed in as ${user.name}` : 'Sign In / Register'}
              aria-label="User Account"
            >
              <User size={15} />
              <span>{user ? user.name.split(' ')[0] : 'Account'}</span>
            </button>

            {/* Cart Button */}
            <button
              className="btn-header-cart"
              onClick={() => setIsCartOpen(true)}
              aria-label={`Shopping cart with ${cartItemCount} items`}
              title="Shopping Cart"
            >
              <ShoppingBag size={18} />
              {cartItemCount > 0 && (
                <span className="cart-badge">{cartItemCount}</span>
              )}
            </button>

            {/* Quick Book CTA - Desktop */}
            <button
              className="btn-primary btn-hide-md"
              onClick={() => scrollToBooking('Bridal Mehendi')}
              style={{ padding: '8px 16px', fontSize: '0.74rem' }}
            >
              <Calendar size={14} />
              <span>Book Now</span>
            </button>

            {/* Mobile Hamburger Toggle Button */}
            <button
              className="mobile-hamburger-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close mobile menu' : 'Open mobile menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="mobile-menu-backdrop" onClick={() => setMobileMenuOpen(false)}>
          <div className="mobile-menu-drawer" onClick={e => e.stopPropagation()}>
            <div className="mobile-menu-header">
              <div className="logo-brand">
                <span className="logo-text">RIVAAZ</span>
                <span className="logo-sub">HENNA ATELIER</span>
              </div>
              <button
                className="modal-close-btn"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mobile-menu-body">
              <ul className="mobile-nav-list">
                <li>
                  <button className="mobile-nav-item" onClick={() => handleNavClick('store')}>
                    <span>Shop Mehendi Cones</span>
                    <span className="nav-arrow">→</span>
                  </button>
                </li>
                <li>
                  <button className="mobile-nav-item" onClick={() => handleNavClick('services')}>
                    <span>Professional Services</span>
                    <span className="nav-arrow">→</span>
                  </button>
                </li>
                <li>
                  <button className="mobile-nav-item" onClick={() => handleNavClick('booking')}>
                    <span>Reserve Artist / Check Availability</span>
                    <span className="nav-arrow">→</span>
                  </button>
                </li>
                <li>
                  <button className="mobile-nav-item" onClick={() => handleNavClick('classes')}>
                    <span>Academy &amp; Masterclasses</span>
                    <span className="nav-arrow">→</span>
                  </button>
                </li>
                <li>
                  <button className="mobile-nav-item" onClick={() => handleNavClick('portfolio')}>
                    <span>Bridal Art Portfolio</span>
                    <span className="nav-arrow">→</span>
                  </button>
                </li>
                <li>
                  <button className="mobile-nav-item" onClick={() => handleNavClick('faq')}>
                    <span>Frequently Asked Questions</span>
                    <span className="nav-arrow">→</span>
                  </button>
                </li>
              </ul>

              <div className="mobile-menu-actions">
                <button
                  className="btn-primary"
                  style={{ width: '100%', padding: '14px', fontSize: '0.82rem', letterSpacing: '0.06em' }}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    scrollToBooking('Bridal Mehendi');
                  }}
                >
                  <Calendar size={16} />
                  <span>BOOK AN ARTIST</span>
                </button>

                <div className="mobile-account-row">
                  <button
                    className="mobile-account-btn"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setIsAuthModalOpen(true);
                    }}
                    title={user ? user.name : 'My Account'}
                  >
                    <User size={15} />
                    <span className="truncate-text">{user ? user.name.split(' ')[0] : 'My Account'}</span>
                  </button>

                  <button
                    className="mobile-account-btn"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setIsOrderHistoryOpen(true);
                    }}
                  >
                    <History size={15} />
                    <span>Order History</span>
                  </button>
                </div>
              </div>

              <div className="mobile-menu-footer">
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.75rem', color: '#666', marginBottom: 6 }}>
                  <MapPin size={14} color="#1B3627" />
                  <span>Mumbai Atelier &amp; Udaipur Studio</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.75rem', color: '#666' }}>
                  <Phone size={14} color="#1B3627" />
                  <span>+91 98765 43210 (Concierge Desk)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
