import { useParams, Link } from 'react-router-dom';
import { getEvent } from '../data/dataService';
import './Events.css';

export default function EventDetail() {
  const { id } = useParams();
  const event = getEvent(id);

  if (!event) {
    return (
      <div className="event-detail-page">
        <div className="section container" style={{ textAlign: 'center', paddingTop: '4rem' }}>
          <h2>Event not found</h2>
          <Link to="/events" className="btn btn-primary" style={{ marginTop: '1rem' }}>← Back to Events</Link>
        </div>
      </div>
    );
  }

  const rules = event.rules?.split('\\n').filter(Boolean) || [];

  return (
    <div className="event-detail-page">
      <div className="section">
        <div className="container">
          <Link to="/events" className="event-back-btn">← Back to Events</Link>
          <div className="event-detail">
            <div className="event-detail-poster">
              {event.poster ? (
                <img src={event.poster} alt={event.name} />
              ) : (
                <div className="event-detail-poster-placeholder">🎯</div>
              )}
            </div>
            <div className="event-detail-info">
              <h1 className="event-detail-title">{event.name}</h1>

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
