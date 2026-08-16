const express = require('express');
const { OpenAI } = require('openai');
const Journal = require('../models/Journal');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/', auth, async (req, res) => {
  try {
    const { content } = req.body;
    if (!content || content.trim().length < 10) return res.status(400).json({ error: 'Write at least 10 characters' });

    let aiAnalysis = '';
    let sentiment = 'neutral';

    try {
      const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
      const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are a compassionate journal analysis assistant. Be warm and supportive. Be concise.' },
          { role: 'user', content: `Analyze this journal entry briefly:\n"${content.slice(0, 500)}"\n\nRespond with:\n**Emotions:** (list with emojis)\n**Sentiment:** Positive/Neutral/Negative\n**Reflection:** (2 sentences)\n**Suggestion:** (1 self-care tip)\n\nKeep under 120 words.` },
        ],
        max_tokens: 250,
        temperature: 0.7,
      });
      aiAnalysis = completion.choices[0].message.content;
      const lower = aiAnalysis.toLowerCase();
      if (lower.includes('**sentiment:** positive') || lower.includes('sentiment: positive')) sentiment = 'positive';
      else if (lower.includes('**sentiment:** negative') || lower.includes('sentiment: negative')) sentiment = 'negative';
    } catch (e) {
      aiAnalysis = 'AI analysis unavailable.';
    }

    const entry = await Journal.create({ user: req.userId, content, sentiment, aiAnalysis });

    res.json({ id: entry._id, sentiment, aiAnalysis, created_at: entry.createdAt });
  } catch (err) {
    console.error('Journal error:', err.message);
    res.status(500).json({ error: 'Failed to save entry' });
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const docs = await Journal.find({ user: req.userId }).sort({ createdAt: -1 }).limit(50);
    const entries = docs.map(d => ({ id: d._id, content: d.content, sentiment: d.sentiment, ai_analysis: d.aiAnalysis, created_at: d.createdAt }));
    res.json({ entries });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch journals' });
  }
});

module.exports = router;
