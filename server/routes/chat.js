const express = require('express');
const { OpenAI } = require('openai');
const Chat = require('../models/Chat');
const auth = require('../middleware/auth');

const router = express.Router();

const SYSTEM_PROMPT = `You are MindCare AI, a compassionate mental health support assistant.
- Listen actively and respond with empathy
- Provide evidence-based coping strategies
- Never diagnose or prescribe medication
- Use a warm, supportive, non-judgmental tone
- Keep responses concise (under 200 words)
- If someone mentions self-harm/suicide, provide crisis resources: 988 (US), iCall 9152987821 (India)
- You are NOT a replacement for professional mental health care.`;

router.post('/', auth, async (req, res) => {
  try {
    const { message } = req.body;
    if (!message || !message.trim()) return res.status(400).json({ error: 'Message is required' });

    await Chat.create({ user: req.userId, role: 'user', content: message });

    // Cost optimization: only send last 6 messages
    const historyDocs = await Chat.find({ user: req.userId }).sort({ createdAt: -1 }).limit(6);
    const history = historyDocs.reverse().map(doc => ({ role: doc.role, content: doc.content }));

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...history],
      max_tokens: 300,
      temperature: 0.7,
    });

    const reply = completion.choices[0].message.content;
    await Chat.create({ user: req.userId, role: 'assistant', content: reply });

    res.json({ message: reply });
  } catch (err) {
    console.error('Chat error:', err.message);
    res.status(500).json({ error: 'Failed to get AI response' });
  }
});

router.get('/history', auth, async (req, res) => {
  try {
    const messages = await Chat.find({ user: req.userId }).sort({ createdAt: 1 });
    // Map _id to id and createdAt to created_at for frontend compatibility
    const mapped = messages.map(m => ({ id: m._id, role: m.role, content: m.content, created_at: m.createdAt }));
    res.json({ messages: mapped });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch history' });
  }
});

router.delete('/clear', auth, async (req, res) => {
  try {
    await Chat.deleteMany({ user: req.userId });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to clear chat' });
  }
});

module.exports = router;
