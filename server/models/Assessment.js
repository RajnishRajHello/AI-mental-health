const mongoose = require('mongoose');

const AssessmentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    required: true
  },
  maxScore: {
    type: Number,
    required: true
  },
  severity: {
    type: String,
    required: true
  },
  aiAnalysis: {
    type: String
  }
}, { timestamps: true });

module.exports = mongoose.model('Assessment', AssessmentSchema);
