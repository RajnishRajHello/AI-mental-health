import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api';
import { useAuth } from '../context/AuthContext';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip);

const EMOJIS = { 5: '😄', 4: '🙂', 3: '😐', 2: '😔', 1: '😢' };
const LABELS = { 5: 'Great', 4: 'Good', 3: 'Okay', 2: 'Low', 1: 'Bad' };

export default function DashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [moods, setMoods] = useState([]);
  const [selectedMood, setSelectedMood] = useState(null);
  const [note, setNote] = useState('');
  const [logging, setLogging] = useState(false);

  const load = async () => {
    try {
      const [s, m] = await Promise.all([api.get('/mood/stats'), api.get('/mood?limit=14')]);
      setStats(s);
      setMoods(m.moods);
    } catch {}
  };

  useEffect(() => { load(); }, []);

  const logMood = async () => {
    if (!selectedMood) return;
    setLogging(true);
    try {
      await api.post('/mood', { mood: selectedMood, note });
      setSelectedMood(null);
      setNote('');
      load();
    } catch {}
    setLogging(false);
  };

  const chartData = {
    labels: [...moods].reverse().map(m => new Date(m.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })),
    datasets: [{
      label: 'Mood',
      data: [...moods].reverse().map(m => m.mood),
      borderColor: '#6C63FF',
      backgroundColor: 'rgba(108,99,255,0.1)',
      borderWidth: 2.5,
      pointBackgroundColor: '#6C63FF',
      pointBorderColor: '#fff',
      pointBorderWidth: 2,
      pointRadius: 5,
      fill: true,
      tension: 0.4,
    }],
  };

  const chartOpts = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: { min: 0, max: 5, ticks: { stepSize: 1, callback: v => EMOJIS[v] || '', color: '#8888aa' }, grid: { color: 'rgba(255,255,255,0.04)' } },
      x: { ticks: { color: '#8888aa', font: { size: 11 } }, grid: { display: false } },
    },
    plugins: { legend: { display: false }, tooltip: { callbacks: { label: ctx => `${EMOJIS[ctx.parsed.y]} ${LABELS[ctx.parsed.y]}` } } },
  };

  const wellness = stats?.wellness || 0;
  const circumference = 2 * Math.PI * 52;
  const offset = circumference - (wellness / 100) * circumference;

  return (
    <div className="page fade-in">
      <div className="page-header">
        <div>
          <h1>Welcome back, {user?.name?.split(' ')[0]} 👋</h1>
          <p className="text-muted">Here's your mental wellness overview</p>
        </div>
      </div>

      <div className="stats-row">
        {[
          { label: 'Mood Entries', value: stats?.totalMoods || 0, icon: '😊' },
          { label: 'Assessments', value: stats?.totalAssessments || 0, icon: '📋' },
          { label: 'Journal Entries', value: stats?.totalJournals || 0, icon: '✍️' },
          { label: 'Avg Mood', value: stats?.recentAvg || '--', icon: '📈' },
        ].map((s, i) => (
          <div className="stat-card glass-card" key={i}>
            <span className="stat-icon">{s.icon}</span>
            <span className="stat-value">{s.value}</span>
            <span className="stat-label">{s.label}</span>
          </div>
        ))}
      </div>

      <div className="dashboard-grid">
        <div className="glass-card mood-logger">
          <h3>How are you feeling?</h3>
          <div className="emoji-picker">
            {[5,4,3,2,1].map(v => (
              <button key={v} className={`emoji-btn ${selectedMood === v ? 'selected' : ''}`} onClick={() => setSelectedMood(v)}>
                {EMOJIS[v]}<span className="emoji-label">{LABELS[v]}</span>
              </button>
            ))}
          </div>
          <input className="form-input" value={note} onChange={e => setNote(e.target.value)} placeholder="Add a note (optional)…" />
          <button className="btn btn-primary btn-block" onClick={logMood} disabled={!selectedMood || logging}>{logging ? 'Logging…' : 'Log Mood'}</button>
        </div>

        <div className="glass-card wellness-card">
          <h3>Wellness Score</h3>
          <div className="wellness-ring">
            <svg viewBox="0 0 120 120">
              <defs>
                <linearGradient id="rg" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6C63FF" /><stop offset="100%" stopColor="#00D9A6" />
                </linearGradient>
              </defs>
              <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
              <circle cx="60" cy="60" r="52" fill="none" stroke="url(#rg)" strokeWidth="8" strokeLinecap="round"
                strokeDasharray={circumference} strokeDashoffset={offset}
                style={{ transform: 'rotate(-90deg)', transformOrigin: 'center', transition: 'stroke-dashoffset 1.5s ease' }} />
            </svg>
            <span className="wellness-value">{wellness || '--'}</span>
          </div>
          <p className="text-muted" style={{ textAlign: 'center', fontSize: '.85rem' }}>
            {wellness >= 80 ? 'Doing great! 🌟' : wellness >= 60 ? 'Hanging in there 💪' : wellness >= 40 ? 'Could be better 💙' : wellness > 0 ? 'Take it easy 🫂' : 'Log moods to see score'}
          </p>
        </div>

        <div className="glass-card chart-card">
          <h3>Mood Trend</h3>
          <div style={{ height: 250 }}>
            {moods.length > 0 ? <Line data={chartData} options={chartOpts} /> : <p className="empty-state">Log moods to see your trend chart ☝️</p>}
          </div>
        </div>

        <div className="glass-card quick-actions-card">
          <h3>Quick Actions</h3>
          <div className="quick-actions">
            <Link to="/app/chat" className="quick-action-btn"><span>💬</span>Chat with AI</Link>
            <Link to="/app/assessment" className="quick-action-btn"><span>📋</span>Take Assessment</Link>
            <Link to="/app/journal" className="quick-action-btn"><span>✍️</span>Write Journal</Link>
            <Link to="/app/history" className="quick-action-btn"><span>📁</span>View History</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
