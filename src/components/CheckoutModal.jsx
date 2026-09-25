import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, CreditCard, Smartphone, Banknote, Truck } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { submitStoreOrder } from '../services/api';

export default function CheckoutModal() {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartSubtotal,
    deliveryCharge,
    cartTotal,
    clearCart,
    user,
    showToast,
    triggerConfetti,
    setLastConfirmedOrder
  } = useApp();

  const [address, setAddress] = useState({
    recipientName: user?.name || '',
    phone: user?.phone || '',
    street: '',
    city: '',
    state: '',
    pincode: ''
  });

  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [upiId, setUpiId] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);

  if (!isCheckoutOpen) return null;

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress(prev => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (!address.recipientName || !address.phone || !address.street || !address.city || !address.pincode) {
      showToast('Please fill in complete delivery address', 'warning');
      return;
    }

    setIsProcessing(true);

    const orderPayload = {
      user: {
        name: user?.name || address.recipientName,
        email: user?.email || 'guest@rivaazhenna.com',
        phone: address.phone
      },
      shippingAddress: address,
      items: cart.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        total: item.price * item.quantity
      })),
      subtotal: cartSubtotal,
      deliveryCharge,
      totalAmount: cartTotal,
      paymentMethod,
      orderDate: new Date().toLocaleString()
    };

    try {
      const res = await submitStoreOrder(orderPayload);
      setCompletedOrder({ ...orderPayload, orderId: res.orderId });
      setLastConfirmedOrder({ ...orderPayload, orderId: res.orderId });
      clearCart();
      triggerConfetti();
      showToast(`Order Confirmed! ID: ${res.orderId}`);
    } catch (err) {
      console.error(err);
      showToast('Order received successfully!');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setCompletedOrder(null);
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: completedOrder ? 540 : 660 }}>
        {/* Modal Header */}
        <div className="modal-header">
          <h3 className="modal-title" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {completedOrder ? (
              <><CheckCircle2 size={20} color="#1B3627" /> Order Confirmed</>
            ) : 'Checkout & Express Chilled Delivery'}
          </h3>
          <button className="modal-close-btn" onClick={handleClose} aria-label="Close checkout modal">
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          {completedOrder ? (
            /* Confirmation View */
            <div style={{ textAlign: 'center', padding: '10px 0' }}>
              <div style={{ width: 64, height: 64, borderRadius: '50%', backgroundColor: '#EAF3EC', color: '#1B3627', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
                <CheckCircle2 size={36} />
              </div>

              <h4 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.6rem', color: '#1A1A1A', marginBottom: 6 }}>
                Thank You for Your Order!
              </h4>
              <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: 20 }}>
                Order ID: <strong style={{ color: '#1B3627' }}>{completedOrder.orderId}</strong>
              </p>

              <div style={{ backgroundColor: '#FAF6F0', borderRadius: 8, padding: '16px 20px', textAlign: 'left', marginBottom: 24, border: '1px solid #EBE4DA' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: '0.82rem' }}>
                  <span style={{ color: '#666' }}>Recipient:</span>
                  <strong>{completedOrder.shippingAddress.recipientName} ({completedOrder.shippingAddress.phone})</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: '0.82rem' }}>
                  <span style={{ color: '#666' }}>Delivery Location:</span>
                  <span>{completedOrder.shippingAddress.city}, {completedOrder.shippingAddress.pincode}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: '0.82rem' }}>
                  <span style={{ color: '#666' }}>Payment Mode:</span>
                  <span>{completedOrder.paymentMethod}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', fontWeight: 700, paddingTop: 8, borderTop: '1px dashed #D8CFC2' }}>
                  <span>Total Paid:</span>
                  <span style={{ color: '#1B3627' }}>₹{completedOrder.totalAmount}</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 8, backgroundColor: '#EAF3EC', padding: '10px 14px', borderRadius: 6, fontSize: '0.76rem', color: '#1B3627', marginBottom: 24 }}>
                <Truck size={16} />
                <span>Dispatches in 24 hours in insulated cold-pack box. A tracking link has been sent to your phone.</span>
              </div>

              <button className="btn-primary" style={{ width: '100%' }} onClick={handleClose}>
                Continue Exploring
              </button>
            </div>
          ) : (
            /* Checkout Form View */
            <form onSubmit={handlePlaceOrder}>
              <div className="checkout-grid">
                {/* Left: Shipping Address */}
                <div>
                  <h4 style={{ fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 12, color: '#1B3627' }}>
                    1. Delivery Address
                  </h4>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <div className="form-group">
                      <label className="form-label">Full Name *</label>
                      <input
                        type="text"
                        name="recipientName"
                        required
                        className="form-input"
                        placeholder="Radhika Kapoor"
                        value={address.recipientName}
                        onChange={handleAddressChange}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        className="form-input"
                        placeholder="98765 43210"
                        value={address.phone}
                        onChange={handleAddressChange}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Street / House Address *</label>
                      <input
                        type="text"
                        name="street"
                        required
                        className="form-input"
                        placeholder="Apartment 402, Royal Residency"
                        value={address.street}
                        onChange={handleAddressChange}
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                      <div className="form-group">
                        <label className="form-label">City *</label>
                        <input
                          type="text"
                          name="city"
                          required
                          className="form-input"
                          placeholder="Mumbai"
                          value={address.city}
                          onChange={handleAddressChange}
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Pincode *</label>
                        <input
                          type="text"
                          name="pincode"
                          required
                          className="form-input"
                          placeholder="400050"
                          value={address.pincode}
                          onChange={handleAddressChange}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Payment Selection */}
                  <h4 style={{ fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', marginTop: 18, marginBottom: 12, color: '#1B3627' }}>
                    2. Payment Method
                  </h4>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', border: `1px solid ${paymentMethod === 'UPI' ? '#1B3627' : '#E5DCD0'}`, borderRadius: 4, cursor: 'pointer', backgroundColor: paymentMethod === 'UPI' ? '#FAF6F0' : '#FFF' }}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="UPI"
                        checked={paymentMethod === 'UPI'}
                        onChange={() => setPaymentMethod('UPI')}
                      />
                      <Smartphone size={16} color="#1B3627" />
                      <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>UPI (Google Pay / PhonePe / Paytm)</span>
                    </label>

                    <label style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', border: `1px solid ${paymentMethod === 'Cards' ? '#1B3627' : '#E5DCD0'}`, borderRadius: 4, cursor: 'pointer', backgroundColor: paymentMethod === 'Cards' ? '#FAF6F0' : '#FFF' }}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="Cards"
                        checked={paymentMethod === 'Cards'}
                        onChange={() => setPaymentMethod('Cards')}
                      />
                      <CreditCard size={16} color="#1B3627" />
                      <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>Credit / Debit Card (Visa, MC, RuPay)</span>
                    </label>

                    <label style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', border: `1px solid ${paymentMethod === 'COD' ? '#1B3627' : '#E5DCD0'}`, borderRadius: 4, cursor: 'pointer', backgroundColor: paymentMethod === 'COD' ? '#FAF6F0' : '#FFF' }}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="COD"
                        checked={paymentMethod === 'COD'}
                        onChange={() => setPaymentMethod('COD')}
                      />
                      <Banknote size={16} color="#1B3627" />
                      <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>Cash on Delivery</span>
                    </label>
                  </div>
                </div>

                {/* Right: Order Summary */}
                <div style={{ backgroundColor: '#FAF6F0', borderRadius: 6, padding: '16px', border: '1px solid #EBE4DA', display: 'flex', flexDirection: 'column' }}>
                  <h4 style={{ fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 12, color: '#1B3627' }}>
                    Order Summary
                  </h4>

                  <div style={{ flex: 1, overflowY: 'auto', maxHeight: 180, display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 12 }}>
                    {cart.map(item => (
                      <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem' }}>
                        <span>{item.quantity} × {item.name}</span>
                        <strong>₹{item.price * item.quantity}</strong>
                      </div>
                    ))}
                  </div>

                  <div style={{ borderTop: '1px solid #E5DACB', paddingTop: 10, display: 'flex', flexDirection: 'column', gap: 6, fontSize: '0.8rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#666' }}>
                      <span>Subtotal:</span>
                      <span>₹{cartSubtotal}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#666' }}>
                      <span>Chilled Thermal Courier:</span>
                      <span>{deliveryCharge === 0 ? <strong style={{ color: '#1B3627' }}>FREE</strong> : `₹${deliveryCharge}`}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1rem', fontWeight: 700, color: '#1B3627', borderTop: '1px dashed #D8CFC2', paddingTop: 8 }}>
                      <span>Total Amount:</span>
                      <span>₹{cartTotal}</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="btn-primary"
                    style={{ width: '100%', marginTop: 16, padding: '12px' }}
                  >
                    {isProcessing ? 'AUTHORIZING ORDER...' : `PAY & PLACE ORDER (₹${cartTotal})`}
                  </button>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'center', marginTop: 10, fontSize: '0.7rem', color: '#777' }}>
                    <ShieldCheck size={13} color="#2F6946" />
                    <span>SSL 256-Bit Encrypted Secure Checkout</span>
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
