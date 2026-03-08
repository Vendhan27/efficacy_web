import { useState } from 'react';
import { getEvents, addEvent, updateEvent, deleteEvent } from '../../data/dataService';

export default function EventsManager() {
  const [events, setEvents] = useState(() => getEvents());
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({ name: '', description: '', rules: '', poster: '', coordinator: '', phone: '', eventType: 'Solo', isVisible: true, registrationEnabled: true });

  const refresh = () => setEvents(getEvents());

  const openAdd = () => {
    setForm({ name: '', description: '', rules: '', poster: '', coordinator: '', phone: '', eventType: 'Solo', isVisible: true, registrationEnabled: true });
    setModal('add');
  };

  const openEdit = (ev) => {
    setForm({ 
      name: ev.name, 
      description: ev.description, 
      rules: ev.rules, 
      poster: ev.poster || '', 
      coordinator: ev.coordinator, 
      phone: ev.phone,
      eventType: ev.eventType || 'Solo',
      isVisible: ev.isVisible ?? true,
      registrationEnabled: ev.registrationEnabled ?? true
    });
    setModal(ev);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (modal === 'add') {
      addEvent(form);
    } else {
      updateEvent(modal.id, form);
    }
    setModal(null);
    refresh();
  };

  const handleDelete = (id) => {
    if (confirm('Delete this event?')) {
      deleteEvent(id);
      refresh();
    }
  };

  const handlePosterUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setForm({ ...form, poster: ev.target.result });
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <h1 className="admin-page-title">Events Manager</h1>
      <div className="admin-toolbar">
        <button className="btn btn-primary" onClick={openAdd}>+ Add Event</button>
      </div>

      <div className="admin-card">
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Event Name</th>
                <th>Type</th>
                <th>Coordinator</th>
                <th>Poster</th>
                <th>Visibility</th>
                <th>Registration</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map(ev => (
                <tr key={ev.id}>
                  <td><strong>{ev.name}</strong></td>
                  <td>{ev.eventType || 'Solo'}</td>
                  <td>{ev.coordinator}<br/><small className="text-tertiary">{ev.phone}</small></td>
                  <td>{ev.poster ? '✅' : '—'}</td>
                  <td>{ev.isVisible !== false ? <span className="status-badge active">Visible</span> : <span className="status-badge inactive">Hidden</span>}</td>
                  <td>{ev.registrationEnabled !== false ? <span className="status-badge active">Open</span> : <span className="status-badge pending">Closed</span>}</td>
                  <td>
                    <div className="actions-cell">
                      <button className="btn btn-secondary btn-sm" onClick={() => openEdit(ev)}>Edit</button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(ev.id)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {modal && (
        <div className="modal-overlay" onClick={() => setModal(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h3 className="modal-title">{modal === 'add' ? 'Add New Event' : 'Edit Event'}</h3>
            <form onSubmit={handleSubmit} className="admin-form">
              <div className="form-group">
                <label>Event Name</label>
                <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
              </div>
              <div className="form-group">
                <label>Event Type</label>
                <select value={form.eventType} onChange={e => setForm({ ...form, eventType: e.target.value })}>
                  <option value="Solo">Solo Event</option>
                  <option value="Team">Team Event (Up to 4)</option>
                </select>
              </div>
              <div className="form-group">
                <label>Coordinator Name</label>
                <input type="text" value={form.coordinator} onChange={e => setForm({ ...form, coordinator: e.target.value })} required />
              </div>
              <div className="form-group">
                <label>Coordinator Phone</label>
                <input type="text" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} required />
              </div>
              <div className="form-group">
                <label>Poster Image</label>
                <input type="file" accept="image/*" onChange={handlePosterUpload} />
              </div>
              <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1rem' }}>
                <label style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input type="checkbox" checked={form.isVisible} onChange={e => setForm({ ...form, isVisible: e.target.checked })} />
                  Show Event on Website
                </label>
              </div>
              <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1rem' }}>
                <label style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input type="checkbox" checked={form.registrationEnabled} onChange={e => setForm({ ...form, registrationEnabled: e.target.checked })} />
                  Enable Registration (Open)
                </label>
              </div>
              <div className="form-group full-width">
                <label>Description</label>
                <textarea rows="3" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} required></textarea>
              </div>
              <div className="form-group full-width">
                <label>Rules (one per line)</label>
                <textarea rows="4" value={form.rules} onChange={e => setForm({ ...form, rules: e.target.value })}></textarea>
              </div>
              <div className="admin-form-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setModal(null)}>Cancel</button>
                <button type="submit" className="btn btn-primary">{modal === 'add' ? 'Add Event' : 'Save Changes'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
