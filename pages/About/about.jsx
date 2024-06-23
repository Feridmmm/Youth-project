// pages/AboutUs/about.jsx
import React from 'react';
import Navbar from '../../components/Navbar/navbar';
import './about.css';
import about from '../../assets/about.jpg';

const About = () => {
  return (
    <div className="about-page">
      <Navbar />
      <div className="about-container">
        <h1>About Us</h1>
        <p>
          Welcome to our website! We are dedicated to providing you with the best services and resources.
        </p>
        <p>
          Our team is committed to ensuring your satisfaction and success. Thank you for choosing us!
        </p>
        <p>
          We provide comprehensive data on various educational and care facilities, making it easier for families to make informed decisions about education and care for their children.
        </p>
        <p>
          Our interactive map application for Chemnitz offers detailed information about each facility, including their locations, contact details, and the services they offer.
        </p>
      </div>
    </div>
  );
};

export default About;
