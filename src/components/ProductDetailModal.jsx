import React, { useState } from 'react';
import { X, Star, CheckCircle2, ShoppingCart, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function ProductDetailModal() {
  const { selectedProduct, setSelectedProduct, addToCart } = useApp();
  const [qty, setQty] = useState(1);

  if (!selectedProduct) return null;

  const handleAdd = () => {
    addToCart(selectedProduct, qty);
    setSelectedProduct(null);
  };

  return (
    <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: 620 }}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span className={`product-badge ${selectedProduct.badgeColor}`} style={{ position: 'static' }}>
              {selectedProduct.badge}
            </span>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#A67B40', letterSpacing: '0.08em' }}>
              {selectedProduct.tag}
            </span>
          </div>
          <button className="modal-close-btn" onClick={() => setSelectedProduct(null)}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          <div className="product-detail-grid">
            <div className="product-detail-img-box">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 6 }}>
                <Star size={14} fill="#D4AF37" color="#D4AF37" />
                <span style={{ fontSize: '0.82rem', fontWeight: 700 }}>{selectedProduct.rating}</span>
                <span style={{ fontSize: '0.75rem', color: '#888' }}>({selectedProduct.reviewsCount} verified reviews)</span>
              </div>

              <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.45rem', marginBottom: 8, color: '#1A1A1A' }}>
                {selectedProduct.name}
              </h3>

              <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.6rem', fontWeight: 700, color: '#1B3627', marginBottom: 12 }}>
                ₹{selectedProduct.price}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                <div className="qty-control">
                  <button className="qty-btn" onClick={() => setQty(Math.max(1, qty - 1))}>-</button>
                  <span className="qty-val">{qty}</span>
                  <button className="qty-btn" onClick={() => setQty(qty + 1)}>+</button>
                </div>
                <button
                  className="btn-add-cart"
                  style={{ flex: 1, padding: '10px 14px' }}
                  onClick={handleAdd}
                >
                  <ShoppingCart size={15} />
                  <span>ADD TO CART • ₹{selectedProduct.price * qty}</span>
                </button>
              </div>

              <div style={{ fontSize: '0.72rem', color: '#555', display: 'flex', alignItems: 'center', gap: 6 }}>
                <ShieldCheck size={14} color="#2F6946" />
                <span>Dispatches within 24h in chilled thermal box</span>
              </div>
            </div>
          </div>

          <div style={{ borderTop: '1px solid #EBE4DA', paddingTop: 16 }}>
            <h4 style={{ fontSize: '0.82rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 8, color: '#1B3627' }}>
              Formula &amp; Product Details
            </h4>
            <p style={{ fontSize: '0.84rem', color: '#555', lineHeight: 1.55, marginBottom: 16 }}>
              {selectedProduct.longDescription || selectedProduct.description}
            </p>

            <h4 style={{ fontSize: '0.82rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 8, color: '#1B3627' }}>
              Guaranteed Features
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
              {selectedProduct.features?.map((feat, idx) => (
                <li key={idx} style={{ fontSize: '0.78rem', color: '#444', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <CheckCircle2 size={14} color="#2F6946" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
