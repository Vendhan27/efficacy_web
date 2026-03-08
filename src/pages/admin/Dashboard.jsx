import { useState } from 'react';
import { getAnalytics } from '../../data/dataService';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, ArcElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import './Dashboard.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, ArcElement, Title, Tooltip, Legend, Filler);

export default function Dashboard() {
  const [analytics] = useState(() => getAnalytics());

  if (!analytics) return null;

  const statCards = [
    { icon: '👥', label: 'Total Participants', value: analytics.totalParticipants, color: '#06b6d4' },
    { icon: '🎯', label: 'Total Events', value: analytics.totalEvents, color: '#f97316' },
    { icon: '🏫', label: 'Colleges Participated', value: analytics.totalColleges, color: '#8b5cf6' },
    { icon: '📋', label: 'Total Registrations', value: analytics.totalRegistrations, color: '#22c55e' },
  ];

  const eventChartData = {
    labels: Object.keys(analytics.eventWise),
    datasets: [{
      label: 'Registrations',
      data: Object.values(analytics.eventWise),
      backgroundColor: ['#06b6d4', '#f97316', '#8b5cf6', '#22c55e', '#ec4899', '#eab308'],
      borderRadius: 8,
      borderSkipped: false,
    }],
  };

  const collegeChartData = {
    labels: Object.keys(analytics.collegeWise),
    datasets: [{
      data: Object.values(analytics.collegeWise),
      backgroundColor: ['#06b6d4', '#f97316', '#8b5cf6', '#22c55e', '#ec4899', '#eab308', '#14b8a6'],
      borderWidth: 0,
    }],
  };

  const sortedDates = Object.keys(analytics.dailyTrend).sort();
  const trendChartData = {
    labels: sortedDates,
    datasets: [{
      label: 'Daily Registrations',
      data: sortedDates.map(d => analytics.dailyTrend[d]),
      borderColor: '#06b6d4',
      backgroundColor: 'rgba(6, 182, 212, 0.1)',
      fill: true,
      tension: 0.4,
      pointBackgroundColor: '#06b6d4',
    }],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { display: false }, ticks: { color: 'var(--text-tertiary)', font: { size: 11 } } },
      y: { grid: { color: 'rgba(0,0,0,0.05)' }, ticks: { color: 'var(--text-tertiary)', font: { size: 11 } } },
    },
  };

  return (
    <div className="dashboard-page">
      <h1 className="admin-page-title">Dashboard</h1>

      <div className="stat-cards-grid">
        {statCards.map((s, i) => (
          <div key={i} className="stat-card" style={{ '--stat-color': s.color }}>
            <div className="stat-icon">{s.icon}</div>
            <div className="stat-info">
              <span className="stat-value">{s.value}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="charts-grid">
        <div className="admin-card chart-card">
          <h3>Event-wise Registrations</h3>
          <div className="chart-container">
            <Bar data={eventChartData} options={chartOptions} />
          </div>
        </div>
        <div className="admin-card chart-card">
          <h3>College-wise Distribution</h3>
          <div className="chart-container chart-doughnut">
            <Doughnut data={collegeChartData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom', labels: { font: { size: 11 }, padding: 12 } } } }} />
          </div>
        </div>
        <div className="admin-card chart-card chart-wide">
          <h3>Daily Registration Trend</h3>
          <div className="chart-container">
            <Line data={trendChartData} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
}
