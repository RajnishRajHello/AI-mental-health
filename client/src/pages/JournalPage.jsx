import { useState, useEffect } from 'react';
import { api } from '../api';

export default function JournalPage() {
  const [text, setText] = useState('');
  const [entries, setEntries] = useState([]);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [viewEntry, setViewEntry] = useState(null);

  const load = () => api.get('/journal').then(d => setEntries(d.entries)).catch(() => {});
  useEffect(() => { load(); }, []);

  const analyze = async () => {
    if (text.trim().length < 10) return;
    setLoading(true);
    setAnalysis(null);
    try {
      const data = await api.post('/journal', { content: text });
      setAnalysis(data.aiAnalysis);
      setText('');
      load();
    } catch (err) {
      setAnalysis('Failed to analyze. Try again.');
    }
    setLoading(false);
  };

  const formatAI = (t) => t.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>');
  const sentClass = (s) => s === 'positive' ? 'sentiment-positive' : s === 'negative' ? 'sentiment-negative' : 'sentiment-neutral';

  return (
    <div className="page fade-in">
      <div className="page-header">
        <h1>AI Mood Journal</h1>
        <p className="text-muted">Write your thoughts and let AI provide supportive insights.</p>
      </div>

      <div className="journal-grid">
        <div className="glass-card journal-write">
          <h3>📝 New Entry</h3>
          <textarea className="journal-textarea" value={text} onChange={e => setText(e.target.value)} placeholder="Write about your day, feelings, or anything on your mind…" rows={6} />
          <button className="btn btn-primary btn-block" onClick={analyze} disabled={loading || text.trim().length < 10}>
            {loading ? 'Analyzing…' : '✨ Analyze with AI'}
          </button>
        </div>

        <div className="glass-card">
          <h3>🤖 AI Insights</h3>
          {loading ? (
            <div className="empty-state"><div className="spinner" /><p>Analyzing your entry…</p></div>
          ) : analysis ? (
            <div className="analysis-text" dangerouslySetInnerHTML={{ __html: formatAI(analysis) }} />
          ) : viewEntry?.ai_analysis ? (
            <div className="analysis-text" dangerouslySetInnerHTML={{ __html: formatAI(viewEntry.ai_analysis) }} />
          ) : (
            <p className="empty-state">Write an entry and click Analyze to see AI insights 💭</p>
          )}
        </div>

        <div className="glass-card journal-history">
          <h3>📚 Past Entries</h3>
          {entries.length === 0 ? (
            <p className="empty-state">No entries yet. Start writing above! ✍️</p>
          ) : (
            <div className="journal-entries-list">
              {entries.map((e, i) => (
                <div key={e.id} className={`journal-entry-item ${viewEntry?.id === e.id ? 'active' : ''}`} onClick={() => setViewEntry(e)}>
                  <div className="journal-entry-date">{new Date(e.created_at).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</div>
                  <div className="journal-entry-preview">{e.content}</div>
                  <span className={`journal-sentiment-tag ${sentClass(e.sentiment)}`}>{e.sentiment}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
