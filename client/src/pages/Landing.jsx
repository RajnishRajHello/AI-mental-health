import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div className="landing-page">
      <header className="landing-nav">
        <div className="logo">
          <span className="logo-icon">🧠</span>
          <span className="logo-text">MindCare<span className="logo-ai">AI</span></span>
        </div>
        <div className="landing-nav-actions">
          <Link to="/login" className="btn btn-outline">Log In</Link>
          <Link to="/register" className="btn btn-primary">Get Started</Link>
        </div>
      </header>

      <section className="hero">
        <div className="hero-glow" />
        <div className="hero-content">
          <span className="hero-badge">🤖 AI-Powered Mental Health Platform</span>
          <h1 className="hero-title">Your Mental Health,<br /><span className="gradient-text">Understood & Supported</span></h1>
          <p className="hero-subtitle">An intelligent mental health companion that listens, assesses, tracks, and supports your well-being journey — powered by advanced AI.</p>
          <div className="hero-actions">
            <Link to="/register" className="btn btn-primary btn-lg">Start Your Journey 🚀</Link>
            <Link to="/login" className="btn btn-outline btn-lg">Sign In</Link>
          </div>
        </div>
      </section>

      <section className="features-section">
        <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>Everything You Need for Mental Wellness</h2>
        <div className="features-grid">
          {[
            { icon: '💬', title: 'AI Chat Counselor', desc: 'Talk to our empathetic AI assistant anytime. Get coping strategies, grounding exercises, and emotional support.' },
            { icon: '📋', title: 'Self-Assessment', desc: 'Take clinically-validated PHQ-9 and GAD-7 questionnaires with AI-powered interpretation of your results.' },
            { icon: '📊', title: 'Mood Dashboard', desc: 'Log your daily mood and visualize trends over time with interactive charts and wellness insights.' },
            { icon: '✍️', title: 'AI Journal', desc: 'Write freely and let AI analyze the emotional tone of your entries with supportive reflections.' },
            { icon: '📁', title: 'Health History', desc: 'View your complete mental health journey — assessments, mood trends, and journal entries all in one place.' },
            { icon: '🔒', title: 'Private & Secure', desc: 'Your data stays on our secure servers. Sign up to keep your history safe and accessible across sessions.' },
          ].map((f, i) => (
            <div className="feature-card" key={i}>
              <div className="feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="cta-section">
        <div className="glass-card" style={{ textAlign: 'center', padding: '3rem 2rem' }}>
          <h2 style={{ marginBottom: '.75rem' }}>Ready to Start Your Wellness Journey?</h2>
          <p className="hero-subtitle" style={{ marginBottom: '2rem' }}>Create your free account and get access to all AI-powered features.</p>
          <Link to="/register" className="btn btn-primary btn-lg">Create Free Account</Link>
        </div>
      </section>

      <footer className="landing-footer">
        <div className="disclaimer-bar">
          <p>⚠️ <strong>Disclaimer:</strong> This is a college project and is NOT a substitute for professional mental health care. If you are in crisis, call <strong>988</strong> (US) or <strong>iCall: 9152987821</strong> (India).</p>
        </div>
        <p style={{ textAlign: 'center', color: 'var(--text-dim)', fontSize: '.8rem', marginTop: '1rem' }}>© 2024 MindCare AI — College Project</p>
      </footer>
    </div>
  );
}
