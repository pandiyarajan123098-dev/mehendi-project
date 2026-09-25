import React from 'react';
import { X, Trash2, ArrowRight, ShoppingBag, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function CartDrawer() {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    updateQuantity,
    removeFromCart,
    cartSubtotal,
    deliveryCharge,
    cartTotal,
    cartItemCount,
    freeDeliveryThreshold,
    startCheckout
  } = useApp();

  if (!isCartOpen) return null;

  const freeDeliveryDiff = Math.max(0, freeDeliveryThreshold - cartSubtotal);

  return (
    <div className="cart-drawer-overlay" onClick={() => setIsCartOpen(false)}>
      <div className="cart-drawer" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <ShoppingBag size={20} color="#1B3627" />
            <h3 className="modal-title">Shopping Cart ({cartItemCount})</h3>
          </div>
          <button
            className="modal-close-btn"
            onClick={() => setIsCartOpen(false)}
            aria-label="Close cart drawer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Free Delivery Bar */}
        <div style={{ padding: '12px 20px', backgroundColor: '#F6F2EC', borderBottom: '1px solid #EBE4DA' }}>
          {freeDeliveryDiff === 0 ? (
            <div style={{ fontSize: '0.74rem', color: '#1B3627', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
              <CheckCircle2 size={15} />
              <span>Free Expedited Chilled Delivery Unlocked!</span>
            </div>
          ) : (
            <div style={{ fontSize: '0.74rem', color: '#69655E', fontWeight: 500 }}>
              Add <strong>₹{freeDeliveryDiff}</strong> more for <strong>Free Chilled Delivery</strong> (Orders over ₹500)
            </div>
          )}
        </div>

        {/* Cart Line Items */}
        <div className="cart-items-list">
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px' }}>
              <div style={{ width: 60, height: 60, borderRadius: '50%', backgroundColor: '#FAF6F0', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto', color: '#A67B40' }}>
                <ShoppingBag size={28} />
              </div>
              <h4 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.2rem', marginBottom: 6 }}>
                Your cart is empty
              </h4>
              <p style={{ fontSize: '0.8rem', color: '#888', marginBottom: 20 }}>
                Explore our fresh organic Sojat cones and aftercare formulations.
              </p>
              <button
                className="btn-primary"
                onClick={() => {
                  setIsCartOpen(false);
                  const el = document.getElementById('store');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Browse Mehendi Cones
              </button>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-img" />
                <div className="cart-item-info">
                  <h4 className="cart-item-title">{item.name}</h4>
                  <div className="cart-item-price">₹{item.price} each</div>
                  
                  <div className="cart-item-actions">
                    <div className="qty-control" style={{ padding: '1px 3px' }}>
                      <button
                        className="qty-btn"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        -
                      </button>
                      <span className="qty-val" style={{ width: 18, fontSize: '0.75rem' }}>
                        {item.quantity}
                      </span>
                      <button
                        className="qty-btn"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>

                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1A1A1A' }}>
                      ₹{item.price * item.quantity}
                    </span>

                    <button
                      className="cart-item-remove"
                      onClick={() => removeFromCart(item.id)}
                      title="Remove from cart"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer & Checkout */}
        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="cart-summary-line">
              <span>Subtotal:</span>
              <span>₹{cartSubtotal}</span>
            </div>
            <div className="cart-summary-line">
              <span>Chilled Thermal Shipping:</span>
              <span>{deliveryCharge === 0 ? <strong style={{ color: '#1B3627' }}>FREE</strong> : `₹${deliveryCharge}`}</span>
            </div>
            <div className="cart-summary-line total">
              <span>Total Amount:</span>
              <span>₹{cartTotal}</span>
            </div>

            <div className="cart-notice-pill" style={{ marginTop: 12 }}>
              <ShieldCheck size={14} />
              <span>Chilled insulation &amp; ice gel packaging included</span>
            </div>

            <button
              className="btn-primary"
              style={{ width: '100%', marginTop: 12, padding: '13px', fontSize: '0.8rem' }}
              onClick={startCheckout}
            >
              <span>PROCEED TO CHECKOUT</span>
              <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
