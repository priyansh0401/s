// client/src/components/ThreatDashboard.jsx
import React, { useState, useEffect } from 'react';
import { LineChart, XAxis, YAxis, Tooltip, Line } from 'recharts';

const ThreatDashboard = () => {
  const [threatData, setThreatData] = useState([]);
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    fetchThreatData();
    fetchAnalytics();
  }, []);

  const fetchThreatData = async () => {
    const response = await fetch('/api/events');
    const data = await response.json();
    setThreatData(data);
  };

  const fetchAnalytics = async () => {
    const response = await fetch('/api/analytics');
    const data = await response.json();
    setAnalytics(data);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Security Analytics Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl mb-4">Threat Timeline</h2>
          <LineChart width={600} height={300} data={threatData}>
            <XAxis dataKey="timestamp" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="aiAnalysis.riskScore" stroke="#8884d8" />
          </LineChart>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl mb-4">Active Threats</h2>
          <div className="space-y-4">
            {threatData
              .filter(threat => threat.status === 'active')
              .map(threat => (
                <div key={threat._id} className="border-l-4 border-red-500 pl-4">
                  <p className="font-semibold">{threat.description}</p>
                  <p className="text-sm text-gray-600">
                    Risk Score: {threat.aiAnalysis.riskScore}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreatDashboard;