import React, { useState } from 'react';
import { Eye } from 'lucide-react';
import { portfolioCategories, portfolioItems } from '../data/portfolio';

export default function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [previewImage, setPreviewImage] = useState(null);

  const filteredItems = activeCategory === 'ALL'
    ? portfolioItems
    : portfolioItems.filter(item => item.category === activeCategory);

  return (
    <section id="portfolio" className="portfolio-section">
      <div className="container">
        <span className="section-subtitle">PORTFOLIO &amp; INSPIRATIONS</span>
        <h2 className="section-title">Our Mehendi Art</h2>
        <p className="section-desc">
          Explore intricate bridal mandalas, graceful feet patterns, and delicate Arabic accents.
        </p>

        {/* Filter Pills */}
        <div className="portfolio-filters">
          {portfolioCategories.map(cat => (
            <button
              key={cat}
              className={`filter-pill ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="portfolio-grid">
          {filteredItems.map(item => (
            <div
              key={item.id}
              className="portfolio-card"
              onClick={() => setPreviewImage(item)}
              title="Click to zoom and view details"
            >
              <img src={item.image} alt={item.title} loading="lazy" />
              <div className="portfolio-overlay">
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                  <Eye size={14} color="#FAF7F2" />
                  <span style={{ fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#DDEBE1' }}>
                    {item.category}
                  </span>
                </div>
                <h4 className="portfolio-overlay-title">{item.title}</h4>
                <p className="portfolio-overlay-desc">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Image Preview Modal */}
        {previewImage && (
          <div className="modal-overlay" onClick={() => setPreviewImage(null)}>
            <div
              className="modal-content"
              style={{ maxWidth: 640 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="modal-header">
                <h3 className="modal-title">{previewImage.title}</h3>
                <button
                  className="modal-close-btn"
                  onClick={() => setPreviewImage(null)}
                >
                  ✕
                </button>
              </div>
              <div className="modal-body" style={{ padding: 0 }}>
                <img
                  src={previewImage.image}
                  alt={previewImage.title}
                  style={{ width: '100%', maxHeight: '480px', objectFit: 'cover' }}
                />
                <div style={{ padding: '16px 20px' }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#A67B40' }}>
                    {previewImage.category} COLLECTION
                  </span>
                  <p style={{ fontSize: '0.85rem', color: '#555', marginTop: 4 }}>
                    {previewImage.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
