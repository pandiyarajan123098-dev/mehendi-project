import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, GraduationCap, MapPin, Laptop, Calendar } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { submitClassEnrollment } from '../services/api';

export default function ClassModal() {
  const { isClassModalOpen, setIsClassModalOpen, selectedClass, showToast, triggerConfetti, user } = useApp();

  const [formData, setFormData] = useState({
    studentName: user?.name || '',
    phone: user?.phone || '',
    email: user?.email || '',
    mode: 'Online',
    preferredDate: '',
    experienceLevel: 'Beginner',
    requirements: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [enrollmentSuccess, setEnrollmentSuccess] = useState(null);

  useEffect(() => {
    if (selectedClass) {
      setFormData(prev => ({
        ...prev,
        mode: selectedClass.mode || 'Online',
        studentName: user?.name || prev.studentName,
        phone: user?.phone || prev.phone,
        email: user?.email || prev.email
      }));
    }
  }, [selectedClass, user]);

  if (!isClassModalOpen || !selectedClass) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.studentName || !formData.phone || !formData.email) {
      showToast('Please fill in your name, phone and email', 'warning');
      return;
    }

    setIsSubmitting(true);

    const payload = {
      courseId: selectedClass.id,
      courseTitle: selectedClass.title,
      courseFee: selectedClass.priceFormatted,
      studentName: formData.studentName,
      phone: formData.phone,
      email: formData.email,
      mode: formData.mode,
      preferredDate: formData.preferredDate || 'Earliest available batch',
      experienceLevel: formData.experienceLevel,
      requirements: formData.requirements
    };

    try {
      const res = await submitClassEnrollment(payload);
      setEnrollmentSuccess(res);
      triggerConfetti();
      showToast(`Enrollment Registered! ID: ${res.enrollmentId}`);
    } catch (err) {
      console.error(err);
      showToast('Registration received! We will contact you with batch onboarding details.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsClassModalOpen(false);
    setEnrollmentSuccess(null);
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: 520 }}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <GraduationCap size={20} color="#1B3627" />
            <h3 className="modal-title">
              {enrollmentSuccess ? 'Enrollment Confirmed' : `Enroll in ${selectedClass.title}`}
            </h3>
          </div>
          <button className="modal-close-btn" onClick={handleClose}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          {enrollmentSuccess ? (
            <div style={{ textAlign: 'center', padding: '16px 0' }}>
              <div style={{ width: 60, height: 60, borderRadius: '50%', backgroundColor: '#EAF3EC', color: '#1B3627', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
                <CheckCircle2 size={34} />
              </div>
              <h4 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.5rem', marginBottom: 6 }}>
                Welcome to Rivaaz Academy!
              </h4>
              <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: 16 }}>
                Registration ID: <strong style={{ color: '#1B3627' }}>{enrollmentSuccess.enrollmentId}</strong>
              </p>
              <div style={{ backgroundColor: '#FAF6F0', padding: '14px 18px', borderRadius: 8, textAlign: 'left', marginBottom: 20, border: '1px solid #EBE4DA', fontSize: '0.82rem' }}>
                <p><strong>Course:</strong> {selectedClass.title} ({selectedClass.priceFormatted})</p>
                <p style={{ marginTop: 4 }}><strong>Student:</strong> {formData.studentName} ({formData.phone})</p>
                <p style={{ marginTop: 4 }}><strong>Mode:</strong>{' '}
                  {formData.mode === 'Online'
                    ? <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Laptop size={13} /> Live Digital Masterclass + Practice Kit</span>
                    : <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><MapPin size={13} /> Mumbai &amp; Udaipur In-Person Studio</span>}
                </p>
              </div>
              <p style={{ fontSize: '0.8rem', color: '#555', marginBottom: 20, lineHeight: 1.45 }}>
                Our academy coordinator will WhatsApp you your onboarding kit shipping details and schedule access within 2 hours.
              </p>
              <button className="btn-primary" style={{ width: '100%' }} onClick={handleClose}>
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ backgroundColor: '#FAF6F0', padding: '12px 16px', borderRadius: 6, border: '1px solid #EBE4DA', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '0.74rem', color: '#A67B40', fontWeight: 700, textTransform: 'uppercase' }}>
                    {selectedClass.badge}
                  </div>
                  <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.15rem', fontWeight: 600 }}>
                    {selectedClass.title}
                  </div>
                </div>
                <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.35rem', fontWeight: 700, color: '#1B3627' }}>
                  {selectedClass.priceFormatted}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Student Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ananya Mehta"
                  className="form-input"
                  value={formData.studentName}
                  onChange={e => setFormData({ ...formData, studentName: e.target.value })}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <div className="form-group">
                  <label className="form-label">Phone Number (+91) *</label>
                  <input
                    type="tel"
                    required
                    placeholder="98765 43210"
                    className="form-input"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="ananya@example.com"
                    className="form-input"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <div className="form-group">
                  <label className="form-label">Learning Mode *</label>
                  <select
                    className="form-select"
                    value={formData.mode}
                    onChange={e => setFormData({ ...formData, mode: e.target.value })}
                  >
                    <option value="Online">Online Masterclass</option>
                    <option value="Offline">Offline Studio Atelier</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Preferred Date / Batch</label>
                  <input
                    type="date"
                    className="form-input"
                    value={formData.preferredDate}
                    onChange={e => setFormData({ ...formData, preferredDate: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Experience &amp; Learning Requirements</label>
                <textarea
                  rows="2"
                  placeholder="Beginner looking to learn figures, bridal mandalas, cone rolling..."
                  className="form-textarea"
                  value={formData.requirements}
                  onChange={e => setFormData({ ...formData, requirements: e.target.value })}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary"
                style={{ width: '100%', marginTop: 8, padding: '12px' }}
              >
                {isSubmitting ? 'PROCESSING REGISTRATION...' : `CONFIRM ENROLLMENT (${selectedClass.priceFormatted})`}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
