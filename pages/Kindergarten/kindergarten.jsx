import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/navbar';
import MapComponent from '../../components/MapComponent/MapComponent';
import axios from 'axios';
import './kindergarten.css';

const kindergartenUrl = "http://localhost:8000/api/kindergartens/";

const Kindergarten = () => {
  const [kindergartenData, setKindergartenData] = useState([]);

  useEffect(() => {
    axios.get(kindergartenUrl, { withCredentials: true }).then(response => {
      setKindergartenData(response.data);
    }).catch(error => {
      console.error("Error fetching the kindergarten data", error);
    });
  }, []);

  return (
    <div className="kindergarten-page">
      <Navbar />
      <div className="left-side" style={{ textDecoration: 'none' }}>
        <ul>
          {kindergartenData.map((kindergarten, index) => (
            <li key={index} className="kindergarten-item" style={{ listStyle: 'none' }}>
              <Link to={`/kindergartens/${kindergarten.id}`}>
                <p><strong>Address:</strong> {kindergarten.address}</p>
                <p><strong>Phone:</strong> {kindergarten.phone}</p>
                <p><strong>Postal Code:</strong> {kindergarten.postal_code}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="right-side">
        <div className="kindergarten-map">
          <MapComponent url={kindergartenUrl} />
        </div>
      </div>
    </div>
  );
};

export default Kindergarten;
