import { useState, useEffect } from 'react';
import { api } from '../api';

const EMOJIS = { 5: '😄', 4: '🙂', 3: '😐', 2: '😔', 1: '😢' };

export default function HistoryPage() {
  const [tab, setTab] = useState('all');
  const [assessments, setAssessments] = useState([]);
  const [moods, setMoods] = useState([]);
  const [journals, setJournals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get('/assessment/history'),
      api.get('/mood?limit=50'),
      api.get('/journal'),
    ]).then(([a, m, j]) => {
      setAssessments(a.assessments);
      setMoods(m.moods);
      setJournals(j.entries);
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const formatDate = (d) => new Date(d).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  const formatAI = (t) => (t || '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>');

  const allItems = [
    ...assessments.map(a => ({ ...a, _type: 'assessment', _date: a.created_at })),
    ...moods.map(m => ({ ...m, _type: 'mood', _date: m.created_at })),
    ...journals.map(j => ({ ...j, _type: 'journal', _date: j.created_at })),
  ].sort((a, b) => new Date(b._date) - new Date(a._date));

  const filtered = tab === 'all' ? allItems : allItems.filter(i => i._type === tab);

  const sevClass = (s) => {
    const l = (s || '').toLowerCase();
    return l.includes('minimal') ? 'sev-minimal' : l.includes('mild') ? 'sev-mild' : l.includes('moderately') ? 'sev-mod-severe' : l.includes('moderate') ? 'sev-moderate' : 'sev-severe';
  };

  return (
    <div className="page fade-in">
      <div className="page-header">
        <h1>Mental Health History</h1>
        <p className="text-muted">Your complete mental health journey in one place.</p>
      </div>

      <div className="history-tabs">
        {[
          { key: 'all', label: '📋 All', count: allItems.length },
          { key: 'assessment', label: '📊 Assessments', count: assessments.length },
          { key: 'mood', label: '😊 Moods', count: moods.length },
          { key: 'journal', label: '✍️ Journal', count: journals.length },
        ].map(t => (
          <button key={t.key} className={`tab-btn ${tab === t.key ? 'active' : ''}`} onClick={() => setTab(t.key)}>
            {t.label} <span className="tab-count">{t.count}</span>
          </button>
        ))}
      </div>

      {loading ? (
        <div className="empty-state"><div className="spinner" /></div>
      ) : filtered.length === 0 ? (
        <div className="glass-card"><p className="empty-state">No entries yet. Start using the app to build your history! 🚀</p></div>
      ) : (
        <div className="history-list">
          {filtered.map((item, i) => (
            <div key={`${item._type}-${item.id}`} className="glass-card history-item fade-in" style={{ animationDelay: `${i * 0.03}s` }}>
              {item._type === 'assessment' && (
                <>
                  <div className="history-item-header">
                    <span className="history-type-badge badge-assessment">📊 Assessment</span>
                    <span className="history-date">{formatDate(item._date)}</span>
                  </div>
                  <h4>{item.type}</h4>
                  <div className="history-assessment-row">
                    <span className="score-display-sm">{item.score}/{item.max_score}</span>
                    <span className={`severity-badge ${sevClass(item.severity)}`}>{item.severity}</span>
                  </div>
                  {item.ai_analysis && <details><summary className="text-muted">View AI Analysis</summary><div className="analysis-text" dangerouslySetInnerHTML={{ __html: formatAI(item.ai_analysis) }} /></details>}
                </>
              )}
              {item._type === 'mood' && (
                <>
                  <div className="history-item-header">
                    <span className="history-type-badge badge-mood">😊 Mood</span>
                    <span className="history-date">{formatDate(item._date)}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ fontSize: '2rem' }}>{EMOJIS[item.mood]}</span>
                    {item.note && <span className="text-muted">{item.note}</span>}
                  </div>
                </>
              )}
              {item._type === 'journal' && (
                <>
                  <div className="history-item-header">
                    <span className="history-type-badge badge-journal">✍️ Journal</span>
                    <span className={`journal-sentiment-tag ${item.sentiment === 'positive' ? 'sentiment-positive' : item.sentiment === 'negative' ? 'sentiment-negative' : 'sentiment-neutral'}`}>{item.sentiment}</span>
                    <span className="history-date">{formatDate(item._date)}</span>
                  </div>
                  <p className="journal-entry-preview" style={{ WebkitLineClamp: 3 }}>{item.content}</p>
                  {item.ai_analysis && <details><summary className="text-muted">View AI Analysis</summary><div className="analysis-text" dangerouslySetInnerHTML={{ __html: formatAI(item.ai_analysis) }} /></details>}
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
