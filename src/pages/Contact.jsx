import { useState } from 'react';
import './Contact.css';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <div className="contact-page">
      <div className="page-hero">
        <div className="page-hero-bg"></div>
        <div className="container">
          <h1 className="page-hero-title">Contact Us</h1>
          <p className="page-hero-subtitle">Get in touch with us</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info">
              <h2 className="contact-info-title">Get In Touch</h2>
              <p className="contact-info-text">Have questions about <span className="golden-text" style={{fontWeight: 600}}>EFFICACY'26</span>? We'd love to hear from you.</p>

              <div className="contact-persons-card">
                <div className="person-row">
                  <span className="person-name">Mr. Dony Charles</span>
                  <a href="tel:+917810085410" className="person-phone"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg> +91 78100 85410</a>
                </div>
                <div className="person-row">
                  <span className="person-name">Mr. Venkataprasath</span>
                  <a href="tel:+917010591904" className="person-phone"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg> +91 70105 91904</a>
                </div>
                <div className="person-row">
                  <span className="person-name">Mr. Vedheswar</span>
                  <a href="tel:+919361132882" className="person-phone"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg> +91 93611 32882</a>
                </div>
                <div className="person-row">
                  <span className="person-name">Mr. Solaivendhan</span>
                  <a href="tel:+917094877363" className="person-phone"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg> +91 70948 77363</a>
                </div>
                
                <div className="contact-socials">
                  <a href="https://www.instagram.com/efficacy2k26?igsh=ZnI0ZWYxdHNrbW5m" target="_blank" rel="noopener noreferrer" className="social-circle">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                  </a>
                  <a href="mailto:efficacy2026.gcee@gmail.com" className="social-circle">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                  </a>
                </div>
              </div>

              <div className="contact-map">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3910.8743771321433!2d77.6647528!3d11.416663!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba969006cd11583%3A0x5732b7de04a8dd2b!2sDepartment%20of%20Mechanical%20Engineering%2CGCEE-E!5e0!3m2!1sen!2sin!4v1772866600148!5m2!1sen!2sin"
                  width="100%"
                  height="250"
                  style={{ border: 0, borderRadius: 'var(--radius-lg)' }}
                  allowFullScreen=""
                  loading="lazy"
                  title="GCE Erode Location"
                ></iframe>
              </div>
            </div>

            <div className="contact-form-wrapper">
              <h2 className="contact-form-title">Send a Message</h2>
              {sent && <div className="contact-success">✅ Message sent successfully! We'll get back to you soon.</div>}
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="contact-name">Name</label>
                  <input id="contact-name" type="text" placeholder="Your name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
                </div>
                <div className="form-group">
                  <label htmlFor="contact-email">Email</label>
                  <input id="contact-email" type="email" placeholder="Your email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
                </div>
                <div className="form-group">
                  <label htmlFor="contact-subject">Subject</label>
                  <input id="contact-subject" type="text" placeholder="Subject" value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} required />
                </div>
                <div className="form-group">
                  <label htmlFor="contact-message">Message</label>
                  <textarea id="contact-message" rows="5" placeholder="Your message..." value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} required></textarea>
                </div>
                <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}>Send Message →</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
