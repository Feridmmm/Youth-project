import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/navbar';
import MapComponent from '../../components/MapComponent/MapComponent';
import axios from 'axios';
import './socialChildProject.css';

const socialChildUrl = "http://localhost:8000/api/social-child-projects/";

const SocialChildProject = () => {
  const [socialChildData, setSocialChildData] = useState([]);

  useEffect(() => {
    axios.get(socialChildUrl, { withCredentials: true }).then(response => {
      setSocialChildData(response.data);
    }).catch(error => {
      console.error("Error fetching the social child project data", error);
    });
  }, []);

  return (
    <div className="socialChildProject-page">
      <Navbar />
      <div className="left-side" style={{ textDecoration: 'none' }}>
        <ul>
          {socialChildData.map((socialChild, index) => (
            <li key={index} className="socialChild-item" style={{ listStyle: 'none' }}>
              <Link to={`/social-child-projects/${socialChild.id}`}>
                <p><strong>Address:</strong> {socialChild.address}</p>
                <p><strong>Phone:</strong> {socialChild.phone}</p>
                <p><strong>Postal Code:</strong> {socialChild.postal_code}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="right-side">
        <div className="socialChild-map">
          <MapComponent url={socialChildUrl} />
        </div>
      </div>
    </div>
  );
};

export default SocialChildProject;
