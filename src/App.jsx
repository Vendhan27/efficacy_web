import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { initializeData, isAuthenticated } from './data/dataService';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import About from './pages/About';
import Events from './pages/Events';
import EventDetail from './pages/EventDetail';
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

function PublicLayout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
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
    <BrowserRouter>
      <Routes>
        {/* Public Pages */}
        <Route element={<ScrollToTopWrapper />}>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/:id" element={<EventDetail />} />
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
                <AdminLayout />
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
    </BrowserRouter>
  );
}
