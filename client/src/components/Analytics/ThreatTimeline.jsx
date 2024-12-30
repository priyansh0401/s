// client/src/components/Analytics/ThreatTimeline.jsx
import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const ThreatTimeline = ({ data }) => (
  <div className="h-96 w-full">
    <ResponsiveContainer>
      <LineChart data={data}>
        <XAxis dataKey="timestamp" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="severity" stroke="#8884d8" />
        <Line type="monotone" dataKey="riskLevel" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  </div>
);