// components/Body/body.jsx
import React from 'react';
import './body.css';
import backgroundImage from '../../assets/service.png';

const Body = () => {
  return (
    <div className="body" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="text-content">
        <h1>Welcome to Our Interactive Map Application</h1>
        <p>
          Children, adolescents, and young adults require access to the education and care system. This is essential for their development and also legally mandated.
        </p>
        <p>
          Our interactive map application for Chemnitz provides comprehensive data on various educational and care facilities. Explore our map to find detailed information about each facility, including their locations, contact details, and the services they offer.
        </p>
        
      </div>
    </div>
  );
};

export default Body;
