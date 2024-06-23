import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/navbar';
import MapComponent from '../../components/MapComponent/MapComponent';
import axios from 'axios';
import './school.css';

const schoolUrl = "http://localhost:8000/api/schools/";

const School = () => {
  const [schoolData, setSchoolData] = useState([]);

  useEffect(() => {
    axios.get(schoolUrl, { withCredentials: true }).then(response => {
      setSchoolData(response.data);
    }).catch(error => {
      console.error("Error fetching the school data", error);
    });
  }, []);

  return (
    <div className="school-page">
      <Navbar />
      <div className="left-side" style={{ textDecoration: 'none' }}>
        
        <ul>
          {schoolData.map((school, index) => (
            <li key={index} className="school-item" style={{ listStyle: 'none' }}>
              <Link to={`/schools/${school.id}`}>
                
                <p><strong>Address:</strong> {school.address}</p>
                <p><strong>Phone:</strong> {school.phone}</p>
                <p><strong>Postal Code:</strong> {school.postal_code}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="right-side">
        <div className="school-map">
          <MapComponent url={schoolUrl} />
        </div>
      </div>
    </div>
  );
};

export default School;
