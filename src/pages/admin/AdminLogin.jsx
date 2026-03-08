import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../data/dataService';
import BackButton from '../../components/BackButton';
import './AdminLogin.css';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setTimeout(() => {
      if (login(username, password)) {
        navigate('/admin/dashboard');
      } else {
        setError('Invalid username or password');
      }
      setLoading(false);
    }, 600);
  };

  return (
    <div className="admin-login-page">
      <div style={{ position: 'absolute', top: '2rem', left: '2rem', zIndex: 10 }}>
        <h2 className="admin-login-title">Admin Login</h2>
      </div>
      <div className="admin-login-bg">
        <div className="admin-login-glow-1"></div>
        <div className="admin-login-glow-2"></div>
      </div>
      <div className="admin-login-card">
        <div className="admin-login-header">
          <div className="admin-login-logos">
            <img src="/college-logo.jpeg" alt="GCE Erode" className="admin-login-logo-img" />
            <img src="/mech-logo.jpeg" alt="Mechanical Department" className="admin-login-logo-img" />
          </div>
          <h1 className="golden-text" style={{ backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent' }}>EFFICACY'26</h1>
          <p>Admin Dashboard Login</p>
        </div>
        <form onSubmit={handleSubmit} className="admin-login-form">
          {error && <div className="admin-login-error">{error}</div>}
          <div className="form-group">
            <label htmlFor="admin-username">Username</label>
            <input id="admin-username" type="text" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)} required autoComplete="username" />
          </div>
          <div className="form-group">
            <label htmlFor="admin-password">Password</label>
            <input id="admin-password" type="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.target.value)} required autoComplete="current-password" />
          </div>
          <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }} disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In →'}
          </button>
        </form>
      </div>
    </div>
  );
}
