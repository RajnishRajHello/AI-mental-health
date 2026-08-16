export default function ResourcesPage() {
  const resources = [
    {
      icon: '🚨', title: 'Crisis Helplines', emergency: true,
      items: [
        '988 Suicide & Crisis Lifeline — Call or text 988 (US)',
        'Crisis Text Line — Text HOME to 741741',
        'iCall — 9152987821 (India)',
        'Vandrevala Foundation — 1860-2662-345 (India)',
        'AASRA — 91-22-27546669 (India)',
        'Samaritans — 116 123 (UK)',
      ],
    },
    {
      icon: '😟', title: 'Managing Anxiety',
      items: [
        '4-7-8 Breathing: Inhale 4s, hold 7s, exhale 8s',
        'Grounding (5-4-3-2-1): Name 5 things you see, 4 touch, 3 hear, 2 smell, 1 taste',
        'Progressive Muscle Relaxation: Tense and release each muscle group',
        'Limit caffeine and maintain regular sleep',
      ],
    },
    {
      icon: '😔', title: 'Coping with Depression',
      items: [
        'Behavioral Activation: One small enjoyable activity daily',
        'Social Connection: Reach out to one person',
        'Movement: Even a 10-minute walk helps',
        'Challenge negative thoughts — are they really true?',
      ],
    },
    {
      icon: '🧘', title: 'Mindfulness & Meditation',
      items: [
        'Body Scan: Focus attention from head to toes',
        'Mindful Breathing: Focus on each breath for 5 minutes',
        'Try apps: Headspace, Calm, or Insight Timer',
        'Practice gratitude journaling daily',
      ],
    },
    {
      icon: '😴', title: 'Sleep Hygiene',
      items: [
        'Consistent sleep & wake time',
        'Avoid screens 1 hour before bed',
        'Keep bedroom cool, dark, and quiet',
        'No caffeine after 2 PM',
      ],
    },
    {
      icon: '💪', title: 'Daily Self-Care Checklist',
      items: [
        '✅ Drank enough water',
        '✅ Ate a nourishing meal',
        '✅ Moved my body for 15 minutes',
        '✅ Connected with someone I care about',
        '✅ Took a break when needed',
      ],
    },
    {
      icon: '📚', title: 'Recommended Reading',
      items: [
        'Feeling Good — David D. Burns',
        'The Body Keeps the Score — Bessel van der Kolk',
        'Atomic Habits — James Clear',
        'The Happiness Trap — Russ Harris',
      ],
    },
    {
      icon: '🌐', title: 'Online Resources',
      items: [
        'MindShift CBT — Free anxiety app',
        'Woebot — AI-based CBT chatbot',
        '7 Cups — Free online chat with listeners',
        'MentalHealth.gov — US government resources',
      ],
    },
  ];

  return (
    <div className="page fade-in">
      <div className="page-header">
        <h1>Mental Health Resources</h1>
        <p className="text-muted">Helpful resources, crisis helplines, and self-care strategies.</p>
      </div>
      <div className="resources-grid">
        {resources.map((r, i) => (
          <div key={i} className={`resource-card glass-card ${r.emergency ? 'emergency' : ''}`}>
            <div className="resource-icon">{r.icon}</div>
            <h3>{r.title}</h3>
            <ul>
              {r.items.map((item, j) => <li key={j}>{item}</li>)}
            </ul>
          </div>
        ))}
      </div>
      <div className="disclaimer-bar" style={{ marginTop: '2rem' }}>
        <p>⚠️ <strong>Disclaimer:</strong> This is a college project and is NOT a substitute for professional mental health care.</p>
      </div>
    </div>
  );
}
