import { useParams, Link } from 'react-router-dom';
import { getEvent } from '../data/dataService';
import BackButton from '../components/BackButton';
import './Events.css';

export default function EventDetail() {
  const { id } = useParams();
  const event = getEvent(id);

  if (!event || event.isVisible === false) {
    return (
      <div className="event-detail-page">
        <div className="section container" style={{ textAlign: 'center', paddingTop: '4rem' }}>
          <h2>Event not found or unavailable</h2>
          <BackButton />
        </div>
      </div>
    );
  }

  const rules = event.rules?.split('\\n').filter(Boolean) || [];

  return (
    <div className="event-detail-page">
      <div className="section">
        <div className="container">
          <div className="event-detail">
            <div className="event-detail-poster">
              {event.poster ? (
                <img src={event.poster} alt={event.name} />
              ) : (
                <div className="event-detail-poster-placeholder">🎯</div>
              )}
            </div>
            <div className="event-detail-info">
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                <span className="status-badge active">{event.category}</span>
                {event.eventType === 'Team' ? (
                  <span className="status-badge pending" style={{ background: 'var(--accent-orange)' }}>Team Event (Up to 4)</span>
                ) : (
                  <span className="status-badge" style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>Solo Event</span>
                )}
              </div>
              
              <h1 className="event-detail-title">{event.name}</h1>

              <div style={{ marginTop: '2rem', marginBottom: '2rem' }}>
                {event.registrationEnabled !== false ? (
                  <Link to={`/register/${event.id}`} className="btn btn-primary btn-lg" style={{ width: '100%', textAlign: 'center' }}>Register Now</Link>
                ) : (
                  <button className="btn btn-secondary btn-lg" disabled style={{ width: '100%', opacity: 0.6 }}>Registration Closed</button>
                )}
              </div>

              <div className="event-detail-section">
                <h3>📋 Description</h3>
                <p>{event.description}</p>
              </div>

              {rules.length > 0 && (
                <div className="event-detail-section">
                  <h3>📜 Rules</h3>
                  <ul className="event-rules-list">
                    {rules.map((rule, i) => <li key={i}>{rule.replace(/^\d+\.\s*/, '')}</li>)}
                  </ul>
                </div>
              )}

              <div className="event-detail-section">
                <h3>📞 Contact</h3>
                <div className="event-contact-grid">
                  <div className="event-contact-item">
                    <span>👤</span>
                    <div>
                      <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Coordinator</div>
                      <div>{event.coordinator}</div>
                    </div>
                  </div>
                  <div className="event-contact-item">
                    <span>📱</span>
                    <div>
                      <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Phone</div>
                      <div>{event.phone}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
