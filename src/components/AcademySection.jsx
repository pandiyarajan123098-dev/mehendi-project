import React from 'react';
import { CheckCircle2, ExternalLink, MapPin } from 'lucide-react';
import { courses } from '../data/classes';
import { useApp } from '../context/AppContext';

export default function AcademySection() {
  const { openClassModal } = useApp();

  return (
    <section id="classes" className="academy-section">
      <div className="container">
        <span className="section-subtitle">ACADEMY &amp; CERTIFICATION</span>
        <h2 className="section-title">Learn Mehendi. Create. Earn.</h2>
        <p className="section-desc">
          Transform your passion for intricate henna art into an accredited, rewarding bridal career.
        </p>

        <div className="academy-grid">
          {courses.map((course) => {
            const isOffline = course.mode === 'Offline';

            return (
              <div key={course.id} className="academy-card">
                {course.topBadge && (
                  <span className="academy-top-badge">{course.topBadge}</span>
                )}

                <div className="academy-card-header">
                  <span className={`academy-mode-badge ${course.badgeType}`}>
                    {course.badge}
                  </span>
                  <span className="academy-price">{course.priceFormatted}</span>
                </div>

                <h3 className="academy-title">{course.title}</h3>
                <p className="academy-desc">{course.description}</p>

                <ul className="academy-bullets">
                  {course.bullets.map((bullet, idx) => (
                    <li key={idx}>
                      <CheckCircle2 size={16} />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                {isOffline ? (
                  <button
                    className="academy-btn-offline"
                    onClick={() => openClassModal(course)}
                  >
                    <span>{course.btnText}</span>
                    <MapPin size={15} />
                  </button>
                ) : (
                  <button
                    className="academy-btn-online"
                    onClick={() => openClassModal(course)}
                  >
                    <span>{course.btnText}</span>
                    <ExternalLink size={15} />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
