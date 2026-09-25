import React, { useState, useEffect } from 'react';
import { X, Package, Calendar, GraduationCap, Clock, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function OrderHistoryModal() {
  const { isOrderHistoryOpen, setIsOrderHistoryOpen } = useApp();
  const [activeTab, setActiveTab] = useState('orders'); // 'orders', 'bookings', 'enrollments'
  const [orders, setOrders] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
    if (isOrderHistoryOpen) {
      try {
        setOrders(JSON.parse(localStorage.getItem('rivaaz_orders') || '[]'));
        setBookings(JSON.parse(localStorage.getItem('rivaaz_bookings') || '[]'));
        setEnrollments(JSON.parse(localStorage.getItem('rivaaz_enrollments') || '[]'));
      } catch (e) {
        console.error(e);
      }
    }
  }, [isOrderHistoryOpen]);

  if (!isOrderHistoryOpen) return null;

  return (
    <div className="modal-overlay" onClick={() => setIsOrderHistoryOpen(false)}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: 640 }}>
        <div className="modal-header">
          <h3 className="modal-title">My Orders &amp; Reservations</h3>
          <button className="modal-close-btn" onClick={() => setIsOrderHistoryOpen(false)}>
            <X size={18} />
          </button>
        </div>

        {/* Tab switchers */}
        <div style={{ display: 'flex', borderBottom: '1px solid #EBE4DA', backgroundColor: '#FAF8F5' }}>
          <button
            onClick={() => setActiveTab('orders')}
            style={{
              flex: 1,
              padding: '12px',
              border: 'none',
              background: activeTab === 'orders' ? '#FFF' : 'transparent',
              borderBottom: activeTab === 'orders' ? '2px solid #1B3627' : 'none',
              fontWeight: 700,
              fontSize: '0.78rem',
              color: activeTab === 'orders' ? '#1B3627' : '#666',
              cursor: 'pointer'
            }}
          >
            Cone Orders ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab('bookings')}
            style={{
              flex: 1,
              padding: '12px',
              border: 'none',
              background: activeTab === 'bookings' ? '#FFF' : 'transparent',
              borderBottom: activeTab === 'bookings' ? '2px solid #1B3627' : 'none',
              fontWeight: 700,
              fontSize: '0.78rem',
              color: activeTab === 'bookings' ? '#1B3627' : '#666',
              cursor: 'pointer'
            }}
          >
            Artist Bookings ({bookings.length})
          </button>
          <button
            onClick={() => setActiveTab('enrollments')}
            style={{
              flex: 1,
              padding: '12px',
              border: 'none',
              background: activeTab === 'enrollments' ? '#FFF' : 'transparent',
              borderBottom: activeTab === 'enrollments' ? '2px solid #1B3627' : 'none',
              fontWeight: 700,
              fontSize: '0.78rem',
              color: activeTab === 'enrollments' ? '#1B3627' : '#666',
              cursor: 'pointer'
            }}
          >
            Class Enrollments ({enrollments.length})
          </button>
        </div>

        <div className="modal-body" style={{ maxHeight: '60vh', overflowY: 'auto' }}>
          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div>
              {orders.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px 20px', color: '#777' }}>
                  <Package size={36} color="#A67B40" style={{ margin: '0 auto 12px auto' }} />
                  <p style={{ fontSize: '0.9rem', fontWeight: 600 }}>No orders placed yet.</p>
                  <p style={{ fontSize: '0.78rem', marginTop: 4 }}>Your fresh cone purchases will appear here.</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {orders.map((ord, idx) => (
                    <div key={idx} style={{ backgroundColor: '#FAF6F0', borderRadius: 8, padding: 14, border: '1px solid #EBE4DA' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, borderBottom: '1px solid #EAE0D2', paddingBottom: 8 }}>
                        <div>
                          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#1B3627' }}>
                            {ord.orderId}
                          </span>
                          <span style={{ fontSize: '0.72rem', color: '#888', marginLeft: 8 }}>
                            {ord.orderDate || ord.timestamp?.split('T')[0]}
                          </span>
                        </div>
                        <span style={{ fontSize: '0.7rem', fontWeight: 700, backgroundColor: '#EAF3EC', color: '#1B3627', padding: '2px 8px', borderRadius: 100 }}>
                          {ord.status || 'Confirmed'}
                        </span>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 8 }}>
                        {ord.items?.map((it, i) => (
                          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: '#444' }}>
                            <span>{it.quantity} × {it.name}</span>
                            <strong>₹{it.price * it.quantity}</strong>
                          </div>
                        ))}
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', fontWeight: 700, paddingTop: 6, borderTop: '1px dashed #D6CBBC' }}>
                        <span>Total Paid ({ord.paymentMethod}):</span>
                        <span style={{ color: '#1B3627' }}>₹{ord.totalAmount}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Bookings Tab */}
          {activeTab === 'bookings' && (
            <div>
              {bookings.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px 20px', color: '#777' }}>
                  <Calendar size={36} color="#A67B40" style={{ margin: '0 auto 12px auto' }} />
                  <p style={{ fontSize: '0.9rem', fontWeight: 600 }}>No artist inquiries recorded yet.</p>
                  <p style={{ fontSize: '0.78rem', marginTop: 4 }}>Check artist availability to plan your wedding mehendi.</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {bookings.map((bk, idx) => (
                    <div key={idx} style={{ backgroundColor: '#FAF6F0', borderRadius: 8, padding: 14, border: '1px solid #EBE4DA' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#1B3627' }}>
                          Ref: {bk.bookingId}
                        </span>
                        <span style={{ fontSize: '0.7rem', backgroundColor: '#EAF3EC', color: '#1B3627', padding: '2px 8px', borderRadius: 100, fontWeight: 600 }}>
                          Submitted
                        </span>
                      </div>
                      <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#1A1A1A' }}>
                        {bk.eventType} • {bk.eventDate} ({bk.preferredTime || 'Anytime'})
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#666', marginTop: 4 }}>
                        Location: {bk.location} | Guests: {bk.guestCount}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Enrollments Tab */}
          {activeTab === 'enrollments' && (
            <div>
              {enrollments.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px 20px', color: '#777' }}>
                  <GraduationCap size={36} color="#A67B40" style={{ margin: '0 auto 12px auto' }} />
                  <p style={{ fontSize: '0.9rem', fontWeight: 600 }}>No class registrations yet.</p>
                  <p style={{ fontSize: '0.78rem', marginTop: 4 }}>Explore our Online Masterclass or Mumbai & Udaipur studio bootcamp.</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {enrollments.map((enr, idx) => (
                    <div key={idx} style={{ backgroundColor: '#FAF6F0', borderRadius: 8, padding: 14, border: '1px solid #EBE4DA' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#1B3627' }}>
                          Ref: {enr.enrollmentId}
                        </span>
                        <span style={{ fontSize: '0.7rem', backgroundColor: '#EAF3EC', color: '#1B3627', padding: '2px 8px', borderRadius: 100, fontWeight: 600 }}>
                          Enrolled
                        </span>
                      </div>
                      <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1A1A1A' }}>
                        {enr.courseTitle} ({enr.courseFee})
                      </div>
                      <div style={{ fontSize: '0.76rem', color: '#666', marginTop: 4 }}>
                        Mode: {enr.mode} | Batch: {enr.preferredDate || 'Upcoming'}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
