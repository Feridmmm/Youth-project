import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import './MapComponent.css';

const MapComponent = ({ url }) => {
  const [geoData, setGeoData] = useState([]);

  useEffect(() => {
    axios.get(url, { withCredentials: true }).then(response => {
      setGeoData(response.data);
    }).catch(error => {
      console.error("Error fetching the GeoJSON data", error);
    });
  }, [url]);

  return (
    <div className="map-container">
      <MapContainer center={[50.8333, 12.9167]} zoom={13} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {geoData.map((item, index) => (
          <Marker key={index} position={[item.lat, item.lon]}>
            <Popup>
              <strong>{item.name}</strong><br />
              {item.address}<br />
              {item.phone}<br />
              {item.postal_code}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
