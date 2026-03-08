import { Link } from 'react-router-dom';
import { getEvents } from '../data/dataService';
import BackButton from '../components/BackButton';
import './Events.css';

export default function Events() {
  const allEvents = getEvents();
  
  const techEvents = allEvents.filter(ev => ev.category === 'Tech' && ev.isVisible !== false);
  const nonTechEvents = allEvents.filter(ev => ev.category === 'Non-Tech' && ev.isVisible !== false);
  const workshops = allEvents.filter(ev => ev.category === 'Workshop' && ev.isVisible !== false);

  return (
    <div className="events-page">
      <div className="page-hero">
        <div className="page-hero-bg"></div>
        <div className="container">
          <h1 className="page-hero-title">Events</h1>
          <p className="page-hero-subtitle">Compete, collaborate, and conquer</p>
        </div>
      </div>

      <section className="section bg-light-pattern" style={{ paddingBottom: '2rem' }}>
        <div className="container">
          <h2 className="section-title reveal" style={{ textAlign: 'left', marginBottom: '2rem' }}>Technical Events</h2>
          <div className="events-grid">
            {techEvents.length === 0 && <p className="text-secondary">No technical events announced yet.</p>}
            {techEvents.map((ev, i) => (
              <Link to={`/events/${ev.id}`} key={ev.id} className="event-card reveal" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="event-card-poster">
                  {ev.poster ? (
                    <img src={ev.poster} alt={ev.name} loading="lazy" />
                  ) : (
                    <div className="event-card-placeholder">
                      <span>⚙️</span>
                    </div>
                  )}
                  <div className="event-card-overlay">
                    <span className="event-card-view">View Details →</span>
                  </div>
                </div>
                <div className="event-card-body">
                  <h3 className="event-card-title">{ev.name}</h3>
                  <p className="event-card-desc">{ev.description?.substring(0, 100)}...</p>
                  <div className="event-card-action">
                    {ev.registrationEnabled !== false ? (
                      <span className="btn btn-primary btn-sm register-btn">Register Now</span>
                    ) : (
                      <span className="btn btn-secondary btn-sm register-btn" style={{opacity: 0.6}}>Closed</span>
                    )}
                  </div>
                  <div className="event-card-footer">
                    <span className="event-card-coordinator">👤 {ev.coordinator}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
        <div className="container">
          <h2 className="section-title reveal" style={{ textAlign: 'left', marginBottom: '2rem' }}>Non-Technical Events</h2>
          <div className="events-grid">
            {nonTechEvents.length === 0 && <p className="text-secondary">No non-technical events announced yet.</p>}
            {nonTechEvents.map((ev, i) => (
              <Link to={`/events/${ev.id}`} key={ev.id} className="event-card reveal" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="event-card-poster">
                  {ev.poster ? (
                    <img src={ev.poster} alt={ev.name} loading="lazy" />
                  ) : (
                    <div className="event-card-placeholder" style={{ background: 'linear-gradient(135deg, #d8b4fe, #a855f7)' }}>
                      <span>🎭</span>
                    </div>
                  )}
                  <div className="event-card-overlay">
                    <span className="event-card-view">View Details →</span>
                  </div>
                </div>
                <div className="event-card-body">
                  <h3 className="event-card-title">{ev.name}</h3>
                  <p className="event-card-desc">{ev.description?.substring(0, 100)}...</p>
                  <div className="event-card-action">
                    {ev.registrationEnabled !== false ? (
                      <span className="btn btn-primary btn-sm register-btn">Register Now</span>
                    ) : (
                      <span className="btn btn-secondary btn-sm register-btn" style={{opacity: 0.6}}>Closed</span>
                    )}
                  </div>
                  <div className="event-card-footer">
                    <span className="event-card-coordinator">👤 {ev.coordinator}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-light-pattern" style={{ paddingTop: '2rem' }}>
        <div className="container">
          <h2 className="section-title reveal" style={{ textAlign: 'left', marginBottom: '2rem' }}>Workshops</h2>
          <div className="events-grid">
            {workshops.length === 0 && <p className="text-secondary">No workshops announced yet.</p>}
            {workshops.map((ev, i) => (
              <Link to={`/events/${ev.id}`} key={ev.id} className="event-card reveal" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="event-card-poster">
                  {ev.poster ? (
                    <img src={ev.poster} alt={ev.name} loading="lazy" />
                  ) : (
                    <div className="event-card-placeholder" style={{ background: 'linear-gradient(135deg, #fdb170, #f97316)' }}>
                      <span>🛠️</span>
                    </div>
                  )}
                  <div className="event-card-overlay">
                    <span className="event-card-view">View Details →</span>
                  </div>
                </div>
                <div className="event-card-body">
                  <h3 className="event-card-title">{ev.name}</h3>
                  <p className="event-card-desc">{ev.description?.substring(0, 100)}...</p>
                  <div className="event-card-action">
                    {ev.registrationEnabled !== false ? (
                      <span className="btn btn-primary btn-sm register-btn">Register Now</span>
                    ) : (
                      <span className="btn btn-secondary btn-sm register-btn" style={{opacity: 0.6}}>Closed</span>
                    )}
                  </div>
                  <div className="event-card-footer">
                    <span className="event-card-coordinator">👤 {ev.coordinator}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
