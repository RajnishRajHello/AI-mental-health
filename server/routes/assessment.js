const express = require('express');
const { OpenAI } = require('openai');
const Assessment = require('../models/Assessment');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/', auth, async (req, res) => {
  try {
    const { type, score, maxScore, severity } = req.body;
    if (!type || score == null || !severity) return res.status(400).json({ error: 'Missing fields' });

    let aiAnalysis = '';
    try {
      const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
      const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are a compassionate mental health support assistant. Never diagnose. Always recommend professional help for moderate+ scores. Be concise.' },
          { role: 'user', content: `User completed ${type}. Score: ${score}/${maxScore}, Severity: ${severity}. Give a brief empathetic interpretation, what this means, 3 coping tips, and a note about professional help. Use emoji headers. Keep under 200 words.` },
        ],
        max_tokens: 350,
        temperature: 0.7,
      });
      aiAnalysis = completion.choices[0].message.content;
    } catch (e) {
      aiAnalysis = 'AI analysis unavailable.';
    }

    const assessment = await Assessment.create({
      user: req.userId, type, score, maxScore, severity, aiAnalysis
    });

    res.json({ id: assessment._id, aiAnalysis });
  } catch (err) {
    console.error('Assessment error:', err.message);
    res.status(500).json({ error: 'Failed to save assessment' });
  }
});

router.get('/history', auth, async (req, res) => {
  try {
    const docs = await Assessment.find({ user: req.userId }).sort({ createdAt: -1 });
    const assessments = docs.map(d => ({
      id: d._id, type: d.type, score: d.score, max_score: d.maxScore, severity: d.severity, ai_analysis: d.aiAnalysis, created_at: d.createdAt
    }));
    res.json({ assessments });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch assessments' });
  }
});

module.exports = router;
