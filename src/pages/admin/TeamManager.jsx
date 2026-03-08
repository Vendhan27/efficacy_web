import { useState } from 'react';
import { getTeam, addMember, updateMember, deleteMember } from '../../data/dataService';

const SECTIONS = ['Faculty Coordinators', 'Student Coordinators', 'IT Wing', 'Volunteers'];

export default function TeamManager() {
  const [team, setTeam] = useState(() => getTeam());
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({ name: '', role: '', department: 'Mechanical Engineering', photo: '', linkedin: '', section: SECTIONS[0] });
  const refresh = () => setTeam(getTeam());

  const openAdd = () => {
    setForm({ name: '', role: '', department: 'Mechanical Engineering', photo: '', linkedin: '', section: SECTIONS[0] });
    setModal('add');
  };

  const openEdit = (m) => {
    setForm({ name: m.name, role: m.role, department: m.department, photo: m.photo || '', linkedin: m.linkedin || '', section: m.section });
    setModal(m);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (modal === 'add') addMember(form);
    else updateMember(modal.id, form);
    setModal(null);
    refresh();
  };

  const handleDelete = (id) => {
    if (confirm('Delete this member?')) { deleteMember(id); refresh(); }
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setForm({ ...form, photo: ev.target.result });
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <h1 className="admin-page-title">Team Manager</h1>
      <div className="admin-toolbar">
        <button className="btn btn-primary" onClick={openAdd}>+ Add Member</button>
      </div>

      <div className="admin-card">
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Photo</th>
                <th>Name</th>
                <th>Role</th>
                <th>Section</th>
                <th>Department</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {team.map(m => (
                <tr key={m.id}>
                  <td>
                    <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--accent-gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', fontSize: '1rem' }}>
                      {m.photo ? <img src={m.photo} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : '👤'}
                    </div>
                  </td>
                  <td><strong>{m.name}</strong></td>
                  <td>{m.role}</td>
                  <td>{m.section}</td>
                  <td>{m.department}</td>
                  <td>
                    <div className="actions-cell">
                      <button className="btn btn-secondary btn-sm" onClick={() => openEdit(m)}>Edit</button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(m.id)}>Delete</button>
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
            <h3 className="modal-title">{modal === 'add' ? 'Add New Member' : 'Edit Member'}</h3>
            <form onSubmit={handleSubmit} className="admin-form">
              <div className="form-group">
                <label>Name</label>
                <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
              </div>
              <div className="form-group">
                <label>Role</label>
                <input type="text" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} required />
              </div>
              <div className="form-group">
                <label>Section</label>
                <select value={form.section} onChange={e => setForm({ ...form, section: e.target.value })}>
                  {SECTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Department</label>
                <input type="text" value={form.department} onChange={e => setForm({ ...form, department: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Photo</label>
                <input type="file" accept="image/*" onChange={handlePhotoUpload} />
              </div>
              <div className="form-group">
                <label>LinkedIn URL</label>
                <input type="url" value={form.linkedin} onChange={e => setForm({ ...form, linkedin: e.target.value })} placeholder="https://linkedin.com/in/..." />
              </div>
              <div className="admin-form-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setModal(null)}>Cancel</button>
                <button type="submit" className="btn btn-primary">{modal === 'add' ? 'Add Member' : 'Save Changes'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
