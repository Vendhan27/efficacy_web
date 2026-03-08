import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { logout } from '../../data/dataService';
import ThemeToggle from '../../components/ThemeToggle';
import './AdminLayout.css';

const MENU = [
  { path: '/admin/dashboard', icon: '📊', label: 'Dashboard' },
  { path: '/admin/events', icon: '🎯', label: 'Events Manager' },
  { path: '/admin/participants', icon: '👥', label: 'Participants' },
  { path: '/admin/gallery', icon: '🖼️', label: 'Gallery Manager' },
  { path: '/admin/team', icon: '🤝', label: 'Team Manager' },
  { path: '/admin/content', icon: '📝', label: 'Website Content' },
  { path: '/admin/export', icon: '📥', label: 'Excel Export' },
  { path: '/admin/settings', icon: '⚙️', label: 'Settings' },
];

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="admin-layout">
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="admin-sidebar-header">
          <div className="admin-sidebar-logo">
            <img src="/college-logo.jpeg" alt="GCE Erode" style={{ width: '36px', height: '36px', objectFit: 'contain', borderRadius: '50%', background: '#fff', padding: '2px' }} />
            <div>
              <h2 className="golden-text">EFFICACY'26</h2>
              <span className="admin-sidebar-badge">Admin Panel</span>
            </div>
          </div>
        </div>
        <nav className="admin-sidebar-nav">
          {MENU.map(item => (
            <NavLink key={item.path} to={item.path} className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`} onClick={() => setSidebarOpen(false)}>
              <span className="admin-nav-icon">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="admin-sidebar-footer">
          <button className="admin-nav-link logout-btn" onClick={handleLogout}>
            <span className="admin-nav-icon">🚪</span>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <div className="admin-main">
        <header className="admin-header">
          <button className="admin-menu-toggle" onClick={() => setSidebarOpen(s => !s)} aria-label="Toggle sidebar">
            <span></span><span></span><span></span>
          </button>
          <h3 className="admin-header-title">Admin Dashboard</h3>
          <div className="admin-header-actions">
            <ThemeToggle />
            <div className="admin-header-user">
              <span className="admin-avatar">👤</span>
              <span>Admin</span>
            </div>
          </div>
        </header>
        <main className="admin-content">
          <Outlet />
        </main>
      </div>

      {sidebarOpen && <div className="admin-overlay" onClick={() => setSidebarOpen(false)}></div>}
    </div>
  );
}
