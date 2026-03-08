import { getTeam } from '../data/dataService';
import BackButton from '../components/BackButton';
import './Team.css';

const SECTIONS = ['Faculty Coordinators', 'Student Coordinators', 'IT Wing', 'Volunteers'];

export default function Team() {
  const team = getTeam();

  return (
    <div className="team-page">
      <div className="page-hero">
        <div className="page-hero-bg"></div>
        <div className="container">
          <BackButton />
          <h1 className="page-hero-title">Our Team</h1>
          <p className="page-hero-subtitle">The people behind <span className="golden-text" style={{fontWeight: 600}}>EFFICACY'26</span></p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {SECTIONS.map(section => {
            const members = team.filter(m => m.section === section);
            if (members.length === 0) return null;
            return (
              <div key={section} className="team-section">
                <h2 className="team-section-title">{section}</h2>
                <div className="team-grid">
                  {members.map((m, i) => (
                    <div key={m.id} className="team-card" style={{ animationDelay: `${i * 0.1}s` }}>
                      <div className="team-card-avatar">
                        {m.photo ? <img src={m.photo} alt={m.name} /> : <span className="team-card-avatar-placeholder">👤</span>}
                      </div>
                      <div className="team-card-info">
                        <h3 className="team-card-name">{m.name}</h3>
                        <p className="team-card-role">{m.role}</p>
                        <p className="team-card-dept">{m.department}</p>
                        {m.linkedin && m.linkedin !== '#' && (
                          <a href={m.linkedin} target="_blank" rel="noopener noreferrer" className="team-card-linkedin">
                            🔗 LinkedIn
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
