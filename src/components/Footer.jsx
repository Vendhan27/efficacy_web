import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-bg-pattern"></div>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col footer-about">
            <h3 className="footer-title">
              <img src="/college-logo.jpeg" alt="GCE Erode" className="footer-logo-icon" style={{ width: '28px', height: '28px', objectFit: 'contain' }} />
              EFFICACY
            </h3>
            <p className="footer-text">
              Department of Mechanical Engineering<br />
              Government College of Engineering, Erode<br />
              Erode - 638316, Tamil Nadu
            </p>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/events">Events</Link></li>
              <li><Link to="/gallery">Gallery</Link></li>
              <li><Link to="/team">Team</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/admin/login">Admin Login</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Events</h4>
            <ul className="footer-links">
              <li><Link to="/events">Paper Presentation</Link></li>
              <li><Link to="/events">CAD Designing</Link></li>
              <li><Link to="/events">Tech Quiz</Link></li>
              <li><Link to="/events">Project Expo</Link></li>
              <li><Link to="/events">Workshop</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Contact Us</h4>
            <ul className="footer-links footer-contact-list">
              <li>📧 efficacy2026.gcee@gmail.com</li>
              <li>📞 +91 98765 43210</li>
              <li>📍 GCE Erode, Tamil Nadu</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 EFFICACY – Department of Mechanical Engineering, GCE Erode. All Rights Reserved.</p>
          <p className="footer-made">Made with ❤️ by IT Wing</p>
        </div>
      </div>
    </footer>
  );
}
