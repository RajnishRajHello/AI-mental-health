const express = require('express');
const Mood = require('../models/Mood');
const Assessment = require('../models/Assessment');
const Journal = require('../models/Journal');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/', auth, async (req, res) => {
  try {
    const { mood, note } = req.body;
    if (!mood || mood < 1 || mood > 5) return res.status(400).json({ error: 'Mood must be 1-5' });

    const newMood = await Mood.create({ user: req.userId, mood, note: note || '' });
    res.json({ id: newMood._id, mood, note, created_at: newMood.createdAt });
  } catch (err) {
    console.error('Mood error:', err.message);
    res.status(500).json({ error: 'Failed to log mood' });
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 30;
    const docs = await Mood.find({ user: req.userId }).sort({ createdAt: -1 }).limit(limit);
    const moods = docs.map(d => ({ id: d._id, mood: d.mood, note: d.note, created_at: d.createdAt }));
    res.json({ moods });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch moods' });
  }
});

router.get('/stats', auth, async (req, res) => {
  try {
    const recent7 = await Mood.find({ user: req.userId }).sort({ createdAt: -1 }).limit(7);
    const totalMoods = await Mood.countDocuments({ user: req.userId });
    const totalAssessments = await Assessment.countDocuments({ user: req.userId });
    const totalJournals = await Journal.countDocuments({ user: req.userId });

    const avg = recent7.length ? recent7.reduce((s, m) => s + m.mood, 0) / recent7.length : 0;
    const wellness = Math.round((avg / 5) * 100);

    res.json({ wellness, totalMoods, totalAssessments, totalJournals, recentAvg: avg.toFixed(1) });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

module.exports = router;
