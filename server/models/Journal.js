const mongoose = require('mongoose');

const JournalSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true
  },
  sentiment: {
    type: String,
    default: 'neutral'
  },
  aiAnalysis: {
    type: String
  }
}, { timestamps: true });

module.exports = mongoose.model('Journal', JournalSchema);
