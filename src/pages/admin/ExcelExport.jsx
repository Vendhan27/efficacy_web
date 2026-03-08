import { getParticipants, getEvents } from '../../data/dataService';
import * as XLSX from 'xlsx';

export default function ExcelExport() {
  const handleExport = () => {
    const participants = getParticipants();
    const events = getEvents();

    // Sheet 1: Participants Master
    const masterData = participants.map((p, i) => ({
      'Participant_ID': p.id,
      'Name': p.name,
      'College_Name': p.college,
      'Department': p.department,
      'Year': p.year,
      'Phone_Number': p.phone,
      'Email': p.email,
      'Event_Name': p.eventName,
      'Payment_Status': p.paymentStatus,
      'Registration_Date': p.registrationDate,
    }));

    // Sheet 2: Event Registrations
    const eventRegData = participants.map(p => ({
      'Participant_ID': p.id,
      'Name': p.name,
      'Event_Name': p.eventName,
      'College_Name': p.college,
      'Registration_Date': p.registrationDate,
    }));

    // Sheet 3: Event Summary
    const eventSummary = events.map(ev => {
      const count = participants.filter(p => p.eventName === ev.name).length;
      const paid = participants.filter(p => p.eventName === ev.name && p.paymentStatus === 'Paid').length;
      return {
        'Event_Name': ev.name,
        'Coordinator': ev.coordinator,
        'Phone': ev.phone,
        'Total_Registrations': count,
        'Paid': paid,
        'Pending': count - paid,
      };
    });

    // Sheet 4: Checkin
    const checkinData = participants.map(p => ({
      'Participant_ID': p.id,
      'Name': p.name,
      'Event_Name': p.eventName,
      'College_Name': p.college,
      'Phone_Number': p.phone,
      'Payment_Status': p.paymentStatus,
      'Checked_In': 'No',
    }));

    // Sheet 5: College Data
    const collegeMap = {};
    participants.forEach(p => {
      if (!collegeMap[p.college]) collegeMap[p.college] = { count: 0, events: new Set() };
      collegeMap[p.college].count++;
      collegeMap[p.college].events.add(p.eventName);
    });
    const collegeData = Object.entries(collegeMap).map(([name, data]) => ({
      'College_Name': name,
      'Total_Participants': data.count,
      'Events_Participated': [...data.events].join(', '),
      'Event_Count': data.events.size,
    }));

    // Create workbook
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(masterData), 'Participants_Master');
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(eventRegData), 'Event_Registrations');
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(eventSummary), 'Event_Summary');
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(checkinData), 'Checkin');
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(collegeData), 'College_Data');

    XLSX.writeFile(wb, 'EFFICACY_REGISTRATION_DATA.xlsx');
  };

  const participants = getParticipants();
  const events = getEvents();
  const colleges = [...new Set(participants.map(p => p.college))];

  return (
    <div>
      <h1 className="admin-page-title">Excel Data Export</h1>

      <div className="admin-card">
        <h3 style={{ fontWeight: 600, marginBottom: '1rem' }}>Export Registration Data</h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '1.5rem', lineHeight: 1.8 }}>
          Download all participant registration data as a Microsoft Excel file. The exported file will contain 5 sheets:
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem', marginBottom: '1.5rem' }}>
          {[
            { icon: '📋', name: 'Participants_Master', desc: 'All participant details' },
            { icon: '📝', name: 'Event_Registrations', desc: 'Event-wise registrations' },
            { icon: '📊', name: 'Event_Summary', desc: 'Event statistics' },
            { icon: '✅', name: 'Checkin', desc: 'Attendance tracking' },
            { icon: '🏫', name: 'College_Data', desc: 'College-wise data' },
          ].map((s, i) => (
            <div key={i} style={{ padding: '1rem', background: 'var(--bg-secondary)', borderRadius: '0.5rem', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>{s.icon}</div>
              <div style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--text-primary)' }}>{s.name}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>{s.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '2rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            <strong style={{ color: 'var(--text-primary)' }}>{participants.length}</strong> participants
          </div>
          <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            <strong style={{ color: 'var(--text-primary)' }}>{events.length}</strong> events
          </div>
          <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            <strong style={{ color: 'var(--text-primary)' }}>{colleges.length}</strong> colleges
          </div>
        </div>

        <button className="btn btn-primary btn-lg" onClick={handleExport}>
          📥 Download Excel (EFFICACY_REGISTRATION_DATA.xlsx)
        </button>
      </div>
    </div>
  );
}
