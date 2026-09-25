import React, { useState } from 'react';
import { X, User, Lock, Mail, Phone, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function AuthModal() {
  const { isAuthModalOpen, setIsAuthModalOpen, user, login, logout, showToast } = useApp();
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isRegister) {
      if (!formData.name || !formData.email || !formData.phone) {
        showToast('Please fill in all registration fields', 'warning');
        return;
      }
      login({
        name: formData.name,
        email: formData.email,
        phone: formData.phone
      });
    } else {
      if (!formData.email) {
        showToast('Please enter your email', 'warning');
        return;
      }
      login({
        name: formData.name || formData.email.split('@')[0],
        email: formData.email,
        phone: formData.phone || '+91 98765 43210'
      });
    }
  };

  return (
    <div className="modal-overlay" onClick={() => setIsAuthModalOpen(false)}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: 440 }}>
        <div className="modal-header">
          <h3 className="modal-title">
            {user ? 'My Atelier Account' : isRegister ? 'Create an Account' : 'Sign In'}
          </h3>
          <button className="modal-close-btn" onClick={() => setIsAuthModalOpen(false)}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          {user ? (
            <div style={{ textAlign: 'center', padding: '16px 0' }}>
              <div style={{ width: 56, height: 56, borderRadius: '50%', backgroundColor: '#FAF6F0', color: '#1B3627', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px auto' }}>
                <User size={28} />
              </div>
              <h4 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.25rem', marginBottom: 4 }}>
                {user.name}
              </h4>
              <p style={{ fontSize: '0.82rem', color: '#666', marginBottom: 4 }}>{user.email}</p>
              {user.phone && <p style={{ fontSize: '0.78rem', color: '#888', marginBottom: 20 }}>{user.phone}</p>}

              <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
                <button
                  className="btn-secondary"
                  onClick={() => setIsAuthModalOpen(false)}
                >
                  Continue Shopping
                </button>
                <button
                  className="btn-primary"
                  style={{ backgroundColor: '#A34836', borderColor: '#A34836' }}
                  onClick={logout}
                >
                  Sign Out
                </button>
              </div>
            </div>
          ) : (
            <div>
              <p style={{ fontSize: '0.82rem', color: '#666', marginBottom: 18, lineHeight: 1.4 }}>
                {isRegister
                  ? 'Join Rivaaz Atelier to track chilled cone dispatches, save bridal lookbooks, and access course materials.'
                  : 'Sign in to complete your checkout and manage your fresh cone delivery.'}
              </p>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {isRegister && (
                  <div className="form-group">
                    <label className="form-label">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Radhika Kapoor"
                      className="form-input"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                )}

                <div className="form-group">
                  <label className="form-label">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. radhika@example.com"
                    className="form-input"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Phone Number (+91) *</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 98765 43210"
                    className="form-input"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Password *</label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    className="form-input"
                    value={formData.password}
                    onChange={e => setFormData({ ...formData, password: e.target.value })}
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary"
                  style={{ width: '100%', marginTop: 8, padding: '12px' }}
                >
                  {isRegister ? 'CREATE ACCOUNT & CONTINUE' : 'SIGN IN & CONTINUE'}
                </button>
              </form>

              <div style={{ textAlign: 'center', marginTop: 18, fontSize: '0.8rem', color: '#777' }}>
                {isRegister ? (
                  <span>
                    Already have an account?{' '}
                    <button
                      type="button"
                      style={{ background: 'none', border: 'none', color: '#1B3627', fontWeight: 700, cursor: 'pointer', textDecoration: 'underline' }}
                      onClick={() => setIsRegister(false)}
                    >
                      Sign In
                    </button>
                  </span>
                ) : (
                  <span>
                    New to Rivaaz?{' '}
                    <button
                      type="button"
                      style={{ background: 'none', border: 'none', color: '#1B3627', fontWeight: 700, cursor: 'pointer', textDecoration: 'underline' }}
                      onClick={() => setIsRegister(true)}
                    >
                      Create an account
                    </button>
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
