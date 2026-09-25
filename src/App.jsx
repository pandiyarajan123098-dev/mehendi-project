import React from 'react';
import { useApp } from './context/AppContext';
import Header from './components/Header';
import Hero from './components/Hero';
import PillarsSection from './components/PillarsSection';
import StoreSection from './components/StoreSection';
import ServicesSection from './components/ServicesSection';
import BookingForm from './components/BookingForm';
import AcademySection from './components/AcademySection';
import PortfolioSection from './components/PortfolioSection';
import TrustSection from './components/TrustSection';
import TestimonialsSection from './components/TestimonialsSection';
import HowItWorksSection from './components/HowItWorksSection';
import FaqSection from './components/FaqSection';
import CtaBanner from './components/CtaBanner';
import Footer from './components/Footer';

// Modals
import CartDrawer from './components/CartDrawer';
import AuthModal from './components/AuthModal';
import CheckoutModal from './components/CheckoutModal';
import ClassModal from './components/ClassModal';
import ProductDetailModal from './components/ProductDetailModal';
import OrderHistoryModal from './components/OrderHistoryModal';

export default function App() {
  const { toast } = useApp();

  return (
    <div className="site-wrapper">
      {/* Top Floating/Sticky Header */}
      <Header />

      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Bespoke Excellence: Our Three Pillars of Craft */}
      <PillarsSection />

      {/* 3. Fresh Botanical Alchemy: Shop Our Mehendi Cones */}
      <StoreSection />

      {/* 4. Artistry & Heirloom: Professional Mehendi Services */}
      <ServicesSection />

      {/* 5. Reserve Your Artist: Check Artist Availability (Booking Form) */}
      <BookingForm />

      {/* 6. Academy & Certification: Learn Mehendi. Create. Earn. */}
      <AcademySection />

      {/* 7. Portfolio & Inspirations: Our Mehendi Art */}
      <PortfolioSection />

      {/* 8. The Rivaaz Promise: Why Brides & Artists Trust Us & Royal Stats */}
      <TrustSection />

      {/* 9. Testimonials: What Our Customers Say */}
      <TestimonialsSection />

      {/* 10. Effortless Experience: How It Works */}
      <HowItWorksSection />

      {/* 11. Got Questions: Frequently Asked Questions */}
      <FaqSection />

      {/* 12. Celebrate Pure Heritage: Ready to Create Something Beautiful? */}
      <CtaBanner />

      {/* 13. Footer */}
      <Footer />

      {/* Interactive Drawers & Modals */}
      <CartDrawer />
      <AuthModal />
      <CheckoutModal />
      <ClassModal />
      <ProductDetailModal />
      <OrderHistoryModal />

      {/* Toast Notification */}
      {toast && (
        <div className="toast-popup" role="status" aria-live="polite">
          <span>{toast.message}</span>
        </div>
      )}
    </div>
  );
}
