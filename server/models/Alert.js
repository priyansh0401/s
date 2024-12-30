// server/models/Alert.js
const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  severity: { type: Number, required: true, min: 1, max: 5 },
  category: { type: String, required: true },
  source: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  status: { type: String, enum: ['new', 'investigating', 'resolved'], default: 'new' },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  relatedThreats: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ThreatEvent' }],
  aiPredictions: {
    riskLevel: Number,
    probability: Number,
    suggestedActions: [String]
  }
});

module.exports = mongoose.model('Alert', alertSchema);