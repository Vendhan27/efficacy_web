import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { getEvents, getAlbums, getTeam, getContent } from '../data/dataService';
import './Home.css';

function useReveal() {
  const ref = useRef();
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    if (ref.current) {
      ref.current.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => observer.observe(el));
    }
    return () => observer.disconnect();
  }, []);
  return ref;
}

export default function Home() {
  const content = getContent();
  const events = getEvents().slice(0, 4);
  const albums = getAlbums();
  const team = getTeam().filter(m => m.section === 'Student Coordinators').slice(0, 4);
  const pageRef = useReveal();

  const [particleStyles] = useState(() => {
    return [...Array(20)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 5}s`,
      animationDuration: `${3 + Math.random() * 4}s`
    }));
  });

  return (
    <div className="home-page" ref={pageRef}>
      {/* Hero */}
      <section className="hero">
        <div className="hero-bg">
          <div className="hero-particles">
            {particleStyles.map((style, i) => (
              <div key={i} className="particle" style={style} />
            ))}
          </div>
          <div className="hero-grid-lines"></div>
          <div className="hero-glow hero-glow-1"></div>
          <div className="hero-glow hero-glow-2"></div>
        </div>
        <div className="hero-content container">
          <div className="hero-top-row">
            <div className="hero-college-logo"><img src="/college-logo.jpeg" alt="GCE Erode" /></div>
            <h2 className="hero-college-name">Government College of Engineering, Erode</h2>
            <div className="hero-assoc-logo"><img src="/mech-logo.jpeg" alt="Mechanical Association" /></div>
          </div>
          <h3 className="hero-dept-name">Department of Mechanical Engineering</h3>
          <p className="hero-presents">Proudly Presents</p>
          <h1 className="hero-title golden-text" style={{ fontSize: 'clamp(3.5rem, 8vw, 6rem)', lineHeight: 1.1, paddingBottom: '0.5rem' }}>EFFICACY'26</h1>
          <p className="hero-subtitle">National Level Technical Symposium</p>
          <div className="hero-actions">
            <Link to="/events" className="btn btn-primary btn-lg hero-btn">Explore Events</Link>
            <Link to="/about" className="btn btn-secondary btn-lg hero-btn hero-btn-outline">Learn More</Link>
          </div>

        </div>
        <div className="hero-scroll-indicator">
          <span>Scroll Down</span>
          <div className="scroll-arrow">↓</div>
        </div>
      </section>

      {/* About Preview */}
      <section className="section about-preview">
        <div className="container">
          <h2 className="section-title reveal">About <span className="golden-text">EFFICACY'26</span></h2>
          <p className="section-subtitle reveal">{content.aboutText}</p>
          <Link to="/about" className="btn btn-primary reveal">Read More →</Link>
        </div>
      </section>



      {/* Featured Events */}
      <section className="section events-preview">
        <div className="container">
          <h2 className="section-title reveal">Featured Events</h2>
          <p className="section-subtitle reveal">Compete, learn, and showcase your skills</p>
          <div className="events-preview-grid">
            {events.map((ev, i) => (
              <Link to={`/events/${ev.id}`} key={ev.id} className="event-preview-card glass reveal" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="event-preview-icon">🎯</div>
                <h3>{ev.name}</h3>
                <p>{ev.description?.substring(0, 100)}...</p>
                <span className="event-preview-coordinator">👤 {ev.coordinator}</span>
              </Link>
            ))}
          </div>
          <Link to="/events" className="btn btn-primary reveal" style={{ marginTop: '2rem' }}>View All Events →</Link>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="section gallery-preview-section">
        <div className="container">
          <h2 className="section-title reveal">Gallery</h2>
          <p className="section-subtitle reveal">Moments from <span className="golden-text" style={{fontWeight: 600}}>EFFICACY'26</span></p>
          <div className="gallery-preview-grid">
            {albums.slice(0, 3).flatMap(a => a.images.slice(0, 2)).slice(0, 6).map((img, i) => (
              <div key={img.id} className="gallery-preview-item reveal" style={{ animationDelay: `${i * 0.08}s` }}>
                <img src={img.url} alt={img.caption} loading="lazy" />
                <div className="gallery-preview-overlay">
                  <span>{img.caption}</span>
                </div>
              </div>
            ))}
          </div>
          <Link to="/gallery" className="btn btn-primary reveal" style={{ marginTop: '2rem' }}>View Full Gallery →</Link>
        </div>
      </section>

      {/* Team Preview */}
      <section className="section team-preview-section">
        <div className="container">
          <h2 className="section-title reveal">Organizing Team</h2>
          <p className="section-subtitle reveal">The minds behind <span className="golden-text" style={{fontWeight: 600}}>EFFICACY'26</span></p>
          <div className="team-preview-grid">
            {team.map((m, i) => (
              <div key={m.id} className="team-preview-card glass reveal" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="team-preview-avatar">
                  {m.photo ? <img src={m.photo} alt={m.name} /> : <span>👤</span>}
                </div>
                <h4>{m.name}</h4>
                <p>{m.role}</p>
              </div>
            ))}
          </div>
          <Link to="/team" className="btn btn-primary reveal" style={{ marginTop: '2rem' }}>Meet the Team →</Link>
        </div>
      </section>
    </div>
  );
}
