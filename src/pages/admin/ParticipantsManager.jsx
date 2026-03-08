import { useState, useMemo } from 'react';
import { getParticipants } from '../../data/dataService';

export default function ParticipantsManager() {
  const [participants] = useState(() => getParticipants());
  const [search, setSearch] = useState('');
  const [filterEvent, setFilterEvent] = useState('');
  const [filterCollege, setFilterCollege] = useState('');
  const [filterPayment, setFilterPayment] = useState('');

  const events = useMemo(() => [...new Set(participants.map(p => p.eventName))], [participants]);
  const colleges = useMemo(() => [...new Set(participants.map(p => p.college))], [participants]);

  const filtered = useMemo(() => {
    return participants.filter(p => {
      const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.email.toLowerCase().includes(search.toLowerCase()) || p.college.toLowerCase().includes(search.toLowerCase());
      const matchEvent = !filterEvent || p.eventName === filterEvent;
      const matchCollege = !filterCollege || p.college === filterCollege;
      const matchPayment = !filterPayment || p.paymentStatus === filterPayment;
      return matchSearch && matchEvent && matchCollege && matchPayment;
    });
  }, [participants, search, filterEvent, filterCollege, filterPayment]);

  return (
    <div>
      <h1 className="admin-page-title">Participants Manager</h1>

      <div className="admin-toolbar">
        <input className="admin-search" type="text" placeholder="🔍 Search by name, email, or college..." value={search} onChange={e => setSearch(e.target.value)} />
        <select value={filterEvent} onChange={e => setFilterEvent(e.target.value)}>
          <option value="">All Events</option>
          {events.map(ev => <option key={ev} value={ev}>{ev}</option>)}
        </select>
        <select value={filterCollege} onChange={e => setFilterCollege(e.target.value)}>
          <option value="">All Colleges</option>
          {colleges.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <select value={filterPayment} onChange={e => setFilterPayment(e.target.value)}>
          <option value="">All Status</option>
          <option value="Paid">Paid</option>
          <option value="Pending">Pending</option>
        </select>
      </div>

      <div className="admin-card">
        <p style={{ marginBottom: '1rem', color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
          Showing {filtered.length} of {participants.length} participants
        </p>
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>College</th>
                <th>Department</th>
                <th>Year</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Event</th>
                <th>Team Info</th>
                <th>Payment</th>
                <th>Transaction ID</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.id}>
                  <td><code>{p.id}</code></td>
                  <td><strong>{p.name}</strong></td>
                  <td>{p.college}</td>
                  <td>{p.department}</td>
                  <td>{p.year}</td>
                  <td>{p.email}</td>
                  <td>{p.phone}</td>
                  <td>{p.eventName}</td>
                  <td>
                    {p.teamName ? (
                      <div>
                        <strong>{p.teamName}</strong>
                        {p.teamMembers?.length > 0 && <div style={{fontSize:'0.75rem', color:'var(--text-tertiary)'}}>+{p.teamMembers.length} members</div>}
                      </div>
                    ) : 'Solo'}
                  </td>
                  <td><span className={`status-badge ${p.paymentStatus.toLowerCase()}`}>{p.paymentStatus}</span></td>
                  <td><code style={{fontSize:'0.75rem'}}>{p.transactionId || '—'}</code></td>
                  <td>{p.registrationDate}</td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan="10" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-tertiary)' }}>No participants found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
