import { HashRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import React, { useEffect, Component } from 'react';
import { initializeData, isAuthenticated } from './data/dataService';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import About from './pages/About';
import Events from './pages/Events';
import EventDetail from './pages/EventDetail';
import Register from './pages/Register';
import Gallery from './pages/Gallery';
import Team from './pages/Team';
import Contact from './pages/Contact';

import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './pages/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import EventsManager from './pages/admin/EventsManager';
import ParticipantsManager from './pages/admin/ParticipantsManager';
import GalleryManager from './pages/admin/GalleryManager';
import TeamManager from './pages/admin/TeamManager';
import ContentEditor from './pages/admin/ContentEditor';
import ExcelExport from './pages/admin/ExcelExport';
import Settings from './pages/admin/Settings';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '2rem', background: '#fee2e2', color: '#991b1b', fontFamily: 'monospace', minHeight: '100vh', zIndex: 9999, position: 'relative' }}>
          <h2>Something went wrong in this component:</h2>
          <details style={{ whiteSpace: 'pre-wrap', marginTop: '1rem', background: '#fff', padding: '1rem', border: '1px solid #fca5a5' }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo && this.state.errorInfo.componentStack}
          </details>
          <button onClick={() => window.location.href = '/'} style={{ marginTop: '1rem', padding: '0.5rem 1rem', background: '#ef4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Return Home</button>
        </div>
      );
    }
    return this.props.children;
  }
}

function PublicLayout() {
  return (
    <ErrorBoundary>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </ErrorBoundary>
  );
}

function ProtectedRoute({ children }) {
  if (!isAuthenticated()) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
}

function ScrollToTop() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return null;
}

function ScrollToTopWrapper() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}

export default function App() {
  useEffect(() => {
    initializeData();
    // Load saved theme
    const savedTheme = localStorage.getItem('efficacy_theme');
    if (savedTheme) {
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
  }, []);

  return (
    <HashRouter>
      <Routes>
        {/* Public Pages */}
        <Route element={<ScrollToTopWrapper />}>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/:id" element={<EventDetail />} />
            <Route path="/register/:id" element={<Register />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/team" element={<Team />} />
            <Route path="/contact" element={<Contact />} />
          </Route>

          {/* Admin Login - exact path only */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Admin Dashboard - protected */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <ErrorBoundary>
                  <AdminLayout />
                </ErrorBoundary>
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="events" element={<EventsManager />} />
            <Route path="participants" element={<ParticipantsManager />} />
            <Route path="gallery" element={<GalleryManager />} />
            <Route path="team" element={<TeamManager />} />
            <Route path="content" element={<ContentEditor />} />
            <Route path="export" element={<ExcelExport />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
}
