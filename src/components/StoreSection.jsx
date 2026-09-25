import React, { useState } from 'react';
import { Star, CheckCircle2, ShoppingCart, Clock } from 'lucide-react';
import { products, productCategories } from '../data/products';
import { useApp } from '../context/AppContext';

export default function StoreSection() {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [quantities, setQuantities] = useState({
    'cone-single': 1,
    'cone-bridal-pack': 1,
    'henna-care-kit': 1,
    'festival-bulk-box': 1
  });

  const { addToCart, setSelectedProduct } = useApp();

  const handleQtyChange = (productId, delta) => {
    setQuantities(prev => {
      const current = prev[productId] || 1;
      const updated = Math.max(1, current + delta);
      return { ...prev, [productId]: updated };
    });
  };

  const handleAddToCart = (product) => {
    const qty = quantities[product.id] || 1;
    addToCart(product, qty);
  };

  const filteredProducts = activeCategory === 'ALL'
    ? products
    : products.filter(p => p.category === activeCategory);

  return (
    <section id="store" className="store-section">
      <div className="container">
        {/* Header with Title and Filter Pills */}
        <div className="store-header-row">
          <div className="store-title-wrap">
            <span className="section-subtitle">FRESH BOTANICAL ALCHEMY</span>
            <h2 className="section-title">Shop Our Mehendi Cones</h2>
          </div>

          <div className="store-filter-pills">
            {productCategories.map(cat => (
              <button
                key={cat}
                className={`filter-pill ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Notice Sub-bar */}
        <div className="store-notice-bar">
          <div className="left-notice">
            <CheckCircle2 size={15} />
            <span>Account-required checkout • Free expedited chilled delivery on orders over ₹500</span>
          </div>
          <div className="right-notice">
            <span>Dispatch in 24 Hrs</span>
          </div>
        </div>

        {/* Products Grid */}
        <div className="products-grid">
          {filteredProducts.map(product => {
            const currentQty = quantities[product.id] || 1;

            return (
              <div key={product.id} className="product-card">
                {/* Image & Badge */}
                <div
                  className="product-image-wrap"
                  onClick={() => setSelectedProduct(product)}
                  title="Click for full product details"
                >
                  <img src={product.image} alt={product.name} loading="lazy" />
                  <span className={`product-badge ${product.badgeColor}`}>
                    {product.badge}
                  </span>
                </div>

                {/* Tag & Rating */}
                <div className="product-meta-row">
                  <span className="product-tag">{product.tag}</span>
                  <span className="product-rating">
                    <Star size={12} fill="#D4AF37" />
                    <span>{product.rating}</span>
                    <span style={{ color: '#888' }}>({product.reviewsCount})</span>
                  </span>
                </div>

                {/* Title & Description */}
                <h3
                  className="product-title"
                  onClick={() => setSelectedProduct(product)}
                >
                  {product.name}
                </h3>
                <p className="product-desc">{product.description}</p>

                {/* Price and Quantity Selector */}
                <div className="product-bottom-row">
                  <span className="product-price">₹{product.price}</span>

                  <div className="qty-control">
                    <button
                      className="qty-btn"
                      onClick={() => handleQtyChange(product.id, -1)}
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="qty-val">{currentQty}</span>
                    <button
                      className="qty-btn"
                      onClick={() => handleQtyChange(product.id, 1)}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <button
                  className="btn-add-cart"
                  onClick={() => handleAddToCart(product)}
                >
                  <ShoppingCart size={14} />
                  <span>ADD TO CART</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
