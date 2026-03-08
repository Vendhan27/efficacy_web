import { useState } from 'react';
import { getContent, updateContent } from '../../data/dataService';

export default function ContentEditor() {
  const [content, setContent] = useState(() => getContent());
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    updateContent(content);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const updateHighlight = (index, field, value) => {
    const highlights = [...content.highlights];
    highlights[index] = { ...highlights[index], [field]: value };
    setContent({ ...content, highlights });
  };

  return (
    <div>
      <h1 className="admin-page-title">Website Content Editor</h1>

      {saved && (
        <div style={{ padding: '0.75rem 1rem', background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: '0.5rem', color: '#22c55e', fontSize: '0.875rem', fontWeight: 500, marginBottom: '1.5rem', animation: 'fadeInUp 0.3s ease' }}>
          ✅ Changes saved successfully! They will appear on the website immediately.
        </div>
      )}

      <div className="admin-card">
        <h3 style={{ fontWeight: 600, marginBottom: '1rem' }}>Hero Section</h3>
        <div className="admin-form">
          <div className="form-group">
            <label>Hero Title</label>
            <input type="text" value={content.heroTitle} onChange={e => setContent({ ...content, heroTitle: e.target.value })} />
          </div>
          <div className="form-group">
            <label>Hero Subtitle</label>
            <input type="text" value={content.heroSubtitle} onChange={e => setContent({ ...content, heroSubtitle: e.target.value })} />
          </div>
          <div className="form-group full-width">
            <label>Hero Tagline</label>
            <textarea rows="2" value={content.heroTagline} onChange={e => setContent({ ...content, heroTagline: e.target.value })}></textarea>
          </div>
        </div>
      </div>

      <div className="admin-card">
        <h3 style={{ fontWeight: 600, marginBottom: '1rem' }}>About Section</h3>
        <div className="form-group">
          <label>About Text</label>
          <textarea rows="5" value={content.aboutText} onChange={e => setContent({ ...content, aboutText: e.target.value })} style={{ width: '100%' }}></textarea>
        </div>
      </div>

      <div className="admin-card">
        <h3 style={{ fontWeight: 600, marginBottom: '1rem' }}>Highlights Section</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
          {content.highlights?.map((h, i) => (
            <div key={i} style={{ padding: '1rem', background: 'var(--bg-secondary)', borderRadius: '0.75rem', border: '1px solid var(--border-color)' }}>
              <div className="form-group" style={{ marginBottom: '0.5rem' }}>
                <label>Icon</label>
                <input type="text" value={h.icon} onChange={e => updateHighlight(i, 'icon', e.target.value)} />
              </div>
              <div className="form-group" style={{ marginBottom: '0.5rem' }}>
                <label>Title</label>
                <input type="text" value={h.title} onChange={e => updateHighlight(i, 'title', e.target.value)} />
              </div>
              <div className="form-group">
                <label>Description</label>
                <input type="text" value={h.description} onChange={e => updateHighlight(i, 'description', e.target.value)} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <button className="btn btn-primary btn-lg" onClick={handleSave} style={{ marginTop: '1rem' }}>💾 Save All Changes</button>
    </div>
  );
}
