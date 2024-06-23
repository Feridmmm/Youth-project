import React, { forwardRef } from 'react';
import './footer.css';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaPhoneAlt, FaMapMarkerAlt, FaEnvelope } from 'react-icons/fa';
import logo from '../../assets/default.png';

const Footer = forwardRef((props, ref) => {
  return (
    <footer className="footer" ref={ref}>
      <div className="footer-content">
        <div className="contact-info">
          <div className="contact-item">
            <FaMapMarkerAlt className="icon" />
            <p className="contact-text">Reichenhainer Street 70<br/>Chemnitz, Germany</p>
          </div>
          <div className="contact-item">
            <FaPhoneAlt className="icon" />
            <p className="contact-text">+49 123 456 789</p>
          </div>
          <div className="contact-item">
            <FaEnvelope className="icon" />
            <p className="contact-text">support@lnp-company.com</p>
          </div>
        </div>
        <div className="company-info">
          <h2>About the company</h2>
          <p>Welcome to our website! <br />We are dedicated to providing you with the best <br />services and resources..</p>
          <div className="footer-social">
            <FaFacebookF />
            <FaTwitter />
            <FaLinkedinIn />
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Education Chemnitz. All rights reserved.</p>
      </div>
    </footer>
  );
});

export default Footer;
