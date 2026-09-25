import React from 'react';
import { Plane, CheckCircle2 } from 'lucide-react';
import { services } from '../data/services';
import { useApp } from '../context/AppContext';

export default function ServicesSection() {
  const { scrollToBooking } = useApp();

  return (
    <section id="services" className="services-section">
      <div className="container">
        <span className="section-subtitle">ARTISTRY &amp; HEIRLOOM</span>
        <h2 className="section-title">Professional Mehendi Services</h2>
        <p className="section-desc">
          Intricately customized to complement bridal aesthetics, destination celebrations, and family galas.
        </p>

        <div className="services-grid">
          {services.map((service) => {
            if (service.isFeatured) {
              return (
                <div key={service.id} className="service-card-featured">
                  <div className="service-featured-icon">
                    <Plane size={20} />
                  </div>
                  <h3 className="service-card-title">{service.title}</h3>
                  <p className="service-card-desc">{service.description}</p>
                  
                  <ul className="service-featured-bullets">
                    {service.bullets.map((bullet, idx) => (
                      <li key={idx}>
                        <CheckCircle2 size={15} />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    className="btn-destination"
                    onClick={() => scrollToBooking('Destination Weddings')}
                  >
                    {service.btnText}
                  </button>
                </div>
              );
            }

            return (
              <div key={service.id} className="service-card">
                <div className="service-tags-row">
                  <span className="service-tag-left">{service.tag1}</span>
                  <span className="service-tag-right">{service.tag2}</span>
                </div>

                <div className="service-image-box">
                  <img src={service.image} alt={service.title} loading="lazy" />
                </div>

                <h3 className="service-card-title">{service.title}</h3>
                <p className="service-card-desc">{service.description}</p>

                <button
                  className="service-card-btn"
                  onClick={() => scrollToBooking(service.title)}
                >
                  BOOK NOW
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
