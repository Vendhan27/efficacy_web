import { useState } from 'react';
import { changePassword } from '../../data/dataService';

export default function Settings() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');

  const handleChangePassword = (e) => {
    e.preventDefault();
    setMsg('');
    setError('');
    if (newPassword.length < 4) {
      setError('Password must be at least 4 characters');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    changePassword(newPassword);
    setMsg('Password changed successfully!');
    setNewPassword('');
    setConfirmPassword('');
    setTimeout(() => setMsg(''), 3000);
  };

  return (
    <div>
      <h1 className="admin-page-title">Settings</h1>

      <div className="admin-card" style={{ maxWidth: 500 }}>
        <h3 style={{ fontWeight: 600, marginBottom: '1rem' }}>🔒 Change Admin Password</h3>
        {msg && <div style={{ padding: '0.75rem 1rem', background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: '0.5rem', color: '#22c55e', fontSize: '0.875rem', marginBottom: '1rem' }}>✅ {msg}</div>}
        {error && <div style={{ padding: '0.75rem 1rem', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '0.5rem', color: '#f87171', fontSize: '0.875rem', marginBottom: '1rem' }}>⚠️ {error}</div>}
        <form onSubmit={handleChangePassword} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="form-group">
            <label>New Password</label>
            <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="Enter new password" required />
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Confirm new password" required />
          </div>
          <button type="submit" className="btn btn-primary">Update Password</button>
        </form>
      </div>

      <div className="admin-card" style={{ maxWidth: 500 }}>
        <h3 style={{ fontWeight: 600, marginBottom: '1rem' }}>ℹ️ System Information</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid var(--border-color)' }}>
            <span style={{ color: 'var(--text-secondary)' }}>Platform</span>
            <span style={{ fontWeight: 500 }}>EFFICACY Admin v1.0</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid var(--border-color)' }}>
            <span style={{ color: 'var(--text-secondary)' }}>Data Storage</span>
            <span style={{ fontWeight: 500 }}>Local Storage</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0' }}>
            <span style={{ color: 'var(--text-secondary)' }}>Built with</span>
            <span style={{ fontWeight: 500 }}>React + Vite</span>
          </div>
        </div>
      </div>
    </div>
  );
}
