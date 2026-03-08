import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import './Navbar.css';

const NAV_LINKS = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/events', label: 'Events' },
  { path: '/gallery', label: 'Gallery' },
  { path: '/team', label: 'Team' },
  { path: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location]);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-inner">
        <Link to="/" className="navbar-brand">
          <div className="navbar-logo-group">
            <div className="navbar-logo assoc-logo">
              <img src="/mech-logo.jpeg" alt="Mechanical Association" />
            </div>
            <div className="navbar-title-group">
              <span className="navbar-title golden-text">EFFICACY'26</span>
              <span className="navbar-subtitle">GCE Erode • Mech Dept</span>
            </div>
          </div>
        </Link>

        <div className={`navbar-links ${menuOpen ? 'open' : ''}`}>
          {NAV_LINKS.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`navbar-link ${location.pathname === link.path ? 'active' : ''}`}
            >
              {link.label}
              <span className="link-underline"></span>
            </Link>
          ))}
          <div className="navbar-actions-mobile">
            <Link to="/admin/login" className="navbar-link">Admin</Link>
            <ThemeToggle />
          </div>
        </div>

        <div className="navbar-actions">
          <Link to="/admin/login" className="navbar-admin-btn">Admin</Link>
          <ThemeToggle />
          <button
            className={`hamburger ${menuOpen ? 'active' : ''}`}
            onClick={() => setMenuOpen(m => !m)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </nav>
  );
}
