import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getEvent, addParticipant, getContent } from '../data/dataService';
import emailjs from '@emailjs/browser';
import './Register.css';

export default function Register() {
  const { id } = useParams();
  const navigate = useNavigate();
  const event = getEvent(id);
  const content = getContent();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Form State
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    college: '',
    department: '',
    year: '',
    teamName: '',
    teamMembers: [],
    transactionId: ''
  });

  // Verify event is valid and open
  useEffect(() => {
    if (!event) navigate('/events');
    if (event && event.registrationEnabled === false) navigate(`/events/${id}`);
  }, [event, id, navigate]);

  if (!event) return null;

  const handleMemberChange = (index, value) => {
    const newMembers = [...form.teamMembers];
    newMembers[index] = value;
    setForm({ ...form, teamMembers: newMembers });
  };

  const addMemberField = () => {
    if (form.teamMembers.length < 3) { // Max 4 members per team (1 leader + 3 members)
      setForm({ ...form, teamMembers: [...form.teamMembers, ''] });
    }
  };

  const removeMemberField = (index) => {
    const newMembers = form.teamMembers.filter((_, i) => i !== index);
    setForm({ ...form, teamMembers: newMembers });
  };

  const nextStep = (e) => {
    e.preventDefault();
    if (step === 1) setStep(2);
  };

  const submitRegistration = async (e) => {
    e.preventDefault();
    setLoading(true);

    const participantData = {
      ...form,
      eventName: event.name,
      paymentStatus: 'Pending', // Pending manual verification of Transaction ID
    };

    // 1. Save to localStorage
    addParticipant(participantData);

    // 2. Send Email via EmailJS
    // NOTE: Replace these with actual EmailJS keys
    try {
      await emailjs.send(
        'YOUR_SERVICE_ID', 
        'YOUR_TEMPLATE_ID', 
        {
          to_name: form.name,
          to_email: form.email,
          event_name: event.name,
          transaction_id: form.transactionId,
          team_name: form.teamName || 'Solo'
        },
        'YOUR_PUBLIC_KEY'
      );
    } catch (err) {
      console.error('Email failed to send. Registration saved anyway.', err);
      // Suppressing error as localStorage save succeeded
    }

    setLoading(false);
    setStep(3); // Show Success
  };

  return (
    <div className="register-page">
      <div className="page-hero" style={{ padding: '6rem 0 3rem' }}>
        <div className="page-hero-bg"></div>
        <div className="container">
          <h1 className="page-hero-title">Register</h1>
          <p className="page-hero-subtitle">For {event.name}</p>
        </div>
      </div>

      <section className="section">
        <div className="container" style={{ maxWidth: '800px' }}>
          
          {/* STEP 1: Details */}
          {step === 1 && (
            <div className="register-card">
              <div className="register-header">
                <h2>Step 1: Participant Details</h2>
                {event.eventType === 'Team' ? <span className="status-badge active">Team Event</span> : <span className="status-badge pending">Solo Event</span>}
              </div>
              
              <form onSubmit={nextStep} className="admin-form">
                <div className="form-grid">
                  <div className="form-group">
                    <label>Full Name {event.eventType === 'Team' && '(Team Leader)'}</label>
                    <input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
                  </div>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
                  </div>
                  <div className="form-group">
                    <label>Phone Number (WhatsApp)</label>
                    <input type="tel" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} required />
                  </div>
                  <div className="form-group">
                    <label>College Name</label>
                    <input type="text" value={form.college} onChange={e => setForm({...form, college: e.target.value})} required />
                  </div>
                  <div className="form-group">
                    <label>Department</label>
                    <input type="text" value={form.department} onChange={e => setForm({...form, department: e.target.value})} required />
                  </div>
                  <div className="form-group">
                    <label>Year of Study</label>
                    <select value={form.year} onChange={e => setForm({...form, year: e.target.value})} required>
                      <option value="">Select Year</option>
                      <option value="1st Year">1st Year</option>
                      <option value="2nd Year">2nd Year</option>
                      <option value="3rd Year">3rd Year</option>
                      <option value="4th Year">4th Year</option>
                    </select>
                  </div>
                </div>

                {event.eventType === 'Team' && (
                  <div className="team-section">
                    <hr />
                    <h3>Team Details</h3>
                    <div className="form-group full-width">
                      <label>Team Name</label>
                      <input type="text" value={form.teamName} onChange={e => setForm({...form, teamName: e.target.value})} required />
                    </div>
                    
                    <div className="team-members">
                      <label>Additional Team Members (Required: {form.teamMembers.length}, Max: 3)</label>
                      {form.teamMembers.map((member, i) => (
                        <div key={i} className="member-input-row" style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                          <input 
                            type="text" 
                            placeholder={`Member ${i + 2} Name`} 
                            value={member} 
                            onChange={e => handleMemberChange(i, e.target.value)} 
                            required 
                            style={{ flex: 1 }}
                          />
                          <button type="button" className="btn btn-danger btn-sm" onClick={() => removeMemberField(i)}>✕</button>
                        </div>
                      ))}
                      {form.teamMembers.length < 3 && (
                        <button type="button" className="btn btn-secondary btn-sm" onClick={addMemberField}>+ Add Member</button>
                      )}
                    </div>
                  </div>
                )}

                <div className="form-actions" style={{ marginTop: '2rem', textAlign: 'right' }}>
                  <button type="submit" className="btn btn-primary btn-lg">Continue to Payment →</button>
                </div>
              </form>
            </div>
          )}

          {/* STEP 2: Payment */}
          {step === 2 && (
            <div className="register-card">
              <div className="register-header">
                <h2>Step 2: Payment Verification</h2>
              </div>
              
              <div className="payment-instructions" style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <p>Registration Fee: <strong className="golden-text">₹{event.fee ?? 150}</strong></p>
                <div style={{ background: '#f8fafc', padding: '2rem', borderRadius: '1rem', border: '2px dashed var(--border-color)', margin: '1.5rem auto', maxWidth: '300px' }}>
                  {content.paymentQr ? (
                    <img src={content.paymentQr} alt="Payment QR" style={{ width: '100%', height: 'auto', borderRadius: '0.5rem', marginBottom: '1rem' }} />
                  ) : (
                    <div style={{ width: '150px', height: '150px', background: 'var(--border-color)', margin: '0 auto 1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.875rem', textAlign: 'center', padding: '1rem' }}>
                      QR Code Unavailable
                    </div>
                  )}
                  <p style={{ fontSize: '1rem', fontWeight: 600 }}>UPI ID: {content.paymentUpi}</p>
                </div>
                <p className="text-secondary" style={{ fontSize: '0.875rem' }}>Scan the QR code to pay, then enter the Transaction ID below.</p>
              </div>

              <form onSubmit={submitRegistration} className="admin-form">
                <div className="form-group full-width">
                  <label>Transaction ID / UTR Number</label>
                  <input 
                    type="text" 
                    placeholder="E.g., 3012938129302" 
                    value={form.transactionId} 
                    onChange={e => setForm({...form, transactionId: e.target.value})} 
                    required 
                  />
                </div>

                <div className="form-actions" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
                  <button type="button" className="btn btn-secondary btn-lg" onClick={() => setStep(1)} disabled={loading}>← Back</button>
                  <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
                    {loading ? 'Processing...' : 'Complete Registration ✅'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* STEP 3: Success */}
          {step === 3 && (
            <div className="register-card" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎉</div>
              <h2>Registration Successful!</h2>
              <p className="text-secondary" style={{ marginTop: '1rem', marginBottom: '2rem' }}>
                You have successfully registered for <strong>{event.name}</strong>.<br/>
                Your Transaction ID ({form.transactionId}) is pending verification by our team.<br/>
                A confirmation email has been sent to <strong>{form.email}</strong>.
              </p>
              <button className="btn btn-primary" onClick={() => navigate('/events')}>Return to Events</button>
            </div>
          )}

        </div>
      </section>
    </div>
  );
}
