// client/src/components/Alerts/AlertPanel.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AlertPanel = ({ alerts }) => {
  const [selectedAlert, setSelectedAlert] = useState(null);

  return (
    <div className="grid grid-cols-1 gap-4">
      <AnimatePresence>
        {alerts.map(alert => (
          <motion.div
            key={alert._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white p-4 rounded-lg shadow"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">{alert.title}</h3>
              <span className={`px-2 py-1 rounded ${
                alert.severity > 3 ? 'bg-red-500' : 'bg-yellow-500'
              } text-white`}>
                Level {alert.severity}
              </span>
            </div>
            <p className="text-gray-600 mt-2">{alert.description}</p>
            <div className="mt-4 flex justify-between items-center">
              <button
                onClick={() => setSelectedAlert(alert._id)}
                className="text-blue-500 hover:text-blue-700"
              >
                View Details
              </button>
              <span className="text-sm text-gray-500">
                {new Date(alert.timestamp).toLocaleString()}
              </span>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};