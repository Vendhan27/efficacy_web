import { useState, useEffect } from 'react';
import './ThemeToggle.css';

export default function ThemeToggle() {
  const [dark, setDark] = useState(() => {
    return localStorage.getItem('efficacy_theme') === 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    localStorage.setItem('efficacy_theme', dark ? 'dark' : 'light');
  }, [dark]);

  return (
    <button className="theme-toggle" onClick={() => setDark(d => !d)} aria-label="Toggle theme" title={dark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
      <span className={`theme-toggle-icon ${dark ? 'moon' : 'sun'}`}>
        {dark ? '🌙' : '☀️'}
      </span>
    </button>
  );
}
