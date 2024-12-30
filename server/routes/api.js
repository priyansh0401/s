// server/routes/api.js
const express = require('express');
const router = express.Router();
const ThreatEvent = require('../models/ThreatEvent');
const ThreatAnalyzer = require('../services/aiAnalysis');
const analyzer = new ThreatAnalyzer();

router.post('/events', async (req, res) => {
  try {
    const aiAnalysis = await analyzer.analyzeThreat(req.body);
    const event = new ThreatEvent({
      ...req.body,
      aiAnalysis
    });
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/analytics', async (req, res) => {
  try {
    const pipeline = [
      {
        $group: {
          _id: '$sourceType',
          avgRiskScore: { $avg: '$aiAnalysis.riskScore' },
          totalEvents: { $sum: 1 }
        }
      }
    ];
    const analytics = await ThreatEvent.aggregate(pipeline);
    res.json(analytics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});