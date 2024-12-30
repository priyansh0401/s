// client/src/components/Dashboard/ThreatMap.jsx
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';

const ThreatMap = ({ threats }) => {
  const [mapCenter, setMapCenter] = useState([0, 0]);

  useEffect(() => {
    if (threats.length > 0) {
      const avgLat = threats.reduce((sum, t) => sum + t.location.coordinates[0], 0) / threats.length;
      const avgLng = threats.reduce((sum, t) => sum + t.location.coordinates[1], 0) / threats.length;
      setMapCenter([avgLat, avgLng]);
    }
  }, [threats]);

  return (
    <MapContainer center={mapCenter} zoom={4} className="h-96 w-full">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {threats.map(threat => (
        <CircleMarker
          key={threat._id}
          center={threat.location.coordinates}
          radius={threat.severity * 4}
          color={threat.severity > 3 ? 'red' : 'orange'}
        >
          <Popup>
            <div>
              <h3 className="font-bold">{threat.title}</h3>
              <p>Severity: {threat.severity}</p>
              <p>Status: {threat.status}</p>
            </div>
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
};