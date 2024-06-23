import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/navbar';
import MapComponent from '../../components/MapComponent/MapComponent';
import axios from 'axios';
import './socialTeenagerProject.css';

const socialTeenagerUrl = "http://localhost:8000/api/social-teenager-projects/";

const SocialTeenagerProject = () => {
  const [socialTeenagerData, setSocialTeenagerData] = useState([]);

  useEffect(() => {
    axios.get(socialTeenagerUrl, { withCredentials: true }).then(response => {
      setSocialTeenagerData(response.data);
    }).catch(error => {
      console.error("Error fetching the social teenager project data", error);
    });
  }, []);

  return (
    <div className="socialTeenagerProject-page">
      <Navbar />
      <div className="left-side" style={{ textDecoration: 'none' }}>
        <ul>
          {socialTeenagerData.map((socialTeenager, index) => (
            <li key={index} className="socialTeenager-item" style={{ listStyle: 'none' }}>
              <Link to={`/social-teenager-projects/${socialTeenager.id}`}>
                <p><strong>Address:</strong> {socialTeenager.address}</p>
                <p><strong>Phone:</strong> {socialTeenager.phone}</p>
                <p><strong>Postal Code:</strong> {socialTeenager.postal_code}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="right-side">
        <div className="socialTeenager-map">
          <MapComponent url={socialTeenagerUrl} />
        </div>
      </div>
    </div>
  );
};

export default SocialTeenagerProject;
