// server/models/ThreatEvent.js
const mongoose = require('mongoose');

const threatEventSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  sourceType: { type: String, required: true },
  severity: { type: Number, required: true },
  location: {
    type: { type: String, default: 'Point' },
    coordinates: [Number]
  },
  description: String,
  indicators: [String],
  status: { 
    type: String, 
    enum: ['active', 'investigating', 'resolved', 'false_positive'],
    default: 'active'
  },
  relatedEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ThreatEvent' }],
  aiAnalysis: {
    riskScore: Number,
    predictedImpact: String,
    confidenceLevel: Number,
    recommendedActions: [String]
  },
  metadata: mongoose.Schema.Types.Mixed
});

threatEventSchema.index({ location: '2dsphere' });
module.exports = mongoose.model('ThreatEvent', threatEventSchema);
